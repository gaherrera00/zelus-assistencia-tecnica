import express from 'express';
import { listarUsuariosController, obterUsuarioPorIdController, excluirUsuarioController, loginController, cadastroController, createTechnicianController, atualizarStatusUsuarioController } from '../controllers/UsuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, listarUsuariosController);
router.get('/:id', authMiddleware, obterUsuarioPorIdController);

router.post('/login', loginController);
router.post('/cadastro', cadastroController);
router.post('/createTechnician', authMiddleware, createTechnicianController);

router.delete('/:id', authMiddleware, excluirUsuarioController);

router.patch("/status/:id", authMiddleware, atualizarStatusUsuarioController);

router.options('/', (req, res) => {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).send();
});

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, DELETE, OPTIONS');
    res.status(204).send();
});

export default router;