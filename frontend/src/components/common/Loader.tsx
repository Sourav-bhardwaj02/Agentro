import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface LoaderProps {
  className?: string;
  size?: number;
  text?: string;
}

export const Loader = ({ className, size = 24, text }: LoaderProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
      <Loader2 size={size} className="animate-spin text-primary" />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
};
