import { useSnapshot } from 'valtio';
import { agentStore, agentActions, getTotalBudget } from '../../store/agentStore';
import styles from './AgentList.module.css';

export const AgentList: React.FC = () => {
  const snapshot = useSnapshot(agentStore);

  const handleDelete = (id: string) => {
    agentActions.removeAgent(id);
  };

  return (
    <div className={styles.container}>
      <h2>Список агентов</h2>
      
      <div className={styles.budget}>
        <strong>Общий бюджет: {getTotalBudget()} токенов</strong>
      </div>
      
      {snapshot.agents.length === 0 ? (
        <p className={styles.empty}>Агентов пока нет</p>
      ) : (
        <ul className={styles.list}>
          {snapshot.agents.map((agent) => (
            <li key={agent.id} className={styles.item}>
              <span className={styles.name}>{agent.name}</span>
              <span className={styles.budgetValue}>
                {agent.tokenBudget} токенов
              </span>
              <span className={agent.isActive ? styles.status : styles.statusInactive}>
                {agent.isActive ? 'Активен' : 'Неактивен'}
              </span>
              <button
                onClick={() => handleDelete(agent.id)}
                className={styles.deleteButton}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};