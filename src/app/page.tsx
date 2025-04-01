'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* 主要内容 */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            让团队活动更加精彩
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            一站式团建活动游戏管理系统，为您的团队提供丰富多彩的互动体验
          </p>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link 
              href="/games" 
              className="inline-block px-8 py-4 bg-black text-white text-lg font-medium rounded-full shadow-sm hover:bg-gray-800 transition-colors"
            >
              开始游戏
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 页脚 */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 text-center text-gray-500 text-sm">
          <p>© 2023 团建活动展示系统 - 让团队建设更有趣</p>
        </div>
      </footer>
    </main>
  );
}
