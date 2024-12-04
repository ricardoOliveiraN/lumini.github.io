var database = require("../database/config");

// INÍCIO DAS ROTAS DA TELA TALHÃO GERAL
function listarFunc(fkEmpresa) {

    var instrucaoSql = `SELECT idUsuario, tipoUsuario, nome, email, telefone FROM usuario WHERE fkUsuario_Empresa = ${fkEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
// FIM DAS ROTAS DA TELA SENSOR 
 
module.exports = {
    listarFunc
}
