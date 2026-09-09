import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Eraser, RotateCcw, CheckCircle2, Volume2, Sparkles } from 'lucide-react';
import type { HangeulChar } from '../data/hangeulData';
import { speechService } from '../services/speechService';
import { storageService } from '../services/storageService';

interface StrokeCanvasProps {
  charData: HangeulChar;
  onClose?: () => void;
}

export const StrokeCanvas: React.FC<StrokeCanvasProps> = ({ charData, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    initCanvas();
  }, [charData]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    setHasDrawn(false);
    setCompleted(false);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    } else if ('clientX' in e) {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sauvegarder l'état pour undo
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), snapshot]);

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#4f46e5'; // Indigo pinceau
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prevSnapshot = history[history.length - 1];
    ctx.putImageData(prevSnapshot, 0, 0);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleValidate = () => {
    setCompleted(true);
    storageService.toggleMasteredChar(charData.char);

    // Confetti de félicitations
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    speechService.speak(charData.char);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row max-w-4xl mx-auto">
      {/* Colonne gauche : Canvas de tracé */}
      <div className="p-6 flex-1 flex flex-col items-center justify-center bg-slate-50/70 border-b md:border-b-0 md:border-r border-slate-200">
        <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] bg-white rounded-2xl shadow-inner border-2 border-dashed border-indigo-200 flex items-center justify-center select-none touch-none">
          {/* Grille de calligraphie repère */}
          <div className="absolute inset-0 pointer-events-none flex">
            <div className="w-1/2 h-full border-r border-slate-100"></div>
            <div className="w-1/2 h-full"></div>
          </div>
          <div className="absolute inset-0 pointer-events-none flex flex-col">
            <div className="h-1/2 w-full border-b border-slate-100"></div>
            <div className="h-1/2 w-full"></div>
          </div>

          {/* Caractère modèle en filigrane fantôme */}
          <div className="absolute inset-0 flex items-center justify-center text-[190px] sm:text-[220px] font-bold text-slate-200/70 pointer-events-none hangul-font leading-none select-none">
            {charData.char}
          </div>

          {/* Canvas interactif */}
          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            className="w-full h-full relative z-10 cursor-crosshair rounded-2xl"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Barre d'outils du canvas */}
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={initCanvas}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Eraser size={14} />
            Effacer
          </button>
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <RotateCcw size={14} />
            Annuler
          </button>
          <button
            onClick={() => speechService.speak(charData.char)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Volume2 size={14} />
            Écouter
          </button>
        </div>
      </div>

      {/* Colonne droite : Fiche explicative & Ordre des traits */}
      <div className="p-6 md:w-80 lg:w-96 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                {charData.strokeCount} {charData.strokeCount > 1 ? 'traits' : 'trait'}
              </span>
              <h3 className="text-2xl font-bold text-slate-800 mt-2 flex items-center gap-2">
                {charData.char}
                <span className="text-sm font-normal text-slate-500">({charData.romanization})</span>
              </h3>
              <p className="text-sm text-slate-600 font-medium">{charData.name}</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="mt-5 space-y-4">
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles size={14} />
                Astuce Mnémotechnique
              </div>
              <p className="text-xs text-amber-950 mt-1 leading-relaxed">{charData.mnemonic}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                Ordre & Sens des Traits
              </h4>
              <ul className="space-y-2">
                {charData.strokeDirections.map((step, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70 flex items-start gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs text-slate-500">Exemple concret :</div>
              <div className="flex items-center justify-between mt-1 bg-slate-50 p-2.5 rounded-lg">
                <div>
                  <span className="font-bold text-slate-800 text-sm">{charData.exampleWord}</span>
                  <span className="text-xs text-slate-500 ml-2">({charData.exampleRom})</span>
                  <div className="text-xs text-slate-600">{charData.exampleTrans}</div>
                </div>
                <button
                  onClick={() => speechService.speak(charData.exampleWord)}
                  className="p-2 rounded-full bg-white shadow-2xs hover:bg-slate-100 text-indigo-600 cursor-pointer"
                >
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200">
          <button
            onClick={handleValidate}
            disabled={!hasDrawn}
            className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              completed
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : hasDrawn
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 size={18} />
            {completed ? 'Bravo ! Tracé Maîtrisé (+10 XP)' : 'Valider mon tracé'}
          </button>
        </div>
      </div>
    </div>
  );
};
