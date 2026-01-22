export interface SlideProps {
  isActive: boolean;
  direction: number;
}

export enum SlideDirection {
  NEXT = 1,
  PREV = -1,
  NONE = 0
}