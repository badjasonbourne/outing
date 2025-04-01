'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface DockIconProps {
  name: string;
  color: string;
  onClick: () => void;
  isActive: boolean;
}

export default function MacOSDock({ 
  onOpenApp,
  openApps = [] 
}: { 
  onOpenApp: (app: string) => void;
  openApps?: string[];
}) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const DockIcon = ({ name, color, onClick, isActive }: DockIconProps) => {
    // 图标上的提示文字
    const tooltipVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 }
    };
    
    // 为每个游戏分配一个图标和名称
    let iconSymbol = '🎮';
    let displayName = name;
    let iconBg = '';
    
    if (name === 'parks') {
      iconSymbol = '🏞️';
      displayName = '逛三园';
      iconBg = 'bg-[#34C759]/10';
    } else if (name === 'drawGuess') {
      iconSymbol = '🎨';
      displayName = '你猜我画';
      iconBg = 'bg-[#FF9500]/10';
    } else if (name === 'whispers') {
      iconSymbol = '🔊';
      displayName = '传声筒';
      iconBg = 'bg-[#007AFF]/10';
    }
    
    return (
      <div className="flex items-center justify-center">
        {hoveredIcon === name && (
          <motion.div
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-[calc(100%+2px)] px-3 py-1.5 bg-gray-800/90 backdrop-blur-sm text-white text-xs rounded-md whitespace-nowrap"
          >
            {displayName}
          </motion.div>
        )}
        <motion.div
          className={`relative flex items-center justify-center w-10 h-10 rounded-xl ${iconBg} border border-gray-100 cursor-pointer shadow-sm`}
          whileHover={{ 
            scale: 1.1,
            y: -3,
            transition: { type: "spring", stiffness: 400, damping: 15 }
          }}
          onHoverStart={() => setHoveredIcon(name)}
          onHoverEnd={() => setHoveredIcon(null)}
          onClick={onClick}
          animate={{
            boxShadow: isActive 
              ? '0 0 0 2px rgba(0,122,255,0.3), 0 4px 8px rgba(0,0,0,0.05)' 
              : '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <span className="text-xl">{iconSymbol}</span>
          {isActive && (
            <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-[#007AFF]"></div>
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center z-50">
      <motion.div 
        className="h-14 px-[100px] rounded-2xl backdrop-blur-xl bg-white/80 flex items-center gap-3"
        style={{ 
          boxShadow: '0 0 1px rgba(0,0,0,0.5), 0 8px 30px rgba(0,0,0,0.1)'
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <DockIcon 
          name="parks" 
          color="bg-[#34C759]"
          onClick={() => onOpenApp('parks')}
          isActive={openApps.includes('parks')}
        />
        <DockIcon 
          name="drawGuess" 
          color="bg-[#FF9500]"
          onClick={() => onOpenApp('drawGuess')}
          isActive={openApps.includes('drawGuess')}
        />
        <DockIcon 
          name="whispers" 
          color="bg-[#007AFF]"
          onClick={() => onOpenApp('whispers')}
          isActive={openApps.includes('whispers')}
        />
      </motion.div>
    </div>
  );
}
