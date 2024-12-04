// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var senha = sessionStorage.SENHA_USUARIO;

    // var b_usuario = document.getElementById("b_usuario");

    if (email != null && senha != null) {
        // b_usuario.innerHTML = senha;
    } else {
        window.location = "./TelaLogin.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "./TelaLogin.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

function validarAdmin() {
    if (sessionStorage.TIPO_USUARIO == 'Administrador') {
        BarraAdmin.style.display = 'block'
        BarraComum.style.display = 'none'
    } else {
        BarraAdmin.style.display = 'none'
        BarraComum.style.display = 'block'
    }
}


function selecionarDadosUser(){

   
    var idUser = sessionStorage.ID_USUARIO;
   
    fetch(`/usuarios/selecionarDadosUser/${idUser}`, {
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
              
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
    
