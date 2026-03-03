import { FlowEditor } from '../components/FlowEditor/FlowEditor';
import styles from './FlowPage.module.css';

export const FlowPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <FlowEditor />
    </div>
  );
};