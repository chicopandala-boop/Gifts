import React, { useState, useRef } from 'react';
import { X, Upload, RotateCcw, Check, Sparkles, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import { Product, StudioLightingPreset } from '../types/store';

interface ImageStudioModalProps {
  products: Product[];
  selectedProduct: Product | null;
  lightingPreset: StudioLightingPreset;
  onLightingChange: (preset: StudioLightingPreset) => void;
  onUpdateProductImage: (productId: string, imageUrl: string) => void;
  onResetProductImage: (productId: string) => void;
  onClose: () => void;
}

export const ImageStudioModal: React.FC<ImageStudioModalProps> = ({
  products,
  selectedProduct,
  lightingPreset,
  onLightingChange,
  onUpdateProductImage,
  onResetProductImage,
  onClose
}) => {
  const [activeProductId, setActiveProductId] = useState<string>(
    selectedProduct ? selectedProduct.id : products[0]?.id || ''
  );
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeProduct = products.find((p) => p.id === activeProductId) || products[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateProductImage(activeProduct.id, reader.result);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    onUpdateProductImage(activeProduct.id, customUrlInput.trim());
    setCustomUrlInput('');
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 2000);
  };

  // Studio Lighting Presets
  const presets: { id: StudioLightingPreset; label: string; desc: string }[] = [
    {
      id: 'neutral',
      label: 'Neutral Studio',
      desc: 'Pure clean daylight with balanced diffuse lighting'
    },
    {
      id: 'travertine',
      label: 'Travertine Stone',
      desc: 'Warm organic stone reflections and soft warmth'
    },
    {
      id: 'brutalist',
      label: 'Brutalist Concrete',
      desc: 'Matte architectural shadows with desaturated depth'
    },
    {
      id: 'warm-dusk',
      label: 'Warm Sunlight',
      desc: 'Golden hour directional warmth and soft amber haze'
    },
    {
      id: 'high-contrast',
      label: 'Monolith High-Contrast',
      desc: 'Dramatic deep blacks and crisp edge highlights'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#FBFBF9] rounded-xl border border-[#E8E8E2] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8E8E2] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#121212]" />
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#121212] font-display">
                Product Image Studio & Visual Customizer
              </h2>
              <p className="text-xs text-[#73736C]">
                Make, remix, or upload custom imagery for any piece in the REMIX collection.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#73736C] hover:text-[#121212] bg-[#FBFBF9] rounded-full border border-[#E0E0D8] transition-colors"
            aria-label="Close studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Step 1: Select Piece to Remix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#121212] uppercase tracking-wider">
                1. Select Garment or Accessory to Customize
              </span>
              <span className="text-[#73736C] font-mono">
                {products.length} Archival Items
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {products.map((item) => {
                const isSelected = item.id === activeProductId;
                const activeImg = item.customImage || item.primaryImage;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveProductId(item.id)}
                    className={`flex flex-col text-left p-2 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-[#121212] bg-white ring-1 ring-[#121212] shadow-xs'
                        : 'border-[#E8E8E2] bg-[#F4F4EE] hover:bg-white'
                    }`}
                  >
                    <div className="aspect-square w-full rounded overflow-hidden bg-[#E8E8E2] mb-2">
                      <img
                        src={activeImg}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#121212] truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[#73736C] font-mono">
                      {item.customImage ? 'Custom' : 'Original'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Upload or Assign Custom Image */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4 border-t border-[#E8E8E2]">
            {/* Live Visual Preview Frame */}
            <div className="md:col-span-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#121212] uppercase tracking-wider">
                  Active Display Preview
                </span>
                {activeProduct.customImage && (
                  <span className="text-emerald-700 font-mono text-[11px]">
                    Custom Image Applied
                  </span>
                )}
              </div>

              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#E8E8E2] border border-[#DDDDCF] shadow-xs">
                <img
                  src={activeProduct.customImage || activeProduct.primaryImage}
                  alt={activeProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-[#121212]">
                  {activeProduct.name}
                </span>
                {activeProduct.customImage && (
                  <button
                    onClick={() => onResetProductImage(activeProduct.id)}
                    className="text-xs text-red-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Studio Original</span>
                  </button>
                )}
              </div>
            </div>

            {/* Upload & Image Assignment Form */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-semibold text-[#121212] uppercase tracking-wider block mb-1">
                  2. Upload New Image Asset
                </span>
                <p className="text-xs text-[#73736C]">
                  Select an image file from your computer to make it the active product photograph across the store.
                </p>
              </div>

              {/* Drag/Click file upload zone */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-6 border-2 border-dashed border-[#D5D5CD] rounded-lg bg-white hover:bg-[#F9F9F6] hover:border-[#121212] transition-colors cursor-pointer flex flex-col items-center justify-center text-center space-y-2 group"
              >
                <div className="p-3 bg-[#F4F4EE] rounded-full group-hover:bg-[#EFEFEA] transition-colors">
                  <Upload className="w-5 h-5 text-[#121212]" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#121212]">
                    Click to choose an image file
                  </span>
                  <p className="text-[11px] text-[#73736C]">
                    PNG, JPG, WEBP (Instant local preview)
                  </p>
                </div>
              </div>

              {uploadSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Product image successfully updated!</span>
                </div>
              )}

              {/* URL input alternative */}
              <form onSubmit={handleUrlSubmit} className="space-y-2 pt-2">
                <label className="text-xs font-medium text-[#121212] block">
                  Or Paste Direct Image Web Address:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.example.com/item.jpg"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#D5D5CD] rounded-md text-[#121212] focus:outline-hidden focus:border-[#121212]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#121212] text-white rounded-md hover:bg-[#2A2A26] transition-colors whitespace-nowrap"
                  >
                    Apply URL
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Step 3: Global Studio Lighting Atmosphere */}
          <div className="pt-6 border-t border-[#E8E8E2] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#121212] uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>3. Atmospheric Studio Lighting Profile</span>
              </span>
              <span className="text-[#73736C]">Applies to all catalog shots</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onLightingChange(preset.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    lightingPreset === preset.id
                      ? 'border-[#121212] bg-white ring-1 ring-[#121212] shadow-xs'
                      : 'border-[#E8E8E2] bg-[#F9F9F6] hover:bg-white'
                  }`}
                >
                  <span className="text-xs font-semibold text-[#121212] block">
                    {preset.label}
                  </span>
                  <span className="text-[10px] text-[#73736C] block mt-1 leading-snug">
                    {preset.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#E8E8E2] bg-[#F4F4EE] flex items-center justify-between">
          <span className="text-xs text-[#73736C] font-mono">
            Modifications update immediately across all storefront modules.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#121212] text-white rounded-md hover:bg-[#2A2A26] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
