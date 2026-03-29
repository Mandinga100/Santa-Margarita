<?php

/**
 * Consulta organizaciones de Usuarios para login
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


require 'jasa_parametros.php';
$arr = array();
$arr[] = array(
    "gbl_web_name" => mb_convert_encoding($gbl_web_name, 'UTF-8'),
    "gbl_app_name" => mb_convert_encoding($gbl_app_name, 'UTF-8'),
    "gbl_app_url" => mb_convert_encoding($gbl_app_url, 'UTF-8'),
    "gbl_mail_cto" => mb_convert_encoding($gbl_mail_cto, 'UTF-8'),
    "gbl_emp_direccion" => mb_convert_encoding($gbl_emp_direccion, 'UTF-8'),
    "gbl_emp_fonos" => mb_convert_encoding($gbl_emp_fonos, 'UTF-8'),
    "gbl_emp_web" => mb_convert_encoding($gbl_emp_web, 'UTF-8'),
    "gbl_data_base_host" => mb_convert_encoding($gbl_data_base_host, 'UTF-8'),
    "gbl_data_base" => mb_convert_encoding($gbl_data_base, 'UTF-8'),
    "gbl_data_base_user" => mb_convert_encoding($gbl_data_base_user, 'UTF-8'),
    "gbl_data_base_user_key" => mb_convert_encoding($gbl_data_base_user_key, 'UTF-8'),
    "gbl_smtp_user" => mb_convert_encoding($gbl_smtp_user, 'UTF-8'),
    "gbl_smtp_key" => mb_convert_encoding($gbl_smtp_key, 'UTF-8'),
    "gbl_smtp_server" => mb_convert_encoding($gbl_smtp_server, 'UTF-8'),
    "gbl_smtp_user_from" => mb_convert_encoding($gbl_smtp_user_from, 'UTF-8'),
    "gbl_smtp_user_from_name" => mb_convert_encoding($gbl_smtp_user_from_name, 'UTF-8'),
    "gbl_aws_bucket" => mb_convert_encoding($gbl_aws_bucket, 'UTF-8'),
    "gbl_aws_id" => mb_convert_encoding($gbl_aws_id, 'UTF-8'),
    "gbl_aws_key" => mb_convert_encoding($gbl_aws_key, 'UTF-8'),
    "gbl_app_version" => mb_convert_encoding($gbl_app_version, 'UTF-8'),
    "gbl_app_build" => mb_convert_encoding($gbl_app_build, 'UTF-8')
);

echo json_encode($arr);
