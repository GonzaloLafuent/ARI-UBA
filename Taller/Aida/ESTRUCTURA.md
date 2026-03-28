# Estructura del Proyecto Detallada

## 📁 Carpeta Raíz

```
Aida/
├── .gitignore              # Archivos a ignorar en git
├── README.md               # Documentación completa
├── QUICKSTART.md          # Guía rápida de inicio
├── setup.sh               # Script de configuración automática
├── database/              # Scripts SQL
│   ├── schema.sql         # Definición de tablas
│   └── seed.sql           # Datos de ejemplo
├── backend/               # Servidor Node.js
│   ├── src/
│   │   ├── index.ts       # Punto de entrada principal
│   │   ├── database/
│   │   │   └── connection.ts    # Conexión a PostgreSQL
│   │   ├── controllers/
│   │   │   ├── alumnoController.ts
│   │   │   ├── materiaController.ts
│   │   │   └── inscripcionController.ts
│   │   ├── services/
│   │   │   ├── alumnoService.ts      # Lógica de alumnos
│   │   │   ├── materiaService.ts     # Lógica de materias
│   │   │   └── inscripcionService.ts # Lógica de inscripciones
│   │   └── routes/
│   │       ├── alumnos.ts
│   │       ├── materias.ts
│   │       └── inscripciones.ts
│   ├── dist/              # Código compilado (se genera)
│   ├── package.json       # Dependencias y scripts
│   ├── tsconfig.json      # Configuración TypeScript
│   └── .env.example       # Variables de entorno
└── frontend/              # Aplicación React
    ├── src/
    │   ├── main.tsx       # Punto de entrada
    │   ├── App.tsx        # Componente principal
    │   ├── api.ts         # Cliente HTTP (Axios)
    │   ├── styles.css     # Estilos globales
    │   ├── AlumnosComponent.tsx       # Tabla y formulario
    │   ├── MateriasComponent.tsx      # Tabla y formulario
    │   └── InscripcionesComponent.tsx # Tabla y formulario
    ├── public/            # Recursos estáticos
    ├── index.html         # HTML principal
    ├── package.json       # Dependencias y scripts
    ├── tsconfig.json      # Configuración TypeScript
    ├── tsconfig.node.json # Configuración TypeScript para config
    └── vite.config.ts     # Configuración de Vite
```

## 🔄 Flujo de Datos

```
Usuario interactúa con Frontend (React)
         ↓
    Componentes React actualizan estado
         ↓
    axios hace llamadas HTTP al Backend
         ↓
    Express recibe petición en puerto 5000
         ↓
    Controller procesa la solicitud
         ↓
    Service ejecuta lógica de negocio
         ↓
    Connection ejecuta query SQL
         ↓
    PostgreSQL devuelve resultado
         ↓
    Service procesa respuesta
         ↓
    Controller devuelve JSON al cliente
         ↓
    Frontend recibe datos y actualiza interfaz
```

## 📊 Base de Datos

### Tablas

1. **alumnos**
   - `lu` (INTEGER, PK) - Legajo Único
   - `nombre` (VARCHAR)
   - `apellido` (VARCHAR)
   - `email` (VARCHAR, UNIQUE)
   - `fecha_inscripcion` (DATE)
   - `estado` (VARCHAR) - activo, egresado, interrumpido

2. **materias**
   - `codigo_materia` (VARCHAR, PK)
   - `nombre` (VARCHAR)
   - `descripcion` (TEXT)
   - `creditos` (INTEGER)
   - `horas` (INTEGER)

3. **inscripciones**
   - `lu` (INTEGER, FK) + `codigo_materia` (VARCHAR, FK) = PK (Clave Compuesta)
   - `fecha_inscripcion` (DATE)
   - `calificacion` (NUMERIC)
   - `estado` (VARCHAR) - inscripto, aprobada, desaprobada

## 🛣️ Rutas API

### Alumnos
- `GET /api/alumnos` - Listado completo
- `GET /api/alumnos/:lu` - Un alumno específico
- `POST /api/alumnos` - Crear nuevo
- `PUT /api/alumnos/:lu` - Actualizar
- `DELETE /api/alumnos/:lu` - Eliminar

### Materias
- `GET /api/materias` - Listado completo
- `GET /api/materias/:codigo_materia` - Una materia específica
- `POST /api/materias` - Crear nueva
- `PUT /api/materias/:codigo_materia` - Actualizar
- `DELETE /api/materias/:codigo_materia` - Eliminar

### Inscripciones
- `GET /api/inscripciones` - Listado completo
- `GET /api/inscripciones/alumno/:lu` - Del alumno específico
- `GET /api/inscripciones/materia/:codigo_materia` - De la materia específica
- `POST /api/inscripciones` - Crear nueva
- `PUT /api/inscripciones/:lu/:codigo_materia` - Actualizar
- `DELETE /api/inscripciones/:lu/:codigo_materia` - Eliminar

## 🎨 Componentes React

### App.tsx
- Componente raíz
- Maneja navegación entre pestañas
- Control de estado global
- Gestión de formularios

### TablaAlumnos / FormularioAlumno
- Visualización en tabla
- Edición inline con formulario
- Botones de acción (Editar/Eliminar)

### TablaMaterias / FormularioMateria
- Similar a Alumnos
- Campos específicos de materias

### TablaInscripciones / FormularioInscripcion
- Similar pero con clave compuesta
- Validación de relaciones FK

## 🔑 Características Principales

✅ CRUD completo para 3 entidades
✅ Validación de datos en cliente y servidor
✅ Manejo de errores con mensajes descriptivos
✅ Interfaz responsive (móvil/desktop)
✅ Estilos modernos con gradientes
✅ Animaciones suaves
✅ Confirmación antes de eliminar
✅ Edición inline sin recarga de página
✅ Datos de ejemplo precargados

## 🚀 Stack Tecnológico

### Backend
- Node.js + Express
- TypeScript 5.1+
- PostgreSQL 12+
- pg (driver PostgreSQL)

### Frontend
- React 18.2+
- TypeScript 5.1+
- Vite 4.3+ (bundler moderno)
- Axios (HTTP client)
- CSS3 (sin frameworks CSS)

---

**Autor:** Sistema de Gestión Académica UBA
**Versión:** 1.0.0
**Año:** 2026
