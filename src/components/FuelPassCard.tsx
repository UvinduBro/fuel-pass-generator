/* eslint-disable @next/next/no-img-element */
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FuelPassCardProps {
  vehicleNumber: string;
  qrCodeUrl: string | null;
  className?: string;
}

export const FuelPassCard = forwardRef<HTMLDivElement, FuelPassCardProps>(
  ({ vehicleNumber, qrCodeUrl, className }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "w-[350px] sm:w-[400px] h-[580px] sm:h-[660px] bg-white relative overflow-hidden border shadow-lg rounded-sm",
          className
        )}
        style={{
          transformOrigin: 'top left',
        }}
      >
        {/* Background Template Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none bg-white">
          <img 
             src="/template.png"
             alt="Fuel Pass Template"
             className="w-full h-full object-cover"
             crossOrigin="anonymous"
          />
        </div>

        {/* Dynamic Content Layer */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-8 pb-16">
          {/* QR Code */}
          {qrCodeUrl ? (
            <div className="w-56 h-56 sm:w-64 sm:h-64 relative mb-4 sm:mb-6 bg-white p-2">
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                className="w-full h-full object-contain" 
                crossOrigin="anonymous"
              />
            </div>
          ) : (
            <div className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-dashed border-gray-400/50 bg-white/50 backdrop-blur-sm rounded flex items-center justify-center text-gray-500 mb-4 sm:mb-6">
              <span className="font-semibold text-sm">QR Code Here</span>
            </div>
          )}

          {/* Vehicle Number */}
          <div className="text-center w-full">
            <h2 className="text-2xl sm:text-[32px] font-extrabold text-black tracking-widest uppercase drop-shadow-sm">
              {vehicleNumber || "VEHICLE NUMBER"}
            </h2>
          </div>
        </div>
      </div>
    );
  }
);
FuelPassCard.displayName = 'FuelPassCard';
