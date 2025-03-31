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
    <div className="flex flex-col space-y-8">
      {/* 游戏标题 */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-300 drop-shadow-lg">
          多人配合版逛三园
        </h1>
        <div className="h-1 w-32 md:w-48 bg-yellow-400 mx-auto rounded-full"></div>
      </div>

      {/* 游戏说明 */}
      <div className="bg-white/20 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">游戏规则</h2>
        <div className="space-y-2 text-lg">
          <p>1. 将参与者分成若干小组，每组3-5人</p>
          <p>2. 每组选出一名成员作为"描述者"，其他成员作为"猜测者"</p>
          <p>3. "描述者"需要描述屏幕上显示的词语，但<span className="font-bold">不能直接说出该词语或其中的字</span></p>
          <p>4. "猜测者"根据描述猜出词语</p>
          <p>5. 主持人可切换词语和园区，各组轮流进行</p>
          <p>6. 正确猜出的词语数量最多的小组获胜</p>
        </div>
      </div>

      {/* 园区选择器 */}
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={prevPark}
          className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <motion.h2 
          key={activePark.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-3xl md:text-4xl font-bold"
        >
          {activePark.name}
        </motion.h2>
        
        <button 
          onClick={nextPark}
          className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 词汇展示区域 */}
      <div className="bg-white/20 rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold">词汇列表</h3>
          <div className="flex gap-2">
            <button 
              onClick={toggleWordsDisplay}
              className={`px-4 py-1 rounded-md transition-colors ${
                showAllWords ? 'bg-blue-500 text-white' : 'bg-white/30 hover:bg-white/40'
              }`}
            >
              {showAllWords ? '隐藏全部' : '显示全部'}
            </button>
          </div>
        </div>
        
        {showAllWords ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {activePark.words.map((word, index) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="bg-white/30 px-3 py-4 rounded-lg text-center hover:bg-white/40 cursor-pointer"
                onClick={() => showWord(index)}
              >
                <span className="text-lg font-medium">{word}</span>
              </motion.div>
            ))}
          </div>
        ) : activeWordIndex !== null ? (
          <div className="flex justify-center items-center h-40">
            <motion.div
              key={activePark.words[activeWordIndex]}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="bg-white/30 px-12 py-8 rounded-lg text-center"
            >
              <span className="text-4xl font-bold">{activePark.words[activeWordIndex]}</span>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {activePark.words.map((_, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 px-3 py-4 rounded-lg text-center hover:bg-white/20 cursor-pointer"
                onClick={() => showWord(index)}
              >
                <span className="text-lg font-medium">词语 {index + 1}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 