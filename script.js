async function fetchElements() {
  const res = await fetch('elements.json');
  return res.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  const elements = await fetchElements();
  const table = document.getElementById('periodic-table');

  // placeholders para grid 9×18
  for (let r = 1; r <= 9; r++) {
    for (let c = 1; c <= 18; c++) {
      const ph = document.createElement('div');
      ph.className = 'element';
      ph.style.visibility = 'hidden';
      table.appendChild(ph);
    }
  }

  // criar cada célula
  elements.forEach(el => {
    const cell = document.createElement('div');
    // transforma espaços e / em hífen para a classe CSS
    const cls = el.category.replace(/[^a-zA-Z0-9]/g, '-');
    cell.className = `element ${cls}`;
    cell.style.gridRow = el.row;
    cell.style.gridColumn = el.col;
    cell.innerHTML = `
      <div>
        <div class="symbol">${el.symbol}</div>
        <div class="number">${el.number}</div>
      </div>
    `;
    cell.addEventListener('click', () => openModal(el));
    table.appendChild(cell);
  });

  document.getElementById('modal-close')
    .addEventListener('click', () => {
      document.getElementById('modal').classList.add('hidden');
    });
});

function openModal(el) {
  document.getElementById('elem-name').textContent = el.name;
  document.getElementById('elem-symbol').textContent = el.symbol;
  document.getElementById('elem-number').textContent = el.number;
  document.getElementById('elem-category').textContent = el.category;
  document.getElementById('elem-mass').textContent = el.mass;
  document.getElementById('elem-electrons').textContent = el.electrons;
  document.getElementById('modal').classList.remove('hidden');
}
