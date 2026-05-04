'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'nm-theme';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme | null) {
  if (typeof document === 'undefined') return;
  if (!theme) {
    delete document.documentElement.dataset.theme;
    return;
  }
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle(props: { className?: string } = {}) {
  const [mounted, setMounted] = useState(false);
  const [effectiveTheme, setEffectiveTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = getStoredTheme();
    const initial = stored ?? getSystemTheme();

    applyTheme(stored);
    setEffectiveTheme(initial);
    setMounted(true);

    if (stored) return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setEffectiveTheme(media.matches ? 'dark' : 'light');

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  function setTheme(next: Theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    applyTheme(next);
    setEffectiveTheme(next);
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border border-line bg-surface/80 p-1 shadow-sm shadow-black/5 ${
        props.className ?? ''
      }`}
      aria-label="Theme"
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={mounted ? effectiveTheme === 'light' : undefined}
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition ${
          mounted && effectiveTheme === 'light'
            ? 'bg-[#f4c430] text-black'
            : 'text-muted hover:bg-surface-2 hover:text-foreground'
        }`}
        title="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={mounted ? effectiveTheme === 'dark' : undefined}
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition ${
          mounted && effectiveTheme === 'dark'
            ? 'bg-[#0b0b0b] text-white'
            : 'text-muted hover:bg-surface-2 hover:text-foreground'
        }`}
        title="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
