# Alerta Vecinos — XAMPP + MySQL + mapa prototipo

## 1. Instalar
1. Instala XAMPP.
2. Inicia **Apache** y **MySQL**.
3. Copia esta carpeta a `C:\xampp\htdocs\AlertaVecinos`.
4. Abre `http://localhost/phpmyadmin`.
5. Importa `database/alerta_vecinos.sql`.
6. Abre `http://localhost/AlertaVecinos/index.html`.

## 2. Base de datos
Base: `alerta_vecinos`
- `usuarios`: HU-01, HU-11, HU-13, HU-14.
- `incidentes`: HU-02, HU-03, HU-07, HU-15, HU-16, HU-20, HU-10.
- `confirmaciones`: HU-18.

La HU-07 se demuestra realmente en MySQL/phpMyAdmin: al enviar una alerta se inserta una fila en `incidentes`.

## 3. Mapa y Mapbox
El proyecto trae un **mapa prototipo funcional** con Leaflet + OpenStreetMap, por lo que puedes mostrar la HU-04 sin configurar todavía Mapbox.

En `mapbox.html` puedes pegar un token de Mapbox. El token se guarda en el navegador solo para la demostración. La página explica que la integración Mapbox queda preparada, mientras el mapa prototipo usa OpenStreetMap.

Para obtener un token real se puede usar una cuenta de Mapbox. No es necesario para demostrar el prototipo.

## 4. Usuario demo
Correo: `demo@alertavecinos.local`
Contraseña: `password`

## 5. Historias demostrables
HU-01 Registro · HU-11 Login · HU-13 Perfil · HU-14 Logout · HU-03 GPS · HU-15 Categoría · HU-16 Evidencia · HU-02 Enviar alerta · HU-07 MySQL · HU-04 Mapa · HU-06 Detalle · HU-05 Cercanía · HU-09 Retén · HU-18 Confirmar · HU-20 Resolver · HU-10 Mis reportes · HU-22 Cola sin conexión.
