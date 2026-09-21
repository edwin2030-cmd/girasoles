import React from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { ActivePanel } from '../../types';

interface NavBarProps {
  activePanel: ActivePanel;
  onSelectPanel: (panel: ActivePanel) => void;
  isLetterMinimized?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({
  activePanel,
  onSelectPanel,
  isLetterMinimized = false,
}) => {
  const tabs = [
    {
      id: 'letter' as ActivePanel,
      label: 'Carta',
      icon: Mail,
    },
    {
      id: 'friend_letters' as ActivePanel,
      label: 'Mensajes',
      icon: Heart,
    },
    {
      id: 'garden' as ActivePanel,
      label: 'Jardín',
      icon: Sparkles,
    },
  ];

  return (
    <nav aria-label="Navegación principal" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#fffdfa]/90 backdrop-blur-xl border border-amber-600/30 shadow-[0_8px_30px_rgba(180,83,9,0.15)]">
        {tabs.map((tab) => {
          const isActive = activePanel === tab.id && (!isLetterMinimized || tab.id !== 'letter');
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectPanel(tab.id)}
              className={`relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 shadow-sm font-bold scale-102'
                  : 'text-stone-700 hover:text-amber-950 hover:bg-amber-500/15'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950 stroke-[2.5]' : 'text-amber-600'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
