function AbrirCadastro() {
    const urlTela = 'TelaCadastro.html'; // Endereço da página cadastro do html
    window.close(); // Fecha a página aberta (login)
    window.open(urlTela); // Abre a página cadastro
}

function VisualizarSenha() {
    if (inp_senha2.type == 'password') { // Se o tipo da input for password 
        inp_senha2.type = 'text'; // Transforma em text, ou seja, deixa a senha visível
        img_olho3.src = '../Imagens/olho_fechado.png'; // Abre a imagem do olho fechado
    } else {
        inp_senha2.type = 'password'; // Caso a senha já esteja como text (visível), volta a ser password e esconde a senha
        img_olho3.src = '../Imagens/olho_aberto.png'; // Abre a imagem do olho aberto
    }
}

// A PARTIR DAQUI COMEÇA AS VALIDAÇÕES DO SITE:

// INICIALMENTE FOI "SETADO" OS VALORES QUE SERÃO SALVOS, "BANCO DE DADOS FICTÍCIO"

var Senha = '';
var Email = '';
var Nome = '';
var Celular = 0;
var Opcao = '';
var qtdCelularCorreto = 0;
// FIM DO BANCO DE DADOS FÍCTICIO

// CRIOU-SE VARIÁVEIS QUE SERVEM DE BLOQUEIO PARA A TELA, OU SEJA, A PESSOA SÓ CONSEGUE ACESSAR O SITE SE TODAS ESSAS VARIÁVEIS TIVEREM UM VALOR MAIOR DO QUE O ESPERADO - será utilizado na função do botão;

var qtdCorreto = 0;
var qtdCorretoMini = 0;
var qtdCorretoMais = 0;
var qtdCorretoTam = 0;
var qtdSenhaIgual = 0;
var qtdEmailCorreto = 0;
var qtdCelularCorreto = 0;
// FIM DAS VARIAVEIS DE BLOQUEIO

// VALIDAÇÃO DA SENHA INSERIDA, LEVANDO EM CONSIDERAÇÃO: QUANTIDADE MINÍMA DE CARACTERES (8), PRESENÇA DE MAIÚSCULA, PRESENÇA DE MINÚSCULA E PRESENÇA DE CARACTERES 
function validarSenha() {
    Senha = inp_senha.value;
    var tamanhoSenha = Senha.length;
    var maisculaSenha = Senha.toUpperCase();
    var minisculaSenha = Senha.toLowerCase();
    var possuiArroba = Senha.includes('@');
    var possuiHash = Senha.includes('#');
    var possuiCifrao = Senha.includes('$');
    var possuiPorcent = Senha.includes('%');
    var possuiE = Senha.includes('&');
    var possuiAsterisco = Senha.includes('*');
    var possuiInterrogacao = Senha.includes('!');



    var mensagem = '';
    var mensagemDois = '';

    var mensagemTres = '';
    var mensagemQuatro = '';


    if (tamanhoSenha >= 8) {
        mensagem = '<img src="../Imagens/SimboloCertinho.png" style="width: 20px"> Tamanho Correto';
        qtdCorretoTam += 1;
    } else {
        mensagem = '<img src="../Imagens/SimboloErrado.png" style="width: 20px">Tamanho Incorreto (pelo menos 8)';
        qtdCorretoTam = 0;
    }
    if (Senha != minisculaSenha) {
        mensagemDois = '<img src="../Imagens/SimboloCertinho.png" style="width: 20px">Maiúscula';
        qtdCorretoMini += 1;
    } else {
        mensagemDois = '<img src="../Imagens/SimboloErrado.png" style="width: 20px">Maiúscula ';
        qtdCorretoMini = 0;
    }
    if (Senha != maisculaSenha) {
        mensagemQuatro = `<img src="../Imagens/SimboloCertinho.png" style="width: 20px"> Minúscula`;
        qtdCorretoMais += 1;
    } else {
        mensagemQuatro = '<img src="../Imagens/SimboloErrado.png" style="width: 20px">Minúscula';
        qtdCorretoMais = 0;
    }
    if (possuiArroba || possuiHash || possuiCifrao || possuiPorcent || possuiE || possuiAsterisco || possuiInterrogacao) {
        mensagemTres = '<img src="../Imagens/SimboloCertinho.png" style="width: 20px">Caractere especial (! @ # $ % & *)';
        qtdCorreto += 1;
    } else {
        mensagemTres = '<img src="../Imagens/SimboloErrado.png" style="width: 20px">Caractere especial (! @ # $ % & *)';
        qtdCorreto = 0
    }
    div_validarSenha.innerHTML = `${mensagem} <br> ${mensagemDois} <br> ${mensagemQuatro} <br> ${mensagemTres}`

    if (Senha == '' || (qtdCorretoTam >= 1 && qtdCorreto >= 1 && qtdCorretoMini >= 1 && qtdCorretoMais >= 1)) {
        div_validarSenha.innerHTML = '';
    }

}
// FIM DA VALIDAÇÃO DA SENHA

