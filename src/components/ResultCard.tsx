import React, { useState } from 'react';
import { CalculationResult, FontSizeMode } from '../types';
import { AIRLINES_INFO } from '../data/archetypes';
import { Copy, Check, Calculator, Compass, Sparkles } from 'lucide-react';

interface ResultCardProps {
  result: CalculationResult;
  fontSize: FontSizeMode;
  isSideBySide?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  fontSize,
  isSideBySide = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [showFormula, setShowFormula] = useState(true);

  const { roleName, dateStr, year, month, day, archetype, steps } = result;
  const airlineMeta = AIRLINES_INFO[archetype.airline];

  // Dynamic typography classes based on senior-friendly font size toggle
  const titleSize =
    fontSize === 'extra-large'
      ? 'text-2xl sm:text-3xl'
      : fontSize === 'large'
      ? 'text-xl sm:text-2xl'
      : 'text-lg sm:text-xl';

  const numberSize =
    fontSize === 'extra-large'
      ? 'text-4xl sm:text-5xl'
      : fontSize === 'large'
      ? 'text-3xl sm:text-4xl'
      : 'text-2xl sm:text-3xl';

  const descSize =
    fontSize === 'extra-large'
      ? 'text-lg sm:text-xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-base sm:text-lg leading-relaxed'
      : 'text-sm sm:text-base leading-normal';

  const handleCopy = async () => {
    const text = `【靈魂之花生命原型】
對象：${roleName}
生日：${year}年${month}月${day}日
原型：${archetype.number}型 ${archetype.name}
所屬航線：${archetype.airline}
原型特質：${archetype.description}
計算過程：${steps.initialFormula}${
      steps.reductions.length > 0
        ? ' → ' + steps.reductions.map((r) => r.formula).join(' → ')
        : ''
    }`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`rounded-2xl border ${
        result.role === 'self'
          ? 'bg-[#F9FBF8] border-[#CFDDD2] shadow-sm'
          : 'bg-[#FCFAF7] border-[#E8DFC9] shadow-sm'
      } p-5 sm:p-6 transition-all relative overflow-hidden flex flex-col justify-between`}
    >
      {/* Top Tag & Identity */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E6E1D8]">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                result.role === 'self'
                  ? 'bg-[#3D6E4A] text-white'
                  : 'bg-[#8A5A3D] text-white'
              }`}
            >
              {roleName}
            </span>
            <span className="text-xs sm:text-sm text-[#6C766E] font-medium">
              西元 {year} 年 {month} 月 {day} 日
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-white border border-[#DDD5C7] text-[#555045] hover:bg-[#F3EFE7] transition-colors"
            title="複製文字摘要"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#3D6E4A]" />
                <span className="text-[#3D6E4A] font-medium">已複製</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#736C5E]" />
                <span>複製結果</span>
              </>
            )}
          </button>
        </div>

        {/* Archetype Main Display Badge */}
        <div className="flex items-start gap-4 mb-5">
          {/* Big Archetype Number Badge */}
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border ${
              archetype.airline === '討好航線'
                ? 'bg-[#EAF3EC] border-[#A9CEB3] text-[#245233]'
                : archetype.airline === '衝突航線'
                ? 'bg-[#FBF1E6] border-[#ECC09E] text-[#8C4616]'
                : 'bg-[#EBF3F6] border-[#A8CCD4] text-[#1E5260]'
            }`}
          >
            <span className={`${numberSize} font-bold font-serif-title leading-none`}>
              {archetype.number}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold mt-1">
              原型
            </span>
          </div>

          {/* Archetype Name & Airline info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${airlineMeta.badgeBg} ${airlineMeta.badgeText} ${airlineMeta.badgeBorder}`}
              >
                <Compass className="w-3 h-3" />
                {archetype.airline}
              </span>
              {steps.isSpecialTen && (
                <span className="inline-block px-2 py-0.5 rounded-md text-[11px] bg-[#FAF1E3] text-[#9A621C] border border-[#E9CE9E] font-medium">
                  特化至10即停
                </span>
              )}
            </div>

            <h2 className={`${titleSize} font-bold text-[#203726] font-serif-title tracking-tight`}>
              {archetype.name}
            </h2>

            <p className="text-xs text-[#717C73] mt-1 line-clamp-1">
              {archetype.energyQuality}
            </p>
          </div>
        </div>

        {/* Exact Core Description Text (Prompt Mandated) */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E0DBD0] mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#556A5B] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#467A53]" />
            <span>原型特質與成長方向</span>
          </div>
          <p className={`${descSize} text-[#2A3F30] font-medium`}>
            {archetype.description}
          </p>
        </div>

        {/* Growth Focus Box */}
        <div
          className={`rounded-xl p-3 sm:p-3.5 border text-xs sm:text-sm mb-4 ${airlineMeta.cardBg} border-[#D9E3DC] text-[#2F4F37]`}
        >
          <span className="font-bold text-[#1E4327]">🌱 心理成長指引：</span>
          <span className="ml-1">{archetype.growthFocus}</span>
        </div>
      </div>

      {/* Transparent Calculation Breakdown */}
      <div className="pt-3 border-t border-[#E8E3D8] text-xs">
        <button
          type="button"
          onClick={() => setShowFormula(!showFormula)}
          className="flex items-center justify-between w-full text-left text-[#6E7B70] hover:text-[#25422D] py-1 font-medium"
        >
          <span className="flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-[#51765B]" />
            <span>加總化簡過程</span>
          </span>
          <span className="text-[11px] text-[#8C938B]">
            {showFormula ? '收合' : '展開檢視'}
          </span>
        </button>

        {showFormula && (
          <div className="mt-2 bg-[#F3F0EA] rounded-lg p-2.5 font-mono text-[#444E46] text-[11px] sm:text-xs leading-relaxed border border-[#DFD9CD]">
            <div className="text-[#6D685E] font-sans mb-1">
              拆解西元生日位數相加：
            </div>
            <div className="font-semibold text-[#25422D]">
              {steps.initialFormula}
            </div>
            {steps.reductions.length > 0 && (
              <div className="mt-1 text-[#5E6860] flex flex-wrap items-center gap-1">
                <span>持續化簡：</span>
                {steps.reductions.map((r, i) => (
                  <span key={i} className="font-semibold text-[#285735]">
                    {r.formula}
                    {i < steps.reductions.length - 1 ? ' → ' : ''}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-1 text-[#385F40] font-sans font-medium text-[11px]">
              👉 最終化簡結果為{' '}
              <strong className="text-sm font-bold text-[#234F2E]">
                {archetype.number} 型
              </strong>
              {steps.isSpecialTen ? '（停在10型不繼續化簡）' : ''}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
