var database = require("../database/config");

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

module.exports = {
    horasLuz,
	qtdAlertasTalhao
}
