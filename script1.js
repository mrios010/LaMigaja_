// =========================================================
// LA MIGAJA - JAVASCRIPT DE LA HOJA 1
// =========================================================

// Este archivo se mantiene sencillo porque la Hoja 1
// principalmente necesita navegación e interacción visual.
// El carrito y los pedidos se programarán en las Hojas 2 y 3.

// Esperamos a que el HTML termine de cargar.
document.addEventListener("DOMContentLoaded", function () {

    // Mostramos en consola un mensaje para comprobar
    // que JavaScript está conectado correctamente.
    console.log("La Migaja: Hoja 1 cargada correctamente.");

    // Seleccionamos todos los enlaces que llevan a una
    // sección del catálogo, por ejemplo: #dulce.
    const enlacesCategoria = document.querySelectorAll(
        'a[href^="catalogo.html#"]'
    );

    // Añadimos una pequeña interacción al hacer clic.
    enlacesCategoria.forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            console.log("Navegando hacia: " + enlace.getAttribute("href"));
        });
    });
});
