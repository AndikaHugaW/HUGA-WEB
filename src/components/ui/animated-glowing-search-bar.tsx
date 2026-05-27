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
      <div className="absolute z-[-1] w-full h-min-screen"></div>
      <div id="poda" className="relative flex items-center justify-center group w-full">
        {/* Orb Glow Effect - Blue */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] overflow-hidden h-[calc(100%+8px)] w-[calc(100%+12px)] rounded-full blur-[6px] opacity-30
                        before:absolute before:content-[''] before:z-[-2] before:w-[2500px] before:h-[2500px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                        before:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(0,102,255,0.05)_310deg,rgba(0,102,255,0.2)_350deg,rgba(0,102,255,0.6)_360deg)]">
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] overflow-hidden h-[calc(100%+2px)] w-[calc(100%+2px)] rounded-full blur-[1px] opacity-60
                        before:absolute before:content-[''] before:z-[-2] before:w-[2500px] before:h-[2500px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                        before:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(0,102,255,0.1)_310deg,rgba(0,102,255,0.3)_350deg,rgba(0,102,255,0.9)_360deg)]">
        </div>

        <div id="main" className="relative group w-full flex items-center">
          <input
            placeholder={placeholder}
            type="text"
            name="text"
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="bg-white border-2 border-black/[0.08] focus:border-[#0066ff] w-full h-[64px] rounded-full text-black pl-6 pr-[115px] sm:pr-[135px] md:pr-[185px] text-sm md:text-lg focus:outline-none placeholder-black/30 transition-all duration-300 font-sf-pro shadow-sm"
          />

          <div className="absolute right-2 flex items-center gap-1">
            {/* Filter Text Button */}
            <button
              type="button"
              onClick={onFilterClick}
              className="flex items-center gap-1 px-2.5 sm:px-4 h-12 rounded-full text-black/50 hover:text-[#0066ff] hover:bg-[#0066ff]/5 transition-all duration-300 text-xs sm:text-[15px] font-medium border border-transparent hover:border-[#0066ff]/20"
            >
              <span className="hidden sm:inline">{selectedCategory}</span>
              <span className="inline sm:hidden">Filter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Search Icon Button */}
            <button
              type="button"
              className="h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-[#0066ff] text-white shadow-lg shadow-[#0066ff]/25 hover:shadow-xl hover:shadow-[#0066ff]/35 hover:bg-[#0055dd] active:scale-95 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
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
