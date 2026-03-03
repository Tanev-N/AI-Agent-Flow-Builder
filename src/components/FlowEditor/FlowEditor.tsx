import { useCallback } from 'react';
import {
  ReactFlow,
  useEdgesState,
  type Connection,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSnapshot } from 'valtio';
import { flowStore, flowActions } from '../../store/flowStore';
import { agentStore, agentActions } from '../../store/agentStore';
import { CustomAgentNode } from './CustomAgentNode';
import styles from './FlowEditor.module.css';

const nodeTypes = {
  custom: CustomAgentNode,
};

export const FlowEditor: React.FC = () => {
  const flowSnapshot = useSnapshot(flowStore);
  const agentSnapshot = useSnapshot(agentStore);

  const nodes: Node[] = agentSnapshot.agents.map((agent) => ({
    id: agent.id,
    type: 'custom',
    position: { x: Math.random() * 400, y: Math.random() * 400 },
    data: {
      label: agent.name,
      budget: agent.tokenBudget,
      isActive: agent.isActive,
    },
  }));

  const [edges, setEdges, onEdgesChange] = useEdgesState(flowSnapshot.edges);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        ...params,
        id: `${params.source}-${params.target}`,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#007bff', strokeWidth: 2 },
      };
      flowActions.addEdge(newEdge);
    },
    []
  );

  const onNodesDelete = useCallback(
    (nodesToDelete: Node[]) => {
      nodesToDelete.forEach((node) => {
        agentActions.removeAgent(node.id);
        flowActions.removeEdgesByNode(node.id);
      });
    },
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Редактор потока агентов</h2>
        <div className={styles.info}>
          Узлов: {nodes.length} | Связей: {edges.length}
        </div>
      </div>

      <div className={styles.flowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
        >
          <Background color="#aaa" gap={15} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              return node.data?.isActive ? '#4ade80' : '#f87171';
            }}
          />
        </ReactFlow>
      </div>

      <div className={styles.footer}>
        <p>💡 Перетаскивайте узлы, соединяйте их, удаляйте через Delete</p>
      </div>
    </div>
  );
};