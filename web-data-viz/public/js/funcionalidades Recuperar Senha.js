var qtdEmailCorreto = 0; // Declarar a variável em um escopo mais amplo (se necessário)

function validarEmail() {
  Email = inp_email.value;
  var tamanhoEmail = Email.length;
  var posicaoCOM = Email.indexOf('.com');
  var posicaoBR = Email.indexOf('.br');
  var posicaoArroba = Email.indexOf('@');

  if (posicaoCOM > posicaoArroba || posicaoBR > posicaoArroba) {


    if ((Email[tamanhoEmail - 1] == 'm' && Email[tamanhoEmail - 2] == 'o' && Email[tamanhoEmail - 3] == 'c' && Email[tamanhoEmail - 4] == '.') || (Email[tamanhoEmail - 1] == 'r' && Email[tamanhoEmail - 2] == 'b' && Email[tamanhoEmail - 3] == '.')) {
      qtdEmailCorreto += 1;
      inp_email.style.borderColor = 'green';
      div_emailErrado.innerHTML = '';
    } else {
      inp_email.style.borderColor = 'red';
      div_emailErrado.innerHTML = 'Email inválido';
      qtdEmailCorreto = 0;
    }
  } else {

    if ((Email[tamanhoEmail - 1] == 'm' && Email[tamanhoEmail - 2] == 'o' && Email[tamanhoEmail - 3] == 'c' && Email[tamanhoEmail - 4] == '.') || (Email[tamanhoEmail - 1] == 'r' && Email[tamanhoEmail - 2] == 'b' && Email[tamanhoEmail - 3] == '.')) {
      qtdEmailCorreto += 1;
      inp_email.style.borderColor = 'green';
      div_emailErrado.innerHTML = '';
    } else {
      inp_email.style.borderColor = 'red';
      div_emailErrado.innerHTML = 'Email inválido';
      qtdEmailCorreto = 0;
    }
  }
}

function ENVIAR() {

  validarEmail()

  if (qtdEmailCorreto >= 1) {
    // Email válido, abrir tela de login
    abrirTelaLogin();
  }

}
// FIM DA VALIDAÇÃO DO EMAIL

// validando tela com botão

function abrirTelaLogin() {
  var urlLogin = "../Codigo/TelaCodigo.html";
  window.close();
  window.open(urlLogin);
}