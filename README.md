# 📘 Clinica de fertilidad envy

> Es un proyecto para una clínica de fertilidad orientado a la materia Taller de Tecnologías de Producción de Software - Opción de Requerimientos
> Proyecto frontend desarrollado con **React**, **TypeScript** y **Tailwind CSS**, organizado por **feature y tipo**, listo para integrarse con un backend o API.

---

## 🛠 Tecnologías

- React 18+  
- TypeScript  
- Tailwind CSS 4+  
- ESLint  
- Vite  
- React Hooks  

Opcionales: Prettier, ESLint Plugins, React Refresh.

---

## 🚀 Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPO>
cd <NOMBRE_DEL_PROYECTO>
```

2. Instalar dependencias

```bash
npm install
```

3. Correr el proyecto en desarrollo

```bash
npm run dev
```

4. Construir el proyecto para producción
```bash
npm run build
```


## Estructura de carpetas

#### Organización por feature y tipo

```
src/
│
├─ features/               # Carpeta principal de features
│  ├─ Auth/                # Ejemplo de feature: autenticación
│  │  ├─ components/       # Componentes específicos del feature
│  │  │   ├─ LoginForm.tsx
│  │  │   └─ SignupForm.tsx
│  │  ├─ hooks/            # Hooks específicos del feature
│  │  │   └─ useAuth.ts
│  │  ├─ services/         # Lógica de negocio / API calls
│  │  │   └─ authService.ts
│  │  ├─ types/            # Tipos TypeScript específicos
│  │  │   └─ authTypes.ts
│  │  └─ index.ts          # Export principal del feature
│  │
│  └─ Dashboard/           # Otro feature
│      ├─ components/
│      ├─ hooks/
│      ├─ services/
│      └─ types/
│
├─ shared/                 # Código compartido entre features
│  ├─ components/          # Componentes genéricos (Botón, Modal, Input)
│  ├─ hooks/               # Hooks genéricos
│  ├─ utils/               # Funciones auxiliares
│  └─ types/               # Tipos generales
│
├─ App.tsx                 # Componente raíz
├─ main.tsx                # Entry point de Vite
└─ index.css               # Tailwind + estilos globales
```

## ✅ Buenas prácticas

- Usar TypeScript en todos los componentes.

- Organizar código por feature y tipo para escalabilidad.

- Mantener los hooks específicos dentro del feature, y hooks genéricos en shared/hooks.

- Evitar estilos inline, usar Tailwind y clases compartidas.

- Usar ESLint para mantener consistencia de código.