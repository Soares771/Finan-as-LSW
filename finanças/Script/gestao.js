/* ============================================================
   PROJETO FINANÇAS+
   Conceitos aplicados: Vetores, Objetos, DOM, Eventos, 
   LocalStorage, Map, Filter, Reduce.
============================================================ */

// 1. SELEÇÃO DE ELEMENTOS DO DOM
const form = document.getElementById('form-transacao');
const inputTitulo = document.getElementById('form-titulo');
const inputValor = document.getElementById('form-valor');
const inputData = document.getElementById('form-data');
const inputCategoria = document.getElementById('form-categoria');
const inputTipo = document.getElementById('form-tipo');

const listaTransacoes = document.getElementById('lista-transacoes');
const filtroBusca = document.getElementById('filtro-busca');
const filtroTipo = document.getElementById('filtro-tipo');

const displayReceitas = document.getElementById('total-receitas');
const displayDespesas = document.getElementById('total-despesas');
const displaySaldo = document.getElementById('saldo-total');

// 2. ESTRUTURA DE DADOS E INICIALIZAÇÃO
// Recupera do LocalStorage ou cria array vazio se for o primeiro acesso
let transacoes = JSON.parse(localStorage.getItem('financas_transacoes')) || [];

// 3. FUNÇÕES UTILITÁRIAS
function gerarID() {
    return Math.floor(Math.random() * 10000);
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function salvarLocalStorage() {
    localStorage.setItem('financas_transacoes', JSON.stringify(transacoes));
}

// 4. FUNÇÕES DE RENDERIZAÇÃO (DOM)

function atualizarInterface() {
    listaTransacoes.innerHTML = ''; // Limpa a lista atual
    
    // Obtém valores dos filtros
    const termoBusca = filtroBusca.value.toLowerCase();
    const tipoFiltro = filtroTipo.value;

    // CONCEITO: FILTER (Filtragem de dados)
    const transacoesFiltradas = transacoes.filter(transacao => {
        const correspondeBusca = transacao.titulo.toLowerCase().includes(termoBusca);
        const correspondeTipo = tipoFiltro === 'todos' ? true : transacao.tipo === tipoFiltro;
        return correspondeBusca && correspondeTipo;
    });

    // CONCEITO: FOREACH (Iteração para criar elementos)
    transacoesFiltradas.forEach(criarElementoTransacao);

    atualizarBalanco();
}

function criarElementoTransacao(transacao) {
    // 1. Criar elemento LI em vez de DIV para aproveitar o CSS existente
    const li = document.createElement('li');
    
    // 2. Adicionar classes para estilização via CSS
    // Adiciona a classe base e a classe do tipo (receita/despesa)
    li.classList.add('transacao-item'); 
    li.classList.add(transacao.tipo); 

    const operador = transacao.tipo === 'receita' ? '+' : '-';

    // 3. Montar o HTML interno
    li.innerHTML = `
        <div class="info">
            <h4>${transacao.titulo}</h4>
            <small>${transacao.categoria.toUpperCase()} | ${new Date(transacao.data).toLocaleDateString('pt-BR')}</small>
        </div>
        <div class="valores">
            <span>
                ${operador} ${formatarMoeda(transacao.valor)}
            </span>
            <button onclick="removerTransacao(${transacao.id})" class="delete-btn">
                🗑️
            </button>
        </div>
    `;

    // 4. Adicionar à lista
    listaTransacoes.appendChild(li);
}

function atualizarBalanco() {
    // CONCEITO: MAP e REDUCE (Cálculos agregados)
    
    // Calcula total de receitas
    const totalReceitas = transacoes
        .filter(t => t.tipo === 'receita')
        .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

    // Calcula total de despesas
    const totalDespesas = transacoes
        .filter(t => t.tipo === 'despesa')
        .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

    const saldo = totalReceitas - totalDespesas;

    // Atualiza DOM
    displayReceitas.innerText = formatarMoeda(totalReceitas);
    displayDespesas.innerText = formatarMoeda(totalDespesas);
    displaySaldo.innerText = formatarMoeda(saldo);

    // Muda cor do saldo se for negativo
    displaySaldo.style.color = saldo < 0 ? 'red' : 'green';
}

// 5. MANIPULAÇÃO DE DADOS (Adicionar/Remover)

function adicionarTransacao(evento) {
    evento.preventDefault(); // Evita recarregamento da página

    // Validação básica
    if(inputTitulo.value.trim() === '' || inputValor.value.trim() === '') {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Criação do OBJETO transação
    const novaTransacao = {
        id: gerarID(),
        titulo: inputTitulo.value,
        valor: parseFloat(inputValor.value), // Garante que é número
        data: inputData.value,
        categoria: inputCategoria.value,
        tipo: inputTipo.value
    };

    // Adiciona ao vetor
    transacoes.push(novaTransacao);

    // Persistência e UI
    salvarLocalStorage();
    atualizarInterface();
    
    // Feedback ao usuário e Limpeza
    form.reset();
    alert("Transação adicionada com sucesso!");
}

// Função global para ser acessada pelo botão onclick no HTML
window.removerTransacao = function(id) {
    if(confirm("Tem certeza que deseja excluir esta transação?")) {
        // Remove item filtrando o array original
        transacoes = transacoes.filter(transacao => transacao.id !== id);
        
        salvarLocalStorage();
        atualizarInterface();
    }
}

// 6. EVENT LISTENERS (Ouvintes de Eventos)

form.addEventListener('submit', adicionarTransacao);

// Eventos de Input para filtro em tempo real
filtroBusca.addEventListener('input', atualizarInterface);
filtroTipo.addEventListener('change', atualizarInterface);

// Inicialização
atualizarInterface();