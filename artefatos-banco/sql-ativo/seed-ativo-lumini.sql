USE lumini;

INSERT INTO empresa (idEmpresa, nomeFantasia, cnpj, tamanhoEmpresa, qtdHectares, statusCadastro, dtCriacao, dtSaida, fkEmpresa_EmpresaSede) VALUES
    (1, 'Lumini', '87654321000195', 'Grande', NULL, 'ativo', '2024-11-26', NULL, NULL),
	(2, 'FrizzaLupulo', '12345678000195', 'Médio', '20', 'ativo', '2024-11-27', NULL, NULL),
    (3, 'HopsBrasil', '23456789000196', 'Grande', '100', 'ativo', '2023-06-25', NULL, NULL),
    (4, 'LupusField', '34567890100197', 'Médio', '50', 'ativo', '2023-11-20', NULL, NULL),
    (5, 'GreenHop', '45678901200198', 'Pequeno', '15', 'ativo', '2022-11-23', NULL, NULL),
    (6, 'LupulinaTech', '56789012300199', 'Grande', '200', 'ativo', '2023-11-22', NULL, NULL),
    (7, 'EcoLupulo', '67890123400190', 'Médio', '30', 'ativo', '2022-11-21', NULL, NULL),
    (8, 'BrasilHops', '78901234500191', 'Grande', '150', 'ativo', '2021-11-24', NULL, NULL),
    (9, 'LupulusSol', '89012345600192', 'Pequeno', '10', 'ativo', '2021-11-26', NULL, NULL),
    (10, 'HopPower', '90123456700193', 'Médio', '40', 'ativo', '2023-11-20', NULL, NULL),
    (11, 'HopsCult', '01234567800194', 'Grande', '120', 'ativo', '2022-11-23', NULL, NULL),
    (12, 'LupuloNorte', '12345678900194', 'Pequeno', '8', 'ativo', '2021-11-21', NULL, NULL);

INSERT INTO endereco (idEndereco, cep, uf, cidade, logradouro, numero, complemento, fkEndereco_Empresa) VALUES
 	(1, '01414-001', 'SP', 'São Paulo', 'Rua Haddock Lobo', '585', NULL, 1),
 	(2, '01414-001', 'SP', 'São Paulo', 'Rua Haddock Lobo', '585', NULL, 2),
    (3, '01000-000', 'SP', 'São Paulo', 'Rua da Consolação', '123', NULL, 3),
    (4, '02245-100', 'SP', 'São Paulo', 'Avenida Nova Cantareira', '876', 'Apto 301', 4),
    (5, '03010-000', 'SP', 'São Paulo', 'Rua Vergueiro', '512', 'Bloco A', 5),
    (6, '04050-000', 'MG', 'Belo Horizonte', 'Rua dos Três Irmãos', '732', 'Casa 5', 6),
    (7, '04510-000', 'MS', 'Campo Grande', 'Avenida Brigadeiro Faria Lima', '1120', NULL, 7),
    (8, '05040-080', 'MS', 'Campo Grande', 'Rua Santa Clara', '210', 'Sobrado', 8),
    (9, '05670-060', 'GO', 'Goiânia', 'Rua Lapa', '568', 'Apartamento 2B', 9),
    (10, '06753-000', 'SP', 'Cotia', 'Avenida São Lucas', '1500', 'Perto do Mercado Municipal', 10),
    (11, '08050-220', 'MG', 'Belo Horizonte', 'Rua João Soares', '900', 'Apartamento 404', 11),
    (12, '09080-300', 'RJ', 'Niterói', 'Rua Bernardino de Campos', '115', 'Casa 8', 12);

INSERT INTO usuario (idUsuario, fkUsuario_Empresa, nome, senha, email, telefone, tipoUsuario, statusUsuario, dtCriacao, dtExclusao) VALUES
	(1000, 1, 'Igor', 'Lumini@100', 'igor@lumini.com', '11942971496', 'Administrador', 'ativo', '2024-11-26', NULL),
	(1001, 2, 'Frizza', 'Urubu@100', 'frizza@sptech.com', '11912345678', 'Administrador', 'ativo', '2024-11-27', NULL),
	(1002, 2, 'Julia', 'Urubu@100', 'julia@sptech.com', '11987654321', 'Administrador', 'ativo', '2024-11-27', NULL);

INSERT INTO talhao (idTalhao, numero, areaTalhao, fkTalhao_Empresa) VALUES
	(100, 1, 15000, 2),
	(101, 2, 15000, 2),
	(102, 3, 15000, 2),
	(103, 4, 15000, 2);

INSERT INTO sensor (idSensor, statusFuncionamento, dtInstalacao, dtUltimaManutencao, fkSensor_Talhao) VALUES
	(10000, 'Ativo', '2024-12-03', NULL, 100),
	(10001, 'Ativo', '2024-12-03', NULL, 100),
	(10002, 'Ativo', '2024-12-03', NULL, 100),
	(10003, 'Ativo', '2024-12-03', NULL, 101),
	(10004, 'Ativo', '2024-12-03', NULL, 101),
	(10005, 'Manutenção', '2024-12-03', NULL, 101),
	(10006, 'Ativo', '2024-12-03', NULL, 101),
	(10007, 'Ativo', '2024-12-03', NULL, 102),
	(10008, 'Ativo', '2024-12-03', NULL, 102),
	(10009, 'Ativo', '2024-12-03', NULL, 103),
	(10010, 'Ativo', '2024-12-03', NULL, 103),
	(10011, 'Ativo', '2024-12-03', NULL, 103);

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
	(500011, '2024-12-03', 16, 'Ideal'), -- 4
    (500012, '2024-11-20', 16, 'Ideal'),
    (500013, '2024-11-21', 16, 'Ideal'),
    (500014, '2024-11-22', 16, 'Ideal'),
    (500015, '2024-11-23', 16, 'Ideal'),
    (500016, '2024-11-24', 18, 'Excesso'),
    (500017, '2024-11-25', 15, 'Ideal'),
    (500018, '2024-11-26', 14, 'Insuficiente'),
    (500019, '2024-11-27', 16, 'Ideal'),
    (500020, '2024-11-28', 16, 'Ideal'),
    (500021, '2024-11-29', 16, 'Ideal'),
    (500022, '2024-11-30', 16, 'Ideal'),
    (500023, '2024-12-01', 16, 'Ideal'),
    (500024, '2024-12-02', 16, 'Ideal');