// VALIDAÇÃO DE SENHA PARA VER SE A SENHA INSERIDA ESTÁ CONDIZENTE COM A REINSERÇÃO DA SENHA
function confirmarSenha() {
    div_validarSenha.innerHTML = '';
    var senhaConfirmacao = inp_ConfirmarSenha.value;

    if (senhaConfirmacao == Senha) {
        inp_ConfirmarSenha.style.borderColor = 'green';
        qtdSenhaIgual += 1;
    } else {
        inp_ConfirmarSenha.style.borderColor = 'red';
        qtdSenhaIgual = 0;
    }
}
// FIM VALIDAÇÃO DA CONFIRMAÇÃO

// Validando email

function validarEmail() {
    Email = inp_email.value;
    div_validarSenha.innerHTML = '';
    var tamanhoEmail = Email.length;
    var posicaoCOM = Email.indexOf('.com');
    var posicaoBR = Email.indexOf('.br');
    var posicaoArroba = Email.indexOf('@');
    var possuiEspaco = Email.includes(' ')

    if (posicaoCOM > posicaoArroba || posicaoBR > posicaoArroba) {


        if ((Email[tamanhoEmail - 1] == 'm' && Email[tamanhoEmail - 2] == 'o' && Email[tamanhoEmail - 3] == 'c' && Email[tamanhoEmail - 4] == '.') || (Email[tamanhoEmail - 1] == 'r' && Email[tamanhoEmail - 2] == 'b' && Email[tamanhoEmail - 3] == '.') && possuiEspaco == false) {
            qtdEmailCorreto += 1;
            inp_email.style.borderColor = 'green';
        } else {
            inp_email.style.borderColor = 'red';
            qtdEmailCorreto = 0;
        }
    } else {

        if ((Email[tamanhoEmail - 1] == 'm' && Email[tamanhoEmail - 2] == 'o' && Email[tamanhoEmail - 3] == 'c' && Email[tamanhoEmail - 4] == '.') || (Email[tamanhoEmail - 1] == 'r' && Email[tamanhoEmail - 2] == 'b' && Email[tamanhoEmail - 3] == '.') && possuiEspaco == false) {
            qtdEmailCorreto += 1;
            inp_email.style.borderColor = 'green';
        } else {
            inp_email.style.borderColor = 'red';
            qtdEmailCorreto = 0;
        }


    }

}
// FIM DA VALIDAÇÃO DO EMAIL

// Validando Celular:

function validarCelular() {

    div_validarSenha.innerHTML = '';
    Celular = inp_celular.value;

    var TamanhoCelular = Celular.length;

    if (TamanhoCelular == 11) { //colocar uma verificação de valor negativo?

        qtdCelularCorreto += 1;
        inp_celular.style.borderColor = 'green';
    } else {
        qtdCelularCorreto = 0;
        inp_celular.style.borderColor = 'red';
        // colocar uma div pra pessoa ver como faz o celular correto?
    }

}
// FIM DA VALIDAÇÃO DO CELULAR

// validando tela com botão

function cadastrar() {

    if (qtdCorretoTam >= 1 && qtdCorreto >= 1 && qtdCorretoMini >= 1 && qtdCorretoMais >= 1 && qtdSenhaIgual >= 1 && qtdCelularCorreto >= 1 && qtdEmailCorreto >= 1) {

        Senha = inp_senha.value;
        Email = inp_email.value;
        Nome = inp_nome.value;
        Celular = Number(inp_celular.value);
        Opcao = select_opcao.value;
        abrirTelaLogin();

        // EU QUERO QUE QUANDO ENTRAR NESSE IF ABRA UMA NOVA TELA COM UMA IMAGEM DE CERTO E UMA FRASE "CADASTRADO COM SUCESSO"

    } else {
        if (qtdEmailCorreto < 1 && qtdSenhaIgual < 1 && qtdEmailCorreto < 1) {
            inp_ConfirmarSenha.style.borderColor = 'red';
            inp_email.style.borderColor = 'red';
            inp_celular.style.borderColor = 'red';
        } else if (qtdEmailCorreto < 1) {
            inp_email.style.borderColor = 'red';
        } else if (qtdSenhaIgual < 1) {
            inp_ConfirmarSenha.style.borderColor = 'red';
        } else {
            inp_celular.style.borderColor = 'red';
        }
    }

}
function abrirTelaLogin() {
    const urlLogin = "file:///C:/Users/ricar/OneDrive/%C3%81rea%20de%20Trabalho/SPTech%20Aulas/PI%20-%20Segunda%20Sprint/PI---Segunda-Sprint/Prot%C3%B3tipo%20do%20Site%20institucional/LoginCadastro/TelaLogin.html";
    window.close();
    window.open(urlLogin);
}

var UsuarioLogin = '';

// Função da tela de Login

function entrarSite() {

    var SenhaLogin = inp_senha2.value;
    var Usuario = inp_usuario.value;

    if (SenhaLogin == 'Urubu100@' && Usuario == 'Lumini') {
        const urlHome = "../SenhaNova/TelaSenhaNova.html";
        window.close();
        window.open(urlHome);
    } else {

        inp_senha2.style.borderColor = 'red';
        inp_usuario.style.borderColor = 'red';
        div_alerta.innerHTML = `Usuário ou senha inválido(s)`;

    }

}