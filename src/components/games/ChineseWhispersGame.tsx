'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RulesModal from './RulesModal';

// 传声筒游戏的句子
const WHISPER_SENTENCES = [
  '大摇大摆',
  '见钱眼开',
  '相见恨晚',
  '一刀两断',
  '牛郎织女',
  '呼风唤雨',
  '闻鸡起舞',
  '眉飞色舞',
  '天寒地冻',
  '眉开眼笑',
  '贼眉鼠眼'
];

export default function ChineseWhispersGame() {
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [showSentence, setShowSentence] = useState(false);

  // 切换到下一个词
  const nextSentence = () => {
    setActiveSentenceIndex((prev) => (prev + 1) % WHISPER_SENTENCES.length);
  };

  // 切换到上一个词
  const prevSentence = () => {
    setActiveSentenceIndex((prev) => (prev - 1 + WHISPER_SENTENCES.length) % WHISPER_SENTENCES.length);
  };

  return (
    <div className="flex flex-col p-5 h-full">
      {/* 顶部导航和标题 */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">传声筒</h1>
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
          <p className="text-sm">1. 每组游戏由5人参与，每组进行一次，最终决出1组胜出。</p>
          <p className="text-sm">2. 每队轮流参赛，每队任选5名成员。</p>
          <p className="text-sm">3. 第一人将对手所出题目，通过音效和动作演绎给队友。</p>
          <p className="text-sm">4. 队友依次将信息传递给下一位队友，只能通过音效和动作表达。</p>
          <p className="text-sm">5. 最后一名队友根据接收到的信息，猜测题目上的内容。</p>
          <p className="text-sm">6. 最终根据猜测的准确性，决出胜出队伍。</p>
        </div>
      </RulesModal>

      {/* 句子展示区域 */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full max-w-md bg-[#F2F2F7] rounded-lg px-4 py-6 mb-4">
          <button 
            onClick={prevSentence}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={WHISPER_SENTENCES[activeSentenceIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                {showSentence ? WHISPER_SENTENCES[activeSentenceIndex] : `第 ${activeSentenceIndex + 1} / ${WHISPER_SENTENCES.length} 个词`}
              </h2>
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={nextSentence}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 显示词语按钮 */}
        <button
          onMouseDown={() => setShowSentence(true)}
          onMouseUp={() => setShowSentence(false)}
          onMouseLeave={() => setShowSentence(false)}
          onTouchStart={() => setShowSentence(true)}
          onTouchEnd={() => setShowSentence(false)}
          className="px-6 py-4 bg-black text-white font-medium rounded-lg shadow-sm hover:bg-gray-800 transition-colors w-full max-w-md"
        >
          显示词语
        </button>

        {/* 当前进度指示器 */}
        <div className="flex gap-2 mt-4">
          {WHISPER_SENTENCES.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeSentenceIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
