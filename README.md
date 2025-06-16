# LuminaFloating

一个React动画组件，可以在页面上生成浮动元素，如心形、星星等图片，然后朝目标元素飞去。

## 安装

```bash
npm install lumina-floating
```

## 使用方法

```jsx
import React, { useState } from 'react';
import { LuminaFloating } from 'lumina-floating';
import heartImage from './heart.png';

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleClick = (event) => {
    if (isAnimating) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    setStartPosition({
      x: rect.left,
      y: rect.top
    });
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <div>
      <button onClick={handleClick}>
        点击触发动画
      </button>
      
      {isAnimating && (
        <LuminaFloating
          startX={startPosition.x}
          startY={startPosition.y}
          imageUrl={heartImage}
          count={10}
          onComplete={handleAnimationComplete}
        >
          <div className="target-element">
            目标元素
          </div>
        </LuminaFloating>
      )}
    </div>
  );
}
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|---|---|---|---|
| startX | number | 必填 | 动画开始的X坐标 |
| startY | number | 必填 | 动画开始的Y坐标 |
| imageUrl | string | 必填 | 浮动元素的图片URL |
| count | number | 10 | 浮动元素的数量 |
| beatTime | number | 0.8 | 跳动动画的持续时间(秒) |
| positiveSequence | boolean | false | 是否正序，false是倒序 |
| randomOffsetX | number | 40 | 随机偏移量X轴，0是不偏移 |
| randomOffsetY | number | 50 | 随机偏移量Y轴，0是不偏移 |
| flyToTargetDuration | number | 0.8 | 飞向目标元素的动画时间(秒) |
| jumpDelay | number | 0.3 | 跳动动画的随机延迟最大值(秒) |
| flyDelay | number | 0.1 | 飞行动画的间隔时间(秒) |
| jumpingAnimationClass | string | 'jumping-animation' | 自定义跳动动画类名 |
| jumpingAnimationType | 1 \| 2 | 1 | 动画类型：1=默认跳动，2=散开 |
| flyToTargetClass | string | 'fly-to-target' | 自定义飞行动画类名 |
| floatingItemClass | string | 'floating-item' | 自定义浮动元素类名 |
| onComplete | () => void | undefined | 动画完成后的回调函数 |
| children | ReactNode | 必填 | 子元素，将作为飞行目标 |

## 动画类型

组件支持两种动画类型：

1. 默认跳动动画（`jumpingAnimationType={1}`）
2. 散开动画（`jumpingAnimationType={2}`），类似于钻石/金币收集效果

## 自定义样式

您可以通过传递自定义的CSS类名来修改动画样式：

```jsx
<LuminaFloating
  startX={startPosition.x}
  startY={startPosition.y}
  imageUrl={heartImage}
  jumpingAnimationClass="my-jumping-animation"
  flyToTargetClass="my-fly-animation"
  floatingItemClass="my-floating-item"
>
  <div className="target">目标</div>
</LuminaFloating>
```

## 许可证

MIT
