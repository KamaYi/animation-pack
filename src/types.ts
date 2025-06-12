import { ReactNode } from 'react';

export interface AnimationProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  onAnimationComplete?: () => void;
}

export interface SlideInProps extends AnimationProps {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  distance?: string | number;
}

export interface RotateProps extends AnimationProps {
  degrees?: number;
  origin?: string;
}

export interface BounceProps extends AnimationProps {
  intensity?: 'low' | 'medium' | 'high';
  iterations?: number;
} 