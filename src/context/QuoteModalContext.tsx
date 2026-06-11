import React, { createContext, useContext, useState, useCallback } from 'react';

export type QuoteService = 'window' | 'retail' | 'periodical' | null;

interface QuoteModalContextType {
  isOpen: boolean;
  preselected: QuoteService;
  openQuote: (preselected?: QuoteService) => void;
  closeQuote: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselected, setPreselected] = useState<QuoteService>(null);

  const openQuote = useCallback((service: QuoteService = null) => {
    setPreselected(service);
    setIsOpen(true);
  }, []);

  const closeQuote = useCallback(() => {
    setIsOpen(false);
    setPreselected(null);
  }, []);

  return (
    <QuoteModalContext.Provider value={{ isOpen, preselected, openQuote, closeQuote }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error('useQuoteModal must be used within QuoteModalProvider');
  return ctx;
}
