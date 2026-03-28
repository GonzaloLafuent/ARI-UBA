# 🏗️ Arquitectura del Proyecto

## Diagrama de Componentes

```
╔════════════════════════════════════════════════════════════════╗
║                    APLICACIÓN DE GESTIÓN ACADÉMICA             ║
╚════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────┐
│                     CAPA DE PRESENTACIÓN                     │
│                    Frontend (localhost:5173)                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────┐  │
│  │   App.tsx       │  │  styles.css     │  │ api.ts     │  │
│  │                 │  │                 │  │            │  │
│  │ - State Mgmt    │  │ - Gradientes    │  │ - HTTP     │  │
│  │ - Navegación    │  │ - Responsive    │  │ - Endpoints│  │
│  │ - Tab Control   │  │ - Animaciones   │  │ - Axios    │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬───┘  │
│           │                    │                   │       │
│  ┌────────▼────────┐  ┌────────▼────────┐  ┌──────▼──────┐ │
│  │   Alumnos       │  │   Materias      │  │Inscripciones│ │
│  │  Component      │  │  Component      │  │ Component   │ │
│  │                 │  │                 │  │             │ │
│  │ - TablaAlumnos  │  │ - TablaMaterias │  │ - TablaInsc  │ │
│  │ - FormAlumno    │  │ - FormMateria   │  │ - FormInsc   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│                                                              │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTP/REST (JSON)
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                     CAPA API/NEGOCIO                         │
│                   Backend (localhost:5000)                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Express Server (index.ts)                                  │
│  ├─ CORS habilitado                                         │
│  ├─ JSON middleware                                         │
│  └─ Health check en /health                                 │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              RUTAS API (Express Router)              │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                      │   │
│  │ /api/alumnos                /api/materias          │   │
│  │ ├─ GET    (list)           ├─ GET    (list)       │   │
│  │ ├─ GET/:lu (detail)        ├─ GET/:cod (detail)   │   │
│  │ ├─ POST   (create)         ├─ POST   (create)     │   │
│  │ ├─ PUT/:lu (update)        ├─ PUT/:cod (update)   │   │
│  │ └─ DELETE/:lu (delete)     └─ DELETE/:cod (delete)│   │
│  │                                                      │   │
│  │ /api/inscripciones                                 │   │
│  │ ├─ GET    (list)                                   │   │
│  │ ├─ GET/alumno/:lu (filter)                         │   │
│  │ ├─ GET/materia/:cod (filter)                       │   │
│  │ ├─ POST   (create)                                 │   │
│  │ ├─ PUT/:lu/:cod (update)                           │   │
│  │ └─ DELETE/:lu/:cod (delete)                        │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ▲                                   │
│              ┌───────────┼───────────┐                       │
│              │           │           │                       │
│  ┌───────────▼────┐ ┌────▼──────┐ ┌─▼─────────────┐        │
│  │ alumnoController│ │materiaCtrl│ │inscripcionCtrl│        │
│  │                 │ │            │ │               │        │
│  │ - getAll()     │ │ - getAll() │ │ - getAll()    │        │
│  │ - getById()    │ │ - getById()│ │ - getByAlumno │        │
│  │ - create()     │ │ - create() │ │ - getByMateria│        │
│  │ - update()     │ │ - update() │ │ - create()    │        │
│  │ - delete()     │ │ - delete() │ │ - update()    │        │
│  └────────┬────────┘ └────┬──────┘ └───┬───────────┘        │
│           │               │            │                    │
│  ┌────────▼────────┐ ┌────▼──────┐ ┌──▼─────────────┐      │
│  │ alumnoService   │ │materiaServ │ │inscripcionServ │      │
│  │                 │ │            │ │                │      │
│  │ - getAll()     │ │ - getAll() │ │ - getAll()     │      │
│  │ - getById()    │ │ - getById()│ │ - getByAlumno  │      │
│  │ - create()     │ │ - create() │ │ - getByMateria │      │
│  │ - update()     │ │ - update() │ │ - create()     │      │
│  │ - delete()     │ │ - delete() │ │ - update()     │      │
│  └────────┬────────┘ └────┬──────┘ │ - delete()     │      │
│           │               │        └────┬───────────┘       │
│           └───────────────┼─────────────┘                    │
│                           │                                 │
│              Lógica de Negocio (SQL Pool Queries)          │
│                                                              │
└────────────────────────┬─────────────────────────────────────┘
                         │ SQL (pg driver)
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                     CAPA DE DATOS                            │
│              PostgreSQL (localhost:5432)                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                BASE DE DATOS: academia             │    │
│  ├────────────────────────────────────────────────────┤    │
│  │                                                    │    │
│  │  ┌──────────────────┐  ┌──────────────────┐      │    │
│  │  │   TABLA ALUMNOS  │  │  TABLA MATERIAS  │      │    │
│  │  ├──────────────────┤  ├──────────────────┤      │    │
│  │  │ PK lu            │  │ PK codigo_materia│      │    │
│  │  │ nombre           │  │ nombre           │      │    │
│  │  │ apellido         │  │ descripcion      │      │    │
│  │  │ email (UNIQUE)   │  │ creditos         │      │    │
│  │  │ fecha_inscripcion│  │ horas            │      │    │
│  │  │ estado           │  │                  │      │    │
│  │  └──────────────────┘  └──────────────────┘      │    │
│  │           △                       △              │    │
│  │           │                       │              │    │
│  │           │    ┌──────────────────────┐         │    │
│  │           │    │  TABLA INSCRIPCIONES │         │    │
│  │           │    ├──────────────────────┤         │    │
│  │           └────┤ FK lu               │         │    │
│  │                │ FK codigo_materia   │         │    │
│  │                │ fecha_inscripcion   │         │    │
│  │                │ calificacion        │         │    │
│  │                │ estado              │         │    │
│  │                └──────────────────────┘         │    │
│  │                                                 │    │
│  │  Índices:                                      │    │
│  │  ├─ idx_alumnos_apellido                       │    │
│  │  ├─ idx_alumnos_estado                         │    │
│  │  └─ idx_inscripciones_estado                   │    │
│  │                                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Flujo de Datos - Ejemplo: Crear Alumno

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Usuario completa formulario en Frontend                  │
│    - LU: 10005, Nombre: Pedro, Apellido: González, etc.    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Validación en Cliente (React)                            │
│    - Campos requeridos: OK                                 │
│    - Email válido: OK                                       │
│    - Formato correcto: OK                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. HTTP Request (axios)                                     │
│    POST http://localhost:5000/api/alumnos                   │
│    Headers: Content-Type: application/json                  │
│    Body: {lu, nombre, apellido, email, ...}               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Backend recibe en Express                                │
│    - Parsea JSON                                            │
│    - Enruta a POST /api/alumnos                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. alumnoController.create()                                │
│    - Recibe datos del body                                 │
│    - Llama a alumnoService.create()                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. alumnoService.create()                                   │
│    - Ejecuta query SQL INSERT                              │
│    - Parámetros: [$lu, $nombre, $apellido, ...]          │
│    - Devuelve resultado o error                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. PostgreSQL procesa INSERT                                │
│    - Valida PRIMARY KEY (lu)                               │
│    - Valida UNIQUE (email)                                 │
│    - Guarda en tabla alumnos                               │
│    - Devuelve row insertado                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. Respuesta HTTP 201 Created                               │
│    Body: {lu: 10005, nombre: "Pedro", ...}                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 9. Frontend recibe respuesta (axios)                        │
│    - Status 201 → Éxito                                    │
│    - Actualiza estado React                                │
│    - Cierra formulario                                     │
│    - Recarga lista de alumnos                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 10. UI se actualiza automáticamente                         │
│     - Nueva fila en tabla de alumnos                        │
│     - Muestra mensaje de éxito (opcional)                  │
│     - Usuario ve el cambio inmediatamente                   │
└─────────────────────────────────────────────────────────────┘
```

