
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, Volume2, MessageSquare, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Audio Utils (as per Gemini Guidelines) ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface LiveAssistantProps {
  currentSlideIndex: number;
  slideDescriptions: string[];
}

export const LiveAssistant: React.FC<LiveAssistantProps> = ({ currentSlideIndex, slideDescriptions }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcription, setTranscription] = useState('');
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const systemInstruction = `You are the AI Narrator for the Rhino Communities Pitch Deck. 
    You are co-presenting with Jason Ramshaw (Systems Engineer) and Erik Peterson (Deal Strategist).
    Your goal is to explain the slides conversationally. 
    When the user asks questions, provide insightful answers based on the slide context.
    CRITICAL: For any detailed questions or inquiries, tell the user to email jason@rhinocommunities.com and promise a response within 24 hours.
    Keep your tone professional, authoritative, yet approachable. 
    The current slide is: ${slideDescriptions[currentSlideIndex]}`;

  const stopAssistant = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.input.close();
      audioContextRef.current.output.close();
      audioContextRef.current = null;
    }
    for (const source of sourcesRef.current) {
      source.stop();
    }
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
    setIsSpeaking(false);
    setTranscription('');
  }, []);

  const startAssistant = async () => {
    try {
      setIsConnecting(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = { input: inputCtx, output: outputCtx };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Transcriptions
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
            } else if (message.serverContent?.inputTranscription) {
              setTranscription(prev => prev + ' ' + message.serverContent?.inputTranscription?.text);
            }

            if (message.serverContent?.turnComplete) {
              setTranscription('');
            }

            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && outputCtx) {
              setIsSpeaking(true);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              for (const s of sourcesRef.current) s.stop();
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onerror: stopAssistant,
          onclose: stopAssistant,
        }
      });

      sessionRef.current = await sessionPromise;
      // Initial greeting
      sessionRef.current.sendRealtimeInput({ 
        text: `I am looking at slide ${currentSlideIndex + 1}: ${slideDescriptions[currentSlideIndex]}. Please introduce it.` 
      });

    } catch (err) {
      console.error("Failed to start Live Assistant", err);
      setIsConnecting(false);
    }
  };

  // Update AI when slide changes
  useEffect(() => {
    if (isActive && sessionRef.current) {
      sessionRef.current.sendRealtimeInput({ 
        text: `The user has moved to slide ${currentSlideIndex + 1}: ${slideDescriptions[currentSlideIndex]}. Briefly talk about this section.` 
      });
    }
  }, [currentSlideIndex, isActive]);

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-4 pointer-events-none">
      <AnimatePresence>
        {isActive && transcription && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-black/80 backdrop-blur-lg border border-white/10 p-4 rounded-xl max-w-sm text-sm text-white/90 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-rhino-blue">
              <MessageSquare className="w-3 h-3" />
              Live HUD
            </div>
            {transcription}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={isActive ? stopAssistant : startAssistant}
          disabled={isConnecting}
          className={`
            relative flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-xl
            ${isActive 
              ? 'bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500/20' 
              : 'bg-rhino-blue border border-white/10 text-white hover:bg-blue-600'}
          `}
        >
          {isConnecting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isActive ? (
            <MicOff className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
          
          <span className="tracking-wide text-sm">
            {isConnecting ? 'CONNECTING...' : isActive ? 'STOP NARRATOR' : 'START LIVE AI'}
          </span>

          {isActive && isSpeaking && (
            <span className="flex gap-1 ml-2">
              {[0.2, 0.4, 0.6].map((d, i) => (
                <motion.span
                  key={i}
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: d }}
                  className="w-1 bg-current rounded-full"
                />
              ))}
            </span>
          )}
        </button>

        {isActive && (
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-white/60 tracking-widest uppercase">
            <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`} />
            {isSpeaking ? 'AI Speaking' : 'Listening'}
          </div>
        )}
      </div>
    </div>
  );
};
