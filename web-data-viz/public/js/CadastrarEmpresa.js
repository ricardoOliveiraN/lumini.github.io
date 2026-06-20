var CEP = '';
var UF = '';
var Cidade = '';
var Logradouro = '';
var Numero = '';
var Complemento = '';
var fkEmpresa = '';

function obterDataAtualISO() {
    return new Date().toISOString().slice(0, 10);
}

function cadastrarEndereco() {
    fkEmpresa = sessionStorage.ID_EMPRESA;

    var enderecoPreenchido = CEP !== '' && UF !== '' && Cidade !== '' && Logradouro !== '' && Numero !== '';

    if (!enderecoPreenchido) {
        alert('Preencha os campos obrigatórios do endereço antes de continuar.');
        return false;
    }

    if (Complemento === '') {
        Complemento = '...';
    }

    fetch("/empresas/cadastrarEndereco", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
                alert('Empresa e endereço cadastrados com sucesso!');
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

function cadastrarEmpresa() {
    var CNPJ = inp_cnpj.value.trim();
    var TamanhoEmpresa = inp_tamanho.value.trim();
    var NomeFantasia = inp_razao.value.trim();
    var QuantidadeHectare = inp_hectar.value.trim();
    var StatusCadastro = 'ativo';
    var DataCriacao = obterDataAtualISO();

    CEP = inp_cep.value.trim();
    UF = inp_uf.value.trim();
    Cidade = inp_cidade.value.trim();
    Logradouro = inp_logradouro.value.trim();
    Numero = inp_numero.value.trim();
    Complemento = inp_complemento.value.trim();

    var empresaPreenchida = NomeFantasia !== '' && CNPJ !== '' && TamanhoEmpresa !== '' && QuantidadeHectare !== '';
    var enderecoPreenchido = CEP !== '' && UF !== '' && Cidade !== '' && Logradouro !== '' && Numero !== '';

    if (!empresaPreenchida) {
        alert('Preencha os campos obrigatórios da empresa antes de continuar.');
        return false;
    }

    if (!enderecoPreenchido) {
        alert('Preencha os campos obrigatórios do endereço antes de continuar.');
        return false;
    }

    fetch("/empresas/cadastrarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
                buscarIDEmpresa(CNPJ);
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

function buscarIDEmpresa(cnpj) {
    var cnpjCodificado = encodeURIComponent(cnpj);

    fetch(`/empresas/buscarID?cnpj=${cnpjCodificado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                var valor = resposta[0].idEmpresa;

                sessionStorage.ID_EMPRESA = valor;

                cadastrarEndereco();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
