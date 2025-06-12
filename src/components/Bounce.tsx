import React, { useEffect, useState } from 'react';
import { BounceProps } from '../types';

const getKeyframes = (intensity: string) => {
  const values = {
    low: '0.2rem',
    medium: '0.5rem',
    high: '1rem',
  };
  
  const height = values[intensity as keyof typeof values] || values.medium;
  
  return `
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-${height});
      }
    }
  `;
};

const Bounce: React.FC<BounceProps> = ({
  children,
  duration = 500,
  delay = 0,
  intensity = 'medium',
  iterations = 1,
  className = '',
  style = {},
  onAnimationComplete,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const animationName = `bounce-${intensity}`;
  
  useEffect(() => {
    // Create style element for keyframes
    const styleEl = document.createElement('style');
    styleEl.innerHTML = getKeyframes(intensity).replace('bounce', animationName);
    document.head.appendChild(styleEl);
    
    const timer = setTimeout(() => {
      setIsAnimating(true);
      
      if (onAnimationComplete) {
        const completeTimer = setTimeout(onAnimationComplete, duration * iterations);
        return () => clearTimeout(completeTimer);
      }
    }, delay);
    
    return () => {
      clearTimeout(timer);
      document.head.removeChild(styleEl);
    };
  }, [delay, duration, intensity, iterations, animationName, onAnimationComplete]);
  
  return (
    <div
      className={className}
      style={{
        animation: isAnimating ? `${animationName} ${duration}ms ease-in-out ${iterations === Infinity ? 'infinite' : iterations}` : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Bounce; 