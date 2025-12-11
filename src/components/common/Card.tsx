import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  onClick,
  style,
}) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
        hover ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
