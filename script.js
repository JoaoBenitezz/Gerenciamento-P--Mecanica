const API_URL = "http://localhost:5654"; // URL base do seu back-end

// ELEMENTOS HTML
const formCadastro = document.getElementById("formCadastro");
const formAvaliacao = document.getElementById("formAvaliacao");
const orcamentoInfo = document.getElementById("orcamentoInfo");
const aprovarBtn = document.getElementById("aprovarBtn");
const statusSec = document.getElementById("status");
const statusTexto = document.getElementById("statusTexto");

let clienteAtual = null;

// ==================== CADASTRAR CLIENTE ====================
formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cliente = {
    nome: document.getElementById("cliente").value,
    telefone: document.getElementById("telefone").value,
    veiculo: document.getElementById("veiculo").value,
    placa: document.getElementById("placa").value
  };

  try {
    const response = await fetch(`${API_URL}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    });

    if (!response.ok) throw new Error("Erro ao cadastrar cliente");
    const data = await response.json();
    clienteAtual = data;

    alert(`Cliente ${data.nome} cadastrado com sucesso!`);
    formCadastro.reset();
  } catch (error) {
    console.error(error);
    alert("Falha ao conectar com o servidor Java!");
  }
});

// ==================== CRIAR ORÇAMENTO ====================
formAvaliacao.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!clienteAtual) {
    alert("Cadastre um cliente antes de criar o orçamento!");
    return;
  }

  const orcamento = {
    cliente: clienteAtual,
    servicos: document.getElementById("servicos").value,
    valor: parseFloat(document.getElementById("valor").value),
    aprovado: false
  };

  try {
    const response = await fetch(`${API_URL}/orcamentos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orcamento)
    });

    if (!response.ok) throw new Error("Erro ao criar orçamento");

    const data = await response.json();
    mostrarOrcamento(data);
    formAvaliacao.reset();
  } catch (error) {
    console.error(error);
    alert("Falha ao criar orçamento!");
  }
});

// ==================== MOSTRAR ORÇAMENTO NA TELA ====================
function mostrarOrcamento(orcamento) {
  orcamentoInfo.innerHTML = `
    <p><strong>Cliente:</strong> ${orcamento.cliente.nome}</p>
    <p><strong>Telefone:</strong> ${orcamento.cliente.telefone}</p>
    <p><strong>Veículo:</strong> ${orcamento.cliente.veiculo}</p>
    <p><strong>Serviços:</strong> ${orcamento.servicos}</p>
    <p><strong>Valor Estimado:</strong> R$ ${orcamento.valor}</p>
  `;
  aprovarBtn.classList.remove("hidden");
  aprovarBtn.dataset.id = orcamento.id;
}

// ==================== APROVAR ORÇAMENTO ====================
aprovarBtn.addEventListener("click", async () => {
  const id = aprovarBtn.dataset.id;
  try {
    const response = await fetch(`${API_URL}/orcamentos/${id}/aprovar`, {
      method: "PUT"
    });

    if (!response.ok) throw new Error("Erro ao aprovar orçamento");

    const data = await response.json();
    statusSec.classList.remove("hidden");
    statusTexto.textContent = `Orçamento aprovado! Início em ${data.dataInicio}.`;
    aprovarBtn.classList.add("hidden");
  } catch (error) {
    console.error(error);
    alert("Falha ao aprovar orçamento!");
  }
});

// ==================== LISTAR ORÇAMENTOS EXISTENTES ====================
async function carregarOrcamentos() {
  try {
    const response = await fetch(`${API_URL}/orcamentos`);
    if (!response.ok) throw new Error("Erro ao carregar orçamentos");

    const orcamentos = await response.json();
    console.log("Orçamentos carregados:", orcamentos);
  } catch (err) {
    console.error(err);
  }
}

window.onload = carregarOrcamentos;
