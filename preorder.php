<?php
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$telefono = $_POST['mensaje'];
$direccion = $_POST['direccion'];
$nivel = $_POST['nivel'];
$endulzante = $_POST['endulzante'];
$harina = $_POST['harina'];


$header = 'From: ' . $mail . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$mensaje = "Solicitante: " . $nombre . ",\r\n";
$mensaje .= "Su e-mail es: " . $correo . " \r\n";
$mensaje .= "Su teléfono es: " . $telefono . " \r\n";
$mensaje .= "Su dirección es: " . $direccion . " \r\n";
$mensaje .= "Nivel de dulce: " . $nivel . " \r\n";
$mensaje .= "Edulzante: " . $endulzante . " \r\n";
$mensaje .= "Harina: " . $harina . " \r\n";
//$mensaje .= "Mensaje: " . $_POST['mensaje'] . " \r\n";
$mensaje .= "Enviado el " . date('d/m/Y', time());

$para = 'eraseunavezpasteleria@gmail.com';
$asunto = 'Hay una nueva pre-orden';

mail($para, $asunto, utf8_decode($mensaje), $header);

header("Location:pedido.html");
?>

                        