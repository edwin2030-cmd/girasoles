import React from 'react';
import { Wind, Sparkles, Sun, Droplets, Info } from 'lucide-react';

interface GardenPanelProps {
  onTriggerPetalRain: () => void;
  onTriggerWindBurst: () => void;
  onTriggerFireflies: () => void;
  onPlantRandomSunflower: () => void;
  firefliesActive: boolean;
}

export const GardenPanel: React.FC<GardenPanelProps> = ({
  onTriggerPetalRain,
  onTriggerWindBurst,
  onTriggerFireflies,
  onPlantRandomSunflower,
  firefliesActive,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto backdrop-blur-xl bg-stone-950/85 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-[0_12px_45px_rgba(0,0,0,0.6),0_0_30px_rgba(251,191,36,0.18)] text-amber-100 animate-fade-in select-none">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3.5 border-b border-amber-500/20">
        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 border border-amber-400/40">
          <Sun className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-serif-title text-base sm:text-lg text-amber-200 tracking-wide">
            Jardín Mágico & Árbol de Girasoles
          </h2>
          <p className="text-[11px] sm:text-xs text-amber-300/70">
            Interactúa con la brisa, los pétalos dorados y los girasoles del árbol
          </p>
        </div>
      </div>

      {/* Action buttons grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
        {/* Button 1: Petal Rain */}
        <button
          onClick={onTriggerPetalRain}
          className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 border border-amber-400/30 text-amber-200 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(251,191,36,0.25)]"
        >
          <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">
            <Droplets className="w-4 h-4" />
          </div>
          <span className="text-center">Lluvia de Pétalos</span>
        </button>

        {/* Button 2: Wind Gust */}
        <button
          onClick={onTriggerWindBurst}
          className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 border border-amber-400/30 text-amber-200 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(251,191,36,0.25)]"
        >
          <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">
            <Wind className="w-4 h-4" />
          </div>
          <span className="text-center">Brisa Cálida</span>
        </button>

        {/* Button 3: Fireflies */}
        <button
          onClick={onTriggerFireflies}
          className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl active:scale-95 border text-xs font-semibold transition-all cursor-pointer shadow-sm ${
            firefliesActive
              ? 'bg-amber-500/30 border-amber-400 text-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.35)]'
              : 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-400/30 text-amber-200'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-center">Luciérnagas</span>
        </button>

        {/* Button 4: Plant Sunflower */}
        <button
          onClick={onPlantRandomSunflower}
          className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 border border-amber-400/30 text-amber-200 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(251,191,36,0.25)]"
        >
          <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300">
            <span className="text-base">🌻</span>
          </div>
          <span className="text-center">Sembrar Girasol</span>
        </button>
      </div>

      {/* Tip footer */}
      <div className="mt-1 p-3 rounded-xl bg-amber-950/40 border border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-300/80">
        <Info className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          Tip interactivo: ¡Toca o haz clic en cualquier lugar de la pantalla o en el árbol para hacer florecer girasoles dorados con destellos!
        </span>
      </div>
    </div>
  );
};
