# OvocitoStateDiagram — explicación y README

Este documento explica en español qué hace el componente `OvocitoStateDiagram.tsx` (React + TypeScript) que se encuentra en `frontend/src/features/Punciones/components/` y documenta cambios recientes, cómo usarlo y cómo solucionar errores comunes.

## Resumen rápido

`OvocitoStateDiagram` transforma el historial (lista temporal) de un ovocito en un grafo dirigido donde:
- Cada nodo representa un estado (por ejemplo: "recuperado", "clasificado", "fertilizado").
- Cada arista representa una transición temporal entre estados y lleva como etiqueta la fecha de la transición.

El grafo se renderiza con Cytoscape y usa el layout `dagre` para colocación automática. El último estado en el tiempo se marca visualmente (clase `.current`). El componente expone `onNodeClick` para manejar clicks sobre nodos.

## Contrato (inputs / outputs / efectos)

- Props:
  - `historial: HistorialItem[]` — arreglo donde cada item tiene al menos:
    - `id: number`
    - `estado: string` — identificador del estado (se usa como id del nodo)
    - `fecha: string` — fecha ISO o parseable con `new Date()`
    - `nota?: string`
    - `usuario_rep?: string`
  - `onNodeClick?: (estado: string) => void` — callback opcional llamado con el `estado` (id) del nodo clickeado.

- Output visual: un `div` con el grafo renderizado por Cytoscape.
- Efectos secundarios: crea y destruye la instancia de Cytoscape cuando cambian `historial` o `onNodeClick`.

## Flujo general del componente (resumido)

1. Ordena `historial` por `fecha` (ascendente).
2. Construye un `Map` (`nodesMap`) con nodos únicos por `estado` y una lista `elements` con las aristas (cada arista incluye la fecha formateada como label).
3. Inicializa Cytoscape con `elements`, estilos para `node` y `edge`, y layout `dagre` (orientación LR).
4. Aplica tamaños calculados a cada nodo (ver sección "Medición y tamaño de nodos").
5. Marca el último estado como `.current` y registra el handler `tap` para nodos.

## Medición y tamaño de nodos (por qué y cómo)

Problema: usar `width: 'label'`/`height: 'label'` (API de Cytoscape) puede estar en desuso o producir overflow de etiquetas. Para controlar mejor los tamaños y evitar que el texto se salga del nodo (y para dejar espacio a las etiquetas de las aristas), el componente:

- Crea un canvas 2D para medir el ancho en píxeles de cada etiqueta de nodo usando `measureText`.
- Añade padding horizontal/vertical configurable (e.g., 24px horizontal, 12px vertical) y limita el ancho a `maxWidth` (por defecto 300px).
- Calcula el número estimado de líneas y la altura necesaria, y escribe esos valores en `node.data._computedWidth` y `node.data._computedHeight`.
- Tras inicializar Cytoscape, aplica esos tamaños pixelados a cada nodo con `el.style('width', 'XXXpx')` y `el.style('height', 'YYYpx')`.

Esto evita que los textos largos hagan overflow y permite controlar mejor el espaciado entre nodos.

## Estilos de aristas (edge labels) y legibilidad

Para que las etiquetas de fecha en las aristas no queden encima de los nodos:

- Se aumentó la separación en el layout `dagre`: `nodeSep`, `rankSep`, `edgeSep` (valores ajustables, p. ej. 140, 160, 40).
- Se aplica `text-rotation: 'autorotate'` para que la etiqueta gire con la arista.
- Se usa `text-margin-y` negativo para empujar la etiqueta un poco fuera de la línea (ej. `-12`).
- Se añade un fondo claro a las etiquetas de arista: `text-background-color: '#ffffff'` y `text-background-opacity: 0.8` y `text-background-shape: 'roundrectangle'` y `text-background-padding: '2px'` para mejorar la lectura sobre la línea.

Si necesitas más separación, aumenta `nodeSep` y `rankSep` en la configuración de `layout`.

## Nota sobre cambios recientes (errores y su resolución)

- Error de sintaxis / TS marcado en rojo: en una edición anterior quedaron líneas con propiedades como `'text-rotation': 'autorotate',` fuera del objeto `style` — eso produce errores de parsing y mensajes como "';' expected" o "Expression expected". Es importante que todas las propiedades de estilo estén dentro del objeto `style` del selector correspondiente.
- Error de tipos de TypeScript: la propiedad `'text-background-padding'` estaba como número (`2`) y las definiciones de tipos del proyecto esperan una cadena `PropertyValue<string>`; cambié el valor a `'2px'` para corregir el tipo.

Si ves errores rojos similares:

1. Revisa que no haya líneas sueltas fuera de objetos (por ejemplo, revisa bloques `try { ... }` para no dejar propiedades fuera).
2. Reinicia el servidor TypeScript en tu editor (VS Code → "TypeScript: Restart TS Server").

## Ejemplo de uso

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

## Dependencias y pasos para correr localmente

Desde la raíz del `frontend` (donde está `package.json`):

```bash
npm install 
```
En este caso solo install porque ya se encuentran en el proyecto

Si TypeScript se queja por tipos de `cytoscape-dagre`/`dagre`, crea `frontend/src/types/cytoscape-extensions.d.ts` con:

```ts
declare module 'cytoscape-dagre';
declare module 'dagre';
```

## Troubleshooting rápido

- Mensajes de parse/TS: revisa que no haya código suelto fuera de objetos y reinicia el TS server.
- Edge labels encima de nodos: aumenta `nodeSep` y `rankSep` en `layout`.
- Nodos con textos muy largos: reduce `maxWidth` o permite wrapping (`'text-wrap': 'wrap'` ya está activo) y ajusta `horizontalPadding`.



