var database = require("../config/database");

function listar() {
  var instrucaoSql = `SELECT idEmpresa, nomeFantasia, cnpj, tamanhoEmpresa, qtdHectares, statusCadastro, dtCriacao, dtSaida, fkEmpresa_EmpresaSede FROM empresa`;

  return database.executar(instrucaoSql);
}

function cadastrarEmpresa(NomeFantasia, cnpj, TamanhoEmpresa, QuantidadeHectare, StatusCadastro, DataCriacao) {
  var instrucaoSql = `INSERT INTO empresa (nomeFantasia, cnpj, tamanhoEmpresa, qtdHectares, statusCadastro, dtCriacao) VALUES ('${NomeFantasia}', '${cnpj}', '${TamanhoEmpresa}', '${QuantidadeHectare}', '${StatusCadastro}', '${DataCriacao}');`;

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

module.exports = { cadastrarEmpresa, cadastrarEndereco, listar, buscarId };
