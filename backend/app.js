import 'dotenv/config';
import express from 'express';
const app = express();
import cors from 'cors';
const port = process.env.PORT || 3001;

import chamadoRotas from './routes/chamadoRotas.js';
import apontamentoRotas from './routes/apontamentoRotas.js';
import usuarioRotas from './routes/usuarioRotas.js';
import authMiddleware from './middlewares/authMiddleware.js';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(201).send('<h1> API de Chamados.</h1>')
});

app.use('/chamado',authMiddleware, chamadoRotas);
app.use('/apontamento',authMiddleware, apontamentoRotas);
app.use('/usuario', usuarioRotas)

app.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, OPTIONS');
  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${3001}`);
});