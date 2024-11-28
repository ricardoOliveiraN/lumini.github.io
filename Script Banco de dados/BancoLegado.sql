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