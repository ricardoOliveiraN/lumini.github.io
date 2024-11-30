var database = require("../database/config");

// INÍCIO DAS ROTAS DA TELA TALHÃO GERAL
function horasLuz(idEmpresa) {

    var instrucaoSql = `SELECT min(filtragemDados.qtdHorasLuz) as qtdHoras, talhao.numero as numTalhao   
	FROM filtragemDados 
	JOIN dadosSensor 
		ON idFiltragemDados = fkDadosSensor_FiltragemDados 
	JOIN sensor 
		ON idSensor = fkDadosSensor_Sensor 
	JOIN talhao 
		ON idTalhao = fkSensor_Talhao 
	WHERE filtragemDados.dia = '2024-12-03' AND talhao.fkTalhao_Empresa = ${idEmpresa}
    GROUP BY talhao.numero;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function qtdAlertasTalhao(idEmpresa) {

    var instrucaoSql = `SELECT talhao.numero, dadosSensor.statusLuminosidade FROM talhao
	JOIN sensor
		ON idTalhao = fkSensor_Talhao
	JOIN dadosSensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN filtragemDados
		ON fkDadosSensor_FiltragemDados = idFiltragemDados
	WHERE (dadosSensor.statusLuminosidade = 'Insuficiente' OR dadosSensor.statusLuminosidade = 'Excesso') AND filtragemDados.dia = '2024-12-03' AND talhao.fkTalhao_Empresa = ${idEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function historicoAlertas(idEmpresa) {

    var instrucaoSql = `SELECT talhao.numero, filtragemDados.statusDia, filtragemDados.qtdHorasLuz, filtragemDados.dia FROM talhao
	JOIN sensor
		ON talhao.idTalhao = sensor.fkSensor_Talhao
	JOIN dadosSensor
		ON sensor.idSensor = dadosSensor.fkDadosSensor_Sensor
	JOIN filtragemDados
		ON dadosSensor.fkDadosSensor_FiltragemDados = filtragemDados.idFiltragemDados
	WHERE filtragemDados.statusDia = 'Insuficiente' OR filtragemDados.statusDia = 'Excesso' AND filtragemDados.dia = '2024-12-03' AND fkTalhao_Empresa = ${idEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
// FIM DAS ROTAS DA TELA TALHÃO GERAL


// INÍCIO DAS ROTAS DA TELA TALHÃO SENSOR
function qtdLuzSensor(idEmpresa) {

    var instrucaoSql = `SELECT filtragemDados.qtdHorasLuz, sensor.idSensor
	FROM filtragemDados
	JOIN dadosSensor
		ON idFiltragemDados = fkDadosSensor_FiltragemDados
	JOIN sensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN talhao
		ON idTalhao = fkSensor_Talhao
	WHERE filtragemDados.dia = '2024-12-03' AND talhao.fkTalhao_Empresa = ${idEmpresa} AND talhao.numero = '2';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function statusSensor(idEmpresa) {

    var instrucaoSql = `SELECT distinct(sensor.idSensor), statusFuncionamento
    FROM sensor
    JOIN dadosSensor
        ON idSensor = fkDadosSensor_Sensor
    JOIN filtragemDados
        ON idFiltragemDados = fkDadosSensor_FiltragemDados
    JOIN talhao
        ON idTalhao = fkSensor_Talhao
    WHERE talhao.fkTalhao_Empresa = ${idEmpresa} AND talhao.numero = '2';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function historicoAlertasSensor(idEmpresa) {

    var instrucaoSql = `SELECT sensor.idSensor, dadosSensor.qtdLuz, dadosSensor.statusLuminosidade, dadosSensor.momentoCaptura FROM filtragemDados 
    JOIN dadosSensor
        ON idFiltragemDados = fkDadosSensor_FiltragemDados 
    JOIN sensor 
        ON idSensor = fkDadosSensor_Sensor 
    JOIN talhao 
        ON idTalhao = fkSensor_Talhao
    WHERE filtragemDados.dia = '2024-12-03' AND talhao.fkTalhao_Empresa = ${idEmpresa} AND dadosSensor.alerta = 'sim' AND talhao.numero = '2';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
// FIM DAS ROTAS DA TELA TALHÃO SENSOR


// INÍCIO DAS ROTAS DA TELA SENSOR 
function luminosidadeSensor() {

    var instrucaoSql = `SELECT filtragemDados.qtdHorasLuz, filtragemDados.dia 
	FROM filtragemDados 
	JOIN dadosSensor
		ON idFiltragemDados = fkDadosSensor_FiltragemDados
	JOIN sensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN talhao
		ON idTalhao = fkSensor_Talhao
	WHERE idSensor = 10004
    ORDER BY filtragemDados.dia DESC
	LIMIT 14;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function historicoAlertasSensorEspecifico() {

    var instrucaoSql = `SELECT sensor.idSensor, dadosSensor.qtdLuz, dadosSensor.statusLuminosidade, dadosSensor.momentoCaptura FROM filtragemDados 
    JOIN dadosSensor
        ON idFiltragemDados = fkDadosSensor_FiltragemDados 
    JOIN sensor 
        ON idSensor = fkDadosSensor_Sensor 
    JOIN talhao 
        ON idTalhao = fkSensor_Talhao
    WHERE filtragemDados.dia = '2024-12-03' AND dadosSensor.alerta = 'sim' AND talhao.numero = '2' AND sensor.idSensor = 10004;`;

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
	historicoAlertasSensorEspecifico
}
