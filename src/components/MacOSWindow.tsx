'use client';

import { ReactNode, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';

interface MacOSWindowProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  color: string;
}

export default function MacOSWindow({ children, title, onClose, color }: MacOSWindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const dragControls = useDragControls();
  
  // 窗口控制按钮（关闭、最小化、最大化）
  const windowControls = (
    <div className="flex space-x-2">
      <button 
        onClick={onClose}
        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
      />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <button 
        onClick={() => setIsFullScreen(!isFullScreen)}
        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
      />
    </div>
  );

  return (
    <motion.div
      className={`absolute top-[10%] left-1/2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden ${
        isFullScreen ? 'fixed inset-0 z-50 m-0 rounded-none' : 'max-w-6xl w-[90vw] h-[80vh]'
      }`}
      initial={{ 
        opacity: 0, 
        scale: 0.8, 
        x: '-50%',
        y: 0 
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
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
      dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
      dragElastic={0.1}
      dragListener={false} // 只允许在标题栏拖动
    >
      {/* 窗口标题栏 */}
      <motion.div 
        className={`${color} px-4 py-3 flex items-center cursor-grab active:cursor-grabbing`}
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
          <h3 className="text-white font-medium text-sm">{title}</h3>
        </div>
        <div className="w-12"></div> {/* 为了平衡标题栏布局 */}
      </motion.div>
      
      {/* 窗口内容 */}
      <div className="h-[calc(100%-40px)] overflow-y-auto p-6 bg-white">
        {children}
      </div>
    </motion.div>
  );
} 