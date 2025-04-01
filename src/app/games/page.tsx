'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ParkGame from '@/components/games/ParkGame';
import DrawGuessGame from '@/components/games/DrawGuessGame';
import ChineseWhispersGame from '@/components/games/ChineseWhispersGame';

const GAMES = {
  PARKS: 'parks',
  DRAW_GUESS: 'drawGuess',
  WHISPERS: 'whispers',
};

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const renderGameContent = () => {
    switch (activeGame) {
      case GAMES.PARKS:
        return <ParkGame />;
      case GAMES.DRAW_GUESS:
        return <DrawGuessGame />;
      case GAMES.WHISPERS:
        return <ChineseWhispersGame />;
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">请选择一个游戏开始</h2>
            <p className="text-xl text-gray-600">点击上方的游戏按钮开始团队活动</p>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* 顶部导航 */}
      <nav className="py-4 px-6 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-gray-800 hover:text-black transition-colors">
            <span className="text-xl font-bold">← 返回首页</span>
          </Link>
          
          <div className="flex flex-wrap gap-3 md:gap-4">
            <GameButton
              name="多人配合版逛三园"
              isActive={activeGame === GAMES.PARKS}
              onClick={() => setActiveGame(GAMES.PARKS)}
              color="bg-yellow-500"
              textColor="text-yellow-700"
            />
            <GameButton
              name="你猜我画" 
              isActive={activeGame === GAMES.DRAW_GUESS}
              onClick={() => setActiveGame(GAMES.DRAW_GUESS)}
              color="bg-pink-500"
              textColor="text-pink-700"
            />
            <GameButton
              name="传声筒"
              isActive={activeGame === GAMES.WHISPERS}
              onClick={() => setActiveGame(GAMES.WHISPERS)}
              color="bg-green-500"
              textColor="text-green-700"
            />
          </div>
        </div>
      </nav>

      {/* 游戏内容区域 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-gray-50">
        <motion.div
          key={activeGame || 'default'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-6xl bg-white rounded-xl shadow-sm p-6 md:p-8"
        >
          {renderGameContent()}
        </motion.div>
      </div>
      
      {/* 页脚 */}
      <footer className="py-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 text-center text-gray-500 text-sm">
          <p>© 2023 团建活动展示系统</p>
        </div>
      </footer>
    </main>
  );
}

interface GameButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
  color: string;
  textColor: string;
}

function GameButton({ name, isActive, onClick, color, textColor }: GameButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-4 py-2 md:px-5 md:py-2 rounded-full font-medium text-sm md:text-base transition-all duration-200 ${
        isActive 
          ? `bg-black text-white shadow-sm` 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
    >
      {name}
    </motion.button>
  );
} 