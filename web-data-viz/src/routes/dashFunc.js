var express = require("express");
var router = express.Router();

var dashFuncController = require("../controllers/dashFuncController");

router.get("/empresasAtivas", function (req, res) {
  dashFuncController.buscarEmpresasAtivas(req, res);
});

router.get("/:cnpjEmpresa", function (req, res) {
    dashFuncController.buscarEmpresasCnpj(req, res);
});

router.get("/:cnpjEmpresa", function (req, res) {
    dashFuncController.buscarEmpresasCnpj(req, res);
});




module.exports = router;