## Estructura de Carpetas

```
Aida/
│
├── 📄 README.md                  # Guía principal
├── 📄 QUICKSTART.md              # Inicio rápido
├── 📄 FAQ.md                     # Preguntas frecuentes
├── 📄 ESTRUCTURA.md              # Detalles técnicos
├── 📄 API_DOCUMENTATION.md       # Referencia API
├── 📄 RESUMEN.md                 # Resumen ejecutivo
├── 📄 ARQUITECTURA.md            # Este archivo
│
├── 📂 backend/                   # API Node.js
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 .env.example
│   │
│   └── 📂 src/
│       ├── 📄 index.ts           # Entry point
│       │
│       ├── 📂 database/
│       │   └── 📄 connection.ts  # Pool PostgreSQL
│       │
│       ├── 📂 routes/            # Express routers
│       │   ├── 📄 alumnos.ts
│       │   ├── 📄 materias.ts
│       │   └── 📄 inscripciones.ts
│       │
│       ├── 📂 controllers/       # Request handlers
│       │   ├── 📄 alumnoController.ts
│       │   ├── 📄 materiaController.ts
│       │   └── 📄 inscripcionController.ts
│       │
│       └── 📂 services/          # Business logic
│           ├── 📄 alumnoService.ts
│           ├── 📄 materiaService.ts
│           └── 📄 inscripcionService.ts
│
├── 📂 frontend/                  # React app
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 vite.config.ts
│   ├── 📄 index.html
│   │
│   └── 📂 src/
│       ├── 📄 main.tsx           # Entry point
│       ├── 📄 App.tsx            # Root component
│       ├── 📄 api.ts             # Axios client
│       ├── 📄 styles.css         # Global styles
│       │
│       ├── 📄 AlumnosComponent.tsx
│       ├── 📄 MateriasComponent.tsx
│       └── 📄 InscripcionesComponent.tsx
│
└── 📂 database/                  # SQL scripts
    ├── 📄 schema.sql             # CREATE TABLEs
    └── 📄 seed.sql               # INSERT data
```

---

**Generado:** Marzo 2026
**Versión:** 1.0.0
**Estado:** ✅ Completado
