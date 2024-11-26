var dashFuncModel = require("../models/dashFuncModel");


function buscarEmpresasAtivas(req, res) {

    dashFuncModel.buscarEmpresasAtivas()
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado! Das empresas");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}

function buscarEmpresasEstado(req,res){

    var cnpj = req.parms.cnpjEmpresa;
    dashFuncModel.buscarEmpresasCnpj(cnpj)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado! Das empresas");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}

function buscarQTDFunc(req,res){
    var idEmpresa = req.parms.idEmpresa;
    dashFuncModel.buscarQTDFunc(idEmpresa)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado! Das empresas");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}




module.exports = {
    buscarEmpresasAtivas,
    buscarEmpresasCnpj,
    buscarQTDFunc
}