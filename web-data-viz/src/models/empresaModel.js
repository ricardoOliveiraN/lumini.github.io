var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function cadastrarEmpresa(NomeFantasia, cnpj, TamanhoEmpresa, QuantidadeHectare, StatusCadastro, DataCriacao) {
  var instrucaoSql = `INSERT INTO empresa (nomeFantasia, cnpj, tamanhoEmpresa, qtdHectares, dtCriacao) VALUES ('${NomeFantasia}', '${cnpj}', '${TamanhoEmpresa}', '${QuantidadeHectare}', '${DataCriacao}') `;

  return database.executar(instrucaoSql);
}

function cadastrarEndereco(cep, uf, cidade, logradouro, numero, complemento, fkEmpresa) {
  var instrucaoSql = `INSERT INTO endereco (cep, uf, cidade, logradouro, numero, complemento, fkEndereco_Empresa) VALUES ('${cep}', '${uf}', '${cidade}', '${logradouro}', '${numero}', '${complemento}', '${fkEmpresa}')`;

  return database.executar(instrucaoSql);
}

function buscarId(cnpj) {
  var instrucaoSql = `SELECT idEmpresa FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}




module.exports = { cadastrarEmpresa, buscarPorId, cadastrarEndereco, listar, buscarId };
