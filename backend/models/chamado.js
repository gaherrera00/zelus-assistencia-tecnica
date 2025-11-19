import { create, readAll, read, deleteRecord } from '../config/database.js';

export const listarChamados = async (where = null) => {
  try {
    if (where !== null){
      return await readAll('chamados', where)
    }
    return await readAll('chamados');
  } catch (error) {
    console.error('Erro ao listar chamados:', error);
    throw error;
  }
};

export const obterChamadoPorId = async (id) => {
  try {
    return await read('chamados', `id_chamado = ${id}`);
  } catch (error) {
    console.error('Erro ao obter chamado por ID:', error);
    throw error;
  }
};

export const criarChamado = async (chamadoData) => {
  try {
    return await create('chamados', chamadoData);
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    throw error;
  }
};     

export const excluirChamado = async (id) => {
  try {
    await deleteRecord('chamados', `id_chamado = ${id}`);
  } catch (error) {
    console.error('Erro ao excluir chamado:', error);
    throw error;
  }
};