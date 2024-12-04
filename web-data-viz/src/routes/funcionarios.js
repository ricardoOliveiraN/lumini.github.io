var express = require("express");
var router = express.Router();

var funcionariosController = require("../controllers/funcionariosController");

//Recebendo os dados do html e direcionando para a função cadastrar de funcionarioController.js
router.get("/listarFunc/:fkEmpresa", function (req, res) {
    funcionariosController.listarFunc(req, res);
})


module.exports = router;