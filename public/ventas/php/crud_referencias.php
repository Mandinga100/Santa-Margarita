<?php   

require 'abre_conexion.php';  

$Accion = $_POST['Accion'];

$arr = array();
$arr["resultado"] = 9; 
$arr["mensaje"] = "Ejecución  erronea"; 



switch ($Accion) {
case "list":


    $IdEmpresa = $_POST['IdEmpresa'];
    $IdEntidad = $_POST['IdEntidad'];
    $IdEmpresa =  mb_convert_encoding($IdEmpresa, 'ISO-8859-1', 'UTF-8');
    $IdEntidad =  mb_convert_encoding($IdEntidad, 'ISO-8859-1', 'UTF-8');
    
    $query = "SELECT s.*, e.Codigo as Entidad,u.Nombre as Usuario FROM Referencias s
    LEFT JOIN Entidades e ON s.IdEntidad = e.IdEntidad 
    LEFT JOIN Usuarios u ON s.IdUsuario = u.IdUsuario
    WHERE  s.IdEmpresa = '$IdEmpresa' AND s.IdEntidad = $IdEntidad and s.Del <> 1
    Order By s.Secuencia";
    $result = $conexion_db->query($query);
    if ($result) {

        $arr["resultado"] = 0; 
        $arr["mensaje"] = "Ejecución correcta"; 
        $arrData = array();
        
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $Codigo = mb_convert_encoding($row["IdReferencia"], 'ISO-8859-1', 'UTF-8');
            $row["Acciones"] 
                = "<a><span id='btn_modificar' onclick='Modificar($Codigo)'class='jasa-accion fa fa-pencil-square'
            title='Modifica' aria-hidden='true'></span>
            <span> - </span>
            <span id='btn_eliminar' onclick='Eliminar($Codigo)' class='jasa-accion fa fa-trash' 
            title='Elimina'  aria-hidden='true'></span>
            
                </a>";
            $arrData[] = array_map(
                null, 
                $row
            );
            
                $arr["data"] = $arrData;
        };
    };
    //print_r($conexion_db);
    break;

    
case "listchild":


    $IdEmpresa = $_POST['IdEmpresa'];
    $IdEntidad = $_POST['IdEntidad'];
    $IdSelPadre= $_POST['IdSelPadre'];
    $IdEmpresa =  mb_convert_encoding($IdEmpresa, 'ISO-8859-1', 'UTF-8');
    $IdEntidad =  mb_convert_encoding($IdEntidad, 'ISO-8859-1', 'UTF-8');
    
    $query = "SELECT s.*, e.Entidad as Entidad, u.Nombre as Gestor FROM Referencias s
    LEFT JOIN Entidades e ON s.IdEntidad = e.IdEntidad 
    LEFT JOIN Usuarios u ON s.IdUsuario = u.IdUsuario
    WHERE  s.IdEmpresa = '$IdEmpresa'
            AND s.IdEntidad = $IdEntidad 
      
            AND s.Del <> 1
    Order By s.Secuencia";
    $result = $conexion_db->query($query);
    if ($result) {

        $arr["resultado"] = 0; 
        $arr["mensaje"] = "Ejecución correcta"; 
        $arrData = array();
       
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $Codigo =  mb_convert_encoding($row["IdReferencia"], 'ISO-8859-1', 'UTF-8');
            $row["Acciones"] 
                = "<a><span id='btn_modificar' onclick='Modificar($Codigo)'class='jasa-accion fa fa-pencil-square'
            title='Modifica' aria-hidden='true'></span>
            <span> - </span>
            <span id='btn_eliminar' onclick='Eliminar($Codigo)' class='jasa-accion fa fa-trash' 
            title='Elimina'  aria-hidden='true'></span>
          
             </a>";
            $arrData[] = array_map(
                null, 
                $row
            );
          
                $arr["data"] = $arrData;
        };
    };
    //print_r($conexion_db);
    break;


    case "listall":
     
    $query = "SELECT s.*, e.Codigo as Entidad FROM Referencias s
    LEFT JOIN Entidades e ON s.IdEntidad = e.IdEntidad 
    WHERE  s.Del <> 1
    Order By s.IdEntidad, s.Secuencia";
    $result = $conexion_db->query($query);
    if ($result) {

        $arr["resultado"] = 0; 
        $arr["mensaje"] = "Ejecución correcta"; 
        $arrData = array();
        
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
        
                        $arrData[] = array_map(null, $row);
                $arr["data"] = $arrData;
        };
    };
    break;

