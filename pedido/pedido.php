<?php
$nombre = $_POST['nombre'];
$mail = $_POST['email'];
$mensaje = $_POST['mensaje'];
$telefono = $_POST['telefono'];
$direccion = $_POST['direccion'];
$nivel = $_POST['nivel'];
$endulzante = $_POST['endulzante'];
$harina = $_POST['harina'];
$total1 = $_POST['total1'];


$header = 'From: ' . $mail . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";


$mensaje  = "--------SOLICITATE ---------- ". "\r\n";
$mensaje .= "Fecha de solicitud " . date('d/m/Y', time()). "\r\n";
$mensaje .= "Nombre: " . $nombre . ",\r\n";
$mensaje .= "Su e-mail es: " . $mail . " \r\n";
$mensaje .= "Teléfono: " . $telefono . ",\r\n";
$mensaje .= "Dirección: " . $direccion . " \r\n";
$mensaje .= "\n--------PERSONALIZACIÓN ---------- \nNivel de dulce: " . $nivel . " \r\n";
$mensaje .= "Tipo de endulzante: " . $endulzante . " \r\n";
$mensaje .= "Tipo deharina: " . $harina . " \r\n";
$mensaje .= "Solicitud adicional: " . $_POST['mensaje'] . " \r\n";
$mensaje .= "Monto: " . $total1 . " \r\n";


$para = 'eraseunavezpasteleria@gmail.com';
$asunto = 'Pre-orden';

mail($para, $asunto, utf8_decode($mensaje),$header);
header("Location:out.html");

?>