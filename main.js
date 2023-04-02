const form = document.getElementById("form-atividade");
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando"/>';
const imgReprovado =
  '<img src="./images/reprovado.png" alt="Emoji decepcionado"/>';

//CRIANDO ARRAY VAZIO
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = Number(prompt("Digite a nota mínima: "));

let linhas = "";

form.addEventListener("submit", function (e) {
  e.preventDefault(); //NÃO ATUALIZA A PAGINA

  adicionaLinha();
  atualizaTabela();
  atualizaMediaFinal();
});

function adicionaLinha() {
  const inputNomeAtividade = document.getElementById("nome-atividade");
  const inputNotaAtividade = document.getElementById("nota-atividade");

  if (atividades.includes(inputNomeAtividade.value)) {
    alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
  } else {
    atividades.push(inputNomeAtividade.value);
    notas.push(Number(inputNotaAtividade.value));

    //ADICIONAR A LINHA NO CORPO DA TABELA
    let linha = "<tr>";
    linha += `<td>${inputNomeAtividade.value}</td>`; //ISSO É A MESMA COISA QUE UMA CONCATENAÇÃO
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${
      inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado
    }</td>`; //OUTRA FORMA DE ESCREVER UMA CONDIÇÃO
    linha += "</tr>";

    linhas += linha;
  }

  //LIMPAR CAMPOS APÓS ADICIONAR
  inputNomeAtividade.value = "";
  inputNotaAtividade.value = "";
}

function atualizaTabela() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
  const mediaFinal = calculaMediaFinal(); //AQUI RECEBE O RETURN

  document.getElementById("media-final-valor").innerHTML = mediaFinal;
  document.getElementById("media-final-resultado").innerHTML =
    mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
  let somaDasNotas = 0;

  for (let i = 0; i < notas.length; i++) {
    somaDasNotas += notas[i];
  }

  return somaDasNotas / notas.length;
}
