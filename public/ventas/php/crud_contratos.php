<?php

require 'abre_conexion.php';
$Accion = $_POST['Accion'];
$arr = array();
$arr["resultado"] = 9;
$arr["mensaje"] = "Ejecución  erronea";

switch ($Accion) {
    case "list":

        $query = "SELECT c.* , COALESCE( r11.Codigo, '******' ) AS Estado        
         FROM Contratos c
         LEFT JOIN Referencias  r11 ON r11.IdReferencia  = c.IdEstado
         WHERE   c.Del <> 1 ORDER BY  IdContrato DESC";

        $result = $conexion_db->query($query);
        if ($result) {
            $arr["resultado"] = 0;
            $arr["mensaje"] = "Ejecución correcta";
            $arrData = array();
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $IdContrato = $row["IdContrato"];
                $row["Acciones"]
                    = "<button id='btn_modificar' onclick='Modificar($IdContrato)' class='btn btn-success fa fa-pencil-square'title='Modifica' aria-hidden='true'></button> " .
                     "<button id='btn_descargar' onclick='Descargar($IdContrato)' class='btn btn-secondary fa fa-download' title='Descargar'  aria-hidden='true'></button> " .
                    "<button id='btn_imprimir' onclick='Imprimir($IdContrato)' class='btn btn-primary fa fa-print' title='Imprimir'  aria-hidden='true'></button> " .
                    "<button id='btn_eliminar' onclick='Eliminar($IdContrato)' class='btn btn-danger fa fa-trash' title='Eliminar'  aria-hidden='true'></button>";


               // $arrData[] = array_map(null, $row);
               // $arrData[] = array_map(null, $row);

               
        
                $arrData[] =$row;
                
                 };
                $arr["data"] = $arrData;
           
        };
     //   print_r($arr["data"]);
        break;


    case "insert":


        $IdAno = $_POST['IdAno'];
        $IdContrato = $_POST['IdContrato'];
        $IdNecesidad = $_POST['IdNecesidad'];
        $IdEstCivil = $_POST['IdEstCivil'];
        $IdPrevision = $_POST['IdPrevision'];
        $IdOcupacion = $_POST['IdOcupacion'];
        $IdEscolaridad = $_POST['IdEscolaridad'];
        $IdCofre = $_POST['IdCofre'];
        $IdCapilla = $_POST['IdCapilla'];
        $IdCarroza = $_POST['IdCarroza'];
        $IdAuto = $_POST['IdAuto'];
        $IdVan = $_POST['IdVan'];
        $IdCruz = $_POST['IdCruz'];
        $IdTarjetero = $_POST['IdTarjetero'];
        $IdLibroCond = $_POST['IdLibroCond'];
        $IdTarjeCond = $_POST['IdTarjeCond'];
        $IdArreUrna = $_POST['IdArreUrna'];
        $IdArrePie = $_POST['IdArrePie'];
        $IdTramRegCivl = $_POST['IdTramRegCivl'];
        $IdCertMedico = $_POST['IdCertMedico'];
        $IdConvenio = $_POST['IdConvenio'];
        $IdNacionalidad = $_POST['IdNacionalidad'];
        $IdParentesco = $_POST['IdParentesco'];

        $FechaFuneral = $_POST['FechaFuneral'];
        $ValorUrna = $_POST['ValorUrna'];
        $PorceDescuento = $_POST['PorceDescuento'];
        $DescuentoFijo = $_POST['DescuentoFijo'];
        $Subtotal = $_POST['Subtotal'];
        $MontoCertificacion = $_POST['MontoCertificacion'];
        $MontoAdicional = $_POST['MontoAdicional'];
        $TotalPagar = $_POST['TotalPagar'];
        $AportePrevisional = $_POST['AportePrevisional'];
        $MontoEfectivo = $_POST['MontoEfectivo'];
        $MontoTransferencia = $_POST['MontoTransferencia'];
        $MontoDebito = $_POST['MontoDebito'];
        $MontoCredito = $_POST['MontoCredito'];
        $Cuadratura = $_POST['Cuadratura'];
        $Fecha = $_POST['Fecha'];

        $IdVendedor = $_POST['IdVendedor'];
        $NroContrato = $_POST['NroContrato'];

        $ClteNombre = $_POST['ClteNombre'];
        $ClteRut = $_POST['ClteRut'];
        $ClteFono1 = $_POST['ClteFono1'];
        $ClteFono2 = $_POST['ClteFono2'];
        $ClteMail = $_POST['ClteMail'];
        $ClteDireccion = $_POST['ClteDireccion'];
        $BenefNombre = $_POST['BenefNombre'];
        $BenefRut = $_POST['BenefRut'];
        $BenefDirDesc = $_POST['BenefDirDesc'];
        $BenefDirDomi = $_POST['BenefDirDomi'];
        $BenefFechaDesc = $_POST['BenefFechaDesc'];
        $BenefFechaNac = $_POST['BenefFechaNac'];
        $DirVelorio = $_POST['DirVelorio'];
        $DirSepul = $_POST['DirSepul'];
        $CtoFechaHora = $_POST['CtoFechaHora'];
        $IdEstado = $_POST['IdEstado'];


        $Dimensiones = $_POST['Dimensiones'];



        // $ClteNombre = mb_convert_encoding($ClteNombre,  'ISO-8859-1');
        // $ClteDireccion = mb_convert_encoding($ClteDireccion,  'ISO-8859-1');
        // $BenefNombre = mb_convert_encoding($BenefNombre,  'ISO-8859-1');
        // $BenefDirDesc = mb_convert_encoding($BenefDirDesc,  'ISO-8859-1');
        // $BenefDirDomi = mb_convert_encoding($BenefDirDomi,  'ISO-8859-1');
        // $DirVelorio = mb_convert_encoding($DirVelorio,  'ISO-8859-1');
        // $DirSepul = mb_convert_encoding($DirSepul,  'ISO-8859-1');

        //list($dia, $mes, $año) = explode('-', $cfec);
        //$cfec = $año."-".$mes."-".$dia;
        $query = "INSERT INTO Contratos
    (
        IdAno,

IdNecesidad,
IdEstCivil,
IdPrevision,
IdOcupacion,
IdEscolaridad,
IdCofre,
IdCapilla,
IdCarroza,
IdAuto,
IdVan,
IdCruz,
IdTarjetero,
IdLibroCond,
IdTarjeCond,
IdArreUrna,
IdArrePie,
IdTramRegCivl,
IdCertMedico,
IdConvenio,
IdNacionalidad,
IdParentesco,
FechaFuneral,
ValorUrna,
PorceDescuento,
DescuentoFijo,
Subtotal,
MontoCertificacion,
MontoAdicional,
TotalPagar,
AportePrevisional,
MontoEfectivo,
MontoTransferencia,
MontoDebito,
MontoCredito,
Cuadratura,
Fecha,

IdVendedor,

ClteNombre,
ClteRut,
ClteFono1,
ClteFono2,
ClteMail,
ClteDireccion,
BenefNombre,
BenefRut,
BenefDirDesc,
BenefDirDomi,
BenefFechaDesc,
BenefFechaNac,
DirVelorio,
DirSepul,
CtoFechaHora,
IdEstado,

Dimensiones,
NroContrato


    ) 
    values 
    (
        '$IdAno',
   
    '$IdNecesidad',
    '$IdEstCivil',
    '$IdPrevision',
    '$IdOcupacion',
    '$IdEscolaridad',
    '$IdCofre',
    '$IdCapilla',
    '$IdCarroza',
    '$IdAuto',
    '$IdVan',
    '$IdCruz',
    '$IdTarjetero',
    '$IdLibroCond',
    '$IdTarjeCond',
    '$IdArreUrna',
    '$IdArrePie',
    '$IdTramRegCivl',
    '$IdCertMedico',
    '$IdConvenio',
    '$IdNacionalidad',
    '$IdParentesco',
    '$FechaFuneral',
    '$ValorUrna',
    '$PorceDescuento',
    '$DescuentoFijo',
    '$Subtotal',
    '$MontoCertificacion',
    '$MontoAdicional',
    '$TotalPagar',
    '$AportePrevisional',
    '$MontoEfectivo',
    '$MontoTransferencia',
    '$MontoDebito',
    '$MontoCredito',
    '$Cuadratura',
    '$Fecha',

    '$IdVendedor',
   
    
    '$ClteNombre',
    '$ClteRut',
    '$ClteFono1',
    '$ClteFono2',
    '$ClteMail',
    '$ClteDireccion',
    '$BenefNombre',
    '$BenefRut',
    '$BenefDirDesc',
    '$BenefDirDomi',
    '$BenefFechaDesc',
    '$BenefFechaNac',
    '$DirVelorio',
    '$DirSepul',
    '$CtoFechaHora',
    '$IdEstado',

    '$Dimensiones',
    (SELECT Correlativo + 1 FROM Referencias WHERE IdReferencia = 674)


    )";
        $result = $conexion_db->query($query);
        if ($result) {

            if ($conexion_db->affected_rows > 0) {

                $last_id = $conexion_db->insert_id;
                $arr["insertId"] = $last_id;
                $query = "UPDATE Referencias SET Correlativo = Correlativo + 1  WHERE IdReferencia = 674";
                $result = $conexion_db->query($query);
                $arr["mensaje"] = "Registro incoporado";
                $arr["resultado"] = 0;
            } else {

                $arr["resultado"] = 1;
                $arr["mensaje"] = "Registro no incoporado";
            }
        }

    //    print_r($conexion_db);
        break;


    case "get":

        $IdContrato = $_POST['IdContrato'];

        $query = "SELECT *  FROM Contratos
     
            
        WHERE IdContrato =  '$IdContrato'";
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
        // print_r($conexion_db);
        break;



    case "getcto":
        $IdContrato = $_POST['IdContrato'];

        $query = "SELECT c.* ,


        COALESCE( r1.Codigo, '******' ) AS Ano,
        COALESCE( r2.Codigo, '******' ) AS ArrePie,
        COALESCE( r3.Codigo, '******' ) AS ArreUrna,
        COALESCE( r4.Codigo, '******' ) AS Autox,
        COALESCE( r5.Codigo, '******' ) AS Capilla,
        COALESCE( r6.Codigo, '******' ) AS Carroza,
        COALESCE( r7.Codigo, '******' ) AS CertMedico,
        COALESCE( r8.Codigo, '******' ) AS Cofre,
        COALESCE( r8.Text1, '******' ) AS Dimensiones,
        COALESCE( r9.Codigo, '******' ) AS Contrato,
        COALESCE( r10.Codigo, '******' ) AS Cruz,
        COALESCE( r11.Codigo, '******' ) AS Estado,
        COALESCE( r12.Codigo, '******' ) AS EstCivil,
        COALESCE( r13.Codigo, '******' ) AS LibroCond,
        COALESCE( r14.Codigo, '******' ) AS Necesidad,
        COALESCE( r15.Codigo, '******' ) AS Prevision,
        COALESCE( r16.Codigo, '******' ) AS TarjeCond,
        COALESCE( r17.Codigo, '******' ) AS Tarjetero,
        COALESCE( r18.Codigo, '******' ) AS TramRegCivl,
        COALESCE( r19.Codigo, '******' ) AS Van,
        COALESCE( r20.Codigo, '******' ) AS Vendedor,
        COALESCE( r21.Codigo, '******' ) AS Convenio,
        COALESCE( r22.Codigo, '******' ) AS Nacionalidad,
        COALESCE( r23.Codigo, '******' ) AS Parentesco,
        COALESCE( r24.Codigo, '******' ) AS Ocupacion,
        COALESCE( r25.Codigo, '******' ) AS Escolaridad,
        COALESCE( u.Nombre, '******' ) AS Agente
        



        FROM Contratos c
        LEFT JOIN Referencias  r1 ON r1.IdReferencia  = c.IdAno
        LEFT JOIN Referencias  r2 ON r2.IdReferencia  = c.IdArrePie
        LEFT JOIN Referencias  r3 ON r3.IdReferencia  = c.IdArreUrna
        LEFT JOIN Referencias  r4 ON r4.IdReferencia  = c.IdAuto
        LEFT JOIN Referencias  r5 ON r5.IdReferencia  = c.IdCapilla
        LEFT JOIN Referencias  r6 ON r6.IdReferencia  = c.IdCarroza
        LEFT JOIN Referencias  r7 ON r7.IdReferencia  = c.IdCertMedico
        LEFT JOIN Referencias  r8 ON r8.IdReferencia  = c.IdCofre
        LEFT JOIN Referencias  r9 ON r9.IdReferencia  = c.IdContrato
        LEFT JOIN Referencias  r10 ON r10.IdReferencia  = c.IdCruz
        LEFT JOIN Referencias  r11 ON r11.IdReferencia  = c.IdEstado
        LEFT JOIN Referencias  r12 ON r12.IdReferencia  = c.IdEstCivil
        LEFT JOIN Referencias  r13 ON r13.IdReferencia  = c.IdLibroCond
        LEFT JOIN Referencias  r14 ON r14.IdReferencia  = c.IdNecesidad
        LEFT JOIN Referencias  r15 ON r15.IdReferencia  = c.IdPrevision
        LEFT JOIN Referencias  r16 ON r16.IdReferencia  = c.IdTarjeCond
        LEFT JOIN Referencias  r17 ON r17.IdReferencia  = c.IdTarjetero
        LEFT JOIN Referencias  r18 ON r18.IdReferencia  = c.IdTramRegCivl
        LEFT JOIN Referencias  r19 ON r19.IdReferencia  = c.IdVan
        LEFT JOIN Referencias  r20 ON r20.IdReferencia  = c.IdVendedor
        LEFT JOIN Referencias  r21 ON r21.IdReferencia  = c.IdConvenio
        LEFT JOIN Referencias  r22 ON r22.IdReferencia  = c.IdNacionalidad
        LEFT JOIN Referencias  r23 ON r23.IdReferencia  = c.IdParentesco
        LEFT JOIN Referencias  r24 ON r24.IdReferencia  = c.IdOcupacion
        LEFT JOIN Referencias  r25 ON r25.IdReferencia  = c.IdEscolaridad
        LEFT JOIN Usuarios u   ON u.IdUsuario  = c.IdVendedor
        

        where  c.IdContrato =  '$IdContrato'   and c. Del <> 1";

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
        //  print_r($conexion_db);
        break;







    case "getcode":
        $Code = $_POST['Code'];
        $query = "SELECT * FROM contratos
     where  alum_rut = '$Code' and Del <> 1";
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

                $arr["resultado"] = 1;
                $arr["mensaje"] = "No se encuentra registro";
            }
        }

        break;


    case "update":


        $IdAno = $_POST['IdAno'];
        $IdContrato = $_POST['IdContrato'];
        $IdNecesidad = $_POST['IdNecesidad'];
        $IdEstCivil = $_POST['IdEstCivil'];
        $IdPrevision = $_POST['IdPrevision'];
        $IdOcupacion = $_POST['IdOcupacion'];
        $IdEscolaridad = $_POST['IdEscolaridad'];
        $IdCofre = $_POST['IdCofre'];
        $IdCapilla = $_POST['IdCapilla'];
        $IdCarroza = $_POST['IdCarroza'];
        $IdAuto = $_POST['IdAuto'];
        $IdVan = $_POST['IdVan'];
        $IdCruz = $_POST['IdCruz'];
        $IdTarjetero = $_POST['IdTarjetero'];
        $IdLibroCond = $_POST['IdLibroCond'];
        $IdTarjeCond = $_POST['IdTarjeCond'];
        $IdArreUrna = $_POST['IdArreUrna'];
        $IdArrePie = $_POST['IdArrePie'];
        $IdTramRegCivl = $_POST['IdTramRegCivl'];
        $IdCertMedico = $_POST['IdCertMedico'];
        $IdConvenio = $_POST['IdConvenio'];
        $IdNacionalidad = $_POST['IdNacionalidad'];
        $IdParentesco = $_POST['IdParentesco'];
        $FechaFuneral = $_POST['FechaFuneral'];
        $ValorUrna = $_POST['ValorUrna'];
        $PorceDescuento = $_POST['PorceDescuento'];
        $DescuentoFijo = $_POST['DescuentoFijo'];
        $Subtotal = $_POST['Subtotal'];
        $MontoCertificacion = $_POST['MontoCertificacion'];
        $MontoAdicional = $_POST['MontoAdicional'];
        $TotalPagar = $_POST['TotalPagar'];
        $AportePrevisional = $_POST['AportePrevisional'];
        $MontoEfectivo = $_POST['MontoEfectivo'];
        $MontoTransferencia = $_POST['MontoTransferencia'];
        $MontoDebito = $_POST['MontoDebito'];
        $MontoCredito = $_POST['MontoCredito'];
        $Cuadratura = $_POST['Cuadratura'];
        $Fecha = $_POST['Fecha'];

        $IdVendedor = $_POST['IdVendedor'];
        $NroContrato = $_POST['NroContrato'];

        $ClteNombre = $_POST['ClteNombre'];
        $ClteRut = $_POST['ClteRut'];
        $ClteFono1 = $_POST['ClteFono1'];
        $ClteFono2 = $_POST['ClteFono2'];
        $ClteMail = $_POST['ClteMail'];
        $ClteDireccion = $_POST['ClteDireccion'];
        $BenefNombre = $_POST['BenefNombre'];
        $BenefRut = $_POST['BenefRut'];
        $BenefDirDesc = $_POST['BenefDirDesc'];
        $BenefDirDomi = $_POST['BenefDirDomi'];
        $BenefFechaDesc = $_POST['BenefFechaDesc'];
        $BenefFechaNac = $_POST['BenefFechaNac'];
        $DirVelorio = $_POST['DirVelorio'];
        $DirSepul = $_POST['DirSepul'];
        $CtoFechaHora = $_POST['CtoFechaHora'];
        $IdEstado = $_POST['IdEstado'];

        $Dimensiones = $_POST['Dimensiones'];

        // $ClteNombre = mb_convert_encoding($ClteNombre,  'ISO-8859-1');
        // $ClteDireccion = mb_convert_encoding($ClteDireccion,  'ISO-8859-1');
        // $BenefNombre = mb_convert_encoding($BenefNombre,  'ISO-8859-1');
        // $BenefDirDesc = mb_convert_encoding($BenefDirDesc,  'ISO-8859-1');
        // $BenefDirDomi = mb_convert_encoding($BenefDirDomi,  'ISO-8859-1');
        // $DirVelorio = mb_convert_encoding($DirVelorio,  'ISO-8859-1');
        // $DirSepul = mb_convert_encoding($DirSepul,  'ISO-8859-1');

        $query = "UPDATE Contratos
