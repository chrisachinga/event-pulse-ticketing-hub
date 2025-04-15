
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add Google Fonts for Roboto
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

createRoot(document.getElementById("root")!).render(<App />);
