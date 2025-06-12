import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FadeIn from './FadeIn';

const meta: Meta<typeof FadeIn> = {
  title: 'Animation/FadeIn',
  component: FadeIn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    duration: { control: { type: 'number', min: 100, max: 5000, step: 100 } },
    delay: { control: { type: 'number', min: 0, max: 3000, step: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof FadeIn>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>淡入效果</div>,
    duration: 1000,
    delay: 0,
  },
};

export const SlowFadeIn: Story = {
  args: {
    children: <div style={{ padding: '20px', background: '#e0f7fa', borderRadius: '8px' }}>缓慢淡入效果</div>,
    duration: 3000,
    delay: 0,
  },
};

export const DelayedFadeIn: Story = {
  args: {
    children: <div style={{ padding: '20px', background: '#fff9c4', borderRadius: '8px' }}>延迟淡入效果</div>,
    duration: 1000,
    delay: 1000,
  },
}; 