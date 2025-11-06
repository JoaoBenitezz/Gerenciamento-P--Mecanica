const tabela = document.getElementById("tabelaOrcamentos");
const orcamentos = JSON.parse(localStorage.getItem("orcamentos")) || [];

if (orcamentos.length === 0) {
  tabela.innerHTML = `<tr><td colspan="5">Nenhum orçamento registrado ainda.</td></tr>`;
} else {
  orcamentos.forEach((orc) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${orc.cliente}</td>
      <td>${orc.veiculo}</td>
      <td>${orc.servicos}</td>
      <td>R$ ${orc.valor}</td>
      <td>${orc.status}</td>
    `;
    tabela.appendChild(linha);
  });
}
