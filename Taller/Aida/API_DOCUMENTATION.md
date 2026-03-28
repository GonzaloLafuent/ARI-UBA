# Documentación de API REST

## 📋 Descripción General

API REST para Sistema de Gestión Académica - UBA. Permite gestionar alumnos, materias e inscripciones.

**Base URL:** `http://localhost:5000/api`
**Content-Type:** `application/json`

## 🔐 Autenticación

Versión actual: Sin autenticación (desarrollo). En producción implementar JWT o similar.

## 📊 Endpoints

---

## ALUMNOS

### GET /alumnos

Obtiene listado de todos los alumnos.

**Respuesta (200 OK):**
```json
[
  {
    "lu": 10001,
    "nombre": "Juan",
    "apellido": "García",
    "email": "juan.garcia@uba.edu.ar",
    "fecha_inscripcion": "2020-03-15",
    "estado": "activo"
  },
  {
    "lu": 10002,
    "nombre": "María",
    "apellido": "López",
    "email": "maria.lopez@uba.edu.ar",
    "fecha_inscripcion": "2021-03-10",
    "estado": "activo"
  }
]
```

**Códigos de error:**
- `500` - Error del servidor

---

### GET /alumnos/:lu

Obtiene un alumno específico por su LU.

**Parámetros:**
- `lu` (path, integer, requerido) - Legajo Único

**Respuesta (200 OK):**
```json
{
  "lu": 10001,
  "nombre": "Juan",
  "apellido": "García",
  "email": "juan.garcia@uba.edu.ar",
  "fecha_inscripcion": "2020-03-15",
  "estado": "activo"
}
```

**Códigos de error:**
- `404` - Alumno no encontrado
- `500` - Error del servidor

---

### POST /alumnos

Crea un nuevo alumno.

**Body (application/json):**
```json
{
  "lu": 10005,
  "nombre": "Pedro",
  "apellido": "González",
  "email": "pedro.gonzalez@uba.edu.ar",
  "fecha_inscripcion": "2023-03-01",
  "estado": "activo"
}
```

**Campos requeridos:**
- `lu` (integer, único) - Legajo Único
- `nombre` (string) - Nombre del alumno
- `apellido` (string) - Apellido del alumno
- `email` (string, único) - Email válido
- `fecha_inscripcion` (date, formato YYYY-MM-DD)
- `estado` (string) - "activo" | "egresado" | "interrumpido"

**Respuesta (201 Created):**
```json
{
  "lu": 10005,
  "nombre": "Pedro",
  "apellido": "González",
  "email": "pedro.gonzalez@uba.edu.ar",
  "fecha_inscripcion": "2023-03-01",
  "estado": "activo"
}
```

**Códigos de error:**
- `409` - LU o email duplicado
- `500` - Error del servidor

---

### PUT /alumnos/:lu

Actualiza un alumno existente.

**Parámetros:**
- `lu` (path, integer, requerido)

**Body (application/json):**
```json
{
  "nombre": "Juan Pablo",
  "estado": "egresado"
}
```

**Campos actualizables:**
- `nombre` (string)
- `apellido` (string)
- `email` (string)
- `estado` (string)

**Respuesta (200 OK):**
```json
{
  "lu": 10001,
  "nombre": "Juan Pablo",
  "apellido": "García",
  "email": "juan.garcia@uba.edu.ar",
  "fecha_inscripcion": "2020-03-15",
  "estado": "egresado"
}
```

**Códigos de error:**
- `404` - Alumno no encontrado
- `409` - Email duplicado
- `500` - Error del servidor

---

### DELETE /alumnos/:lu

Elimina un alumno (y sus inscripciones asociadas).

**Parámetros:**
- `lu` (path, integer, requerido)

**Respuesta (200 OK):**
```json
{
  "message": "Alumno eliminado"
}
```

**Códigos de error:**
- `404` - Alumno no encontrado
- `500` - Error del servidor

---

## MATERIAS

### GET /materias

Obtiene listado de todas las materias.

