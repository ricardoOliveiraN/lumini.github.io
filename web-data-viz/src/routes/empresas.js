var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEndereco", function (req, res) {
    empresaController.cadastrarEndereco(req, res);
})


router.get("/buscarID", function (req, res) {
  empresaController.buscarID(req, res);
});

router.post("/cadastrarEmpresa", function (req, res) {
  empresaController.cadastrarEmpresa(req, res);
})

router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

module.exports = router;
