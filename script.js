const formCadastro = document.getElementById("formCadastro");
const formAvaliacao = document.getElementById("formAvaliacao");
const orcamentoInfo = document.getElementById("orcamentoInfo");
const aprovarBtn = document.getElementById("aprovarBtn");
const statusSec = document.getElementById("status");
const statusTexto = document.getElementById("statusTexto");

let clienteAtual = null;
let veiculoAtual = null;

formCadastro.addEventListener("submit", (e) => {
  e.preventDefault();
  clienteAtual = document.getElementById("cliente").value;
  veiculoAtual = document.getElementById("veiculo").value;

  alert(`Cliente ${clienteAtual} e veículo ${veiculoAtual} cadastrados!`);
  formCadastro.reset();
});

formAvaliacao.addEventListener("submit", (e) => {
  e.preventDefault();

  const servicos = document.getElementById("servicos").value;
  const valor = document.getElementById("valor").value;

  const orcamento = {
    cliente: clienteAtual,
    veiculo: veiculoAtual,
    servicos,
    valor,
    status: "Pendente"
  };

  localStorage.setItem(
    "orcamentos",
    JSON.stringify([
      ...(JSON.parse(localStorage.getItem("orcamentos")) || []),
      orcamento
    ])
  );

  orcamentoInfo.innerHTML = `
    <p><strong>Cliente:</strong> ${orcamento.cliente}</p>
    <p><strong>Veículo:</strong> ${orcamento.veiculo}</p>
    <p><strong>Serviços:</strong> ${orcamento.servicos}</p>
    <p><strong>Valor Estimado:</strong> R$ ${orcamento.valor}</p>
  `;
  aprovarBtn.classList.remove("hidden");
  formAvaliacao.reset();
});

aprovarBtn.addEventListener("click", () => {
  const diasTrabalho = Math.floor(Math.random() * 5) + 1;
  statusSec.classList.remove("hidden");
  statusTexto.textContent = `Orçamento aprovado! O serviço levará cerca de ${diasTrabalho} dia(s).`;

  let orcamentos = JSON.parse(localStorage.getItem("orcamentos")) || [];
  orcamentos[orcamentos.length - 1].status = "Aprovado";
  localStorage.setItem("orcamentos", JSON.stringify(orcamentos));

  aprovarBtn.classList.add("hidden");
});
