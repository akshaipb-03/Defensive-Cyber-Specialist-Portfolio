import React, { useEffect, useState } from 'react';

interface TerminalEffectProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export const TerminalEffect: React.FC<TerminalEffectProps> = ({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  delayBetweenWords = 2000,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const fullWord = words[currentWordIndex];

    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      // Typing text
      timer = setTimeout(() => {
        setCurrentText((prev) => fullWord.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // Check if word is fully typed
    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
    } 
    // Check if word is fully deleted
    else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className="font-mono text-cyber-cyan inline-flex items-center">
      {currentText}
      <span className="ml-1 w-2 h-5 bg-cyber-cyan animate-pulse" style={{ animationDuration: '0.8s' }}></span>
    </span>
  );
};
