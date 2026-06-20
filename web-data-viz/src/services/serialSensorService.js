let historico = [];
let leituraTotal = 0;
let erroInicializacao = null;
let parserAtivo = false;

const LIMITE_PADRAO = 100;
const BAUD_RATE_PADRAO = 9600;

let SerialPort;
let ReadlineParser;

function obterLimiteHistorico() {
    const valorConfigurado = Number(process.env.SERIAL_BUFFER_MAX || LIMITE_PADRAO);

    if (!Number.isInteger(valorConfigurado) || valorConfigurado <= 0) {
        return LIMITE_PADRAO;
    }

    return valorConfigurado;
}

function adicionarValor(valor) {
    historico.push(valor);
    leituraTotal += 1;

    const limite = obterLimiteHistorico();
    if (historico.length > limite) {
        historico = historico.slice(historico.length - limite);
    }
}

function extrairValorNumerico(linha) {
    const texto = String(linha || "").trim();

    if (!texto) {
        return null;
    }

    const correspondencia = texto.match(/-?\d+(?:[.,]\d+)?/);
    if (!correspondencia) {
        return null;
    }

    const valor = Number(correspondencia[0].replace(",", "."));
    return Number.isFinite(valor) ? valor : null;
}

function obterValores() {
    return historico;
}

function obterEstado() {
    return {
        valores: historico,
        totalLeituras: leituraTotal,
        usandoSerial: parserAtivo,
        erro: erroInicializacao
    };
}

function iniciar() {
    const porta = process.env.SERIAL_PORT;

    if (!porta) {
        erroInicializacao = "SERIAL_PORT nao configurada.";
        console.warn("[serialSensorService] SERIAL_PORT nao configurada. Rota /sensores/analogico respondera sem leituras em tempo real.");
        return;
    }

    try {
        ({ SerialPort, ReadlineParser } = require("serialport"));
    } catch (erro) {
        erroInicializacao = "Dependencia serialport nao instalada.";
        console.warn("[serialSensorService] Dependencia serialport nao instalada. Rode npm install.");
        return;
    }

    try {
        const baudRate = Number(process.env.SERIAL_BAUD_RATE || BAUD_RATE_PADRAO);
        const serial = new SerialPort({ path: porta, baudRate });
        const parser = serial.pipe(new ReadlineParser({ delimiter: "\r\n" }));

        parser.on("data", function (linha) {
            const valor = extrairValorNumerico(linha);

            if (valor === null) {
                return;
            }

            adicionarValor(valor);
        });

        serial.on("open", function () {
            parserAtivo = true;
            erroInicializacao = null;
            console.log(`[serialSensorService] Porta serial conectada em ${porta} @ ${baudRate}.`);
        });

        serial.on("error", function (erro) {
            parserAtivo = false;
            erroInicializacao = erro.message;
            console.error("[serialSensorService] Erro na serial:", erro.message);
        });

        serial.on("close", function () {
            parserAtivo = false;
            if (!erroInicializacao) {
                erroInicializacao = "Conexao serial encerrada.";
            }
            console.warn("[serialSensorService] Conexao serial encerrada.");
        });
    } catch (erro) {
        parserAtivo = false;
        erroInicializacao = erro.message;
        console.error("[serialSensorService] Falha ao iniciar serial:", erro.message);
    }
}

module.exports = {
    iniciar,
    obterValores,
    obterEstado
};
