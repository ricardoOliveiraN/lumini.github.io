const labelsA = [];
    
    const dataA = {
        labels: labelsA,
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
                data: [1, 2, 4]
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


    // Segundo Gráfico

    const labelsB = [
        'ideal',
        'indesejável',
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
            data: [3, 2]
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

    /* TERCEIRO GRÁFICO */
    const labelsC = [
        'Talhão 1',
        'Talhão 2',
        'Talhão 3',
        'Talhão 4',
        'Talhão 5',
    ];


    const dataC = {
        labels: labelsC,
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
            data: [3, 2, 1, 1, 4]
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

    const myChart = new Chart(
        document.getElementById('myChartA'),
        configA

    )

    const myChart2 = new Chart(
        document.getElementById('myChartB'),
        configB
    )

    const myChart3 = new Chart(
        document.getElementById('myChartC'),
        configC
    )

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

                var qtdIdeal = 0
                var qtdIndesejavel = 0
                

                for(var contador = 0; contador < json.length; contador++){
                    labelsA.push(json[contador].numTalhao)

                    dadosHoras.push(json[contador].qtdHoras)

                    if (json[contador].qtdHoras < 16) {
                        qtdIndesejavel++
                    } else {
                        qtdIdeal++
                    }
                }

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