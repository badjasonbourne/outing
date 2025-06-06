'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const images = [
    { src: '/images/beer.png', alt: 'Beer' },
    { src: '/images/fruit.png', alt: 'Fruit' },
    { src: '/images/Jazz.png', alt: 'Jazz' }
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 每3秒切换一次图片
    
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <main 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden" 
      style={{ 
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #f5f5f7 100%)',
      }}
    >
      
      {/* 轮换图片 */}
      <div className="mb-12 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.2, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              duration: 0.8
            }}
            className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full overflow-hidden border-4 border-white shadow-lg"
          >
            <Image 
              src={images[currentImageIndex].src} 
              alt={images[currentImageIndex].alt} 
              className="w-full h-full object-cover rounded-full"
              width={200}
              height={200}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* 开始按钮 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link 
          href="/games" 
          className="inline-block"
        >
          <Image 
            src="/images/go.png" 
            alt="进入系统" 
            className="w-[200px] h-auto"
            width={200}
            height={100}
          />
        </Link>
      </motion.div>
    
    </main>
  );
}
