import React from 'react';

interface TargetProps {
  x: number;
  y: number;
  size: number;
  onClick: () => void;
}

const Target: React.FC<TargetProps> = ({ x, y, size, onClick }) => {
  return (
    <div
      className="absolute rounded-full bg-red-500 cursor-pointer"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      onClick={onClick}
    />
  );
};

export default Target;