import React, { useState } from 'react';
import { Sparkles, RotateCcw, User, HeartHandshake } from 'lucide-react';
import { FontSizeMode } from '../types';

interface DateValue {
  year: string;
  month: string;
  day: string;
}

interface DateInputSectionProps {
  selfDate: DateValue;
  partnerDate: DateValue;
  setSelfDate: React.Dispatch<React.SetStateAction<DateValue>>;
  setPartnerDate: React.Dispatch<React.SetStateAction<DateValue>>;
  onCalculate: () => void;
  onReset: () => void;
  fontSize: FontSizeMode;
}

// Generate years descending from 2026 to 1930
const YEARS = Array.from({ length: 97 }, (_, i) => 2026 - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export const DateInputSection: React.FC<DateInputSectionProps> = ({
  selfDate,
  partnerDate,
  setSelfDate,
  setPartnerDate,
  onCalculate,
  onReset,
  fontSize,
}) => {
  const [inputMode, setInputMode] = useState<'picker' | 'select'>('select');

  // Quick preset loader for workshop testing
  const handleApplyPreset = (presetType: 'example1' | 'example2') => {
    if (presetType === 'example1') {
      setSelfDate({ year: '1993', month: '10', day: '1' });
    } else {
      setSelfDate({ year: '2010', month: '10', day: '1' });
    }
  };

  const handlePairPreset = () => {
    setSelfDate({ year: '1993', month: '10', day: '1' });
    setPartnerDate({ year: '2010', month: '10', day: '1' });
  };

  // Compute text sizes based on font mode
  const labelSize =
    fontSize === 'extra-large'
      ? 'text-lg sm:text-xl font-bold'
      : fontSize === 'large'
      ? 'text-base sm:text-lg font-bold'
      : 'text-sm sm:text-base font-semibold';

  const selectSize =
    fontSize === 'extra-large'
      ? 'text-base sm:text-lg py-3'
      : fontSize === 'large'
      ? 'text-base py-2.5'
      : 'text-sm sm:text-base py-2';

  return (
    <div className="w-full bg-white/85 rounded-2xl p-4 sm:p-6 border border-[#E5E0D8] shadow-sm mb-6">
      {/* Top Banner: Mode & Quick Presets */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#ECE7DF]">
        <div className="flex items-center gap-1.5 text-xs text-[#6B7E72]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#5E8C6A]"></span>
          <span>西元年月日加總・不分年代同一規則</span>
        </div>

        {/* Input Method Toggle */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#847E72]">輸入方式：</span>
          <div className="inline-flex bg-[#F2EFE9] p-0.5 rounded-lg border border-[#DDD7CC]">
            <button
              type="button"
              onClick={() => setInputMode('select')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                inputMode === 'select'
                  ? 'bg-white text-[#294B34] shadow-xs'
                  : 'text-[#6C665A]'
              }`}
            >
              選單點選
            </button>
            <button
              type="button"
              onClick={() => setInputMode('picker')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                inputMode === 'picker'
                  ? 'bg-white text-[#294B34] shadow-xs'
                  : 'text-[#6C665A]'
              }`}
            >
              月曆輸入
            </button>
          </div>
        </div>
      </div>

      {/* Two Input Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Column 1: Your Birthday (你的生日) */}
        <div className="bg-[#FAF9F5] p-4 sm:p-5 rounded-xl border border-[#DFD9CE] relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#E5EEE7] text-[#346040] flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <label className={`${labelSize} text-[#233C2A] block`}>
                  你的生日 <span className="text-[#3A6B48] text-xs font-normal">（主要欄位）</span>
                </label>
                <span className="text-xs text-[#7A7569]">請輸入西元出生年月日</span>
              </div>
            </div>
            {selfDate.year && (
              <button
                type="button"
                onClick={() => setSelfDate({ year: '', month: '', day: '' })}
                className="text-xs text-[#8F887B] hover:text-[#C84B31] px-2 py-1"
              >
                清除
              </button>
            )}
          </div>

          {inputMode === 'select' ? (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-[#6F695D] mb-1 block">年份 (西元)</label>
                <select
                  value={selfDate.year}
                  onChange={(e) => setSelfDate((prev) => ({ ...prev, year: e.target.value }))}
                  className={`w-full bg-white border border-[#CDC6BA] rounded-lg px-2 text-[#243E2C] font-medium focus:ring-2 focus:ring-[#62926E] focus:outline-none ${selectSize}`}
                >
                  <option value="">請選擇</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y} 年
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-[#6F695D] mb-1 block">月份</label>
                <select
                  value={selfDate.month}
                  onChange={(e) => setSelfDate((prev) => ({ ...prev, month: e.target.value }))}
                  className={`w-full bg-white border border-[#CDC6BA] rounded-lg px-2 text-[#243E2C] font-medium focus:ring-2 focus:ring-[#62926E] focus:outline-none ${selectSize}`}
                >
                  <option value="">請選擇</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m} 月
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-[#6F695D] mb-1 block">日期</label>
                <select
                  value={selfDate.day}
                  onChange={(e) => setSelfDate((prev) => ({ ...prev, day: e.target.value }))}
                  className={`w-full bg-white border border-[#CDC6BA] rounded-lg px-2 text-[#243E2C] font-medium focus:ring-2 focus:ring-[#62926E] focus:outline-none ${selectSize}`}
                >
                  <option value="">請選擇</option>
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d} 日
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs text-[#6F695D] mb-1 block">點選開啟日曆選擇：</label>
              <input
                type="date"
                value={
                  selfDate.year && selfDate.month && selfDate.day
                    ? `${selfDate.year}-${selfDate.month.padStart(2, '0')}-${selfDate.day.padStart(2, '0')}`
                    : ''
                }
                onChange={(e) => {
                  if (e.target.value) {
                    const [y, m, d] = e.target.value.split('-');
                    setSelfDate({ year: y, month: parseInt(m, 10).toString(), day: parseInt(d, 10).toString() });
                  } else {
                    setSelfDate({ year: '', month: '', day: '' });
                  }
                }}
                className={`w-full bg-white border border-[#CDC6BA] rounded-lg px-3 text-[#243E2C] font-medium focus:ring-2 focus:ring-[#62926E] focus:outline-none ${selectSize}`}
              />
            </div>
          )}

          {/* Quick preset pills */}
          <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-[#E8E3DA] text-xs">
            <span className="text-[#847E72] shrink-0">試算範例：</span>
            <button
              type="button"
              onClick={() => handleApplyPreset('example1')}
              className="px-2 py-0.5 rounded-full bg-[#EDE8E0] hover:bg-[#E3DDD3] text-[#4F5950] transition-colors"
            >
              1993/10/01 (6型)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('example2')}
              className="px-2 py-0.5 rounded-full bg-[#EDE8E0] hover:bg-[#E3DDD3] text-[#4F5950] transition-colors"
            >
              2010/10/01 (5型)
            </button>
          </div>
        </div>

        {/* Column 2: Partner's Birthday (對方的生日 - 可留空) */}
        <div className="bg-[#FAF9F5] p-4 sm:p-5 rounded-xl border border-[#DFD9CE] relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F3EBE3] text-[#865337] flex items-center justify-center font-bold">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <label className={`${labelSize} text-[#233C2A] block`}>
                  對方的生日 <span className="text-[#786E61] text-xs font-normal">（可留空・可獨立計算）</span>
                </label>
                <span className="text-xs text-[#7A7569]">填寫後可直接進行雙人互動對照</span>
              </div>
            </div>
            {partnerDate.year && (
              <button
                type="button"
                onClick={() => setPartnerDate({ year: '', month: '', day: '' })}
                className="text-xs text-[#8F887B] hover:text-[#C84B31] px-2 py-1"
              >
                清除
              </button>
            )}
          </div>

          {inputMode === 'select' ? (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-[#6F695D] mb-1 block">年份 (西元)</label>
                <select
                  value={partnerDate.year}
                  onChange={(e) => setPartnerDate((prev) => ({ ...prev, year: e.target.value }))}
                  className={`w-full bg-white border border-[#CDC6BA] rounded-lg px-2 text-[#243E2C] font-medium focus:ring-2 focus:ring-[#865337] focus:outline-none ${selectSize}`}
                >
                  <option value="">可留空</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y} 年
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-[#6F695D] mb-1 block">月份</label>
                <select
                  value={partnerDate.month}
                  onChange={(e) => setPartnerDate((prev) => ({ ...prev, month: e.target.value }))}
                  className={`w-full bg-white border border-[#CDC6BA] rounded-lg px-2 text-[#243E2C] font-medium focus:ring-2 focus:ring-[#865337] focus:outline-none ${selectSize}`}
                >
                  <option value="">可留空</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m} 月
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-[#6F695D] mb-1 block">日期</label>
                <select
                  value={partnerDate.day}
                  onChange={(e) => setPartnerDate((prev) => ({ ...prev, day: e.target.value }))}
                  className={`w-full bg-white border border-[#CDC6BA] rounded-lg px-2 text-[#243E2C] font-medium focus:ring-2 focus:ring-[#865337] focus:outline-none ${selectSize}`}
                >
                  <option value="">可留空</option>
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d} 日
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs text-[#6F695D] mb-1 block">點選開啟日曆選擇：</label>
              <input
                type="date"
                value={
                  partnerDate.year && partnerDate.month && partnerDate.day
                    ? `${partnerDate.year}-${partnerDate.month.padStart(2, '0')}-${partnerDate.day.padStart(2, '0')}`
                    : ''
                }
                onChange={(e) => {
                  if (e.target.value) {
                    const [y, m, d] = e.target.value.split('-');
                    setPartnerDate({ year: y, month: parseInt(m, 10).toString(), day: parseInt(d, 10).toString() });
                  } else {
                    setPartnerDate({ year: '', month: '', day: '' });
                  }
                }}
                className={`w-full bg-white border border-[#CDC6BA] rounded-lg px-3 text-[#243E2C] font-medium focus:ring-2 focus:ring-[#865337] focus:outline-none ${selectSize}`}
              />
            </div>
          )}

          {/* Quick dual preset */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E8E3DA] text-xs">
            <span className="text-[#847E72]">雙人對照：</span>
            <button
              type="button"
              onClick={handlePairPreset}
              className="text-[#4E6B56] hover:text-[#284931] font-medium underline underline-offset-2"
            >
              一鍵填入範例組合（6型 vs 5型）
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
        <button
          type="button"
          onClick={onCalculate}
          className="w-full sm:w-auto min-w-[240px] px-8 py-3.5 bg-[#426E4F] hover:bg-[#34593E] active:bg-[#2A4932] text-white font-bold text-base sm:text-lg rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Sparkles className="w-5 h-5 text-[#C6E6CF]" />
          <span>計算原型數字</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="px-4 py-3 bg-[#EFECE6] hover:bg-[#E5E1D7] text-[#615B50] font-medium text-sm rounded-xl border border-[#DFD8CD] transition-colors flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>重置清空</span>
        </button>
      </div>
    </div>
  );
};
