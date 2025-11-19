# Zelus Assistência Técnica 🔧

Website interativo e responsivo desenvolvido com foco em **experiência do usuário (UX)**.  
Apresenta soluções de hardware e software organizadas por categorias.

## Funcionalidades
- Seções interativas com erros comuns e soluções rápidas
- Layout responsivo e otimizado para navegação móvel
- Conteúdo categorizado por área técnica (Windows, Linux, Hardware)

## Tecnologias
- React
- Next.js
- Tailwind CSS

## Objetivo
Demonstrar design centrado no usuário e uso de componentes reutilizáveis.


## 🚀 Como Executar
### Pré-requisitos

- Node.js (versão 18 ou superior)
- MySQL (versão 8.0 ou superior)
- npm ou yarn

### 1. Configurar o Banco de Dados

1. Execute o script SQL em `bd/init.sql` no seu MySQL
2. Configure as credenciais do banco criando um arquivo `.env` na pasta `backend/`:

```bash
# backend/.env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=zelos
DB_PORT=3306
JWT_SECRET=sua_chave_secreta_aqui
PORT=3001
```

### 2. Executar o Backend

```bash
cd backend
npm install
npm start
```

O backend estará rodando em `http://localhost:3001`

### 3. Executar o Frontend

```bash
cd meu-projeto
npm install
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
├── backend/                 # API Node.js/Express
│   ├── controllers/        # Controladores das rotas
│   ├── models/            # Modelos de dados
│   ├── routes/            # Definição das rotas
│   ├── middlewares/       # Middlewares (autenticação)
│   ├── config/            # Configurações (banco, JWT)
│   └── app.js             # Arquivo principal do servidor
├── meu-projeto/           # Frontend Next.js
│   ├── app/               # Páginas da aplicação
│   ├── components/        # Componentes reutilizáveis
│   └── utils/             # Utilitários (API, auth)
└── bd/                    # Scripts do banco de dados
```

## 🔐 Funcionalidades

- **Autenticação**: Login e cadastro de usuários
- **Chamados**: Criação e gerenciamento de chamados técnicos
- **Patrimônio**: Controle de equipamentos e mobiliário
- **Pool**: Gerenciamento de equipes técnicas
- **Apontamentos**: Registro de tempo de trabalho

## 👥 Tipos de Usuário

- **Aluno**: Pode criar e visualizar seus próprios chamados
- **Técnico**: Acesso completo aos chamados e funcionalidades técnicas
- **Administrador**: Acesso administrativo ao sistema

## 📝 Notas Importantes

- O backend deve estar rodando para o frontend funcionar
- As senhas são hasheadas com bcrypt antes de serem salvas
- O sistema usa JWT para autenticação com expiração de 1 hora
- Todas as rotas da API estão documentadas em `backend/routes/`
- **IMPORTANTE**: Altere a chave JWT_SECRET em produção

## 🔧 Solução de Problemas

### Backend não conecta ao banco

- Verifique se o MySQL está rodando
- Confirme as credenciais no arquivo `.env`
- Execute o script SQL para criar o banco e tabelas

### Frontend não carrega dados

- Verifique se o backend está rodando na porta 3001
- Confirme se o CORS está configurado corretamente
- Verifique o console do navegador para erros

### Erro de autenticação

- Verifique se o token JWT está sendo enviado corretamente
- Confirme se a chave JWT_SECRET está configurada
- Verifique se o usuário existe no banco de dados
