import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Rotate from './Rotate';

const meta: Meta<typeof Rotate> = {
  title: 'Animation/Rotate',
  component: Rotate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    degrees: { control: { type: 'number', min: -360, max: 360, step: 45 } },
    origin: { control: 'text' },
    duration: { control: { type: 'number', min: 100, max: 5000, step: 100 } },
    delay: { control: { type: 'number', min: 0, max: 3000, step: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof Rotate>;

export const FullRotation: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px', width: '150px', textAlign: 'center' }}>
        360° 旋转
      </div>
    ),
    degrees: 360,
    origin: 'center',
    duration: 1000,
    delay: 0,
  },
};

export const HalfRotation: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', background: '#e0f7fa', borderRadius: '8px', width: '150px', textAlign: 'center' }}>
        180° 旋转
      </div>
    ),
    degrees: 180,
    origin: 'center',
    duration: 1000,
    delay: 0,
  },
};

export const NegativeRotation: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', background: '#fff9c4', borderRadius: '8px', width: '150px', textAlign: 'center' }}>
        -90° 旋转
      </div>
    ),
    degrees: -90,
    origin: 'center',
    duration: 1000,
    delay: 0,
  },
};

export const CustomOrigin: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', background: '#ffccbc', borderRadius: '8px', width: '150px', textAlign: 'center' }}>
        自定义旋转中心
      </div>
    ),
    degrees: 360,
    origin: 'top left',
    duration: 1000,
    delay: 0,
  },
}; 