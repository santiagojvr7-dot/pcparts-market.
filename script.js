
const productos = [
  { id: 1, nombre: "Procesador AMD Ryzen 5", precio: 650000, emoji: "🧠" },
  { id: 2, nombre: "Tarjeta gráfica NVIDIA RTX", precio: 1800000, emoji: "🎮" },
  { id: 3, nombre: "Memoria RAM 16 GB", precio: 180000, emoji: "⚡" },
  { id: 4, nombre: "SSD 1 TB", precio: 280000, emoji: "💾" },
  { id: 5, nombre: "Placa madre gaming", precio: 520000, emoji: "🖥️" },
  { id: 6, nombre: "Fuente de poder 650 W", precio: 300000, emoji: "🔌" }
];

let carrito = [];

const dinero = valor =>
  "$" + valor.toLocaleString("es-CO");


function mostrarProductos() {
  const lista = document.getElementById("lista-productos");

  if (!lista) {
    console.error("No encuentro lista-productos en index.html");
    return;
  }

  lista.innerHTML = `
    <article class="tarjeta-producto">
      <div style="font-size:50px">🧠</div>
      <h3>Procesador AMD Ryzen 5</h3>
      <p>$650.000 COP</p>
      <button onclick="agregarAlCarrito(1)">Agregar al carrito</button>
    </article>

    <article class="tarjeta-producto">
      <div style="font-size:50px">🎮</div>
      <h3>Tarjeta gráfica NVIDIA RTX</h3>
      <p>$1.800.000 COP</p>
      <button onclick="agregarAlCarrito(2)">Agregar al carrito</button>
    </article>

    <article class="tarjeta-producto">
      <div style="font-size:50px">💾</div>
      <h3>SSD de 1 TB</h3>
      <p>$280.000 COP</p>
      <button onclick="agregarAlCarrito(4)">Agregar al carrito</button>
    </article>
  `;
}
