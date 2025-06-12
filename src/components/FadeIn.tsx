import React, { useEffect, useState } from 'react';
import { AnimationProps } from '../types';

const FadeIn: React.FC<AnimationProps> = ({
  children,
  duration = 1000,
  delay = 0,
  className = '',
  style = {},
  onAnimationComplete,
}) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
      
      if (onAnimationComplete) {
        const completeTimer = setTimeout(onAnimationComplete, duration);
        return () => clearTimeout(completeTimer);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration, onAnimationComplete]);

  return (
    <div
      className={className}
      style={{
        opacity,
        transition: `opacity ${duration}ms ease-in-out`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn; 