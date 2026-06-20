function obterUrlPerguntarBobIA() {
    const bobiaApiBaseUrl = window.LUMINI_CONFIG && window.LUMINI_CONFIG.bobiaApiBaseUrl;

    if (!bobiaApiBaseUrl) {
        throw new Error("BobIA nao configurado. Defina BOBIA_API_BASE_URL em .env.dev ou .env do web-data-viz e reinicie a aplicacao.");
    }

    return `${bobiaApiBaseUrl.replace(/\/$/, "")}/perguntar`;
}

// fazer a chamada do BobIA
async function gerarResposta() {
    const pergunta = document.getElementById("pergunta").value;
    const respostaElemento = document.getElementById("resposta");

    try {
        const response = await fetch(obterUrlPerguntarBobIA(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pergunta })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Nao foi possivel obter resposta do BobIA.");
        }

        respostaElemento.style.display = "block";
        respostaElemento.innerText = data.resultado;
    } catch (erro) {
        respostaElemento.style.display = "block";
        respostaElemento.innerText = erro.message;
    }
}

function teste(resposta) {
    if (resposta == 1) {
        containerBOBIA.style.display = "block";
    } else {
        containerBOBIA.style.display = "none";
    }
}
