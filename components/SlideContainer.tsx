import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideContainerProps {
  children: ReactNode;
  className?: string;
  isVisible: boolean;
  direction: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    zIndex: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export const SlideContainer: React.FC<SlideContainerProps> = ({ 
  children, 
  className = "", 
  isVisible,
  direction 
}) => {
  return (
    <AnimatePresence initial={false} custom={direction}>
      {isVisible && (
        <motion.div
          key="slide"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className={`absolute inset-0 w-full h-full overflow-hidden flex flex-col ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};