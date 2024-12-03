var database = require("../database/config");



function buscarEmpresasAtivas() {

    var instrucaoSql = `SELECT COUNT(idEmpresa) as empresasAtivas FROM empresa WHERE statusCadastro = 'ativo';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarEnderecoEstado() {

    var instrucaoSql = ` Select count(uf) as QuantidadeEmpresa, uf From endereco group by uf;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarQTDFunc() {

    var instrucaoSql = `SELECT COUNT(idUsuario) as usuariosAtivos FROM usuario WHERE statusUsuario = 'ativo';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function buscarQuantidadeSensores() {

    var instrucaoSql = `SELECT * from sensor;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function evolucaoEmpresas() {

    var instrucaoSql = `SELECT YEAR(dtCriacao) AS anoCriacao, COUNT(idEmpresa) AS quantidadeEmpresas
        FROM empresa
        GROUP BY YEAR(dtCriacao)
        ORDER BY anoCriacao;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function statusLuminosidade() {

    var instrucaoSql = `SELECT * FROM dadosSensor;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tamanhoEmpresa() {

    var instrucaoSql = `SELECT tamanhoEmpresa FROM empresa;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function qtdTalhoes() {

    var instrucaoSql = `SELECT qtdHectares FROM empresa;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarEmpresasAtivas,
    buscarEnderecoEstado,
    buscarQTDFunc,
    buscarQuantidadeSensores,
    evolucaoEmpresas,
    statusLuminosidade,
    tamanhoEmpresa,
    qtdTalhoes
}
