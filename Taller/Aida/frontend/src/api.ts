import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Alumnos API
export const alumnosAPI = {
  getAll: () => api.get('/alumnos'),
  getById: (lu: number) => api.get(`/alumnos/${lu}`),
  create: (data: unknown) => api.post('/alumnos', data),
  update: (lu: number, data: unknown) => api.put(`/alumnos/${lu}`, data),
  delete: (lu: number) => api.delete(`/alumnos/${lu}`),
};

// Materias API
export const materiasAPI = {
  getAll: () => api.get('/materias'),
  getById: (codigo: string) => api.get(`/materias/${codigo}`),
  create: (data: unknown) => api.post('/materias', data),
  update: (codigo: string, data: unknown) => api.put(`/materias/${codigo}`, data),
  delete: (codigo: string) => api.delete(`/materias/${codigo}`),
};

// Inscripciones API
export const inscripcionesAPI = {
  getAll: () => api.get('/inscripciones'),
  getByAlumno: (lu: number) => api.get(`/inscripciones/alumno/${lu}`),
  getByMateria: (codigo: string) => api.get(`/inscripciones/materia/${codigo}`),
  create: (data: unknown) => api.post('/inscripciones', data),
  update: (lu: number, codigo: string, data: unknown) => api.put(`/inscripciones/${lu}/${codigo}`, data),
  delete: (lu: number, codigo: string) => api.delete(`/inscripciones/${lu}/${codigo}`),
};

export default api;
