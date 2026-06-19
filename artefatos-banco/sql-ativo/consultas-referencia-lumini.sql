USE lumini;

-- Grafico 1, pagina geral
SELECT min(filtragemDados.qtdHorasLuz), talhao.numero
	FROM filtragemDados
	JOIN dadosSensor
		ON idFiltragemDados = fkDadosSensor_FiltragemDados
	JOIN sensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN talhao
		ON idTalhao = fkSensor_Talhao
	WHERE filtragemDados.dia = '2024-12-03' AND talhao.fkTalhao_Empresa = '2'
    GROUP BY talhao.numero;

-- Grafico 2, pagina geral
SELECT talhao.numero, filtragemDados.statusDia, filtragemDados.qtdHorasLuz, filtragemDados.dia FROM talhao
	JOIN sensor
		ON talhao.idTalhao = sensor.fkSensor_Talhao
	JOIN dadosSensor
		ON sensor.idSensor = dadosSensor.fkDadosSensor_Sensor
	JOIN filtragemDados
		ON dadosSensor.fkDadosSensor_FiltragemDados = filtragemDados.idFiltragemDados
	WHERE filtragemDados.statusDia = 'Insuficiente' OR filtragemDados.statusDia = 'Excesso' AND filtragemDados.dia = '2024-12-03';

-- Gráfico 3, pagina geral
SELECT talhao.numero, dadosSensor.statusLuminosidade FROM talhao
	JOIN sensor
		ON idTalhao = fkSensor_Talhao
	JOIN dadosSensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN filtragemDados
		ON fkDadosSensor_FiltragemDados = idFiltragemDados
	WHERE (dadosSensor.statusLuminosidade = 'Insuficiente' OR dadosSensor.statusLuminosidade = 'Excesso') AND filtragemDados.dia = '2024-12-03';

-- Grafico 1, pagina talhao
SELECT filtragemDados.qtdHorasLuz, sensor.idSensor
	FROM filtragemDados
	JOIN dadosSensor
		ON idFiltragemDados = fkDadosSensor_FiltragemDados
	JOIN sensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN talhao
		ON idTalhao = fkSensor_Talhao
	WHERE filtragemDados.dia = '2024-12-03' AND talhao.fkTalhao_Empresa = '2' AND talhao.numero = '2';

-- Gráfico 2, pagina talhao
SELECT sensor.idSensor, filtragemDados.statusDia, filtragemDados.qtdHorasLuz, dia FROM sensor
	JOIN dadosSensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN filtragemDados
		ON fkDadosSensor_FiltragemDados = idFiltragemDados
	WHERE filtragemDados.dia = '2024-12-03';

-- Gráfico 3, pagina talhao
SELECT sensor.idSensor, dadosSensor.statusLuminosidade FROM talhao
	JOIN sensor
		ON idTalhao = fkSensor_Talhao
	JOIN dadosSensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN filtragemDados
		ON fkDadosSensor_FiltragemDados = idFiltragemDados
	WHERE (dadosSensor.statusLuminosidade = 'Insuficiente' OR dadosSensor.statusLuminosidade = 'Excesso')
		AND filtragemDados.dia = '2024-12-03'
        AND talhao.numero = '1';

-- Gráfico 2, pagina sensor
SELECT filtragemDados.qtdHorasLuz, filtragemDados.dia
	FROM filtragemDados
	JOIN dadosSensor
		ON idFiltragemDados = fkDadosSensor_FiltragemDados
	JOIN sensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN talhao
		ON idTalhao = fkSensor_Talhao
	WHERE idSensor = 10000
    ORDER BY filtragemDados.dia DESC
	LIMIT 14;

SELECT sensor.idSensor, statusFuncionamento
    FROM filtragemDados
    JOIN dadosSensor
        ON idFiltragemDados = fkDadosSensor_FiltragemDados
    JOIN sensor
        ON idSensor = fkDadosSensor_Sensor
    JOIN talhao
        ON idTalhao = fkSensor_Talhao
    WHERE talhao.fkTalhao_Empresa = '2' AND talhao.numero = '2';

SELECT sensor.idSensor, dadosSensor.qtdLuz, dadosSensor.statusLuminosidade, dadosSensor.momentoCaptura FROM filtragemDados
    JOIN dadosSensor
        ON idFiltragemDados = fkDadosSensor_FiltragemDados
    JOIN sensor
        ON idSensor = fkDadosSensor_Sensor
    JOIN talhao
        ON idTalhao = fkSensor_Talhao
    WHERE filtragemDados.dia = '2024-12-03' AND talhao.fkTalhao_Empresa = '2' AND dadosSensor.alerta = 'sim' AND talhao.numero = '4';
