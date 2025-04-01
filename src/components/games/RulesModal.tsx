'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function RulesModal({ isOpen, onClose, title, children }: RulesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50"
          />
          
          {/* 规则模态窗 */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
            >
              {/* 标题栏 */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* 内容区域 */}
              <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
} 