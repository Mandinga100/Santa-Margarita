<?php   

require 'abre_conexion.php';  

$Accion = $_POST['Accion'];

$arr = array();
$arr["resultado"] = 9; 
$arr["mensaje"] = "Ejecución  erronea"; 



switch ($Accion) {

case "list":
    $IdEmpresa = $_POST['IdEmpresa'];
    
    $query = "SELECT u.*, v.Nombre as Creador , s.Codigo as Rol FROM Usuarios u
    LEFT JOIN Usuarios v ON u.IdGestor = v.IdUsuario 
    LEFT JOIN  Referencias s ON u.IdRol = s.IdReferencia 
    WHERE v.IdEmpresa = '$IdEmpresa' and u.Del <> 1";
    $result = $conexion_db->query($query);
    if ($result) {

        $arr["resultado"] = 0; 
        $arr["mensaje"] = "Ejecución correcta"; 
        $arrData = array();
       
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $usuario = mb_convert_encoding($row["IdUsuario"], 'ISO-8859-1', 'UTF-8');
            $row["Acciones"] 
                = "<a><span id='btn_modificar' onclick='Modificar($usuario)'class='jasa-accion fa fa-pencil-square'
            title='Modifica' aria-hidden='true'></span>
            <span> - </span>
            <span id='btn_eliminar' onclick='Eliminar($usuario)' class='jasa-accion fa fa-trash' 
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
    case "listnames":


     
        $query = "SELECT  
        IdUsuario,
       
        Nombre
       
        
        FROM Usuarios where  Del <> 1";
        $result = $conexion_db->query($query);
        if ($result) {
    
            $arr["resultado"] = 0; 
            $arr["mensaje"] = "Ejecución correcta"; 
            $arrData = array();
            
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
              
                $arrData[] = array_map(
                   null, 
                    $row
                );
                
                    $arr["data"] = $arrData;
            };
        };
     //   print_r($conexion_db);
        break;
        
    


case "insert":
    $IdEmpresa = $_POST['IdEmpresa'];
    $Nombre = $_POST['Nombre'];
    $Mail = $_POST['Mail'];
    $Password = $_POST['Password'];
    $IdRol = $_POST['IdRol'];
    $Estado = $_POST['Estado'];
    $Fecha = $_POST['Fecha'];
    $IdGestor = $_POST['IdGestor'];
    $IdPersonal =0;


    $Nombre = mb_convert_encoding($Nombre, 'ISO-8859-1', 'UTF-8');
    $Mail =mb_convert_encoding($Mail, 'ISO-8859-1', 'UTF-8');
    $Password = mb_convert_encoding($Password, 'ISO-8859-1', 'UTF-8');
    $IdRol =mb_convert_encoding($IdRol, 'ISO-8859-1', 'UTF-8');
    $Estado =mb_convert_encoding($Estado, 'ISO-8859-1', 'UTF-8');
    $Fecha =mb_convert_encoding($Fecha, 'ISO-8859-1', 'UTF-8');
    $IdGestor =mb_convert_encoding($IdGestor, 'ISO-8859-1', 'UTF-8');


    $query = "INSERT Usuarios 
    (IdEmpresa, Nombre, Mail, Password, IdRol, Estado, Fecha, IdGestor, Del,IdPersonal) values  
    ('$IdEmpresa', '$Nombre', '$Mail','$Password', '$IdRol', '$Estado', '$Fecha', '$IdGestor', 0,
    '$IdPersonal')";
          
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
       //    print_r($conexion_db);      
    
    break;


case "get":
    $IdUsuario = $_POST['IdUsuario'];
    $query = "SELECT * FROM Usuarios
     where IdUsuario = $IdUsuario"; 
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
  
    $Code = $_POST['Code'];
    $query = "SELECT u.* , s.Text1 FROM Usuarios u
    LEFT JOIN  Referencias s ON u.IdRol = s.IdReferencia 
        where  Mail = '$Code' and u.Del <> 1";  
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
    $IdUsuario = $_POST['IdUsuario'];
    $Nombre = $_POST['Nombre'];
    $Mail = $_POST['Mail'];
    $Password = $_POST['Password'];
    $IdRol = $_POST['IdRol'];
    $IdGestor= $_POST['IdGestor'];
    $Estado = $_POST['Estado'];
    $IdPersonal =0;

    $Fecha = date("Y-m-d");
    $Nombre = mb_convert_encoding($Nombre, 'ISO-8859-1', 'UTF-8');
    $Mail =mb_convert_encoding($Mail, 'ISO-8859-1', 'UTF-8');
    $Password = mb_convert_encoding($Password, 'ISO-8859-1', 'UTF-8');
    $Estado =mb_convert_encoding($Estado, 'ISO-8859-1', 'UTF-8');

    $query = "UPDATE  Usuarios 
    SET
    Nombre = '$Nombre',
    Mail = '$Mail',
    Password = '$Password',
    IdRol = '$IdRol',
    Estado =  '$Estado',
    Fecha = '$Fecha',
    IdGestor = '$IdGestor',
    IdPersonal = '$IdPersonal'
         
     WHERE IdUsuario = '$IdUsuario'";
         
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
   // print_r($conexion_db);
    break;
    
case "delete":
    $IdUsuario = $_POST['IdUsuario'];
    
    $query = "UPDATE  Usuarios SET Del = 1 where IdUsuario = $IdUsuario"; 
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





 