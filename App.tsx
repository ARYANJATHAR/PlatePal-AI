import React, { useState, useRef } from 'react';
import { Hero } from './components/Hero';
import { MenuUploader } from './components/MenuUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { processMenuImage } from './services/geminiService';
import type { MenuItem } from './types';

type AppState = 'HOME' | 'PROCESSING' | 'RESULTS' | 'ERROR';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('HOME');
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const uploaderRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    uploaderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    setMenuData([]);
    setErrorMessage('');
    setAppState('HOME');
     window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleMenuProcess = async (file: File) => {
    setAppState('PROCESSING');
    setErrorMessage('');
    try {
      const base64Image = await fileToBase64(file);
      const result = await processMenuImage(base64Image, file.type);
      setMenuData(result);
      setAppState('RESULTS');
    } catch (error) {
      console.error('Error processing menu:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred. Please try again.');
      setAppState('ERROR');
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // remove data:image/jpeg;base64, prefix
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="min-h-screen bg-stone-900 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Hero onStartClick={handleStart} />
        
        <div ref={uploaderRef} className="my-16 md:my-24">
          {appState === 'HOME' && <MenuUploader onProcess={handleMenuProcess} />}
          {appState === 'PROCESSING' && (
            <div className="text-center">
              <Loader />
              <p className="mt-4 text-xl text-stone-300 animate-pulse">Analyzing your menu... This might take a moment.</p>
            </div>
          )}
          {appState === 'RESULTS' && <ResultsDisplay menuItems={menuData} onReset={handleReset} />}
          {appState === 'ERROR' && (
             <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
              <h2 className="text-2xl font-bold text-red-400 mb-4">Oops! Something went wrong.</h2>
              <p className="text-stone-300 mb-6">{errorMessage}</p>
              <button
                onClick={handleReset}
                className="bg-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6 border-t border-stone-700">
        <p className="text-stone-500">Powered by Gemini AI | PlatePal AI</p>
      </footer>
    </div>
  );
};

export default App;