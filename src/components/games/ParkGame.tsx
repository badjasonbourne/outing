'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import RulesModal from './RulesModal';

// 园区数据
const PARKS_DATA = [
  { name: '例子：动物园', icon: '🦁' },
  { name: '植物园', icon: '🌺' },
  { name: '游乐园', icon: '🎡' }
];

export default function ParkGame() {
  const [activeParkIndex, setActiveParkIndex] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const activePark = PARKS_DATA[activeParkIndex];

  // 切换到下一个园区
  const nextPark = () => {
    setActiveParkIndex((prev) => (prev + 1) % PARKS_DATA.length);
  };

  // 切换到上一个园区
  const prevPark = () => {
    setActiveParkIndex((prev) => (prev - 1 + PARKS_DATA.length) % PARKS_DATA.length);
  };

  return (
    <div className="flex flex-col p-5 h-full">
      {/* 顶部导航和标题 */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">多人配合版逛三园</h1>
        <button 
          onClick={() => setShowRules(true)}
          className="px-3 py-1 text-xs font-medium bg-[#F2F2F7] text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
        >
          查看规则
        </button>
      </div>

      {/* 规则模态窗 */}
      <RulesModal
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        title="游戏规则"
      >
        <div className="space-y-3 text-gray-600">
          <p className="text-sm">1. 将参与者分成若干小组，每组3-5人</p>
          <p className="text-sm">2. 每组选出一名"描述者"，其他成员作为"猜测者"</p>
          <p className="text-sm">3. "描述者"根据当前园区主题，描述一个相关事物，<span className="font-medium">不能直接说出该事物的名称</span></p>
          <p className="text-sm">4. "猜测者"根据描述猜出事物名称</p>
          <p className="text-sm">5. 主持人可切换园区，各组轮流进行</p>
          <p className="text-sm">6. 正确猜出事物最多的小组获胜</p>
        </div>
      </RulesModal>

      {/* 园区展示区域 */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-md bg-[#F2F2F7] rounded-lg px-4 py-6 mb-4">
          <button 
            onClick={prevPark}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <motion.div
            key={activePark.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">{activePark.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800">
              {activePark.name}
            </h2>
          </motion.div>
          
          <button 
            onClick={nextPark}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 当前进度指示器 */}
        <div className="flex gap-2 mt-4">
          {PARKS_DATA.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeParkIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 