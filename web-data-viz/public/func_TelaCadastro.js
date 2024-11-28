var qtdEmailCorreto = 0;
var qtdCelularCorreto = 0;
var qtdNomeCorreto = 0;

var EmailDefinitivo = '';
var TelefoneDefinitivo = '';
var NomeDefinitivo = '';

var Email = ""
var Telefone = ""
var Nome = ""
var Tipo = ""
var idUser = 0

function validacoes() {

  

    Email = inp_email.value;
    Telefone = inp_telefone.value;
    Nome = inp_nome.value;

    if (Email != '') {

        var posicaoArrobaIn = Email.includes('@');
        var tamanhoEmail = Email.length;
        var posicaoCOM = Email.indexOf('.com');
        var posicaoBR = Email.indexOf('.br');
        var posicaoArroba = Email.indexOf('@');
        var possuiEspaco = Email.includes(' ')


        if (posicaoCOM > posicaoArroba || posicaoBR > posicaoArroba) {


            if (((Email[tamanhoEmail - 1] == 'm' && Email[tamanhoEmail - 2] == 'o' && Email[tamanhoEmail - 3] == 'c' && Email[tamanhoEmail - 4] == '.') || (Email[tamanhoEmail - 1] == 'r' && Email[tamanhoEmail - 2] == 'b' && Email[tamanhoEmail - 3] == '.')) && possuiEspaco == false && posicaoArrobaIn == true) {
                qtdEmailCorreto += 1;
                inp_email.style.borderColor = 'green';
                EmailDefinitivo = Email;
            } else {
                inp_email.style.borderColor = 'red';
                qtdEmailCorreto = 0;
            }
        } else {

            if (((Email[tamanhoEmail - 1] == 'm' && Email[tamanhoEmail - 2] == 'o' && Email[tamanhoEmail - 3] == 'c' && Email[tamanhoEmail - 4] == '.') || (Email[tamanhoEmail - 1] == 'r' && Email[tamanhoEmail - 2] == 'b' && Email[tamanhoEmail - 3] == '.')) && possuiEspaco == false && posicaoArrobaIn == true) {
                qtdEmailCorreto += 1;
                inp_email.style.borderColor = 'green';
                EmailDefinitivo = Email;
            } else {
                inp_email.style.borderColor = 'red';
                qtdEmailCorreto = 0;
            }

        }
  
    }else if (Email == '') {
        qtdEmailCorreto = 0;
        inp_email.style.borderColor = 'black';
    }

    var TamanhoCelular = Telefone.length;

    if (Telefone != '' && qtdCelularCorreto == 0) {


        var TelefoneDois = Number(Telefone);

        var PossuiIsso = Telefone.includes('-') || Telefone.includes('(') || Telefone.includes(')') || Telefone.includes('.') || Telefone.includes(' ');

        if (TamanhoCelular == 11 && PossuiIsso == false && isNaN(TelefoneDois) == false) { //colocar uma verificação de valor negativo?

            qtdCelularCorreto += 1;
            inp_telefone.style.borderColor = 'green';
            TelefoneDefinitivo = Telefone;


        } else {

            qtdCelularCorreto = 0;
            inp_telefone.style.borderColor = 'red';
        }

    } else if (Telefone != '' && TamanhoCelular != 11 ) {


        qtdCelularCorreto = 0;
        inp_telefone.style.borderColor = 'red';
        // colocar uma div pra pessoa ver como faz o celular correto?)

    } else if (Telefone == '') {
        qtdCelularCorreto = 0;
        inp_telefone.style.borderColor = 'black';
    }

    if (Nome != '') {
        var PossuiIsso = Nome.includes('1') || Nome.includes('2') || Nome.includes('3') || Nome.includes('4') || Nome.includes('5') || Nome.includes('6') || Nome.includes('7') || Nome.includes('8') || Nome.includes('9') || Nome.includes('0')

        if (PossuiIsso == false){
            qtdNomeCorreto += 1;
            inp_nome.style.borderColor = 'green';
            NomeDefinitivo = Nome;
        }else{
            qtdNomeCorreto = 0;
            inp_nome.style.borderColor = 'red';
        }
    }else if (Nome == ''){
        qtdNomeCorreto = 0;
        inp_nome.style.borderColor = 'black';
    }

}