case "insert":
    $IdEmpresa = $_POST['IdEmpresa'];
    $IdEntidad = $_POST['IdEntidad'];
    $Codigo = $_POST['Codigo'];
    $Nombre = $_POST['Nombre'];
    $Secuencia = $_POST['Secuencia'];
    $Estado = $_POST['Estado'];
    $IdUsuario =  $_POST['IdUsuario'];

    $Text1 = $_POST['Text1'];
    $Text2 = $_POST['Text2'];
    $Text3 = $_POST['Text3'];
    $Text4 = $_POST['Text4'];
    $Correlativo = $_POST['Correlativo'];
  
    $Num1 = $_POST['Num1'];
    $Num2 = $_POST['Num2'];
    $Num3 = $_POST['Num3'];
    $Num4 = $_POST['Num4'];

    $Dec1 = $_POST['Dec1'];
    $Dec2 = $_POST['Dec2'];


    $Date1  = $_POST['Date1'];
    $Date2 = $_POST['Date2'];
   
    $Codigo = mb_convert_encoding($Codigo, 'ISO-8859-1');
    $Nombre = mb_convert_encoding($Nombre, 'ISO-8859-1');
    $Estado = mb_convert_encoding($Estado, 'ISO-8859-1');
    $Fecha = date("Y-m-d");
  
    $Text1 = mb_convert_encoding($Text1, 'ISO-8859-1');
    $Text2 = mb_convert_encoding($Text2, 'ISO-8859-1');
    $Text3 = mb_convert_encoding($Text3, 'ISO-8859-1');
    $Text4 = mb_convert_encoding($Text4, 'ISO-8859-1');



    $query = "INSERT Referencias 
    (IdEmpresa,  IdEntidad, Codigo, Nombre,
    Secuencia,Estado,Fecha, IdUsuario, Del,
    Text1, Text2, Text3, Text4,Correlativo,
     Num1,Num2, Num3,Num4,
     Dec1,Dec2,Date1,Date2) values  
    ('$IdEmpresa',  '$IdEntidad', '$Codigo','$Nombre',
    '$Secuencia', '$Estado','$Fecha' ,'$IdUsuario' , 0, 
    '$Text1', '$Text2',    '$Text3', '$Text4', '$Correlativo',
     '$Num1','$Num2','$Num3','$Num4',
     '$Dec1','$Dec2','$Date1','$Date2'
    )";
     
     

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
                
   // print_r($conexion_db);
    break;


case "get":
    $IdReferencia = $_POST['IdReferencia'];
    $query = "SELECT * FROM Referencias
     where IdReferencia = $IdReferencia"; 
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
    $IdEntidad = $_POST['IdEntidad'];
    $Code = $_POST['Code'];
    $query = "SELECT * FROM Referencias
        where IdEmpresa= '$IdEmpresa' 
        and Codigo  = '$Code' 
        and IdEntidad = $IdEntidad
        and Del <> 1 "; 
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
    $IdReferencia = $_POST['IdReferencia'];
    $Codigo = $_POST['Codigo'];
    $Nombre = $_POST['Nombre'];
    $Secuencia = $_POST['Secuencia'];
    $Estado = $_POST['Estado'];
    $IdUsuario =  $_POST['IdUsuario'];
   
    $Text1 = $_POST['Text1'];
    $Text2 = $_POST['Text2'];
    $Text3 = $_POST['Text3'];
    $Text4 = $_POST['Text4'];

    $Correlativo = $_POST['Correlativo'];
  
    $Num1 = $_POST['Num1'];
    $Num2 = $_POST['Num2'];
    $Num3 = $_POST['Num3'];
    $Num4 = $_POST['Num4'];

    $Dec1 = $_POST['Dec1'];
    $Dec2 = $_POST['Dec2'];


    $Date1  = $_POST['Date1'];
    $Date2 = $_POST['Date2'];
   
    $Codigo = mb_convert_encoding($Codigo, 'ISO-8859-1');
    $Nombre = mb_convert_encoding($Nombre, 'ISO-8859-1');
    $Estado = mb_convert_encoding($Estado, 'ISO-8859-1');
    $Fecha = date("Y-m-d");
  
    $Text1 = mb_convert_encoding($Text1, 'ISO-8859-1');
    $Text2 = mb_convert_encoding($Text2, 'ISO-8859-1');
    $Text3 = mb_convert_encoding($Text3, 'ISO-8859-1');
    $Text4 = mb_convert_encoding($Text4, 'ISO-8859-1');


 
    $query = "UPDATE  Referencias 
SET
    Codigo   = '$Codigo',
    Nombre =   '$Nombre',
    Secuencia   = '$Secuencia',
    Fecha       = '$Fecha',
    Estado      = '$Estado',
    IdUsuario    = '$IdUsuario',
    Text1 = '$Text1',
    Text2 = '$Text2',
    Text4 = '$Text3',
    Text4 = '$Text4',
    Correlativo = '$Correlativo',
    Num1 = '$Num1',
    Num2 = '$Num2',
    Num3 = '$Num3',
    Num4 = '$Num4',
    Dec1 = '$Dec1',
    Dec2 = '$Dec2',
    Date1 = '$Date1',
    Date2 = '$Date2'
        
     WHERE IdReferencia = '$IdReferencia'";

    $result = $conexion_db->query($query);
    if ($result) {


        if ($conexion_db->affected_rows > 0) {
            $arr["resultado"] = 0; 
            $arr["mensaje"] = "Registro modificado"; 
        } else {

            $arr["resultado"] = 1; 
            $arr["mensaje"] = "Nada que modificar"; 
        }

    }



//print_r($conexion_db);
    
    break;
    
case "delete":
    $IdReferencia = $_POST['IdReferencia'];
    
    $query = "UPDATE  Referencias SET Del = 1 where IdReferencia = $IdReferencia"; 
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
