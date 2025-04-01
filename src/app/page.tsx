'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden" 
      style={{ 
        backgroundColor: '#2e3440',
        backgroundImage: 'radial-gradient(circle at center, #434c5e 0%, #2e3440 100%)',
      }}
    >
      {/* Logo与动画 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <span className="text-9xl">🌐</span>
      </motion.div>
      
      {/* 主标题 */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-5xl md:text-7xl font-bold mb-6 text-gray-200 text-center"
      >
        团建活动游戏系统
      </motion.h1>
      
      {/* 副标题 */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-xl md:text-2xl text-gray-400 mb-12 text-center max-w-2xl px-6"
      >
        一站式团建活动游戏管理系统，为您的团队提供丰富多彩的互动体验
      </motion.p>
      
      {/* 开始按钮 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link 
          href="/games" 
          className="inline-block px-10 py-5 bg-gray-700 text-gray-100 text-xl font-medium rounded-full shadow-xl hover:bg-gray-600 transition-colors"
        >
          进入系统
        </Link>
      </motion.div>
      
      {/* 版权信息 */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 text-gray-500 text-sm"
      >
        © 2023 团建活动展示系统
      </motion.footer>
    </main>
  );
}
