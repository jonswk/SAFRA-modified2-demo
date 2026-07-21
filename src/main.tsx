import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept and gracefully suppress cross-origin third-party script errors (e.g. from Disqus)
if (typeof window !== 'undefined') {
  const originalOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const msgStr = String(message || '');
    const srcStr = String(source || '');
    if (
      msgStr.includes('Script error') ||
      msgStr.includes('disqus') ||
      srcStr.includes('disqus') ||
      (error && String(error.stack || '').includes('disqus'))
    ) {
      console.warn('Suppressed third-party/Disqus script error:', message, source);
      return true; // Prevents firing the default error handler
    }
    if (originalOnError) {
      return originalOnError.apply(this, arguments as any);
    }
    return false;
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reasonStr = String(event.reason || '');
    if (reasonStr.includes('disqus') || reasonStr.includes('Script error')) {
      console.warn('Suppressed third-party/Disqus unhandled rejection:', event.reason);
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  });

  window.addEventListener('error', (event) => {
    const msgStr = String(event.message || '');
    const filenameStr = String(event.filename || '');
    if (
      msgStr.includes('Script error') ||
      msgStr.includes('disqus') ||
      filenameStr.includes('disqus')
    ) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);
}

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <App />
  </StrictMode>,
);
