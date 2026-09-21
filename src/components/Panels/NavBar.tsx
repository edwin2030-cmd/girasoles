import React from 'react';
import { Mail, Gift, Sparkles, Edit3 } from 'lucide-react';
import { ActivePanel } from '../../types';

interface NavBarProps {
  activePanel: ActivePanel;
  onSelectPanel: (panel: ActivePanel) => void;
  wishesDiscoveredCount: number;
}

export const NavBar: React.FC<NavBarProps> = ({
  activePanel,
  onSelectPanel,
  wishesDiscoveredCount,
}) => {
  const tabs = [
    {
      id: 'letter' as ActivePanel,
      label: 'Carta 16',
      icon: Mail,
      badge: null,
    },
    {
      id: 'wishes' as ActivePanel,
      label: '16 Deseos',
      icon: Gift,
      badge: wishesDiscoveredCount > 0 ? `${wishesDiscoveredCount}/16` : '16',
    },
    {
      id: 'garden' as ActivePanel,
      label: 'Jardín',
      icon: Sparkles,
      badge: null,
    },
    {
      id: 'customize' as ActivePanel,
      label: 'Dedicatoria',
      icon: Edit3,
      badge: null,
    },
  ];

  return (
    <nav aria-label="Navegación de paneles" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-stone-950/85 backdrop-blur-xl border border-amber-500/35 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(251,191,36,0.2)]">
        {tabs.map((tab) => {
          const isActive = activePanel === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectPanel(tab.id)}
              className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-[0_0_15px_rgba(251,191,36,0.6)] font-bold scale-102'
                  : 'text-amber-200/75 hover:text-amber-100 hover:bg-amber-500/15'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950 stroke-[2.5]' : 'text-amber-400'}`} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>

              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive
                      ? 'bg-stone-950/20 text-stone-950'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
