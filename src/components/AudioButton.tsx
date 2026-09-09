import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speechService } from '../services/speechService';

interface AudioButtonProps {
  text: string;
  rate?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  rate = 0.85,
  className = '',
  size = 'md',
  label
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    try {
      await speechService.speak(text, rate);
    } catch (err) {
      console.error('Audio play error:', err);
    } finally {
      setIsPlaying(false);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs gap-1',
    md: 'p-2.5 text-sm gap-1.5',
    lg: 'p-3.5 text-base gap-2'
  };

  const iconSizes = {
    sm: 15,
    md: 19,
    lg: 24
  };

  return (
    <button
      onClick={handlePlay}
      type="button"
      title={`Écouter "${text}"`}
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer select-none font-medium active:scale-95 ${
        isPlaying
          ? 'bg-rose-500 text-white shadow-md shadow-rose-200 ring-2 ring-rose-300 animate-pulse'
          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 border border-indigo-200/60 shadow-xs'
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <Volume2 size={iconSizes[size]} className="animate-bounce" />
      ) : (
        <Volume2 size={iconSizes[size]} />
      )}
      {label && <span>{label}</span>}
    </button>
  );
};
