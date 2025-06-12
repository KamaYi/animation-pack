import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Bounce from './Bounce';

const meta: Meta<typeof Bounce> = {
  title: 'Animation/Bounce',
  component: Bounce,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    intensity: {
      control: 'select',
      options: ['low', 'medium', 'high'],
    },
    duration: { control: { type: 'number', min: 100, max: 2000, step: 100 } },
    delay: { control: { type: 'number', min: 0, max: 3000, step: 100 } },
    iterations: { control: { type: 'number', min: 1, max: 10, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Bounce>;

export const LowIntensity: Story = {
  args: {
    children: <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>低强度弹跳</div>,
    intensity: 'low',
    duration: 500,
    delay: 0,
    iterations: 1,
  },
};

export const MediumIntensity: Story = {
  args: {
    children: <div style={{ padding: '20px', background: '#e0f7fa', borderRadius: '8px' }}>中等强度弹跳</div>,
    intensity: 'medium',
    duration: 500,
    delay: 0,
    iterations: 1,
  },
};

export const HighIntensity: Story = {
  args: {
    children: <div style={{ padding: '20px', background: '#fff9c4', borderRadius: '8px' }}>高强度弹跳</div>,
    intensity: 'high',
    duration: 500,
    delay: 0,
    iterations: 1,
  },
};

export const MultipleIterations: Story = {
  args: {
    children: <div style={{ padding: '20px', background: '#ffccbc', borderRadius: '8px' }}>多次弹跳</div>,
    intensity: 'medium',
    duration: 500,
    delay: 0,
    iterations: 3,
  },
}; 