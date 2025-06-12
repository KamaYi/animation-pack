import React, { useEffect, useState } from 'react';
import { RotateProps } from '../types';

const Rotate: React.FC<RotateProps> = ({
  children,
  duration = 1000,
  delay = 0,
  degrees = 360,
  origin = 'center',
  className = '',
  style = {},
  onAnimationComplete,
}) => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setRotation(degrees);
      
      if (onAnimationComplete) {
        const completeTimer = setTimeout(onAnimationComplete, duration);
        return () => clearTimeout(completeTimer);
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay, duration, degrees, onAnimationComplete]);
  
  return (
    <div
      className={className}
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: origin,
        transition: `transform ${duration}ms ease-in-out`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Rotate; 