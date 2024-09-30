function AbrirCadastro() {
    const urlTela = 'cadastronovo.html'; // Endereço da página cadastro do html
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