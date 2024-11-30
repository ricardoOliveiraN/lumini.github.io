var qtdHorasSensor = []
var dias = []

var horasTotal = 0
var mediaHoras = 0

function luminosidadeSensor() {
    fetch(`/medidas/luminosidadeSensor`, {
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

                    horasTotal+= Number(json[contador].qtdHorasLuz)

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
    fetch(`/medidas/historicoAlertasSensorEspecifico`, {
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