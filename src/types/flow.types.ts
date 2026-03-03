import type { Node, Edge } from '@xyflow/react';

export interface AgentNodeData {
  label: string;
  budget: number;
  isActive: boolean;
  [key: string]: unknown; 
}

export type AgentNode = Node<AgentNodeData, 'custom'>;
export type AgentEdge = Edge;