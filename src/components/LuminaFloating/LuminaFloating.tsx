import React, { useEffect, useRef, useState, cloneElement, isValidElement, ReactElement } from 'react';
import { LuminaFloatingProps } from '../../types';
import './LuminaFloating.less';

type AnimationType = 1 | 2;

const LuminaFloating: React.FC<LuminaFloatingProps> = ({
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
  targetId,
  onComplete,
  children
}) => {
  const cleanupRef = useRef<(() => void) | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [startPosition, setStartPosition] = useState<{ x: number, y: number } | null>(null);

  // 处理子元素的点击事件
  const handleChildClick = (event: React.MouseEvent) => {
    if (isAnimating) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    setStartPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setIsAnimating(true);
  };

  // 克隆子元素并添加点击事件
  const enhancedChildren = React.Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement<any>, {
        onClick: (e: React.MouseEvent) => {
          handleChildClick(e);
          // 如果原来有onClick，也要调用
          if (typeof (child as ReactElement<any>).props.onClick === 'function') {
            (child as ReactElement<any>).props.onClick(e);
          }
        },
        style: {
          ...((child as ReactElement<any>).props.style || {}),
          cursor: 'pointer'
        }
      });
    }
    return child;
  });

  useEffect(() => {
    if (!isAnimating || !startPosition) return;

    // 获取容器内的第一个子元素作为起始元素（如果未指定startX/startY）
    if (!containerRef.current) return;
    
    const firstChild = containerRef.current.firstElementChild as HTMLElement;
    if (!firstChild) return;

    // 使用传入的startX/startY或计算得到的startPosition
    const startX = startPosition.x;
    const startY = startPosition.y;
    
    // 获取目标元素 - 首先尝试使用targetId，如果没有则使用容器中的第一个子元素
    let target: HTMLElement;
    
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (!targetElement) {
        console.error(`目标元素未找到: #${targetId}`);
        return;
      }
      target = targetElement;
    } else {
      target = firstChild;
    }
    
    const targetRect = target.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;

    // 创建元素并存储它们的引用
    const elements: HTMLImageElement[] = [];
    // 存储所有定时器ID
    const timerIds: number[] = [];

    // 根据动画类型确定等待时间
    const waitBeforeFly = jumpingAnimationType === 1 ? beatTime : 
                          jumpingAnimationType === 2 ? 0.8 : 
                          beatTime; // 默认使用beatTime

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
      let actualJumpingAnimationClass = '';
      switch (jumpingAnimationType) {
        case 1:
          actualJumpingAnimationClass = jumpingAnimationClass;
          break;
        case 2:
          actualJumpingAnimationClass = 'coin-spin-animation';
          break;
        default:
          actualJumpingAnimationClass = jumpingAnimationClass;
          break;
      }
        
      // 记录动画类型，用于后续处理
      floatingEl.dataset.animationType = jumpingAnimationType.toString();
        
      // 应用循环跳动动画，每个元素有一个小的随机延迟
      const randomJumpDelay = Math.random() * jumpDelay;
      const jumpTimerId = setTimeout(() => {
        floatingEl.classList.add(actualJumpingAnimationClass);
      }, randomJumpDelay * 1000);
      timerIds.push(jumpTimerId as unknown as number);
    }

    // 等待动画效果结束后，按顺序飞向目标
    const mainTimerId = setTimeout(() => {
      // 对于类型1(跳动动画)，需要停止无限循环的动画
      if (jumpingAnimationType === 1) {
        elements.forEach(el => {
          el.classList.remove('jumping-animation');
        });
      }
      // 类型2(散开动画)已经是forwards模式，无需移除类，会自动保持在最后一帧

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
            if (index === elements.length - 1) {
              setIsAnimating(false);
              if (onComplete) {
                onComplete();
              }
            }
          }, animationDuration * 1000);
          timerIds.push(cleanupTimerId as unknown as number);
        }, currentFlyDelay * 1000);
        timerIds.push(flyTimerId as unknown as number);
      });
    }, waitBeforeFly * 1000);
    timerIds.push(mainTimerId as unknown as number);

    // 保存清除函数
    const cleanup = () => {
      timerIds.forEach((id) => clearTimeout(id));
      elements.forEach((el) => {
        if (document.body.contains(el)) {
          document.body.removeChild(el);
        }
      });
      setIsAnimating(false);
    };
    
    cleanupRef.current = cleanup;

    // 组件卸载时清除
    return cleanup;
  }, [
    startPosition,
    isAnimating,
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
    targetId,
    onComplete
  ]);

  // 渲染一个不可见的容器来包含子元素
  return (
    <div 
      ref={containerRef} 
      style={{ 
        display: 'contents'
      }}
    >
      {enhancedChildren}
    </div>
  );
};

export default LuminaFloating; 