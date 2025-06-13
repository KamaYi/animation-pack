export interface LuminaFloatingProps {
    startX: number;
    startY: number;
    targetElement: HTMLElement | null;
    imageUrl: string;
    count?: number;
    duration?: number;
    beatTime?: number;
    positiveSequence?: boolean;
    randomOffsetX?: number;
    randomOffsetY?: number;
    flyToTargetDuration?: number;
    jumpDelay?: number;
    flyDelay?: number;
    jumpingAnimationClass?: string;
    flyToTargetClass?: string;
    floatingItemClass?: string;
    onComplete?: () => void;
}
