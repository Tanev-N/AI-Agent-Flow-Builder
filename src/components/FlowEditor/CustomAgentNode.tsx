import { Handle, Position, type NodeProps } from '@xyflow/react';
import styles from './CustomAgentNode.module.css';
import { type AgentNodeData } from "../../types/flow.types"
export const CustomAgentNode: React.FC<NodeProps<AgentNodeData>> = ({ 
  id, 
  data,
}) => {
  return (
    <div className={styles.node}>
      <Handle type="target" position={Position.Top} className={styles.handle} />
      
      <div className={styles.header}>
        <span className={styles.icon}>🤖</span>
        <span className={styles.label}>{data.label}</span>
      </div>
      
      <div className={styles.body}>
        <div className={styles.budget}>
          💰 {data.budget} токенов
        </div>
        <div className={data.isActive ? styles.statusActive : styles.statusInactive}>
          {data.isActive ? 'Активен' : 'Неактивен'}
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className={styles.handle} />
    </div>
  );
};