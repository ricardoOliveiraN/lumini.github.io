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
		REFERENCES empresa(idEmpresa)
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
	WHERE filtragemDados.dia = '2024-12-03' AND talhao.fkTalhao_Empresa = '2' AND filtragemDados.dia = '2024-12-03'
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
    
-- 
--
--
--     INSERÇÃO ANTIGA
--
--
--
--

INSERT INTO filtragemDados (dia, qtdHorasLuz, statusDia) VALUES
	('2024-09-08', 13.00, 'Insuficiente'),
	('2024-09-08', 16.00, 'Ideal'),
	('2024-09-08', 17.00, 'Excesso'),
	('2024-09-09', 13.00, 'Insuficiente'),
	('2024-09-09', 16.00, 'Ideal'),
	('2024-09-09', 16.00, 'Ideal'),
	('2024-09-10', 14.00, 'Insuficiente'),
	('2024-09-10', 16.00, 'Ideal'),
	('2024-09-10', 16.00, 'Ideal');

INSERT INTO endereco (cep, uf, cidade, logradouro, numero, complemento) VALUES
	('12345-678', 'SP', 'Vale do Ribeira', 'Rua das Flores', '27', 'Casa 1'),
    ('23456-789', 'RS', 'Serra Gaúcha', 'Avenida da Paz', '1000','Lote 10'),
    ('31266-112', 'SP', 'Campos do Jordão', 'Rua do Lúpulo', '850','Chácara 2'),
    ('45678-901', 'BA', 'Senhor do Bonfim', 'Rua da Esperança', '232', 'Lote 2');

INSERT INTO empresa (nomeFantasia, cnpj, tamanhoEmpresa, qtdHectares, statusCadastro, dtCriacao, dtSaida, fkEmpresa_EmpresaSede, fkEmpresa_Endereco) VALUES
	('Agrosil', '12.345.678/0001-90', 'Pequeno', 15, 'inativo', '2024-08-20', '2023-09-01', NULL, 1),
	('LúFazendas', '23.456.789/0001-01', 'Médio', 20, 'ativo', '2024-08-30', NULL, NULL, 2),
	('Lúpulo da Terra',  '45.678.901/0001-23', 'Grande', 500, 'ativo', '2024-09-05', NULL, NULL, 3),
	('Lúpulo da Terra Nordeste',  '54.876.109/0001-23', 'Médio', 250, 'ativo', '2024-09-15', NULL, NULL, 4);

UPDATE empresa
	SET fkEmpresa_EmpresaSede = 3
    WHERE idEmpresa  = 3;
    
UPDATE empresa
	SET fkEmpresa_EmpresaSede = 3
    WHERE idEmpresa = 4;

INSERT INTO usuario (idUsuario, fkUsuario_Empresa, nome, senha, email, telefone, tipoUsuario, statusUsuario ,dtCriacao, dtExclusao) VALUES
	(1, 1, 'João Silva', MD5('Sol!123'), 'joao.silva@email.com', '11987654321', 'Responsável', 'inativo','2024-08-30','2023-09-01'),
	(1, 2, 'Maria Oliveira', MD5('Céu@456'), 'maria.oliveira@email.com', '21987654321', 'Comum', 'ativo','2024-08-30', NULL),
	(1, 3, 'Carlos Souza', MD5('Floresta#789'), 'carlos.souza@email.com', '31987654321', 'Responsável', 'ativo','2024-09-05', NULL),
	(2, 3, 'Ana Pereira', MD5('Mar$3Clamo'), 'ana.pereira@email.com', '41987654321', 'Comum', 'ativo','2024-09-05', NULL),
	(3, 3, 'Ricardo Lima', MD5('Lua%8Cheia'), 'ricardo.lima@email.com', '51987654321', 'Convidado', 'inativo','2024-09-10', '2024-10-10'),
    (1, 4, 'Joane Damaceno', MD5('Vasc0#'), 'joane.damaceno@email.com', '21987123456', 'Responsável', 'ativo','2024-09-15', NULL);
    
INSERT INTO talhao (numero, areaTalhao, fkTalhao_Empresa) VALUES
	(1, 5000, 1),
	(1, 75000, 2),
	(2, 150000, 2),
	(1, 60000, 3),
	(2, 120000, 3),
	(3, 300000, 3),
    (1, 160000, 4);

