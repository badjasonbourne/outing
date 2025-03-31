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
            <h2 className="text-3xl font-bold mb-6">请选择一个游戏开始</h2>
            <p className="text-xl">点击上方的游戏按钮开始团队活动</p>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
      {/* 顶部导航 */}
      <nav className="bg-white/10 backdrop-blur-md p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-white hover:text-blue-200 transition-colors">
            <span className="text-xl font-bold">← 返回首页</span>
          </Link>
          
          <div className="flex gap-3 md:gap-6">
            <GameButton
              name="多人配合版逛三园"
              isActive={activeGame === GAMES.PARKS}
              onClick={() => setActiveGame(GAMES.PARKS)}
            />
            <GameButton
              name="你猜我画" 
              isActive={activeGame === GAMES.DRAW_GUESS}
              onClick={() => setActiveGame(GAMES.DRAW_GUESS)}
            />
            <GameButton
              name="传声筒"
              isActive={activeGame === GAMES.WHISPERS}
              onClick={() => setActiveGame(GAMES.WHISPERS)}
            />
          </div>
        </div>
      </nav>

      {/* 游戏内容区域 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <motion.div
          key={activeGame || 'default'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8"
        >
          {renderGameContent()}
        </motion.div>
      </div>
    </main>
  );
}

interface GameButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

function GameButton({ name, isActive, onClick }: GameButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-200 ${
        isActive 
          ? 'bg-white text-blue-700 shadow-lg' 
          : 'bg-white/20 hover:bg-white/30'
      }`}
    >
      {name}
    </motion.button>
  );
} 