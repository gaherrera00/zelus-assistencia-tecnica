import { listarUsuarios, obterUsuarioPorId, criarUsuario, excluirUsuario, createTechnician } from "../models/usuarios.js";
import { read, update, compare } from "../config/database.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

export const listarUsuariosController = async (req, res) => {
    try {
        const usuarios = await listarUsuarios();
        res.status(200).json(usuarios);
    } catch (err) {
        console.error('Erro ao listar usuarios: ', err);
        res.status(500).json({ mensagem: 'Erro ao listar usuarios. '});
    };
};

export const obterUsuarioPorIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await obterUsuarioPorId(id);
        res.status(200).json(usuario);
    } catch (err) {
        console.error('Erro ao obter usuario por ID: ', err);
        res.status(500).json({ mensagem: 'Erro ao obter usuario por ID.' });
    }
};

export const cadastroController = async (req, res) => {
  const { nome, email, senha, funcao } = req.body;
  try {
  //Validação do email
  const emailRegex = /^[\w.-]+@(gmail|hotmail|outlook|exemplo)\.com$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ mensagem: "O email é inválido. Por favor, use @gmail, @hotmail, @outlook ou @exemplo." });
  }

  const usuario = await read('usuarios', `email = '${email}'`);

  if (usuario) {
    return res.status(400).json({ mensagem: 'Email já cadastrado!' })
  }

  //Validação da função
  const verificarFuncao = ['aluno', 'tecnico', 'administrador'];

  if (!verificarFuncao.includes(funcao)) {
    return res.status(400).json({ mensagem: 'Esta função não existe.' })
  }
  
// Validação da senha
if (!senha || senha.length < 6 || senha.length > 8) {
  return res.status(400).json({ mensagem: 'A senha deve ter entre 6 e 8 caracteres.' });
}

// Verifica se contém pelo menos um número
if (!/\d/.test(senha)) {
  return res.status(400).json({ mensagem: 'A senha deve conter pelo menos um número.' });
}

  const cadastroData = {
    nome: nome,
    email: email,
    senha: senha,
    funcao: funcao
  };
    
    // Validação da senha
    if (!senha || senha.length < 6 || senha.length > 8) {
      return res.status(400).json({ mensagem: 'A senha deve ter entre 6 e 8 caracteres.' });
    }

    // Verifica se contém pelo menos um número
    if (!/\d/.test(senha)) {
      return res.status(400).json({ mensagem: 'A senha deve conter pelo menos um número.' });
    }
      
    const cadastroId = await criarUsuario(cadastroData);         
    res.status(201).json({ mensagem: 'Cadastro realizado com sucesso.', cadastroId });
  } catch (err) {
    console.error("Erro ao cadastrar usuario: ", err);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuario." });
  }
};

export const loginController = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Validação básica dos campos
    if (!email || !senha) {
      return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }

    console.log("Tentativa de login para:", email);

    // Verificar se o usuário existe no banco de dados
    const usuario = await read("usuarios", `email = '${email}'`);
    
    console.log("Usuário encontrado:", usuario ? "Sim" : "Não");

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    // Verificar se o usuário está ativo
    if (usuario.status === 'inativo') {
      return res.status(403).json({ mensagem: "Usuário inativo. Entre em contato com o administrador." });
    }

    // Verificar se a senha está correta (comparar a senha enviada com o hash armazenado)
    const senhaCorreta = await compare(senha, usuario.senha);
    
    console.log("Senha correta:", senhaCorreta);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Senha ou email incorreto" });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        email: usuario.email,
        funcao: usuario.funcao
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Retornar dados do usuário (sem a senha) e o token
    const userData = {
      id: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
      funcao: usuario.funcao,
      status: usuario.status,
    };

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ mensagem: "Erro ao fazer login" });
  }
};

export const createTechnicianController = async (req, res) => {
  try {
    const { nome, email, senha, funcao, id_pool } = req.body;

    const emailRegex = /^[\w.-]+@(gmail|hotmail|outlook|exemplo)\.com$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ mensagem: "O email é inválido. Por favor, use @gmail, @hotmail, @outlook ou @exemplo." });
  }

  const usuario = await read('usuarios', `email = '${email}'`);

  if (usuario) {
    return res.status(400).json({ mensagem: 'Email já cadastrado!' })
  }

  //Validação da função
  const verificarFuncao = ['aluno', 'tecnico', 'administrador'];

  if (!verificarFuncao.includes(funcao)) {
    return res.status(400).json({ mensagem: 'Esta função não existe.' })
  }
  
// Validação da senha
if (!senha || senha.length < 6 || senha.length > 8) {
  return res.status(400).json({ mensagem: 'A senha deve ter entre 6 e 8 caracteres.' });
}

// Verifica se contém pelo menos um número
if (!/\d/.test(senha)) {
  return res.status(400).json({ mensagem: 'A senha deve conter pelo menos um número.' });
}

  const cadastroData = {
    nome: nome,
    email: email,
    senha: senha,
    funcao: funcao
  };
    
    // Validação da senha
    if (!senha || senha.length < 6 || senha.length > 8) {
      return res.status(400).json({ mensagem: 'A senha deve ter entre 6 e 8 caracteres.' });
    }

    // Verifica se contém pelo menos um número
    if (!/\d/.test(senha)) {
      return res.status(400).json({ mensagem: 'A senha deve conter pelo menos um número.' });
    }

    const criarTecnico = await createTechnician(cadastroData, id_pool);
    res.status(201).json({ mensagem: 'Tecnico criado com sucesso.', criarTecnico });
  } catch (err) {
    console.error('Erro ao criar tecnico: ', err);
    res.status(500).json({ mensagem: 'Erro ao criar tecnico.' });
  }
};

export const atualizarStatusUsuarioController = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const { status } = req.body;

    console.log(`Atualizando usuário ${usuarioId} para status: ${status}`);

    if (!["ativo", "inativo"].includes(status)) {
      return res.status(400).json({ mensagem: "Status inválido." });
    }

    // Supondo que você tenha uma função update no seu read
    await update("usuarios", { status }, `id_usuario = ${usuarioId}`);

    console.log(`Status do usuário ${usuarioId} atualizado com sucesso.`);
    res.status(200).json({ mensagem: "Status atualizado com sucesso.", status });
  } catch (err) {
    console.error("Erro ao atualizar status do usuário:", err);
    res.status(500).json({ mensagem: "Erro ao atualizar status do usuário." });
  }
};

export const excluirUsuarioController = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        await excluirUsuario(usuarioId);
        res.status(200).json({ mensagem: 'Usuario excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir usuario: ', err);
        res.status(500).json({ mensagem: 'Erro ao excluir usuario.' });
    }
};