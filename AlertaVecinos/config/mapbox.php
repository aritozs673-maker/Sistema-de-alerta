<?php
header('Content-Type: application/json; charset=utf-8');
if($_SERVER['REQUEST_METHOD']==='GET'){echo json_encode(['ok'=>true,'modo'=>'simulacion','mensaje'=>'El prototipo usa Leaflet + OpenStreetMap. Puedes guardar aquí tu token Mapbox para una futura conexión.']);exit;}
