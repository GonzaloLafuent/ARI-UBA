import { Router } from 'express';
import { materiaController } from '../controllers/materiaController';

const router = Router();

router.get('/', materiaController.getAll);
router.get('/:codigo_materia', materiaController.getById);
router.post('/', materiaController.create);
router.put('/:codigo_materia', materiaController.update);
router.delete('/:codigo_materia', materiaController.delete);

export default router;
