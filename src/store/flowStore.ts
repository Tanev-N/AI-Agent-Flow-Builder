import { proxy } from 'valtio';
import { type Edge } from '@xyflow/react';

interface FlowState {
  edges: Edge[];
  selectedNode: string | null;
}

export const flowStore = proxy<FlowState>({
  edges: [],
  selectedNode: null,
});

export const flowActions = {
  setEdges: (edges: Edge[]) => {
    flowStore.edges = edges;
  },

  addEdge: (edge: Edge) => {
    flowStore.edges.push(edge);
  },

  removeEdge: (id: string) => {
    flowStore.edges = flowStore.edges.filter((e) => e.id !== id);
  },

  removeEdgesByNode: (nodeId: string) => {
    flowStore.edges = flowStore.edges.filter(
      (e) => e.source !== nodeId && e.target !== nodeId
    );
  },

  setSelectedNode: (id: string | null) => {
    flowStore.selectedNode = id;
  },
};