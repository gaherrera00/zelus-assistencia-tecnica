import { create, readAll, read } from '../config/database.js';

export const listarApontamentos = async () => {
    try {
        return await readAll('apontamentos');
    } catch (err) {
        console.error('Erro ao listar apontamentos: ', error);
        throw err;
    }
};

export const obterApontamentoPorId = async (id) => {
    try {
        return await read('apontamentos', `id_apontamentos = ${id}`)
    } catch (err) {
        console.error('Erro ao obter apontamento por Id: ', error);
        throw err;
    }
};

export const criarApontamento = async (apontamentoData) => {
    try {
        return await create('apontamentos', apontamentoData);
    } catch (err) {
        console.error('Erro ao criar apontamento: ', err);
        throw err;
    }
};