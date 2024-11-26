var empresaModel = require("../models/empresaModel");

function cadastrarEmpresa(req, res) {
  var NomeFantasia = req.body.NomeFantasiaServer;
  var cnpj = req.body.CNPJServer;
  var TamanhoEmpresa= req.body.TamanhoEmpresaServer;
  var QuantidadeHectare = req.body.QuantidadeHectareServer;
  var StatusCadastro = req.body.StatusCadastroServer;
  var DataCriacao = req.body.DataCriacaoServer;
  var fkEmpresaEndereco = req.body.fkEmpresaEnderecoServer;

  if (NomeFantasia == undefined) {
    res.status(400).send("Seu NomeFantasia está undefined!");
  } else if (cnpj == undefined) {
    res.status(400).send("Seu cnpj está undefined!");
  } else if (TamanhoEmpresa == undefined) {
    res.status(400).send("Sua TamanhoEmpresa está undefined!");
  } else if (QuantidadeHectare == undefined) {
    res.status(400).send("Sua QuantidadeHectare está undefined!");
  } else if (StatusCadastro == undefined) {
    res.status(400).send("Sua StatusCadastro está undefined!");
  } else if (DataCriacao == undefined) {
    res.status(400).send("Sua DataCriacao está undefined!");
  } else if (fkEmpresaEndereco == undefined) {
    res.status(400).send("Sua fkEmpresaEndereco está undefined!");
  }



  else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    empresaModel.cadastrarEmpresa(NomeFantasia, cnpj, TamanhoEmpresa, QuantidadeHectare, StatusCadastro, DataCriacao,fkEmpresaEndereco)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrarEndereco(req, res) {
  var cep = req.body.cepServer;
  var uf = req.body.ufServer;
  var cidade = req.body.cidadeServer;
  var logradouro = req.body.logradouroServer;
  var numero = req.body.numeroServer;
  var complemento = req.body.complementoServer;

  if (cep == undefined) {
    res.status(400).send("Seu cep está undefined!");
  } else if (uf == undefined) {
    res.status(400).send("Seu uf está undefined!");
  } else if (cidade == undefined) {
    res.status(400).send("Sua cidade está undefined!");
  } else if (logradouro == undefined) {
    res.status(400).send("Sua logradouro está undefined!");
  } else if (numero == undefined) {
    res.status(400).send("Sua numero está undefined!");
  }



  else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    empresaModel.cadastrarEndereco(cep, uf, cidade, logradouro, numero, complemento)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

module.exports = {
  cadastrarEmpresa,
  buscarPorId,
  cadastrarEndereco,
  listar,
};
