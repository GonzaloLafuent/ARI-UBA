# Preguntas Frecuentes (FAQ)

## ❓ Preguntas sobre Instalación

### P: ¿Dónde descargo PostgreSQL?
**R:** Desde https://www.postgresql.org/download/
- Windows: Descarga el installer de EnterpriseDB
- Mac: Usa brew o descarga desde postgresql.org
- Linux: `sudo apt install postgresql` (Ubuntu/Debian)

### P: ¿Necesito instalar algo más aparte de Node.js y PostgreSQL?
**R:** No, con esos dos programas es suficiente. El resto se instala automáticamente con npm.

### P: ¿Puedo usar una BD diferente a PostgreSQL?
**R:** Este proyecto está específicamente diseñado para PostgreSQL. Para cambiar necesitarías:
- Reescribir las queries SQL
- Cambiar el driver (pg a otro)
- Modificar la configuración de conexión

## ❓ Preguntas sobre Configuración

### P: ¿Qué usuario/contraseña usar para PostgreSQL?
**R:** 
- Por defecto: usuario `postgres` con contraseña que elegiste en la instalación
- En desarrollo, puedes usar lo que quieras
- En producción, usa credenciales seguras

### P: ¿Qué pasa si olvido la contraseña de PostgreSQL?
**R:** 
- Windows: Desinstala y reinstala PostgreSQL
- Linux: `sudo -u postgres psql` (accede sin contraseña como admin)

### P: ¿Puedo cambiar los puertos 5000 y 5173?
**R:** Sí:
- Backend: Edita `backend/.env` y cambia `PORT=5000`
- Frontend: Edita `frontend/vite.config.ts` y cambia `port: 5173`

### P: ¿DATABASE_URL es obligatorio?
**R:** Sí, es la cadena de conexión a PostgreSQL. Formato:
```
postgresql://usuario:contraseña@host:puerto/base_de_datos
```

## ❓ Preguntas sobre Desarrollo

### P: ¿Qué significa "npm run dev"?
**R:** Ejecuta el proyecto en modo desarrollo:
- Hot reload (recarga automática con cambios)
- Source maps (debug más fácil)
- Sin optimizar para producción

### P: ¿Debo compilar TypeScript manualmente?
**R:** No, Vite (frontend) y ts-node (backend dev) lo hacen automáticamente. Solo en producción compilas con `npm run build`.

### P: ¿Puedo editar los archivos mientras corre "npm run dev"?
**R:** Sí, el cambio se refleja automáticamente en el navegador (frontend) y en el servidor (backend).

### P: ¿Por qué necesito 2 terminales?
**R:** Porque:
- Backend escucha peticiones en puerto 5000
- Frontend sirve la UI en puerto 5173
- Ambos corren simultáneamente en desarrollo

### P: ¿Puedo correr todo en una sola terminal?
**R:** Sí, con `npm run dev &` en una y `npm run dev` en la otra, pero es menos ordenado. Mejor usar 2.

## ❓ Preguntas sobre la Base de Datos

### P: ¿Por qué LU no es autoincremental?
**R:** Porque el LU (Legajo Único) es asignado por la facultad, no generado automáticamente.

### P: ¿Qué pasa si intento crear un alumno con LU duplicado?
**R:** PostgreSQL lanza error de PRIMARY KEY duplicate y el backend devuelve HTTP 409 Conflict.

### P: ¿Puedo cambiar el esquema de la BD?
**R:** Sí, modifica `database/schema.sql` antes de ejecutar `psql`.

### P: ¿Los datos se pierden si reinicio PostgreSQL?
**R:** No, los datos se guardan en disco. Solo se pierden si eliminas la base de datos.

### P: ¿Cómo respaldar los datos?
**R:** 
```bash
pg_dump -U postgres academia > backup.sql
```
Para restaurar:
```bash
psql -U postgres -d academia < backup.sql
```

## ❓ Preguntas sobre la Interfaz

### P: ¿Cómo agrego un alumno nuevo?
**R:** 
1. Click en pestaña "Alumnos"
2. Click en "+ Nuevo Alumno"
3. Rellena los campos
4. Click en "Guardar"

