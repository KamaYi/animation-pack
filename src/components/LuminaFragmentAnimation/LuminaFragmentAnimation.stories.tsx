import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import LuminaFragmentAnimation from './LuminaFragmentAnimation';
import LoadingAnimation1 from './components/Loading/Loading1';

const meta: Meta<typeof LuminaFragmentAnimation> = {
  title: 'Animation-Fragment/LuminaFragmentAnimation',
  component: LuminaFragmentAnimation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LuminaFragmentAnimation>;

export const Primary: Story = {
  args: {},
  render: (args: any) => <LuminaFragmentAnimation {...args} />,
};
export const Loading1: Story = {
  args: {},
  render: (args: any) => <LoadingAnimation1 {...args} />,
};
