
    // fazer a chamada do BobIA
    async function gerarResposta() {
        const pergunta = document.getElementById('pergunta').value;

        const response = await fetch('http://10.18.35.237:3333/perguntar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pergunta })
        });

        const data = await response.json();

        resposta.style.display = 'block';
        document.getElementById('resposta').innerText = data.resultado;
    }
    function teste(resposta) {
        if (resposta == 1) {
            containerBOBIA.style.display = 'block'
        } else {
            containerBOBIA.style.display = 'none'
        }
    }