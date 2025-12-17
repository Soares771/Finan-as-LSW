const frases = [
    "Controle suas finanças de forma inteligente.",
    "Organize seus gastos com facilidade.",
    "Cada centavo conta — acompanhe tudo.",
    "Planeje seu futuro financeiro.",
    "Transforme seus hábitos e economize mais.",
    "Seu dinheiro sob controle.",
    "Visualize seus gastos com clareza.",
    "Metas claras levam a sonhos realizados.",
    "Tome decisões melhores com dados.",
    "Finanças+ — sua vida financeira simplificada."
];

let index = 0;
const elemento = document.getElementById("frase");

function trocarFrase() {

    setTimeout(() => {
        elemento.textContent = frases[index];
        index = (index + 1) % frases.length;
    }, 400);
}

trocarFrase();
setInterval(trocarFrase, 10000);