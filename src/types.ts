import { ReactNode } from 'react';

export interface LuminaFloatingProps {
  imageUrl: string;
  count?: number;
  duration?: number;
  beatTime?: number; // 跳动动画的持续时间(s)
  positiveSequence?: boolean; // 是否正序，false是倒序
  randomOffsetX?: number; // 随机偏移量X轴，0是不偏移
  randomOffsetY?: number; // 随机偏移量Y轴，0是不偏移
  flyToTargetDuration?: number; // 飞向目标元素的动画时间(s)
  jumpDelay?: number; // 跳动动画的随机延迟最大值(s)
  flyDelay?: number; // 飞行动画的间隔时间(s)
  jumpingAnimationClass?: string; // 自定义跳动动画类名
  jumpingAnimationType?: 1 | 2; // 1=默认跳动，2=散开
  flyToTargetClass?: string; // 自定义飞行动画类名
  floatingItemClass?: string; // 自定义浮动元素类名
  targetId?: string; // 目标元素的ID
  onComplete?: () => void;
  children: ReactNode;
} 