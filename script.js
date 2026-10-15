
"use strict";

let productos = [];
let carrito = [];

// Elementos de la página
const listaProductos = document.getElementById("lista-productos");
const contadorCarrito = document.getElementById("contador-carrito");
const detalleCarrito = document.getElementById("detalle-carrito");
const totalCarrito = document.getElementById("total-carrito");

// Emojis definidos en JavaScript para evitar errores de PostgreSQL
const iconosPorId = {
    1: "\u{1F5A5}\uFE0F",
    2: "\u{1F3AE}",
    3: "\u{1F4BE}",
    4: "\u{1F9E0}",
    5: "\u{1F50C}",
    6: "\u26A1",
    7: "\u2328\uFE0F",
    8: "\u{1F5B1}",
    9: "\u{1F5A5}\uFE0F",
    10: "\u{1F3A7}",
    11: "\u{1F4F7}",
    12: "\u{1F4E1}",
    13: "\u{1F4BE}"
};

// Formatear precios en pesos colombianos
function formatearPrecio(precio) {
    return Number(precio).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });
}

// Recuperar el carrito guardado
function cargarCarritoGuardado() {
    try {
        const guardado = JSON.parse(
            localStorage.getItem("hardtech-carrito") || "[]"
        );

        if (Array.isArray(guardado)) {
            carrito = guardado.filter(producto =>
                producto &&
                typeof producto.nombre === "string" &&
                Number.isFinite(Number(producto.precio))
            );
        }
    } catch (error) {
        console.error("Error al recuperar el carrito:", error);
        carrito = [];
    }
}

// Guardar el carrito
function guardarCarrito() {
    try {
        localStorage.setItem(
            "hardtech-carrito",
            JSON.stringify(carrito)
        );
    } catch (error) {
        console.error("Error al guardar el carrito:", error);
    }
}

// Consultar productos de la API
async function cargarProductos() {
    try {
        const respuesta = await fetch("/api/productos");

        if (!respuesta.ok) {
            throw new Error("Error HTTP " + respuesta.status);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
            throw new Error("La API no devolvió una lista.");
        }

        productos = datos;
        mostrarProductos();

    } catch (error) {
        console.error("Error al cargar productos:", error);

        listaProductos.textContent =
            "No se pudieron cargar los productos. Verifica que el servidor esté funcionando.";
    }
}

// Mostrar los productos
function mostrarProductos() {
    listaProductos.replaceChildren();

    if (productos.length === 0) {
        listaProductos.textContent = "No hay productos disponibles.";
        return;
    }

    productos.forEach((producto, indice) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto");

        const icono = document.createElement("div");
        icono.classList.add("icono-producto");
        icono.textContent =
            iconosPorId[Number(producto.id)] || "\u{1F5A5}\uFE0F";

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const categoria = document.createElement("p");
        categoria.textContent = producto.categoria;

        const precio = document.createElement("p");
        const precioTexto = document.createElement("strong");
        precioTexto.textContent = formatearPrecio(producto.precio);
        precio.appendChild(precioTexto);

        const existencias = document.createElement("p");
        existencias.textContent =
            "Existencias: " + Number(producto.existencias);

        const boton = document.createElement("button");
        boton.classList.add("boton-agregar");
        boton.type = "button";
        boton.dataset.indice = indice;

        const agotado = Number(producto.existencias) <= 0;
        boton.textContent = agotado
            ? "Agotado"
            : "Agregar al carrito";
        boton.disabled = agotado;

        tarjeta.append(
            icono,
            nombre,
            categoria,
            precio,
            existencias,
            boton
        );

        listaProductos.appendChild(tarjeta);
    });
}

// Actualizar el resumen del carrito
function actualizarResumenCarrito() {
    contadorCarrito.textContent = carrito.length;
    detalleCarrito.replaceChildren();

    carrito.forEach((producto, indice) => {
        const elemento = document.createElement("li");

        const descripcion = document.createElement("span");
        descripcion.textContent =
            producto.nombre + " - " +
            formatearPrecio(producto.precio) + " ";

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("boton-eliminar");
        botonEliminar.dataset.indiceCarrito = indice;

        elemento.append(descripcion, botonEliminar);
        detalleCarrito.appendChild(elemento);
    });

    const total = carrito.reduce(
        (suma, producto) => suma + Number(producto.precio),
        0
    );

    totalCarrito.textContent = formatearPrecio(total);
    guardarCarrito();
}

// Agregar productos al carrito
listaProductos.addEventListener("click", evento => {
    const boton = evento.target.closest(".boton-agregar");

    if (!boton || boton.disabled) {
        return;
    }

    const indice = Number(boton.dataset.indice);
    const producto = productos[indice];

    if (!producto || Number(producto.existencias) <= 0) {
        return;
    }

    carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        categoria: producto.categoria,
        precio: Number(producto.precio),
        icono: iconosPorId[Number(producto.id)] || ""
    });

    actualizarResumenCarrito();
});

// Eliminar productos del carrito
detalleCarrito.addEventListener("click", evento => {
    const boton = evento.target.closest(".boton-eliminar");

    if (!boton) {
        return;
    }

    const indice = Number(boton.dataset.indiceCarrito);

    if (
        Number.isInteger(indice) &&
        indice >= 0 &&
        indice < carrito.length
    ) {
        carrito.splice(indice, 1);
        actualizarResumenCarrito();
    }
});

// Iniciar la página
cargarCarritoGuardado();
actualizarResumenCarrito();
cargarProductos();

