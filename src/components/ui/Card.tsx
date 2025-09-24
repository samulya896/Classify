import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick
}) => {
  const MotionDiv = motion.div;

  return (
    <MotionDiv
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${
        hover ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      {...(hover && {
        whileHover: { y: -4, shadow: '0 10px 25px rgba(0, 0, 0, 0.1)' },
        transition: { duration: 0.2 }
      })}
    >
      {children}
    </MotionDiv>
  );
};

export default Card;