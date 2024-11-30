var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

// INÍCIO DAS ROTAS DA TELA TALHÃO GERAL
router.get("/horasLuz/:idEmpresa", function (req, res) {
    medidaController.horasLuz(req, res);
});

router.get("/qtdAlertasTalhao/:idEmpresa", function (req, res) {
    medidaController.qtdAlertasTalhao(req, res);
})

router.get("/historicoAlertas/:idEmpresa", function (req, res) {
    medidaController.historicoAlertas(req, res);
})
// FIM DAS ROTAS DA TELA TALHÃO GERAL


// INÍCIO DAS ROTAS DA TELA TALHÃO 
router.get("/qtdLuzSensor/:idEmpresa", function (req, res) {
    medidaController.qtdLuzSensor(req, res);
})

router.get("/statusSensor/:idEmpresa", function (req, res) {
    medidaController.statusSensor(req, res);
})

router.get("/historicoAlertasSensor/:idEmpresa", function (req, res) {
    medidaController.historicoAlertasSensor(req, res);
})
// FIM DAS ROTAS DA TELA TALHÃO 


// INÍCIO DAS ROTAS DA TELA SENSOR 
router.get("/luminosidadePorHora", function (req, res) {
    medidaController.luminosidadePorHora(req, res);
})

router.get("/luminosidadeSensor", function (req, res) {
    medidaController.luminosidadeSensor(req, res);
}) 

router.get("/historicoAlertasSensorEspecifico", function (req, res) {
    medidaController.historicoAlertasSensorEspecifico(req, res);
})
// FIM DAS ROTAS DA TELA SENSOR

module.exports = router;