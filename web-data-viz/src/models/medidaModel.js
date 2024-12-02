var database = require("../database/config");

// INÍCIO DAS ROTAS DA TELA TALHÃO GERAL
function horasLuz(idEmpresa, dataAnteriorCompleta) {

    var instrucaoSql = `SELECT min(filtragemDados.qtdHorasLuz) as qtdHoras, talhao.numero as numTalhao, idTalhao 
	FROM filtragemDados 
	JOIN dadosSensor 
		ON idFiltragemDados = fkDadosSensor_FiltragemDados 
	JOIN sensor 
		ON idSensor = fkDadosSensor_Sensor 
	JOIN talhao 
		ON idTalhao = fkSensor_Talhao 
	WHERE filtragemDados.dia = '${dataAnteriorCompleta}' AND talhao.fkTalhao_Empresa = ${idEmpresa}
    GROUP BY talhao.numero, idTalhao;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function qtdAlertasTalhao(idEmpresa, dataAnteriorCompleta) {

    var instrucaoSql = `SELECT talhao.numero, dadosSensor.statusLuminosidade FROM talhao
	JOIN sensor
		ON idTalhao = fkSensor_Talhao
	JOIN dadosSensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN filtragemDados
		ON fkDadosSensor_FiltragemDados = idFiltragemDados
	WHERE (dadosSensor.statusLuminosidade = 'Insuficiente' OR dadosSensor.statusLuminosidade = 'Excesso') AND filtragemDados.dia = '${dataAnteriorCompleta}' AND talhao.fkTalhao_Empresa = ${idEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function historicoAlertas(idEmpresa, dataAnteriorCompleta) {

    var instrucaoSql = `SELECT talhao.numero, filtragemDados.statusDia, filtragemDados.qtdHorasLuz, filtragemDados.dia FROM talhao
	JOIN sensor
		ON talhao.idTalhao = sensor.fkSensor_Talhao
	JOIN dadosSensor
		ON sensor.idSensor = dadosSensor.fkDadosSensor_Sensor
	JOIN filtragemDados
		ON dadosSensor.fkDadosSensor_FiltragemDados = filtragemDados.idFiltragemDados
	WHERE filtragemDados.statusDia = 'Insuficiente' OR filtragemDados.statusDia = 'Excesso' AND filtragemDados.dia = '${dataAnteriorCompleta}' AND fkTalhao_Empresa = ${idEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
// FIM DAS ROTAS DA TELA TALHÃO GERAL


// INÍCIO DAS ROTAS DA TELA TALHÃO SENSOR
function qtdLuzSensor(idEmpresa, idTalhao, dataAnteriorCompleta) {

    var instrucaoSql = `SELECT filtragemDados.qtdHorasLuz, sensor.idSensor, talhao.numero
	FROM filtragemDados
	JOIN dadosSensor
		ON idFiltragemDados = fkDadosSensor_FiltragemDados
	JOIN sensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN talhao
		ON idTalhao = fkSensor_Talhao
	WHERE filtragemDados.dia = '${dataAnteriorCompleta}' AND talhao.fkTalhao_Empresa = ${idEmpresa} AND talhao.idTalhao = ${idTalhao};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function statusSensor(idEmpresa, idTalhao) {

    var instrucaoSql = `SELECT distinct(sensor.idSensor), statusFuncionamento
    FROM sensor
    JOIN dadosSensor
        ON idSensor = fkDadosSensor_Sensor
    JOIN filtragemDados
        ON idFiltragemDados = fkDadosSensor_FiltragemDados
    JOIN talhao
        ON idTalhao = fkSensor_Talhao
    WHERE talhao.fkTalhao_Empresa = ${idEmpresa} AND talhao.idTalhao = '${idTalhao}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function historicoAlertasSensor(idEmpresa, idTalhao, dataAnteriorCompleta) {

    var instrucaoSql = `SELECT sensor.idSensor, dadosSensor.qtdLuz, dadosSensor.statusLuminosidade, dadosSensor.momentoCaptura FROM filtragemDados 
    JOIN dadosSensor
        ON idFiltragemDados = fkDadosSensor_FiltragemDados 
    JOIN sensor 
        ON idSensor = fkDadosSensor_Sensor 
    JOIN talhao 
        ON idTalhao = fkSensor_Talhao
    WHERE filtragemDados.dia = '${dataAnteriorCompleta}' AND talhao.fkTalhao_Empresa = ${idEmpresa} AND dadosSensor.alerta = 'sim' AND talhao.idTalhao = '${idTalhao}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
// FIM DAS ROTAS DA TELA TALHÃO SENSOR


// INÍCIO DAS ROTAS DA TELA SENSOR 
function luminosidadeSensor(idSensor) {

    var instrucaoSql = `SELECT filtragemDados.qtdHorasLuz, filtragemDados.dia 
	FROM filtragemDados 
	JOIN dadosSensor
		ON idFiltragemDados = fkDadosSensor_FiltragemDados
	JOIN sensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN talhao
		ON idTalhao = fkSensor_Talhao
	WHERE idSensor = ${idSensor}
    ORDER BY filtragemDados.dia DESC
	LIMIT 14;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function historicoAlertasSensorEspecifico(idSensor, dataAnteriorCompleta, idTalhao) {

    var instrucaoSql = `SELECT sensor.idSensor, dadosSensor.qtdLuz, dadosSensor.statusLuminosidade, dadosSensor.momentoCaptura FROM filtragemDados 
    JOIN dadosSensor
        ON idFiltragemDados = fkDadosSensor_FiltragemDados 
    JOIN sensor 
        ON idSensor = fkDadosSensor_Sensor 
    JOIN talhao 
        ON idTalhao = fkSensor_Talhao
    WHERE filtragemDados.dia = '${dataAnteriorCompleta}' AND dadosSensor.alerta = 'sim' AND talhao.idTalhao = ${idTalhao} AND sensor.idSensor = ${idSensor};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function luminosidadePorHora(idSensor, dataAnteriorCompleta) {

    var instrucaoSql = `SELECT DISTINCT HOUR(momentoCaptura) AS hora, ROUND(AVG(dadosSensor.qtdLuz), 0) AS qtdLuz
    FROM filtragemDados 
    JOIN dadosSensor 
        ON idFiltragemDados = fkDadosSensor_FiltragemDados 
    JOIN sensor 
        ON idSensor = fkDadosSensor_Sensor 
    JOIN talhao 
        ON idTalhao = fkSensor_Talhao 
    WHERE filtragemDados.dia = '${dataAnteriorCompleta}' AND sensor.idSensor = ${idSensor}
    GROUP BY HOUR(momentoCaptura)
    ORDER BY hora ASC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
// FIM DAS ROTAS DA TELA SENSOR 
 
module.exports = {
    horasLuz,
	qtdAlertasTalhao,
	historicoAlertas,
	qtdLuzSensor,
	statusSensor,
	historicoAlertasSensor,
	luminosidadeSensor,
	historicoAlertasSensorEspecifico,
    luminosidadePorHora
}
