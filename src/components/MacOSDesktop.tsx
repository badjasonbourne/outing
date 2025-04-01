'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MacOSDock from './MacOSDock';
import MacOSWindow from './MacOSWindow';
import ParkGame from './games/ParkGame';
import DrawGuessGame from './games/DrawGuessGame';
import ChineseWhispersGame from './games/ChineseWhispersGame';

// 桌面图标组件
function DesktopIcon({ name, icon, onClick }: { name: string; icon: string; onClick: () => void }) {
  return (
    <motion.div 
      className="flex flex-col items-center w-24 cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-white text-sm font-medium px-2 py-1 text-center rounded bg-gray-800/30 backdrop-blur-sm group-hover:bg-gray-800/40">
        {name}
      </div>
    </motion.div>
  );
}

export default function MacOSDesktop() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  
  // 引导动画
  useEffect(() => {
    // 模拟操作系统启动过程
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // 更新时间和日期
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
      const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      
      setCurrentTime(now.toLocaleTimeString('zh-CN', timeOptions));
      setCurrentDate(now.toLocaleDateString('zh-CN', dateOptions));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  // 处理打开应用
  const handleOpenApp = (app: string) => {
    if (!openApps.includes(app)) {
      setOpenApps([...openApps, app]);
    }
  };

  // 处理关闭应用
  const handleCloseApp = (app: string) => {
    setOpenApps(openApps.filter(a => a !== app));
  };

  // 游戏窗口配置
  const windowConfig = {
    parks: {
      title: '多人配合版逛三园',
      color: 'bg-gray-600',
      content: <ParkGame />
    },
    drawGuess: {
      title: '你猜我画',
      color: 'bg-gray-700',
      content: <DrawGuessGame />
    },
    whispers: {
      title: '传声筒',
      color: 'bg-gray-800',
      content: <ChineseWhispersGame />
    }
  };

  // 引导界面
  if (isBooting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-7xl mb-8">🌐</span>
          <div className="w-20 h-3 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gray-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" 
         style={{ 
           backgroundColor: '#2e3440',
           backgroundImage: 'radial-gradient(circle at center, #434c5e 0%, #2e3440 100%)',
         }}>
      {/* 顶部状态栏 */}
      <div className="fixed top-0 left-0 right-0 h-8 bg-gray-900/50 backdrop-blur-lg z-50 flex items-center justify-between px-4 text-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-xl">🌐</span>
          <span className="font-semibold">团建游戏系统</span>
          <span>文件</span>
          <span>编辑</span>
          <span>查看</span>
          <span>窗口</span>
          <span>帮助</span>
        </div>
        <div className="flex items-center gap-4">
          <span>🔋 100%</span>
          <span>📶 Wi-Fi</span>
          <span>{currentTime}</span>
        </div>
      </div>
      
      {/* 桌面图标 */}
      <div className="pt-16 pl-6 grid grid-cols-1 gap-4">
        <DesktopIcon 
          name="关于我们" 
          icon="📋" 
          onClick={() => {}} 
        />
        <DesktopIcon 
          name="游戏说明" 
          icon="📖" 
          onClick={() => {}} 
        />
        <DesktopIcon 
          name="系统设置" 
          icon="⚙️" 
          onClick={() => {}} 
        />
      </div>
      
      {/* 应用窗口 */}
      <AnimatePresence>
        {openApps.map(app => {
          const { title, color, content } = windowConfig[app as keyof typeof windowConfig];
          return (
            <MacOSWindow 
              key={app}
              title={title}
              color={color}
              onClose={() => handleCloseApp(app)}
            >
              {content}
            </MacOSWindow>
          );
        })}
      </AnimatePresence>
      
      {/* Dock */}
      <MacOSDock onOpenApp={handleOpenApp} openApps={openApps} />
    </div>
  );
} 