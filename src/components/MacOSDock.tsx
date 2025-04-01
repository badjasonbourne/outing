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
      <div className="h-16 flex items-end justify-center">
        {hoveredIcon === name && (
          <motion.div
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            className="absolute mb-16 px-3 py-1 bg-gray-700 text-white text-xs rounded-md"
          >
            {displayName}
          </motion.div>
        )}
        <motion.div
          className={`relative flex items-center justify-center w-12 h-12 rounded-xl ${color} cursor-pointer shadow-md`}
          whileHover={{ 
            scale: 1.15,
            y: -5,
            transition: { type: "spring", stiffness: 400, damping: 15 }
          }}
          onHoverStart={() => setHoveredIcon(name)}
          onHoverEnd={() => setHoveredIcon(null)}
          onClick={onClick}
          animate={{
            boxShadow: isActive 
              ? '0 0 0 2px rgba(255,255,255,0.5), 0 4px 8px rgba(0,0,0,0.15)' 
              : '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <span className="text-2xl">{iconSymbol}</span>
          {isActive && (
            <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-white"></div>
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center z-50">
      <motion.div 
        className="h-16 px-3 rounded-2xl backdrop-blur-md bg-gray-500/20 border border-gray-400/20 shadow-lg flex items-end gap-1"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <DockIcon 
          name="parks" 
          color="bg-gray-600"
          onClick={() => onOpenApp('parks')}
          isActive={openApps.includes('parks')}
        />
        <DockIcon 
          name="drawGuess" 
          color="bg-gray-700"
          onClick={() => onOpenApp('drawGuess')}
          isActive={openApps.includes('drawGuess')}
        />
        <DockIcon 
          name="whispers" 
          color="bg-gray-800"
          onClick={() => onOpenApp('whispers')}
          isActive={openApps.includes('whispers')}
        />
      </motion.div>
    </div>
  );
} 