INSERT INTO dadosSensor (idDadosSensor, fkDadosSensor_Sensor, qtdLuz, statusLuminosidade, alerta, momentoCaptura, fkDadosSensor_FiltragemDados) VALUES
	(1000000, 10000, 25000, 'Satisfatória', 'Não', DEFAULT, 500000),
	(1000001, 10001, 8000, 'Insuficiente', 'Sim', DEFAULT, 500001),
	(1000002, 10002, 25000, 'Satisfatória', 'Não', DEFAULT, 500002),
	(1000003, 10003, 25000, 'Satisfatória', 'Não', DEFAULT, 500003),
	(1000004, 10004, 25000, 'Satisfatória', 'Sim', DEFAULT, 500004),
	(1000005, 10005, 122000, 'Excesso', 'Não', DEFAULT, 500005),
	(1000006, 10006, 9000, 'Insuficiente', 'Não', DEFAULT, 500006),
	(1000007, 10007, 25000, 'Satisfatória', 'Não', DEFAULT, 500007),
	(1000008, 10008, 25000, 'Satisfatória', 'Não', DEFAULT, 500008),
	(1000009, 10009, 25000, 'Satisfatória', 'Não', DEFAULT, 500009),
	(1000010, 10010, 7000, 'Insuficiente', 'Sim', DEFAULT, 500010),
	(1000011, 10011, 25000, 'Satisfatória', 'Não', DEFAULT, 500011),
    (1000012, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500012),
    (1000013, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500013),
    (1000014, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500014),
    (1000015, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500015),
    (1000016, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500016),
    (1000017, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500017),
    (1000018, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500018),
    (1000019, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500019),
    (1000020, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500020),
    (1000021, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500021),
    (1000022, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500022),
    (1000023, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500023),
    (1000024, 10004, 25000, 'Satisfatória', 'Não', DEFAULT, 500024),
    (1000035, 10004, 0, 'Satisfatória', 'Não', '2024-12-03 00:38:06', 500004),
    (1000036, 10004, 0, 'Satisfatória', 'Não', '2024-12-03 01:21:05', 500004),
    (1000037, 10004, 0, 'Satisfatória', 'Não', '2024-12-03 02:39:12', 500004),
    (1000038, 10004, 0, 'Satisfatória', 'Não', '2024-12-03 03:42:42', 500004),
    (1000039, 10004, 0, 'Satisfatória', 'Não', '2024-12-03 04:50:23', 500004),
    (1000040, 10004, 400, 'Satisfatória', 'Não', '2024-12-03 05:11:42', 500004),
    (1000041, 10004, 3000, 'Satisfatória', 'Não', '2024-12-03 06:12:01', 500004),
    (1000042, 10004, 10000, 'Satisfatória', 'Não', '2024-12-03 07:11:23', 500004),
    (1000043, 10004, 20000, 'Satisfatória', 'Não', '2024-12-03 08:09:38', 500004),
    (1000044, 10004, 30000, 'Satisfatória', 'Não', '2024-12-03 09:05:28', 500004),
    (1000045, 10004, 40000, 'Satisfatória', 'Não', '2024-12-03 10:55:18', 500004),
    (1000046, 10004, 45000, 'Satisfatória', 'Não', '2024-12-03 11:59:37', 500004),
    (1000047, 10004, 50000, 'Satisfatória', 'Não', '2024-12-03 12:58:28', 500004),
    (1000048, 10004, 45000, 'Satisfatória', 'Não', '2024-12-03 13:12:17', 500004),
    (1000049, 10004, 40000, 'Satisfatória', 'Não', '2024-12-03 14:42:41', 500004),
    (1000050, 10004, 30000, 'Satisfatória', 'Não', '2024-12-03 15:12:12', 500004),
    (1000051, 10004, 20000, 'Satisfatória', 'Não', '2024-12-03 16:34:04', 500004),
    (1000052, 10004, 10000, 'Satisfatória', 'Não', '2024-12-03 17:12:21', 500004),
    (1000053, 10004, 10000, 'Satisfatória', 'Não', '2024-12-03 18:42:29', 500004),
    (1000054, 10004, 10000, 'Satisfatória', 'Não', '2024-12-03 19:12:22', 500004),
    (1000055, 10004, 0, 'Insuficiente', 'Não', '2024-12-03 20:13:35', 500004),
    (1000056, 10004, 0, 'Satisfatória', 'Não', '2024-12-03 21:33:33', 500004),
    (1000057, 10004, 0, 'Satisfatória', 'Não', '2024-12-03 22:31:21', 500004),
    (1000058, 10004, 0, 'Satisfatória', 'Não', '2024-12-03 23:22:07', 500004);
