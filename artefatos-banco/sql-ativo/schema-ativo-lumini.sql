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
	idUsuario INT AUTO_INCREMENT,
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
