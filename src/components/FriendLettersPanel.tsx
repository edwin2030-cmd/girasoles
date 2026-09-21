import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, ArrowLeft, ArrowRight, Upload, Image as ImageIcon, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface FriendLettersPanelProps {
  visible: boolean;
  onClose: () => void;
  onGoBackToMainLetter: () => void;
}

export const FriendLettersPanel: React.FC<FriendLettersPanelProps> = ({
  visible,
  onClose,
  onGoBackToMainLetter,
}) => {
  const { friendMessages } = APP_CONFIG;
  const letters = friendMessages.letters;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load custom photos stored in localStorage
  useEffect(() => {
    try {
      const saved: Record<string, string> = {};
      letters.forEach((letter) => {
        const stored = localStorage.getItem(`birthday_photo_${letter.id}`);
        if (stored) {
          saved[letter.id] = stored;
        }
      });
      setCustomPhotos(saved);
    } catch {
      // Storage access gracefully handled
    }
  }, [letters]);

  if (!visible) return null;

  const currentLetter = letters[currentIndex];

  // Handle uploading a local file from user's device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentLetter) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCustomPhotos((prev) => ({ ...prev, [currentLetter.id]: result }));
        setImgErrors((prev) => ({ ...prev, [currentLetter.id]: false }));
        try {
          localStorage.setItem(`birthday_photo_${currentLetter.id}`, result);
        } catch {
          // localStorage quote limit or private browsing fallback
        }
      }
    };
    reader.readAsDataURL(file);
    // Reset file input so user can re-upload if desired
    e.target.value = '';
  };

  const handleResetPhoto = (letterId: string) => {
    setCustomPhotos((prev) => {
      const updated = { ...prev };
      delete updated[letterId];
      return updated;
    });
    try {
      localStorage.removeItem(`birthday_photo_${letterId}`);
    } catch {
      // Handled
    }
  };

  const handleNext = () => {
    if (currentIndex < letters.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      onGoBackToMainLetter();
    }
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setCurrentIndex(0);
  };

  // Determine current photo source
  const currentPhotoSrc = currentLetter
    ? customPhotos[currentLetter.id] ||
      (!imgErrors[currentLetter.id] ? currentLetter.defaultPhotoUrl : null)
    : null;

  return (
    <div
      className="w-full max-w-xl mx-auto z-30 transition-all duration-700 ease-out select-text"
      style={{ animation: 'floatGentle 6s ease-in-out infinite' }}
    >
      <div className="relative backdrop-blur-xl bg-[#fffdfa]/95 border border-amber-600/30 rounded-3xl p-5 sm:p-7 shadow-[0_16px_45px_rgba(180,83,9,0.18),0_2px_12px_rgba(0,0,0,0.06)] text-center max-h-[82vh] sm:max-h-[85vh] flex flex-col justify-between overflow-hidden">
        {/* Hidden file input for device photo mounting */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Close / Minimize button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 active:scale-90 border border-amber-600/30 text-amber-900 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          title="Minimizar cartas"
          aria-label="Cerrar o minimizar cartas"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Decorative corner sparkles */}
        <div className="absolute top-3.5 left-3.5 text-amber-600/50">
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Section Header & Discrete Progress Indicator */}
        <div className="flex flex-col items-center gap-1.5 mb-2 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-600/30 text-amber-900 text-[10px] font-mono uppercase tracking-widest">
            <span>{friendMessages.sectionBadge}</span>
          </div>

          <h2 className="font-serif-title text-xl sm:text-2xl text-amber-950 font-bold tracking-wide">
            {friendMessages.sectionTitle}
          </h2>

          {!isCompleted && (
            <div className="flex items-center gap-2 mt-1" aria-label={`Carta ${currentIndex + 1} de 3`}>
              {letters.map((letter, idx) => (
                <button
                  key={letter.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'bg-amber-600 scale-125 shadow-sm'
                      : 'bg-amber-300/80 hover:bg-amber-400'
                  }`}
                  title={`Ir a la carta de ${letter.name}`}
                  aria-label={`Ver carta de ${letter.name}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Scrollable letter content */}
        <div className="overflow-y-auto px-1 sm:px-2 py-1 my-1 flex-1 pr-1.5 space-y-3.5 scrollbar-thin">
          {!isCompleted ? (
            <div key={currentLetter.id} className="animate-fade-in flex flex-col items-center text-center">
              {/* 1. FOTOGRAFÍA CON MARCO ELEGANTE Y CARGADOR DE ARCHIVOS */}
              <div className="relative group my-1 flex flex-col items-center">
                <div
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-[0_8px_20px_rgba(180,83,9,0.15)] bg-amber-50/80 flex items-center justify-center relative transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ aspectRatio: '1 / 1' }}
                >
                  {currentPhotoSrc ? (
                    <img
                      src={currentPhotoSrc}
                      alt={`Foto de ${currentLetter.name}`}
                      className="w-full h-full object-cover"
                      onError={() => {
                        setImgErrors((prev) => ({ ...prev, [currentLetter.id]: true }));
                      }}
                    />
                  ) : (
                    /* Elegant placeholder when no photo exists yet */
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-amber-100/90 via-amber-50 to-orange-100/60 text-amber-900">
                      <div className="w-12 h-12 rounded-full bg-amber-200/80 border border-amber-600/30 flex items-center justify-center text-xl font-serif font-bold mb-1 shadow-inner">
                        {currentLetter.name.charAt(0)}
                      </div>
                      <span className="text-[11px] font-medium text-amber-800 leading-tight">
                        Foto de {currentLetter.name}
                      </span>
                      <span className="text-[9px] text-amber-600/80 mt-0.5">
                        Toca abajo para subirla
                      </span>
                    </div>
                  )}
                </div>

                {/* File upload button for mounting photo from user's files */}
                <div className="mt-2 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/35 active:scale-95 border border-amber-600/30 text-amber-950 text-[11px] font-semibold tracking-wide transition-all cursor-pointer shadow-xs"
                    title={`Montar o cambiar foto de ${currentLetter.name} desde tus archivos`}
                  >
                    <Upload className="w-3 h-3 text-amber-800" />
                    <span>{currentPhotoSrc ? 'Cambiar foto' : 'Subir foto desde mis archivos'}</span>
                  </button>

                  {customPhotos[currentLetter.id] && (
                    <button
                      type="button"
                      onClick={() => handleResetPhoto(currentLetter.id)}
                      className="p-1 rounded-full text-amber-700 hover:text-amber-950 hover:bg-amber-200/60 transition-all cursor-pointer"
                      title="Restablecer foto original"
                      aria-label="Restablecer foto original"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* 2. NOMBRE */}
              <h3 className="font-serif-title text-2xl sm:text-3xl text-amber-950 tracking-wide mt-2 mb-1 drop-shadow-sm font-semibold">
                {currentLetter.name}
              </h3>

              {/* 3. MENSAJE */}
              <div className="font-poetic text-sm sm:text-base text-stone-700 leading-relaxed max-w-lg px-2 sm:px-4 text-center whitespace-pre-line my-1">
                {currentLetter.message}
              </div>
            </div>
          ) : (
            /* FINAL COMPLETION SCREEN */
            <div className="py-6 sm:py-8 flex flex-col items-center justify-center text-center animate-fade-in space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-amber-500/50 flex items-center justify-center text-amber-950 shadow-md animate-bounce">
                <Heart className="w-8 h-8 fill-amber-900 text-amber-900" />
              </div>

              <div className="inline-flex items-center gap-1 text-amber-800 font-serif-title text-xl font-bold">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                <span>{friendMessages.finalScreen.title}</span>
              </div>

              <p className="font-poetic text-base sm:text-lg text-stone-800 max-w-sm leading-relaxed px-3">
                "{friendMessages.finalScreen.message}"
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 active:scale-95 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{friendMessages.finalScreen.restartButtonText}</span>
                </button>

                <button
                  type="button"
                  onClick={onGoBackToMainLetter}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 border border-amber-600/35 text-amber-950 font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer"
                >
                  <span>Ver carta de Génesis</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. BOTONES DE NAVEGACIÓN */}
        {!isCompleted && (
          <div className="pt-3 border-t border-amber-600/20 flex items-center justify-between gap-3 shrink-0">
            {/* Botón Anterior / Volver */}
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 border border-amber-600/35 text-amber-950 text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{currentLetter.prevButtonText}</span>
            </button>

            {/* Indicator in middle for phones */}
            <span className="text-[11px] text-amber-800/80 font-mono">
              {currentIndex + 1} de {letters.length}
            </span>

            {/* Botón Avanzar / Finalizar */}
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 active:scale-95 text-stone-950 text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer shadow-sm"
            >
              <span>{currentLetter.nextButtonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
