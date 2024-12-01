
function selecionarDadosUser(){

    var idUserVar = sessionStorage.ID_USUARIO

    fetch(`/usuario/selecionarDadosUser/${idUserVar}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then(function (resposta) {
      

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {

            var cargo = json[0].cargo;
            var nomeEmpresa = json[0].nomeEmpresa;
            
            sessionStorage.CARGO = cargo;
            sessionStorage.NOME_EMPRESA = nomeEmpresa;

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
    
