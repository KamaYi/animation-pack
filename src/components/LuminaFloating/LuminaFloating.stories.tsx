import React, { useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import LuminaFloating from './LuminaFloating';
import starImage from '../../assets/images/star.png';
import heartImage from '../../assets/images/heart.png';

const meta: Meta<typeof LuminaFloatingWrapper> = {
  title: 'Animation/LuminaFloating',
  component: LuminaFloatingWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: { 
      control: { type: 'range', min: 1, max: 30, step: 1 },
      description: '浮动元素的数量'
    },
    beatTime: { 
      control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
      description: '跳动动画的持续时间(秒)'
    },
    positiveSequence: { 
      control: 'boolean',
      description: '是否正序，false是倒序'
    },
    randomOffsetX: { 
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: '随机偏移量X轴'
    },
    randomOffsetY: { 
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: '随机偏移量Y轴'
    },
    flyToTargetDuration: { 
      control: { type: 'range', min: 0.1, max: 3, step: 0.1 },
      description: '飞向目标元素的动画时间(秒)'
    },
    jumpDelay: { 
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: '跳动动画的随机延迟最大值(秒)'
    },
    flyDelay: { 
      control: { type: 'range', min: 0, max: 0.5, step: 0.05 },
      description: '飞行动画的间隔时间(秒)'
    },
    imageUrl: { 
      control: 'select',
      options: ['heart', 'star'],
      mapping: {
        heart: heartImage,
        star: starImage,
      },
      description: '浮动元素的图片'
    }
  }
};

export default meta;
type Story = StoryObj<typeof LuminaFloatingWrapper>;

// 创建一个包装组件，用于在Storybook中展示LuminaFloating
function LuminaFloatingWrapper({
  count = 10,
  beatTime = 0.8,
  positiveSequence = false,
  randomOffsetX = 40,
  randomOffsetY = 50,
  flyToTargetDuration = 0.8,
  jumpDelay = 0.3,
  flyDelay = 0.1,
  imageUrl = heartImage,
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const targetRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    setStartPosition({
      x: rect.left,
      y: rect.top
    });
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <div style={{ padding: '20px', position: 'relative', height: '300px', width: '500px' }}>
      <h2 className="title">浮动元素动画演示</h2>
      <button
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        点击触发动画
      </button>
      
      <div 
        ref={targetRef}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '20px',
          right: '20px',
          fontSize: '24px'
        }}
      >
        👤
      </div>
      
      {isAnimating && (
        <LuminaFloating
          startX={startPosition.x}
          startY={startPosition.y}
          targetElement={targetRef.current}
          imageUrl={imageUrl}
          count={count}
          beatTime={beatTime}
          positiveSequence={positiveSequence}
          randomOffsetX={randomOffsetX}
          randomOffsetY={randomOffsetY}
          flyToTargetDuration={flyToTargetDuration}
          jumpDelay={jumpDelay}
          flyDelay={flyDelay}
          onComplete={handleAnimationComplete}
        />
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666'}}>
        <p>当前配置:</p>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li>元素数量: {count}</li>
          <li>跳动时间: {beatTime}s</li>
          <li>顺序: {positiveSequence ? '正序' : '倒序'}</li>
          <li>X轴随机偏移: {randomOffsetX}px</li>
          <li>Y轴随机偏移: {randomOffsetY}px</li>
          <li>飞行时间: {flyToTargetDuration}s</li>
          <li>跳动延迟: {jumpDelay}s</li>
          <li>飞行间隔: {flyDelay}s</li>
        </ul>
      </div>
    </div>
  );
}

export const Configurable: Story = {
  args: {
    count: 10,
    beatTime: 0.8,
    positiveSequence: false,
    randomOffsetX: 40,
    randomOffsetY: 50,
    flyToTargetDuration: 0.8,
    jumpDelay: 0.3,
    flyDelay: 0.1,
    imageUrl: heartImage
  }
}; 