**Respuesta (200 OK):**
```json
[
  {
    "codigo_materia": "MAT101",
    "nombre": "Análisis Matemático I",
    "descripcion": "Cálculo diferencial e integral",
    "creditos": 8,
    "horas": 120
  },
  {
    "codigo_materia": "CS101",
    "nombre": "Introducción a la Computación",
    "descripcion": "Fundamentos de programación",
    "creditos": 6,
    "horas": 90
  }
]
```

---

### GET /materias/:codigo_materia

Obtiene una materia específica.

**Parámetros:**
- `codigo_materia` (path, string, requerido)

**Respuesta (200 OK):**
```json
{
  "codigo_materia": "MAT101",
  "nombre": "Análisis Matemático I",
  "descripcion": "Cálculo diferencial e integral",
  "creditos": 8,
  "horas": 120
}
```

**Códigos de error:**
- `404` - Materia no encontrada
- `500` - Error del servidor

---

### POST /materias

Crea una nueva materia.

**Body (application/json):**
```json
{
  "codigo_materia": "CS103",
  "nombre": "Base de Datos",
  "descripcion": "Diseño y administración de BD",
  "creditos": 7,
  "horas": 105
}
```

**Campos requeridos:**
- `codigo_materia` (string, único)
- `nombre` (string)
- `creditos` (integer, opcional)
- `horas` (integer, opcional)
- `descripcion` (string, opcional)

**Respuesta (201 Created):**
```json
{
  "codigo_materia": "CS103",
  "nombre": "Base de Datos",
  "descripcion": "Diseño y administración de BD",
  "creditos": 7,
  "horas": 105
}
```

**Códigos de error:**
- `409` - Código duplicado
- `500` - Error del servidor

---

### PUT /materias/:codigo_materia

Actualiza una materia.

**Parámetros:**
- `codigo_materia` (path, string, requerido)

**Body (application/json):**
```json
{
  "nombre": "Análisis Matemático I (Revisado)",
  "horas": 130
}
```

**Respuesta (200 OK):**
```json
{
  "codigo_materia": "MAT101",
  "nombre": "Análisis Matemático I (Revisado)",
  "descripcion": "Cálculo diferencial e integral",
  "creditos": 8,
  "horas": 130
}
```

---

### DELETE /materias/:codigo_materia

Elimina una materia (y sus inscripciones asociadas).

**Parámetros:**
- `codigo_materia` (path, string, requerido)

**Respuesta (200 OK):**
```json
{
  "message": "Materia eliminada"
}
```

---

## INSCRIPCIONES

### GET /inscripciones

Obtiene todas las inscripciones.

**Respuesta (200 OK):**
```json
[
  {
    "lu": 10001,
    "codigo_materia": "MAT101",
    "fecha_inscripcion": "2020-03-15",
    "calificacion": 8.5,
    "estado": "aprobada"
  },
  {
    "lu": 10002,
    "codigo_materia": "MAT101",
    "fecha_inscripcion": "2021-03-10",
    "calificacion": 8.0,
    "estado": "aprobada"
  }
]
```

---

### GET /inscripciones/alumno/:lu

Obtiene todas las inscripciones de un alumno específico.

**Parámetros:**
- `lu` (path, integer, requerido)

**Respuesta (200 OK):**
```json
[
  {
    "lu": 10001,
    "codigo_materia": "MAT101",
    "fecha_inscripcion": "2020-03-15",
    "calificacion": 8.5,
    "estado": "aprobada"
  },
  {
    "lu": 10001,
    "codigo_materia": "MAT102",
    "fecha_inscripcion": "2020-09-10",
    "calificacion": 7.0,
    "estado": "aprobada"
  }
]
```

---

### GET /inscripciones/materia/:codigo_materia

Obtiene todas las inscripciones de una materia específica.

**Parámetros:**
- `codigo_materia` (path, string, requerido)

