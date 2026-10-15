
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
  if (!lista) return;

  lista.innerHTML = productos.map(p => `
    <article class="tarjeta-producto">
      <div style="font-size:50px">${p.emoji}</div>
      <h3>${p.nombre}</h3>
      <p>${dinero(p.precio)}</p>
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
  const detalle = document.getElementById("detalle-carrito");
  const total = document.getElementById("total-carrito");
  const contador = document.getElementById("contador-carrito");

  detalle.innerHTML = carrito.map(p =>
    `<li>${p.nombre} — ${dinero(p.precio)}</li>`
  ).join("");

  total.textContent = dinero(
    carrito.reduce((suma, p) => suma + p.precio, 0)
  );

  contador.textContent = carrito.length;
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  mostrarCarrito();
});
