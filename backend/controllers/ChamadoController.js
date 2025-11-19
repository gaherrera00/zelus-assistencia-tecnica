import { listarChamados, obterChamadoPorId, criarChamado, excluirChamado } from "../models/chamado.js";
import { read, deleteRecord } from '../config/database.js';

export const listarChamadosController = async (req, res) => {
    try {
        // Verificar se o usuário está autenticado
        if (!req.user) return res.status(400).json({ mensagem: 'Usuário não autenticado' });

        const { funcao, id } = req.user;
        console.log(req.user);
        console.log(funcao);
        let chamados;

        if (funcao == 'aluno') {
            // Aluno: só vê seus próprios chamados
            chamados = await listarChamados(`criado_por = ${id}`);
        } 
        else if (funcao == 'tecnico') {
            // Técnico: pegar os pools que ele pertence
            const pools = await read('pool_tecnico', `id_tecnico = ${id}`);
            const poolIds = pools.map(p => p.id_pool);
            
            if (poolIds.length === 0) return res.status(200).json([]);
            
            chamados = await listarChamados(`id_pool IN (${poolIds.join(',')})`);
        } 
        else if (funcao == 'administrador') {
            chamados = await listarChamados();
        } 
        else {
            return res.status(403).json({ mensagem: `Função não autorizada: ${funcao}` });
        }

        res.status(200).json(chamados);
    } catch (err) {
        console.error('Erro ao listar chamados: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar chamados. ' });
    };
};

export const obterChamadoPorIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const chamado = await obterChamadoPorId(id);
        res.status(200).json(chamado);
    } catch (err) {
        console.error('Erro ao obter chamado por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter chamado por ID.' });
    }
};

export const criarChamadoController = async (req, res) => {
    try {
        const { nome, detalhes, id_pool } = req.body;

        // monta o objeto com os dados
        const chamadoData = {
            nome: nome ?? null,
            detalhes: detalhes ?? null,
            id_pool: id_pool ?? null,
            criado_por: req.user.id
        };
        console.log(chamadoData);

        const chamadoId = await criarChamado(chamadoData);
        res.status(201).json({ mensagem: 'Chamado criado com sucesso.', chamadoId });
    } catch (err) {
        console.error('Erro ao criar chamado: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar chamado.' });
    }
};

export const excluirChamadoController = async (req, res) => {
    try {
        // Verificar se o usuário está autenticado
        if (!req.user) {
            return res.status(401).json({ mensagem: 'Usuário não autenticado' });
        }

        // Verificar se o usuário é administrador
        if (req.user.funcao !== 'administrador') {
            return res.status(403).json({ mensagem: 'Apenas administradores podem excluir chamados' });
        }

        const chamadoId = req.params.id;

        // Verificar se o chamado existe
        const chamadoResults = await read('chamados', `id_chamado = ${chamadoId}`);
        const chamado = Array.isArray(chamadoResults) ? chamadoResults[0] : chamadoResults;
        
        if (!chamado) {
            return res.status(404).json({ mensagem: 'Chamado não encontrado' });
        }

        // Verificar se o chamado está em andamento
        if (chamado.status !== 'em andamento') {
            return res.status(400).json({ mensagem: 'Apenas chamados em andamento podem ser excluídos' });
        }

        // Primeiro, excluir todos os apontamentos relacionados ao chamado
        await deleteRecord('apontamentos', `chamado_id = ${chamadoId}`);

        // Depois, excluir o chamado
        await excluirChamado(chamadoId);

        res.status(200).json({ mensagem: 'Chamado excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir chamado: ', err);
        res.status(500).json({ mensagem: 'Erro ao excluir chamado.' });
    }
};