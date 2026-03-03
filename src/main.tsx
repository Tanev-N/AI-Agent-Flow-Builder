import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { DIContainer } from './core/Container';
import { BudgetCalculator } from './core/BudgetCalculator';

import "./index.css"

function initDI() {
  const container = DIContainer.getInstance();
  container.register('budgetCalculator', new BudgetCalculator());
}

initDI();

createRoot(document.getElementById('root')!).render(
    <App />
)
