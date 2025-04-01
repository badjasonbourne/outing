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
      
      {/* 轮换图片 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-12"
      >
        <img 
          src="/images/beer.png" 
          alt="Beer" 
          className="max-w-[200px] md:max-w-[250px]"
        />
      </motion.div>
      
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
