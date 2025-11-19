import express from 'express';
import { listarChamadosController, obterChamadoPorIdController, criarChamadoController, excluirChamadoController } from '../controllers/ChamadoController.js';

const router = express.Router();

router.get('/', listarChamadosController);
router.get('/:id', obterChamadoPorIdController);

router.post('/', criarChamadoController);

router.delete('/:id', excluirChamadoController);

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, DELETE, OPTIONS');
    res.status(204).send();
});

export default router;