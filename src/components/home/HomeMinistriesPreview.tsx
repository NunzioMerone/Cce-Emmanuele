import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ministry } from "../../types/ministries";
import { storage } from "../../utils/storageUtils";
import { ministriesMock } from "../../utils/ministriesMock";

export const HomeMinistriesPreview: React.FC = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = storage.getMinistries();
    const all = stored || ministriesMock;
    setMinistries(all.slice(0, 4));
  }, []);

  const handleMinistryClick = (ministryId: string) => {
    navigate(`/ministeri?id=${ministryId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {ministries.map((ministry, index) => (
        <div
          key={ministry.id}
          onClick={() => handleMinistryClick(ministry.id)}
          className="group relative bg-gradient-to-br from-white to-blue-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 cursor-pointer"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "both",
          }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

          {/* Icon - full width at top */}
          <div className="relative w-full h-40 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-all duration-500">
            <img
              src={ministry.image}
              alt={ministry.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="relative text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {ministry.title}
            </h3>
            <p className="relative text-sm text-gray-600 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
              {ministry.description}
            </p>
          </div>

          {/* Hover Arrow */}
          <div className="absolute bottom-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
