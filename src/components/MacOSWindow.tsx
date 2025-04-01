'use client';

import { ReactNode, useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';

interface MacOSWindowProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  color: string;
  onFullScreenChange?: (isFullScreen: boolean) => void; // 新增属性，用于通知父组件全屏状态变化
}

export default function MacOSWindow({ 
  children, 
  title, 
  onClose, 
  color,
  onFullScreenChange 
}: MacOSWindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const dragControls = useDragControls();
  
  // 当全屏状态变化时通知父组件
  useEffect(() => {
    if (onFullScreenChange) {
      onFullScreenChange(isFullScreen);
    }
  }, [isFullScreen, onFullScreenChange]);

  // 切换全屏状态
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  
  // 窗口控制按钮（关闭、最大化）
  const windowControls = (
    <div className="flex space-x-2.5">
      <button 
        onClick={onClose}
        className="w-4 h-4 rounded-full bg-[#FF5F57] hover:bg-[#FF4A4A] flex items-center justify-center transition-colors"
        aria-label="关闭"
      >
        <X className="w-2.5 h-2.5 text-white opacity-0 hover:opacity-100" strokeWidth={2.5} />
      </button>
      <button 
        onClick={toggleFullScreen}
        className="w-4 h-4 rounded-full bg-[#28C840] hover:bg-[#25B73B] flex items-center justify-center transition-colors"
        aria-label={isFullScreen ? "退出全屏" : "全屏"}
      >
        {isFullScreen ? 
          <Minimize2 className="w-2.5 h-2.5 text-white opacity-0 hover:opacity-100" strokeWidth={2.5} /> : 
          <Maximize2 className="w-2.5 h-2.5 text-white opacity-0 hover:opacity-100" strokeWidth={2.5} />
        }
      </button>
    </div>
  );

  // 跟踪窗口的位置
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // 处理拖动结束事件
  const handleDragEnd = (event: any, info: any) => {
    setPosition({ x: info.point.x, y: info.point.y });
    setIsDragging(false);
  };
  
  return (
    <motion.div
      className={`${
        isFullScreen ? 'fixed inset-0 z-50 m-0 rounded-none' : 'absolute top-[10%] left-1/2 max-w-6xl w-[90vw] h-[80vh] rounded-lg'
      } bg-white shadow-lg border border-gray-200 overflow-hidden`}
      initial={{ 
        opacity: 0, 
        scale: 0.8, 
        x: isFullScreen ? 0 : '-50%',
        y: 0 
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: isFullScreen ? 0 : '-50%',
        y: isFullScreen ? 0 : undefined, // 确保全屏时y坐标为0
        transition: { type: 'spring', stiffness: 300, damping: 25 }
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.8, 
        transition: { duration: 0.2 } 
      }}
      drag={!isFullScreen}
      dragControls={dragControls}
      dragMomentum={false}
      dragListener={false} // 只允许在标题栏拖动
      onDragEnd={handleDragEnd}
      style={{
        // 确保全屏时窗口位置被重置
        height: isFullScreen ? '100%' : undefined,
        top: isFullScreen ? '0' : undefined,
        left: isFullScreen ? '0' : undefined,
        right: isFullScreen ? '0' : undefined,
        bottom: isFullScreen ? '0' : undefined,
        transform: isFullScreen ? 'none' : undefined, // 确保全屏时不应用任何transform
      }}
    >
      {/* 窗口标题栏 */}
      <motion.div 
        className={`${color} px-3 py-2 flex items-center cursor-grab active:cursor-grabbing border-b border-gray-200`}
        onPointerDown={(e) => {
          if (!isFullScreen) {
            setIsDragging(true);
            dragControls.start(e);
          }
        }}
        onPointerUp={() => setIsDragging(false)}
      >
        {windowControls}
        <div className="flex-1 text-center">
          <h3 className="text-gray-600 font-medium text-xs">{title}</h3>
        </div>
        <div className="w-10"></div> {/* 为了平衡标题栏布局 */}
      </motion.div>
      
      {/* 窗口内容 */}
      <div className="h-[calc(100%-34px)] overflow-y-auto bg-white">
        {children}
      </div>
    </motion.div>
  );
}
