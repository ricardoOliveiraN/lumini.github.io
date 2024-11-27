function empresasAtivas(){

    fetch(`/dashFunc/empresasAtivas`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                alert('Deu certo obtenção de empresas ativas')

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function quantidadeEmpresaEstado(){

    var Estado = inp_uf;

    fetch(`/dashFunc/enderecoEstado/${Estado}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();


                alert('Deu certo obtenção de empresas por cnpj' + idEmpresa);

                quantidadeFuncionarios(idEmpresa)
                


            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });



}


function quantidadeFuncionarios(dEmpresa){

    fetch(`/dashFunc/qtdFuncionarios`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                

                alert('Deu certo obtenção de qtdFuncionarios');

                quantidadeFuncionarios(idEmpresa)



            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function qtdSensoresEmpresa(){
    fetch(`/dashFunc/qtdSensores`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                

                alert('Deu certo obtenção de qtdFuncionarios');

                quantidadeFuncionarios(idEmpresa)



            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


/*
Quantidade de empresas ativas
Quantidade de empresas por estado
Quantidade de sensores
Quantidade de usuários da plataforma
*/