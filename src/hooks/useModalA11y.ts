import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

interface Options {
  isOpen: boolean;
  /** Called for Escape and for backdrop clicks that pass the guard. */
  onClose: () => void;
  /**
   * Return false to block a dismiss attempt (e.g. a form with unsaved input).
   * Only consulted for Escape here; backdrop handlers should call it too.
   */
  canClose?: () => boolean;
}

/**
 * Shared dialog behaviour: Escape to close, background scroll lock, focus trap,
 * and focus restored to whatever was focused before the dialog opened.
 * Returns a ref to put on the dialog panel.
 */
export function useModalA11y({ isOpen, onClose, canClose }: Options) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  // Remember the trigger so focus can go back to it on close.
  useEffect(() => {
    if (isOpen) restoreTo.current = document.activeElement as HTMLElement | null;
  }, [isOpen]);

  // Lock background scroll without the layout shifting as the scrollbar goes.
  useEffect(() => {
    if (!isOpen) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [isOpen]);

  // Escape to close, Tab kept inside the panel.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (canClose && !canClose()) return;
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const nodes: HTMLElement[] = Array.from(panel.querySelectorAll(FOCUSABLE)) as HTMLElement[];
      const items = nodes.filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, canClose]);

  // Move focus into the panel on open, and back to the trigger on close.
  useEffect(() => {
    if (!isOpen) {
      restoreTo.current?.focus?.();
      return;
    }
    let cancelled = false;
    // The ref must be read when this runs, not when the effect runs: motion
    // attaches it afterwards, so reading it early yields null. A timeout
    // rather than requestAnimationFrame, because rAF never fires while the
    // document is hidden and focus would silently never move.
    const id = window.setTimeout(() => {
      if (cancelled) return;
      const panel = panelRef.current;
      if (!panel) return;
      const target = (panel.querySelector(FOCUSABLE) as HTMLElement | null) ?? panel;
      target.focus();
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [isOpen]);

  return panelRef;
}
