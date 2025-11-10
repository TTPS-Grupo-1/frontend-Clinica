# Explicación de `OvocitoStateDiagram.tsx`

Este documento explica en español, y de forma clara, qué hace el componente `OvocitoStateDiagram.tsx` (React + TypeScript) encontrado en `frontend/src/features/Punciones/components/`.

## Resumen rápido

`OvocitoStateDiagram` recibe una lista de eventos (historial) de un ovocito, construye un grafo dirigido con nodos que representan estados (ej. "recuperado", "clasificado", "fertilizado") y aristas que representan la transición entre estados en orden temporal. Renderiza el grafo usando Cytoscape + el layout `dagre` y marca visualmente el estado actual (último evento). También expone un callback `onNodeClick` que se dispara al hacer click en un nodo.

## Contrato (inputs / outputs / efectos)

- Props:
  - `historial: HistorialItem[]` — arreglo de objetos con forma:
    - `id: number`
    - `estado: string` (identificador del estado)
    - `fecha: string` (ISO o cualquier fecha parseable por `new Date()`)
    - `nota?: string`
    - `usuario_rep?: string`
  - `onNodeClick?: (estado: string) => void` — función opcional que será llamada con el id/`estado` del nodo clickeado.

- Output visual: un `div` con el grafo renderizado por Cytoscape.
- Efectos secundarios:
  - Crea / destruye la instancia de Cytoscape cada vez que cambia `historial` o `onNodeClick`.
  - Llama `onNodeClick` cuando el usuario toca (tap) un nodo.

## Flujo general del componente

1. Se define un `ref` al contenedor (`containerRef`) donde Cytoscape inyectará el canvas/SVG.
2. Se mantiene la instancia de Cytoscape en `cyRef` para poder destruirla más tarde.
3. En `useEffect` (dependencias: `[historial, onNodeClick]`) se:
   - Ordena `historial` por `fecha` (ascendente) para garantizar el orden temporal.
   - Recorre los eventos ordenados y construye:
     - Un `Map` (`nodesMap`) para almacenar nodos únicos por `estado`. Si un mismo `estado` aparece varias veces, se actualiza la propiedad `lastSeen` al timestamp más reciente.
     - Una lista `elements` con las aristas entre el `prevEstado` y el `ev.estado` actual. Las aristas almacenan una etiqueta con la fecha formateada.
     - Para evitar IDs repetidos en las aristas se incluye `idx` en el id del edge (`e-${prevEstado}-${ev.estado}-${idx}`).
   - Añade finalmente los nodos (`elements.push({ data: node.data })`) y configura Cytoscape con estos `elements`.
   - Define estilos (selector `node`, `edge`, `.current`) para controlar apariencia: colores, forma, tamaño y etiquetas.
   - Configura el layout `dagre` con orientación `LR` (Left → Right), separación entre nodos y bordes.
   - Marca el nodo correspondiente al último evento (último elemento ordenado) añadiendo la clase `current`.
   - Registra un handler `tap` sobre nodos para llamar a `onNodeClick` con `id` del nodo.
4. En la limpieza del efecto (`return () => { ... }`) se destruye la instancia de Cytoscape para evitar fugas de memoria.
5. El componente devuelve un `div` con `ref={containerRef}` y tamaño por defecto `width: 100%` x `height: 320`.

## Detalle línea a línea (puntos críticos)

- `cytoscape.use(dagre);` — registra la extensión `cytoscape-dagre` para poder usar el layout `dagre`.

- Tipos `HistorialItem` y `Props` — definen la estructura mínima que el componente espera.

- `containerRef` y `cyRef` — refs para el contenedor DOM y la instancia de Cytoscape respectivamente.

- `if (cyRef.current) { cyRef.current.destroy(); cyRef.current = null; }` — cuando `historial` cambia, se destruye la instancia previa para recrearla desde cero. Esto evita inconsistencias del grafo y fugas de memoria.

- Ordenamiento:
  ```ts
  const ordered = [...historial].sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  ```
  Se copia el arreglo y se ordena por fecha ascendente.

- Construcción de nodos (`nodesMap`) y aristas (`elements`):
  - Para cada evento `ev`:
    - Si `nodesMap` no contiene el `ev.estado`, crea un nodo con `data: { id, label: ev.estado, lastSeen: ev.fecha, nota, usuario }`.
    - Si ya existe, actualiza `lastSeen` para mantener la última fecha registrada para ese estado.
    - Si existe un `prevEstado`, se añade una arista entre `prevEstado` y el `ev.estado` actual con `label` que contiene la fecha (para mostrar en el edge).
  - Finalmente se empujan todos los nodos a `elements`.

- `cytoscape({ container, elements, style, layout })` — inicializa la librería con los elementos y estilos:
  - Selector `node`: usa `label: 'data(label)'` para mostrar el nombre del estado, `background-color`, `padding`, `shape: 'roundrectangle'`, `width/height: 'label'` para que el tamaño del nodo se adapte al contenido.
  - Selector `edge`: muestra una flecha `triangle`, color tenue, y `label: 'data(label)'` para que la fecha aparezca en la arista; `text-rotation: 'autorotate'` hace la etiqueta seguir la arista.
  - Selector `.current`: estilo especial para el nodo actual (verde), y también colorea líneas conectadas (esto resalta visualmente el estado "activo").