SET   
IdAno = '$IdAno',
IdContrato = '$IdContrato',
IdNecesidad = '$IdNecesidad',
IdEstCivil = '$IdEstCivil',
IdPrevision = '$IdPrevision',
IdOcupacion = '$IdOcupacion',
IdEscolaridad = '$IdEscolaridad',
IdCofre = '$IdCofre',
IdCapilla = '$IdCapilla',
IdCarroza = '$IdCarroza',
IdAuto = '$IdAuto',
IdVan = '$IdVan',
IdCruz = '$IdCruz',
IdTarjetero = '$IdTarjetero',
IdLibroCond = '$IdLibroCond',
IdTarjeCond = '$IdTarjeCond',
IdArreUrna = '$IdArreUrna',
IdArrePie = '$IdArrePie',
IdTramRegCivl = '$IdTramRegCivl',
IdCertMedico = '$IdCertMedico',
IdConvenio = '$IdConvenio',
IdNacionalidad = '$IdNacionalidad',
IdParentesco = '$IdParentesco',
FechaFuneral = '$FechaFuneral',
ValorUrna = '$ValorUrna',
PorceDescuento = '$PorceDescuento',
DescuentoFijo = '$DescuentoFijo',
Subtotal = '$Subtotal',
MontoCertificacion = '$MontoCertificacion',
MontoAdicional = '$MontoAdicional',
TotalPagar = '$TotalPagar',
AportePrevisional = '$AportePrevisional',
MontoEfectivo = '$MontoEfectivo',
MontoTransferencia = '$MontoTransferencia',
MontoDebito = '$MontoDebito',
MontoCredito = '$MontoCredito',
Cuadratura = '$Cuadratura',
Fecha = '$Fecha',

