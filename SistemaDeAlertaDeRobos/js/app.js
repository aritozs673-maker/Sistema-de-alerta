
function irA(ruta){ window.location.href = ruta; }
function cerrarSesion(){
  localStorage.removeItem("usuarioActual");
  window.location.href = "index.html";
}
function obtenerUsuario(){
  try { return JSON.parse(localStorage.getItem("usuarioActual")) || null; }
  catch(e){ return null; }
}
document.addEventListener("DOMContentLoaded",()=>{
  const u=obtenerUsuario();
  document.querySelectorAll("[data-usuario]").forEach(e=>{
    if(u) e.textContent=u.nombre || u.correo || "Vecino";
  });
});