### P: ¿Puedo dejar campos vacíos?
**R:** Depende del campo:
- LU, Nombre, Apellido, Email: OBLIGATORIOS
- Calificación: OPCIONAL (hasta que se apruebe)
- Descripción de Materia: OPCIONAL

### P: ¿Qué significa cada estado de alumno?
**R:**
- **Activo**: Estudiando actualmente
- **Egresado**: Completó la carrera
- **Interrumpido**: Pausó la carrera

### P: ¿Qué significa cada estado de inscripción?
**R:**
- **Inscripto**: Recién registrado, sin calificación
- **Aprobada**: Pasó la materia (7+)
- **Desaprobada**: No pasó la materia (<7)

### P: ¿Puedo editar múltiples registros a la vez?
**R:** No, solo uno a la vez. Click en "Editar" para el registro específico.

## ❓ Problemas Técnicos Comunes

### P: "Cannot find module 'react'"
**Solución:**
```bash
cd frontend
npm install
```

### P: "Connection refused 127.0.0.1:5432"
**Causas posibles:**
- PostgreSQL no está corriendo
- Base de datos `academia` no existe
- Credenciales incorrectas en `.env`

**Soluciones:**
1. Verifica que PostgreSQL está corriendo: `psql -U postgres`
2. Verifica la BD existe: `psql -U postgres -l` (busca "academia")
3. Verifica DATABASE_URL en `backend/.env`

### P: "Error: listen EADDRINUSE :::5000"
**Solución:** Puerto 5000 ya está en uso
```bash
# Opción 1: Cambiar puerto en backend/.env
PORT=5001

# Opción 2: Matar proceso en puerto 5000
# Windows: netstat -ano | findstr :5000
# Linux/Mac: lsof -i :5000
```

### P: "CORS error in the console"
**Causa:** Frontend y Backend no se pueden comunicar
**Soluciones:**
1. Verifica que backend está corriendo (http://localhost:5000/health)
2. Reinicia el backend
3. Verifica el `api.ts` tiene la URL correcta: `http://localhost:5000/api`

### P: "localhost:5173 shows blank page"
**Soluciones:**
1. Abre Developer Tools (F12)
2. Busca errores en Console
3. Verifica que backend está corriendo
4. Reinicia frontend: Ctrl+C y `npm run dev`

### P: "My changes don't show up"
**Soluciones:**
1. Hard refresh: Ctrl+Shift+R (o Cmd+Shift+R en Mac)
2. Verifica que el archivo se guardó
3. Busca errores en consola del navegador
4. Reinicia `npm run dev`

## ❓ Preguntas sobre Producción

### P: ¿Cómo publico esto online?
**R:** Opciones:
1. **Vercel** (Frontend) + **Heroku** (Backend) - Fácil
2. **AWS, Azure, Google Cloud** - Más complejo
3. **Un servidor VPS** - Requiere configuración

### P: ¿Necesito hacer cambios para producción?
**R:** Sí:
- `NODE_ENV=production` en backend/.env
- Build del frontend: `npm run build`
- HTTPS obligatorio
- Credenciales BD seguras

### P: ¿Cómo hago deploy?
**R:** Crear guía de deployment específica según plataforma elegida.

## ❓ Preguntas sobre Personalización

### P: ¿Cómo agrego más campos a un alumno?
**R:**
1. Modifica tabla en `database/schema.sql`
2. Actualiza interfaz en `AlumnosComponent.tsx`
3. Actualiza servicio en `alumnoService.ts`
4. Ejecuta nuevamente los scripts SQL

### P: ¿Cómo cambio los colores del sitio?
**R:** Edita `frontend/src/styles.css`:
- `#667eea` = color primario (azul)
- `#764ba2` = color secundario (púrpura)

### P: ¿Cómo agrego más pestañas?
**R:** Modifica `App.tsx`:
1. Agrega nuevo tipo a `type Tab`
2. Agrega botón en sección `.tabs`
3. Agrega contenido en sección `.content`

## 📞 Contacto y Soporte

Para problemas no mencionados:
1. Verifica el README.md
2. Verifica QUICKSTART.md
3. Revisa los scripts SQL
4. Consulta la documentación oficial de tecnologías usadas

---

**Última actualización:** Marzo 2026
