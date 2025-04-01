'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden" 
      style={{ 
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #f5f5f7 100%)',
      }}
    >
      {/* Logo与动画 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <span className="text-8xl">🖥️</span>
      </motion.div>
      
      {/* 主标题 */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-4xl md:text-5xl font-semibold mb-6 text-gray-800 text-center"
      >
        团建活动游戏系统
      </motion.h1>
      
      {/* 副标题 */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-lg md:text-xl text-gray-500 mb-12 text-center max-w-xl px-6"
      >
        一站式团建活动游戏管理系统，为您的团队提供丰富多彩的互动体验
      </motion.p>
      
      {/* 开始按钮 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.7 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link 
          href="/games" 
          className="inline-block px-8 py-4 bg-[#007AFF] text-white text-base font-medium rounded-full shadow-md hover:bg-[#0066CC] transition-colors"
        >
          进入系统
        </Link>
      </motion.div>
    
    </main>
  );
}