INSERT INTO sensor (statusFuncionamento, dtInstalacao, dtUltimaManutencao, fkSensor_Talhao) VALUES
	('Inativo', '2024-09-05', '2024-09-20', 100), 
	('Inativo', '2024-09-05', NULL, 100), 
	('Manutenção', '2024-09-08', NULL, 101), 
	('Ativo', '2024-09-10', '2024-09-12',102),
	('Inativo', '2024-09-20', NULL, 103),
	('Ativo', '2024-09-20', NULL, 104), 
	('Ativo', '2024-09-21', NULL, 105),
	('Ativo', '2024-09-30', NULL, 105),
	('Ativo', '2024-09-30', NULL, 106);

INSERT INTO dadosSensor (fkDadosSensor_Sensor, qtdLuz, statusLuminosidade, alerta, momentoCaptura) VALUES
	(10000, 35.50, 'Satisfatória', 'Não', '2024-09-08 08:00:00'),
	(10001, 15.10, 'Baixa', 'Não', '2024-09-08 17:00:00'),
	(10002, 0.50, 'Crítica', 'Sim', '2024-09-11 23:00:00'),
	(10003, 25.80, 'Satisfatória', 'Não', '2024-09-13 07:00:00'),
	(10003, 25.90, 'Satisfatória', 'Não', '2024-09-13 07:00:01'),
	(10004, 45.10, 'Satisfatória', 'Não', '2024-09-25 13:00:00'),
	(10004, 30.90, 'Satisfatória', 'Não', '2024-09-25 14:00:00'),
	(10005, 12.10, 'Baixa', 'Não', '2024-09-26 08:00:00'),
	(10006, 8.70, 'Baixa', 'Não', '2024-09-26 18:00:00'),
	(10007, 50.25, 'Satisfatória', 'Não', '2024-10-04 12:00:00'),
    (10008, 16.00, 'Baixa', 'Sim', '2024-10-05 18:00:00');
    
SELECT 
	filial.nomeFantasia AS Filial,
    filial.tamanhoEmpresa AS Porte,
    filial.cnpj AS CNPJ,
    endereco.cep AS CEP,
    filial.statusCadastro AS 'Status',
    CASE WHEN filial.idEmpresa = filial.fkEmpresa_EmpresaSede
			THEN 'Sede'
            ELSE 'Filial'
		END AS 'Filial/Sede',
	sede.nomeFantasia AS Sede,
    sede.tamanhoEmpresa AS Porte,
    sede.cnpj AS CNPJ,sede.statusCadastro AS 'Status'
    FROM empresa AS filial
    JOIN empresa AS sede
		ON filial.fkEmpresa_EmpresaSede = sede.idEmpresa
	JOIN endereco
		ON filial.fkEmpresa_Endereco = endereco.IdEndereco;
        
SELECT
	idSensor AS 'ID Sensor',
    statusFuncionamento AS 'Status',
    dtInstalacao AS 'Data Instalação',
    ifnull(dtUltimaManutencao, 'Sem manutenção') AS Manutencao
    -- DATEDIFF(day, dtUltimaManutencao, now()) AS Dias, -> como mostrar quantos dias desde a ultima manutenção
	FROM sensor
    WHERE statusFuncionamento <> 'Manutenção';
    
SELECT
	funcionario.nome AS Funcionário,
    funcionario.senha AS Senha,
    funcionario.tipoUsuario AS TipoUsuario,
    funcionario.statusUsuario AS 'Status',
    empresa.nomeFantasia AS Empresa
    FROM usuario AS funcionario
    JOIN empresa
		ON funcionario.fkUsuario_Empresa = empresa.idEmpresa
	WHERE fkEmpresa_EmpresaSede = 3;

SELECT
	dadosSensor.qtdLuz AS Luminosidade,
    dadosSensor.statusLuminosidade AS 'Nível de Luz',
    dadosSensor.momentoCaptura AS 'Momento de Captura',
    sensor.idSensor AS 'ID Sensor',
    talhao.numero AS 'Talhão',
    empresa.nomeFantasia AS 'Empresa'
    FROM dadosSensor
    JOIN sensor
		ON dadosSensor.fkDadosSensor_Sensor = sensor.idSensor
	JOIN talhao
		ON sensor.fkSensor_Talhao = talhao.idTalhao
	JOIN empresa
		ON talhao.fkTalhao_Empresa = empresa.IdEmpresa
	WHERE idEmpresa = 3
	ORDER BY empresa.nomeFantasia; 