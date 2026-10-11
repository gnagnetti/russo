/**
 * Client-side Russian Speech Synthesis helper using native Web Speech API.
 * Requires NO API keys, works completely in modern browsers.
 */

// Helper to remove combining acute accent (\u0301) for cleaner TTS processing
export function stripStress(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC");
}

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }

    const handler = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.removeEventListener("voiceschanged", handler);
      resolve(cachedVoices);
    };

    window.speechSynthesis.addEventListener("voiceschanged", handler);
    // Timeout fallback if voiceschanged never fires
    setTimeout(() => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    }, 500);
  });
}

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export async function speakRussian(text: string, rate: number = 0.9): Promise<boolean> {
  if (!isSpeechSupported()) return false;

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const voices = cachedVoices.length ? cachedVoices : await loadVoices();
    const clean = stripStress(text);
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = "ru-RU";
    utterance.rate = rate; // 0.85 - 1.0 for natural Russian pacing

    // Look for a Russian voice
    const ruVoice = voices.find((v) => v.lang.startsWith("ru") || v.name.toLowerCase().includes("russian"));
    if (ruVoice) {
      utterance.voice = ruVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn("Speech synthesis error:", err);
    return false;
  }
}
