var express = require("express");
var router = express.Router();

var dashFuncController = require("../controllers/dashFuncController");

router.get("/empresasAtivas", function (req, res) {
  dashFuncController.buscarEmpresasAtivas(req, res);
});

router.get("/enderecoEstado/:Estado", function (req, res) {
    dashFuncController.buscarEnderecoEstado(req, res);
});

router.get("/qtdFuncionarios", function (req, res) {
    dashFuncController.buscarQuantidadeFuncionarios(req, res);
});

router.get("/qtdSensores", function (req, res) {
  dashFuncController.buscarQuantidadeSensores(req, res);
});





module.exports = router;