import React from 'react';
import { MotionConfig } from 'motion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import { QuoteModalProvider } from './context/QuoteModalContext';
import Home from './pages/Home';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

export default function App() {
  return (
    /* reducedMotion="user" makes motion honour the OS setting; CSS alone
       cannot stop JS-driven animations. */
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <MotionConfig reducedMotion="user">
        <QuoteModalProvider>
          <div className="min-h-screen bg-white text-slate-800 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              </Routes>
            </main>
            <Footer />
            <QuoteModal />
          </div>
        </QuoteModalProvider>
      </MotionConfig>
    </BrowserRouter>
  );
}
