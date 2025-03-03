"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BingoMessageProps {
  show: boolean;
}

export function BingoMessage({ show }: BingoMessageProps) {
  const [message, setMessage] = useState('');
  
  const positiveMessages = [
    "BINGO! Congratulations on your misfortunes!",
    "BINGO! You're winning at life's challenges!",
    "BINGO! Your suffering has paid off!",
    "BINGO! You've collected quite the set of misfortunes!",
    "BINGO! Life has truly blessed you with problems!",
    "BINGO! What an achievement in adversity!",
    "BINGO! Your misfortune collection is complete!",
    "BINGO! You're officially a champion of life's difficulties!"
  ];
  
  useEffect(() => {
    if (show) {
      // Select a random message
      const randomIndex = Math.floor(Math.random() * positiveMessages.length);
      setMessage(positiveMessages[randomIndex]);
    }
  }, [show]);
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        >
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-extrabold">{message}</h2>
            <p className="text-sm mt-1">Isn't life just wonderful?</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 