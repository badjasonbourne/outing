'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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

  // 根据难度获取字体大小
  const getFontSizeByDifficulty = () => {
    switch (difficulty) {
      case '简单': return 'text-3xl md:text-4xl';
      case '中等': return 'text-2xl md:text-3xl';
      case '困难': return 'text-xl md:text-2xl';
    }
  };

  // 显示单个句子
  const showSentence = (index: number) => {
    setActiveSentenceIndex(index);
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* 游戏标题 */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          传声筒
        </h1>
        <div className="h-1 w-32 md:w-48 bg-green-400 mx-auto rounded-full"></div>
      </div>

      {/* 游戏说明 */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">游戏规则</h2>
        <div className="space-y-2 text-gray-700">
          <p>1. 将参与者排成一排或一圈</p>
          <p>2. 第一位参与者查看屏幕上的句子，并小声在第二位参与者耳边说出该句子</p>
          <p>3. 第二位参与者听到后，再传递给第三位，以此类推</p>
          <p>4. 最后一位参与者大声说出他/她所听到的句子</p>
          <p>5. 对比最初的句子和最终的句子，看看信息传递过程中发生了哪些变化</p>
          <p>6. 可以分成多组同时进行，比较哪组传递的信息更准确</p>
        </div>
      </div>

      {/* 难度选择 */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-gray-50 p-5 rounded-lg border border-gray-100">
        <span className="text-lg font-medium text-gray-700">难度：</span>
        <div className="flex gap-2">
          {(['简单', '中等', '困难'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                difficulty === level 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* 句子展示区域 */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold mb-6 text-gray-800">选择句子</h3>
        
        {activeSentenceIndex !== null ? (
          <div className="flex flex-col items-center">
            <motion.div
              key={WHISPER_SENTENCES[activeSentenceIndex]}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="bg-white px-8 py-6 rounded-lg text-center mb-6 max-w-2xl shadow-sm border border-green-200"
            >
              <span className={`font-bold text-gray-800 ${getFontSizeByDifficulty()}`}>
                {WHISPER_SENTENCES[activeSentenceIndex]}
              </span>
            </motion.div>
            
            <button 
              onClick={() => setActiveSentenceIndex(null)}
              className="px-6 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full font-medium transition-colors"
            >
              返回列表
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHISPER_SENTENCES.map((sentence, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                className="bg-white p-3 rounded-lg hover:bg-green-50 cursor-pointer flex items-center border border-gray-100"
                onClick={() => showSentence(index)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <span className="font-bold text-gray-700">{index + 1}</span>
                </div>
                <span className="text-lg font-medium text-gray-700 truncate">
                  {sentence.length > 20 ? `${sentence.substring(0, 20)}...` : sentence}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 