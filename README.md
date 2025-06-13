# LuminaFloating Animation

一个简单易用的React动画组件库，提供浮动元素动画效果。

## 安装

```bash
npm install @lumina/animate
```

## 使用方法

```jsx
import React, { useRef } from 'react';
import { LuminaFloating } from '@lumina/animate';

const MyComponent = () => {
  const targetRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setIsAnimating(true);
    
    // 动画完成后的回调
    const handleComplete = () => {
      setIsAnimating(false);
    };
    
    return (
      <div>
        <button onClick={handleClick}>点击触发动画</button>
        
        <div ref={targetRef}>目标元素</div>
        
        {isAnimating && (
          <LuminaFloating
            startX={rect.left}
            startY={rect.top}
            targetElement={targetRef.current}
            imageUrl={yourImageUrl}
            count={10}
            beatTime={0.8}
            flyToTargetDuration={0.8}
            onComplete={handleComplete}
          />
        )}
      </div>
    );
  };
};
```

## 可配置参数

| 参数名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| startX | number | 必填 | 起始X坐标 |
| startY | number | 必填 | 起始Y坐标 |
| targetElement | HTMLElement | 必填 | 目标DOM元素 |
| imageUrl | string | 必填 | 浮动元素的图片URL |
| count | number | 10 | 浮动元素的数量 |
| beatTime | number | 0.8 | 跳动动画持续时间(秒) |
| positiveSequence | boolean | false | 是否正序，false是倒序 |
| randomOffsetX | number | 40 | X轴随机偏移量(像素) |
| randomOffsetY | number | 50 | Y轴随机偏移量(像素) |
| flyToTargetDuration | number | 0.8 | 飞向目标元素的动画时间(秒) |
| jumpDelay | number | 0.3 | 跳动动画的随机延迟最大值(秒) |
| flyDelay | number | 0.1 | 飞行动画的间隔时间(秒) |
| jumpingAnimationClass | string | 'jumping-animation' | 自定义跳动动画类名 |
| flyToTargetClass | string | 'fly-to-target' | 自定义飞行动画类名 |
| floatingItemClass | string | 'floating-item' | 自定义浮动元素类名 |
| onComplete | function | - | 动画完成时的回调函数 |
