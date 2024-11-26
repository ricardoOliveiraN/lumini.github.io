var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function cadastrarEmpresa(NomeFantasia, cnpj, TamanhoEmpresa, QuantidadeHectare, StatusCadastro, DataCriacao,fkEmpresaEndereco) {
  var instrucaoSql = `INSERT INTO empresa (nomeFantasia, cnpj, tamanhoEmpresa, qtdHectares, statusCadastro, dtCriacao, fkEmpresa_Endereco) VALUES ('${NomeFantasia}', '${cnpj}', '${TamanhoEmpresa}', '${QuantidadeHectare}', '${StatusCadastro}', '${DataCriacao}', '${fkEmpresaEndereco}') `;

  return database.executar(instrucaoSql);
}

function cadastrarEndereco(cep, uf, cidade, logradouro, numero, complemento) {
  var instrucaoSql = `INSERT INTO endereco (cep, uf, cidade, logradouro, numero, complemento) VALUES ('${cep}', '${uf}', '${cidade}', '${logradouro}', '${numero}', '${complemento}')`;

  return database.executar(instrucaoSql);
}

module.exports = { cadastrarEmpresa, buscarPorId, cadastrarEndereco, listar };