**Respuesta (200 OK):**
```json
[
  {
    "lu": 10001,
    "codigo_materia": "MAT101",
    "fecha_inscripcion": "2020-03-15",
    "calificacion": 8.5,
    "estado": "aprobada"
  },
  {
    "lu": 10002,
    "codigo_materia": "MAT101",
    "fecha_inscripcion": "2021-03-10",
    "calificacion": 8.0,
    "estado": "aprobada"
  }
]
```

---

### POST /inscripciones

Crea una nueva inscripción.

**Body (application/json):**
```json
{
  "lu": 10004,
  "codigo_materia": "MAT101",
  "fecha_inscripcion": "2023-03-15",
  "calificacion": null,
  "estado": "inscripto"
}
```

**Campos requeridos:**
- `lu` (integer) - Debe existir en tabla alumnos
- `codigo_materia` (string) - Debe existir en tabla materias
- `fecha_inscripcion` (date, formato YYYY-MM-DD)
- `estado` (string) - "inscripto" | "aprobada" | "desaprobada"
- `calificacion` (numeric, opcional) - 0 a 10

**Respuesta (201 Created):**
```json
{
  "lu": 10004,
  "codigo_materia": "MAT101",
  "fecha_inscripcion": "2023-03-15",
  "calificacion": null,
  "estado": "inscripto"
}
```

**Códigos de error:**
- `409` - Inscripción duplicada o FK no existe
- `500` - Error del servidor

---

### PUT /inscripciones/:lu/:codigo_materia

Actualiza una inscripción.

**Parámetros:**
- `lu` (path, integer, requerido)
- `codigo_materia` (path, string, requerido)

**Body (application/json):**
```json
{
  "calificacion": 8.5,
  "estado": "aprobada"
}
```

**Campos actualizables:**
- `calificacion` (numeric)
- `estado` (string)
- `fecha_inscripcion` (date)

**Respuesta (200 OK):**
```json
{
  "lu": 10004,
  "codigo_materia": "MAT101",
  "fecha_inscripcion": "2023-03-15",
  "calificacion": 8.5,
  "estado": "aprobada"
}
```

---

### DELETE /inscripciones/:lu/:codigo_materia

Elimina una inscripción.

**Parámetros:**
- `lu` (path, integer, requerido)
- `codigo_materia` (path, string, requerido)

**Respuesta (200 OK):**
```json
{
  "message": "Inscripción eliminada"
}
```

---

## 🧪 Ejemplos con cURL

### Crear un alumno
```bash
curl -X POST http://localhost:5000/api/alumnos \
  -H "Content-Type: application/json" \
  -d '{
    "lu": 10005,
    "nombre": "Carlos",
    "apellido": "Pérez",
    "email": "carlos@uba.edu.ar",
    "fecha_inscripcion": "2023-03-01",
    "estado": "activo"
  }'
```

### Obtener un alumno
```bash
curl http://localhost:5000/api/alumnos/10001
```

### Actualizar alumno
```bash
curl -X PUT http://localhost:5000/api/alumnos/10001 \
  -H "Content-Type: application/json" \
  -d '{"estado": "egresado"}'
```

### Eliminar alumno
```bash
curl -X DELETE http://localhost:5000/api/alumnos/10001
```

---

## 📝 Códigos de Estado HTTP

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 404 | Not Found - Recurso no existe |
| 409 | Conflict - Violación de restricciones |
| 500 | Internal Server Error - Error del servidor |

---

## 🔒 Validaciones

### Alumnos
- LU: Único, no puede ser NULL
- Email: Único, debe ser válido, no puede ser NULL
- Nombre/Apellido: No pueden ser NULL
- Estado: Solo valores permitidos

### Materias
- Código: Único, no puede ser NULL
- Nombre: No puede ser NULL
- Créditos/Horas: Números positivos

### Inscripciones
- Clave compuesta (LU, Código Materia): Única
- Ambas claves foráneas deben existir
- Calificación: Entre 0 y 10 (si se proporciona)

---

**API Versión:** 1.0.0
**Última actualización:** Marzo 2026
