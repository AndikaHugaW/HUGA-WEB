import React from 'react';

interface SearchComponentProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
  selectedCategory?: string;
}

const SearchComponent = ({ value, onChange, placeholder = "Search...", onFilterClick, selectedCategory = "All" }: SearchComponentProps) => {
  return (
    <div className="relative flex items-center justify-center w-full">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes orb-spin-cw {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-orb-cw::before {
          animation: orb-spin-cw 8s linear infinite;
        }
        .group:hover .animate-orb-cw::before {
          animation-duration: 4s;
        }
        .group:focus-within .animate-orb-cw::before {
          animation-duration: 3s;
        }
      `}} />
      
      <div className="absolute z-[-1] w-full h-min-screen"></div>
      <div id="poda" className="relative flex items-center justify-center group w-full">
        {/* Orb 1 (Emerald, Top, Moving Right/CW) - Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] overflow-hidden h-[calc(100%+8px)] w-[calc(100%+12px)] rounded-full blur-[6px] opacity-40 animate-orb-cw
                        before:absolute before:content-[''] before:z-[-2] before:w-[2500px] before:h-[2500px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                        before:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(0,255,136,0.02)_310deg,rgba(0,255,136,0.15)_350deg,rgba(0,255,136,0.6)_360deg)]">
        </div>
        {/* Orb 1 (Emerald, Top, Moving Right/CW) - Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] overflow-hidden h-[calc(100%+2px)] w-[calc(100%+2px)] rounded-full blur-[1px] opacity-80 animate-orb-cw
                        before:absolute before:content-[''] before:z-[-2] before:w-[2500px] before:h-[2500px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                        before:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(0,255,136,0.02)_310deg,rgba(0,255,136,0.15)_350deg,rgba(0,255,136,0.9)_360deg)]">
        </div>

        {/* Orb 2 (Cyan, Bottom, Moving Left/CW) - Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] overflow-hidden h-[calc(100%+8px)] w-[calc(100%+12px)] rounded-full blur-[6px] opacity-40 animate-orb-cw
                        before:absolute before:content-[''] before:z-[-2] before:w-[2500px] before:h-[2500px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                        before:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,rgba(34,211,238,0.02)_130deg,rgba(34,211,238,0.15)_170deg,rgba(34,211,238,0.6)_180deg,transparent_185deg,transparent_360deg)]">
        </div>
        {/* Orb 2 (Cyan, Bottom, Moving Left/CW) - Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] overflow-hidden h-[calc(100%+2px)] w-[calc(100%+2px)] rounded-full blur-[1px] opacity-80 animate-orb-cw
                        before:absolute before:content-[''] before:z-[-2] before:w-[2500px] before:h-[2500px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
                        before:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,rgba(34,211,238,0.02)_130deg,rgba(34,211,238,0.15)_170deg,rgba(34,211,238,0.9)_180deg,transparent_185deg,transparent_360deg)]">
        </div>

        <div id="main" className="relative group w-full flex items-center">
          <input 
            placeholder={placeholder} 
            type="text" 
            name="text" 
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="bg-[#010201] border border-white/[0.04] group-focus-within:border-white/[0.1] w-full h-[64px] rounded-full text-white pl-8 pr-[140px] text-lg focus:outline-none placeholder-white/30 transition-all duration-300 font-sf-pro" 
          />

          <div className="absolute right-2 flex items-center gap-1">
            {/* Filter Text Button (Matches 'Shots ⌄') */}
            <button 
              type="button"
              onClick={onFilterClick}
              className="flex items-center gap-1.5 px-4 h-12 rounded-full text-white/50 hover:text-white hover:bg-white/[0.03] transition-all duration-300 text-[15px] font-medium"
            >
              {selectedCategory}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Search Icon Button (Big round neon button on far right) */}
            <button
              type="button"
              className="h-12 w-12 flex items-center justify-center rounded-full bg-[#00ff88] text-[#010201] shadow-[0_0_15px_rgba(0,255,136,0.4)] hover:shadow-[0_0_25px_rgba(0,255,136,0.7)] hover:bg-[#33ff99] active:scale-95 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
