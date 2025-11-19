import express from 'express';
import { listarApontamentosController, obterApontamentoPorIdController, criarApontamentoController } from '../controllers/ApontamentoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', listarApontamentosController);
router.get('/:id', obterApontamentoPorIdController);

router.post("/chamados/:id_chamado", authMiddleware, criarApontamentoController);

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, DELETE, OPTIONS');
    res.status(204).send();
});

export default router;