import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { DateInputSection } from './components/DateInputSection';
import { ResultCard } from './components/ResultCard';
import { ComparisonView } from './components/ComparisonView';
import { ArchetypeGuideModal } from './components/ArchetypeGuideModal';
import { ShareModal } from './components/ShareModal';
import { CalculationResult, FontSizeMode } from './types';
import { calculateArchetype } from './utils/calculator';
import { Sparkles, Compass, AlertCircle, Info, Heart } from 'lucide-react';

interface DateValue {
  year: string;
  month: string;
  day: string;
}

export default function App() {
  const [selfDate, setSelfDate] = useState<DateValue>({
    year: '1993',
    month: '10',
    day: '1',
  });
  const [partnerDate, setPartnerDate] = useState<DateValue>({
    year: '',
    month: '',
    day: '',
  });

  const [selfResult, setSelfResult] = useState<CalculationResult | null>(null);
  const [partnerResult, setPartnerResult] = useState<CalculationResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [fontSize, setFontSize] = useState<FontSizeMode>('normal');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  // Initial calculation on mount for demonstration
  useEffect(() => {
    const initialSelf = calculateArchetype(1993, 10, 1, 'self', '你的原型');
    if (initialSelf) {
      setSelfResult(initialSelf);
      setHasCalculated(true);
    }
  }, []);

  const handleCalculate = () => {
    setErrorMessage(null);

    const hasSelf = !!(selfDate.year && selfDate.month && selfDate.day);
    const hasPartner = !!(partnerDate.year && partnerDate.month && partnerDate.day);

    if (!hasSelf && !hasPartner) {
      setErrorMessage('請至少填寫一組完整的西元出生年月日（年、月、日）');
      return;
    }

    let calculatedSelf: CalculationResult | null = null;
    let calculatedPartner: CalculationResult | null = null;

    if (hasSelf) {
      const y = parseInt(selfDate.year, 10);
      const m = parseInt(selfDate.month, 10);
      const d = parseInt(selfDate.day, 10);
      calculatedSelf = calculateArchetype(y, m, d, 'self', '你的原型');
    }

    if (hasPartner) {
      const y = parseInt(partnerDate.year, 10);
      const m = parseInt(partnerDate.month, 10);
      const d = parseInt(partnerDate.day, 10);
      calculatedPartner = calculateArchetype(y, m, d, 'partner', '對方的原型');
    }

    setSelfResult(calculatedSelf);
    setPartnerResult(calculatedPartner);
    setHasCalculated(true);

    // Smooth scroll to results on mobile devices
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    setSelfDate({ year: '', month: '', day: '' });
    setPartnerDate({ year: '', month: '', day: '' });
    setSelfResult(null);
    setPartnerResult(null);
    setHasCalculated(false);
    setErrorMessage(null);
  };

  // Font size multiplier class for body
  const fontContainerClass =
    fontSize === 'extra-large'
      ? 'text-lg'
      : fontSize === 'large'
      ? 'text-base'
      : 'text-sm';

  return (
    <div className={`min-h-screen bg-[#F7F5EE] text-[#2C3E33] flex flex-col ${fontContainerClass}`}>
      {/* Top Navigation Header */}
      <Header
        fontSize={fontSize}
        setFontSize={setFontSize}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5 sm:py-7">
        {/* Intro Card: Warm workshop tone & rule explanation */}
        <div className="bg-[#FAF8F2] border border-[#DFD9CD] rounded-2xl p-4 sm:p-5 mb-5 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E5EDE6] text-[#2F5938] flex items-center justify-center shrink-0 mt-0.5">
              <Compass className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs sm:text-sm text-[#4E5B51] leading-relaxed">
              <span className="font-bold text-[#233C2A] text-sm sm:text-base block mb-1">
                歡迎來到靈魂之花生命原型探索
              </span>
              本計算器專為工作坊現場設計。所有出生年份皆使用同一套加總化簡規則：將西元生日每位數字拆開相加，反覆化簡至
              <strong className="text-[#204028] font-bold"> 2 到 10 </strong>
              之間（若化簡為 10 則直接停在 10 型）。可填寫個人生日，或同步輸入對象生日進行雙人航線對照。
            </div>
          </div>
        </div>

        {/* Input Form Section */}
        <DateInputSection
          selfDate={selfDate}
          partnerDate={partnerDate}
          setSelfDate={setSelfDate}
          setPartnerDate={setPartnerDate}
          onCalculate={handleCalculate}
          onReset={handleReset}
          fontSize={fontSize}
        />

        {/* Error message if any */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-[#FDF2F0] border border-[#E9C3BE] text-[#9A2D23] flex items-center gap-2 text-xs sm:text-sm animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Results Area */}
        <div ref={resultRef}>
          {hasCalculated && (
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
              {/* If both are calculated -> Side by Side Comparison View */}
              {selfResult && partnerResult ? (
                <ComparisonView
                  selfResult={selfResult}
                  partnerResult={partnerResult}
                  fontSize={fontSize}
                />
              ) : selfResult ? (
                /* Only self is calculated */
                <div className="max-w-2xl mx-auto mb-8">
                  <div className="flex items-center gap-2 mb-3 px-1 text-xs font-semibold text-[#516E59]">
                    <Sparkles className="w-4 h-4" />
                    <span>你的原型解析結果</span>
                  </div>
                  <ResultCard result={selfResult} fontSize={fontSize} />
                </div>
              ) : partnerResult ? (
                /* Only partner is calculated */
                <div className="max-w-2xl mx-auto mb-8">
                  <div className="flex items-center gap-2 mb-3 px-1 text-xs font-semibold text-[#8B5A3D]">
                    <Sparkles className="w-4 h-4" />
                    <span>對方的原型解析結果</span>
                  </div>
                  <ResultCard result={partnerResult} fontSize={fontSize} />
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Quick Guide Card: 3 Airlines Summary for easy reference */}
        <div className="mt-8 bg-white/70 rounded-2xl p-5 border border-[#DFD9CD]">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#EAE5DC]">
            <h3 className="font-bold text-sm sm:text-base text-[#243E2C] flex items-center gap-2 font-serif-title">
              <Info className="w-4 h-4 text-[#447051]" />
              三大航線與九大原型速查
            </h3>
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="text-xs text-[#355F3F] hover:underline font-semibold"
            >
              檢視完整手冊 →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 討好航線 */}
            <div className="bg-[#FAFDF9] p-3.5 rounded-xl border border-[#D5E3D8]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EAF3EC] text-[#245233]">
                  討好航線
                </span>
                <span className="text-xs text-[#526D57] font-bold">
                  2 / 6 / 8 型
                </span>
              </div>
              <ul className="text-xs text-[#384F3D] space-y-1 mt-2">
                <li>• 2型：情感劇場導演</li>
                <li>• 6型：守護騎士</li>
                <li>• 8型：愛的領袖</li>
              </ul>
            </div>

            {/* 衝突航線 */}
            <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#EDDFD1]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FBF1E6] text-[#8C4616]">
                  衝突航線
                </span>
                <span className="text-xs text-[#875531] font-bold">
                  3 / 4 / 10 型
                </span>
              </div>
              <ul className="text-xs text-[#4F4135] space-y-1 mt-2">
                <li>• 3型：耀眼明星</li>
                <li>• 4型：匠心工藝師</li>
                <li>• 10型：開拓先鋒</li>
              </ul>
            </div>

            {/* 逃避航線 */}
            <div className="bg-[#F7FAFA] p-3.5 rounded-xl border border-[#D3E2E6]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#EBF3F6] text-[#1E5260]">
                  逃避航線
                </span>
                <span className="text-xs text-[#35616D] font-bold">
                  5 / 7 / 9 型
                </span>
              </div>
              <ul className="text-xs text-[#374C52] space-y-1 mt-2">
                <li>• 5型：魅力冒險家</li>
                <li>• 7型：神秘旅人</li>
                <li>• 9型：創意設計師</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#E3DDD1] bg-[#FAF8F2] py-4 text-center text-xs text-[#7A7569] mt-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>靈魂之花生命原型計算器・工作坊現場探索專用</span>
          <span className="flex items-center gap-1 text-[#605A4E]">
            <Heart className="w-3.5 h-3.5 text-[#5F8C6C]" />
            以溫暖同理陪伴每一步內在成長
          </span>
        </div>
      </footer>

      {/* Modals */}
      <ArchetypeGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        fontSize={fontSize}
      />

      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </div>
  );
}
