import React from 'react';
import { Truck } from 'lucide-react';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-emerald-950 text-white py-10 border-t border-emerald-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Store Introduction (Logo removed as requested) */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-emerald-100 max-w-md leading-relaxed">
              Official football club kits, NBA hardwood jerseys, and youth kits with nationwide doorstep delivery.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-200 font-semibold px-4 py-2.5 bg-emerald-900 rounded-lg border border-emerald-800 shadow-sm">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>We Deliver Nationwide</span>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-6 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
          <p>© {new Date().getFullYear()} Official Sports Store. All rights reserved. Nationwide Doorstep Delivery.</p>
          <div className="flex items-center gap-4">
            <span>Fast Dispatch</span>
            <span aria-hidden="true">·</span>
            <span>Official Kits</span>
            <span aria-hidden="true">·</span>
            <span>Doorstep Transit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
