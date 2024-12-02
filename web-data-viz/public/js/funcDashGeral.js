var G1_labels = [];
var G1_data = [];
var G1_dataNatural = [];


var qtdIdeal = 0
var qtdIndesejavel = 0

var qtdExcesso = 0
var qtdAbaixo = 0

var quantidadeTalhoes = 0

// INÍCIO DAS ROTAS DA TELA TALHÃO GERAL
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
                    quantidadeTalhoes++

                    G1_data.push(json[contador].qtdHoras)
                    G1_dataNatural.push(14)

                    var Talhao = json[contador]
                    var idTalhao = Talhao.idTalhao;

                    if (json[contador].qtdHoras < 15 || json[contador].qtdHoras > 17) {
                        
                        
                        qtdIndesejavel++
                        div_botoesTalhoes.innerHTML += `<div class="class_talhoesSelecionarOpcao">
                            <a style="background-color:rgb(179, 53, 53);" onclick = "irTalhao(${idTalhao})">Talhão ${contador+1}</a>
                        </div>`

                       

                    } else {
                        qtdIdeal++
                        div_botoesTalhoes.innerHTML += `<div class="class_talhoesSelecionarOpcao">
                            <a style="background-color:rgb(95, 155, 99);" onclick = "irTalhao(${idTalhao})">Talhão ${contador+1}</a>
                        </div>`
                    }
 
                    if (json[contador].qtdHoras > 17) {
                        qtdExcesso++
                    } else if (json[contador].qtdHoras < 15) {
                        qtdAbaixo++
                    }
                }

            

                plotarGrafico1();
                plotarGrafico2();   
                span_totalTalhoes.innerHTML = quantidadeTalhoes;
                span_totalIdeal.innerHTML = qtdIdeal;
                span_totalAbaixo.innerHTML = qtdAbaixo;
                span_totalExcesso.innerHTML = qtdExcesso;

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

function irTalhao(idTalhao){

    sessionStorage.ID_TALHAO = idTalhao
    window.location = "TelaDash-Talhao.html"

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

function historicoAlertas() {
    var idEmpresa = sessionStorage.FK_EMPRESA;
    fetch(`/medidas/historicoAlertas/${idEmpresa}`, {
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
                    var somenteDataNasc = json[i].dia.split("T")[0];
                    historico_Alertas.innerHTML += `<tr><th>${json[i].numero}</th>
                    <th>${json[i].statusDia}</th>
                    <th>${json[i].qtdHorasLuz}</th>
                    <th>${somenteDataNasc}</th></tr>`
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
                label: 'Luz natural',
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
                data: G1_dataNatural
            },
            {
                label: 'Luz Artificial',
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
                data: G1_data
            },
        ]
    };
    const hoje = new Date();

    // Calcula um dia antes
    const umDiaAntes = new Date(hoje);
    umDiaAntes.setDate(hoje.getDate() - 1);

    // Obtém o dia do mês anterior
    const diaAnterior = umDiaAntes.getDate();

    // Obtém o mês (0 a 11, somamos 1 para ajustar)
    const mesAtual = umDiaAntes.getMonth() + 1;

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
                    text: `Dia ${diaAnterior}/${mesAtual} - Status Luminosidade nos Talhões`,
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
                'rgb(218, 149, 1)',
                'rgb(218, 99, 1)',
                ' rgb(168, 193, 25)',
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
// FIM DAS ROTAS DA TELA TALHÃO GERAL

const hoje = new Date();

// Calcula um dia antes
const umDiaAntes = new Date(hoje);
umDiaAntes.setDate(hoje.getDate() - 1);

// Obtém o dia do mês anterior
const diaAnterior = umDiaAntes.getDate();

// Obtém o mês (0 a 11, somamos 1 para ajustar)
const mesAtual = umDiaAntes.getMonth() + 1;


