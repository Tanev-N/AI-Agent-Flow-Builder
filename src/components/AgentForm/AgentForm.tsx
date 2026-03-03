import { useState } from 'react';
import { CreateAgentSchema, type CreateAgent } from '../../types';
import { agentActions } from '../../store/agentStore';
import styles from './AgentForm.module.css';

export const AgentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [tokenBudget, setTokenBudget] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = CreateAgentSchema.safeParse({
      name,
      tokenBudget: Number(tokenBudget),
      isActive: true,
    });

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    const newAgent: CreateAgent = result.data;
    agentActions.addAgent({
      ...newAgent,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    });

    setName('');
    setTokenBudget('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Создать агента</h2>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.field}>
        <label>Имя:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
      </div>
      
      <div className={styles.field}>
        <label>Бюджет токенов:</label>
        <input
          type="number"
          value={tokenBudget}
          onChange={(e) => setTokenBudget(e.target.value)}
          className={styles.input}
        />
      </div>
      
      <button type="submit" className={styles.button}>
        Создать
      </button>
    </form>
  );
};