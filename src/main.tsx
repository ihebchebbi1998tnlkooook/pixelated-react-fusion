
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { cartExpirationManager } from './utils/cartExpiration';

// Check for cart expiration when the application loads
cartExpirationManager.checkExpiration();

createRoot(document.getElementById("root")!).render(<App />);
