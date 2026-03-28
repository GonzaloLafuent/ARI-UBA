# Sistema de Gestión Académica - UBA

Sistema completo de gestión académica con frontend React y backend Node.js/Express conectado a PostgreSQL.

## Características

- Gestión completa de **Alumnos** (CRUD)
- Gestión de **Materias** (CRUD)
- Gestión de **Inscripciones** (CRUD con clave compuesta)
- Interfaz responsiva y moderna
- API REST completa
- Base de datos relacional con PostgreSQL

## Estructura del Proyecto

```
.
├── backend/              # Servidor Node.js/Express
│   ├── src/
│   │   ├── controllers/  # Controladores de rutas
│   │   ├── routes/       # Definición de rutas
│   │   ├── services/     # Lógica de negocio
│   │   ├── database/     # Configuración BD
│   │   └── index.ts      # Punto de entrada
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/             # Cliente React
│   ├── src/
│   │   ├── api.ts        # Cliente HTTP
│   │   ├── App.tsx       # Componente principal
│   │   ├── AlumnosComponent.tsx
│   │   ├── MateriasComponent.tsx
│   │   ├── InscripcionesComponent.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
└── database/             # Scripts SQL
    ├── schema.sql        # Creación de tablas
    └── seed.sql          # Datos de ejemplo
```

## Requisitos Previos

- **Node.js** 16+ (incluye npm)
- **PostgreSQL** 12+
- **Git** (opcional)

## Instalación

### 1. Configurar Base de Datos PostgreSQL

```bash
# Conectarse a PostgreSQL como usuario postgres
psql -U postgres

# Crear la base de datos
CREATE DATABASE academia;

# Conectarse a la nueva base de datos
\c academia

# Ejecutar el script de schema
\i /ruta/completa/al/archivo/database/schema.sql

# Ejecutar el script de datos de ejemplo (opcional)
\i /ruta/completa/al/archivo/database/seed.sql
```

**Nota:** Reemplazar `/ruta/completa/al/archivo/` con la ruta real donde descargaste el proyecto.

### 2. Configurar Variables de Entorno del Backend

```bash
cd backend

# Copiar el archivo de ejemplo
cp .env.example .env

# Editar el archivo .env con tu configuración
nano .env  # o usa tu editor de texto favorito
```

**Contenido del .env:**
```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/academia
PORT=5000
NODE_ENV=development
```

Reemplazar `usuario` y `contraseña` con tus credenciales de PostgreSQL.

### 3. Instalar Dependencias del Backend

```bash
cd backend

npm install
```

### 4. Instalar Dependencias del Frontend

```bash
cd frontend

npm install
```

## Ejecución

### Opción A: Ejecutar en Modo Desarrollo

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

El servidor se ejecutará en `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

### Opción B: Construir y Ejecutar en Producción

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Uso de la Aplicación

### Pestaña Alumnos
- **Ver Alumnos:** Tabla con todos los alumnos registrados
- **Nuevo Alumno:** Click en "+ Nuevo Alumno" para crear un registro
- **Editar:** Click en "Editar" para modificar datos
- **Eliminar:** Click en "Eliminar" para borrar un alumno
- **Campos:** LU (único), Nombre, Apellido, Email, Fecha Inscripción, Estado

### Pestaña Materias
- **Ver Materias:** Tabla con todas las materias disponibles
- **Nueva Materia:** Click en "+ Nueva Materia"
- **Editar:** Modificar datos de la materia
- **Eliminar:** Borrar una materia
- **Campos:** Código (único), Nombre, Descripción, Créditos, Horas

### Pestaña Inscripciones
- **Ver Inscripciones:** Tabla con todas las inscripciones
- **Nueva Inscripción:** Click en "+ Nueva Inscripción"
- **Editar:** Actualizar calificación, estado, etc.
- **Eliminar:** Borrar una inscripción
- **Campos:** LU, Código Materia, Fecha Inscripción, Calificación, Estado

## API Endpoints

### Alumnos
```
GET    /api/alumnos          - Obtener todos los alumnos
GET    /api/alumnos/:lu      - Obtener alumno por LU
POST   /api/alumnos          - Crear nuevo alumno
PUT    /api/alumnos/:lu      - Actualizar alumno
DELETE /api/alumnos/:lu      - Eliminar alumno
```

### Materias
```
GET    /api/materias/:codigo_materia         - Obtener todas las materias
GET    /api/materias/:codigo_materia         - Obtener materia por código
POST   /api/materias                         - Crear nueva materia
PUT    /api/materias/:codigo_materia         - Actualizar materia
DELETE /api/materias/:codigo_materia         - Eliminar materia
```

### Inscripciones
```
GET    /api/inscripciones                           - Obtener todas las inscripciones
GET    /api/inscripciones/alumno/:lu                - Obtener inscripciones de un alumno
GET    /api/inscripciones/materia/:codigo_materia  - Obtener inscripciones de una materia
POST   /api/inscripciones                          - Crear nueva inscripción
PUT    /api/inscripciones/:lu/:codigo_materia      - Actualizar inscripción
DELETE /api/inscripciones/:lu/:codigo_materia      - Eliminar inscripción
```

## Datos de Ejemplo

La base de datos incluye datos de prueba con:
- 4 alumnos de ejemplo
- 5 materias de ejemplo
- 11 inscripciones de ejemplo

Ejecutar `seed.sql` para cargar estos datos.

## Troubleshooting

### Error: "Cannot find module 'react'"
```bash
cd frontend
npm install
```

### Error: "Connection refused" (Backend)
- Verificar que PostgreSQL está corriendo
- Verificar DATABASE_URL en archivo .env
- Asegurarse que la base de datos existe

### Error: "CORS error"
- Backend y Frontend deben estar en puertos diferentes
- CORS está habilitado en el backend

### Error: "Port already in use"
- Cambiar el puerto en el archivo .env (Backend) o vite.config.ts (Frontend)

## Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **TypeScript** - Lenguaje tipado
- **PostgreSQL** - Base de datos relacional
- **pg** - Cliente PostgreSQL para Node.js

### Frontend
- **React** - Biblioteca UI
- **TypeScript** - Lenguaje tipado
- **Vite** - Bundler moderno
- **Axios** - Cliente HTTP
- **CSS3** - Estilos

## Licencia

Proyecto educativo para la Universidad de Buenos Aires (UBA)

## Soporte

Para reportar problemas o sugerencias, contactar al instructor del curso.
