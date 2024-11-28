CREATE DATABASE lumini;

USE lumini;

CREATE TABLE empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeFantasia VARCHAR(45),
    cnpj VARCHAR(18) NOT NULL,
    tamanhoEmpresa VARCHAR(7),
		CONSTRAINT chkTamanhoEmpresa
		CHECK (tamanhoEmpresa IN('Pequeno', 'Médio', 'Grande')), 
        -- receita operacional em milhão -> pequena: 0,36 - 4,8; média: 4,8 - 300; grande: 300 e além
	qtdHectares INT,
    statusCadastro VARCHAR(7) NOT NULL,
		CONSTRAINT chkStatusCadastro
        CHECK (statusCadastro IN('ativo', 'inativo')),
	dtCriacao DATE,
	dtSaida DATE,
		CONSTRAINT chkDtSaida
        CHECK (dtSaida > dtCriacao OR dtSaida = null),
        -- data de criação deve ser obrigatoriamente antes que a data de inativação
	fkEmpresa_EmpresaSede INT,
		CONSTRAINT fkReEmpresa_EmpresaSede FOREIGN KEY (fkEmpresa_EmpresaSede)
		REFERENCES empresa(idEmpresa)
);

CREATE TABLE endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(9),
    uf CHAR(2),
		CONSTRAINT chkUF
        CHECK (uf IN(
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 
        'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SE', 'SP', 'TO')),
        -- checando para apenas estados brasileiros válidos
    cidade VARCHAR(45),
    logradouro VARCHAR(45),
    numero VARCHAR(8),
    complemento VARCHAR(45),
	fkEndereco_Empresa INT,
		CONSTRAINT fkReEndereco_Empresa
        FOREIGN KEY (fkEndereco_Empresa) 
        REFERENCES empresa (idEmpresa)
);

CREATE TABLE usuario (
	idUsuario INT,
	fkUsuario_Empresa INT,
    PRIMARY KEY (idUsuario, fkUsuario_Empresa),
    nome VARCHAR(45),
    senha VARCHAR (45) NOT NULL, -- criptografada
    email VARCHAR(45),
		CONSTRAINT chkEmail
		CHECK (email LIKE '%@%' AND email LIKE '%.%'),
        -- checando se o formato de email é válido
    telefone VARCHAR(16),
    tipoUsuario VARCHAR(13) NOT NULL,
		CONSTRAINT chkTipoUsuario
		CHECK (tipoUsuario IN('Administrador', 'Comum', 'Convidado')), /*
			permissionamento -> 
            responsável (pela empresa): adicionar/remover usuários, alterar filtros dos dash, visualizar dash;
			comum: alterar filtros dos dash, visualizar dash; 
            convidado (empresa terceira): visualizar dash; conta temporária */
	statusUsuario VARCHAR(7),
		CONSTRAINT chkStatusUsuario
        CHECK (statusUsuario IN('ativo', 'inativo')),
	dtCriacao DATE,
	dtExclusao DATE,
		CONSTRAINT chkDtExclusao
        CHECK (dtExclusao > dtCriacao OR dtExclusao = null),
        -- data de criação deve ser obrigatoriamente antes que a data de exclusão do usuário
		CONSTRAINT fkReUsuario_Empresa FOREIGN KEY (fkUsuario_Empresa)
		REFERENCES empresa(idEmpresa),
	usuarioValidado CHAR(3) DEFAULT 'nao',
    		CONSTRAINT chkUsuarioValidado
			CHECK (usuarioValidado IN('nao', 'sim'))
) AUTO_INCREMENT = 1000;

CREATE TABLE talhao (
	idTalhao INT PRIMARY KEY AUTO_INCREMENT,
    numero INT, -- para identificar os talhoes dentro de uma mesma empresa
    areaTalhao INT, -- em metros quadrados
    fkTalhao_Empresa INT,
		CONSTRAINT fkReTalhao_Empresa FOREIGN KEY (fkTalhao_Empresa)
		REFERENCES empresa(idEmpresa)
) AUTO_INCREMENT = 100;

