var database = require("../database/config");



function buscarEmpresasAtivas() {

    var instrucaoSql = `SELECT COUNT(idEmpresa) FROM Empresa;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarEmpresasCnpj(cnpj) {

    var instrucaoSql = `SELECT idEmpresa FROM empresa WHERE cnpj = '${cnpj}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarQTDFunc(idEmpresa){
    
    var instrucaoSql = `SELECT COUNT(idUsuario) FROM usuario WHERE fkUsuario_Empresa = '${idEmpresa}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}



module.exports = {
    buscarEmpresasAtivas,
    buscarEmpresasCnpj,
    buscarQTDFunc
}
