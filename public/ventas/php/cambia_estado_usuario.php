<?php   
//
//   SISTEMA PLATAFORMA DE EVAUACION DIGITAL MIDEUC ORGANIZACONES DESARROLLADO POR WWW.JASAERVICES.COM
//   TODOS LOS DERECHOS RESERVADOS PARA LA PONTIFICIA UNIVERSIDAD CATOLICA DE CHILE
//      
//   LA APLICACION PUEDE INCLUIR OBJETOS DE SOFTWARE 
//   OPEN SOURCE DE LA COMUNIDAD TECNOLOGICA UNIVERSAL

require 'abre_conexion.php';  

$umai =$_POST['usua_mail'];
$uest =$_POST['usua_estado'];


$umai   = utf8_decode($umai);
$uest   = utf8_decode($uest);


$queryIns = "UPDATE Usuarios
SET usua_estado = '$uest'
WHERE usua_mail = '$umai' ";

$ret = "Ok, Usuario actualizado.";

if (!$conexion_db->query($queryIns)) {
    $ret = "Falló : (" . $conexion_db->errno . ") " . $conexion_db->error;
}
mysqli_close($conexion_db);
echo $ret; 
?>

