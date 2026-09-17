const sesion = localStorage.getItem("sesion");
const datos = localStorage.getItem("usuario");

if (sesion !== "activa" || datos === null) {
  window.location.href = "login.html";
}

const usuario = JSON.parse(datos);

document.getElementById("nombre").value = usuario.nombre;
document.getElementById("celular").value = usuario.celular;
document.getElementById("correo").value = usuario.correo;

const iniciales = usuario.nombre
  .split(" ")
  .filter(function(parte) { return parte.length > 0; })
  .slice(0, 2)
  .map(function(parte) { return parte.charAt(0).toUpperCase(); })
  .join("");

document.getElementById("avatar").textContent = iniciales;

document.getElementById("formPerfil").addEventListener("submit", function(evento) {
  evento.preventDefault();

  usuario.nombre = document.getElementById("nombre").value.trim();
  usuario.celular = document.getElementById("celular").value.trim();

  localStorage.setItem("usuario", JSON.stringify(usuario));

  document.getElementById("mensaje").textContent = "Perfil actualizado correctamente.";
});

document.getElementById("cerrarSesion").addEventListener("click", function() {
  localStorage.removeItem("sesion");
  window.location.href = "login.html";
});