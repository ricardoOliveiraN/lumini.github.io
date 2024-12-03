
function empresasAtivas(){

    fetch(`/dashFunc/empresasAtivas`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                span_empresasAtivas.innerHTML = resposta[0].empresasAtivas;

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

const estados = []
const empresasEstado = []

function quantidadeEmpresaEstado(){

    fetch(`/dashFunc/enderecoEstado`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                for(var i = 0; i < resposta.length; i++){
                    estados.push(resposta[i].uf)
                    empresasEstado.push(resposta[i].QuantidadeEmpresa)
                }
                plotarGrafico1()

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });



}


function quantidadeFuncionarios(idEmpresa){

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

function plotarGrafico1() {
    
    const dataA = {
        labels: estados,
        datasets: [
            {
                label: 'Quantidade',
                backgroundColor: [
                    'rgb(53, 151, 222)',

                ],
                borderColor: [
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                ],
                data: empresasEstado
            },
        ]
    };


    const configA = {
        type: 'bar',
        data: dataA,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Empresas por estado`
                },
                legend: {
                    labels: {
                        boxWidth: 20 // Configuração correta para ajustar a largura dos quadrados da legenda
                    }
                }
            },
            scales: {
                x: {
                //     title: {
                //         display: true,
                //         text: 'Talhões'
                //     },
                    stacked: true
                },
                y: {
                    title: {
                        display: true,
                        text: 'Quantidade de horas'
                    },
                    // stacked: true
                }
            }
        }
    }
    const myChart = new Chart(
        document.getElementById('myChartA'),
        configA
    )
}

/*
Quantidade de empresas ativas
Quantidade de empresas por estado
Quantidade de sensores
Quantidade de usuários da plataforma
*/