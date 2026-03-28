# Guía Rápida de Inicio

## 1️⃣ Requisitos
- Node.js 16+ 
- PostgreSQL 12+
- Editor de código (VSCode recomendado)

## 2️⃣ Configuración Rápida (Windows/Mac/Linux)

### Paso 1: Crear la Base de Datos

Abre una terminal y ejecuta:

```bash
psql -U postgres
```

Dentro de PostgreSQL:

```sql
CREATE DATABASE academia;
\c academia
\i database/schema.sql
\i database/seed.sql
\q
```

### Paso 2: Configurar Backend

```bash
cd backend
cp .env.example .env
```

Edita `backend/.env`:
```
DATABASE_URL=postgresql://postgres:tucontraseña@localhost:5432/academia
PORT=5000
NODE_ENV=development
```

Reemplaza `postgres` y `tucontraseña` con tus credenciales de PostgreSQL.

Instala dependencias:
```bash
npm install
```

### Paso 3: Configurar Frontend

```bash
cd frontend
npm install
```

## 3️⃣ Ejecutar el Proyecto

Abre **2 terminales diferentes**:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

Deberías ver: `Servidor ejecutándose en puerto 5000`

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Deberías ver algo como: `Local: http://localhost:5173`

## 4️⃣ Acceder a la Aplicación

Abre tu navegador y ve a: **http://localhost:5173**

¡Ya está corriendo! 🎉

## 5️⃣ Operaciones Básicas

### Crear un Alumno
1. Click en pestaña "Alumnos"
2. Click en "+ Nuevo Alumno"
3. Rellena el formulario
4. Click en "Guardar"

### Editar un Alumno
1. Click en "Editar" en la fila del alumno
2. Modifica los campos
3. Click en "Guardar"

### Eliminar un Alumno
1. Click en "Eliminar"
2. Confirma en el diálogo

Lo mismo aplica para Materias e Inscripciones.

## 🆘 Problemas Comunes

| Problema | Solución |
|----------|----------|
| "Cannot find module 'react'" | `cd frontend && npm install` |
| "Connection refused" | Verifica que PostgreSQL está corriendo |
| "CORS error" | Reinicia el backend |
| "Port 5173 already in use" | Cambia el puerto en `frontend/vite.config.ts` |
| "Port 5000 already in use" | Cambia PORT en `backend/.env` |

## 📝 Notas

- Los datos de ejemplo se cargan automáticamente con `seed.sql`
- LU es el identificador único del alumno
- Las inscripciones usan clave compuesta (LU + Código Materia)
- El frontend se recarga automáticamente con cambios en desarrollo

## 🔧 Comandos Útiles

```bash
# Backend
npm run build      # Compilar TypeScript
npm start          # Ejecutar compilado
npm run watch      # Compilar en tiempo real

# Frontend
npm run build      # Build para producción
npm run preview    # Ver el build compilado
```

---

¡Listo! El sistema está completamente funcional. ✨
