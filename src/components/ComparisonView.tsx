import React, { useState } from 'react';
import { CalculationResult, FontSizeMode } from '../types';
import { ResultCard } from './ResultCard';
import { getAirlineDynamics, AIRLINES_INFO } from '../data/archetypes';
import { Columns, Eye, HeartHandshake, MessageCircleHeart, Users } from 'lucide-react';

interface ComparisonViewProps {
  selfResult: CalculationResult;
  partnerResult: CalculationResult;
  fontSize: FontSizeMode;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  selfResult,
  partnerResult,
  fontSize,
}) => {
  const [mobileView, setMobileView] = useState<'both' | 'self' | 'partner'>('both');

  const dynamics = getAirlineDynamics(
    selfResult.archetype.airline,
    partnerResult.archetype.airline
  );

  const selfAirlineMeta = AIRLINES_INFO[selfResult.archetype.airline];
  const partnerAirlineMeta = AIRLINES_INFO[partnerResult.archetype.airline];

  const titleSize =
    fontSize === 'extra-large'
      ? 'text-xl sm:text-2xl font-bold'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl font-bold'
      : 'text-base sm:text-lg font-bold';

  const bodySize =
    fontSize === 'extra-large'
      ? 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'large'
      ? 'text-sm sm:text-base leading-relaxed'
      : 'text-xs sm:text-sm leading-normal';

  return (
    <div className="w-full mb-8">
      {/* Workshop Relationship Insight Banner */}
      <div className="bg-[#FAF7F0] border border-[#DDD5C5] rounded-2xl p-4 sm:p-6 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-[#E8E1D3]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#E5ECE4] text-[#2F5938] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`${titleSize} text-[#263D2B] font-serif-title`}>
                雙人原型對照與互動指南
              </h3>
              <p className="text-xs text-[#707D72]">
                工作坊現場交流・看見彼此的心理航線與盲點
              </p>
            </div>
          </div>

          {/* Quick Summary Pill on header */}
          <div className="flex items-center gap-1.5 text-xs font-semibold bg-white px-3 py-1.5 rounded-full border border-[#DDD5C5]">
            <span className="text-[#325E3E]">
              {selfResult.archetype.number}型 {selfResult.archetype.name}
            </span>
            <span className="text-[#998F80]">↔</span>
            <span className="text-[#845233]">
              {partnerResult.archetype.number}型 {partnerResult.archetype.name}
            </span>
          </div>
        </div>

        {/* Dynamic Airlines relation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="bg-white/80 rounded-xl p-3.5 border border-[#E5E0D4] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF3EC] text-[#2A5E38] flex flex-col items-center justify-center font-bold shrink-0">
              <span className="text-base font-bold leading-none">
                {selfResult.archetype.number}
              </span>
              <span className="text-[10px]">你的原型</span>
            </div>
            <div>
              <div className="text-sm font-bold text-[#233C2A]">
                {selfResult.archetype.name}
              </div>
              <span
                className={`inline-block px-2 py-0.2 text-[11px] font-semibold rounded ${selfAirlineMeta.badgeBg} ${selfAirlineMeta.badgeText}`}
              >
                {selfResult.archetype.airline}
              </span>
            </div>
          </div>

          <div className="bg-white/80 rounded-xl p-3.5 border border-[#E5E0D4] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FBF1E6] text-[#8C4616] flex flex-col items-center justify-center font-bold shrink-0">
              <span className="text-base font-bold leading-none">
                {partnerResult.archetype.number}
              </span>
              <span className="text-[10px]">對方原型</span>
            </div>
            <div>
              <div className="text-sm font-bold text-[#233C2A]">
                {partnerResult.archetype.name}
              </div>
              <span
                className={`inline-block px-2 py-0.2 text-[11px] font-semibold rounded ${partnerAirlineMeta.badgeBg} ${partnerAirlineMeta.badgeText}`}
              >
                {partnerResult.archetype.airline}
              </span>
            </div>
          </div>
        </div>

        {/* Psychological Insight box */}
        <div className="bg-white rounded-xl p-4 border border-[#DDD6C8] mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4B6852] mb-1.5">
            <HeartHandshake className="w-4 h-4 text-[#4B6852]" />
            <span>{dynamics.relationshipType}</span>
          </div>
          <p className={`${bodySize} text-[#334237] mb-2`}>
            {dynamics.insight}
          </p>

          <div className="pt-2 border-t border-[#EFEBE3] text-xs sm:text-sm text-[#5B6D5E] flex items-start gap-1.5">
            <MessageCircleHeart className="w-4 h-4 text-[#4B7957] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2B4B32]">工作坊對話錦囊：</strong>
              <span>{dynamics.dialogueTip}</span>
            </div>
          </div>
        </div>

        {/* Mobile View Switcher (for small screens) */}
        <div className="flex sm:hidden items-center justify-between pt-2 border-t border-[#E8E1D3]">
          <span className="text-xs text-[#7B7465]">手機檢視模式：</span>
          <div className="inline-flex bg-[#EFECE4] p-0.5 rounded-lg border border-[#D8D2C4] text-xs">
            <button
              type="button"
              onClick={() => setMobileView('both')}
              className={`px-2 py-1 rounded font-medium ${
                mobileView === 'both' ? 'bg-white text-[#233C2A] font-bold shadow-xs' : 'text-[#6C6556]'
              }`}
            >
              並排對照
            </button>
            <button
              type="button"
              onClick={() => setMobileView('self')}
              className={`px-2 py-1 rounded font-medium ${
                mobileView === 'self' ? 'bg-white text-[#233C2A] font-bold shadow-xs' : 'text-[#6C6556]'
              }`}
            >
              僅看自己
            </button>
            <button
              type="button"
              onClick={() => setMobileView('partner')}
              className={`px-2 py-1 rounded font-medium ${
                mobileView === 'partner' ? 'bg-white text-[#233C2A] font-bold shadow-xs' : 'text-[#6C6556]'
              }`}
            >
              僅看對方
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-side Result Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {(mobileView === 'both' || mobileView === 'self') && (
          <ResultCard
            result={selfResult}
            fontSize={fontSize}
            isSideBySide={true}
          />
        )}
        {(mobileView === 'both' || mobileView === 'partner') && (
          <ResultCard
            result={partnerResult}
            fontSize={fontSize}
            isSideBySide={true}
          />
        )}
      </div>
    </div>
  );
};