IdVendedor = '$IdVendedor',
NroContrato = '$NroContrato',

ClteNombre = '$ClteNombre',
ClteRut = '$ClteRut',
ClteFono1 = '$ClteFono1',
ClteFono2 = '$ClteFono2',
ClteMail = '$ClteMail',
ClteDireccion = '$ClteDireccion',
BenefNombre = '$BenefNombre',
BenefRut = '$BenefRut',
BenefDirDesc = '$BenefDirDesc',
BenefDirDomi = '$BenefDirDomi',
BenefFechaDesc = '$BenefFechaDesc',
BenefFechaNac = '$BenefFechaNac',
DirVelorio = '$DirVelorio',
DirSepul = '$DirSepul',
CtoFechaHora = '$CtoFechaHora',
IdEstado = '$IdEstado',

Dimensiones = '$Dimensiones'







WHERE IdContrato = '$IdContrato'";

        $result = $conexion_db->query($query);
        if ($result) {


            if ($conexion_db->affected_rows > 0) {
                $arr["insertId"] = $IdContrato;
                $arr["resultado"] = 0;
                $arr["mensaje"] = "Registro modificado";
            } else {

                $arr["resultado"] = 1;
                $arr["mensaje"] = "Nada que modificar";
            }
        }
         // print_r($conexion_db);
        break;

    case "delete":
        $IdContrato = $_POST['IdContrato'];

        $query = "UPDATE  Contratos SET Del = 1 where IdContrato = $IdContrato";
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
//print_r($arr);
mysqli_close($conexion_db);
echo json_encode($arr,true);
