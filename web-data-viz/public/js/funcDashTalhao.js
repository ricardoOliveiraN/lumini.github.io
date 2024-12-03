var G1_labels = [];
var G1_data = [];
var G1_dataNatural = [];
var idSensoresLista = []

var qtdIdeal = 0
var qtdIndesejavel = 0

var qtdExcesso = 0
var qtdAbaixo = 0

var quantidadeSensores = 0

var sensoresComAlerta = []
var qtdAlertas = []

var sensoresAlertas = 0
var sensoresAtivos = 0
var sensoresInativos = 0
var sensoresManutencao = 0

// INÍCIO DAS ROTAS DA TELA TALHÃO 
function qtdLuzSensor() {
    var idEmpresa = sessionStorage.FK_EMPRESA;
    var idTalhao = sessionStorage.ID_TALHAO;

    fetch(`/medidas/qtdLuzSensor/${idEmpresa}/${idTalhao}/${dataAnteriorCompleta}`, {
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

                    if (idSensoresLista.indexOf(`${json[contador].idSensor}`) == -1) {
                        idSensoresLista.push(`${json[contador].idSensor}`)
                        G1_labels.push(`Sensor ${idSensoresLista.length}`)
                        quantidadeSensores++
                        G1_data.push(json[contador].qtdHorasLuz)
                        G1_dataNatural.push(14);
                        span_numTalhao.innerHTML = json[contador].numero;
                    }
                }

                for (var i = 0; i < idSensoresLista.length; i++) {
                    if (G1_data[i] < 15 || G1_data[i] > 17) {
                        sensoresComAlerta.push(`Sensor ${i + 1}`)
                        qtdAlertas.push(1)
                        sensoresAlertas++
                        qtdIndesejavel++

                        if (sensoresComAlerta.indexOf('Sensor ' + `${i + 1}`) == -1) {
                            sensoresComAlerta.push(`Sensor ${i + 1}`)
                            qtdAlertas.push(1)
                            sensoresAlertas++
                        } else {
                            var posicao = sensoresComAlerta.indexOf('Sensor ' + `${i + 1}`)
                            qtdAlertas[posicao]++
                        }

                        div_botoesSensores.innerHTML += `<div class="class_talhoesSelecionarOpcao">
                        <a onclick = 'irSensor(${idSensoresLista[i]})' style="background-color:rgb(179, 53, 53);">Sensor ${i + 1}</a>
                    </div>`
                    } else {
                        qtdIdeal++
                        div_botoesSensores.innerHTML += `<div class="class_talhoesSelecionarOpcao">
                        <a onclick = 'irSensor(${idSensoresLista[i]})' style="background-color: rgb(95, 155, 99);">Sensor ${[i + 1]}</a>
                    </div>`
                    }

                    if (json[i].qtdHorasLuz > 17) {
                        qtdExcesso++
                    } else if (json[i].qtdHorasLuz < 15) {
                        qtdAbaixo++
                    }
                }



                plotarGrafico1();
                plotarGrafico2();
                plotarGrafico3();
                span_totalSensores.innerHTML = quantidadeSensores;
                span_sensoresAlerta.innerHTML = sensoresAlertas;

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

function irSensor(idSensor){
    sessionStorage.ID_SENSOR = idSensor;
    window.location = 'TelaDash-Sensor.html'
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
                label: 'Luz Natural',
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
                label: 'Luz Artifical',
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

    const configA = {
        type: 'bar',
        data: dataA,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Dia ${diaAnterior}/${mesAnterior} - Horas com Luz`
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
                    text: `Dia ${diaAnterior}/${mesAnterior} - Status Luminosidade nos Sensores`,
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
        labels: sensoresComAlerta,
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
// Obtém a data atual
const hoje = new Date();

// Cria uma nova data para representar o dia anterior
const dataAnterior = new Date(hoje);
dataAnterior.setDate(hoje.getDate());

// Extrai o ano, mês e dia
const anoAnterior = dataAnterior.getFullYear();
const mesAnterior = dataAnterior.getMonth() + 1; // Os meses começam do índice 0
const diaAnterior = dataAnterior.getDate();

// Exibe o resultado
console.log(`Data anterior: ${anoAnterior}-${mesAnterior}-${diaAnterior}`);
const dataAnteriorCompleta = `${anoAnterior}-${mesAnterior}-${diaAnterior}`

function statusSensor() {
    
    var idEmpresa = sessionStorage.FK_EMPRESA;
    var idTalhao = sessionStorage.ID_TALHAO;
    fetch(`/medidas/statusSensor/${idEmpresa}/${idTalhao}`, {
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
                    if (json[contador].statusFuncionamento == 'Ativo') {
                        sensoresAtivos++
                    } else if (json[contador].statusFuncionamento == 'Inativo') {
                        sensoresInativos++
                    } else {
                        sensoresManutencao++
                    }
                }
                span_sensoresAtivos.innerHTML = sensoresAtivos;
                span_sensoresManutencao.innerHTML = sensoresManutencao;

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


function historicoAlertasSensor() {
    var idEmpresa = sessionStorage.FK_EMPRESA;
    var idTalhao = sessionStorage.ID_TALHAO;
    fetch(`/medidas/historicoAlertasSensor/${idEmpresa}/${idTalhao}/${dataAnteriorCompleta}`, {
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
                    const dataCompleta = json[i].momentoCaptura;
                    const data = new Date(dataCompleta);
                    var somenteHorario = data.toLocaleTimeString('pt-BR', { hour12: false });
                    historico_Alertas.innerHTML += `<tr><th>${json[i].idSensor}</th>
                    <th>${json[i].qtdLuz}</th>
                    <th>${json[i].statusLuminosidade}</th>
                    <th>${somenteHorario}</th></tr>`
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





