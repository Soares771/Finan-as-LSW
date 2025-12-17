
const displayReceitas = document.getElementById('total-receitas');
const displayDespesas = document.getElementById('total-despesas');
const displaySaldo = document.getElementById('saldo-total');


const transacoes = JSON.parse(localStorage.getItem('financas_transacoes')) || [];


function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


function atualizarResumo() {
    const totalReceitas = transacoes.filter(t => t.tipo === 'receita').reduce((ac, t) => ac + t.valor, 0);
    const totalDespesas = transacoes.filter(t => t.tipo === 'despesa').reduce((ac, t) => ac + t.valor, 0);
    const saldo = totalReceitas - totalDespesas;

    displayReceitas.innerText = formatarMoeda(totalReceitas);
    displayDespesas.innerText = formatarMoeda(totalDespesas);
    displaySaldo.innerText = formatarMoeda(saldo);

    displaySaldo.style.color = saldo < 0 ? 'red' : 'green';
}

atualizarResumo();