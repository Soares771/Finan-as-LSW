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