'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DRAW_WORDS = [
  '篮球', '雨伞', '手机', '电视', '冰箱', 
  '眼镜', '飞机', '汽车', '蛋糕', '椅子'
];

export default function DrawGuessGame() {
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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
    <div className="flex flex-col space-y-8">
      {/* 游戏标题 */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          你猜我画
        </h1>
        <div className="h-1 w-32 md:w-48 bg-pink-400 mx-auto rounded-full"></div>
      </div>

      {/* 游戏说明 */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">游戏规则</h2>
        <div className="space-y-2 text-gray-700">
          <p>1. 将参与者分成若干小组，每组至少3人</p>
          <p>2. 每轮游戏选择一名队员作为"画手"，其他队员作为"猜测者"</p>
          <p>3. "画手"查看屏幕上显示的词语，用画图方式表达，<span className="font-bold">不能说话或做手势</span></p>
          <p>4. "猜测者"根据画面猜测词语，限时60秒</p>
          <p>5. 每轮结束后更换"画手"，所有队员都应有机会担任"画手"</p>
          <p>6. 猜对词语最多的小组获胜</p>
        </div>
      </div>

      {/* 计时器 */}
      <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg border border-gray-100">
        <div className="text-3xl font-bold mb-6 text-gray-800">
          {timeLeft} <span className="text-xl font-medium text-gray-500">秒</span>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={startTimer}
            disabled={isTimerRunning}
            className={`px-5 py-2 rounded-full font-medium transition-colors ${
              isTimerRunning 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            开始
          </button>
          <button 
            onClick={stopTimer}
            disabled={!isTimerRunning}
            className={`px-5 py-2 rounded-full font-medium transition-colors ${
              !isTimerRunning 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            暂停
          </button>
          <button 
            onClick={resetTimer}
            className="px-5 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full font-medium transition-colors"
          >
            重置
          </button>
        </div>
      </div>

      {/* 词汇选择区域 */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold mb-6 text-gray-800">选择词语</h3>
        
        {activeWordIndex !== null ? (
          <div className="flex flex-col items-center">
            <motion.div
              key={DRAW_WORDS[activeWordIndex]}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="bg-white px-12 py-8 rounded-lg text-center shadow-sm border border-pink-200 mb-6"
            >
              <span className="text-4xl font-bold text-gray-800">{DRAW_WORDS[activeWordIndex]}</span>
            </motion.div>
            
            <button 
              onClick={() => setActiveWordIndex(null)}
              className="px-6 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full font-medium transition-colors"
            >
              返回列表
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {DRAW_WORDS.map((word, index) => (
              <motion.div
                key={word}
                whileHover={{ scale: 1.02 }}
                className="bg-white px-3 py-6 rounded-lg text-center hover:bg-pink-50 cursor-pointer border border-gray-100"
                onClick={() => showWord(index)}
              >
                <span className="text-lg font-medium text-gray-600">词语 {index + 1}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 