var G1_labels = [];
var G1_data = [];


var qtdIdeal = 0
var qtdIndesejavel = 0

var qtdExcesso = 0
var qtdAbaixo = 0

var quantidadeSensores = 0

var sensores = []
var qtdAlertas = []

// INÍCIO DAS ROTAS DA TELA TALHÃO 
function qtdLuzSensor() {
    var idEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/medidas/qtdLuzSensor/${idEmpresa}`, {
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
                    G1_labels.push('Sensor ' + `${contador+1}`)
                    quantidadeSensores++
                    sensores.push(`Sensor ${contador+1}`)

                    G1_data.push(json[contador].qtdHorasLuz)

                    if (json[contador].qtdHorasLuz < 15 || json[contador].qtdHorasLuz > 17) {
                        qtdIndesejavel++
                        div_botoesSensores.innerHTML += `<div class="class_talhoesSelecionarOpcao">
                            <a href="TelaDash-Talhao.html" style="background-color:rgb(179, 53, 53);">Sensor ${contador+1}</a>
                        </div>`
                    } else {
                        qtdIdeal++
                        div_botoesSensores.innerHTML += `<div class="class_talhoesSelecionarOpcao">
                            <a href="TelaDash-Talhao.html" style="background-color: rgb(95, 155, 99);">Sensor ${contador+1}</a>
                        </div>`
                    }

                    if (json[contador].qtdHorasLuz > 17) {
                        qtdExcesso++
                    } else if (json[contador].qtdHorasLuz < 15) {
                        qtdAbaixo++
                    }
                }

            

                plotarGrafico1();
                plotarGrafico2();
                span_totalSensores.innerHTML = quantidadeSensores;
                // span_totalIdeal.innerHTML = qtdIdeal;
                // span_totalAbaixo.innerHTML = qtdAbaixo;
                // span_totalExcesso.innerHTML = qtdExcesso;

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



function qtdAlertasSensor() {
    var idEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/medidas/qtdAlertasSensor/${idEmpresa}`, {
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

                for (var i = 0; i < sensores.length; i++) {

                    if (sensores.indexOf('Sensor ' + `${i+1}`) == -1) {
                        sensores.push('Sensor ' + `${i+1}`)
                        qtdAlertas.push(1)

                    } else {
                        var posicao = sensores.indexOf('Sensor ' + `${i+1}`)
                        qtdAlertas[posicao]++
                    }
                }
                console.log(sensores)
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
                    text: `Dia ${diaAnterior}/${mesAtual} - Horas com Luz`
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
                    text: `Dia ${diaAnterior}/${mesAtual} - Status Luminosidade nos Sensores`,
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
        labels: sensores,
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
                    text: 'Quantidade de Alertas por Sensor',
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
// FIM DAS ROTAS DA TELA TALHÃO 

const hoje = new Date();

// Calcula um dia antes
const umDiaAntes = new Date(hoje);
umDiaAntes.setDate(hoje.getDate() - 1);

// Obtém o dia do mês anterior
const diaAnterior = umDiaAntes.getDate();

// Obtém o mês (0 a 11, somamos 1 para ajustar)
const mesAtual = umDiaAntes.getMonth() + 1;


