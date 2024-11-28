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
                var talhoes  = []
                var horas = []
                for(var contador = 0; contador < json.length; contador++){
                    talhoes.push(json[contador].qtdHoras)
                    horas.push(json[contador].numTalhao)
                }
                sessionStorage.TOTAL_TALHOES = talhoes;
                sessionStorage.TOTAL_HORAS = horas;
                console.log(talhoes)
                console.log(horas)

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