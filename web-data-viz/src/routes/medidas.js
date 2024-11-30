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

router.get("/qtdAlertasSensor/:idEmpresa", function (req, res) {
    medidaController.qtdAlertasSensor(req, res);
})
// FIM DAS ROTAS DA TELA TALHÃO 

module.exports = router;