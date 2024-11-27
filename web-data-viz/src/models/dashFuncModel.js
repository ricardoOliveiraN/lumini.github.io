var database = require("../database/config");



function buscarEmpresasAtivas() {

    var instrucaoSql = `SELECT COUNT(idEmpresa) FROM Empresa;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarEnderecoEstado(Estado) {

    var instrucaoSql = `SELECT COUNT(*) FROM empresa JOIN endereco ON fkEmpresa_Endereco = idendereco WHERE uf = '${Estado}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarQTDFunc(){
    
    var instrucaoSql = `SELECT COUNT(idUsuario) FROM usuario;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}



module.exports = {
    buscarEmpresasAtivas,
    buscarEnderecoEstado,
    buscarQTDFunc
}
