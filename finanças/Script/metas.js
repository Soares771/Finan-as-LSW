  let metas = [];
  
  const metasSalvas = localStorage.getItem("metas");

  if (metasSalvas) {
    metas = JSON.parse(metasSalvas);
  }

  const nomeMeta = document.getElementById("nomeMeta");
  const objetivo = document.getElementById("objetivo");
  const listaMetas = document.getElementById("listaMetas");
  const ativas = document.getElementById("ativa");
  const concluidas = document.getElementById("concluidas");

  function criarMeta() {
    const nome = nomeMeta.value;
    const valor = Number(objetivo.value);

    if (nome === "" || valor <= 0) {
      alert("Preencha todos os campos corretamente");
      return;
    }

    metas.push({
      nome,
      valor,
      atual: 0
    });
    
    salvarMetas();

    nomeMeta.value = "";
    objetivo.value = "";

    mostrarNaTela();
  }

  function calcularProgresso(meta) {
    const porcentagem = Math.floor((meta.atual / meta.valor) * 100);
    if (porcentagem > 100) {
        return 100;
      } else {
        return porcentagem;
      }
  }

  function addValor(index) {
    const valor = Number(prompt("Digite o valor que deseja adicionar:"));

    if (valor <= 0 || isNaN(valor)) {
      alert("Valor inválido");
      return;
    }

    metas[index].atual += valor;

    if (metas[index].atual >= metas[index].valor) {
      metas[index].atual = metas[index].valor;
    }
    
    salvarMetas();
    mostrarNaTela();
  }

  function mostrarNaTela() {
  listaMetas.innerHTML = "";

  let totalAtivas = 0;
  let totalConcluidas = 0;

  metas.forEach((meta, index) => {
    const progresso = calcularProgresso(meta);
    const concluida = progresso >= 100;

    if (concluida) {
      totalConcluidas++;
    } else {
      totalAtivas++;
    }
   
   let statusTexto = "";
   let botaoDisabled = "";

  if (concluida) {
  statusTexto = "🎉 <strong>Meta concluída</strong>";
  botaoDisabled = "disabled";
  } else {
  statusTexto = "Em andamento";
  botaoDisabled = "";
}

listaMetas.innerHTML += `
  <div class="meta">
    <h3>${meta.nome}</h3>
    <p>R$ ${meta.atual} / R$ ${meta.valor}</p>
    <p>Progresso: ${progresso}%</p>
    <p>${statusTexto}</p>
    <button onclick="addValor(${index})" ${botaoDisabled}>
      Adicionar valor
    </button>
  </div>
  <hr>
`;
  });

  ativas.innerText = totalAtivas;
  concluidas.innerText = totalConcluidas;
}

function salvarMetas() {
  localStorage.setItem("metas", JSON.stringify(metas));
}

mostrarNaTela();