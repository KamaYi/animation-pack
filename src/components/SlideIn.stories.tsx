import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SlideIn from './SlideIn';

const meta: Meta<typeof SlideIn> = {
  title: 'Animation/SlideIn',
  component: SlideIn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    duration: { control: { type: 'number', min: 100, max: 5000, step: 100 } },
    delay: { control: { type: 'number', min: 0, max: 3000, step: 100 } },
    distance: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SlideIn>;

export const FromLeft: Story = {
  args: {
    children: <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>从左侧滑入</div>,
    direction: 'left',
    duration: 1000,
    delay: 0,
    distance: '100%',
  },
};

export const FromRight: Story = {
  args: {
    children: <div style={{ padding: '20px', background: '#e0f7fa', borderRadius: '8px' }}>从右侧滑入</div>,
    direction: 'right',
    duration: 1000,
    delay: 0,
    distance: '100%',
  },
};

export const FromTop: Story = {
  args: {
    children: <div style={{ padding: '20px', background: '#fff9c4', borderRadius: '8px' }}>从顶部滑入</div>,
    direction: 'top',
    duration: 1000,
    delay: 0,
    distance: '100%',
  },
};

export const FromBottom: Story = {
  args: {
    children: <div style={{ padding: '20px', background: '#ffccbc', borderRadius: '8px' }}>从底部滑入</div>,
    direction: 'bottom',
    duration: 1000,
    delay: 0,
    distance: '100%',
  },
}; 