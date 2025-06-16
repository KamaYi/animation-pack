import React, { useEffect, useRef } from 'react';
import { LuminaFloatingProps } from '../../types';
import './LuminaFloating.less';

type AnimationType = 1 | 2 | 3;

const LuminaFloating: React.FC<LuminaFloatingProps> = ({
  startX,
  startY,
  targetElement,
  imageUrl,
  count = 10,
  beatTime = 0.8,
  positiveSequence = false,
  randomOffsetX = 40,
  randomOffsetY = 50,
  flyToTargetDuration = 0.8,
  jumpDelay = 0.3,
  flyDelay = 0.1,
  jumpingAnimationClass = 'jumping-animation',
  jumpingAnimationType = 1 as AnimationType,
  flyToTargetClass = 'fly-to-target',
  floatingItemClass = 'floating-item',
  onComplete,
}) => {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!targetElement) return;

    const targetRect = targetElement.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;

    // 创建元素并存储它们的引用
    const elements: HTMLImageElement[] = [];
    // 存储所有定时器ID
    const timerIds: number[] = [];

    // 计算图片出现的位置（围绕点击位置的小范围内随机分布）
    for (let i = 0; i < count; i++) {
      // 创建浮动元素
      const floatingEl = document.createElement('img');
      floatingEl.src = imageUrl;
      floatingEl.className = floatingItemClass;

      // 在点击位置周围小范围随机分布
      const offsetX = (Math.random() - 0.5) * randomOffsetX;
      const offsetY = (Math.random() - 0.5) * randomOffsetY;

      floatingEl.style.left = `${startX + offsetX}px`;
      floatingEl.style.top = `${startY + offsetY}px`;

      // 添加到body并存储引用
      document.body.appendChild(floatingEl);
      elements.push(floatingEl);

      // 根据动画类型确定使用哪种动画类
      const actualJumpingAnimationClass = jumpingAnimationType === 1 
        ? jumpingAnimationClass
        : jumpingAnimationType === 2 
        ? 'coin-spin-animation' 
        : jumpingAnimationClass;
        
      // 记录动画类型，用于后续处理
      floatingEl.dataset.animationType = jumpingAnimationType.toString();
        
      // 应用循环跳动动画，每个元素有一个小的随机延迟
      const randomJumpDelay = Math.random() * jumpDelay;
      const jumpTimerId = setTimeout(() => {
        floatingEl.classList.add(actualJumpingAnimationClass);
      }, randomJumpDelay * 1000);
      timerIds.push(jumpTimerId as unknown as number);
    }

    // 等待beatTime后，停止跳动，按顺序飞向目标
    const mainTimerId = setTimeout(() => {
      // 停止所有元素的跳动动画
      elements.forEach(el => {
        el.classList.remove('jumping-animation');
        el.classList.remove('coin-spin-animation');
      });

      // 按顺序飞向目标
      (positiveSequence ? elements : elements.reverse()).forEach((el, index) => {
        // 按顺序延迟飞向目标
        const currentFlyDelay = index * flyDelay;
        const flyTimerId = setTimeout(() => {
          // 获取当前位置
          const rect = el.getBoundingClientRect();
          const currentX = rect.left + rect.width / 2;
          const currentY = rect.top + rect.height / 2;

          // 计算到目标的距离
          const deltaX = targetX - currentX;
          const deltaY = targetY - currentY;

          // 开始飞向目标 - 使用CSS变量和类
          el.style.setProperty('--deltaX', `${deltaX}px`);
          el.style.setProperty('--deltaY', `${deltaY}px`);
          el.style.setProperty('--flyToTargetDuration', `${flyToTargetDuration}s`);
          
          // 所有类型动画使用相同的飞行动画类
          el.classList.add(flyToTargetClass);

          // 所有动画使用相同的动画结束时间
          const animationDuration = flyToTargetDuration;
            
          // 动画结束后移除元素
          const cleanupTimerId = setTimeout(() => {
            if (document.body.contains(el)) {
              document.body.removeChild(el);
            }

            // 如果是最后一个元素，清除所有定时器和执行完成回调
            if (index === elements.length - 1 && onComplete) {
              onComplete();
            }
          }, animationDuration * 1000);
          timerIds.push(cleanupTimerId as unknown as number);
        }, currentFlyDelay * 1000);
        timerIds.push(flyTimerId as unknown as number);
      });
    }, beatTime * 1000);
    timerIds.push(mainTimerId as unknown as number);

    // 保存清除函数
    const cleanup = () => {
      timerIds.forEach((id) => clearTimeout(id));
      elements.forEach((el) => {
        if (document.body.contains(el)) {
          document.body.removeChild(el);
        }
      });
    };
    
    cleanupRef.current = cleanup;

    // 组件卸载时清除
    return cleanup;
  }, [
    startX,
    startY,
    targetElement,
    imageUrl,
    count,
    beatTime,
    positiveSequence,
    randomOffsetX,
    randomOffsetY,
    flyToTargetDuration,
    jumpDelay,
    flyDelay,
    jumpingAnimationClass,
    jumpingAnimationType,
    flyToTargetClass,
    floatingItemClass,
    onComplete
  ]);

  // 这个组件不需要渲染任何内容，它只处理动画效果
  return null;
};

export default LuminaFloating; 