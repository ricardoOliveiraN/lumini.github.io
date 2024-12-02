var medidaModel = require("../models/medidaModel");


// INÍCIO DAS ROTAS DA TELA TALHÃO GERAL
function horasLuz(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var dataAnteriorCompleta = req.params.dataAnteriorCompleta;

    medidaModel.horasLuz(idEmpresa, dataAnteriorCompleta).then(function (resultado) {
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
    var dataAnteriorCompleta = req.params.dataAnteriorCompleta;
    
    medidaModel.qtdAlertasTalhao(idEmpresa, dataAnteriorCompleta).then(function (resultado) {
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
    var dataAnteriorCompleta = req.params.dataAnteriorCompleta;
    
    medidaModel.historicoAlertas(idEmpresa, dataAnteriorCompleta).then(function (resultado) {
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
    var idTalhao = req.params.idTalhao;
    var dataAnteriorCompleta = req.params.dataAnteriorCompleta;

    medidaModel.qtdLuzSensor(idEmpresa, idTalhao, dataAnteriorCompleta).then(function (resultado) {
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
    var idTalhao = req.params.idTalhao;
    
    medidaModel.statusSensor(idEmpresa, idTalhao).then(function (resultado) {
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
    var idTalhao = req.params.idTalhao;
    var dataAnteriorCompleta = req.params.dataAnteriorCompleta;
    
    medidaModel.historicoAlertasSensor(idEmpresa, idTalhao, dataAnteriorCompleta).then(function (resultado) {
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
function luminosidadePorHora(req, res) {

    var idSensor = req.params.idSensor;
    var dataAnteriorCompleta = req.params.dataAnteriorCompleta;

    medidaModel.luminosidadePorHora(idSensor, dataAnteriorCompleta).then(function (resultado) {
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

function luminosidadeSensor(req, res) {
    
    var idSensor = req.params.idSensor;

    
    medidaModel.luminosidadeSensor(idSensor).then(function (resultado) {
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
    
    var idSensor = req.params.idSensor;
    var dataAnteriorCompleta = req.params.dataAnteriorCompleta;
    var idTalhao = req.params.idTalhao;
    
    medidaModel.historicoAlertasSensorEspecifico(idSensor, dataAnteriorCompleta, idTalhao).then(function (resultado) {
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
    historicoAlertasSensorEspecifico,
    luminosidadePorHora
}