import React from 'react';
import { Truck, Mail, Phone } from 'lucide-react';
import logoWhiteImg from '../assets/images/gifts_boutique_logo_white.png';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-emerald-950 text-white py-10 border-t border-emerald-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand & Store Introduction */}
          <div className="space-y-3">
            <button
              onClick={() => onNavigate?.('all-catalogues')}
              className="text-left cursor-pointer hover:opacity-90 transition-opacity block"
              aria-label="Gifts Boutique - Return to all catalogues"
            >
              <img
                src={logoWhiteImg}
                alt="Gifts Boutique"
                className="h-10 sm:h-12 w-auto max-w-[240px] sm:max-w-[280px] object-contain"
              />
            </button>
            <p className="text-sm font-semibold text-emerald-100 max-w-md leading-relaxed">
              Official football club kits, NBA hardwood jerseys, and youth kits with nationwide doorstep delivery.
            </p>
          </div>

          {/* Quick Actions / Contact & Delivery Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+27786382015"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-100 hover:text-white px-4 py-2.5 bg-emerald-900/90 hover:bg-emerald-900 rounded-lg border border-emerald-800 transition-colors shadow-sm group"
              title="Call us: +27 78 638 2015"
            >
              <Phone className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 shrink-0" />
              <span>+27 78 638 2015</span>
            </a>
            <a
              href="mailto:giftsboutique2015@gmail.com"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-100 hover:text-white px-4 py-2.5 bg-emerald-900/90 hover:bg-emerald-900 rounded-lg border border-emerald-800 transition-colors shadow-sm group"
              title="Send us an email"
            >
              <Mail className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 shrink-0" />
              <span>giftsboutique2015@gmail.com</span>
            </a>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200 font-semibold px-4 py-2.5 bg-emerald-900 rounded-lg border border-emerald-800 shadow-sm">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>We Deliver Nationwide</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Contact */}
        <div className="pt-6 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
          <p>© {new Date().getFullYear()} Official Sports Store. All rights reserved. Nationwide Doorstep Delivery.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="tel:+27786382015"
              className="inline-flex items-center gap-1.5 font-medium hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+27 78 638 2015</span>
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="mailto:giftsboutique2015@gmail.com"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              giftsboutique2015@gmail.com
            </a>
            <span aria-hidden="true">·</span>
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

