import { proxy } from 'valtio';
import { type Agent } from '../types';
import { DIContainer } from '../core/Container';
import { BudgetCalculator } from '../core/BudgetCalculator';

const initialAgents: Agent[] = [
  {
    id: '1',
    name: 'Агент 1',
    tokenBudget: 1000,
    isActive: true,
    createdAt: new Date().toISOString(),
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    name: 'Агент 2',
    tokenBudget: 500,
    isActive: true,
    createdAt: new Date().toISOString(),
    position: { x: 400, y: 100 },
  },
];

interface AgentState {
  agents: Agent[];
  isLoading: boolean;
  error: string | null;
}

export const agentStore = proxy<AgentState>({
  agents: initialAgents,
  isLoading: false,
  error: null,
});

export const getTotalBudget = (): number => {
  const calculator = DIContainer.getInstance().resolve<BudgetCalculator>('budgetCalculator');
  return calculator.calculateTotal(agentStore.agents);
};

export const agentActions = {
  addAgent: (agent: Agent) => {
    agentStore.agents.push(agent);
  },

  removeAgent: (id: string) => {
    agentStore.agents = agentStore.agents.filter((a) => a.id !== id);
  },

  updateAgent: (id: string, updates: Partial<Agent>) => {
    const index = agentStore.agents.findIndex((a) => a.id === id);
    if (index !== -1) {
      agentStore.agents[index] = { ...agentStore.agents[index], ...updates };
    }
  },

  updateAgentPosition: (id: string, position: { x: number; y: number }) => {
    const index = agentStore.agents.findIndex((a) => a.id === id);
    if (index !== -1) {
      agentStore.agents[index].position = position;
    }
  },

  setLoading: (loading: boolean) => {
    agentStore.isLoading = loading;
  },

  setError: (error: string | null) => {
    agentStore.error = error;
  },
};