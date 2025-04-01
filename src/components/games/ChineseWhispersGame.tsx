'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RulesModal from './RulesModal';

// 传声筒游戏的句子
const WHISPER_SENTENCES = [
  '南京市长江大桥非常雄伟壮观',
  '黑化肥发灰会挥发发灰黑化肥挥发',
  '小驼峰和大驼峰命名法是编程中常用的变量命名方式',
  '人们提倡和平共处与发展是因为和平与发展是永恒的主题',
  '在山的那边海的那边有一群蓝精灵',
  '如果真爱有颜色那一定是蓝色',
  '程序员最怕的就是编程序的时候突然断网',
  '我们一起学猫叫一起喵喵喵喵喵',
  '生活就像一盒巧克力你永远不知道下一颗是什么味道',
  '这里的山路十八弯请司机师傅小心驾驶'
];

export default function ChineseWhispersGame() {
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<'简单' | '中等' | '困难'>('中等');
  const [showRules, setShowRules] = useState(false);

  // 根据难度获取字体大小
  const getFontSizeByDifficulty = () => {
    switch (difficulty) {
      case '简单': return 'text-2xl';
      case '中等': return 'text-xl';
      case '困难': return 'text-base';
    }
  };

  // 显示单个句子
  const showSentence = (index: number) => {
    setActiveSentenceIndex(index);
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
          <p className="text-sm">1. 将参与者排成一排或一圈</p>
          <p className="text-sm">2. 第一位参与者查看屏幕上的句子，并小声在第二位参与者耳边说出该句子</p>
          <p className="text-sm">3. 第二位参与者听到后，再传递给第三位，以此类推</p>
          <p className="text-sm">4. 最后一位参与者大声说出他/她所听到的句子</p>
          <p className="text-sm">5. 对比最初和最终的句子，看看信息传递过程中的变化</p>
          <p className="text-sm">6. 可以分成多组同时进行，比较哪组传递的信息更准确</p>
        </div>
      </RulesModal>

      {/* 难度选择 */}
      <div className="bg-[#F2F2F7] rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">难度：</span>
          <div className="flex">
            {(['简单', '中等', '困难'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors mx-1 ${
                  difficulty === level 
                    ? 'bg-white shadow-sm text-gray-800' 
                    : 'bg-transparent text-gray-500'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 句子展示区域 */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-600">选择句子</h3>
        </div>
        
        <AnimatePresence mode="wait">
          {activeSentenceIndex !== null ? (
            <motion.div
              key="selected-sentence"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="bg-white px-6 py-6 rounded-lg text-center mb-4 max-w-2xl shadow-sm border border-gray-100">
                <span className={`font-medium text-gray-800 ${getFontSizeByDifficulty()}`}>
                  {WHISPER_SENTENCES[activeSentenceIndex]}
                </span>
              </div>
              
              <button 
                onClick={() => setActiveSentenceIndex(null)}
                className="px-4 py-1.5 bg-[#F2F2F7] text-gray-600 text-xs font-medium rounded-full"
              >
                返回列表
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="sentence-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {WHISPER_SENTENCES.map((sentence, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white p-2.5 rounded-lg hover:shadow-md cursor-pointer flex items-center shadow-sm transition-shadow"
                  onClick={() => showSentence(index)}
                >
                  <div className="w-6 h-6 rounded-full bg-[#F2F2F7] flex items-center justify-center mr-2.5">
                    <span className="font-medium text-xs text-gray-700">{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {sentence.length > 15 ? `${sentence.substring(0, 15)}...` : sentence}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 