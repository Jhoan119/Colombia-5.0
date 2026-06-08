/* ============================================================
   script.js — Lógica del sidebar y navegación
   Colombia 5.0 · SENA
   ============================================================ */

const btnSidebar  = document.getElementById("btn-sidebar");
const sidebar     = document.getElementById("sidebar");
const contenido   = document.getElementById("contenido-principal");
const overlay     = document.getElementById("sidebar-overlay");
const iconoBtn    = btnSidebar.querySelector("i");

/* ----------------------------------------------------------
   Función: abrir o cerrar el sidebar
   ---------------------------------------------------------- */
function toggleSidebar() {
  const estaAbierto = sidebar.classList.contains("activo");

  sidebar.classList.toggle("activo");
  overlay.classList.toggle("activo");
  iconoBtn.classList.toggle("rotado");

  // En pantallas >= 768px el contenido se desplaza
  // En móvil el overlay cubre el contenido sin desplazarlo
  if (window.innerWidth >= 768) {
    contenido.classList.toggle("sidebar-abierto");
  }

  // Accesibilidad: indica si el menú está expandido
  btnSidebar.setAttribute("aria-expanded", String(!estaAbierto));
}

/* ----------------------------------------------------------
   Función: cerrar el sidebar
   ---------------------------------------------------------- */
function cerrarSidebar() {
  sidebar.classList.remove("activo");
  overlay.classList.remove("activo");
  iconoBtn.classList.remove("rotado");
  contenido.classList.remove("sidebar-abierto");
  btnSidebar.setAttribute("aria-expanded", "false");
}

/* ----------------------------------------------------------
   Evento: botón hamburguesa
   ---------------------------------------------------------- */
btnSidebar.addEventListener("click", toggleSidebar);

/* ----------------------------------------------------------
   CORRECCIÓN: Cerrar el sidebar al hacer clic en el overlay
   Antes era imposible cerrar el menú en móvil sin el botón
   ---------------------------------------------------------- */
overlay.addEventListener("click", cerrarSidebar);

/* ----------------------------------------------------------
   CORRECCIÓN: Cerrar el sidebar al hacer clic en un enlace
   Útil en móvil para que el menú no quede abierto tras navegar
   ---------------------------------------------------------- */
const enlaces = sidebar.querySelectorAll(".sidebar-link");
enlaces.forEach(function(enlace) {
  enlace.addEventListener("click", function() {
    if (window.innerWidth < 768) {
      cerrarSidebar();
    }
  });
});

/* ----------------------------------------------------------
   MEJORA: Cerrar sidebar con la tecla Escape
   ---------------------------------------------------------- */
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && sidebar.classList.contains("activo")) {
    cerrarSidebar();
  }
});

/* ----------------------------------------------------------
   MEJORA: Resaltar el enlace activo del sidebar al hacer scroll
   Detecta qué sección está en pantalla y marca el enlace correspondiente
   ---------------------------------------------------------- */
const secciones = document.querySelectorAll("section[id]");

function resaltarEnlaceActivo() {
  const desplazamiento = window.scrollY + 80; // margen del header

  secciones.forEach(function(seccion) {
    const inicio = seccion.offsetTop;
    const fin    = inicio + seccion.offsetHeight;
    const id     = seccion.getAttribute("id");
    const enlace = sidebar.querySelector('a[href="#' + id + '"]');

    if (enlace) {
      if (desplazamiento >= inicio && desplazamiento < fin) {
        // Quita la clase activo de todos los enlaces
        enlaces.forEach(function(e) { e.classList.remove("activo"); });
        // Agrega la clase al enlace que corresponde
        enlace.classList.add("activo");
      }
    }
  });
}

window.addEventListener("scroll", resaltarEnlaceActivo, { passive: true });

/* ----------------------------------------------------------
   MEJORA: Recalcular comportamiento al cambiar tamaño de pantalla
   ---------------------------------------------------------- */
window.addEventListener("resize", function() {
  if (window.innerWidth >= 768 && sidebar.classList.contains("activo")) {
    contenido.classList.add("sidebar-abierto");
  } else {
    contenido.classList.remove("sidebar-abierto");
  }
});

