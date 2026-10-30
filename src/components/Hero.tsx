import React from 'react';
import { Truck } from 'lucide-react';
import {
  HERO_SOCCER_IMAGE,
  HERO_BALL_IMAGE,
  BANNER_SOCCER_PLAYER_PNG,
  BANNER_BASKETBALL_PLAYER_PNG
} from '../data/products';
import { Product, Currency } from '../types/store';

interface HeroProps {
  onExploreCollection?: () => void;
  onExploreKids?: () => void;
  onExploreFootball: () => void;
  onExploreTracksuits?: () => void;
  onExploreSocks?: () => void;
  onExploreBasketball: () => void;
  onExploreDelivery: () => void;
  driveProducts?: Product[];
  onQuickView?: (product: Product) => void;
  onSyncDrive?: () => void;
  isSyncingDrive?: boolean;
  currency?: Currency;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreKids,
  onExploreFootball,
  onExploreTracksuits,
  onExploreSocks,
  onExploreBasketball,
  onExploreDelivery: _onExploreDelivery,
}) => {
  return (
    <section id="hero" className="relative border-b border-zinc-200 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
        
        {/* Top Header Presentation Row */}
        <div className="flex flex-col gap-5 pb-6">
          <div className="space-y-2.5 w-full">
            {/* Nationwide Delivery Tag */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-800">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
              <span>WE DELIVER NATIONWIDE</span>
              <span aria-hidden="true" className="text-emerald-400">·</span>
              <span>OFFICIAL SPORTS STORE</span>
            </div>

            {/* Main Headline in Tondu Font - unstacked ("only as it is") and significantly larger */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.5rem] font-black tracking-normal text-emerald-700 font-display leading-[1.05] lg:whitespace-nowrap">
              Official Soccer & Basketball Catalogues
            </h1>

            {/* Tagline */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-4xl">
              Explore our premier catalogues for official soccer club & international matchday jerseys, official training tracksuits, alongside NBA-grade court jerseys, championship retro hardwood editions, and pro court shorts.
            </p>
          </div>

          {/* Quick Action Badges / Category Jumps */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-sans shadow-2xs">
              <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span><strong>Nationwide Doorstep Delivery:</strong> Direct dispatch across all regions.</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onExploreFootball}
                className="px-3.5 py-2 text-xs font-bold bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-lg transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
              >
                Soccer Jerseys
              </button>
              {onExploreTracksuits && (
                <button
                  onClick={onExploreTracksuits}
                  className="px-3.5 py-2 text-xs font-bold bg-zinc-900 hover:bg-black text-white rounded-lg transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
                >
                  Tracksuits
                </button>
              )}
              {onExploreSocks && (
                <button
                  onClick={onExploreSocks}
                  className="px-3.5 py-2 text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
                >
                  Matchday Grip Socks
                </button>
              )}
              <button
                onClick={onExploreBasketball}
                className="px-3.5 py-2 text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
              >
                Basketball Jerseys
              </button>
            </div>
          </div>
        </div>

        {/* FULL LANDSCAPE WIDESCREEN BANNERS EXTENDED TO LAPTOP VIEW */}
        <div className="w-full relative rounded-2xl overflow-hidden border border-zinc-200/90 shadow-2xl flex flex-col mt-2">
          
          {/* TOP SANDWICH LAYER: Soccer / Football Landscape Banner (Orange) */}
          <div
            onClick={onExploreFootball}
            title="Explore Soccer Jerseys"
            className="relative h-60 sm:h-72 md:h-80 lg:h-[300px] xl:h-[320px] w-full bg-[#ea580c] overflow-hidden group cursor-pointer transition-all duration-300"
          >
            {/* Solid Rich Orange / Dark-Yellow Background - Football Jerseys */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#ea580c] via-[#d97706] to-[#b45309]" />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
            />
            <img
              src={HERO_SOCCER_IMAGE}
              alt="Matchday Soccer Action"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-15 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />

            {/* Huge Banner Text: Landscape Layout with Widescreen Breathing Room & Refined Kerning */}
            <div className="absolute inset-y-0 left-3.5 sm:left-10 md:left-12 lg:left-14 z-20 flex flex-col justify-center max-w-[53%] sm:max-w-[62%] md:max-w-[60%] pointer-events-none select-none">
              <h2 className="font-display font-black text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wide leading-[0.92] text-zinc-950 uppercase drop-shadow-xs">
                <span className="block">PREMIER LEAGUE</span>
                <span className="block">& CHAMPIONS</span>
              </h2>
              <span className="text-[10px] sm:text-sm md:text-base font-extrabold uppercase tracking-wider text-zinc-950/90 mt-1.5 sm:mt-2 font-sans line-clamp-2 sm:line-clamp-none">
                Official Soccer Club & National Team Matchday Jerseys
              </span>
            </div>

            {/* Lyle Foster on the right in widescreen landscape with full headroom, enlarged for strong presence */}
            <div className="absolute inset-y-0 right-0 sm:right-6 md:right-10 lg:right-16 flex items-end justify-end pointer-events-none z-10 pt-1 pb-0">
              <img
                src={BANNER_SOCCER_PLAYER_PNG}
                alt="Lyle Foster South Africa & Premier League Footballer"
                className="h-auto max-h-[92%] sm:max-h-[96%] md:max-h-[98%] lg:max-h-full max-w-[46%] sm:max-w-[44%] md:max-w-none w-auto object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] filter transition-transform duration-500 origin-bottom group-hover:scale-[1.03]"
                loading="eager"
              />
            </div>
          </div>

          {/* White Line Separator between Premier League Champions and Hardwood Courts */}
          <div className="h-[2px] w-full bg-white relative z-20 shadow-xs" />

          {/* BOTTOM SANDWICH LAYER: Basketball Landscape Banner (Rich Green Background) */}
          <div
            onClick={onExploreBasketball}
            title="Explore Basketball Jerseys & Shorts"
            className="relative h-60 sm:h-72 md:h-80 lg:h-[300px] xl:h-[320px] w-full bg-emerald-950 overflow-hidden group cursor-pointer transition-all duration-300"
          >
            {/* Same Rich Green Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-800 to-emerald-900" />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"
            />
            <img
              src={HERO_BALL_IMAGE}
              alt="Sports Court & Hardwood"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-15 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />

            {/* Huge Banner Text: Landscape Layout with Widescreen Breathing Room & Refined Kerning */}
            <div className="absolute inset-y-0 left-3.5 sm:left-10 md:left-12 lg:left-14 z-20 flex flex-col justify-center max-w-[53%] sm:max-w-[62%] md:max-w-[60%] pointer-events-none select-none">
              <h2 className="font-display font-black text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wide leading-[0.92] text-white uppercase drop-shadow-md">
                <span className="block">OFFICIAL HARDWOOD</span>
                <span className="block">& COURT SHORTS</span>
              </h2>
              <div className="mt-1.5 sm:mt-2">
                <span className="text-[10px] sm:text-sm md:text-base font-extrabold uppercase tracking-wider text-emerald-200/90 font-sans line-clamp-2 sm:line-clamp-none">
                  Official Basketball Vests & Shorts
                </span>
              </div>
            </div>

            {/* Basketball Athlete Jamal Crawford: head fully uncut with safe headroom in widescreen landscape, enlarged */}
            <div className="absolute inset-y-0 -right-1 sm:right-2 md:right-6 lg:right-12 flex items-end justify-end pointer-events-none z-10 pt-1 pb-0">
              <img
                src={BANNER_BASKETBALL_PLAYER_PNG}
                alt="Basketball Athlete Jamal Crawford"
                className="h-auto max-h-[90%] sm:max-h-[95%] md:max-h-[98%] lg:max-h-full max-w-[46%] sm:max-w-[44%] md:max-w-none w-auto object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] filter transition-transform duration-500 origin-bottom group-hover:scale-[1.03]"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
