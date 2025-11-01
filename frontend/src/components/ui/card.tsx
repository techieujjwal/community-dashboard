import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border shadow-sm bg-white p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardSectionProps) {
  return (
    <div className={`mb-2 font-semibold text-lg ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: CardSectionProps) {
  return <div className={`text-gray-700 ${className}`}>{children}</div>;
}
