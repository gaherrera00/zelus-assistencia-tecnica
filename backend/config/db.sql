CREATE DATABASE IF NOT EXISTS zelos; USE zelos; drop database zelos;
 -- ========================= -- Tabela usuarios -- =========================
CREATE TABLE usuarios ( 
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL, 
    senha VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    funcao VARCHAR(100) NOT NULL, 
    status ENUM('ativo', 'inativo') DEFAULT 'ativo', 
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
); 

-- ========================= -- Tabela pool -- ========================= 
CREATE TABLE pool ( 
    id_pool INT AUTO_INCREMENT PRIMARY KEY, 
    titulo ENUM('externo', 'manutencao', 'apoio_tecnico', 'limpeza') NOT NULL, 
    descricao TEXT, status ENUM('ativo', 'inativo') DEFAULT 'ativo', 
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP, atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    created_by INT, 
    updated_by INT, 
    FOREIGN KEY (created_by) REFERENCES usuarios(id_usuario) ON DELETE CASCADE, 
    FOREIGN KEY (updated_by) REFERENCES usuarios(id_usuario) ON DELETE CASCADE 
); 

-- Inserindo pools iniciais 
INSERT INTO pool (titulo, descricao) 
VALUES 
('externo', 'Pool de chamados para problemas de conectividade, acesso a sistemas de terceiros ou serviços externos, como internet.'), 
('manutencao', 'Pool de chamados para tarefas de manutenção preventiva ou corretiva de hardware e software, como troca de peças ou atualização de sistemas.'), 
('apoio_tecnico', 'Pool de chamados para solicitações de suporte técnico geral, incluindo dúvidas sobre o uso de softwares, configuração de e-mail e outros pequenos ajustes.'), 
('limpeza', 'Pool de chamados para solicitações de limpeza e organização de equipamentos de TI, como computadores, impressoras e servidores.'); 

-- ========================= -- Tabela pool_tecnico -- ========================= 
CREATE TABLE pool_tecnico ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    id_pool INT, id_tecnico INT, 
    FOREIGN KEY (id_pool) REFERENCES pool(id_pool) ON DELETE CASCADE, 
    FOREIGN KEY (id_tecnico) REFERENCES usuarios(id_usuario) ON DELETE CASCADE 
); 

-- ========================= -- Tabela chamados -- ========================= 
CREATE TABLE chamados ( 
    id_chamado INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL, detalhes TEXT, 
    comeco TIMESTAMP NOT NULL DEFAULT NOW(), 
    fim TIMESTAMP NULL, 
    duracao INT AS (TIMESTAMPDIFF(SECOND, comeco, fim)) STORED, 
    status ENUM('pendente', 'em andamento', 'concluído') DEFAULT 'pendente', 
    id_pool INT NOT NULL, 
    criado_por INT NOT NULL, 
    id_tecnico INT NULL, 
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    FOREIGN KEY (id_pool) REFERENCES pool(id_pool) ON DELETE CASCADE, 
    FOREIGN KEY (criado_por) REFERENCES usuarios(id_usuario) ON DELETE CASCADE, 
    FOREIGN KEY (id_tecnico) REFERENCES usuarios(id_usuario) ON DELETE SET NULL 
); 

-- ========================= -- Tabela apontamentos -- ========================= 
CREATE TABLE apontamentos ( 
    id_apontamentos INT AUTO_INCREMENT PRIMARY KEY, 
    id_chamado INT NOT NULL, 
    id_tecnico INT NOT NULL, 
    descricao TEXT, 
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (id_chamado) REFERENCES chamados(id_chamado) ON DELETE CASCADE,
    FOREIGN KEY (id_tecnico) REFERENCES usuarios(id_usuario) ON DELETE CASCADE 
);