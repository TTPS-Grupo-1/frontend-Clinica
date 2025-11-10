import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);

type HistorialItem = {
  id: number;
  estado: string;
  fecha: string;
  nota?: string;
  usuario_rep?: string;
};

type Props = {
  historial: HistorialItem[];
  onNodeClick?: (estado: string) => void;
};

export default function OvocitoStateDiagram({ historial = [], onNodeClick }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (cyRef.current) {
      cyRef.current.destroy();
      cyRef.current = null;
    }

    const ordered = [...historial].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    const nodesMap = new Map<string, any>();
    const elements: any[] = [];
    let prevEstado: string | null = null;

    ordered.forEach((ev, idx) => {
      if (!nodesMap.has(ev.estado)) {
        const id = ev.estado;
        nodesMap.set(ev.estado, { data: { id, label: ev.estado, lastSeen: ev.fecha, nota: ev.nota, usuario: ev.usuario_rep } });
      } else {
        const n = nodesMap.get(ev.estado);
        n.data.lastSeen = ev.fecha;
      }

      if (prevEstado) {
        elements.push({ data: { id: `e-${prevEstado}-${ev.estado}-${idx}`, source: prevEstado, target: ev.estado, label: new Date(ev.fecha).toLocaleDateString() } });
      }
      prevEstado = ev.estado;
    });

    for (const [, node] of nodesMap) elements.push({ data: node.data });

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'background-color': '#60a5fa',
            color: '#fff',
            width: 'label',
            height: 'label',
            padding: '12px',
            shape: 'roundrectangle',
            'font-size': 12,
            'text-wrap': 'wrap',
          },
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'line-color': '#9ca3af',
            'target-arrow-color': '#9ca3af',
            label: 'data(label)',
            'font-size': 10,
            'text-rotation': 'autorotate',
            'text-margin-y': -6,
          },
        },
        {
          selector: '.current',
          style: {
            'background-color': '#10b981',
            'line-color': '#10b981',
            'target-arrow-color': '#10b981',
          },
        },
      ],
      layout: { name: 'dagre', rankDir: 'LR', nodeSep: 60, rankSep: 80, edgeSep: 10 },
    });

    const currentEstado = ordered.length ? ordered[ordered.length - 1].estado : null;
    if (currentEstado) {
      const node = cyRef.current.$(`#${CSS.escape(currentEstado)}`);
      if (node) node.addClass('current');
    }

    cyRef.current.on('tap', 'node', (evt: any) => {
      const n = evt.target;
      const estado = n.data('id');
      onNodeClick?.(estado);
    });

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
    };
  }, [historial, onNodeClick]);

  return <div ref={containerRef} style={{ width: '100%', height: 320 }} />;
}
