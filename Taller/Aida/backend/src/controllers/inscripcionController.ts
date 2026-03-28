import { Request, Response } from 'express';
import { inscripcionService } from '../services/inscripcionService';

export const inscripcionController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const inscripciones = await inscripcionService.getAll();
      res.json(inscripciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener inscripciones' });
    }
  },

  getByAlumno: async (req: Request, res: Response) => {
    try {
      const lu = parseInt(req.params.lu);
      const inscripciones = await inscripcionService.getByAlumno(lu);
      res.json(inscripciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener inscripciones del alumno' });
    }
  },

  getByMateria: async (req: Request, res: Response) => {
    try {
      const codigo = req.params.codigo_materia;
      const inscripciones = await inscripcionService.getByMateria(codigo);
      res.json(inscripciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener inscripciones de la materia' });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const inscripcion = await inscripcionService.create(req.body);
      res.status(201).json(inscripcion);
    } catch (error: any) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'La inscripción ya existe' });
      }
      if (error.code === '23503') {
        return res.status(409).json({ error: 'Alumno o materia no existe' });
      }
      res.status(500).json({ error: 'Error al crear inscripción' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const lu = parseInt(req.params.lu);
      const codigo = req.params.codigo_materia;
      const inscripcion = await inscripcionService.update(lu, codigo, req.body);
      if (!inscripcion) {
        return res.status(404).json({ error: 'Inscripción no encontrada' });
      }
      res.json(inscripcion);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar inscripción' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const lu = parseInt(req.params.lu);
      const codigo = req.params.codigo_materia;
      const deleted = await inscripcionService.delete(lu, codigo);
      if (!deleted) {
        return res.status(404).json({ error: 'Inscripción no encontrada' });
      }
      res.json({ message: 'Inscripción eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar inscripción' });
    }
  },
};
