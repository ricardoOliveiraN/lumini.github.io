var qtdHorasSensor = []
var dias = []

var quantidadeLuminosidade = []
var horario = []

var luminosidadeTotal = 0
var mediaLuminosidade = 0

var horasTotal = 0
var mediaHoras = 0



function luminosidadePorHora() {

    var idSensor = sessionStorage.ID_SENSOR;

    fetch(`/medidas/luminosidadePorHora/${idSensor}/${dataAnteriorCompleta}`, {
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
                    quantidadeLuminosidade.push(json[contador].qtdLuz)
                    luminosidadeTotal+= json[contador].qtdLuz
                    if (json[contador].hora < 10) {
                        horario.push(`0${json[contador].hora}:00`)
                    } else {
                        horario.push(`${json[contador].hora}:00`)
                    }
                }
                mediaLuminosidade = luminosidadeTotal / 24;
                span_mediaLuminosidade.innerHTML = mediaLuminosidade.toFixed(1);
                plotarGrafico1()

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

function luminosidadeSensor() {

    var idSensor = sessionStorage.ID_SENSOR;

    fetch(`/medidas/luminosidadeSensor/${idSensor}`, {
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
                    const dataCompleta = json[contador].dia
                    const data = new Date(dataCompleta);
                    const dia = String(data.getDate()).padStart(2, "0"); // Garantir 2 dígitos
                    const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês é 0-indexado

                    dias.push(`${dia}/${mes}`)

                    horasTotal += Number(json[contador].qtdHorasLuz)

                    qtdHorasSensor.push(json[contador].qtdHorasLuz)

                }
                mediaHoras = horasTotal / 14
                span_mediaHoras.innerHTML = mediaHoras.toFixed(1);
                plotarGrafico2()
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

    const hoje = new Date();
    // Cria uma nova data para representar o dia anterior
    const dataAnterior = new Date(hoje);
    dataAnterior.setDate(hoje.getDate() + 1);
    
    // Extrai o ano, mês e dia
    const anoAnterior = dataAnterior.getFullYear();
    const mesAnterior = dataAnterior.getMonth() + 1; // Os meses começam do índice 0
    const diaAnterior = dataAnterior.getDate();
    
    // Exibe o resultado
    console.log(`Data anterior: ${anoAnterior}-${mesAnterior}-${diaAnterior}`);
    const dataAnteriorCompleta = `${anoAnterior}-${mesAnterior}-${diaAnterior}`

function plotarGrafico1() {

    // Primeiro Gráfico

    const dataA = {
        labels: horario,
        datasets: [{
            label: 'Tempo com luz',
            borderColor: backGroundValues,
            backgroundColor: backGroundValues,
            data: quantidadeLuminosidade
        },
        {
            label: 'Mínimo',
            backgroundColor: 'rgb(255, 171, 0)',
            borderColor: 'rgb(255, 171, 0)',
            data: [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
            type: "line"
        },
        ]
    };


    const configA = {
        type: 'line',
        data: dataA,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Luminosidade: ${diaAnterior}/${mesAnterior}`
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

    const dataB = {
        labels: dias,
        datasets: [{
            label: 'Tempo com luz',
            backgroundColor: 'rgb(228, 225, 67, 0.7)',
            borderColor: 'rgb(124, 198, 116, 0.7)',

            data: qtdHorasSensor
        },
        {
            label: 'Meta diária',
            backgroundColor: 'rgb(138, 141, 144)',
            borderColor: 'rgb(138, 141, 144)',
            data: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
            type: "line"
        }
        ]
    };

    const configB = {
        type: 'bar',
        data: dataB,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: '14 dias - Luminosidade'
                }
            }
        }
    };

    const myChart2 = new Chart(
        document.getElementById('myChartB'),
        configB
    )
}

function historicoAlertasSensorEspecifico() {

    var idTalhao = sessionStorage.ID_TALHAO
    var idSensor = sessionStorage.ID_SENSOR;

    fetch(`/medidas/historicoAlertasSensorEspecifico/${idSensor}/${dataAnteriorCompleta}/${idTalhao}`, {
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

                    historico_Alertas.innerHTML += `<tr><th>${json[i].statusLuminosidade}</th>
                    <th>${json[i].qtdLuz}</th>
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