import React from "react";
import { SectionTitleProps } from "../../types/common";

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = "center",
}) => {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <div className={`mb-12 ${alignClass}`}>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
