// Função para gerar RA (Registro Acadêmico)
export function gerarRA(nome, dataInicio, dataFim) {
  // Remove espaços e converte para maiúsculo
  const nomeProcessado = nome.replace(/\s+/g, '').toUpperCase();
  
  // Pega as 3 primeiras letras do nome
  const iniciais = nomeProcessado.substring(0, 3);
  
  // Extrai ano da data de início
  const anoInicio = new Date(dataInicio).getFullYear().toString().substring(2);
  
  // Extrai ano da data de fim
  const anoFim = new Date(dataFim).getFullYear().toString().substring(2);
  
  // Gera números aleatórios para completar
  const numeroAleatorio = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${iniciais}${anoInicio}${anoFim}${numeroAleatorio}`;
}

// Função para gerar senha aleatória
export function gerarSenha(tamanho = 6) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let senha = '';
  
  for (let i = 0; i < tamanho; i++) {
    senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  
  return senha;
}
