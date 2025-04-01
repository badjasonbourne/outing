'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RulesModal from './RulesModal';

const DRAW_WORDS = [
  '蜡笔小新', '瑞幸咖啡', '玲娜贝尔', '桃园三结义', '波斯猫', 
  '蜘蛛侠', '自拍杆', '京东总部2号楼', '微波炉', '空气炸锅',
  '海绵宝宝', '清明节', '中秋节', '没头脑和不高兴'
];

export default function DrawGuessGame() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showWord, setShowWord] = useState(false);

  // 计时器逻辑
  useEffect(() => {
    if (!isTimerRunning) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTimerRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // 开始计时
  const startTimer = () => {
    setTimeLeft(60);
    setIsTimerRunning(true);
  };

  // 停止计时
  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  // 重置计时
  const resetTimer = () => {
    setTimeLeft(60);
    setIsTimerRunning(false);
  };

  // 切换到下一个词
  const nextWord = () => {
    setActiveWordIndex((prev) => (prev + 1) % DRAW_WORDS.length);
    resetTimer();
  };

  // 切换到上一个词
  const prevWord = () => {
    setActiveWordIndex((prev) => (prev - 1 + DRAW_WORDS.length) % DRAW_WORDS.length);
    resetTimer();
  };

  return (
    <div className="flex flex-col p-5 h-full">
      {/* 顶部导航和标题 */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">你猜我画</h1>
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
          <p className="text-sm">1. 将参与者分成若干小组，每组至少3人</p>
          <p className="text-sm">2. 每轮选择一名&quot画手&quot，其他队员作为&quot猜测者&quot</p>
          <p className="text-sm">3. &quot画手&quot查看词语，用画图方式表达，<span className="font-medium">不能说话或做手势</span></p>
          <p className="text-sm">4. &quot猜测者&quot根据画面猜测词语，限时60秒</p>
          <p className="text-sm">5. 每轮结束后更换&quot画手&quot</p>
          <p className="text-sm">6. 猜对词语最多的小组获胜</p>
        </div>
      </RulesModal>

      {/* 计时器 */}
      <div className="bg-[#F2F2F7] rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-800">{timeLeft}</span>
          <span className="ml-1 text-sm font-medium text-gray-500">秒</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={startTimer}
            disabled={isTimerRunning}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              isTimerRunning 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-[#34C759] text-white'
            }`}
          >
            开始
          </button>
          <button 
            onClick={stopTimer}
            disabled={!isTimerRunning}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              !isTimerRunning 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-[#FF3B30] text-white'
            }`}
          >
            暂停
          </button>
          <button 
            onClick={resetTimer}
            className="px-3 py-1.5 bg-white text-gray-800 text-xs font-medium rounded-md shadow-sm"
          >
            重置
          </button>
        </div>
      </div>

      {/* 词汇展示区域 */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-md bg-[#F2F2F7] rounded-lg px-4 py-6 mb-4">
          <button 
            onClick={prevWord}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={DRAW_WORDS[activeWordIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                {showWord ? DRAW_WORDS[activeWordIndex] : `第 ${activeWordIndex + 1} / ${DRAW_WORDS.length} 个词`}
              </h2>
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={nextWord}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 显示词语按钮 */}
        <button
          onMouseDown={() => setShowWord(true)}
          onMouseUp={() => setShowWord(false)}
          onMouseLeave={() => setShowWord(false)}
          onTouchStart={() => setShowWord(true)}
          onTouchEnd={() => setShowWord(false)}
          className="px-6 py-4 bg-black text-white font-medium rounded-lg shadow-sm hover:bg-gray-800 transition-colors w-full max-w-md"
        >
          显示词语
        </button>

        {/* 当前进度指示器 */}
        <div className="flex gap-2 mt-4">
          {DRAW_WORDS.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeWordIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 

// 将所有未转义的双引号 " 替换为 &quot;
// 例如:
// 从: <p>这是"引号"示例</p>
// 到: <p>这是&quot;引号&quot;示例</p>


