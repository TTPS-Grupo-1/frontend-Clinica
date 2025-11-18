import { useEffect, useRef } from 'react';
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
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fontSize = 12;
    const fontFamily = 'Arial, sans-serif';
    if (ctx) ctx.font = `${fontSize}px ${fontFamily}`;
    const horizontalPadding = 24; // left+right
    const verticalPadding = 12; // top+bottom
    const maxWidth = 300; // max node width before wrapping
    const lineHeight = Math.round(fontSize * 1.25);

    for (const [, node] of nodesMap) {
      const label: string = node.data.label || '';
      const measured = ctx ? ctx.measureText(label).width : label.length * (fontSize * 0.6);
      // compute desired content width and clamp to max
      const contentWidth = Math.min(measured, maxWidth - horizontalPadding);
      const widthPx = Math.max(60, Math.round(contentWidth + horizontalPadding));
      // estimate number of lines when wrapping
      const estLines = Math.max(1, Math.ceil(measured / Math.max(1, contentWidth)));
      const heightPx = Math.max(28, estLines * lineHeight + verticalPadding);
      node.data._computedWidth = widthPx;
      node.data._computedHeight = heightPx;
    }

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
            padding: '12px',
            'min-width': '60px',
            'min-height': '28px',
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
            'text-margin-y': -12,
            // keep edge label readable by giving it a light background
            'text-background-color': '#ffffff',
            'text-background-opacity': 0.8,
            'text-background-shape': 'roundrectangle',
            'text-background-padding': '2px',
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
      // dagre layout options are typed loosely here; cast to any to avoid TS errors
      // Increased node/rank/edge separation so edge labels (dates) don't overlap nodes
      layout: ({ name: 'dagre', rankDir: 'LR', nodeSep: 140, rankSep: 160, edgeSep: 40 } as any),
    });

    // Apply computed pixel sizes (if measured) to each node so the box fits the label
    try {
      for (const [, node] of nodesMap) {
        const id = node.data.id;
        const el = cyRef.current.$(`#${CSS.escape(id)}`);
        const w = node.data._computedWidth;
        const h = node.data._computedHeight;
        if (w) el.style('width', `${w}px`);
        if (h) el.style('height', `${h}px`);
      }
    }
    catch (e) {
      // ignore
    }

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
