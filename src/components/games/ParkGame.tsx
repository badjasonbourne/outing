'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import RulesModal from './RulesModal';

// 园区数据
const PARKS_DATA = [
  { name: '例子：动物园', icon: '🦁' },
  { name: '京东园', icon: '🛒' },
  { name: '美酒园', icon: '🍷' },
  { name: '汽车园', icon: '🚗' },
  { name: '猫猫园', icon: '🐱' },
  { name: '汪汪园', icon: '🐶' },
  { name: '鲜花园', icon: '🌹' },
  { name: '节日园', icon: '🎉' },
  { name: '电器园', icon: '💻' },
  { name: '知识园', icon: '📚' },
  { name: '地理园', icon: '🌍' }
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
          <p className="text-sm">1. 每轮8人参与，进行两轮</p>
          <p className="text-sm">2. 游戏开始，大家围成一圈，2人一队</p>
          <p className="text-sm">3. 主持人说&quot;星期天，逛三园&quot;，所有人接&quot;什么园&quot;</p>
          <p className="text-sm">4. 主持人指定园区（水果园/蔬菜园/动物园）</p>
          <p className="text-sm">5. 每个小队轮流说出与选定园区相关的事物</p>
          <p className="text-sm">6. <span className="font-medium">每个人只能说一个字</span>，需小队成员共同完成</p>
          <p className="text-sm">7. 说错或重复即为淘汰</p>
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
