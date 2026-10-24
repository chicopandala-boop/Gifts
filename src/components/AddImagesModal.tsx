import React, { useState, useRef } from 'react';
import { X, Upload, Plus, Trash2, CheckCircle, Image as ImageIcon, FolderGit2, AlertCircle } from 'lucide-react';
import { Product } from '../types/store';
import { cleanProductName, detectBrand, detectCategory, detectSport, detectApparelType, blobToDataUrl, DEFAULT_DRIVE_FOLDER_ID } from '../services/drive';

interface PendingUploadItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  brand: string;
  category: Product['category'];
  priceUSD: number;
}

interface AddImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProducts: (newProducts: Product[]) => void;
  onSyncDrive: () => Promise<void>;
  isSyncingDrive: boolean;
}

export const AddImagesModal: React.FC<AddImagesModalProps> = ({
  isOpen,
  onClose,
  onAddProducts,
  onSyncDrive,
  isSyncingDrive
}) => {
  const [pendingItems, setPendingItems] = useState<PendingUploadItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);

    const newItems: PendingUploadItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      const previewUrl = URL.createObjectURL(file);
      const cleaned = cleanProductName(file.name);
      const brand = detectBrand(file.name);
      const category = detectCategory(file.name);

      newItems.push({
        id: `upload-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
        file,
        previewUrl,
        name: cleaned,
        brand,
        category,
        priceUSD: 850
      });
    }

    setPendingItems((prev) => [...prev, ...newItems]);
    setIsProcessing(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFilesSelected(e.dataTransfer.files);
  };

  const handleRemovePending = (id: string) => {
    setPendingItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCommitAdd = async () => {
    if (pendingItems.length === 0) return;
    setIsProcessing(true);

    const finalProducts: Product[] = [];
    for (const item of pendingItems) {
      // Convert to persistent base64 data url
      const dataUrl = await blobToDataUrl(item.file);
      const isFootwear = item.category === 'Footwear';

      finalProducts.push({
        id: item.id,
        name: item.name,
        subtitle: 'Official Match Jersey',
        brand: item.brand,
        category: item.category,
        priceUSD: item.priceUSD || 850,
        description: `Official sports jersey (${item.file.name}). Guaranteed nationwide doorstep delivery.`,
        details: [
          `Authentic jersey asset: ${item.file.name}`,
          'Delivered nationwide in protective packaging',
          'Official Gifts Boutique sports apparel standard',
          'Authentic club cut & breathable performance weave'
        ],
        material: '100% Breathable Performance Poly',
        fit: isFootwear ? 'True to Size' : 'Standard Athletic Fit',
        origin: 'Official Merchandise',
        primaryImage: dataUrl,
        alternateImages: [dataUrl],
        sizes: isFootwear
          ? ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
          : ['S', 'M', 'L', 'XL', '2XL'],
        inStock: true,
        releaseYear: '2026',
        edition: 'Matchday Series',
        sport: detectSport(item.file.name),
        apparelType: detectApparelType(item.file.name)
      });
    }

    onAddProducts(finalProducts);
    setPendingItems([]);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-emerald-100 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-emerald-900 font-display">
                Place Jerseys in Catalogue
              </h2>
              <p className="text-xs text-emerald-700">
                Upload and place official jerseys directly into your sports catalogue
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-white rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Option A: Direct Drive Sync */}
          <div className="p-4 rounded-xl bg-zinc-900 text-white border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Google Drive Folder
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-mono truncate max-w-sm">
                Folder ID: {DEFAULT_DRIVE_FOLDER_ID}
              </p>
            </div>
            <button
              onClick={onSyncDrive}
              disabled={isSyncingDrive}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer shrink-0 disabled:opacity-60"
            >
              <span>{isSyncingDrive ? 'Connecting to Drive...' : 'Sync via Google Account'}</span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-zinc-200" />
            <span className="flex-shrink mx-4 text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
              Or Upload Image Files Directly
            </span>
            <div className="flex-grow border-t border-zinc-200" />
          </div>

          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
              isDragging
                ? 'border-emerald-600 bg-emerald-50/60 scale-[0.99]'
                : 'border-zinc-300 bg-zinc-50 hover:bg-emerald-50/30 hover:border-emerald-400'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFilesSelected(e.target.files)}
            />
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-800">
                Click to browse or drag & drop images here
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Supports PNG, JPG, JPEG, WEBP. Select multiple files at once.
              </p>
            </div>
          </div>

          {/* Selected items list */}
          {pendingItems.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-700">
                <span>{pendingItems.length} Images Ready to Place in Catalogue</span>
                <button
                  onClick={() => setPendingItems([])}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {pendingItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center gap-3 justify-between"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.previewUrl}
                        alt="Preview"
                        className="w-12 h-12 object-cover rounded-lg border border-zinc-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPendingItems((prev) =>
                              prev.map((p) => (p.id === item.id ? { ...p, name: val } : p))
                            );
                          }}
                          className="text-xs font-bold text-zinc-900 border-b border-transparent hover:border-zinc-300 focus:border-emerald-600 focus:outline-hidden bg-transparent truncate w-full"
                        />
                        <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                          <span className="font-semibold text-emerald-700">{item.brand}</span>
                          <span>·</span>
                          <span className="font-display font-bold text-zinc-900">R{item.priceUSD}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemovePending(item.id)}
                      className="p-2 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer shrink-0"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleCommitAdd}
            disabled={pendingItems.length === 0 || isProcessing}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-4 h-4" />
            <span>
              {isProcessing
                ? 'Processing...'
                : `Place ${pendingItems.length > 0 ? pendingItems.length : ''} Images in Catalogue`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
