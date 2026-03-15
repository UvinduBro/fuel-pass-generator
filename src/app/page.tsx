"use client"

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Download, Share2, UploadCloud, Smartphone, ExternalLink } from 'lucide-react';
import { FuelPassCard } from '@/components/FuelPassCard';
import { exportCardToPng, shareCardImage } from '@/lib/exportUtils';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [walletLoading, setWalletLoading] = useState<'apple' | 'google' | null>(null);

  const cardId = 'fuel-pass-card';

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setQrCodeUrl(imageUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await exportCardToPng(cardId, `fuel-pass-${vehicleNumber || 'card'}.png`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    setIsExporting(true);
    try {
      await shareCardImage(cardId, `fuel-pass-${vehicleNumber || 'card'}.png`, 'My Fuel Pass');
    } catch (err) {
       alert(err instanceof Error ? err.message : 'Share failed');
    } finally {
      setIsExporting(false);
    }
  };

  const addToAppleWallet = async () => {
    alert("Currently not available");
  };

  const addToGoogleWallet = async () => {
    alert("Currently not available");
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-10 px-4 md:px-8 font-sans selection:bg-red-500/30">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Fuel Pass Generator
          </h1>
          <p className="text-muted-foreground font-medium mt-1 text-sm md:text-base">
            Create your digital fuel pass instantly
          </p>
        </div>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start justify-center">
        
        {/* Configuration Section, Left Side */}
        <div className="w-full lg:w-[450px] bg-card border border-border rounded-2xl shadow-sm p-6 md:p-8 space-y-8 relative overflow-hidden">
          
          <div className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label htmlFor="vehicle-number" className="text-sm font-semibold text-foreground/90">
                Vehicle Number
              </label>
              <input 
                id="vehicle-number"
                type="text" 
                placeholder="e.g. WP CAA 1234" 
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent uppercase transition-all placeholder:normal-case placeholder:text-muted-foreground shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/90">
                QR Code Image
              </label>
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200
                  ${isDragActive ? 'border-red-500 bg-red-50 dark:bg-red-900/10 scale-[1.02]' : 'border-border bg-secondary/30 hover:border-red-400 hover:bg-secondary/50'}
                `}
              >
                <input {...getInputProps()} />
                <div className="bg-background rounded-full p-3 mb-3 shadow-sm border border-border">
                  <UploadCloud className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-sm text-foreground text-center leading-relaxed">
                  <span className="font-semibold text-red-500">Click to upload</span> or drag and drop<br />
                  <span className="text-muted-foreground text-xs mt-1 block">PNG, JPG or JPEG</span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border space-y-3 relative z-10">
            <button 
               onClick={handleDownload}
               disabled={isExporting}
               className="w-full flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 py-3 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.01]"
            >
              <Download size={18} /> Download Pass (PNG)
            </button>
            
            <button 
               onClick={handleShare}
               disabled={isExporting}
               className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border py-3 rounded-xl font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Share2 size={18} /> Share Pass
            </button>

            <div className="pt-6 mt-4 space-y-3 border-t border-border opacity-60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-1">Digital Wallets (Unavailable)</h3>
              <button 
                 onClick={addToAppleWallet}
                 className="w-full flex items-center justify-center gap-2 bg-black dark:bg-gray-800 text-white py-3 rounded-xl font-medium transition-all shadow-sm cursor-not-allowed"
              >
                <Smartphone size={18} /> Add to Apple Wallet
              </button>
              <button 
                 onClick={addToGoogleWallet}
                 className="w-full flex items-center justify-center gap-2 bg-[#4285F4] text-white py-3 rounded-xl font-medium transition-all shadow-sm cursor-not-allowed"
              >
                <Smartphone size={18} /> Add to Google Wallet
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section, Right Side */}
        <div className="w-full lg:w-auto flex flex-col items-center flex-1">
           <div className="bg-card/50 backdrop-blur-sm p-4 rounded-3xl border border-border shadow-xl">
             <div id={cardId} className="rounded-xl overflow-hidden shrink-0">
               <FuelPassCard 
                 vehicleNumber={vehicleNumber}
                 qrCodeUrl={qrCodeUrl}
               />
             </div>
           </div>
           <p className="mt-6 text-sm text-muted-foreground text-center max-w-sm font-medium">
             Live preview of your Fuel Pass. The final image will be exported exactly as shown.
           </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-muted-foreground pb-8 flex items-center justify-center gap-1.5 flex-wrap">
        <span>Developed by</span>
        <a 
          href="https://facebook.com/UvinduOnline" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-semibold text-foreground hover:text-red-500 transition-colors inline-flex items-center gap-1"
        >
          Uvindu Rajapakshe <ExternalLink size={14} />
        </a>
      </footer>

    </main>
  );
}
