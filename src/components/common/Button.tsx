import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "font-medium rounded-xl transition-all duration-200 inline-flex items-center justify-center";

  const variants = {
    primary:
      "bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700 shadow-sm hover:shadow-md disabled:from-gray-400 disabled:to-gray-400",
    secondary:
      "bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 shadow-sm hover:shadow-md",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled
          ? "cursor-not-allowed opacity-60"
          : "hover:scale-105 active:scale-95"
      } ${className}`}
    >
      {children}
    </button>
  );
};
