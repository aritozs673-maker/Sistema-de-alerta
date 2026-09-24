const APP={
 user(){try{return JSON.parse(localStorage.getItem('av_current'))||null}catch{return null}},
 setUser(u){localStorage.setItem('av_current',JSON.stringify(u))},
 logout(){localStorage.removeItem('av_current');location.href='index.html'},
 id(){return 'INC-'+Date.now().toString(36).toUpperCase()+'-'+Math.floor(Math.random()*900+100)},
 esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))},
 distance(a,b){const R=6371,rad=x=>x*Math.PI/180,dLat=rad(b.lat-a.lat),dLon=rad(b.lng-a.lng),q=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2;return R*2*Math.atan2(Math.sqrt(q),Math.sqrt(1-q))},
 toast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.style.display='block';clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.style.display='none',3800)},
 require(){if(!APP.user()){location.href='login.html';return false}return true},
 async api(url,options={}){const o={...options,headers:{'Content-Type':'application/json',...(options.headers||{})}};const u=APP.user();if(u)o.headers['X-User-ID']=u.id;const r=await fetch(url,o);const d=await r.json().catch(()=>({ok:false,mensaje:'Respuesta no válida del servidor.'}));if(!r.ok||d.ok===false)throw new Error(d.mensaje||'Error de servidor');return d},
 async incidents(){const d=await APP.api('api/incidentes.php');return d.incidentes||[]},
 async saveProfile(data){const d=await APP.api('api/perfil.php',{method:'POST',body:JSON.stringify(data)});APP.setUser(d.usuario);return d.usuario},
 async saveIncident(data){return APP.api('api/incidentes.php',{method:'POST',body:JSON.stringify(data)})},
 async actionIncident(id,accion){return APP.api('api/incidentes.php',{method:'PATCH',body:JSON.stringify({id,accion})})},
 syncOffline:async function(){const q=JSON.parse(localStorage.getItem('av_queue')||'[]');if(!navigator.onLine||!q.length||!APP.user())return;const rest=[];for(const a of q){try{await APP.saveIncident(a)}catch(e){rest.push(a)}}localStorage.setItem('av_queue',JSON.stringify(rest));if(q.length&&!rest.length)APP.toast('✓ Alertas sin conexión sincronizadas con MySQL.')},
 queue(){return JSON.parse(localStorage.getItem('av_queue')||'[]')},
 addQueue(a){const q=APP.queue();q.push(a);localStorage.setItem('av_queue',JSON.stringify(q))}
};
function nav(){const u=APP.user();document.querySelectorAll('[data-user]').forEach(e=>e.textContent=u?.nombre||'Vecino')}
function logout(){APP.logout()}
document.addEventListener('DOMContentLoaded',()=>{nav();const protectedPages=['menu','mapa','alerta','alertas','perfil','mis-reportes','detalle','mapbox'];if(protectedPages.some(x=>location.pathname.includes(x))&&!APP.require())return;APP.syncOffline();const st=document.getElementById('networkStatus');if(st){const set=()=>{st.textContent=navigator.onLine?'● En línea':'● Sin conexión';st.className=navigator.onLine?'online':'offline'};set();addEventListener('online',()=>{set();APP.syncOffline()});addEventListener('offline',set)}});
