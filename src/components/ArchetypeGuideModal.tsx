import React, { useState } from 'react';
import { ARCHETYPES, AIRLINES_INFO } from '../data/archetypes';
import { ArchetypeNumber, AirlineType, FontSizeMode } from '../types';
import { X, BookOpen, Compass, Sparkles } from 'lucide-react';

interface ArchetypeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: FontSizeMode;
  onSelectArchetype?: (num: ArchetypeNumber) => void;
}

export const ArchetypeGuideModal: React.FC<ArchetypeGuideModalProps> = ({
  isOpen,
  onClose,
  fontSize,
}) => {
  const [selectedAirline, setSelectedAirline] = useState<AirlineType | 'all'>('all');

  if (!isOpen) return null;

  const airlinesList: AirlineType[] = ['討好航線', '衝突航線', '逃避航線'];
  const archetypesList = Object.values(ARCHETYPES);

  const filteredArchetypes =
    selectedAirline === 'all'
      ? archetypesList
      : archetypesList.filter((a) => a.airline === selectedAirline);

  const headingSize =
    fontSize === 'extra-large' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl';
  const descSize =
    fontSize === 'extra-large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col border border-[#DDD5C5] overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#FAF7F0] border-b border-[#E3DBD0] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E5EDE6] text-[#2C5938] flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className={`${headingSize} font-bold text-[#233C2A] font-serif-title`}>
                三大航線與九大原型全覽
              </h2>
              <p className="text-xs text-[#707D72]">
                工作坊完整對照手冊・探索彼此的心靈航向
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#777063] hover:text-[#233C2A] hover:bg-[#EDE8E0] transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Airline Filter Pills */}
        <div className="px-5 py-3 bg-[#F4EFE6] border-b border-[#E3DBD0] flex flex-wrap items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-[#6F675A]">航線篩選：</span>
          <button
            type="button"
            onClick={() => setSelectedAirline('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              selectedAirline === 'all'
                ? 'bg-[#2E5437] text-white shadow-xs'
                : 'bg-white text-[#564F44] border border-[#DDD5C5] hover:bg-[#EBE5DC]'
            }`}
          >
            全部 (9大原型)
          </button>
          {airlinesList.map((airline) => {
            const meta = AIRLINES_INFO[airline];
            const isSelected = selectedAirline === airline;
            return (
              <button
                key={airline}
                type="button"
                onClick={() => setSelectedAirline(airline)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${
                  isSelected
                    ? `${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder} ring-2 ring-[#437A52]/40`
                    : 'bg-white text-[#564F44] border-[#DDD5C5] hover:bg-[#EBE5DC]'
                }`}
              >
                {airline} ({meta.types.join('/')}型)
              </button>
            );
          })}
        </div>

        {/* Archetypes List (Scrollable) */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Airline Intro Cards if filtered */}
          {selectedAirline !== 'all' && (
            <div
              className={`p-4 rounded-xl border ${AIRLINES_INFO[selectedAirline].cardBg} border-[#CFDDD1] mb-2`}
            >
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#274E32] mb-1">
                <Compass className="w-4 h-4" />
                <span>{selectedAirline}・核心特質</span>
              </div>
              <p className="text-xs sm:text-sm text-[#465A4B] leading-relaxed">
                {AIRLINES_INFO[selectedAirline].summary}
              </p>
            </div>
          )}

          {/* Archetypes grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredArchetypes.map((archetype) => {
              const meta = AIRLINES_INFO[archetype.airline];
              return (
                <div
                  key={archetype.number}
                  className="bg-white rounded-xl p-4 border border-[#DFD9CD] shadow-2xs hover:border-[#BFD3C3] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg font-serif-title shrink-0 ${meta.badgeBg} ${meta.badgeText}`}
                      >
                        {archetype.number}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#233C2A] text-base font-serif-title">
                          {archetype.name}
                        </h4>
                        <span
                          className={`inline-block px-2 py-0.2 text-[10px] font-bold rounded ${meta.badgeBg} ${meta.badgeText}`}
                        >
                          {archetype.airline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className={`${descSize} text-[#3A4A3E] mb-2 leading-relaxed`}>
                    {archetype.description}
                  </p>

                  <div className="pt-2 border-t border-[#F0EBE3] text-xs text-[#526B57] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#4B7C57] shrink-0" />
                    <span>
                      <strong>成長焦點：</strong>
                      {archetype.growthFocus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#FAF7F0] border-t border-[#E3DBD0] flex items-center justify-between text-xs text-[#7B7365]">
          <span>靈魂之花生命原型工作坊</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#2D5437] text-white font-semibold hover:bg-[#23452B] transition-colors"
          >
            關閉視窗
          </button>
        </div>
      </div>
    </div>
  );
};
