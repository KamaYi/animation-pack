import React from 'react';
import './LuminaFragmentAnimation.css';
import './LuminaFragmentAnimation.less';

export interface LuminaFragmentAnimationProps {
  children?: React.ReactNode;
}

const LuminaFragmentAnimation: React.FC<LuminaFragmentAnimationProps> = ({ children }) => {
  return (
    <div>
      {children || 'LuminaFragmentAnimation component'}
    </div>
  );
};

export default LuminaFragmentAnimation;
