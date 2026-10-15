
const productos = [
  { id: 1, nombre: "Procesador AMD Ryzen 5", precio: 650000, emoji: "🧠" },
  { id: 2, nombre: "Tarjeta gráfica NVIDIA RTX", precio: 1800000, emoji: "🎮" },
  { id: 3, nombre: "Memoria RAM 16 GB", precio: 180000, emoji: "⚡" },
  { id: 4, nombre: "SSD 1 TB", precio: 280000, emoji: "💾" },
  { id: 5, nombre: "Placa madre gaming", precio: 520000, emoji: "🖥️" },
  { id: 6, nombre: "Fuente de poder 650 W", precio: 300000, emoji: "🔌" }
];

let carrito = [];

const formatoPrecio = precio =>
  "$ " + precio.toLocaleString("es-CO");

function mostrarProductos() {
  const catalogo = document.querySelector(
    "#productos, .productos, #catalogo, .catalogo"
  );

  if (!catalogo) return;

  catalogo.innerHTML = productos.map(p => `
    <article class="producto">
      <div style="font-size:48px;text-align:center">${p.emoji}</div>
      <h3>${p.nombre}</h3>
      <p>${formatoPrecio(p.precio)}</p>
      <button onclick="agregarAlCarrito(${p.id})">
        Agregar al carrito
      </button>
    </article>
  `).join("");
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  mostrarCarrito();
}

function mostrarCarrito() {
  const resumen = document.querySelector(
    "#carrito, .carrito, #resumen-carrito"
  );
  if (!resumen) {
    alert("Agregado: " + carrito[carrito.length - 1].nombre);
    return;
  }

  const total = carrito.reduce((suma, p) => suma + p.precio, 0);
  resumen.innerHTML = `
    <h3>Resumen de tu compra</h3>
    ${carrito.map(p => `<p>${p.nombre} — ${formatoPrecio(p.precio)}</p>`).join("")}
    <p><strong>Total: ${formatoPrecio(total)}</strong></p>
  `;
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
