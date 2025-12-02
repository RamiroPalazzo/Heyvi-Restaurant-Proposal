import React from 'react';
import { Restaurant } from '../types';
import { StatusBadge } from './StatusBadge';
import { Star, AlertCircle, MapPin, ChevronDown, Utensils, ExternalLink } from 'lucide-react';

interface RestaurantRowProps {
  restaurant: Restaurant;
  isExpanded: boolean;
  onToggle: () => void;
}

export const RestaurantRow: React.FC<RestaurantRowProps> = ({ restaurant, isExpanded, onToggle }) => {

  // Highlight background logic
  const rowBgClass = restaurant.isProposalHighlight 
    ? "bg-emerald-50/30 print:bg-emerald-50/20" 
    : "";

  // Stop propagation for map button so it doesn't trigger row expand
  const handleMapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <tr 
        onClick={onToggle}
        className={`
            border-b border-gray-100 transition-all duration-300 group cursor-pointer relative print:border-gray-200 print:break-inside-avoid
            ${rowBgClass}
            ${isExpanded ? 'bg-gray-50 print:bg-gray-50' : 'hover:bg-gray-50'}
        `}
      >
        
        {/* Name & Location */}
        <td className="py-6 pl-6 align-top relative print:pl-2 print:py-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-gray-900 text-lg leading-tight group-hover:text-heyvi-beige transition-colors">
                {restaurant.name}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 print:hidden ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 font-medium">
              {restaurant.location}
            </span>
          </div>

          {/* Hover Action: Map Button */}
          {restaurant.googleMapsUrl && (
             <div className="absolute left-6 -bottom-3 opacity-0 group-hover:opacity-100 print:opacity-100 print:relative print:left-0 print:bottom-auto print:mt-2 transition-opacity duration-300 z-10">
                <a 
                    href={restaurant.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={handleMapClick}
                    className="flex items-center gap-1.5 bg-white shadow-md border border-gray-200 rounded-full px-3 py-1 text-[10px] font-bold text-gray-700 hover:text-heyvi-beige hover:border-heyvi-beige transition-colors print:shadow-none print:border-gray-300 print:bg-transparent print:pl-0"
                >
                    <MapPin className="w-3 h-3" />
                    <span>View Map</span>
                </a>
             </div>
          )}
        </td>

        {/* Rating */}
        <td className="py-6 px-4 align-top text-center print:py-4">
          <div className="flex items-center justify-center gap-1 bg-white border border-gray-100 py-1 px-2 rounded-md shadow-sm w-fit mx-auto print:shadow-none print:border-gray-300">
            <span className="text-heyvi-beige font-bold text-sm print:text-gray-700">{restaurant.rating}</span>
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
          </div>
        </td>

        {/* Concept & Description */}
        <td className="py-6 px-4 align-top print:py-4">
          <div className="max-w-md">
            <span className="block text-gray-800 font-semibold mb-1">
              {restaurant.conceptTitle}
            </span>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 print:line-clamp-none">
              {restaurant.conceptDescription}
            </p>
            
            {/* Warnings/Notes (Summary view) */}
            {restaurant.warnings && restaurant.warnings.length > 0 && !isExpanded && (
              <div className="mt-2 flex flex-col gap-1">
                {restaurant.warnings.map((warning, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2 py-1 rounded text-[10px] font-bold border border-rose-100 w-fit print:border-rose-200">
                    <AlertCircle className="w-3 h-3" />
                    {warning}
                  </div>
                ))}
              </div>
            )}
          </div>
        </td>

        {/* Price */}
        <td className="py-6 px-4 align-top text-right print:py-4">
          <span className="font-medium text-gray-700 bg-white group-hover:bg-white/80 px-2 py-1 rounded border border-gray-100 text-sm whitespace-nowrap shadow-sm print:shadow-none print:border-none print:bg-transparent">
            {restaurant.priceDisplay}
          </span>
        </td>

        {/* Status */}
        <td className="py-6 pr-6 align-top text-right print:pr-2 print:py-4">
          <StatusBadge status={restaurant.status} />
        </td>
      </tr>

      {/* EXPANDED DETAILS ROW */}
      <tr className={`bg-gray-50/50 print:bg-white ${isExpanded ? '' : 'hidden'}`}>
        <td colSpan={5} className="px-6 pb-6 pt-0 border-b border-gray-100 print:px-2 print:border-b-2 print:border-gray-800">
            <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-inner mt-2 grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-6 animate-in fade-in slide-in-from-top-1 duration-200 print:shadow-none print:border-none print:p-2 print:mt-0 print:grid-cols-[150px_1fr_1fr]">
                
                {/* Column 1: Map Image & Address Link */}
                <div className="space-y-3">
                   {restaurant.mapPreviewImage && (
                       <a 
                          href={restaurant.googleMapsUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group/map relative h-28"
                       >
                           <img 
                              src={restaurant.mapPreviewImage} 
                              alt="Map location" 
                              className="w-full h-full object-cover grayscale opacity-80 group-hover/map:grayscale-0 group-hover/map:opacity-100 transition-all duration-500"
                           />
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/map:opacity-100 transition-opacity bg-black/10">
                                <span className="bg-white/90 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm text-gray-800">Open Map</span>
                           </div>
                       </a>
                   )}
                   
                   <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Address</h4>
                        <a 
                            href={restaurant.googleMapsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-gray-700 hover:text-heyvi-beige flex items-start gap-1.5 group/link print:text-blue-700 print:underline leading-tight"
                        >
                            <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover/link:text-heyvi-beige flex-shrink-0 mt-0.5 print:hidden" />
                            {restaurant.address || restaurant.location}
                        </a>
                    </div>
                </div>

                {/* Column 2: Full Description & Warnings */}
                <div className="border-l border-gray-100 pl-6 print:border-none print:pl-2">
                    <h4 className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Concept Details</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        {restaurant.conceptDescription}
                    </p>
                    
                     {/* Warnings Expanded */}
                    {restaurant.warnings && restaurant.warnings.length > 0 && (
                        <div className="pt-3">
                            {restaurant.warnings.map((warning, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-rose-700 text-xs font-medium">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {warning}
                            </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Column 3: Menu Highlights */}
                {restaurant.menuHighlights && (
                    <div className="border-l border-gray-100 pl-6 border-dashed print:border-gray-300">
                        <h4 className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold flex items-center gap-2">
                            <Utensils className="w-3 h-3" />
                            Menu Highlights
                        </h4>
                        <ul className="space-y-2">
                            {restaurant.menuHighlights.map((item, i) => (
                                <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                                    <span className="block w-1 h-1 bg-heyvi-beige rounded-full mt-1.5 print:bg-gray-800"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </td>
      </tr>
    </>
  );
};