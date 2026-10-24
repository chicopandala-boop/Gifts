import React from 'react';
import { Truck, Clock, MapPin, CheckCircle } from 'lucide-react';

export const EditorialStory: React.FC = () => {
  return (
    <section id="delivery" className="py-16 bg-gradient-to-b from-white to-emerald-50/30 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
            <Truck className="w-4 h-4 text-emerald-700" />
            <span>NATIONWIDE LOGISTICS NETWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-700 font-display">
            We Deliver Nationwide
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            No matter your city, province, or location, Gifts Boutique brings official club jerseys directly to your doorstep with guaranteed fast dispatch.
          </p>
        </div>

        {/* 2 Pillars of Nationwide Service (Boutique Presentation Box removed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-white rounded-xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-emerald-800 mb-2">
              Every City & Postal Code
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Our direct logistics network reaches all metropolitan cities, regional towns, and rural areas nationwide with live parcel tracking.
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Full National Coverage</span>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-emerald-800 mb-2">
              Priority Doorstep Dispatch
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Orders placed before 2:00 PM are processed same-day with priority delivery and automated status notifications.
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Doorstep Delivery Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
