'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">团队建设活动</h1>
        <p className="text-xl md:text-2xl mb-12">欢迎参加我们精心策划的互动团建活动！</p>
        
        <div className="space-y-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link href="/games" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-xl font-bold rounded-full shadow-lg transition duration-300">
              开始团建活动
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 text-white/80 text-sm"
      >
        <p>准备好体验令人难忘的团队活动了吗？</p>
      </motion.div>
    </main>
  );
}
