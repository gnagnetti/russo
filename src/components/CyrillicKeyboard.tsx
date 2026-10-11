import { useState } from "react";
import { Delete, CornerDownLeft, Sparkles, Keyboard as KeyboardIcon } from "lucide-react";

interface CyrillicKeyboardProps {
  onInsert: (char: string) => void;
  onBackspace: () => void;
  onClear?: () => void;
  onEnter?: () => void;
  disabled?: boolean;
}

// Standard JCUKEN (ЙЦУКЕН) Russian layout rows
const STANDARD_ROWS = [
  ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
  ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
  ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "ё"],
];

// Phonetic (ЯВЕРТЫ) transliterated layout (closer to Western QWERTY keyboard)
const PHONETIC_ROWS = [
  ["я", "в", "е", "р", "т", "ы", "у", "и", "о", "п", "ш", "щ"],
  ["а", "с", "д", "ф", "г", "ч", "й", "к", "л", "ь", "ъ"],
  ["з", "х", "ц", "ж", "б", "н", "м", "э", "ю", "ё"],
];

export function CyrillicKeyboard({
  onInsert,
  onBackspace,
  onClear,
  onEnter,
  disabled = false,
}: CyrillicKeyboardProps) {
  const [layout, setLayout] = useState<"standard" | "phonetic">("phonetic");
  const [caps, setCaps] = useState(false);

  const rows = layout === "standard" ? STANDARD_ROWS : PHONETIC_ROWS;

  const handleKeyClick = (char: string) => {
    if (disabled) return;
    onInsert(caps ? char.toUpperCase() : char);
  };

  return (
    <div className="rounded-xl border bg-card p-3 shadow-xs space-y-2 select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <KeyboardIcon size={15} className="text-primary" />
          <span className="font-semibold text-foreground">Tastiera Cirillica Interattiva</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLayout(layout === "standard" ? "phonetic" : "standard")}
            className="rounded px-2 py-0.5 border text-xs hover:bg-muted font-medium transition-colors"
            title="Alterna tra layout Standard (ЙЦУКЕН) e Fonetico occidentale (ЯВЕРТЫ)"
          >
            Layout: <span className="text-primary font-semibold">{layout === "phonetic" ? "Fonetico (ЯВЕРТЫ)" : "Standard (ЙЦУКЕН)"}</span>
          </button>

          <button
            type="button"
            onClick={() => setCaps(!caps)}
            className={`rounded px-2 py-0.5 border text-xs font-medium transition-colors ${
              caps ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            MAIUSC
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5">
            {row.map((ch) => {
              const displayChar = caps ? ch.toUpperCase() : ch;
              return (
                <button
                  key={ch}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleKeyClick(ch)}
                  className="h-9 min-w-7 sm:min-w-9 px-1 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground active:scale-95 text-sm sm:text-base font-medium transition-all shadow-xs flex items-center justify-center disabled:opacity-50"
                >
                  {displayChar}
                </button>
              );
            })}
          </div>
        ))}

        {/* Function row */}
        <div className="flex justify-center items-center gap-1.5 pt-1">
          {/* Stress mark combining acute */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => onInsert("\u0301")}
            className="h-9 px-2 sm:px-3 rounded-md border bg-amber-500/10 text-amber-800 dark:text-amber-200 border-amber-500/30 hover:bg-amber-500/20 text-xs font-semibold flex items-center gap-1 shadow-xs"
            title="Inserisci accento tonico russo (́) sulla vocale precedente"
          >
            <Sparkles size={13} />
            <span>Accento ( ́ )</span>
          </button>

          {/* Space */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => onInsert(" ")}
            className="h-9 flex-1 max-w-xs rounded-md border bg-background hover:bg-muted text-xs font-medium text-muted-foreground shadow-xs"
          >
            Spazio
          </button>

          {/* Backspace */}
          <button
            type="button"
            disabled={disabled}
            onClick={onBackspace}
            className="h-9 px-3 rounded-md border bg-background hover:bg-destructive/10 hover:text-destructive text-muted-foreground shadow-xs flex items-center justify-center"
            title="Cancella carattere"
          >
            <Delete size={17} />
          </button>

          {onClear && (
            <button
              type="button"
              disabled={disabled}
              onClick={onClear}
              className="h-9 px-2.5 rounded-md border text-xs text-muted-foreground hover:bg-muted"
              title="Pulisci tutto"
            >
              Canc
            </button>
          )}

          {onEnter && (
            <button
              type="button"
              disabled={disabled}
              onClick={onEnter}
              className="h-9 px-3 rounded-md border bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium shadow-xs flex items-center gap-1"
            >
              <span>Invio</span>
              <CornerDownLeft size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
