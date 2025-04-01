'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 园区和词汇数据
const PARKS_DATA = [
  {
    name: '动物园',
    words: ['大熊猫', '长颈鹿', '企鹅', '猴子', '大象', '老虎', '狮子', '孔雀', '鳄鱼', '袋鼠']
  },
  {
    name: '植物园',
    words: ['向日葵', '睡莲', '仙人掌', '樱花', '玫瑰', '松树', '竹子', '杜鹃花', '荷花', '兰花']
  },
  {
    name: '游乐园',
    words: ['过山车', '摩天轮', '碰碰车', '旋转木马', '海盗船', '鬼屋', '射击游戏', '自由落体', '水上滑梯', '激流勇进']
  }
];

export default function ParkGame() {
  const [activeParkIndex, setActiveParkIndex] = useState(0);
  const [showAllWords, setShowAllWords] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [showRules, setShowRules] = useState(false);

  const activePark = PARKS_DATA[activeParkIndex];

  // 切换到下一个园区
  const nextPark = () => {
    setActiveParkIndex((prev) => (prev + 1) % PARKS_DATA.length);
    setShowAllWords(false);
    setActiveWordIndex(null);
  };

  // 切换到上一个园区
  const prevPark = () => {
    setActiveParkIndex((prev) => (prev - 1 + PARKS_DATA.length) % PARKS_DATA.length);
    setShowAllWords(false);
    setActiveWordIndex(null);
  };

  // 切换词汇显示模式
  const toggleWordsDisplay = () => {
    setShowAllWords((prev) => !prev);
    setActiveWordIndex(null);
  };

  // 显示单个词汇
  const showWord = (index: number) => {
    setActiveWordIndex(index);
    setShowAllWords(false);
  };

  return (
    <div className="flex flex-col p-5 h-full">
      {/* 顶部导航和标题 */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">多人配合版逛三园</h1>
        <button 
          onClick={() => setShowRules(!showRules)}
          className="px-3 py-1 text-xs font-medium bg-[#F2F2F7] text-gray-600 rounded-full"
        >
          {showRules ? '隐藏规则' : '查看规则'}
        </button>
      </div>

      {/* 游戏说明 */}
      <AnimatePresence>
        {showRules && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="bg-[#F2F2F7] p-3 rounded-lg mb-2">
              <h2 className="text-sm font-medium mb-2 text-gray-800">游戏规则</h2>
              <div className="space-y-1 text-xs text-gray-600">
                <p>1. 将参与者分成若干小组，每组3-5人</p>
                <p>2. 每组选出一名"描述者"，其他成员作为"猜测者"</p>
                <p>3. "描述者"描述屏幕上的词语，<span className="font-medium">不能直接说出该词语或其中的字</span></p>
                <p>4. "猜测者"根据描述猜出词语</p>
                <p>5. 主持人可切换词语和园区，各组轮流进行</p>
                <p>6. 正确猜出词语最多的小组获胜</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 园区选择器 */}
      <div className="flex items-center justify-between bg-[#F2F2F7] rounded-lg px-4 py-3 mb-4">
        <button 
          onClick={prevPark}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <motion.div
          key={activePark.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="font-medium text-center"
        >
          <h2 className="text-lg font-bold text-gray-800">
            {activePark.name}
          </h2>
        </motion.div>
        
        <button 
          onClick={nextPark}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 词汇展示控制按钮 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-600">选择词语</h3>
        <div className="flex bg-[#F2F2F7] p-0.5 rounded-lg">
          <button 
            onClick={() => {
              setShowAllWords(false);
              setActiveWordIndex(null);
            }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              !showAllWords && activeWordIndex === null 
                ? 'bg-white shadow-sm text-gray-800' 
                : 'text-gray-500'
            }`}
          >
            列表
          </button>
          <button 
            onClick={toggleWordsDisplay}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              showAllWords 
                ? 'bg-white shadow-sm text-gray-800' 
                : 'text-gray-500'
            }`}
          >
            全部
          </button>
        </div>
      </div>
        
      {/* 词汇展示区域 */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {showAllWords ? (
            <motion.div
              key="all-words"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2"
            >
              {activePark.words.map((word, index) => (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="bg-white px-2 py-3 rounded-lg text-center shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                  onClick={() => showWord(index)}
                >
                  <span className="text-sm font-medium text-gray-800">{word}</span>
                </motion.div>
              ))}
            </motion.div>
          ) : activeWordIndex !== null ? (
            <motion.div
              key="single-word"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center justify-center h-52"
            >
              <div className="bg-white px-10 py-8 rounded-lg text-center shadow-sm border border-gray-100 mb-3">
                <span className="text-3xl font-bold text-gray-800">{activePark.words[activeWordIndex]}</span>
              </div>
              
              <button 
                onClick={() => setActiveWordIndex(null)}
                className="px-4 py-1.5 bg-[#F2F2F7] text-gray-600 text-xs font-medium rounded-full"
              >
                返回
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="word-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2"
            >
              {activePark.words.map((_, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white px-2 py-3 rounded-lg text-center shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                  onClick={() => showWord(index)}
                >
                  <span className="text-sm font-medium text-gray-600">词语 {index + 1}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 