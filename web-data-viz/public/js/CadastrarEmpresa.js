
function cadastrarEndereco() {

    var CEP = Number(inp_cep.value);
    var UF = inp_uf.value;
    var Cidade = inp_cidade.value;
    var Logradouro = inp_logradouro.value;
    var Numero = Number(inp_numero.value);
    var Complemento = inp_complemento.value;

    var EnderecoNotNull = CEP != '' && UF != '' && Cidade != '' && Logradouro != '' && Numero != '';

    if (EnderecoNotNull) {

        if (Complemento == '') {
            Complemento = '...';
        }

        fetch("/empresas/cadastrarEndereco", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                cepServer: CEP,
                ufServer: UF,
                cidadeServer: Cidade,
                logradouroServer: Logradouro,
                numeroServer: Numero,
                complementoServer: Complemento
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    cardErro.style.display = "block";

                    var idEndereco = resposta[0].insertId;
                    sessionStorage.ID_ENDERECO = idEndereco;


                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                finalizarAguardar();
            });

        return false;
    } else {
        alert('Por favor, preencher todos os campos!!')
    }
}



function cadastrarEmpresa() {

    /*Tabela Empresa*/
    var NomeFantasia = inp_nomeFantasia.value;
    var CNPJ = Number(inp_cnpj.value);
    var TamanhoEmpresa = Number(inp_tamanhoEmpresa.value);
    var QuantidadeHectare = Number(inp_qtdHectare.value);
    var StatusCadastro = inp_statusCadastro.value;
    var DataCriacao = inp_dataCriacao.value;


    var fkEmpresaEndereco = sessionStorage.ID_ENDERECO;


    var nenhumNull = NomeFantasia != '' && CNPJ != '' && TamanhoEmpresa != '' && QuantidadeHectare != '' && StatusCadastro != '' && DataCriacao != '' && fkEmpresaEndereco != ''

    if (nenhumNull) {

        fetch("/empresas/cadastrarEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                NomeFantasiaServer: NomeFantasia,
                CNPJServer: CNPJ,
                TamanhoEmpresaServer: TamanhoEmpresa,
                QuantidadeHectareServer: QuantidadeHectare,
                StatusCadastroServer: StatusCadastro,
                DataCriacaoServer: DataCriacao,
                fkEmpresaEnderecoServer: fkEmpresaEndereco        
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    cardErro.style.display = "block";

                    alert('Deu certo!! Inserir Empresa')


                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                finalizarAguardar();
            });

        return false;
    } else {
        alert('Por favor, preencher todos os campos!!')
    }



}


