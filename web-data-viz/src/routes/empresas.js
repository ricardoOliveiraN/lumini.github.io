var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEndereco", function (req, res) {
    empresaController.cadastrarEndereco(req, res);
})
cadastrarEmpresa

router.post("/cadastrarEmpresa", function (req, res) {
  empresaController.cadastrarEmpresa(req, res);
})

router.get("/buscarIDEndereco", function (req, res) {
    empresaController.buscarIDEndereco(req, res);
});

router.get("/buscar/:id", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

module.exports = router;