import React, { CSSProperties, SVGProps } from 'react';

// 定义组件 props 的类型
interface IconComponentProps extends Omit<SVGProps<SVGSVGElement>, 'style'> {
  className?: string;
  rotate?: number;
  spin?: boolean;
  style?: CSSProperties;
  twoToneColor?: string | [string, string];
  title?: string;
  width?: string | number;
  height?: string | number;
}

const IconComponent: React.FC<IconComponentProps> = ({
  className = '',
  rotate,
  spin = false,
  style,
  twoToneColor,
  title,
  width = '1em', // 默认值与原代码保持一致
  height = '1em', // 默认值与原代码保持一致
  ...restProps
}) => {
  // 合并样式，处理旋转和动画
  const iconStyle: CSSProperties = {
    ...style,
    // 当 spin 为 true 时，transform 由 CSS 动画控制，手动设置的 rotate 会被覆盖
    transform: rotate && !spin ? `rotate(${rotate}deg)` : undefined,
    // 仅在 spin 为 true 时应用动画
    animation: spin ? 'spin 1s linear infinite' : undefined,
  };

  // 处理双色图标颜色
  const getFillColor = (index: number): string => {
    if (Array.isArray(twoToneColor)) {
      // 如果是数组，返回对应索引的颜色，如果索引越界则返回默认颜色
      return twoToneColor[index] ?? 'currentColor';
    }
    // 如果是字符串，直接返回该颜色
    return twoToneColor ?? 'currentColor';
  };

  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={iconStyle}
      width={width}
      height={height}
      {...restProps}
    >
      {title && <title>{title}</title>}
      
      {/* 使用 <style> 标签定义动画，这是标准做法 */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <path
        d="M512 832c-176.448 0-320-143.552-320-320S335.552 192 512 192s320 143.552 320 320-143.552 320-320 320m0-704C300.256 128 128 300.256 128 512s172.256 384 384 384 384-172.256 384-384S723.744 128 512 128"
        fill={getFillColor(0)}
      />
      <path
        d="M619.072 429.088l-151.744 165.888-62.112-69.6a32 32 0 1 0-47.744 42.624l85.696 96a32 32 0 0 0 23.68 10.688h0.192c8.96 0 17.536-3.776 23.616-10.4l175.648-192a32 32 0 0 0-47.232-43.2"
        fill={getFillColor(1)}
      />
    </svg>
  );
};

export default IconComponent;
