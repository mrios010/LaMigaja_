```javascript
// ======================================================
// LA MIGAJA - HOJA 3
// Carrito y finalización del pedido
// ======================================================

// Esta es la MISMA clave utilizada en catalogo.html
const CLAVE_CARRITO = "carritoLaMigaja";


// ------------------------------------------------------
// OBTENER CARRITO
// ------------------------------------------------------

function obtenerCarrito() {

  return JSON.parse(
    localStorage.getItem(CLAVE_CARRITO)
  ) || [];

}


// ------------------------------------------------------
// FORMATO DE MONEDA
// ------------------------------------------------------

function formatoMoneda(cantidad) {

  return cantidad.toLocaleString("es-MX", {

    style: "currency",

    currency: "MXN"

  });

}


// ------------------------------------------------------
// ACTUALIZAR CONTADOR DEL CARRITO
// ------------------------------------------------------

function actualizarContador() {

  const carrito = obtenerCarrito();

  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  document.querySelectorAll(".cart-count").forEach(
    (contador) => {

      contador.textContent = cantidadTotal;

    }
  );

}


// ------------------------------------------------------
// MOSTRAR PRODUCTOS DEL CARRITO
// ------------------------------------------------------

function mostrarPedido() {

  const carrito = obtenerCarrito();

  const contenedor =
    document.getElementById("order-items");

  const totalElemento =
    document.getElementById("order-total");

  const carritoVacio =
    document.getElementById("empty-cart");


  // Limpiamos el contenido anterior
  contenedor.innerHTML = "";


  // Si no hay productos
  if (carrito.length === 0) {

    carritoVacio.classList.remove("d-none");

    totalElemento.textContent =
      formatoMoneda(0);

    return;

  }


  // Ocultamos el mensaje de carrito vacío
  carritoVacio.classList.add("d-none");


  let total = 0;


  // Recorremos todos los productos
  carrito.forEach((producto) => {

    const subtotal =
      producto.precio * producto.cantidad;

    total += subtotal;


    const elemento =
      document.createElement("div");


    elemento.className =
      "border-bottom pb-3 mb-3";


    elemento.innerHTML = `

      <div class="d-flex justify-content-between gap-3">

        <div>

          <h3 class="h6 mb-1">
            ${producto.nombre}
          </h3>

          <p class="mb-1 text-muted">
            Cantidad: ${producto.cantidad}
          </p>

          <p class="mb-0 text-muted">
            Precio: ${formatoMoneda(producto.precio)}
          </p>

        </div>

        <span class="fw-bold">

          ${formatoMoneda(subtotal)}

        </span>

      </div>

    `;


    contenedor.appendChild(elemento);

  });


  // Mostramos el total
  totalElemento.textContent =
    formatoMoneda(total);

}


// ------------------------------------------------------
// CAMBIAR ENTRE ENVÍO Y RECOGIDA
// ------------------------------------------------------

function actualizarEntrega() {

  const envio =
    document.getElementById("envio");

  const recogida =
    document.getElementById("recogida");

  const direccion =
    document.getElementById("direccion");

  const areaDireccion =
    document.getElementById("address-area");

  const areaSucursal =
    document.getElementById("branch-area");

  const sucursal =
    document.getElementById("sucursal");


  if (envio.checked) {

    // Mostrar dirección
    areaDireccion.classList.remove("d-none");

    // Ocultar sucursal
    areaSucursal.classList.add("d-none");


    // Dirección obligatoria
    direccion.required = true;

    // Sucursal no obligatoria
    sucursal.required = false;


  } else if (recogida.checked) {

    // Ocultar dirección
    areaDireccion.classList.add("d-none");

    // Mostrar sucursal
    areaSucursal.classList.remove("d-none");


    // Dirección no obligatoria
    direccion.required = false;

    // Sucursal obligatoria
    sucursal.required = true;

  }

}


// ------------------------------------------------------
// CAMBIAR FORMA DE PAGO
// ------------------------------------------------------

function actualizarPago() {

  const efectivo =
    document.getElementById("efectivo");

  const envio =
    document.getElementById("envio");


  // El efectivo solamente tiene sentido para envío
  if (!envio.checked && efectivo.checked) {

    efectivo.checked = false;

    document.getElementById("terminal").checked = true;

  }

}


// ------------------------------------------------------
// CONFIRMAR PEDIDO
// ------------------------------------------------------

function confirmarPedido(evento) {

  evento.preventDefault();


  const formulario =
    document.getElementById("order-form");

  const carrito =
    obtenerCarrito();


  // No permitir confirmar carrito vacío
  if (carrito.length === 0) {

    alert(
      "Tu carrito está vacío. Agrega productos desde el catálogo."
    );

    return;

  }


  // Validar formulario
  if (!formulario.checkValidity()) {

    formulario.classList.add("was-validated");

    return;

  }


  // Mostrar modal
  const modal =
    new bootstrap.Modal(
      document.getElementById("successModal")
    );

  modal.show();


  // Vaciar carrito después de confirmar
  localStorage.removeItem(CLAVE_CARRITO);


  // Actualizar contador
  actualizarContador();


  // Limpiar resumen
  mostrarPedido();

}


// ------------------------------------------------------
// CUANDO CARGA LA PÁGINA
// ------------------------------------------------------

document.addEventListener(
  "DOMContentLoaded",
  function () {

    // Mostrar carrito
    mostrarPedido();

    // Actualizar contador
    actualizarContador();

    // Configurar entrega
    actualizarEntrega();


    // Detectar cambio de entrega
    document
      .querySelectorAll('input[name="entrega"]')
      .forEach((radio) => {

        radio.addEventListener(
          "change",
          function () {

            actualizarEntrega();
            actualizarPago();

          }
        );

      });


    // Detectar envío del formulario
    document
      .getElementById("order-form")
      .addEventListener(
        "submit",
        confirmarPedido
      );

  }
);
```
