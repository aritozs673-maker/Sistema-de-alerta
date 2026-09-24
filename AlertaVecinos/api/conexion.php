<?php
header('Content-Type: application/json; charset=utf-8');
$host='127.0.0.1';$db='alerta_vecinos';$user='root';$pass='';
try{$pdo=new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4",$user,$pass,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);}catch(Throwable $e){http_response_code(500);echo json_encode(['ok'=>false,'mensaje'=>'No se pudo conectar a MySQL. Importa database/alerta_vecinos.sql en phpMyAdmin.']);exit;}
function body(){ $d=json_decode(file_get_contents('php://input'),true);return is_array($d)?$d:$_POST; }
function out($d,$code=200){http_response_code($code);echo json_encode($d,JSON_UNESCAPED_UNICODE);exit;}
function authUser($pdo){$id=$_SERVER['HTTP_X_USER_ID']??'';if(!$id)out(['ok'=>false,'mensaje'=>'Sesión requerida.'],401);$s=$pdo->prepare('SELECT id,nombre,celular,correo,lat,lng FROM usuarios WHERE id=?');$s->execute([$id]);$u=$s->fetch();if(!$u)out(['ok'=>false,'mensaje'=>'Usuario no encontrado.'],401);return $u;}
