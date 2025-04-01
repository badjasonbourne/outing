'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DRAW_WORDS = [
  '篮球', '雨伞', '手机', '电视', '冰箱', 
  '眼镜', '飞机', '汽车', '蛋糕', '椅子'
];

export default function DrawGuessGame() {
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showRules, setShowRules] = useState(false);

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

  // 显示单个词语
  const showWord = (index: number) => {
    setActiveWordIndex(index);
  };

  return (
    <div className="flex flex-col p-5 h-full">
      {/* 顶部导航和标题 */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">你猜我画</h1>
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
                <p>1. 将参与者分成若干小组，每组至少3人</p>
                <p>2. 每轮选择一名"画手"，其他队员作为"猜测者"</p>
                <p>3. "画手"查看词语，用画图方式表达，<span className="font-medium">不能说话或做手势</span></p>
                <p>4. "猜测者"根据画面猜测词语，限时60秒</p>
                <p>5. 每轮结束后更换"画手"</p>
                <p>6. 猜对词语最多的小组获胜</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-600">选择词语</h3>
        </div>
        
        <AnimatePresence mode="wait">
          {activeWordIndex !== null ? (
            <motion.div 
              key="selected-word"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center justify-center h-48"
            >
              <div className="bg-white px-10 py-8 rounded-lg text-center shadow-sm border border-gray-100 mb-3">
                <span className="text-3xl font-bold text-gray-800">{DRAW_WORDS[activeWordIndex]}</span>
              </div>
              
              <button 
                onClick={() => setActiveWordIndex(null)}
                className="px-4 py-1.5 bg-[#F2F2F7] text-gray-600 text-xs font-medium rounded-full"
              >
                返回列表
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="word-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2"
            >
              {DRAW_WORDS.map((word, index) => (
                <motion.div
                  key={word}
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