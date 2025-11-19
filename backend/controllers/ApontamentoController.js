import { listarApontamentos, obterApontamentoPorId, criarApontamento } from '../models/apontamentos.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';

export const listarApontamentosController = async (req, res) => {
    try {
        const apontamentos = await listarApontamentos();
        res.status(200).json(apontamentos);
    } catch (err) {
        console.error('Erro ao listar apontamentos: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar apontamentos.' });
    }
};

export const obterApontamentoPorIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const apontamentos = await obterApontamentoPorId(id);
        res.status(200).json(apontamentos);
    } catch (err) {
        console.error('Erro ao obter apontamentos por Id: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter apontamentos por Id.' });
    }
};

export const criarApontamentoController = async (req, res) => {
    try {
        const { descricao } = req.body;
        const id_chamado = req.params.id_chamado;
        const id_tecnico = req.user.id;

        const apontamentoData = {
            id_chamado: id_chamado,
            id_tecnico: id_tecnico,
            descricao: descricao
        }

        const apontamentoId = await criarApontamento(apontamentoData);
        res.status(201).json({ mensagem: "Apontamento criado com sucesso.", apontamentoId });

    //     const apontamentoId = await criarApontamento(apontamentoData);

    // // 5) Recupera o apontamento recém-criado
    // const apontamento = await obterApontamentoPorId(apontamentoId);

    // // 6) Gera o PDF com os dados do apontamento
    // const doc = new PDFDocument({ margin: 30 });

    // // Configura headers para download
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', `attachment; filename=apontamento_${apontamentoId}.pdf`);

    // doc.pipe(res);

    // doc.fontSize(18).text('Relatório de Apontamento', { align: 'center' });
    // doc.moveDown();

    // doc.fontSize(14).text(`ID do Apontamento: ${apontamento.id_apontamentos}`);
    // doc.text(`ID do Chamado: ${apontamento.id_chamado}`);
    // doc.text(`ID do Técnico: ${apontamento.id_tecnico}`);
    // doc.moveDown(0.5);

    // doc.fontSize(14).text(`Descrição: ${apontamento.descricao}`);
    // doc.text(`Início: ${apontamento.comeco}`);
    // doc.text(`Fim: ${apontamento.fim}`);
    // if (apontamento.duracao) doc.text(`Duração (s): ${apontamento.duracao}`);
    // if (apontamento.criado_em) doc.text(`Criado em: ${apontamento.criado_em}`);

    // doc.end();
    } catch (err) {
        console.error('Erro ao criar apontamentos: ', err);
        res.status(500).json({ mensagem: 'Erro ao criar apontamentos.' });
    }
};