CREATE TABLE sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
    statusFuncionamento VARCHAR(10) NOT NULL,
		CONSTRAINT chkStatusFuncionamento
		CHECK (statusFuncionamento IN('Ativo', 'Inativo', 'Manutenção')),
    dtInstalacao DATE,
    dtUltimaManutencao DATE,
		CONSTRAINT chkUltimaManutencao
        CHECK (dtUltimaManutencao >= dtInstalacao), 
        -- data da última manuntenção deve ser obrigatoriamente depois da data de instalação
    fkSensor_Talhao INT,
		CONSTRAINT fkReSensor_Talhao FOREIGN KEY (fkSensor_Talhao)
		REFERENCES talhao(idTalhao)
) AUTO_INCREMENT 10000;    

CREATE TABLE filtragemDados (
	idFiltragemDados INT PRIMARY KEY AUTO_INCREMENT,
    dia DATE,
    qtdHorasLuz DECIMAL(4,2),
    statusDia VARCHAR(12),
		CONSTRAINT chkStatusDia
		CHECK (statusDia IN('Ideal', 'Insuficiente', 'Excesso'))
        -- Insuficiente: menos que 14
        -- Excesso: mais que 16
        -- Ideal: entre 14 e 16
)AUTO_INCREMENT = 500000;

CREATE TABLE dadosSensor (
	idDadosSensor INT AUTO_INCREMENT,
    fkDadosSensor_Sensor INT,
		CONSTRAINT fkReDadosSensor_Sensor FOREIGN KEY (fkDadosSensor_Sensor)
		REFERENCES sensor(idSensor),
	PRIMARY KEY (idDadosSensor, fkDadosSensor_Sensor),
    qtdLuz FLOAT NOT NULL,
		CONSTRAINT chkQtdLuz
        CHECK (qtdLuz >= 0), 
        -- a luminosidade, vinda da voltagem, captada pelo sensor não deve ser negativa
	statusLuminosidade VARCHAR(12),
		CONSTRAINT chkStatusLuminosidade
		CHECK (statusLuminosidade IN('Satisfatória', 'Insuficiente', 'Excesso')),
        -- luminosidade -> excesso: acima de 100.000 lux; insuficiente: 10.000 lux; satisfatória 10.000 - 100.000 lux;
    alerta CHAR(3),
		CONSTRAINT chkAlerta
        CHECK (alerta IN('Sim', 'Não')),
        -- se houve alerta ou não
    momentoCaptura DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkDadosSensor_FiltragemDados INT,
    		CONSTRAINT fkReFiltragemDados_DadosSensor FOREIGN KEY (fkDadosSensor_FiltragemDados)
			REFERENCES filtragemDados(idFiltragemDados)
) AUTO_INCREMENT = 1000000;

INSERT INTO empresa (idEmpresa, nomeFantasia, cnpj, tamanhoEmpresa, qtdHectares, statusCadastro, dtCriacao, dtSaida, fkEmpresa_EmpresaSede) VALUES
    (1, 'Lumini', '87654321000195', 'Grande', NULL, 'ativo', '2024-11-26', NULL, NULL),
	(2, 'FrizzaLupulo', '12345678000195', 'Médio', '20', 'ativo', '2024-11-27', NULL, NULL);

INSERT INTO endereco (idEndereco, cep, uf, cidade, logradouro, numero, complemento) VALUES
 	(1, '01414-001', 'SP', 'São Paulo', 'Rua Haddock Lobo', '585', NULL);

INSERT INTO usuario (idUsuario, fkUsuario_Empresa, nome, senha, email, telefone, tipoUsuario, statusUsuario, dtCriacao, dtExclusao) VALUES
	(1000, 1, 'Igor', 'Lumini@100', 'igor@lumini.com', '11942971496', 'Administrador', 'ativo', '2024-11-26', NULL),
	(1001, 2, 'Frizza', 'Urubu@100', 'frizza@sptech.com', '11912345678', 'Administrador', 'ativo', '2024-11-27', NULL);

INSERT INTO talhao (idTalhao, numero, areaTalhao, fkTalhao_Empresa) VALUES
	(100, 1, 15000, 2),
	(101, 2, 15000, 2),
	(102, 3, 15000, 2),
	(103, 4, 15000, 2);

