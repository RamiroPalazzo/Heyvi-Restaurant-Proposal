import React, { useState } from 'react';
import { RESTAURANTS } from './constants';
import { RestaurantRow } from './components/RestaurantRow';
import { FileText, Calendar, Info, Printer, Maximize2, Minimize2 } from 'lucide-react';

const App: React.FC = () => {
  // State to manage which rows are expanded
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedIds(newSet);
  };

  const expandAll = () => {
    setExpandedIds(new Set(RESTAURANTS.map(r => r.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] py-8 px-4 sm:px-6 lg:px-8 flex justify-center font-sans print:p-0 print:bg-white">
      
      <style>{`
        @media print {
            @page {
                size: A4 landscape;
                margin: 5mm; /* Smaller margins for better fit */
            }
            body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                background-color: white !important;
            }
            /* Force background graphics for Chrome/Safari */
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
      `}</style>

      {/* Action Bar (Hidden on print) */}
      <div className="fixed bottom-6 right-6 z-50 print:hidden flex flex-col gap-3 items-end">
          
          <div className="flex gap-2">
            <button 
                onClick={expandedIds.size === RESTAURANTS.length ? collapseAll : expandAll}
                className="h-10 px-4 bg-white text-gray-700 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                title="Toggle Details"
            >
                {expandedIds.size === RESTAURANTS.length ? (
                    <>
                        <Minimize2 className="w-4 h-4" /> Collapse All
                    </>
                ) : (
                    <>
                        <Maximize2 className="w-4 h-4" /> Expand All
                    </>
                )}
            </button>
          </div>

          <div className="flex flex-col items-end gap-2 group relative">
            <div className="bg-gray-800 text-white text-xs py-1 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none absolute right-16 top-4 w-40 text-right">
                Can't print? Try Ctrl+P
            </div>
            <button 
                onClick={handlePrint}
                className="h-14 w-14 bg-heyvi-beige text-white rounded-full shadow-xl hover:bg-[#b09b85] transition-colors flex items-center justify-center"
            >
                <Printer className="w-6 h-6" />
            </button>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">Save PDF</span>
          </div>
      </div>
      
      {/* Paper Sheet Container */}
      <div className="w-full max-w-[1200px] bg-white shadow-xl rounded-sm p-8 md:p-12 relative overflow-hidden ring-1 ring-black/5 print:shadow-none print:ring-0 print:max-w-none print:w-full print:p-0 print:overflow-visible">
        
        {/* Decorative Top Border (Paper feel) */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-heyvi-beige/40 via-heyvi-beige to-heyvi-beige/40 print:hidden"></div>

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b-2 border-heyvi-beige/20 pb-6 gap-6 print:mb-4 print:pb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-heyvi-beige/10 rounded-full print:border print:border-gray-200">
                    <FileText className="w-5 h-5 text-heyvi-beige" />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl text-gray-900 tracking-tight font-medium">
                Restaurant Shortlist
                </h1>
            </div>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400 font-medium pl-1">
              Venue Comparison & Analysis
            </p>
          </div>
          
          <div className="text-left md:text-right bg-gray-50 p-3 rounded-lg border border-gray-100 print:bg-transparent print:border-none print:p-0">
            <div className="flex items-center gap-2 text-gray-900 mb-1 justify-start md:justify-end">
                <Calendar className="w-3 h-3 text-heyvi-beige" />
                <span className="font-bold text-xs uppercase tracking-wide">Status Report</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono block">
              Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg border border-gray-200/60 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] print:shadow-none print:border-none print:overflow-visible">
          <table className="w-full text-left border-collapse min-w-[800px] print:min-w-0 print:w-full">
            <thead>
              <tr className="bg-heyvi-light text-[10px] uppercase tracking-[0.2em] text-gray-500 border-b border-heyvi-beige/40 print:bg-gray-100">
                <th className="py-4 pl-6 font-bold w-[25%] print:pl-2">Venue Name</th>
                <th className="py-4 px-4 font-bold text-center w-[10%]">Rating</th>
                <th className="py-4 px-4 font-bold w-[35%]">The Proposal (Concept)</th>
                <th className="py-4 px-4 font-bold text-right w-[15%]">Est. Price / pp</th>
                <th className="py-4 pr-6 font-bold text-right w-[15%] print:pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {RESTAURANTS.map((restaurant) => (
                <RestaurantRow 
                    key={restaurant.id} 
                    restaurant={restaurant} 
                    isExpanded={expandedIds.has(restaurant.id)}
                    onToggle={() => toggleRow(restaurant.id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Legend */}
        <footer className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[10px] text-gray-400 print:mt-4 print:pt-4 print:break-inside-avoid">
          
          {/* Legend */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50 print:ring-0"></span>
              <span className="uppercase tracking-wider font-medium">Confirmed / Proposal Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 ring-4 ring-blue-50 print:ring-0"></span>
              <span className="uppercase tracking-wider font-medium">Contacted / Waiting</span>
            </div>
          </div>

          {/* Note */}
          <div className="flex items-start gap-2 max-w-xs bg-gray-50 p-2 rounded text-gray-500 print:bg-transparent print:p-0">
            <Info className="w-3 h-3 mt-0.5 flex-shrink-0 text-gray-400" />
            <p className="leading-tight">
              Price estimates include dinner menu + beverage package approx.
            </p>
          </div>
        </footer>

        {/* Branding */}
        <div className="mt-12 text-center relative print:mt-6 print:break-inside-avoid">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -z-10 print:hidden"></div>
            <span className="bg-white px-4 text-[9px] uppercase tracking-[0.4em] text-heyvi-beige font-bold print:px-0 print:text-gray-400">
                HEYVI EVENTS | 2025
            </span>
        </div>

      </div>
    </div>
  );
};

export default App;