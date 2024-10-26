import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface InfoCardProps {
  title: string;
  content: string | React.ReactNode;
  fullWidth?: boolean;
  highlighted?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content, fullWidth = false, highlighted = false }) => {
  return (
    <Card className={`relative flex items-center justify-center rounded-3xl border border-titanium bg-dark py-5 px-6 ${fullWidth ? 'col-span-4' : 'col-span-1'}`}>
      <div className="text-center">
        <div className="text-white_secondary text-xs mb-2">{title}</div>
        <div className={`font-medium text-sm mt-2 ${highlighted ? 'text-green_mantis' : 'text-white_primary'}`}>{content}</div>
      </div>
    </Card>
  );
};

export default InfoCard;
