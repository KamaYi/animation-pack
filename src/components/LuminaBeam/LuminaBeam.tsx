import React, { ReactNode } from 'react';
import './LuminaBeam.less';

export interface LuminaBeamProps {
  /**
   * 子元素
   */
  children: ReactNode;
  
  /**
   * 光束大小
   * @default 50px
   */
  beamSize?: number;
  
  /**
   * 动画持续时间（秒）
   * @default 6
   */
  duration?: number;
  
  /**
   * 动画延迟（秒）
   * @default 0
   */
  delay?: number;
  
  /**
   * 光束渐变起始颜色
   * @default #ffaa40
   */
  colorFrom?: string;
  
  /**
   * 光束渐变结束颜色
   * @default #9c40ff
   */
  colorTo?: string;
  
  /**
   * 是否反向动画
   * @default false
   */
  reverse?: boolean;
  
  /**
   * 边框宽度
   * @default 1px
   */
  borderWidth?: string;
  
  /**
   * 边框圆角
   * @default 8px
   */
  borderRadius?: string;
  
  /**
   * 背景色
   * @default transparent
   */
  backgroundColor?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * 边框光束组件
 */
const LuminaBeam: React.FC<LuminaBeamProps> = ({
  children,
  beamSize = 50,
  duration = 6,
  delay = 0,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  reverse = false,
  borderWidth = '1px',
  borderRadius = '8px',
  backgroundColor = 'transparent',
  className = '',
  style = {},
}) => {
  // 构建样式
  const containerStyle: React.CSSProperties = {
    ...style,
    '--beam-size': `${beamSize}px`,
    '--duration': `${duration}s`,
    '--delay': `${delay}s`,
    '--color-from': colorFrom,
    '--color-to': colorTo,
    '--border-width': borderWidth,
    '--border-radius': borderRadius,
    '--background-color': backgroundColor,
  } as React.CSSProperties;
  
  return (
    <div 
      className={`lumina-beam-container ${className}`} 
      style={containerStyle}
    >
      <div className="lumina-beam-content">
        {children}
      </div>
      <div className="lumina-beam-border">
        <div className={`lumina-beam ${reverse ? 'reverse' : ''}`}></div>
      </div>
    </div>
  );
};

export default LuminaBeam; 