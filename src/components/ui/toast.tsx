import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 1000, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 1);
    }, duration / 100);

    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 p-4 flex items-center gap-2 rounded-full bg-green_translucent backdrop-blur-lg">
      <Image src="/assets/check-circle.svg" alt="Check" width={20} height={20} />
      <span className="text-green_full font-normal">{message}</span>
      <div className="absolute bottom-0 left-0 w-full h-[1px] rounded-b-full bg-green_full" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Toast;
