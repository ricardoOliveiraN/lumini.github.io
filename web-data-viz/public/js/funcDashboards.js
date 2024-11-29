var G1_labels = [];
var G1_data = [];


var qtdIdeal = 0
var qtdIndesejavel = 0

function horasLuz() {
    var idEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/medidas/horasLuz/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));




                for (var contador = 0; contador < json.length; contador++) {
                    G1_labels.push('Talhão ' + json[contador].numTalhao)

                    G1_data.push(json[contador].qtdHoras)

                    if (json[contador].qtdHoras < 16) {
                        qtdIndesejavel++
                    } else {
                        qtdIdeal++
                    }
                }

                plotarGrafico1();
                plotarGrafico2();

            });

        } else {

            console.log("Houve um erro ao tentar realizar a busca da quantidade de horas!");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

var talhoes = []
var qtdAlertas = []

function qtdAlertasTalhao() {
    var idEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/medidas/qtdAlertasTalhao/${idEmpresa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                for (var i = 0; i < json.length; i++) {

                    if (talhoes.indexOf('Talhão ' + json[i].numero) == -1) {
                        talhoes.push('Talhão ' + json[i].numero)
                        qtdAlertas.push(1)

                    } else {
                        var posicao = talhoes.indexOf('Talhão ' + json[i].numero)
                        qtdAlertas[posicao]++
                    }
                }
                console.log(talhoes)
                console.log(qtdAlertas)
                plotarGrafico3()
            });

        } else {

            console.log("Houve um erro ao tentar realizar a busca da quantidade de horas!");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}



function plotarGrafico1() {
    const dataA = {
        labels: G1_labels,
        datasets: [
            {
                label: 'Máximo',
                backgroundColor: 'rgb(255, 87, 51)',
                borderColor: 'rgb(255, 87, 51)',
                data: [17, 17, 17, 17, 17, 17, 17],
                type: "line"
            },
            {
                label: 'Mínimo',
                backgroundColor: 'rgb(255, 171, 0)',
                borderColor: 'rgb(255, 171, 0)',
                data: [15, 15, 15, 15, 15, 15, 15],
                type: "line"
            },
            {
                label: 'Horas com luz',
                backgroundColor: [
                    'rgb(114, 189, 119)',

                ],
                borderColor: [
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                    'rgb(0, 0, 0)',
                ],
                data: G1_data
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
                    text: 'Dia 05/11 - Horas com Luz'
                },
                legend: {
                    labels: {
                        boxWidth: 20 // Configuração correta para ajustar a largura dos quadrados da legenda
                    }
                }
            },
            scales: {
                // x: {
                //     title: {
                //         display: true,
                //         text: 'Talhões'
                //     },
                // },
                y: {
                    title: {
                        display: true,
                        text: 'Quantidade de horas'
                    },
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
    // Segundo Gráfico
    const labelsB = [
        'Ideal',
        'Indesejável'
    ];
    const dataB = {
        labels: labelsB,
        datasets: [{
            label: 'Talhões',
            backgroundColor: [
                'rgb(95, 155, 99)',
                'rgb(179, 53, 53)',
            ],
            borderColor: [
                'rgb(0, 0, 0, 0.2)',
                'rgb(0, 0, 0, 0.2)',
            ],
            data: [qtdIdeal, qtdIndesejavel]
        }]

    };

    const configB = {
        type: 'doughnut',
        data: dataB,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Dia 05/11 - Status Luminosidade nos Talhões',
                    font: {
                        size: 14,
                    }
                },
                legend: {
                    position: 'right', // Posiciona a legenda à direita
                    labels: {
                        font: {
                            // size: 14, // Tamanho da fonte
                            // family: 'Arial', // Fonte personalizada
                            // style: 'italic', // Estilo da fonte (normal, italic, bold)
                        },
                        // color: '#333', // Cor do texto da legenda
                        boxWidth: 20, // Largura do quadrado de cor na legenda
                        // boxHeight: 15, // Altura do quadrado de cor na legenda
                        // padding: 10, // Espaçamento entre os itens
                        // usePointStyle: true, // Exibe ícones como pontos ao invés de quadrados
                    }
                }
            }
        }
    }
    const myChart2 = new Chart(
        document.getElementById('myChartB'),
        configB
    )

}

function plotarGrafico3() {
    /* TERCEIRO GRÁFICO */

    const dataC = {
        labels: talhoes,
        datasets: [{
            label: 'Quantidade',
            backgroundColor: [
                'rgb(188, 53, 53)',
                ' rgb(185, 190, 27)',
                ' rgb(168, 193, 25)',
                'rgb(218, 99, 1)',
                'rgb(218, 149, 1)',
            ],
            borderColor: [
                'rgb(0,0,0,0.2)',
                'rgb(0,0,0,0.2)',
                'rgb(0,0,0,0.2)',
                'rgb(0,0,0,0.2)',
                'rgb(0,0,0,0.2)',
            ],
            data: qtdAlertas
        }]

    };

    const configC = {
        type: 'doughnut',
        data: dataC,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de Alertas por Talhão',
                    font: {
                        size: 14,
                    }
                },
                legend: {
                    position: 'right', // Posiciona a legenda à direita
                    labels: {
                        boxWidth: 20,
                    }


                }
            }
        }
    }

    const myChart3 = new Chart(
        document.getElementById('myChartC'),
        configC
    )
}

