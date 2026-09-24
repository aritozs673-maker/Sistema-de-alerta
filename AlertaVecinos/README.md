# ALERTA VECINOS — Prototipo según Historias de Usuario

## Cómo ejecutar
1. Descomprime el ZIP.
2. Abre `index.html` en Chrome/Edge.
3. Registra un usuario.
4. Inicia sesión.
5. Desde el menú prueba cada función.

## Historias implementadas

| ID | Función implementada |
|---|---|
| HU-01 | Registro de usuario con nombre, celular, correo y contraseña. |
| HU-11 | Inicio de sesión validando credenciales guardadas. |
| HU-13 | Edición de nombre y celular desde Perfil. |
| HU-14 | Cerrar sesión y eliminar la sesión actual. |
| HU-03 | Geolocalización mediante API del navegador al crear alerta. |
| HU-15 | Categorías: robo, sospechosa, accidente, emergencia, retén, vandalismo y otro. |
| HU-16 | Adjuntar evidencia multimedia; las imágenes pequeñas se muestran en el detalle. |
| HU-02 | Crear y enviar alerta con datos del incidente. |
| HU-07 | Persistencia de incidentes en una base de datos local simulada con LocalStorage. |
| HU-04 | Mapa interactivo con OpenStreetMap + Leaflet y marcadores. |
| HU-06 | Página de detalle con descripción, ubicación, autor, fecha y evidencia. |
| HU-05 | Cálculo de distancia y listado de alertas a menos de 1 km. |
| HU-09 | Identificación visual de incidentes de tipo “Retén policial”. |
| HU-18 | Confirmar alerta de otro vecino y contabilizar confirmaciones. |
| HU-20 | Marcar un reporte propio como resuelto. |
| HU-10 | Consultar los reportes creados por el usuario. |
| HU-22 | Si no hay conexión, la alerta queda en una cola local y se sincroniza al volver internet. |

## Nota importante para la exposición
Este proyecto es un **prototipo web funcional sin servidor**. Los usuarios e incidentes se almacenan en `localStorage`, por lo que la persistencia funciona en el navegador donde se realiza la demostración.

El mapa usa Leaflet y OpenStreetMap mediante CDN, por lo que para cargar los mapas se necesita conexión a Internet. La geolocalización requiere permiso del navegador y normalmente funciona mejor desde `localhost` o HTTPS.

## Demostración rápida
1. `index.html` → Registrarse.
2. Crear cuenta → menú.
3. Salir → Iniciar sesión con la cuenta creada.
4. Perfil → editar datos.
5. Nueva alerta → elegir categoría → Obtener ubicación → adjuntar imagen → enviar.
6. Mis reportes → comprobar el registro.
7. Mapa → ver marcador y entrar a detalle.
8. Detalle → Confirmar alerta.
9. Si el reporte es propio → Marcar como resuelto.
10. Alertas cercanas → Detectar ubicación.
11. Para HU-22, desconectar internet antes de enviar una alerta y luego volver a conectar.
