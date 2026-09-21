import React, { useState } from 'react';
import { Sparkles, X, ArrowLeft, ArrowRight, RotateCcw, Heart, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface FriendLettersPanelProps {
  visible: boolean;
  onClose: () => void;
  onGoBackToMainLetter: () => void;
}

const CANDIDATE_EXTENSIONS = [
  '.jpg',
  '.jpg.jpeg',
  '.jpeg',
  '.png',
  '.JPG',
  '.JPEG',
  '.PNG',
  '.webp',
];

interface AdaptivePhotoProps {
  letterId: string;
  name: string;
  className?: string;
  isLarge?: boolean;
}

const AdaptivePhoto: React.FC<AdaptivePhotoProps> = ({
  letterId,
  name,
  className,
  isLarge = false,
}) => {
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [failedAll, setFailedAll] = useState(false);

  const candidateUrls = CANDIDATE_EXTENSIONS.map((ext) => `/images/${letterId}${ext}`);
  const currentUrl = candidateUrls[candidateIdx];

  const handleError = () => {
    if (candidateIdx < candidateUrls.length - 1) {
      setCandidateIdx((prev) => prev + 1);
    } else {
      setFailedAll(true);
    }
  };

  if (failedAll) {
    if (isLarge) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-100/90 via-amber-50 to-orange-100/70 text-amber-900 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-200/80 border border-amber-600/30 flex items-center justify-center mb-2.5 shadow-sm">
            <ImageIcon className="w-8 h-8 text-amber-800" />
          </div>
          <p className="font-serif-title text-base sm:text-lg font-semibold text-amber-950">
            Fotografía Grupal
          </p>
          <p className="text-xs text-amber-800/90 font-mono mt-1 px-4">
            Coloca tu imagen en: <strong>public/images/todas.jpg</strong>
          </p>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-amber-100/90 via-amber-50 to-orange-100/60 text-amber-900">
        <div className="w-12 h-12 rounded-full bg-amber-200/80 border border-amber-600/30 flex items-center justify-center text-xl font-serif font-bold mb-1 shadow-inner">
          {name.charAt(0)}
        </div>
        <span className="text-[11px] font-medium text-amber-800 leading-tight">
          {name}
        </span>
        <span className="text-[9px] text-amber-700 font-mono mt-0.5">
          /images/{letterId}.jpg
        </span>
      </div>
    );
  }

  return (
    <img
      key={`${letterId}-${currentUrl}`}
      src={currentUrl}
      alt={`Foto de ${name}`}
      className={className || 'w-full h-full object-cover'}
      onError={handleError}
    />
  );
};

