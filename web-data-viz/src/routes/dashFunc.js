var express = require("express");
var router = express.Router();

var dashFuncController = require("../controllers/dashFuncController");

router.get("/empresasAtivas", function (req, res) {
  dashFuncController.buscarEmpresasAtivas(req, res);
});

router.get("/enderecoEstado", function (req, res) {
    dashFuncController.buscarEnderecoEstado(req, res);
}); 

router.get("/qtdFuncionarios", function (req, res) {
    dashFuncController.buscarQuantidadeFuncionarios(req, res);
});

router.get("/qtdSensores", function (req, res) {
  dashFuncController.buscarQuantidadeSensores(req, res);
});

router.get("/evolucaoEmpresas", function (req, res) {
  dashFuncController.evolucaoEmpresas(req, res);
});

router.get("/statusLuminosidade", function (req, res) {
  dashFuncController.statusLuminosidade(req, res);
});

router.get("/tamanhoEmpresa", function (req, res) {
  dashFuncController.tamanhoEmpresa(req, res);
});

router.get("/qtdTalhoes", function (req, res) {
  dashFuncController.qtdTalhoes(req, res);
});

module.exports = router;