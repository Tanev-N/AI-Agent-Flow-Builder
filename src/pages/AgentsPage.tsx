import { AgentForm } from '../components/AgentForm/AgentForm';
import { AgentList } from '../components/AgentList/AgentList';
import styles from './AgentsPage.module.css';

export const AgentsPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1>AI Агенты</h1>
      <AgentForm />
      <AgentList />
    </div>
  );
};