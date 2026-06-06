// Botón hamburguesa
const btnSidebar = document.getElementById("btn-sidebar");

// Sidebar
const sidebar = document.getElementById("sidebar");

// Evento click
btnSidebar.addEventListener("click", () => {

    sidebar.classList.toggle("activo");

});