let cardContainer = document.querySelector("main");
let campoBusca = document.querySelector("div input");
let botaoBusca = document.querySelector("#botao-busca");
let dados = [];

async function iniciarBusca() {
    let resposta = await fetch("Dados.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards
    for (let dado of dados) {
        let article = document.createElement("article");
        const ano = dado.ano || dado.data_criacao || 'N/A'; // Garante que um dos dois campos seja usado
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p><strong>Ano de criação:</strong> ${ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>`;

        cardContainer.appendChild(article);
    }
}

function filtrarDados() {
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => {
        const nome = dado.nome.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        const tags = dado.tags ? dado.tags.join(' ').toLowerCase() : ''; // Junta as tags em uma string

        return nome.includes(termoBusca) || descricao.includes(termoBusca) || tags.includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

campoBusca.addEventListener("input", filtrarDados);
botaoBusca.addEventListener("click", filtrarDados);

iniciarBusca();
