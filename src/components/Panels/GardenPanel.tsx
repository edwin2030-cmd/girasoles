import React from 'react';
import { Wind, Sparkles, Sun, Droplets, Info, Sprout, X } from 'lucide-react';

interface GardenPanelProps {
  onTriggerPetalRain: () => void;
  onTriggerWindBurst: () => void;
  onTriggerFireflies: () => void;
  onPlantRandomSunflower: () => void;
  firefliesActive: boolean;
  onClose?: () => void;
}

export const GardenPanel: React.FC<GardenPanelProps> = ({
  onTriggerPetalRain,
  onTriggerWindBurst,
  onTriggerFireflies,
  onPlantRandomSunflower,
  firefliesActive,
  onClose,
}) => {
  return (
    <div className="relative w-full max-w-xl mx-auto backdrop-blur-xl bg-[#fffdfa]/95 border border-amber-600/30 rounded-3xl p-5 sm:p-6 shadow-[0_16px_45px_rgba(180,83,9,0.18)] text-stone-800 animate-fade-in select-none">
      {/* Optional close button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 active:scale-90 border border-amber-600/30 text-amber-900 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          title="Minimizar panel del jardín"
          aria-label="Minimizar panel"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3.5 border-b border-amber-600/20 pr-8">
        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-800 border border-amber-600/30">
          <Sun className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-serif-title text-base sm:text-lg text-amber-950 tracking-wide">
            Jardín & Árbol de Girasoles
          </h2>
          <p className="text-[11px] sm:text-xs text-stone-600">
            Interactúa con la brisa, los pétalos dorados y los girasoles del árbol
          </p>
        </div>
      </div>

      {/* Action buttons grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
        {/* Button 1: Petal Rain */}
        <button
          type="button"
          onClick={onTriggerPetalRain}
          className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 border border-amber-600/25 text-amber-950 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-800">
            <Droplets className="w-4 h-4" />
          </div>
          <span className="text-center">Lluvia de Pétalos</span>
        </button>

        {/* Button 2: Wind Gust */}
        <button
          type="button"
          onClick={onTriggerWindBurst}
          className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 border border-amber-600/25 text-amber-950 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-800">
            <Wind className="w-4 h-4" />
          </div>
          <span className="text-center">Brisa Cálida</span>
        </button>

        {/* Button 3: Fireflies */}
        <button
          type="button"
          onClick={onTriggerFireflies}
          className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl active:scale-95 border text-xs font-semibold transition-all cursor-pointer shadow-sm ${
            firefliesActive
              ? 'bg-amber-500/25 border-amber-600/40 text-amber-950 shadow-md font-bold'
              : 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-600/25 text-amber-900'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-800">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-center">Destellos</span>
        </button>

        {/* Button 4: Plant Sunflower */}
        <button
          type="button"
          onClick={onPlantRandomSunflower}
          className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 border border-amber-600/25 text-amber-950 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-800">
            <Sprout className="w-4 h-4" />
          </div>
          <span className="text-center">Sembrar Girasol</span>
        </button>
      </div>

      {/* Tip footer */}
      <div className="mt-1 p-3 rounded-xl bg-amber-500/10 border border-amber-600/20 flex items-center gap-2.5 text-xs text-stone-600">
        <Info className="w-4 h-4 text-amber-700 shrink-0" />
        <span>
          Tip interactivo: ¡Toca o haz clic en cualquier lugar de la pantalla o en el árbol para hacer florecer girasoles dorados con destellos!
        </span>
      </div>
    </div>
  );
};
