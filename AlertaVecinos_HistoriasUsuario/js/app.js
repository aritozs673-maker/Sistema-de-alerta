const APP = {
  user() {
    try { return JSON.parse(localStorage.getItem('av_current')) || null; }
    catch (e) { return null; }
  },
  setUser(u) { localStorage.setItem('av_current', JSON.stringify(u)); },
  logout() { localStorage.removeItem('av_current'); location.href = 'index.html'; },
  id(prefix='ID') { return prefix + '-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random()*900+100); },
  esc(s) { return String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); },
  distance(a,b) {
    const R=6371, rad=x=>x*Math.PI/180;
    const dLat=rad(b.lat-a.lat), dLon=rad(b.lng-a.lng);
    const q=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2;
    return R*2*Math.atan2(Math.sqrt(q),Math.sqrt(1-q));
  },
  toast(msg) {
    const t=document.getElementById('toast'); if(!t)return;
    t.textContent=msg; t.style.display='block'; clearTimeout(window.toastTimer);
    window.toastTimer=setTimeout(()=>t.style.display='none',3800);
  },
  require() { if(!APP.user()){ location.href='login.html'; return false; } return true; },
  users() { try{return JSON.parse(localStorage.getItem('av_users')||'[]')}catch(e){return[]} },
  saveUsers(a) { localStorage.setItem('av_users',JSON.stringify(a)); },
  allIncidents() { try{return JSON.parse(localStorage.getItem('av_incidents')||'[]')}catch(e){return[]} },
  saveAllIncidents(a) { localStorage.setItem('av_incidents',JSON.stringify(a)); },
  async incidents() { return APP.allIncidents(); },
  async register(data) {
    const users=APP.users();
    if(users.some(u=>u.correo===data.correo)) throw new Error('Ese correo ya está registrado.');
    const u={id:APP.id('USR'),nombre:data.nombre,celular:data.celular,correo:data.correo,contrasena:data.contrasena,lat:null,lng:null};
    users.push(u); APP.saveUsers(users);
    const session={...u}; delete session.contrasena; APP.setUser(session); return session;
  },
  async login(correo,contrasena) {
    const u=APP.users().find(x=>x.correo===correo && x.contrasena===contrasena);
    if(!u) throw new Error('Correo o contraseña incorrectos.');
    const session={...u}; delete session.contrasena; APP.setUser(session); return session;
  },
  async saveProfile(data) {
    const current=APP.user(); if(!current) throw new Error('La sesión ha expirado.');
    const users=APP.users(); const pos=users.findIndex(x=>x.id===current.id);
    if(pos<0) throw new Error('Usuario no encontrado.');
    users[pos].nombre=data.nombre; users[pos].celular=data.celular; users[pos].lat=data.lat??users[pos].lat; users[pos].lng=data.lng??users[pos].lng;
    APP.saveUsers(users);
    const session={...users[pos]}; delete session.contrasena; APP.setUser(session); return session;
  },
  async saveIncident(data) {
    const u=APP.user(); if(!u) throw new Error('Debes iniciar sesión.');
    const arr=APP.allIncidents();
    const item={id:APP.id('INC'),tipo:data.tipo,descripcion:data.descripcion,ubicacion:data.ubicacion,lat:data.lat??null,lng:data.lng??null,evidencia_datos:data.evidencia?.data||null,evidencia_nombre:data.evidencia?.name||'',fecha:new Date().toISOString(),userId:u.id,userName:u.nombre,resolved:false,confirmados:0,confirmedBy:[]};
    arr.unshift(item); APP.saveAllIncidents(arr); return {ok:true,incidente:item};
  },
  async actionIncident(id,accion) {
    const arr=APP.allIncidents(); const i=arr.find(x=>x.id===id); if(!i) throw new Error('Incidente no encontrado.');
    const u=APP.user();
    if(accion==='resolver') {
      if(i.userId!==u.id) throw new Error('Solo quien creó la alerta puede marcarla como resuelta.');
      i.resolved=true;
    }
    if(accion==='confirmar') {
      i.confirmedBy=i.confirmedBy||[];
      if(!i.confirmedBy.includes(u.id)){i.confirmedBy.push(u.id);i.confirmados=i.confirmedBy.length;}
    }
    APP.saveAllIncidents(arr); return {ok:true,incidente:i};
  },
  queue() { try{return JSON.parse(localStorage.getItem('av_queue')||'[]')}catch(e){return[]} },
  addQueue(a) { const q=APP.queue(); q.push({...a,userId:APP.user()?.id,userName:APP.user()?.nombre}); localStorage.setItem('av_queue',JSON.stringify(q)); },
  syncOffline() {
    const q=APP.queue(); if(!q.length || !APP.user()) return;
    const mine=q.filter(x=>x.userId===APP.user().id); const rest=q.filter(x=>x.userId!==APP.user().id);
    mine.forEach(a=>APP.saveIncident(a));
    localStorage.setItem('av_queue',JSON.stringify(rest));
    if(mine.length) APP.toast('✓ Alertas guardadas sin conexión añadidas a tus reportes.');
  }
};
function nav(){const u=APP.user();document.querySelectorAll('[data-user]').forEach(e=>e.textContent=u?.nombre||'Vecino');}
function logout(){APP.logout();}
document.addEventListener('DOMContentLoaded',()=>{
  nav();
  const protectedPages=['menu','mapa','alerta','alertas','perfil','mis-reportes','detalle','mapbox'];
  if(protectedPages.some(x=>location.pathname.includes(x))&&!APP.require()) return;
  APP.syncOffline();
  const st=document.getElementById('networkStatus');
  if(st){const set=()=>{st.textContent=navigator.onLine?'● En línea':'● Sin conexión';st.className=navigator.onLine?'online':'offline'};set();addEventListener('online',set);addEventListener('offline',set);}
});
