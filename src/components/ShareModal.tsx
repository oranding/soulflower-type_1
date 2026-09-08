import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, QrCode, Smartphone } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (isOpen && currentUrl) {
      QRCode.toDataURL(currentUrl, {
        width: 260,
        margin: 2,
        color: {
          dark: '#243E2C',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code generation failed', err));
    }
  }, [isOpen, currentUrl]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-sm rounded-2xl shadow-xl flex flex-col border border-[#DDD5C5] overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#FAF7F0] border-b border-[#E3DBD0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E5ECE7] text-[#345D3E] flex items-center justify-center font-bold">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#233C2A] text-base font-serif-title">
                現場手機掃碼
              </h3>
              <p className="text-xs text-[#707D72]">工作坊夥伴快速連線</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#777063] hover:text-[#233C2A] hover:bg-[#EDE8E0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code Content */}
        <div className="p-6 flex flex-col items-center text-center">
          <div className="p-3 bg-white rounded-2xl shadow-xs border border-[#DFD9CD] mb-4">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="工作坊計算器 QR Code"
                className="w-52 h-52 object-contain"
              />
            ) : (
              <div className="w-52 h-52 flex items-center justify-center text-sm text-[#7D7668]">
                產生條碼中...
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#4F6354] mb-3">
            <Smartphone className="w-4 h-4 text-[#3E6647]" />
            <span>開啟手機相機直接對準即可開啟使用</span>
          </div>

          {/* Copy link button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full py-2.5 px-4 rounded-xl bg-[#EBE7DF] hover:bg-[#E2DDD3] text-[#344037] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#DDD6C8]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#346642]" />
                <span className="text-[#346642]">網址已複製到剪貼簿！</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#605B50]" />
                <span>複製計算器網址</span>
              </>
            )}
          </button>
        </div>

        <div className="px-5 py-3 bg-[#FAF7F0] border-t border-[#E3DBD0] text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-[#6A6458] hover:text-[#233C2A] font-medium"
          >
            返回計算頁面
          </button>
        </div>
      </div>
    </div>
  );
};