export const FriendLettersPanel: React.FC<FriendLettersPanelProps> = ({
  visible,
  onClose,
  onGoBackToMainLetter,
}) => {
  const { friendMessages } = APP_CONFIG;
  const letters = friendMessages.letters;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFading, setIsFading] = useState(false);

  if (!visible) return null;

  const currentLetter = letters[currentIndex];

  // Smooth fade transition between cards (no page reload)
  const transitionToCard = (newIndex: number) => {
    if (newIndex === currentIndex || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 220);
  };

  const handleNext = () => {
    if (isFading) return;
    if (currentIndex < letters.length - 1) {
      transitionToCard(currentIndex + 1);
    } else {
      setIsFading(true);
      setTimeout(() => {
        setIsCompleted(true);
        setIsFading(false);
      }, 240);
    }
  };

  const handlePrev = () => {
    if (isFading) return;
    if (currentIndex > 0) {
      transitionToCard(currentIndex - 1);
    } else {
      onGoBackToMainLetter();
    }
  };

  const handleRestart = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsCompleted(false);
      setCurrentIndex(0);
      setIsFading(false);
    }, 240);
  };

  return (
    <div
      id="friend-letters-panel"
      className="w-full max-w-xl mx-auto z-30 transition-all duration-700 ease-out select-text"
      style={{ animation: 'floatGentle 6s ease-in-out infinite' }}
    >
      <div className="relative backdrop-blur-xl bg-[#fffdfa]/95 border border-amber-600/30 rounded-3xl p-5 sm:p-7 shadow-[0_16px_45px_rgba(180,83,9,0.18),0_2px_12px_rgba(0,0,0,0.06)] text-center max-h-[84vh] sm:max-h-[86vh] flex flex-col justify-between overflow-hidden">
        {/* Close / Minimize button */}
        <button
          id="btn-close-friend-letters"
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 active:scale-90 border border-amber-600/30 text-amber-900 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          title="Minimizar cartas"
          aria-label="Cerrar o minimizar cartas"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Decorative corner sparkles */}
        <div className="absolute top-3.5 left-3.5 text-amber-600/50 pointer-events-none">
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Section Header & Discrete Indicator */}
        <div className="flex flex-col items-center gap-1 mb-2 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-600/30 text-amber-900 text-[10px] font-mono uppercase tracking-widest">
            <span>{friendMessages.sectionBadge}</span>
          </div>

          <h2 className="font-serif-title text-xl sm:text-2xl text-amber-950 font-bold tracking-wide">
            {friendMessages.sectionTitle}
          </h2>

          {/* Indicator: ● ○ ○ ○ (Todas), ○ ● ○ ○ (Alicia), ○ ○ ● ○ (Elianis), ○ ○ ○ ● (Joice) */}
          {!isCompleted && (
            <div
              className="flex items-center gap-2 mt-1.5"
              aria-label={`Carta ${currentIndex + 1} de ${letters.length}`}
            >
              {letters.map((letter, idx) => (
                <button
                  key={letter.id}
                  id={`dot-indicator-${letter.id}`}
                  type="button"
                  onClick={() => transitionToCard(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-5 bg-amber-600 shadow-sm'
                      : 'w-2.5 bg-amber-300/80 hover:bg-amber-400'
                  }`}
                  title={`Ver carta ${idx + 1}`}
                  aria-label={`Ir a la carta ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Scrollable content with smooth fade transition */}
        <div className="overflow-y-auto px-1 sm:px-2 py-1 my-1 flex-1 pr-1.5 space-y-3.5 scrollbar-thin">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isFading
                ? 'opacity-0 scale-[0.98] blur-[0.5px]'
                : 'opacity-100 scale-100 blur-0'
            }`}
          >
            {!isCompleted && currentLetter ? (
              currentLetter.showOnlyImage ? (
                /* ================================================================= */
                /* 1. FOTO DE TODAS (En grande, sin mensaje ni texto "Todas")        */
                /* ================================================================= */
                <div
                  id="card-todas-container"
                  className="flex flex-col items-center justify-center py-2 sm:py-3 w-full"
                >
                  <div className="w-full max-w-md aspect-[4/3] sm:aspect-[16/10] max-h-[50vh] sm:max-h-[54vh] rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-[0_12px_32px_rgba(180,83,9,0.2)] bg-amber-50/90 flex items-center justify-center relative transition-transform duration-300 hover:scale-[1.01]">
                    <AdaptivePhoto
                      letterId={currentLetter.id}
                      name={currentLetter.name}
                      isLarge={true}
                    />
                  </div>
                </div>
              ) : (
                /* ================================================================= */
                /* 2, 3, 4. CARTAS INDIVIDUALES (Alicia, Elianis, Joice)             */
                /* ================================================================= */
                <div
                  id={`card-${currentLetter.id}-container`}
                  className="flex flex-col items-center text-center"
                >
                  {/* Fotografía con marco elegante, bordes redondeados y sombra suave */}
                  <div className="relative my-1 flex flex-col items-center">
                    <div
                      className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-[0_8px_20px_rgba(180,83,9,0.16)] bg-amber-50/80 flex items-center justify-center relative transition-all duration-300 hover:scale-[1.02]"
                      style={{ aspectRatio: '1 / 1' }}
                    >
                      <AdaptivePhoto
                        letterId={currentLetter.id}
                        name={currentLetter.name}
                        isLarge={false}
                      />
                    </div>
                  </div>

                  {/* Nombre */}
                  <h3 className="font-serif-title text-2xl sm:text-3xl text-amber-950 tracking-wide mt-2 mb-1 drop-shadow-sm font-semibold">
                    {currentLetter.name}
                  </h3>

                  {/* Mensaje */}
                  <div className="font-poetic text-sm sm:text-base text-stone-700 leading-relaxed max-w-lg px-2 sm:px-4 text-center whitespace-pre-line my-1">
                    {currentLetter.message}
                  </div>
                </div>
              )
            ) : (
              /* ================================================================= */
              /* PANTALLA FINAL AL TERMINAR TODAS LAS CARTAS                       */
              /* ================================================================= */
              <div className="py-6 sm:py-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-amber-500/50 flex items-center justify-center text-amber-950 shadow-md animate-bounce">
                  <Heart className="w-8 h-8 fill-amber-900 text-amber-900" />
                </div>

                <div className="inline-flex items-center gap-1.5 text-amber-800 font-serif-title text-xl font-bold">
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  <span>{friendMessages.finalScreen.title}</span>
                </div>

                <p className="font-poetic text-base sm:text-lg text-stone-800 max-w-sm leading-relaxed px-3">
                  "{friendMessages.finalScreen.message}"
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    id="btn-restart-letters"
                    type="button"
                    onClick={handleRestart}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 active:scale-95 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer min-h-[44px]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{friendMessages.finalScreen.restartButtonText}</span>
                  </button>

                  <button
                    id="btn-back-to-genesis-letter"
                    type="button"
                    onClick={onGoBackToMainLetter}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 border border-amber-600/35 text-amber-950 font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer min-h-[44px]"
                  >
                    <span>Ver carta de Génesis</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botones de Navegación */}
        {!isCompleted && currentLetter && (
          <div className="pt-3 border-t border-amber-600/20 flex items-center justify-between gap-3 shrink-0">
            {/* Botón Regresar */}
            <button
              id="btn-prev-letter"
              type="button"
              onClick={handlePrev}
              disabled={isFading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 border border-amber-600/35 text-amber-950 text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer shadow-xs disabled:opacity-50 min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{currentLetter.prevButtonText}</span>
            </button>

            {/* Indicador numérico discreto para móviles */}
            <span className="text-[11px] text-amber-800/80 font-mono">
              {currentIndex + 1} de {letters.length}
            </span>

            {/* Botón Pasar a la siguiente / Finalizar */}
            <button
              id="btn-next-letter"
              type="button"
              onClick={handleNext}
              disabled={isFading}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 active:scale-95 text-stone-950 text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer shadow-sm disabled:opacity-50 min-h-[44px]"
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
