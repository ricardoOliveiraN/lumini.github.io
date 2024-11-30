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

