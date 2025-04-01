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
    
    if (name === 'parks') {
      iconSymbol = '🏞️';
      displayName = '逛三园';
    } else if (name === 'drawGuess') {
      iconSymbol = '🎨';
      displayName = '你猜我画';
    } else if (name === 'whispers') {
      iconSymbol = '🔊';
      displayName = '传声筒';
    }
    
    return (
      <div className="flex flex-col items-center">
        {hoveredIcon === name && (
          <motion.div
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            className="mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md"
          >
            {displayName}
          </motion.div>
        )}
        <motion.div
          className={`relative flex items-center justify-center w-14 h-14 rounded-2xl ${color} cursor-pointer shadow-md`}
          whileHover={{ y: -10, scale: 1.1 }}
          onHoverStart={() => setHoveredIcon(name)}
          onHoverEnd={() => setHoveredIcon(null)}
          onClick={onClick}
          animate={{
            boxShadow: isActive 
              ? '0 0 0 2px rgba(255,255,255,0.5), 0 8px 16px rgba(0,0,0,0.1)' 
              : '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <span className="text-3xl">{iconSymbol}</span>
          {isActive && (
            <div className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-white"></div>
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center">
      <motion.div 
        className="px-6 py-3 rounded-full backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl flex items-center gap-4"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <DockIcon 
          name="parks" 
          color="bg-yellow-500"
          onClick={() => onOpenApp('parks')}
          isActive={openApps.includes('parks')}
        />
        <DockIcon 
          name="drawGuess" 
          color="bg-pink-500"
          onClick={() => onOpenApp('drawGuess')}
          isActive={openApps.includes('drawGuess')}
        />
        <DockIcon 
          name="whispers" 
          color="bg-green-500"
          onClick={() => onOpenApp('whispers')}
          isActive={openApps.includes('whispers')}
        />
      </motion.div>
    </div>
  );
} 