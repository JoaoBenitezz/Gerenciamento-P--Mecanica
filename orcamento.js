const API_URL = "http://localhost:5654";

async function carregarOrcamentos() {
  try {
    const response = await fetch(`${API_URL}/orcamentos`);
    if (!response.ok) throw new Error("Erro ao buscar orçamentos");
    const orcamentos = await response.json();

    const tbody = document.querySelector("#tabelaOrcamentos tbody");
    tbody.innerHTML = "";

    orcamentos.forEach((o) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${o.id}</td>
        <td>${o.cliente?.nome || "—"}</td>
        <td>${o.cliente?.veiculo || "—"}</td>
        <td>${o.servicos}</td>
        <td>${o.valor.toFixed(2)}</td>
        <td>${o.aprovado ? "✅ Aprovado" : "⏳ Pendente"}</td>
        <td>
          ${
            !o.aprovado
              ? `<button onclick="aprovarOrcamento(${o.id})">Aprovar</button>`
              : "-"
          }
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    alert("Falha ao carregar orçamentos.");
  }
}

async function aprovarOrcamento(id) {
  try {
    const response = await fetch(`${API_URL}/orcamentos/${id}/aprovar`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Erro ao aprovar orçamento");
    alert("Orçamento aprovado!");
    carregarOrcamentos();
  } catch (err) {
    console.error(err);
    alert("Erro ao aprovar orçamento.");
  }
}

window.onload = carregarOrcamentos;
