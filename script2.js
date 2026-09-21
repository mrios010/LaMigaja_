// =========================================================
// LA MIGAJA - HOJA 2: CATÁLOGO
// =========================================================
// Este JavaScript controla el carrito de compras.
// Se utiliza localStorage para conservar los productos
// cuando el usuario cambia de página.
// =========================================================

const CLAVE_CARRITO = "carritoLaMigaja";

// ---------------------------------------------------------
// Obtener el carrito guardado.
// Si no existe, devolvemos un arreglo vacío.
// ---------------------------------------------------------
function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

    if (carritoGuardado) {
        return JSON.parse(carritoGuardado);
    }

    return [];
}

// ---------------------------------------------------------
// Guardar el carrito en localStorage.
// ---------------------------------------------------------
function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// ---------------------------------------------------------
// Agregar un producto al carrito.
// Si el producto ya existe, aumenta su cantidad.
// ---------------------------------------------------------
function agregarAlCarrito(nombre, precio, categoria) {
    const carrito = obtenerCarrito();

    // Buscamos si el producto ya está en el carrito.
    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1,
            categoria: categoria
        });
    }

    guardarCarrito(carrito);
    actualizarCarrito();

    // Mensaje sencillo para avisar al usuario.
    alert(nombre + " fue agregado al carrito.");
}

// ---------------------------------------------------------
// Calcular cuántos productos hay en total.
// ---------------------------------------------------------
function calcularCantidadTotal(carrito) {
    return carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );
}

// ---------------------------------------------------------
// Actualizar la información del carrito que aparece
// al final de la página.
// ---------------------------------------------------------
function actualizarCarrito() {
    const carrito = obtenerCarrito();
    const cantidadTotal = calcularCantidadTotal(carrito);

    const elementoCantidad = document.getElementById("cantidadCarrito");
    const elementoMensaje = document.getElementById("mensajeCarrito");

    if (elementoCantidad) {
        elementoCantidad.textContent = cantidadTotal;
    }

    if (elementoMensaje) {
        if (carrito.length === 0) {
            elementoMensaje.textContent = "Tu carrito está vacío.";
        } else {
            elementoMensaje.textContent =
                "Ya tienes productos listos para realizar tu pedido.";
        }
    }
}

// ---------------------------------------------------------
// Ejecutar cuando la página termina de cargar.
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    actualizarCarrito();

    console.log("La Migaja: Catálogo cargado correctamente.");
});
