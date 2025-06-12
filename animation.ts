interface FloatingOptions {
    startX: number;
    startY: number;
    targetElement: HTMLElement;
    imageUrl: string;
    count?: number;
    duration?: number;
    beatTime?: number; // 跳动动画的持续时间(s)
    positiveSequence?: boolean; // 是否正序，false是倒序
    randomOffsetX?: number; // 随机偏移量X轴，0是不便宜
    randomOffsetY?: number; // 随机偏移量Y轴，0是不便宜
    flyToTargetDuration?: number; // 飞向目标元素的动画时间(s)
    jumpDelay?: number; // 跳动动画的随机延迟最大值(s)
    flyDelay?: number; // 飞行动画的间隔时间(s)
    jumpingAnimationClass?: string; // 自定义跳动动画类名
    flyToTargetClass?: string; // 自定义飞行动画类名
    floatingItemClass?: string; // 自定义浮动元素类名
}
/**
 * 
 *   const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const avatar = document.getElementById('avatar');
    if (!avatar) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const startX = rect.left;
    const startY = rect.top;

    createFloatingElements({
      startX,
      startY,
      targetElement: avatar,
      imageUrl: event.currentTarget.src,
      count: 10,
      duration: 4000
    });
  };
 * 
 */

/**
 * 创建浮动元素
 * @param options 
 * @returns 
 */
export const createFloatingElements = ({
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
    flyToTargetClass = 'fly-to-target',
    floatingItemClass = 'floating-item',
}: FloatingOptions) => {
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

        // 应用循环跳动动画，每个元素有一个小的随机延迟
        const randomJumpDelay = Math.random() * jumpDelay;
        const jumpTimerId = setTimeout(() => {
            floatingEl.classList.add(jumpingAnimationClass);
        }, randomJumpDelay * 1000);
        timerIds.push(jumpTimerId as unknown as number);
    }

    // 等待beatTime后，停止跳动，按顺序飞向目标
    const mainTimerId = setTimeout(() => {
        // 停止所有元素的跳动动画
        elements.forEach(el => {
            el.classList.remove(jumpingAnimationClass);
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
                el.classList.add(flyToTargetClass);

                // 动画结束后移除元素
                const cleanupTimerId = setTimeout(() => {
                    document.body.removeChild(el);

                    // 如果是最后一个元素，清除所有定时器
                    if (index === elements.length - 1) {
                        timerIds.forEach((id) => clearTimeout(id));
                    }
                }, flyToTargetDuration * 1000);
                timerIds.push(cleanupTimerId as unknown as number);
            }, currentFlyDelay * 1000);
            timerIds.push(flyTimerId as unknown as number);
        });
    }, beatTime * 1000);
    timerIds.push(mainTimerId as unknown as number);

    // 返回清除函数，可以在外部手动清除所有定时器
    return () => {
        timerIds.forEach((id) => clearTimeout(id));
    };
};
