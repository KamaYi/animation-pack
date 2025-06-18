import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import LuminaBeam from './LuminaBeam';

const meta: Meta<typeof LuminaBeam> = {
  title: 'Animation/LuminaBeam',
  component: LuminaBeam,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    beamSize: { control: { type: 'range', min: 20, max: 100, step: 5 } },
    duration: { control: { type: 'range', min: 1, max: 15, step: 0.5 } },
    delay: { control: { type: 'range', min: 0, max: 5, step: 0.1 } },
    colorFrom: { control: 'color' },
    colorTo: { control: 'color' },
    reverse: { control: 'boolean' },
    initialOffset: { control: { type: 'range', min: 0, max: 100, step: 5 } },
    borderWidth: { control: 'text' },
    borderRadius: { control: 'text' },
    backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof LuminaBeam>;

// 默认光束效果
export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '30px', width: '300px', textAlign: 'center' }}>
        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>边框光束效果</h3>
        <p style={{ color: '#ccc', margin: 0 }}>一个边框上移动的光束效果</p>
      </div>
    ),
  },
};

// 反向动画
export const ReverseAnimation: Story = {
  args: {
    children: (
      <div style={{ padding: '30px', width: '300px', textAlign: 'center' }}>
        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>反向光束动画</h3>
        <p style={{ color: '#ccc', margin: 0 }}>光束反向移动的效果</p>
      </div>
    ),
    reverse: true,
  },
};

// 自定义颜色
export const CustomColors: Story = {
  args: {
    children: (
      <div style={{ padding: '30px', width: '300px', textAlign: 'center' }}>
        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>自定义颜色</h3>
        <p style={{ color: '#ccc', margin: 0 }}>使用自定义颜色的光束效果</p>
      </div>
    ),
    colorFrom: '#00ff88',
    colorTo: '#0088ff',
  },
};

// 快速光束
export const FastBeam: Story = {
  args: {
    children: (
      <div style={{ padding: '30px', width: '300px', textAlign: 'center' }}>
        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>快速光束</h3>
        <p style={{ color: '#ccc', margin: 0 }}>高速移动的光束效果</p>
      </div>
    ),
    duration: 3,
    beamSize: 40,
  },
};

// 大光束效果
export const LargeBeam: Story = {
  args: {
    children: (
      <div style={{ padding: '30px', width: '300px', textAlign: 'center' }}>
        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>大尺寸光束</h3>
        <p style={{ color: '#ccc', margin: 0 }}>更大尺寸的光束效果</p>
      </div>
    ),
    beamSize: 80,
  },
};

// 圆形容器
export const RoundContainer: Story = {
  args: {
    children: (
      <div style={{ padding: '40px', width: '200px', height: '200px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h3 style={{ color: 'white', margin: 0 }}>圆形容器</h3>
      </div>
    ),
    borderRadius: '50%',
    beamSize: 60,
  },
};

// 双光束效果
export const DoubleBeam: Story = {
  render: (args) => (
    <div style={{ position: 'relative' }}>
      <LuminaBeam {...args} />
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <LuminaBeam 
          colorFrom="#00ff88"
          colorTo="#0088ff"
          reverse={true}
          delay={args.duration ? args.duration / 2 : 3}
          beamSize={args.beamSize}
          duration={args.duration}
          borderRadius={args.borderRadius}
        >
          <div style={{ opacity: 0, padding: '30px', width: '300px' }}></div>
        </LuminaBeam>
      </div>
    </div>
  ),
  args: {
    children: (
      <div style={{ padding: '30px', width: '300px', textAlign: 'center' }}>
        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>双光束效果</h3>
        <p style={{ color: '#ccc', margin: 0 }}>两个反向移动的光束</p>
      </div>
    ),
    colorFrom: '#ff6b6b',
    colorTo: '#ff9e3f',
    duration: 6,
  },
};

// 登录表单示例
export const LoginForm: Story = {
  args: {
    children: (
      <div style={{ padding: '40px', width: '300px', textAlign: 'center' }}>
        <h3 style={{ color: 'white', margin: '0 0 20px 0' }}>登录</h3>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label style={{ color: '#ccc', display: 'block', marginBottom: '5px' }}>邮箱</label>
          <input 
            type="email" 
            placeholder="输入邮箱地址" 
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #444',
              background: 'rgba(0,0,0,0.2)',
              color: 'white'
            }}
          />
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ color: '#ccc', display: 'block', marginBottom: '5px' }}>密码</label>
          <input 
            type="password" 
            placeholder="输入密码" 
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #444',
              background: 'rgba(0,0,0,0.2)',
              color: 'white'
            }}
          />
        </div>
        <button style={{
          width: '100%',
          padding: '12px',
          borderRadius: '4px',
          border: 'none',
          background: 'linear-gradient(to right, #9c40ff, #00b3ff)',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          登录
        </button>
      </div>
    ),
    beamSize: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '12px',
  },
}; 