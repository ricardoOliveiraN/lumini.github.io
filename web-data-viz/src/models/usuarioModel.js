var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, fkUsuario_Empresa, nome, email, senha, telefone, tipoUsuario, usuarioValidado FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(fkEmpresa, nome, email, senha, telefone, tipo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, telefone, tipo);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (idUsuario, fkUsuario_Empresa, nome, email, senha, telefone, tipoUsuario) VALUES (default, '${fkEmpresa}','${nome}', '${email}', '${senha}', '${telefone}', '${tipo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function attSenhaUser(Senha, idUser) {
    
    var instrucaoSql = `
        UPDATE usuario SET senha = '${Senha}' and usuarioValidado = 'sim' WHERE idUsuario = ${idUser};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function selecionarDadosUser(idUser) {

    var instrucaoSql = `
       select tipoUsuario as cargo, nomeFantasia as nomeEmpresa FROM usuario JOIN empresa ON fkUsuario_Empresa = idEmpresa WHERE idUsuario = ${idUser};;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    selecionarDadosUser,
    attSenhaUser
};