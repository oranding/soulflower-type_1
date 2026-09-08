import React from 'react';
import { FontSizeMode } from '../types';
import { BookOpen, QrCode, Type } from 'lucide-react';

interface HeaderProps {
  fontSize: FontSizeMode;
  setFontSize: (size: FontSizeMode) => void;
  onOpenGuide: () => void;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  fontSize,
  setFontSize,
  onOpenGuide,
  onOpenShare,
}) => {
  return (
    <header className="w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E3DDD3] sticky top-0 z-30 transition-all">
      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Title Area */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-full bg-[#E5ECE7] border border-[#C5D9CB] flex items-center justify-center text-[#3D6348] shrink-0 shadow-xs">
            {/* Elegant Botanical Symbol */}
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a5 5 0 0 1 5 5c0 3-5 9-5 9s-5-6-5-9a5 5 0 0 1 5-5Z" />
              <path d="M12 16v6" />
              <path d="M9 19c1.5.5 4.5.5 6 0" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#243E2C] font-serif-title">
              靈魂之花生命原型計算器
            </h1>
            <p className="text-xs sm:text-sm text-[#677A6D] mt-0.5">
              工作坊現場專用・溫暖心理探索工具
            </p>
          </div>
        </div>

        {/* Action Controls (Font size & modals) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Font Size Adjuster for elders/readability */}
          <div className="flex items-center bg-[#EFECE5] rounded-lg p-1 border border-[#DFD8CC]">
            <span className="text-[11px] font-medium text-[#7A7365] px-1.5 flex items-center gap-0.5">
              <Type className="w-3.5 h-3.5" />
              字級
            </span>
            <button
              type="button"
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 text-xs rounded-md transition-colors ${
                fontSize === 'normal'
                  ? 'bg-white text-[#243E2C] font-bold shadow-xs'
                  : 'text-[#656055] hover:text-[#243E2C]'
              }`}
            >
              標準
            </button>
            <button
              type="button"
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 text-xs rounded-md transition-colors ${
                fontSize === 'large'
                  ? 'bg-white text-[#243E2C] font-bold shadow-xs'
                  : 'text-[#656055] hover:text-[#243E2C]'
              }`}
            >
              大字
            </button>
            <button
              type="button"
              onClick={() => setFontSize('extra-large')}
              className={`px-2 py-0.5 text-xs rounded-md transition-colors ${
                fontSize === 'extra-large'
                  ? 'bg-white text-[#243E2C] font-bold shadow-xs'
                  : 'text-[#656055] hover:text-[#243E2C]'
              }`}
            >
              特大
            </button>
          </div>

          {/* Archetypes Guide button */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#2E5437] bg-[#E8EFE9] border border-[#BFD4C4] hover:bg-[#DDE8DF] transition-colors active:scale-95"
            title="查看九大原型與三大航線"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">原型總覽</span>
          </button>

          {/* QR Share for peer mobile scanning */}
          <button
            type="button"
            onClick={onOpenShare}
            className="p-1.5 rounded-lg text-[#556057] hover:text-[#243E2C] hover:bg-[#EBE7DF] border border-[#DFD8CC] transition-colors active:scale-95"
            title="現場掃碼分享"
            aria-label="現場掃碼分享"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
