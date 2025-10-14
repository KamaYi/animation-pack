import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import LuminaLottie from './LuminaLottie';

const meta: Meta<typeof LuminaLottie> = {
  title: 'Animation/LuminaLottie',
  component: LuminaLottie,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LuminaLottie>;

export const Primary: Story = {
  args: {},
  render: (args: any) => <LuminaLottie
    {...args}
    path="/lottie_home.json"
    width={500}
    height={400}
    renderer="canvas"
    startFrame={58}
    endFrame={124}
  />,
};
