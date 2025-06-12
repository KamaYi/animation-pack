import React, { useEffect, useState } from 'react';
import { SlideInProps } from '../types';

const getInitialTransform = (direction: string, distance: string | number) => {
  const distanceValue = typeof distance === 'number' ? `${distance}px` : distance;
  
  switch (direction) {
    case 'left':
      return `translateX(-${distanceValue})`;
    case 'right':
      return `translateX(${distanceValue})`;
    case 'top':
      return `translateY(-${distanceValue})`;
    case 'bottom':
      return `translateY(${distanceValue})`;
    default:
      return `translateX(-${distanceValue})`;
  }
};

const SlideIn: React.FC<SlideInProps> = ({
  children,
  duration = 1000,
  delay = 0,
  direction = 'left',
  distance = '100%',
  className = '',
  style = {},
  onAnimationComplete,
}) => {
  const [transform, setTransform] = useState(getInitialTransform(direction, distance));
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransform('translateX(0)');
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
        transform,
        opacity,
        transition: `transform ${duration}ms ease-out, opacity ${duration}ms ease-in-out`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default SlideIn; 