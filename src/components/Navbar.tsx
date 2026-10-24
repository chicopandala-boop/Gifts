import React, { useState } from 'react';
import { ShoppingBag, Truck, Menu, X, FolderGit2, Sparkles } from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  user: User | null;
  driveCount: number;
  onOpenDriveSync: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
  user,
  driveCount,
  onOpenDriveSync
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 shadow-xs">
      {/* Official Gear Announcement Bar */}
      <div className="bg-emerald-800 text-white text-xs py-1.5 px-4 font-semibold flex items-center justify-center gap-2 text-center font-sans">
        <span>OFFICIAL CLUB & NBA HARDWOOD GEAR · PRIORITY DOORSTEP DISPATCH</span>
      </div>

      {/* Top Bar Navigation */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('all-catalogues')}
          className="font-display font-black text-xl sm:text-2xl tracking-wider text-emerald-800 uppercase whitespace-nowrap shrink-0 hover:text-emerald-950 transition-colors text-left cursor-pointer"
        >
          Gifts Boutique
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-700">
          <button
            onClick={() => handleNavClick('kids-football')}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
              activeSection === 'kids-football' || activeSection === 'kids-football-wear' ? 'text-emerald-700 font-bold' : ''
            }`}
          >
            Kids Football Kits
          </button>

          <button
            onClick={() => handleNavClick('soccer-jerseys')}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
              activeSection === 'soccer-jerseys' || activeSection === 'football-catalogue' ? 'text-emerald-700 font-bold' : ''
            }`}
          >
            Soccer Jerseys
          </button>

          <button
            onClick={() => handleNavClick('club-tracksuits')}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
              activeSection === 'club-tracksuits' || activeSection === 'tracksuits' ? 'text-emerald-700 font-bold' : ''
            }`}
          >
            Tracksuits
          </button>

          <button
            onClick={() => handleNavClick('matchday-socks')}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
              activeSection === 'matchday-socks' || activeSection === 'socks' ? 'text-emerald-700 font-bold' : ''
            }`}
          >
            Matchday Grip Socks
          </button>

          <button
            onClick={() => handleNavClick('basketball-catalogue')}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
              activeSection === 'basketball-catalogue' ? 'text-emerald-700 font-bold' : ''
            }`}
          >
            Basketball Jerseys
          </button>

          <button
            onClick={() => handleNavClick('court-shorts')}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
              activeSection === 'court-shorts' ? 'text-emerald-700 font-bold' : ''
            }`}
          >
            Court Shorts
          </button>
        </nav>

        {/* Zone 3: Actions & Bag */}
        <div className="flex items-center gap-3 shrink-0">
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs text-emerald-900 font-medium">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-4 h-4 rounded-full"
                />
              ) : (
                <FolderGit2 className="w-3.5 h-3.5 text-emerald-700" />
              )}
              <span className="max-w-[120px] truncate">{user.displayName || user.email}</span>
            </div>
          )}

          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <span className="font-mono tabular-nums text-xs px-1.5 py-0.2 bg-emerald-800 rounded text-emerald-50 font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-900 hover:bg-emerald-50 rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-zinc-900" /> : <Menu className="w-5 h-5 text-zinc-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-100 bg-white px-6 py-4 flex flex-col gap-3 shadow-lg">
          <button
            onClick={() => handleNavClick('all-catalogues')}
            className="text-left py-2 text-sm font-bold text-zinc-900 hover:text-emerald-700"
          >
            All Catalogues
          </button>
          <button
            onClick={() => handleNavClick('kids-football')}
            className="text-left py-2 text-sm font-bold text-zinc-900 hover:text-emerald-700"
          >
            Kids Football Kits
          </button>
          <button
            onClick={() => handleNavClick('soccer-jerseys')}
            className="text-left py-2 text-sm font-bold text-zinc-900 hover:text-emerald-700"
          >
            Soccer Jerseys
          </button>
          <button
            onClick={() => handleNavClick('club-tracksuits')}
            className="text-left py-2 text-sm font-bold text-zinc-900 hover:text-emerald-700"
          >
            Official Tracksuits
          </button>
          <button
            onClick={() => handleNavClick('matchday-socks')}
            className="text-left py-2 text-sm font-bold text-zinc-900 hover:text-emerald-700"
          >
            Matchday Grip Socks
          </button>
          <button
            onClick={() => handleNavClick('basketball-catalogue')}
            className="text-left py-2 text-sm font-bold text-zinc-900 hover:text-emerald-700"
          >
            Basketball Jerseys
          </button>
          <button
            onClick={() => handleNavClick('court-shorts')}
            className="text-left py-2 text-sm font-bold text-zinc-900 hover:text-emerald-700"
          >
            Court Shorts
          </button>
        </div>
      )}
    </header>
  );
};
