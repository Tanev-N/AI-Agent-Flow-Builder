import styles from './FlowPage.module.css';

export const FlowPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1>Редактор графа</h1>
      <p className={styles.placeholder}>Здесь будет React Flow</p>
    </div>
  );
};