import { Router } from 'express';
import { inscripcionController } from '../controllers/inscripcionController';

const router = Router();

router.get('/', inscripcionController.getAll);
router.get('/alumno/:lu', inscripcionController.getByAlumno);
router.get('/materia/:codigo_materia', inscripcionController.getByMateria);
router.post('/', inscripcionController.create);
router.put('/:lu/:codigo_materia', inscripcionController.update);
router.delete('/:lu/:codigo_materia', inscripcionController.delete);

export default router;
