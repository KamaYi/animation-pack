import React, { forwardRef, useEffect, useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import LuminaFloating from './LuminaFloating';
import starImage from '../../assets/images/star.png';
import heartImage from '../../assets/images/heart.png';
import { LuminaFloatingRef } from '../../types';

// 添加调试信息，输出图片路径
console.log('图片路径:', {
  starImage,
  heartImage
});

type AnimationType = 1 | 2;

// 创建一个可以接收ref的头像组件
const Avatar = forwardRef<HTMLDivElement, { style?: React.CSSProperties; id?: string }>(
  ({ style = {}, id }, ref) => (
    <div
      ref={ref}
      id={id}
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        ...style
      }}
    >
      👤
    </div>
  )
);

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
    jumpingAnimationType: { 
      control: 'radio',
      options: [1, 2],
      description: '动画类型(1=默认跳动，2=散开)'
    },
    imageUrl: { 
      control: 'select',
      options: ['heart', 'star'],
      mapping: {
        heart: heartImage,
        star: starImage,
      },
      description: '浮动元素的图片'
    },
    sourceTargetId: {
      control: 'select',
      options: [undefined, 'source-avatar'],
      description: '起始元素的ID，如果不提供则使用子元素作为起始元素'
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
  jumpingAnimationType = 1 as AnimationType,
  imageUrl = heartImage,
  sourceTargetId
}: {
  count?: number;
  beatTime?: number;
  positiveSequence?: boolean;
  randomOffsetX?: number;
  randomOffsetY?: number;
  flyToTargetDuration?: number;
  jumpDelay?: number;
  flyDelay?: number;
  jumpingAnimationType?: AnimationType;
  imageUrl?: string;
  sourceTargetId?: string;
}) {
  const hasSourceTarget = !!sourceTargetId;
  const floatingRef = useRef<LuminaFloatingRef>(null);

  const handleTriggerClick = () => {
    console.log('触发按钮点击');
    if (floatingRef.current) {
      floatingRef.current.triggerAnimation();
    } else {
      console.error('组件引用不存在');
    }
  };

  return (
    <div style={{ padding: '20px', position: 'relative', height: '300px', width: '500px' }}>
      <h2 className="title">浮动元素动画演示</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        {hasSourceTarget 
          ? '点击按钮后，元素会从左上角的源头像出发，飞向右上角的目标头像' 
          : '点击左侧按钮，元素会飞向右上角的头像（通过ID指定）'}
      </p>
      
      {/* 源元素头像 - 始终显示，但只在指定sourceTargetId时作为起始点 */}
      <Avatar 
        id="source-avatar"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: '#e8f4fd',
        }}
      />
      
      <LuminaFloating
        ref={floatingRef}
        imageUrl={imageUrl}
        count={count}
        beatTime={beatTime}
        positiveSequence={positiveSequence}
        randomOffsetX={randomOffsetX}
        randomOffsetY={randomOffsetY}
        flyToTargetDuration={flyToTargetDuration}
        jumpDelay={jumpDelay}
        flyDelay={flyDelay}
        jumpingAnimationType={jumpingAnimationType}
        targetId="target-avatar"
        sourceTargetId={sourceTargetId}
      >
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px',
            marginTop: '70px'
          }}
        >
          点击触发动画
        </button>
      </LuminaFloating>

      <button
        onClick={handleTriggerClick}
        style={{
          padding: '10px 20px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        直接触发动画
      </button>

      <Avatar 
        id="target-avatar"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}
      />

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
          <li>动画类型: {jumpingAnimationType === 1 ? '默认跳动' : '散开'}</li>
          <li>目标元素ID: target-avatar</li>
          <li>源元素ID: {sourceTargetId || '未指定 (使用点击元素)'}</li>
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
    jumpingAnimationType: 1 as AnimationType,
    imageUrl: heartImage,
    sourceTargetId: undefined
  }
};

export const WithSourceTarget: Story = {
  args: {
    count: 15,
    beatTime: 0.8,
    positiveSequence: true,
    randomOffsetX: 30,
    randomOffsetY: 30,
    flyToTargetDuration: 1.0,
    jumpDelay: 0.2,
    flyDelay: 0.08,
    jumpingAnimationType: 2 as AnimationType,
    imageUrl: starImage,
    sourceTargetId: 'source-avatar'
  }
}; 