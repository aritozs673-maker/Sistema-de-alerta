const form = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const usuario = {
    nombre: document.getElementById("nombre").value.trim(),
    celular: document.getElementById("celular").value.trim(),
    correo: document.getElementById("correo").value.trim().toLowerCase(),
    password: document.getElementById("password").value
  };

  const usuarioGuardado = localStorage.getItem("usuario");

  if (usuarioGuardado !== null) {
    const anterior = JSON.parse(usuarioGuardado);

    if (anterior.correo === usuario.correo) {
      mensaje.textContent = "Este correo ya está registrado.";
      return;
    }
  }

  localStorage.setItem("usuario", JSON.stringify(usuario));
  localStorage.removeItem("sesion");

  mensaje.textContent = "Cuenta creada correctamente. Redirigiendo...";

  setTimeout(function() {
    window.location.href = "login.html";
  }, 900);
});