async function fetchElements() {
  const res = await fetch('elements.json');
  return res.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  const elements = await fetchElements();
  const table    = document.getElementById('periodic-table');
  table.innerHTML = ''; // limpa grid

  // 1) Cria placeholder para toda a grade 9×18
  //    Linhas 1–7 → bloco principal (invisível)
  //    Linhas 8–9 → f-block (visível como quadrado vazio)
  for (let r = 1; r <= 9; r++) {
    for (let c = 1; c <= 18; c++) {
      const ph = document.createElement('div');
      ph.className = 'empty';
      // se for f-block (rows 8 ou 9), marca a class extra
      if (r >= 8) ph.classList.add('f-block');
      ph.style.gridRowStart    = r;
      ph.style.gridColumnStart = c;
      table.appendChild(ph);
    }
  }

  // 2) Sobrepõe cada elemento real
  elements.forEach(el => {
    const cell = document.createElement('div');
    const cls  = el.category.replace(/[^a-zA-Z0-9]/g, '-');
    cell.className             = `element ${cls}`;
    cell.style.gridRowStart    = el.row;
    cell.style.gridColumnStart = el.col;

    cell.innerHTML = `
      <div class="number">${el.number}</div>
      <div class="symbol">${el.symbol}</div>
      <div class="name">${el.name.toLowerCase()}</div>
      <div class="mass">${el.mass}</div>
    `;

    cell.addEventListener('click', () => openModal(el));
    table.appendChild(cell);
  });

  // 3) Fecha modal
  document.getElementById('modal-close')
    .addEventListener('click', () => {
      document.getElementById('modal').classList.add('hidden');
    });
});

function openModal(el) {
  document.getElementById('elem-name').textContent      = el.name;
  document.getElementById('elem-symbol').textContent    = el.symbol;
  document.getElementById('elem-number').textContent    = el.number;
  document.getElementById('elem-category').textContent  = el.category;
  document.getElementById('elem-mass').textContent      = el.mass;
  document.getElementById('elem-electrons').textContent = el.electrons;
  document.getElementById('modal').classList.remove('hidden');
}


 const e = 1.602176634e-19; // Carga elementar em Coulombs
        const K = 8.9875517923e9; // Constante de Coulomb

        function calcCharge() {
            const n = parseFloat(document.getElementById('n-electrons').value);
            const Q = n * e;
            document.getElementById('result-charge').innerText = `Q = ${Q.toExponential()} C`;
        }

        function calcForce() {
            const q1 = parseFloat(document.getElementById('q1').value);
            const q2 = parseFloat(document.getElementById('q2').value);
            const d = parseFloat(document.getElementById('distance').value);
            if (d <= 0) {
                document.getElementById('result-force').innerText = 'Distância deve ser maior que zero.';
                return;
            }
            const F = K * (q1 * q2) / (d * d);
            document.getElementById('result-force').innerText = `F = ${F.toExponential()} N`;
        }