INSERT INTO sensor (idSensor, statusFuncionamento, dtInstalacao, dtUltimaManutencao, fkSensor_Talhao) VALUES
	(10000, 'Ativo', '2024-11-28', NULL, 100),
	(10001, 'Ativo', '2024-11-28', NULL, 100),
	(10002, 'Ativo', '2024-11-28', NULL, 100),
	(10003, 'Ativo', '2024-11-28', NULL, 101),
	(10004, 'Ativo', '2024-11-28', NULL, 101),
	(10005, 'Ativo', '2024-11-28', NULL, 101),
	(10006, 'Ativo', '2024-11-28', NULL, 101),
	(10007, 'Ativo', '2024-11-28', NULL, 102),
	(10008, 'Ativo', '2024-11-28', NULL, 102),
	(10009, 'Ativo', '2024-11-28', NULL, 103),
	(10010, 'Ativo', '2024-11-28', NULL, 103),
	(10011, 'Ativo', '2024-11-28', NULL, 103);
	
INSERT INTO filtragemDados (idFiltragemDados, dia, qtdHorasLuz, statusDia) VALUES
	(500000, '2024-12-03', 16, 'Ideal'), -- 1
	(500001, '2024-12-03', 16, 'Ideal'), -- 1
	(500002, '2024-12-03', 16, 'Ideal'), -- 1
	(500003, '2024-12-03', 16, 'Ideal'), -- 2
	(500004, '2024-12-03', 18, 'Excesso'), -- 2
	(500005, '2024-12-03', 15, 'Ideal'), -- 2
	(500006, '2024-12-03', 14, 'Insuficiente'), -- 2
	(500007, '2024-12-03', 16, 'Ideal'), -- 3
	(500008, '2024-12-03', 16, 'Ideal'), -- 3
	(500009, '2024-12-03', 16, 'Ideal'), -- 4
	(500010, '2024-12-03', 16, 'Ideal'), -- 4
	(500011, '2024-12-03', 16, 'Ideal'); -- 4
        
INSERT INTO dadosSensor (idDadosSensor, fkDadosSensor_Sensor, qtdLuz, statusLuminosidade, alerta, momentoCaptura, fkDadosSensor_FiltragemDados) VALUES
	(1000000, 10000, 25000, 'Satisfatória', 'Não', DEFAULT, 500000),
	(1000001, 10001, 8000, 'Insuficiente', 'Sim', DEFAULT, 500001),
	(1000002, 10002, 25000, 'Satisfatória', 'Não', DEFAULT, 500002),
	(1000003, 10003, 25000, 'Satisfatória', 'Não', DEFAULT, 500003),
	(1000004, 10004, 122000, 'Excesso', 'Sim', DEFAULT, 500004),
	(1000005, 10005, 25000, 'Satisfatória', 'Não', DEFAULT, 500005),
	(1000006, 10006, 9000, 'Insuficiente', 'Não', DEFAULT, 500006),
	(1000007, 10007, 25000, 'Satisfatória', 'Não', DEFAULT, 500007),
	(1000008, 10008, 25000, 'Satisfatória', 'Não', DEFAULT, 500008),
	(1000009, 10009, 25000, 'Satisfatória', 'Não', DEFAULT, 500009),
	(1000010, 10010, 7000, 'Insuficiente', 'Sim', DEFAULT, 500010),
	(1000011, 10011, 25000, 'Satisfatória', 'Não', DEFAULT, 500011);
 
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
SELECT talhao.numero, filtragemDados.statusDia, filtragemDados.qtdHorasLuz, dia FROM talhao
	JOIN sensor
		ON idTalhao = fkSensor_Talhao
	JOIN dadosSensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN filtragemDados
		ON fkDadosSensor_FiltragemDados = idFiltragemDados
	WHERE filtragemDados.dia = '2024-12-03';
        
-- Gráfico 3, pagina Geral
SELECT talhao.numero, dadosSensor.statusLuminosidade FROM talhao
	JOIN sensor
		ON idTalhao = fkSensor_Talhao
	JOIN dadosSensor
		ON idSensor = fkDadosSensor_Sensor
	JOIN filtragemDados
		ON fkDadosSensor_FiltragemDados = idFiltragemDados
	WHERE (dadosSensor.statusLuminosidade = 'Insuficiente' OR dadosSensor.statusLuminosidade = 'Excesso') AND filtragemDados.dia = '2024-12-03';

-- Grafico 1, pagina Talhao
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