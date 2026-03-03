import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { DIContainer } from './core/Container';
import { BudgetCalculator } from './core/BudgetCalculator';
import { agentActions, getTotalBudget } from './store/agentStore';

function initDI() {
  const container = DIContainer.getInstance();
  container.register('budgetCalculator', new BudgetCalculator());
}

initDI();

// Тест Valtio
console.log('✅ Начальный бюджет:', getTotalBudget());

agentActions.addAgent({
  id: '3',
  name: 'Агент 3',
  tokenBudget: 700,
  isActive: true,
  createdAt: new Date().toISOString(),
});

console.log('✅ Бюджет после добавления:', getTotalBudget());

agentActions.removeAgent('2');
console.log('✅ Бюджет после удаления:', getTotalBudget());


createRoot(document.getElementById('root')!).render(
    <App />
)
