import React from 'react';
import { motion } from "motion/react"
export interface LoadingAnimationProps {
  children?: React.ReactNode;
}

function StyleSheet() {
  return (
    <style>
      {`
          .container {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 40px;
              border-radius: 8px;
          }

          .spinner {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 4px solid #0b1012;
              border-top-color: #ff0088;
              border-bottom-color: #ff0088;
              will-change: transform;
          }
          `}
    </style>
  )
}
const LoadingAnimation1: React.FC<LoadingAnimationProps> = ({ children }) => {
  return (
    <div className="container">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <StyleSheet />
    </div>
  );
};

export default LoadingAnimation1;
