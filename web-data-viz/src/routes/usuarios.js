var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/attSenhaUser", function (req, res) {
    usuarioController.attSenhaUser(req, res);
});


router.get("/selecionarDadosUser/:idUser", function (req, res) {
    usuarioController.selecionarDadosUser(req, res);
});


module.exports = router;