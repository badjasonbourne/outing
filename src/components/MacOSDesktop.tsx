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
  const [fullScreenAppId, setFullScreenAppId] = useState<string | null>(null);
  
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
    // 如果关闭的是当前全屏的应用，重置全屏状态
    if (app === fullScreenAppId) {
      setFullScreenAppId(null);
    }
    setOpenApps(openApps.filter(a => a !== app));
  };

  // 处理全屏状态变化
  const handleFullScreenChange = (appId: string, isFullScreen: boolean) => {
    if (isFullScreen) {
      setFullScreenAppId(appId);
    } else if (fullScreenAppId === appId) {
      setFullScreenAppId(null);
    }
  };

  // 游戏窗口配置
  const windowConfig = {
    parks: {
      title: '多人配合版逛三园',
      color: 'bg-[#f8f8f8]',
      content: <ParkGame />
    },
    drawGuess: {
      title: '你猜我画',
      color: 'bg-[#f8f8f8]',
      content: <DrawGuessGame />
    },
    whispers: {
      title: '传声筒',
      color: 'bg-[#f8f8f8]',
      content: <ChineseWhispersGame />
    }
  };

  // 引导界面
  if (isBooting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-7xl mb-8">🖥️</span>
          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gray-500 rounded-full"
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
           backgroundColor: '#fafafa',
           backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #f5f5f7 100%)',
         }}>
      {/* 顶部状态栏 */}
      <div className={`fixed top-0 left-0 right-0 h-7 bg-[#f8f8f8] border-b border-gray-200 z-50 flex items-center justify-between px-4 text-gray-700 ${fullScreenAppId ? 'pointer-events-none' : ''}`}>
        <div className="flex items-center gap-4 text-[14px]">
          <span className="text-lg">🖥️</span>
          <span>团建游戏系统</span>
          <span>文件</span>
          <span>编辑</span>
          <span>查看</span>
          <span>窗口</span>
          <span>帮助</span>
        </div>
        <div className="flex items-center gap-4 text-[14px]">
          <span>🔋 100%</span>
          <span>📶 Wi-Fi</span>
          <span>{currentTime}</span>
        </div>
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
              onFullScreenChange={(isFullScreen) => handleFullScreenChange(app, isFullScreen)}
            >
              {content}
            </MacOSWindow>
          );
        })}
      </AnimatePresence>
      
      {/* Dock - 在全屏模式下隐藏 */}
      {fullScreenAppId === null && <MacOSDock onOpenApp={handleOpenApp} openApps={openApps} />}
    </div>
  );
} 