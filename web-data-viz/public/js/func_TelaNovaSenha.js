var Senha = '';
var qtdCorreto = 0;
var qtdCorretoMini = 0;
var qtdCorretoMais = 0;
var qtdCorretoTam = 0;
var qtdSenhaIgual = 0;

function validarSenha() {
    Senha = ipt_Senha.value;
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
    div_ConfirmarSenha.innerHTML = ''



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
    if ((possuiArroba || possuiHash || possuiCifrao || possuiPorcent || possuiE || possuiAsterisco || possuiInterrogacao) && Senha != '') {
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
function confirmarSenha() {
    div_validarSenha.innerHTML = '';
    var senhaConfirmacao = ipt_ConfirmarSenha.value; 

    if (senhaConfirmacao == Senha && senhaConfirmacao != '') {
        ipt_ConfirmarSenha.style.borderColor = 'green';
        div_ConfirmarSenha.innerHTML = '';
        qtdSenhaIgual += 1;
    }else if (senhaConfirmacao != Senha && senhaConfirmacao != '') {
        ipt_ConfirmarSenha.style.borderColor = 'red';
        qtdSenhaIgual = 0;
        div_ConfirmarSenha.innerHTML = `Senhas não correspondentes`
    }else if (senhaConfirmacao == '' && senhaConfirmacao == Senha){
        ipt_ConfirmarSenha.style.borderColor = 'white';
        div_ConfirmarSenha.innerHTML = '';
    }else if (senhaConfirmacao == '' && senhaConfirmacao != Senha){
        ipt_ConfirmarSenha.style.borderColor = 'red';
    }
}
// FIM VALIDAÇÃO DA CONFIRMAÇÃO

// validando tela com botão

function CriarSenha() {

    if (qtdCorretoTam >= 1 && qtdCorreto >= 1 && qtdCorretoMini >= 1 && qtdCorretoMais >= 1 && qtdSenhaIgual >= 1) {

        ipt_Senha.style.borderColor = 'green';
        Senha = ipt_Senha;

        // EU QUERO QUE QUANDO ENTRAR NESSE IF ABRA UMA NOVA TELA COM UMA IMAGEM DE CERTO E UMA FRASE "CADASTRADO COM SUCESSO"
        abrirTelaInterna()
    } else {

        if (qtdSenhaIgual >= 1 && (qtdCorretoTam < 1 || qtdCorreto < 1 || qtdCorretoMini < 1 || qtdCorretoMais < 1)) {
            ipt_ConfirmarSenha.style.borderColor = 'red';
            ipt_Senha.style.borderColor = 'red';
        } else if (qtdSenhaIgual < 1) {
            ipt_ConfirmarSenha.style.borderColor = 'red';
        } else{
            ipt_Senha.style.borderColor = 'red';
        }
    }

}   

function abrirTelaInterna() {
    var urlLogin = "../TalhaoSensor/TelaDash-Geral.html";
    window.close();
    window.open(urlLogin);
  }