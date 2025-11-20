"use client";

import * as React from "react";
import { useState } from "react";

interface FloatingDockProps {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50  rounded-3xl px-12 py-3 shadow-lg flex gap-5 backdrop-blur border border-gray-800"> 
      {items.map((item, index) => {
       
        const distance = hoveredIndex !== null ? Math.abs(index - hoveredIndex) : null;
        
        let scale = 1;
        let translateY = 0;
        
        if (distance !== null) {
          if (distance === 0) {
            scale = 1.4;
            translateY = -8;
          } else if (distance === 1) {
            scale = 1.2;
            translateY = -4;
          } else if (distance === 2) {
            scale = 1.1;
            translateY = -2;
          }
        }

        return (
          <a
            key={item.title}
            href={item.href}
            title={item.title}
            className="flex flex-col items-center px-2 py-1 group relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transform: `scale(${scale}) translateY(${translateY}px)`,
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
           
            <span className="w-6 h-6 flex items-center justify-center">
              {item.icon}
            </span>
           
            {hoveredIndex === index && (
              <span 
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-300 bg-gray-900/95 px-1 py-1 rounded whitespace-nowrap"
                style={{
                  animation: "fadeIn 0.2s ease-in-out",
                }}
              >
                {item.title}
              </span>
            )}
          </a>
        );
      })}
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};
