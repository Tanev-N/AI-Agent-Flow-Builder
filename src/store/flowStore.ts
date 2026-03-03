import { proxy } from 'valtio';
import {type Node, type Edge } from '@xyflow/react';
import { type Agent } from '../types';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: string | null;
}

export const flowStore = proxy<FlowState>({
  nodes: [],
  edges: [],
  selectedNode: null,
});

export const flowActions = {
  setNodes: (nodes: Node[]) => {
    flowStore.nodes = nodes;
  },

  addNode: (node: Node) => {
    flowStore.nodes.push(node);
  },

  removeNode: (id: string) => {
    flowStore.nodes = flowStore.nodes.filter((n) => n.id !== id);
    flowStore.edges = flowStore.edges.filter(
      (e) => e.source !== id && e.target !== id
    );
  },

  setEdges: (edges: Edge[]) => {
    flowStore.edges = edges;
  },

  addEdge: (edge: Edge) => {
    flowStore.edges.push(edge);
  },

  removeEdge: (id: string) => {
    flowStore.edges = flowStore.edges.filter((e) => e.id !== id);
  },

  setSelectedNode: (id: string | null) => {
    flowStore.selectedNode = id;
  },

  syncNodesFromAgents: (agents: Agent[]) => {
    flowStore.nodes = agents.map((agent) => ({
      id: agent.id,
      type: 'custom',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: agent.name,
        budget: agent.tokenBudget,
        isActive: agent.isActive,
      },
    }));
  },
};