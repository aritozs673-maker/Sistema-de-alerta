const form = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const correo = document.getElementById("correo").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const datos = localStorage.getItem("usuario");

  if (datos === null) {
    mensaje.textContent = "No existe un usuario registrado.";
    return;
  }

  const usuario = JSON.parse(datos);

  if (usuario.correo === correo && usuario.password === password) {
    localStorage.setItem("sesion", "activa");
    window.location.href = "perfil.html";
  } else {
    mensaje.textContent = "Correo o contraseña inválidos.";
  }
});