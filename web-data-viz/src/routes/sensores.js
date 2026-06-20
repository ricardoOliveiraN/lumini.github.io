var express = require("express");
var router = express.Router();

var sensoresController = require("../controllers/sensoresController");

router.get("/analogico", function (req, res) {
    sensoresController.analogico(req, res);
});

module.exports = router;
