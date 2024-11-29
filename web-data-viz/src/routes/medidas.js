var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/horasLuz/:idEmpresa", function (req, res) {
    medidaController.horasLuz(req, res);
});

router.get("/qtdAlertasTalhao/:idEmpresa", function (req, res) {
    medidaController.qtdAlertasTalhao(req, res);
})

module.exports = router;