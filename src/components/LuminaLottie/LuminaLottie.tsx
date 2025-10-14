import React from 'react';
import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import './LuminaLottie.css';
import './LuminaLottie.less';

interface LuminaLottieProps {
    path?: string
    animationData?: unknown
    className?: string
    width?: number | string
    height?: number | string
    renderer?: 'svg' | 'canvas' | 'html'
    startFrame?: number // 循环的起始帧
    endFrame?: number // 循环的结束帧
    speed?: number
    speedLoop?: number
    initialDirection?: -1 | 1 // -1: 反向(124→54), 1: 正向(54→124)
}

export default function LuminaLottie({
    path,
    animationData,
    className = '',
    width = '100%',
    height = '100%',
    startFrame,
    endFrame,
    speed = 1,
    speedLoop = 1,
    renderer = 'canvas',
    initialDirection = -1,
}: LuminaLottieProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
    const isInitializedRef = useRef(false)

    // 使用useRef存储参数，避免依赖变化
    const paramsRef = useRef({
        path,
        animationData,
        startFrame,
        endFrame,
        speed,
        speedLoop,
        renderer
    })

    useEffect(() => {
        if (!containerRef.current || isInitializedRef.current) {
            return;
        }

        isInitializedRef.current = true
        const params = paramsRef.current
        let animation: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

        // 创建动画实例
        animation = lottie.loadAnimation({
            container: containerRef.current!,
            renderer: params.renderer,
            loop: false,
            autoplay: false,
            ...(params.path ? { path: params.path } : { animationData: params.animationData }),
        });

        animationRef.current = animation

        // 播放状态管理
        let isFirstPlay = true;
        let isLooping = false;
        let currentDirection = initialDirection; // -1: 反向(末尾→开始), 1: 正向(开始→末尾)

        // 供循环使用的帧边界，若props未提供，将在data_ready根据动画实际帧数计算
        let loopStartFrame = typeof startFrame === 'number' ? params?.startFrame : 0;
        let loopEndFrame = typeof endFrame === 'number' ? params?.endFrame : 0;

        // 数据准备完成
        animation.addEventListener('data_ready', () => {
            animation.setSpeed(params.speed);
            // 若未传入，使用动画帧范围作为循环边界
            if (typeof params?.startFrame !== 'number') {
                loopStartFrame = animation?.firstFrame || 0;
            }
            if (typeof params?.endFrame !== 'number') {
                const total = typeof animation.totalFrames === 'number' ? animation.totalFrames : 0;
                loopEndFrame = Math.max(animation?.totalFrames || 0, total > 0 ? total - 1 : 0);
            }

            // 第一次播放：从开始到末尾
            animation.goToAndStop(0, true);
            animation.play();
        });

        // 双向循环播放函数
        const startLoop = () => {
            if (!isLooping) return;
            if (currentDirection === -1) {
                // 反向播放：end→start
                animation.playSegments([loopEndFrame, loopStartFrame], true);
            } else {
                // 正向播放：start→end
                animation.playSegments([loopStartFrame, loopEndFrame], true);
            }
        };

        // 监听播放完成
        animation.addEventListener('complete', () => {
            // 第一次循环都是开始帧到结束帧一个完整循环，如果参数传递了startFrame、endFrame则开始循环片段
            if (isFirstPlay) {
                isFirstPlay = false;
                isLooping = true;
                animation.setSpeed(params.speedLoop);
                startLoop();
            } else if (isLooping) {
                // 循环播放完成，切换方向
                currentDirection *= -1;
                startLoop();
            }
        });

        return () => {
            isInitializedRef.current = false
            if (animation) {
                animation.removeEventListener('data_ready');
                animation.removeEventListener('complete');
                animation.destroy();
                animationRef.current = null
            }
        };
    }, [])

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ width, height }}
        ></div>
    )
}
