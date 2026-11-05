/**
 * Centralized on-demand script loader and initialization manager for official Zeffy embeds.
 *
 * Guarantees:
 * 1. Single script tag injection (`id="zeffy-embed-v2"`) loaded on-demand only when an embed becomes visible.
 * 2. Shared singleton promise to handle concurrent requests safely without duplicate network requests.
 * 3. Idempotent initialization: `initZeffyEmbeds()` scans DOM only when uninitialized elements exist.
 * 4. Error handling and retry resilience for ad-blockers / network failures.
 */

const ZEFFY_EMBED_SCRIPT_URL = 'https://www.zeffy.com/embed/v2/zeffy-embed.js';
const ZEFFY_SCRIPT_ID = 'zeffy-embed-v2';

export interface ZeffyGlobal {
  embed?: {
    version?: string;
    init: () => void;
  };
}

let scriptLoadPromise: Promise<void> | null = null;

/**
 * Loads the official Zeffy embed v2 script on demand.
 * Returns a promise that resolves once window.Zeffy.embed.init is available.
 */
export function loadZeffyScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  // If already loaded and available on window
  const existingZeffy = (window as unknown as { Zeffy?: ZeffyGlobal }).Zeffy;
  if (existingZeffy?.embed?.init) {
    return Promise.resolve();
  }

  // Return existing in-flight loader promise
  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  const promise = new Promise<void>((resolve, reject) => {
    // Check if script tag was already appended in DOM
    const existingScript = document.getElementById(ZEFFY_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      if ((window as unknown as { Zeffy?: ZeffyGlobal }).Zeffy?.embed?.init) {
        resolve();
        return;
      }
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener(
        'error',
        (err) => {
          scriptLoadPromise = null;
          existingScript.remove(); // Remove failed script element to allow clean retry
          reject(err);
        },
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.id = ZEFFY_SCRIPT_ID;
    script.src = ZEFFY_EMBED_SCRIPT_URL;
    script.async = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = (err) => {
      scriptLoadPromise = null; // allow retry if failed
      script.remove(); // Remove failed script element to allow clean retry
      reject(err);
    };

    document.head.appendChild(script);
  });

  // Guarantee that singleton cache is unconditionally cleared upon any rejection
  promise.catch(() => {
    scriptLoadPromise = null;
  });

  scriptLoadPromise = promise;
  return scriptLoadPromise;
}

/**
 * Safely calls Zeffy.embed.init() ONLY IF there are uninitialized [data-zeffy-embed] elements in the DOM.
 * Prevents redundant initialization sweeps when all embeds are already active.
 */
export function initZeffyEmbeds(): void {
  if (typeof window === 'undefined') return;

  const hasUninitialized = document.querySelector(
    '[data-zeffy-embed]:not([data-zeffy-initialized])',
  );

  if (!hasUninitialized) {
    return;
  }

  const zeffy = (window as unknown as { Zeffy?: ZeffyGlobal }).Zeffy;
  if (zeffy?.embed?.init) {
    try {
      zeffy.embed.init();
    } catch (err) {
      console.warn('[ZeffyLoader] Error in Zeffy.embed.init():', err);
    }
  }
}
