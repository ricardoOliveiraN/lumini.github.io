
function empresasAtivas() {

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

function quantidadeEmpresaEstado() {

    fetch(`/dashFunc/enderecoEstado`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                for (var i = 0; i < resposta.length; i++) {
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


function quantidadeFuncionarios(idEmpresa) {

    fetch(`/dashFunc/qtdFuncionarios`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                span_usuariosAtivos.innerHTML = resposta[0].usuariosAtivos;

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function qtdSensoresEmpresa() {
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

var sensoresAtivos = 0
var sensoresManutencao = 0
var sensoresInativo = 0
var qtdSensores = 0

function buscarQuantidadeSensores() {
    fetch(`/dashFunc/qtdSensores`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (var i = 0; i < resposta.length; i++) {
                    if (resposta[i].statusFuncionamento == 'Ativo') {
                        sensoresAtivos++
                        qtdSensores++
                    } else if (resposta[i].statusFuncionamento == 'Manutenção') {
                        sensoresManutencao++
                        qtdSensores++
                    }
                }
                span_totalSensores.innerHTML = qtdSensores;
                span_sensoresAtivos.innerHTML = sensoresAtivos;
                span_sensoresManutencao.innerHTML = sensoresManutencao;
                span_sensoresInativos.innerHTML = sensoresInativo;

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

var anos = []
var qtdEmpresas = []

function evolucaoEmpresas() {
    fetch(`/dashFunc/evolucaoEmpresas`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (var i = 0; i < resposta.length; i++) {
                    anos.push(resposta[i].anoCriacao)
                    qtdEmpresas.push(resposta[i].quantidadeEmpresas)
                }
                plotarGrafico2()

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

var Satisfatoria = 0
var Insuficiente = 0
var Excesso = 0

function statusLuminosidade() {
    fetch(`/dashFunc/statusLuminosidade`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (var i = 0; i < resposta.length; i++) {
                    if (resposta[i].statusLuminosidade == 'Satisfatória') {
                        Satisfatoria++
                    } else if (resposta[i].statusLuminosidade == 'Insuficiente') {
                        Insuficiente++
                    } else {
                        Excesso++
                    }
                }
                plotarGrafico3()

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

var pequeno = 0
var medio = 0
var grande = 0

function tamanhoEmpresa() {
    fetch(`/dashFunc/tamanhoEmpresa`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (var i = 0; i < resposta.length; i++) {
                    if (resposta[i].tamanhoEmpresa == 'Pequeno') {
                        pequeno++
                    } else if (resposta[i].tamanhoEmpresa == 'Médio') {
                        medio++
                    } else {
                        grande++
                    }
                }
                plotarGrafico4()

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

var Talhoes = 0

function qtdTalhoes() {
    fetch(`/dashFunc/qtdTalhoes`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (var i = 0; i < resposta.length; i++) {
                    Talhoes += resposta[i].qtdHectares;
                }
                span_talhoesTotais.innerHTML = Talhoes;

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


function plotarGrafico2() {

    const dataB = {
        labels: anos,
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
                data: qtdEmpresas
            },
        ]
    };


    const configB = {
        type: 'line',
        data: dataB,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Evolução das empresas cadastradas`
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
                        text: 'Quantidade de empresas'
                    },
                    // stacked: true
                }
            }
        }
    }
    const myChart = new Chart(
        document.getElementById('myChartB'),
        configB
    )
}

function plotarGrafico3() {
    const status = ['Satisfatória', 'Excesso', 'Insuficiente']
    const dataC = {
        labels: status,
        datasets: [
            {
                backgroundColor: [
                    'rgb(95, 155, 99)',
                    'rgb(179, 53, 53)',
                    'rgb(255, 171, 0)',

                ],
                borderColor: [
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                ],
                data: [Satisfatoria, Excesso, Insuficiente]
            },
        ]
    };


    const configC = {
        type: 'doughnut',
        data: dataC,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Quantidade de alertas`
                },
                legend: {
                    labels: {
                        boxWidth: 20 // Configuração correta para ajustar a largura dos quadrados da legenda
                    }
                }
            }
        }
    }
    const myChart = new Chart(
        document.getElementById('myChartC'),
        configC
    )
}

function plotarGrafico4() {
    const tamanhos = ['Pequena', 'Média', 'Grande']
    const dataD = {
        labels: tamanhos,
        datasets: [
            {
                backgroundColor: [
                    'rgb(95, 155, 99)',
                    'rgb(179, 53, 53)',
                    'rgb(255, 171, 0)',

                ],
                borderColor: [
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                ],
                data: [pequeno, medio, grande]
            },
        ]
    };


    const configD = {
        type: 'pie',
        data: dataD,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Tamanho das empresas`
                },
                legend: {
                    labels: {
                        boxWidth: 20 // Configuração correta para ajustar a largura dos quadrados da legenda
                    }
                }
            }
        }
    }
    const myChart = new Chart(
        document.getElementById('myChartD'),
        configD
    )
}

/*
Quantidade de empresas ativas
Quantidade de empresas por estado
Quantidade de sensores
Quantidade de usuários da plataforma
*/