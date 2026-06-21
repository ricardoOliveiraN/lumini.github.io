var serialSensorService = require("../services/serialSensorService");

function analogico(req, res) {
    var estadoAtual = serialSensorService.obterEstado();

    res.status(200).json({
        valores: estadoAtual.valores,
        totalLeituras: estadoAtual.totalLeituras,
        usandoSerial: estadoAtual.usandoSerial,
        erro: estadoAtual.erro
    });
}

module.exports = {
    analogico
};