function cadastrar2(){
    
    var TipoUser = inp_tipo.value;
    var senhaAleatoria = []   

    for(var contador = 1; contador <= 10; contador++){
      var numeroAleatorio = parseInt(Math.random() * 10)
      var letraAleatoria = parseInt(Math.random() * 25 + 1)
      if (letraAleatoria == 1) {
        letraAleatoria = 'a'
      } else if (letraAleatoria == 2) {
        letraAleatoria = 'b'
      } else if (letraAleatoria == 3) {
        letraAleatoria = 'c'
      } else if (letraAleatoria == 4) {
        letraAleatoria = 'd'
      } else if (letraAleatoria == 5) {
        letraAleatoria = 'e'
      } else if (letraAleatoria == 6) {
        letraAleatoria = 'f'
      } else if (letraAleatoria == 7) {
        letraAleatoria = 'g'
      } else if (letraAleatoria == 8) {
        letraAleatoria = 'h'
      } else if (letraAleatoria == 9) {
        letraAleatoria = 'i'
      } else if (letraAleatoria == 10) {
        letraAleatoria = 'j'
      } else if (letraAleatoria == 11) {
        letraAleatoria = 'k'
      } else if (letraAleatoria == 12) {
        letraAleatoria = 'l'
      } else if (letraAleatoria == 13) {
        letraAleatoria = 'm'
      } else if (letraAleatoria == 14) {
        letraAleatoria = 'n'
      } else if (letraAleatoria == 15) {
        letraAleatoria = 'o'
      } else if (letraAleatoria == 16) {
        letraAleatoria = 'p'
      } else if (letraAleatoria == 17) {
        letraAleatoria = 'q'
      } else if (letraAleatoria == 18) {
        letraAleatoria = 'r'
      } else if (letraAleatoria == 19) {
        letraAleatoria = 's'
      } else if (letraAleatoria == 20) {
        letraAleatoria = 't'
      } else if (letraAleatoria == 21) {
        letraAleatoria = 'u'
      } else if (letraAleatoria == 22) {
        letraAleatoria = 'v'
      } else if (letraAleatoria == 23) {
        letraAleatoria = 'w'
      } else if (letraAleatoria == 24) {
        letraAleatoria = 'x'
      } else if (letraAleatoria == 25) {
        letraAleatoria = 'y'
      } else if (letraAleatoria == 26) {
        letraAleatoria = 'z'
      }
      if (contador % 2 == 0) {
        senhaAleatoria.push(numeroAleatorio);
      } else {
        senhaAleatoria.push(letraAleatoria);
      }
    }

    if (qtdEmailCorreto >= 1 && qtdCelularCorreto >= 1 && qtdNomeCorreto >= 1 && TipoUser != 0){ 
        idUser++
        alert(`Usuário cadastrado com sucesso!\n\nLogin:\nEmail: ${Email}\nSenha: ${senhaAleatoria[0]}${senhaAleatoria[1]}${senhaAleatoria[2]}${senhaAleatoria[3]}${senhaAleatoria[4]}${senhaAleatoria[5]}${senhaAleatoria[6]}${senhaAleatoria[7]}${senhaAleatoria[8]}${senhaAleatoria[9]}`)
        tableCampo.innerHTML += ` <tr>
                            <td>${idUser}</td>
                            <td>${TipoUser}</td>
                            <td>${Nome}</td>
                            <td>${Email}</td>
                            <td>${Telefone}</td>
                            <td><button class="delete-btn"><img src="tabler--trash.png"></button></td>
                        </tr>`
       
    }else{
        alert('Inválido')
    }
}

function cadastrar() {
  // aguardar();

  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var nomeVar = nome_input.value;
  var emailVar = email_input.value;
  var senhaVar = senha_input.value;
  var confirmacaoSenhaVar = confirmacao_senha_input.value;
  var codigoVar = codigo_input.value;
  var idEmpresaVincular

  // Verificando se há algum campo em branco
  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == "" ||
    codigoVar == ""
  ) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(Mensagem de erro para todos os campos em branco)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // Verificando se o código de ativação é de alguma empresa cadastrada
  for (let i = 0; i < listaEmpresasCadastradas.length; i++) {
    if (listaEmpresasCadastradas[i].codigo_ativacao == codigoVar) {
      idEmpresaVincular = listaEmpresasCadastradas[i].id
      console.log("Código de ativação válido.");
      break;
    } else {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML = "(Mensagem de erro para código inválido)";
      finalizarAguardar();
    }
  }

  // Enviando o valor da nova input
  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      idEmpresaVincularServer: idEmpresaVincular
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        cardErro.style.display = "block";

        mensagem_erro.innerHTML =
          "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

        setTimeout(() => {
          window.location = "login.html";
        }, "2000");

        limparFormulario();
        finalizarAguardar();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar();
    });

  return false;
}

// Listando empresas cadastradas 
function listar() {
  fetch("/empresas/listar", {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((empresas) => {
        empresas.forEach((empresa) => {
          listaEmpresasCadastradas.push(empresa);

          console.log("listaEmpresasCadastradas")
          console.log(listaEmpresasCadastradas[0].codigo_ativacao)
        });
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

