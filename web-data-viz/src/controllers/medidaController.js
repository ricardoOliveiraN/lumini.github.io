var medidaModel = require("../models/medidaModel");


// INÍCIO DAS ROTAS DA TELA TALHÃO GERAL
function horasLuz(req, res) {

    var idEmpresa = req.params.idEmpresa;

    medidaModel.horasLuz(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function qtdAlertasTalhao(req, res) {
    
    var idEmpresa = req.params.idEmpresa;
    
    medidaModel.qtdAlertasTalhao(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function historicoAlertas(req, res) {
    
    var idEmpresa = req.params.idEmpresa;
    
    medidaModel.historicoAlertas(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
// FIM DAS ROTAS DA TELA TALHÃO GERAL


// INÍCIO DAS ROTAS DA TELA TALHÃO SENSOR
function qtdLuzSensor(req, res) {

    var idEmpresa = req.params.idEmpresa;

    medidaModel.qtdLuzSensor(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function statusSensor(req, res) {
    
    var idEmpresa = req.params.idEmpresa;
    
    medidaModel.statusSensor(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function historicoAlertasSensor(req, res) {
    
    var idEmpresa = req.params.idEmpresa;
    
    medidaModel.historicoAlertasSensor(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
// FIM DAS ROTAS DA TELA TALHÃO SENSOR


// INÍCIO DAS ROTAS DA TELA SENSOR 
function luminosidadeSensor(req, res) {
    
    
    medidaModel.luminosidadeSensor().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function historicoAlertasSensorEspecifico(req, res) {
    
    
    medidaModel.historicoAlertasSensorEspecifico().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
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