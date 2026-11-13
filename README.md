# LuminaFloating

一个React动画组件，可以在页面上生成浮动元素，如心形、星星等图片，然后朝目标元素飞去。

## 安装

```bash
npm install lumina-animate
```

## 使用方法

```jsx
import React, { useState } from 'react';
import { LuminaFloating } from 'lumina-animate';
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

## 发布到 npm

仓库名是 `animation-pack`，npm 包名是 `lumina-animate`。在仓库根目录逐步执行，任一步失败先解决再继续。

### 1. 同步代码并检查线上版本

先确认待发布的改动已经合入 `master`，工作区没有未提交的改动。

```bash
git switch master
git pull --ff-only origin master
git status --short
npm view lumina-animate dist-tags --registry=https://registry.npmjs.org/
npm pkg get version
```

如果本地版本落后于线上，先同步对应的发布提交，避免使用已发布过的版本号。

### 2. 安装依赖并检查构建产物

```bash
npm ci
npm run build
npm pack --dry-run
```

如果 `npm ci` 提示 `package.json` 和 `package-lock.json` 不同步，先运行 `npm install --package-lock-only`，检查并提交更新后的 `package-lock.json`，再从 `npm ci` 开始重跑。如果锁文件里的镜像下载超时，可用 `npm ci --registry=https://registry.npmjs.org/ --replace-registry-host=always` 改用官方源下载。

确认打包清单包含 `dist/index.js`、`dist/index.esm.js`、`dist/index.d.ts` 和 `README.md`。组件有改动时，运行 `npm run storybook` 检查受影响的示例。

### 3. 升版并发布

按改动选一个升版命令：

| 改动 | 命令 | 从 `1.0.10` 升版的示例 |
|---|---|---|
| 向后兼容的修复 | `npm version patch` | `1.0.11` |
| 向后兼容的新功能 | `npm version minor` | `1.1.0` |

`npm version` 会更新 `package.json` 和 `package-lock.json`，并创建版本提交和 Git 标签。执行前确认工作区干净。然后用有该包发布权限的 npm 账号登录：

```bash
npm login --registry=https://registry.npmjs.org/
npm whoami --registry=https://registry.npmjs.org/
npm publish --tag latest --registry=https://registry.npmjs.org/
```

`npm publish` 会通过 `prepublishOnly` 重新构建。发布时按提示完成 [npm 双重验证](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/)。如果发布报错，先查线上版本；若新版本尚未上传，解决错误后重试 `npm publish`，无需再次升版。

### 4. 验证并推送 Git 标签

```bash
npm view lumina-animate@latest version --registry=https://registry.npmjs.org/
git push origin master
# 以 1.0.11 为例，请替换为本次实际创建的标签
git push origin v1.0.11
```

确认 `latest` 返回本次版本号后再推送提交和标签。

## 许可证

MIT
