import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CircleX } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose: () => void;
}

const Toast = ({ message, type = 'success', duration = 1000, onClose }: ToastProps) => {
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

  const bgColor = type === 'success' ? 'bg-green_translucent' : 'bg-red-500/20 backdrop-blur-lg';
  const textColor = type === 'success' ? 'text-green_full' : 'text-red-500';
  const icon = type === 'success' ? <Image src="/assets/check-circle.svg" alt="Success" width={20} height={20} /> : <CircleX size={20} className="text-red-500" />;

  return (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 p-4 flex items-center gap-2 rounded-full ${bgColor} backdrop-blur-lg`}>
      {icon}
      <span className={`font-normal ${textColor}`}>{message}</span>
      <div className="absolute bottom-0 left-0 w-full h-[1px] rounded-b-full bg-green_full" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Toast;
