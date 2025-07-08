import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GA4Provider } from "@/components/GA4Provider"

createRoot(document.getElementById("root")!).render(
  <GA4Provider>
    <App />
  </GA4Provider>
);