- Marcar el nodo actual:
  ```ts
  const currentEstado = ordered.length ? ordered[ordered.length - 1].estado : null;
  if (currentEstado) {
    const node = cyRef.current.$(`#${CSS.escape(currentEstado)}`);
    if (node) node.addClass('current');
  }
  ```
  - Se usa `CSS.escape` para escapar cualquier caracter del `estado` que pueda invalidar la selección por id en DOM/CSS.

- Evento `tap` sobre nodos:
  - `cyRef.current.on('tap', 'node', (evt: any) => { ... })` — escucha el click/tap en nodos y extrae `n.data('id')` (el `estado`) para pasarlo al callback `onNodeClick`.

- Cleanup del efecto:
  - `cyRef.current.destroy()` — destruye la instancia de Cytoscape y libera recursos.

## Edge cases y notas prácticas

- Si `historial` está vacío, el componente devuelve simplemente el `div` vacío (Cytoscape no se inicializa con elementos). El código maneja esto sin romperse.

- Estados repetidos:
  - Si la secuencia revierte a un estado anterior (ej. `clasificado` → `fertilizado` → `clasificado`), el `nodesMap` mantiene un único nodo por estado y actualiza `lastSeen`; las aristas mostrarán transiciones múltiples (cada transición genera un edge con id distinto porque incluye `idx`). Esto permite visualizar bucles o regresiones.

- IDs válidos para nodos:
  - El `id` que se usa para cada nodo es exactamente el string `estado`. Si tus estados tienen espacios o caracteres especiales, `CSS.escape` ya se usa al seleccionar el nodo, pero conviene garantizar que los IDs sean razonables (por ejemplo: `"Fertilizado-ICSI"` está bien, pero ten en cuenta el escape).

- Performance:
  - El componente destruye y vuelve a crear Cytoscape al cambiar `historial`. Para historiales muy grandes o actualizaciones frecuentes, podrías optimizar actualizando `cy` en vez de recrearlo (usar `cy.add()` / `cy.remove()` / `cy.layout()`), pero la recreación es más simple y evita inconsistencias.

- Tipos y dependencias en TypeScript:
  - Instalar: `cytoscape`, `cytoscape-dagre`, `dagre`.
  - En TypeScript puede que falten tipos para `cytoscape-dagre` o `dagre`. Puedes añadir declaraciones globales temporales, p. ej. `declare module 'cytoscape-dagre';` en un `.d.ts` si TypeScript reclama tipos.

## Dependencias (instalación sugerida)

Desde la raíz del `frontend` (o donde esté tu `package.json`):

```bash
npm install cytoscape cytoscape-dagre dagre
# o con yarn
# yarn add cytoscape cytoscape-dagre dagre
```

Si TypeScript muestra errores de tipos por `cytoscape-dagre` o `dagre`, crea un archivo `frontend/src/types/cytoscape-extensions.d.ts` con:

```ts
declare module 'cytoscape-dagre';
declare module 'dagre';
```

y asegúrate de que `tsconfig.json` incluya esos tipos (por defecto sí los tomará si están dentro de `src/`).

## Ejemplo de uso (componente padre)

```tsx
const sample = [
  { id: 1, estado: 'recuperado', fecha: '2023-10-01T10:00:00Z', nota: 'Recuperado OK' },
  { id: 2, estado: 'clasificado', fecha: '2023-10-01T12:00:00Z' },
  { id: 3, estado: 'fertilizado', fecha: '2023-10-02T09:00:00Z' },
];

<OvocitoStateDiagram
  historial={sample}
  onNodeClick={(estado) => console.log('clic en nodo', estado)}
/>
```

Ajusta el `height` del contenedor en el file si necesitas más/menos altura (actualmente 320px). Si el layout queda muy comprimido, sube `nodeSep` y `rankSep` en la configuración del `layout`.

## Problemas comunes y soluciones

- No se ve nada / blank:
  - Asegúrate que `containerRef` tenga tamaño CSS (>0x0). Si el componente está dentro de un contenedor colapsado por CSS, Cytoscape no renderiza correctamente.
  - Comprueba que `historial` contenga objetos con `fecha` parseable.

- Error sobre tipos o importaciones:
  - Añade declaraciones `declare module` para `cytoscape-dagre` / `dagre` si TypeScript no tiene tipos.

- Nodos con textos muy largos:
  - Se usa `width: 'label'` y `padding` para ajustar nodos al texto; si quieres limitar ancho, modifica estilos para aplicar `max-width` y `text-wrap: wrap` (ya hay `'text-wrap': 'wrap'`).

## Resumen final (en una línea)

El componente transforma una lista temporal de eventos de ovocito en un grafo dirigido visual (nodos = estados, aristas = transiciones), lo renderiza con Cytoscape + dagre, marca el estado actual y permite capturar clicks en nodos para interactividad.

