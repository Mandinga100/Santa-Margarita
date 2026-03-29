<?php

require 'abre_conexion.php';

$arr = array();
$arr["resultado"] = 9;
$arr["mensaje"] = "Ejecución  erronea";

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
switch (($data['accion'])) {
    case "get_graphs":
        
        $curyear  =intval($data['year']);
        $preyear  = $curyear -1;




        $arrData1 = array();
        $arrData2 = array();
        $arrData3 = array();
        $arrData4 = array();

        $query = "SELECT t.m  as mes , sum(CASE y WHEN  $curyear  then  monto ELSE 0 END) AS montoact,
         sum( CASE y WHEN  $preyear  then  monto ELSE 0 END) AS montopre  FROM(
        SELECT YEAR(c.CtoFechaHora) as y, MONTH(c.CtoFechaHora)as m, sum(c.TotalPagar) as monto       
         FROM Contratos c
         WHERE   c.Del <> 1 AND   YEAR(c.CtoFechaHora) BETWEEN  $preyear AND $curyear
         GROUP BY YEAR(c.CtoFechaHora), MONTH(c.CtoFechaHora) )


         AS t     
         GROUP BY t.m
         ";

        $result = $conexion_db->query($query);

        if ($result) {
            if ($conexion_db->affected_rows > 0) {
              

                while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                    $arrData1[] = $row;
                };
            } else {

                $arr["resultado"] = 1;
                $arr["mensaje"] = "No se encuentra registro";
            }
        }

        // Grafico 2

        $query = "SELECT t.m  as mes , SUM(CASE y WHEN  $curyear  then  qty ELSE 0 END) AS qtyact,
         SUM( CASE y WHEN  $preyear  then  qty ELSE 0 END) AS qtypre 
          FROM(
        SELECT YEAR(c.CtoFechaHora) as y, MONTH(c.CtoFechaHora)as m, COUNT(*) as qty       
         FROM Contratos c
         WHERE   c.Del <> 1
         GROUP BY YEAR(c.CtoFechaHora), MONTH(c.CtoFechaHora) )
         AS t     
         GROUP BY t.m
         ";

        $result = $conexion_db->query($query);

        if ($result) {
            if ($conexion_db->affected_rows > 0) {
             

                while ($row = $result->fetch_array(MYSQLI_ASSOC)) {


                    $arrData2[] = $row;
                };
            } else {

                $arr["resultado"] = 1;
                $arr["mensaje"] = "No se encuentra registro";
            }
        }

        echo json_encode([
            'success' => true,
            'message' => 'datos obtenidos',
            'datos1'  => $arrData1,
            'datos2'  => $arrData2,
            'datos3'  => $arrData3,
            'datos4'  => $arrData4,
        ]);

        break;

    case "get_graphsx":

        break;

    default:
}


exit;
