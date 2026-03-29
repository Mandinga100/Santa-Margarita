<?php 
/**
 * Conexion a la base de datos
 *
 * @category   Routine
 * @package    None
 * @author     Jorge A. Silva <jsilva@jasaservives.com>
 * @copyright  2002 JASASERVICES.COM    
 * @license    jasaservices 
 * @version    CVS: <'1234>
 * @link       No disponible    
 * @see        jasaservices
 * @since      File available since Release 1.0.0
 * @deprecated No deprecated
 */



$hotsdb = "199.58.164.7";      // Servidor del  Motor de la Base de Datos
$basededatos = "funerar1_stamgta"; // Nombre de la base de datos
$usuariodb = "funerar1_root";        // Usuario de la base de datos 
$clavedb = "jPsg;ROWj&pX";               // Passord del ususuario de la base de datos          // Passord del ususuario de la base de datos 

$conexion_db = new mysqli($hotsdb, $usuariodb, $clavedb, $basededatos);

if ($conexion_db->connect_errno)
{
  echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
  exit();
}

mysqli_set_charset( $conexion_db, 'utf8' );
?> 
