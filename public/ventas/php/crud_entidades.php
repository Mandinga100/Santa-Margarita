<?php   

require 'abre_conexion.php';  

$Accion = $_POST['Accion'];

$arr = array();
$arr["resultado"] = 9; 
$arr["mensaje"] = "Ejecución  erronea"; 



switch ($Accion) {

case "list":
    $query = "SELECT * FROM Entidades ORDER BY Codigo"; 
    $result = $conexion_db->query($query);
    if ($result) {

        $arr["resultado"] = 0; 
        $arr["mensaje"] = "Ejecución correcta"; 
        $arrData = array();
       
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $entidad = mb_convert_encoding($row["IdEntidad"], 'ISO-8859-1', 'UTF-8');
            $row["Acciones"] 
                = "<a><span id='btn_modificar' onclick='Modificar($entidad)'class='jasa-accion fa fa-pencil-square'
            title='Modifica' aria-hidden='true'></span>
            <span> - </span>
            <span id='btn_eliminar' onclick='Eliminar($entidad)' class='jasa-accion fa fa-trash' 
            title='Elimina'  aria-hidden='true'></span>
              </a>";
            $arrData[] = array_map(
                null, 
                $row
            );
          
                $arr["data"] = $arrData;
        };
    };
    break;

case "insert":
      $Nombre = $_POST['Nombre'];
 
    $Nombre = utf8_decode($Nombre);
  

    $query = "INSERT Entidades 
    (Entidad) values  
    ('$Entidad')";
          
    $result = $conexion_db->query($query);
    
    if ($result) {
        if ($conexion_db->affected_rows > 0) {
            $arr["resultado"] = 0; 
            $arr["mensaje"] = "Registro incorporado"; 
           
        } else {

            $arr["resultado"] = 1; 
            $arr["mensaje"] = "Registro no incoporado"; 

        }

    }
                
    
    break;


case "get":
    $IdEntidad = $_POST['IdEntidad'];
    $query = "SELECT * FROM Entidades
     where IdEntidad = $IdEntidad"; 
    $result = $conexion_db->query($query);
    if ($result) {
        if ($conexion_db->affected_rows > 0) {
            $arr["resultado"] = 0; 
            $arr["mensaje"] = "Ejecución correcta"; 
            $arrData = array();

            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $arr["data"] = array_map(null, $row);
            };

        } else {

            $arr["resultado"] = 1; 
            $arr["mensaje"] = "No se encuentra registro"; 

        }

    }
             
    
    break;

case "getcode":
    $IdEmpresa = $_POST['IdEmpresa'];
    $Code = $_POST['Code'];
    $query = "SELECT * FROM Seleciones
        where IdEmpresa= '$IdEmpresa' and Seleccion = '$Code'"; 
    $result = $conexion_db->query($query);
    if ($result) {
        if ($conexion_db->affected_rows > 0) {
            $arr["resultado"] = 0;
            $arr["mensaje"] = "Registro encontrado"; 
            $arrData = array();

            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $arr["data"] = array_map(null, $row);
            };

        } else {

            $arr["resultado"] = 1 ;
            $arr["mensaje"] = "No se encuentra registro"; 

        }

    }
                     
    break;
    
case "update":

    $Nombre = $_POST['Nombre'];
  

    $Nombre = utf8_decode($Nombre);
   

    $query = "UPDATE  Entidades 
    SET
    Nombre = '$Nombre'
   
         
     WHERE IdEntidad = $IdEntidad";
         
    $result = $conexion_db->query($query);
    if ($result) {


        if ($conexion_db->affected_rows > 0) {
            $arr["resultado"] = 0; 
            $arr["mensaje"] = "Registro actualizado"; 
        } else {

            $arr["resultado"] = 1; 
            $arr["mensaje"] = "No hay nada que actualizar"; 
        }

    }
  //  print_r($conexion_db);
    break;
    
case "delete":
    $IdEntidad = $_POST['IdEntidad'];
    
    $query = "UPDATE  Entidades SET Del = 1 where IdEntidad = $IdEntidad"; 
    $result = $conexion_db->query($query);
    if ($result) {

        if ($conexion_db->affected_rows > 0) {
            $arr["resultado"] = 0; 
            $arr["mensaje"] = "Registro eliminado"; 
        } else {

            $arr["resultado"] = 1; 
            $arr["mensaje"] = "No se puede eliminar registro"; 
        }

    }

    break;
    $arr["resultado"] = 9; 
    $arr["mensaje"] = "Acción no definida"; 
   
default:
     
}
//print_r($conexion_db);
mysqli_close($conexion_db);
echo json_encode($arr);
   
?>





 