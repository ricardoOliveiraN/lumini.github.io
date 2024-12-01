var CEP = '';
var UF = '';
var Cidade = '';
var Logradouro = '';
var Numero = '';
var Complemento = '';
var fkEmpresa = '';

function cadastrarEndereco() {

    fkEmpresa = sessionStorage.ID_EMPRESA;

    var EnderecoNotNull = CEP != '' && UF != '' && Cidade != '' && Logradouro != '' && Numero != '';
    alert('entrei aqui')
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
                complementoServer: Complemento,
                fkEmpresaServer: fkEmpresa
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    
                    alert('Deu certo no endereco')
                    


                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
         
            });

        return false;
    } else {
        alert('Por favor, preencher todos os campos!!')
    }
}

/*Cadastrar empresa, pegar o */

function cadastrarEmpresa() {

    /*Tabela Empresa*/
    var NomeFantasia = inp_nomeFantasia.value;
    var CNPJ = Number(inp_cnpj.value);
    var TamanhoEmpresa = inp_tamanhoEmpresa.value;
    var QuantidadeHectare = Number(inp_qtdHectare.value);
    var StatusCadastro = inp_statusCadastro.value;
    var DataCriacao = inp_dataCriacao.value;

    
    CEP = Number(inp_cep.value);
    UF = inp_uf.value;
    Cidade = inp_cidade.value;
    Logradouro = inp_logradouro.value;
    Numero = Number(inp_numero.value);
    Complemento = inp_complemento.value;
    





    var nenhumNull = NomeFantasia != '' && CNPJ != '' && TamanhoEmpresa != '' && QuantidadeHectare != '' && StatusCadastro != '' && DataCriacao != '' 

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
                DataCriacaoServer: DataCriacao       
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                

                    alert('Deu certo!! Inserir Empresa')

                    buscarIDEmpresa(CNPJ);


                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
           
            });

        return false;
    } else {
        alert('Por favor, preencher todos os campos!!')
    }



}

function buscarIDEmpresa(cnpj){

    fetch(`/empresas/buscarID/${cnpj}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();


                var valor = resposta[0].idEmpresa;

                sessionStorage.ID_EMPRESA = valor;

                alert(valor)
                cadastrarEndereco()
                


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });


}
