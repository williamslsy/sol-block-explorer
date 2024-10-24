import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CustomCardProps {
  width?: string;
  title: string;
  children: React.ReactNode;
  textColor?: string;
  icon?: React.ReactElement;
}

const CustomCard: React.FC<CustomCardProps> = ({ width = 'w-full', title, children, textColor = 'text-white', icon }) => {
  return (
    <Card className={`relative flex h-auto items-center justify-between rounded-2xl border border-white/10 bg-[#111111] ${width}`}>
      <CardHeader className="flex items-center gap-2">
        {icon && <div className="mr-2">{React.cloneElement(icon, { className: 'h-5 w-5' })}</div>}
        <CardTitle className={`text-white/60 text-xs ${textColor}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
