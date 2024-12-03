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

function buscarQTDFunc(){
    
    var instrucaoSql = `SELECT COUNT(idUsuario) as usuariosAtivos FROM usuario WHERE statusUsuario = 'ativo';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function buscarQuantidadeSensores() {

    var instrucaoSql = `SELECT * from sensor;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarEmpresasAtivas,
    buscarEnderecoEstado,
    buscarQTDFunc,
    buscarQuantidadeSensores
}
