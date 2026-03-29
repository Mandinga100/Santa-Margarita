
var mainUrl = ""
var appName = ""
var appMailContacto = ""
var appModulo = ""
var tablaselecciones = [];
var tablaalumnos = [];
var tabladocentes = [];
var tablausuarios = [];
var tablacuentas = [];
var tablacuentascorrientes = [];

cargaTablaSelecciones();
//cargaTablaAlumnos();
//cargaTablaDocentes();
cargaTablaUsuarios();
//cargaTablaCuentas();
//cargaTablaCtasCtes();
usuario = {
    mail: "",
    rut: "",
    nombre: "",
    orga: "",
    orga_desc: "",
    tipo: "",
    perfil: "",
    estado: "",
    password: "",

}

spanish = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "&ensp;Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Cargando datos....",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad"
    }
}

utter = "";




function verPassword(pwd) {
    var x = document.getElementById(pwd);
    x.type = "text";
    setTimeout(() => {
        x.type = "password";
    }, 3000);

};


function obtenerAppData() {
    mailok = false
    var url = "php/obtener_app_data.php";
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        success: function (dataRet) {
            var data = JSON.parse(dataRet)
            webName = data[0].gbl_web_name;
            appName = data[0].gbl_app_name;
            mainUrl = data[0].gbl_app_url;
            bucket = data[0].gbl_aws_bucket;
            awsid = data[0].gbl_aws_id;
            awskey = data[0].gbl_aws_key;
            appMailContacto = data[0].gbl_mail_cto;

            gbl_emp_direccion = data[0].gbl_emp_direccion;
            gbl_emp_fonos = data[0].gbl_emp_fonos;
            gbl_emp_web = data[0].gbl_emp_web;

        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ": " + jqXHR.status + " " + errorThrown);
        }
    })
    return mailok
}
function validaNombre(objname) {
    objPwd = document.getElementById(objname);
    console.log(objname);
    var texto = objPwd.value;
    {
        if (/[A-Za-z ]{1,32}/.test(texto) && (!esBlanco(texto))) {
            return (true)
        } else {
            return (false)
        }
    }
}

function validaCodigo(objname) {
    objPwd = document.getElementById(objname);
    var texto = objPwd.value;
    {
        if (!esBlanco(texto)) {
            return (true)
        }
        return (false)
    }
}
function validaPwd(objname) {
    objPwd = document.getElementById(objname);
    var texto = objPwd.value;
    var n = texto.length;
    if (n > 5) { return true }
    else { return false };

}
function validaMail(objname) {
    objPwd = document.getElementById(objname);
    var texto = objPwd.value;
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(texto)) {
            return (true)
        }
        return (false)
    }
};


function esBlanco(estring) {
    return !estring || estring.trim() === ''
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + window.btoa(cvalue) + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return window.atob(c.substring(name.length, c.length));
        }
    }
    return "";
}



function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function ahoraamdhms() {
    var now = new Date();
    var hour = now.getHours()
    return now.getFullYear() + "-" + AddZero(now.getMonth() + 1) + "-" + AddZero(now.getDate()) + " " + AddZero(hour) + ":" + AddZero(now.getMinutes()) + ":00";
}

function ahora() {
    var now = new Date();
    var hour = now.getHours() - (now.getHours() >= 12 ? 12 : 0);
    return [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("-"), [AddZero(hour), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");
}

//Pad given value to the left with "0"
function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";

}

function validaRutValor(texto, paisInput) {

    texto = texto.toUpperCase()
    nro = texto.replace(/[^A-Za-z0-9]/g, '')

    if (paisInput == "") {
        pais = paisEmisor(nro);
        if (!pais) { return false; }
        else { }

    } else { pais = paisInput }


    switch (pais) {

        case "Argentina":
            resp = validaIdArgentina(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Bolivia":
            resp = validaIdBolivia(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Brasil":
            resp = validaIdBrasil(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Chile":
            resp = validaModulo11(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Colombia":
            resp = Colombia(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Costa Rica":
            resp = validaIdCostaRica(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Cuba":
            resp = validaIdCuba(texto);
            if (resp) { return resp } else { return false }
            break;
        case "República Dominicana":
            resp = validaIdDominicana(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Ecuador":
            resp = validaIdEcuador(texto);
            if (resp) { return resp } else { return false }
            break;
        case "El Salvador":
            resp = validaIdElSalvador(texto);
            if (resp) { return resp } else { return false }
            break;
        case "España":
            resp = validaIdEspana(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Estados Unidos":
            resp = validaIdEstadosUnidos(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Guatemala":
            resp = validaIdGuatemala(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Honduras":
            resp = validaIdHonduras(texto);
            if (resp) { return resp } else { return false }
            break;
        case "México":
            resp = validaIdMexico(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Nicaragua":
            resp = validaIdNicaragua(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Panamá":
            resp = validaIdPanama(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Paraguay":
            resp = validaIdParaguay(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Perú":
            resp = validaIdPeru(texto);
            if (resp) { return resp } else { return false }
            break;

        case "Uruguay":
            resp = validaIdUruguay(texto);
            if (resp) { return resp } else { return false }
            break;
        case "Venezuela":
            resp = validaIdVenezuela(texto);
            if (resp) { return resp } else { return false }
            break;

        default:
        // code block
    }

}


function validaRut(campo, paisInput, tipo) {

    cpoRut = document.getElementById(campo);


    console.log(cpoRut.value + ' ' + paisInput + ' ' + tipo)
    var texto = cpoRut.value;
    // No es un documento de pais

    if (tipo == 'N') {
        if (esBlanco(texto)) {
            return false
        } else { return true }
    }


    texto = texto.toUpperCase()
    nro = texto.replace(/[^A-Za-z0-9]/g, '')

    if (paisInput == "") {
        pais = paisEmisor(nro);
        if (!pais) { return false; }
        else { }

    } else { pais = paisInput }


    switch (pais) {

        case "Argentina":
            resp = validaIdArgentina(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Bolivia":
            resp = validaIdBolivia(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Brasil":
            resp = validaIdBrasil(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Chile":
            resp = validaModulo11(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Colombia":
            resp = Colombia(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Costa Rica":
            resp = validaIdCostaRica(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Cuba":
            resp = validaIdCuba(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "República Dominicana":
            resp = validaIdDominicana(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Ecuador":
            resp = validaIdEcuador(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "El Salvador":
            resp = validaIdElSalvador(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "España":
            resp = validaIdEspana(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Estados Unidos":
            resp = validaIdEstadosUnidos(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Guatemala":
            resp = validaIdGuatemala(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Honduras":
            resp = validaIdHonduras(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "México":
            resp = validaIdMexico(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Nicaragua":
            resp = validaIdNicaragua(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Panamá":
            resp = validaIdPanama(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Paraguay":
            resp = validaIdParaguay(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Perú":
            resp = validaIdPeru(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;

        case "Uruguay":
            resp = validaIdUruguay(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;
        case "Venezuela":
            resp = validaIdVenezuela(texto);
            if (resp) { cpoRut.value = resp } else { return false }
            break;

        default:
        // code block
    }

}

function validaIdArgentina(texto) {
    nro = texto.replace(/[^0-9]/g, '');
    if (isNaN(nro)) {
        return false
    } else {
        if (nro.length == 8) {

            return nro
        }
        else { return false }
    }

}
function validaIdBolivia(texto) {

    return texto;
}
function validaIdBrasil(texto) {
    var strCPF = texto.replace(/[^0-9]/g, '');
    var Soma;
    var Resto;
    Soma = 0;

    if (strCPF.length != 11) return false;
    if (strCPF == "00000000000") return false;
    texto = strCPF.substring(0, 3) + '.' + strCPF.substring(3, 6) + '.' + strCPF.substring(6, 9) + '-' + strCPF.substring(9, 11);

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return texto;
}



function validaIdColombia(texto) {
    nro = texto.replace(/[^0-9]/g, '');
    if (isNaN(nro)) {
        return false
    } else {
        if (texto.length > 8 && texto.length < 11) {
            return texto
        }
        else { return false }
    }

}
function validaIdCostaRica(texto) {
    nro = texto.replace(/[^0-9]/g, '');
    if (isNaN(nro)) {
        return false
    } else {
        if (texto.length == 9) {
            return texto
        }
        else { return false }
    }
}
function validaIdCuba(texto) {
    nro = texto.replace(/[^0-9]/g, '');
    if (isNaN(nro)) {
        return false
    } else {
        if (texto.length == 11) {
            return texto
        }
        else { return false }
    }
}

function validaIdDominicana(texto) {
    ced = texto.replace(/[^0-9]/g, '');
    var c = ced.replace(/-/g, '');

    var cedula = c.substr(0, c.length - 1);
    var verificador = c.substr(c.length - 1, 1);
    var suma = 0;
    var cedulaValida = 0;
    if (ced.length < 11) { return false; }
    for (i = 0; i < cedula.length; i++) {
        mod = "";
        if ((i % 2) == 0) { mod = 1 } else { mod = 2 }
        res = cedula.substr(i, 1) * mod;
        if (res > 9) {
            res = res.toString();
            uno = res.substr(0, 1);
            dos = res.substr(1, 1);
            res = eval(uno) + eval(dos);
        }
        suma += eval(res);
    }
    el_numero = (10 - (suma % 10)) % 10;
    if (el_numero == verificador && cedula.substr(0, 3) != "000") {
        textosale = ced.substring(0, 3) + '-' + ced.substring(3, 10) + '-' + ced.substring(10, 11);
        return textosale
    }
    else {
        return false
    }

}

function validaIdEcuador(texto) {
    nro = texto.replace(/[^0-9]/g, '');
    cedula = nro;

    /** 1.- Se debe validar que tenga 10 numeros
       * 2.- Se extrae los dos primero digitos de la izquierda y compruebo que existan las regiones
       * 3.- Extraigo el ultimo digito de la cedula
       * 4.- Extraigo Todos los pares y los sumo
       * 5.- Extraigo Los impares los multiplico x 2 si el numero resultante es mayor a 9 le restamos 9 al resultante
       * 6.- Extraigo el primer Digito de la suma (sumaPares + sumaImpares)
       * 7.- Conseguimos la decena inmediata del digito extraido del paso 6 (digito + 1) * 10
       * 8.- restamos la decena inmediata - suma / si la suma nos resulta 10, el decimo digito es cero
       * 9.- Paso 9 Comparamos el digito resultante con el ultimo digito de la cedula si son iguales todo OK sino existe error.     
       */


    //Preguntamos si la cedula consta de 10 digitos
    if (cedula.length == 10) {

        //Obtenemos el digito de la region que son los dos primeros digitos
        var digito_region = cedula.substring(0, 2);

        //Pregunto si la region existe ecuador se divide en 24 regiones
        if (digito_region >= 1 && digito_region <= 24) {

            // Extraigo el ultimo digito
            var ultimo_digito = cedula.substring(9, 10);

            //Agrupo todos los pares y los sumo
            var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

            //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
            var numero1 = cedula.substring(0, 1);
            var numero1 = (numero1 * 2);
            if (numero1 > 9) { var numero1 = (numero1 - 9); }

            var numero3 = cedula.substring(2, 3);
            var numero3 = (numero3 * 2);
            if (numero3 > 9) { var numero3 = (numero3 - 9); }

            var numero5 = cedula.substring(4, 5);
            var numero5 = (numero5 * 2);
            if (numero5 > 9) { var numero5 = (numero5 - 9); }

            var numero7 = cedula.substring(6, 7);
            var numero7 = (numero7 * 2);
            if (numero7 > 9) { var numero7 = (numero7 - 9); }

            var numero9 = cedula.substring(8, 9);
            var numero9 = (numero9 * 2);
            if (numero9 > 9) { var numero9 = (numero9 - 9); }

            var impares = numero1 + numero3 + numero5 + numero7 + numero9;

            //Suma total
            var suma_total = (pares + impares);

            //extraemos el primero digito
            var primer_digito_suma = String(suma_total).substring(0, 1);

            //Obtenemos la decena inmediata
            var decena = (parseInt(primer_digito_suma) + 1) * 10;

            //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
            var digito_validador = decena - suma_total;

            //Si el digito validador es = a 10 toma el valor de 0
            if (digito_validador == 10)
                var digito_validador = 0;

            //Validamos que el digito validador sea igual al de la cedula
            if (digito_validador == ultimo_digito) {

                return nro
            } else {
                return false;
            }

        } else {
            // imprimimos en consola si la region no pertenece
            return false;
        }
    } else {
        //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
        return false;
    }

};


function validaIdEstadosUnidos(texto) {

    return texto;
}

function validaIdEspana(texto) {

    var value = texto;

    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    var str = value.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) { return false };

    var nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) {

        return value;
    };

    return false;

}

function validaIdGuatemala(texto) {

    var cui = texto.replace(/[^0-9]/g, '');
    texto = cui.substring(0, 4) + ' ' + cui.substring(4, 9) + ' ' + cui.substring(9, 13);
    if (cui.length != 13) return false;

    var depto = parseInt(cui.substring(9, 11));
    var muni = parseInt(cui.substring(11, 13));
    var numero = cui.substring(0, 8);
    var verificador = parseInt(cui.substring(8, 9));

    // Se asume que la codificación de Municipios y 
    // departamentos es la misma que esta publicada en 
    // http://goo.gl/EsxN1a

    // Listado de municipios actualizado segun:
    // http://goo.gl/QLNglm

    // Este listado contiene la cantidad de municipios
    // existentes en cada departamento para poder 
    // determinar el código máximo aceptado por cada 
    // uno de los departamentos.
    var munisPorDepto = [
        /* 01 - Guatemala tiene:      */ 17 /* municipios. */,
        /* 02 - El Progreso tiene:    */  8 /* municipios. */,
        /* 03 - Sacatepéquez tiene:   */ 16 /* municipios. */,
        /* 04 - Chimaltenango tiene:  */ 16 /* municipios. */,
        /* 05 - Escuintla tiene:      */ 13 /* municipios. */,
        /* 06 - Santa Rosa tiene:     */ 14 /* municipios. */,
        /* 07 - Sololá tiene:         */ 19 /* municipios. */,
        /* 08 - Totonicapán tiene:    */  8 /* municipios. */,
        /* 09 - Quetzaltenango tiene: */ 24 /* municipios. */,
        /* 10 - Suchitepéquez tiene:  */ 21 /* municipios. */,
        /* 11 - Retalhuleu tiene:     */  9 /* municipios. */,
        /* 12 - San Marcos tiene:     */ 30 /* municipios. */,
        /* 13 - Huehuetenango tiene:  */ 32 /* municipios. */,
        /* 14 - Quiché tiene:         */ 21 /* municipios. */,
        /* 15 - Baja Verapaz tiene:   */  8 /* municipios. */,
        /* 16 - Alta Verapaz tiene:   */ 17 /* municipios. */,
        /* 17 - Petén tiene:          */ 14 /* municipios. */,
        /* 18 - Izabal tiene:         */  5 /* municipios. */,
        /* 19 - Zacapa tiene:         */ 11 /* municipios. */,
        /* 20 - Chiquimula tiene:     */ 11 /* municipios. */,
        /* 21 - Jalapa tiene:         */  7 /* municipios. */,
        /* 22 - Jutiapa tiene:        */ 17 /* municipios. */
    ];

    if (depto === 0 || muni === 0) {
        return false;
    }

    if (depto > munisPorDepto.length) {
        return false;
    }

    if (muni > munisPorDepto[depto - 1]) {
        return false;
    }

    // Se verifica el correlativo con base 
    // en el algoritmo del complemento 11.
    var total = 0;

    for (var i = 0; i < numero.length; i++) {
        total += numero[i] * (i + 2);
    }

    var modulo = (total % 11);

    console.log("CUI con módulo: " + modulo);
    if (modulo === verificador) {

        return texto
    }
    else { return false };
}


function validaIdHonduras(texto) {

    return texto;
}

function validaIdPanama(texto) {

    texto = texto.toUpperCase()
    texto = texto.replace(/[^A-Za-z0-9]+/g, '')

    //    var texto = cpoRut.value;
    var re = new RegExp(/^(PE|E|N|[23456789](?:AV|PI)?|1[0123]?(?:AV|PI)?)(\d{3})(\d{2,7})$/i);
    if (re.test(texto)) {

        textosale = texto

        if (texto.length <= 8 && !isNaN(texto)) {
            textosale = texto.substring(0, 1) + '-' + texto.substring(1, 4) + '-' + texto.substring(4, 8)
            cpoRut.value = textosale;
            return true
        }

        if (texto.length == 9 && isNaN(texto)) {
            textosale = texto.substring(0, 2) + '-' + texto.substring(2, 5) + '-' + texto.substring(5, 9)
            cpoRut.value = textosale;
            return true
        }

        if (texto.length == 10 && isNaN(texto)) {
            textosale = texto.substring(0, 2) + '-' + texto.substring(2, 5) + '-' + texto.substring(5, 10)
            cpoRut.value = textosale;
            return true
        }

        if (texto.length == 10) {
            textosale = texto.substring(0, 1) + '-' + texto.substring(1, 10)
            return textosale;
        }

        return false



    } else {

        return false
    }

}


function validaIdPeru(texto) {
    texto = texto.replace(/[^0-9]+/g, '')

    if (validate(texto)) {
        textosale = texto.substr(0, texto.length - 1) + '-' + texto[texto.length - 1]
        cpoRut.value = textosale
        return textosale;
    } else { return false };

}
function validate(dni) {
    if (!dni || dni.length != 9) return false
    const multiples = [3, 2, 7, 6, 5, 4, 3, 2]
    const dcontrols = {
        numbers: [6, 7, 8, 9, 0, 1, 1, 2, 3, 4, 5],
        letters: ['K', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    }
    const numdni = dni.substring(0, dni.length - 1).split('')
    const dcontrol = dni.substring(dni.length - 1)
    const dsum = numdni.reduce((acc, digit, index) => {
        acc += digit * multiples[index]
        return acc
    }, 0)
    const key = 11 - (dsum % 11)
    const index = (key === 11) ? 0 : key
    if (/^\d+$/.test(dni)) {
        return dcontrols.numbers[index] === parseInt(dcontrol, 10)
    }
    return dcontrols.letters[index] === dcontrol
}





function validaIdElSalvador(texto) {
    var re = new RegExp("^\\d{8}-\\d$");
    if (re.test(texto)) {
        var dui = texto;
        var digitoVerificador = dui.substring(9, 10);
        var suma = 0;
        for (i = 9; i >= 2; i--) {
            digito = dui.substring(9 - i, 9 - i + 1);
            suma += (i * digito);
        }
        residuoVerificador = 10 - (suma % 10);
        if (digitoVerificador == residuoVerificador || residuoVerificador == 0) {

            return texto
        }

        else { return false; }
    } else {
        return false
    }
}

function validaIdMexico(texto) {

    var curp = texto;

    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);

    if (!validado)  //Coincide con el formato general?
        return false;

    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        var diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma = 0.0,
            lngDigito = 0.0;
        for (var i = 0; i < 17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito == 10)
            return 0;
        return lngDigito;
    }
    if (validado[2] != digitoVerificador(validado[1]))
        return texto;
    return true;
}





function validaIdNicaragua(texto) {

    var elTexto = texto;

    var es = true;
    //validar longitud
    if (elTexto.length != 14) {
        es = false;
    } else {
        //verificar si tiene el formato correcto
        var RegExPattern = /^\d{13}[A-Z]{1}$/;
        if (!elTexto.match(RegExPattern)) {
            es = false;
        } else {
            //verificar si contiene una fecha válida
            var sFecha = elTexto.substring(3, 9);
            var sDia = elTexto.substring(3, 5);
            var sMes = elTexto.substring(5, 7);
            var sAnio = elTexto.substring(7, 9);
            var aa = parseInt(sAnio);
            var mm = parseInt(sMes);
            var dd = parseInt(sDia);
            if (aa >= 0 && aa <= 29) {
                aa += 2000;
            } else {
                aa += 1900;
            }
            var bisiesto = false;
            if (aa % 2 == 0) {
                if (aa % 4 == 0) {
                    bisiesto = true;
                }
            }
            if (mm < 1 || mm > 12) {
                es = false;
            } else {
                switch (mm) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        if (dd < 1 || dd > 31) {
                            return false;
                        }
                        break;
                    case 2:
                        if (bisiesto) {
                            if (dd < 1 || dd > 29) {
                                es = false;
                            }
                        } else {
                            if (dd < 1 || dd > 28) {
                                es = false;
                            }
                        }
                        break;
                    default:
                        if (dd < 1 || dd > 30) {
                            es = false;
                        }
                        break;
                }
            }
        }
    }
    if (es) {

        return texto;
    }
    else { return false }

}
function validaIdParaguay(texto) {

    texto = texto.toUpperCase()
    var RegExPattern = /^(\d{7}|\d{8})$/
    if (RegExPattern.test(texto)) {
        return texto;
    }
    else { return false }
}


function validaIdUruguay(texto) {

    var ci = texto
    ci = ci.replace(/[^0-9]+/g, '')
    var dig = ci[ci.length - 1];
    var a = 0;
    var i = 0;
    if (ci.length <= 6) {
        for (i = ci.length; i < 7; i++) {
            ci = '0' + ci;
        }
    }
    for (i = 0; i < 7; i++) {
        a += (parseInt("2987634"[i]) * parseInt(ci[i])) % 10;
    }

    if (a % 10 === 0) { digv = 0 }
    else {
        digv = 10 - a % 10;
    }
    if (dig == digv) {
        largo = ci.length;
        var invertido = "";
        for (i = (largo - 1), j = 0; i >= 0; i--, j++)
            invertido = invertido + ci.charAt(i);
        var dtexto = "";
        dtexto = dtexto + invertido.charAt(0);
        dtexto = dtexto + '-';
        cnt = 0;
        for (i = 1, j = 2; i < largo; i++, j++) {
            //alert("i=[" + i + "] j=[" + j +"]" );		
            if (cnt == 3) {
                dtexto = dtexto + '.';
                j++;
                dtexto = dtexto + invertido.charAt(i);
                cnt = 1;
            }
            else {
                dtexto = dtexto + invertido.charAt(i);
                cnt++;
            }
        }
        invertido = "";
        for (i = (dtexto.length - 1), j = 0; i >= 0; i--, j++)
            invertido = invertido + dtexto.charAt(i);

        return invertido.toUpperCase()
    }
    else { return false }

}

function validaIdVenezuela(texto) {
    texto = texto.toUpperCase()

    var RegExPattern = /^(V|E){1}([0-9]){7,8}$/;

    if (RegExPattern.test(texto)) {

        return texto;
    }
    else { return false }
}

function validaModulo11(texto) {
    var tmpstr = "";

    for (i = 0; i < texto.length; i++)
        if (texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-')
            tmpstr = tmpstr + texto.charAt(i);
    texto = tmpstr;
    largo = texto.length;

    if (largo < 2) {

        cpoRut.focus();
        cpoRut.select();
        return false;
    }

    for (i = 0; i < largo; i++) {
        if (texto.charAt(i) != "0" && texto.charAt(i) != "1" && texto.charAt(i) != "2" && texto.charAt(i) != "3"
            && texto.charAt(i) != "4" && texto.charAt(i) != "5" && texto.charAt(i) != "6" && texto.charAt(i) != "7"
            && texto.charAt(i) != "8" && texto.charAt(i) != "9"
            && texto.charAt(i) != "k" && texto.charAt(i) != "K"
            && texto.charAt(i) != "x" && texto.charAt(i) != "X") {


            return false;
        }
    }
    texto = texto.replace(/\b0+/g, '')
    largo = texto.length;
    var invertido = "";
    for (i = (largo - 1), j = 0; i >= 0; i--, j++)
        invertido = invertido + texto.charAt(i);
    var dtexto = "";
    dtexto = dtexto + invertido.charAt(0);
    dtexto = dtexto + '-';
    cnt = 0;

    for (i = 1, j = 2; i < largo; i++, j++) {
        //alert("i=[" + i + "] j=[" + j +"]" );		
        if (cnt == 3) {
            dtexto = dtexto + '.';
            j++;
            dtexto = dtexto + invertido.charAt(i);
            cnt = 1;
        }
        else {
            dtexto = dtexto + invertido.charAt(i);
            cnt++;
        }
    }
    invertido = "";
    for (i = (dtexto.length - 1), j = 0; i >= 0; i--, j++)
        invertido = invertido + dtexto.charAt(i);
    invertido.toUpperCase()
    if (revisarDigito2(texto))
        return invertido.toUpperCase()
    return false;
}

function revisarDigito(dvr) {
    dv = dvr + ""
    if (dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5'
        && dv != '6' && dv != '7' && dv != '8' && dv != '9'
        && dv != 'k' && dv != 'K' && dv != 'x' && dv != 'X') {

        return false;
    }
    return true;
}

function revisarDigito2(crut) {
    largo = crut.length;
    if (largo < 2) {
        cpoRut.focus();
        cpoRut.select();
        return false;
    }
    if (largo > 2)
        rut = crut.substring(0, largo - 1);
    else
        rut = crut.charAt(0);
    dv = crut.charAt(largo - 1);
    revisarDigito(dv);

    if (rut == null || dv == null)
        return 0
    var dvr = '0'
    suma = 0
    mul = 2
    for (i = rut.length - 1; i >= 0; i--) {
        suma = suma + rut.charAt(i) * mul
        if (mul == 7)
            mul = 2
        else
            mul++
    }
    res = suma % 11
    if (res == 1)
        dvr = 'k'
    else if (res == 0)
        dvr = '0'
    else {
        dvi = 11 - res
        dvr = dvi + ""
    }
    if (dvr != dv.toLowerCase()) {

        return false
    }
    return true
}


function paisEmisor(nro) {
    var pais = false;
    var url = "php/consulta_pais_emisor.php";
    $.ajax(
        {
            type: "POST",
            url: url,
            data: "id=" + nro,
            dataType: "JSON",
            async: false,
            success: function (dataRet) {
                // alert(dataRet.resultado)
                if (dataRet.resultado == 1) {
                    pais = dataRet.data[0][0]
                }
                else { pais = false }
            }
        });
    return pais;
};

function hoydma() {
    var d = new Date();
    if (d.getMonth() < 9) { m = '0' } else { m = '' };
    if (d.getDate() < 10) { dia = '0' } else { dia = '' };
    fecha = dia + d.getDate() + '-' + m + (d.getMonth() + 1) + '-' + d.getFullYear();
    return fecha
}
function ddmmaaaa(fecha) {
    aa = fecha.substring(0, 4)
    mm = fecha.substring(5, 7)
    dd = fecha.substring(8, 10)
    return dd + '-' + mm + '-' + aa
}
function aaaammdd(fecha) {
    aa = fecha.substring(6, 10)
    mm = fecha.substring(3, 5)
    dd = fecha.substring(0, 2)
    return aa + '-' + mm + '-' + dd
}


function hoy() {
    var d = new Date();
    if (d.getMonth() < 9) { m = '0' } else { m = '' };
    if (d.getDate() < 10) { dia = '0' } else { dia = '' };
    fecha = d.getFullYear() + '-' + m + (d.getMonth() + 1) + '-' + dia + d.getDate();
    return fecha
}
function hoyhr() {
    fecha = new Date().toJSON().slice(0, 16);
    return fecha
}
function dia1() {
    var d = new Date();
    if (d.getMonth() < 9) { m = '0'; } else { m = ''; };
    fecha = d.getFullYear() + '-' + m + (d.getMonth() + 1) + '-01';
    return fecha;
}
function dia31() {
    var today = new Date();
    var d = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    if (d.getMonth() < 9) { m = '0'; } else { m = ''; };
    if (d.getDate() < 10) { dia = '0' } else { dia = '' };
    fecha = d.getFullYear() + '-' + m + (d.getMonth() + 1) + "-" + dia + d.getDate();
    return fecha
}
function hoyLiteral() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    ml = "";
    switch (mm) {
        case '01':
            ml = 'Enero';
            break;
        case '02':
            ml = 'Febrero';
            break;
        case '03':
            ml = 'Marzo';
            break;
        case '04':
            ml = 'Abril';
            break;
        case '05':
            ml = 'Mayo';
            break;
        case '06':
            ml = 'Junio';
            break;
        case '07':
            ml = 'Julio';
            break;
        case '08':
            ml = 'Agosto';
            break;
        case '09':
            ml = 'Septiembre';
            break;
        case '10':
            ml = 'Octubre';
            break;
        case '11':
            ml = 'Noviembre';
            break;
        case '12':
            ml = 'Diciembre';
            break;
    }

    fecha = dd + ' de ' + ml + ' ' + yyyy;
    return fecha
}
function fechaLiteral(fecha) {
    var today = new Date(fecha);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    ml = "";
    switch (mm) {
        case '01':
            ml = 'Enero';
            break;
        case '02':
            ml = 'Febrero';
            break;
        case '03':
            ml = 'Marzo';
            break;
        case '04':
            ml = 'Abril';
            break;
        case '05':
            ml = 'Mayo';
            break;
        case '06':
            ml = 'Junio';
            break;
        case '07':
            ml = 'Julio';
            break;
        case '08':
            ml = 'Agosto';
            break;
        case '09':
            ml = 'Septiembre';
            break;
        case '10':
            ml = 'Octubre';
            break;
        case '11':
            ml = 'Noviembre';
            break;
        case '12':
            ml = 'Diciembre';
            break;
    }

    fecha = dd + ' de ' + ml + ' del ' + yyyy;
    return fecha
}


function diadeSemana(fecha) {

    var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    var d = new Date(fecha);
    var dayName = days[d.getDay()];
    return dayName
}
function validaRangoFechas(fechadesde, fechahasta) {
    if ($(fechadesde).val() > $(fechahasta).val()) {
        $(fechadesde).removeClass('entrada-valida').addClass('entrada-invalida');
        $(fechadesde + "_err").removeClass('campo-valido').addClass('campo-invalido').text("No puede ser mayor que Fecha Hasta");
        return false;
    } else {

        $(fechadesde).addClass('entrada-valida').removeClass('entrada-invalida');
        $(fechadesde + "_err").addClass('campo-valido').removeClass('campo-invalido').text("");
        return true;
    }
}
function dataURItoBlob(dataURI, filetype) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: filetype });
}

function esBlanco(estring) {

    return !estring || estring.trim() === ''


}
function zanitize(dato) {

    dato = dato.replace(/"/g, '&quot');
    dato = dato.replace(/'/g, '&#39');
    dato = dato.replace(/:/g, '&#58');
    dato = dato.replace(/{/g, '&#123');
    dato = dato.replace(/}/g, '&#125');
    dato = dato.replace(/\\/g, '&#92');
    dato = dato.replace(/’/g, '&#1370');
    dato = dato.replace(/\n/g, '<br>');


    dato = DOMPurify.sanitize(dato, {
        ALLOWED_TAGS: ['strong', 'a', 'table', 'td', 'tr', 'thead', 'tfoot', 'th', 'li', 'ul', 'ol', 'br', 'p', 'b'],
        ALLOWED_ATTR: ['title', 'style', 'rows', 'rowspan', 'width', 'height', 'rel', 'align', 'cite', 'cols', 'colspan'],
        KEEP_CONTENT: true
    });


    dato = dato.replace(/</g, '\<');
    dato = dato.replace(/=/g, '&#61');
    dato = dato.replace(/>/g, '\>');

    return dato;
}

function deszanitize(dato) {

    dato = dato.replace(/&quot/g, '&');
    dato = dato.replace(/&#39/g, "'");
    dato = dato.replace(/&#58/g, ':');
    dato = dato.replace(/&#123/g, '{');
    dato = dato.replace(/&#125/g, '}');
    dato = dato.replace(/&#92/g, '\\');
    dato = dato.replace(/&#1370;/g, '’');
    dato = dato.replace(/\</g, '<');
    dato = dato.replace(/&#61/g, '=');
    // dato = dato.replace(/&#61/g, '>');
    dato = dato.replace(/\>/g, '\>');
    dato = dato.replace(/&lt;/g, '<');
    dato = dato.replace(/&gt;/g, '>');
    dato = dato.replace(/<br>/g, '\n');



    return dato;
}


// cargas para selects 


async function cargaTablaSelecciones() {

    $.ajax({
        type: "POST",
        url: 'php/crud_referencias.php',

        data: {
            'Accion': "listall"
        },
        dataType: "JSON",
        async: false,
        cache: false,
        success: function (data) {

            tablaselecciones = data.data

        },
    });


};

function cargaEntidades(select) {
    $.ajax({
        type: "POST",
        url: 'php/crud_entidades.php',

        data: {
            'Accion': "list"
        },
        dataType: "JSON",
        async: false,
        cache: false,
        success: function (data) {
            $('#' + select).empty();
            var $dropdown = $('#' + select);
            var i;
            $dropdown.append("<option value='0' selected>Seleccione...</option>");
            parsedData = data.data;
            $.each(parsedData, function (key, item) {
                $dropdown.append($("<option />").val(item.IdEntidad).text(item.Codigo));

            });
        },
    });

}
function cargaSeleccionesSelect(idempresa, select, entidad) {

    $('#' + select).empty();
    var $dropdown = $('#' + select);
    var i;
    $dropdown.append($("<option selected/>").val(0).text("Seleccione..."));

    tablaselecciones.forEach(function (seleccion) {
        if (seleccion.Entidad == entidad && seleccion.IdEmpresa == idempresa) {
            $dropdown.append($("<option />").val(seleccion.IdReferencia).text(seleccion.Codigo));
        }

    });

};
function cargaSeleccionesSelectConText1(idempresa, select, entidad, text1) {

    $('#' + select).empty();
    var $dropdown = $('#' + select);
    var i;
    $dropdown.append($("<option selected/>").val(0).text("Seleccione..."));

    tablaselecciones.forEach(function (seleccion) {
        if (seleccion.Entidad == entidad && seleccion.IdEmpresa == idempresa && seleccion.Text1 == text1) {
            $dropdown.append($("<option />").val(seleccion.IdSeleccion).text(seleccion.Seleccion));
        }

    });

};

function cargaSeleccionesSelectPadre(idempresa, select, entidad) {

    $('#' + select).empty();
    var $dropdown = $('#' + select);
    var i;
    $dropdown.append($("<option selected/>").val(0).text("Seleccione. .."));
    tablaselecciones.forEach(function (seleccion) {
        if (seleccion.Entidad == entidad && seleccion.IdEmpresa == idempresa && seleccion.IdSelPadre == 0) {
            $dropdown.append($("<option />").val(seleccion.IdSeleccion).text(seleccion.Seleccion));
        }

    });


};
function cargaSeleccionesSelectHijo(select, idpadre) {
    gar = $('#' + select).val();
    $('#' + select).empty();
    var $dropdown = $('#' + select);
    var i;
    $dropdown.append($("<option selected/>").val(0).text("Seleccione. .."));
    tablaselecciones.forEach(function (seleccion) {
        if (seleccion.IdSelPadre == idpadre) {
            $dropdown.append($("<option />").val(seleccion.IdSeleccion).text(seleccion.Seleccion));
        }

    });
    $('#' + select).val(gar)

};


async function cargaTablaAlumnos() {

    $.ajax({
        type: "POST",
        url: 'php/crud_alumnos.php',

        data: { 'Accion': "listnames" },
        dataType: "JSON",
        async: false,
        cache: true,
        success: function (data) {
            tablaalumnos = data.data;
        },
    });


}

async function cargaTablaDocentes() {

    $.ajax({
        type: "POST",
        url: 'php/crud_personal.php',

        data: { 'Accion': "listnames" },
        dataType: "JSON",
        async: false,
        cache: true,
        success: function (data) {
            tabladocentes = data.data;
        },
    });


}
async function cargaTablaUsuarios() {

    $.ajax({
        type: "POST",
        url: 'php/crud_usuarios.php',

        data: { 'Accion': "listnames" },
        dataType: "JSON",
        async: false,
        cache: true,
        success: function (data) {
            tablausuarios = data.data;
        },
    });


}


async function cargaTablaCuentas() {

    $.ajax({
        type: "POST",
        url: 'php/crud_cuentas.php',

        data: { 'Accion': "list" },
        dataType: "JSON",
        async: false,
        cache: true,
        success: function (data) {
            tablacuentas = data.data;
        },
    });


}

async function cargaTablaCtasCtes() {

    $.ajax({
        type: "POST",
        url: 'php/crud_cuentascorrientes.php',

        data: { 'Accion': "list" },
        dataType: "JSON",
        async: false,
        cache: true,
        success: function (data) {

            tablacuentascorrientes = data.data;
        },
    });


}



function cargaSelectHabDesInformados(select) {
    $('#' + select).empty();
    var $dropdown = $('#' + select);
    $.ajax({
        type: "POST",
        url: 'php/crud_remhabdes.php',

        data: { 'Accion': "listinformados" },
        dataType: "JSON",
        async: false,
        cache: true,
        success: function (data) {

            d = data.data;

            $dropdown.append($("<option selected/>").val("").text("Seleccione"));

            d.forEach(function (habdes) {

                $dropdown.append($("<option />").val(habdes.IdHabDes).text(habdes.hade_codigo + " " + habdes.hade_glosa));

            });


        },
    });

};
function cargaHabDesInformadosSelect2() {
    d = [];
    elem = { id: 0, text: 'Seleccione...' }
    d.push(elem);
    $.ajax({
        type: "POST",
        url: 'php/crud_remhabdes.php',

        data: { 'Accion': "listinformados" },
        dataType: "JSON",
        async: false,
        cache: true,

        success: function (data) {

            parsedData = data.data;
            $.each(parsedData, function (key, item) {

                elem = { id: item.IdHabDes, text: item.hade_codigo + ' ' + item.hade_glosa }

                d.push(elem);
            });
        },
    });

    return d;

}
function cargaSelectHabDesc(select) {
    $('#' + select).empty();
    var $dropdown = $('#' + select);
    $.ajax({
        type: "POST",
        url: 'php/crud_remhabdes.php',

        data: { 'Accion': "list" },
        dataType: "JSON",
        async: true,
        cache: true,
        success: function (data) {

            d = data.data;

            $dropdown.append($("<option selected/>").val("").text("Seleccione"));

            d.forEach(function (habdes) {

                $dropdown.append($("<option />").val(habdes.IdHabDes).text(habdes.hade_codigo + " " + habdes.hade_glosa));

            });


        },
    });

};

function cargaSelectUsuarios(select) {
    $('#' + select).empty();
    var $dropdown = $('#' + select);
    $.ajax({
        type: "POST",
        url: 'php/crud_usuarios.php',

        data: { 'Accion': "listnames" },
        dataType: "JSON",
        async: false,
        cache: true,
        success: function (data) {

            d = data.data;

            $dropdown.append($("<option selected/>").val("0").text("Seleccione"));

            d.forEach(function (usu) {

                $dropdown.append($("<option class='mono'/>").val(usu.IdUsuario).text(usu.Nombre));

            });


        },
    });

};
function cargaSelectPersonal(select) {
    $('#' + select).empty();
    var $dropdown = $('#' + select);
    $.ajax({
        type: "POST",
        url: 'php/crud_personal.php',

        data: { 'Accion': "list" },
        dataType: "JSON",
        async: false,
        cache: true,
        success: function (data) {

            d = data.data;

            $dropdown.append($("<option selected/>").val("").text("Seleccione"));

            d.forEach(function (per) {

                $dropdown.append($("<option class='mono'/>").val(per.IdPersonal).text(per.per_rut.padStart(12, "0") + " " + per.per_app1 + " " + per.per_app2 + " " + per.per_nombres));

            });


        },
    });

};
function cargaSelectAlumnos(IdEmpresa, select) {
    $('#' + select).empty();
    var $dropdown = $('#' + select);
    var i;
    $dropdown.append($("<option selected/>").val("").text("Seleccione..."));
    tablaalumnos.forEach(function (alum) {

        if (alum.IdEmpresa = IdEmpresa) {
            $dropdown.append($("<option class='mono'/>").val(alum.IdAlumno).text(alum.alum_app1 + ' ' + alum.alum_nombres));
        }



    });
}
function cargaAlumnosSelect2() {
    d = [];
    elem = { id: 0, text: 'Seleccione...' }
    d.push(elem);
    tablaalumnos.forEach(function (item) {
        if (item.IdTipo == 41) {
            elem = { id: item.IdAlumno, text: item.alum_app1 + ' ' + item.alum_app2 + ' ' + item.alum_nombres };
            d.push(elem);
        }

    });

    return d;
}




function cargaSelectDocentes(IdEmpresa, select) {
    $('#' + select).empty();
    var $dropdown = $('#' + select);
    var i;
    $dropdown.append($("<option selected/>").val("").text("Seleccione..."));
    tabladocentes.forEach(function (perso) {

        if (perso.IdEmpresa = IdEmpresa) {
            $dropdown.append($("<option class='mono'/>").val(perso.IdPersonal).text(perso.per_nombres + ' ' + perso.per_app1 + ' ' + perso.per_app2));
        }



    });
}

function cargaSelectGrupos(IdEmpresa, select) {
    $('#' + select).empty();
    var $dropdown = $('#' + select);
    $.ajax({
        type: "POST",
        url: 'php/crud_grupos.php',

        data: { 'Accion': "list", 'IdEmpresa': IdEmpresa },
        dataType: "JSON",
        async: false,
        cache: true,
        success: function (data) {

            d = data.data;

            $dropdown.append($("<option selected/>").val("").text("Seleccione"));

            d.forEach(function (grupo) {

                $dropdown.append($("<option />").val(grupo.IdGrupo).text(grupo.Codigo + " - " + grupo.Descripcion));

            });


        },
    });




}
async function cargaSelectPeriodos(select) {
    $('#' + select).empty();
    var $dropdown = $('#' + select);
    $.ajax({
        type: "POST",
        url: 'php/crud_periodos.php',

        data: { 'Accion': "list" },
        dataType: "JSON",
        async: true,
        cache: true,
        success: function (data) {

            d = data.data;

            $dropdown.append($("<option selected/>").val("").text("Seleccione"));

            d.forEach(function (peri) {

                $dropdown.append($("<option />").val(peri.IdPeriodo).text(peri.Nombre));

            });


        },
    });




};


async function cargaSelectPeriodosRemu(select) {
    $('#' + select).empty();
    var $dropdown = $('#' + select);
    $.ajax({
        type: "POST",
        url: 'php/crud_periodos.php',

        data: { 'Accion': "listremu" },
        dataType: "JSON",
        async: false,
        success: function (data) {

            d = data.data;

            $dropdown.append($("<option selected/>").val("").text("Seleccione"));

            d.forEach(function (peri) {

                $dropdown.append($("<option />").val(peri.IdPeriodo).text(peri.Nombre));

            });


        },
    });




};


async function cargaCuentasSelect(select) {

    $('#' + select).empty();
    var $dropdown = $('#' + select);
    var i;
    $dropdown.append($("<option selected/>").val(0).text("Selecione..."));

    tablacuentas.forEach(function (cta) {

        $dropdown.append($("<option />").val(cta.IdCuenta).text(cta.cta_desc));


    });

};

async function cargaCuentasClass(clase) {


    opciones = "<option value='0'>Selecione...</option>"
    //console.log(tablacuentas)

    tablacuentas.forEach(function (cta) {

        opciones += "<option value=" + cta.IdCuenta + ">" + cta.cta_cod + " " + cta.cta_desc + "</option>"


    });


    $("." + clase).each(function () {
        console.log(this)
        $('#' + this.id).html(opciones);

    });

};
async function cargaCtaCtesClass(clase) {


    opciones = "<option value='0'>Selecione...</option>"
    //console.log(tablacuentas)

    tablacuentascorrientes.forEach(function (cta) {

        opciones += "<option value=" + cta.IdCtaCte + ">" + cta.Fisnum + " " + cta.Nombre + "</option>"


    });


    $("." + clase).each(function () {
        console.log(this)
        $('#' + this.id).html(opciones);

    });

};
async function cargaCtaCtesSelect(select) {

    $('#' + select).empty();
    var $dropdown = $('#' + select);
    var i;
    $dropdown.append($("<option selected/>").val(0).text("Selecione..."));

    tablacuentascorrientes.forEach(function (cta) {

        $dropdown.append($("<option />").val(cta.IdCtaCte).text(cta.Nombre));


    });

};

async function cargaSelectClass(clase, tipocode) {


    opciones = "<option value='0'>Selecione...</option>"
    //console.log(tablacuentas)

    tablaselecciones.forEach(function (tipo) {
        if (tipo.tipo_enti == tipocode) {
            opciones += "<option value=" + tipo.tipo_code + ">" + tipo.tipo_code + "</option>"
        }

    });


    $("." + clase).each(function () {
        console.log(this)
        $('#' + this.id).html(opciones);

    });

};



async function cargaOpcionesSelect(select, phpname, param1, param2, param3) {


    var url = phpname + "?" + "&id1=" + param1 + "&id2=" + param2 + "&id3=" + param3
    $.ajax(
        {
            type: "POST",
            url: url,
            async: true,
            success: function (dataRet) {
                var data1 = JSON.parse(dataRet);
                var regs = data1.data.length;
                // console.log(regs);
                //Create and append select list
                $('#' + select).empty();
                var $dropdown = $('#' + select);
                var i;
                $dropdown.append($("<option selected/>").val(0).text("Selecione..."));
                for (i = 0; i < regs; i++) {
                    if (i == 0) { $dropdown.append($("<option selected/>").val(data1.data[i][1]).text(data1.data[i][1] + " " + data1.data[i][2])); } else {
                        $dropdown.append($("<option />").val(data1.data[i][1]).text(data1.data[i][1] + " " + data1.data[i][2]));
                    }
                }


            }
        });

};
function cargaOpcionesSelectTablas(select, phpname, param1, param2, param3) {


    var url = phpname + "?" + "&id1=" + param1 + "&id2=" + param2 + "&id3=" + param3
    $.ajax(
        {
            type: "POST",
            url: url,
            async: false,
            success: function (dataRet) {
                var data1 = JSON.parse(dataRet);
                var regs = data1.data.length;
                // console.log(regs);
                //Create and append select list
                $('#' + select).empty();
                var $dropdown = $('#' + select);
                var i;
                $dropdown.append("<option value='0' selected>Selecione...</option>");
                for (i = 0; i < regs; i++) {

                    $dropdown.append($("<option />").val(data1.data[i][2]).text(data1.data[i][3]));
                }



            }
        });

};
function cargaSelectRecursos(empresa, select) {
    $('#' + select).empty();
    var $dropdown = $('#' + select);
    $.ajax({
        type: "POST",
        url: 'php/crud_recursos.php',

        data: { 'Accion': "list", 'IdEmpresa': empresa },
        dataType: "JSON",
        async: false,
        cache: true,
        success: function (data) {

            d = data.data;

            $dropdown.append($("<option selected/>").val("").text("Seleccione"));

            d.forEach(function (rec) {

                $dropdown.append($("<option class='mono'/>").val(rec.IdRecurso).text(rec.Nombre));

            });


        },
    });

};
function deplegarModalInformacion(textomsg, textobtncontinuar) {

    $('#info_text1').text(textomsg);
    $('#btn_info_continuar').text(textobtncontinuar);
    $("#modal_info").show();

}
function deplegarModalConsulta(textomsg, textobtncontinuar, textobtncancelar) {

    $('#consulta_text1').text(textomsg);
    $('#btn_consulta_continuar').text(textobtncontinuar);
    $('#btn_consulta_cancelar').text(textobtncancelar);
    $("#modal_consulta").show();

}
function modalCancelar() {

    //modal_accion = "";
    $("#modal_info").hide();
    $("#modal_consulta").hide();
    $("#modal_info").hide();

}

function cargaTitulo() {
    setTimeout(() => {
        $("#app_title").text(webName)
        $("#app_usuario").text(usuario.nombre)
        $("#app_modulo").text(appModulo)
        $("#app_mail").text("Escribanos a: " + appMailContacto)
    }, 400);



}



function setProgressBar(porcentaje) {
    var elem = document.getElementById("bar-avance");
    $('#bar-avance').addClass('progress-bar-animated')
    elem.style.width = porcentaje + '%';

}

function obtenerLocalStorage() {
    //

    if (localStorage.getItem("usuario") != null) {
        var usuario = JSON.parse(window.atob(localStorage.getItem("usuario")));

    }
    else {
        confirm("No es posible ejecutar esta aplicación sin autentificacion")
        close();
    }
    if (localStorage.getItem("organizacion") != null) {
        var organizacion = JSON.parse(window.atob(localStorage.getItem("organizacion")));
    }
    else {
        confirm("No es posible ejecutar esta aplicación organizacion")
        close();
    }
    if (localStorage.getItem("departamento") != null) {
        var departamento = JSON.parse(window.atob(localStorage.getItem("departamento")));

    }
    else {
        confirm("No es posible ejecutar esta aplicación sin departamento")
        close();
    }
    if (localStorage.getItem("evaluacion") != null) {
        var evaluacion = JSON.parse(window.atob(localStorage.getItem("evaluacion")));

    }
    else {
        confirm("No es posible ejecutar esta aplicación sin evaluación")
        close();
    }
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


function hablar(texto) {
    // get all voices that browser offers
    var available_voices = window.speechSynthesis.getVoices();
    console.log(available_voices)
    // this will hold an english voice
    var english_voice = '';

    // find voice by language locale "en-US"
    // if not then select the first voice
    for (var i = 0; i < available_voices.length; i++) {
        if (available_voices[i].lang === 'es-ES') {
            english_voice = available_voices[i];
            break;
        }
    }
    if (english_voice === '')
        english_voice = available_voices[0];

    // new SpeechSynthesisUtterance object
    utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    // utter.text = 'Hello World';

    utter.text = texto;

    utter.voice = english_voice;

    // event after text has been spoken
    utter.onstart = function () {
        console.log('pendientes ' + window.speechSynthesis.pending)
        if (!window.speechSynthesis.pending && utter.text == 'Cuando esté nítido e iluminado, haz click en el botón, tomar imagen.') {
            $("#btn_obturador").addClass('borde-intermitente')
        }
        if (!window.speechSynthesis.pending && utter.text == 'Cuando esté centrada, nítida e iluminada, puedes hacer clic en el botón, tomar imagen') {
            $("#btn_obturador").addClass('borde-intermitente')
        }
        if (!window.speechSynthesis.pending && utter.text == 'Para terminar, haz click en el botón continuar') {
            $("#btn_continuar02").addClass('borde-intermitente')
        }

    }

    // speak
    window.speechSynthesis.speak(utter);
}
function cambiarTema() {
    let root = document.documentElement;
    console.log('tema ' + $("#exam_tema").val())

    setCookie('examtema', $("#exam_tema").val(), 60)
    switch ($("#exam_tema").val()) {
        case "1":
            console.log('tema ' + $("#exam_tema").val())
            root.style.setProperty('--bgcolor', 'rgb(134, 195, 206)');
            root.style.setProperty('--colortext', 'rgb(8, 8, 8)');
            root.style.setProperty('--colorbtnalt', 'rgb(8, 8, 8)');
            root.style.setProperty('--colorbtn', 'white');
            root.style.setProperty('--bgcolorbtn', 'rgb(102, 185, 241)');
            root.style.setProperty('--bgcolorhover', '#6f99f3');
            root.style.setProperty('--bgcoloractive', 'rgb(36, 103, 247)');
            root.style.setProperty('--bgcolordisabled', '#e7e5e5c5');
            root.style.setProperty('--bordercolor', 'rgb(24, 77, 221)');
            root.style.setProperty('--bgheadercolor', 'rgb(102, 185, 241)');
            root.style.setProperty('--bgfootercolor', 'rgb(134, 195, 206)');
            root.style.setProperty('--txheadercolor', 'black');
            root.style.setProperty('--txfootercolor', 'black');
            root.style.setProperty('--txterrcolor', 'red');

            break;
        case "2":
            console.log('tema ' + $("#exam_tema").val())
            root.style.setProperty('--bgcolor', 'white');
            root.style.setProperty('--colortext', 'rgb(8, 8, 8)');
            root.style.setProperty('--colorbtnalt', 'rgb(8, 8, 8)');
            root.style.setProperty('--colorbtn', 'white');
            root.style.setProperty('--bgcolorbtn', '#bebcbc');
            root.style.setProperty('--bgcolorhover', '#222121');
            root.style.setProperty('--bgcoloractive', '#a1a1a1c5');
            root.style.setProperty('--bgcolordisabled', '#e7e5e5c5');
            root.style.setProperty('--bordercolor', 'rgb(133, 132, 132)');
            root.style.setProperty('--bgheadercolor', '#e7e5e5c5');
            root.style.setProperty('--bgfootercolor', 'white');
            root.style.setProperty('--txheadercolor', 'black');
            root.style.setProperty('--txfootercolor', 'black');
            root.style.setProperty('--txterrcolor', 'red');




            break;

            break;
        case "3":
            console.log('tema ' + $("#exam_tema").val())
            root.style.setProperty('--bgcolor', 'rgb(195, 244, 127)');
            root.style.setProperty('--colortext', 'white');
            root.style.setProperty('--colorbtnalt', 'rgb(8, 8, 8)');
            root.style.setProperty('--colorbtn', 'white');
            root.style.setProperty('--bgcolorbtn', 'rgb(48, 112, 12)');
            root.style.setProperty('--bgcolorhover', 'rgb(80, 186, 18)');
            root.style.setProperty('--bgcoloractive', 'rgb(61, 143, 25)');
            root.style.setProperty('--bgcolordisabled', 'rgb(102, 140, 81)');
            root.style.setProperty('--bordercolor', 'rgb(65, 96, 20)');
            root.style.setProperty('--bgheadercolor', 'rgb(61, 143, 15)');
            root.style.setProperty('--bgfootercolor', 'rgb(61, 143, 15)');
            root.style.setProperty('--txheadercolor', 'white');
            root.style.setProperty('--txfootercolor', 'white');
            root.style.setProperty('--txterrcolor', 'red');




            break;

        case "4":
            console.log('tema ' + $("#exam_tema").val())
            root.style.setProperty('--bgcolor', 'rgb(242, 192, 145)');
            root.style.setProperty('--colortext', 'rgb(8, 8, 8)');
            root.style.setProperty('--colorbtnalt', 'rgb(8, 8, 8)');
            root.style.setProperty('--colorbtn', 'white');
            root.style.setProperty('--bgcolorbtn', 'rgb(109, 53, 1)');
            root.style.setProperty('--bgcolorhover', 'rgb(242, 175, 113)');
            root.style.setProperty('--bgcoloractive', 'rgb(109, 53, 1)');
            root.style.setProperty('--bgcolordisabled', 'rgb(211, 165, 122)');
            root.style.setProperty('--bordercolor', 'rgb(109, 53, 1)');
            root.style.setProperty('--bgheadercolor', 'rgb(242, 175, 113)');
            root.style.setProperty('--bgfootercolor', 'rgb(242, 175, 113)');
            root.style.setProperty('--txheadercolor', 'black');
            root.style.setProperty('--txfootercolor', 'black');
            root.style.setProperty('--txterrcolor', 'red');




            break;


        default:
            break;
    }

}
function testTable(table) {
    return;
    if (!table.data().any()) {
        $("table tbody").html("<tr><td colspan='20'>No existen datos</td><tr> ");
        $("td").addClass("dataTables_empty")

    }
}

////////////////////////////////////////////////////////////////////////////////
//   AWS y auxiliares
///////////////////////////////////////////////////////////////////////////////
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

function grabarObjetoEnNube(carpeta, nombre, mmtipo, objeto, mensajes) {
    console.log('En grabar en la nube')
    console.log(' carpeta: ' + carpeta + ' nombre: ' + nombre + ' tipo: ' + mmtipo + ' objeto: ' + objeto)
    espera = false;
    if (mensajes) {
        setProgressBar(0);
        $("#avance_text1").text("Conectando a la nube organizacional.")
        espera = setInterval(() => {
            $("#avance_text1").text($("#avance_text1").text() + '.')

        }, 2000);
        $('#modal_avance').modal('show')
    }
    console.log('bucket ' + bucket)
    objeto_size = objeto.size;
    console.log(objeto_size)
    AWS.config.update({ accessKeyId: awsid, secretAccessKey: awskey });
    AWS.config.region = 'us-east-1';
    var s3 = new AWS.S3({ params: { Bucket: bucket } });
    fileKey = carpeta + '/' + nombre;

    // Upload
    var startTime = new Date();
    var partNum = 0;
    var partSize = 1024 * 1024 * 5; // Minimum 5MB per chunk (except the last part) http://docs.aws.amazon.com/AmazonS3/latest/API/mpUploadComplete.html
    var numPartsLeft = Math.ceil(objeto_size / partSize);
    var totalParts = numPartsLeft;
    var totalOkParts = 0;
    var maxUploadTries = 3;
    var multiPartParams = {
        Bucket: bucket,
        Key: fileKey,
        ContentType: mmtipo


    };
    var multipartMap = {
        Parts: []
    };

    function completeMultipartUpload(s3, doneParams) {
        s3.completeMultipartUpload(doneParams, function (err, data) {
            if (err) {
                console.log("An error occurred while completing the multipart upload");
                console.log(err);
            } else {
                var delta = (new Date() - startTime) / 1000;
                console.log('Completed upload in', delta, 'seconds');
                console.log('Final upload data:', data);
                $("#avance_text1").text("Importado en " + Math.round(delta, 0) + " segundos.")
                visualizarNoticia()
            }
        });
    }

    function uploadPart(s3, multipart, partParams, tryNum) {
        var tryNum = tryNum || 1;
        s3.uploadPart(partParams, function (multiErr, mData) {
            if (multiErr) {
                console.log('multiErr, upload part error:', multiErr);
                if (tryNum < maxUploadTries) {
                    console.log('Retrying upload of part: #', partParams.PartNumber)
                    uploadPart(s3, multipart, partParams, tryNum + 1);
                } else {

                    console.log('Failed uploading part: #', partParams.PartNumber)
                    $("#avance_text1").text("No tuvo exito, revise conección a internet.")

                }
                return;
            }
            multipartMap.Parts[this.request.params.PartNumber - 1] = {

                ETag: mData.ETag,
                PartNumber: Number(this.request.params.PartNumber)
            };
            console.log('Multipart map', JSON.stringify(multipartMap));
            console.log("Completed part", this.request.params.PartNumber);
            console.log('mData', mData.ETag);
            totalOkParts++;
            porcentaje = Math.ceil(100 * totalOkParts / totalParts)
            clearInterval(espera);
            $("#avance_text1").text("Importado " + porcentaje + " %.")
            //  $("#conectando").hide();
            setProgressBar(porcentaje)
            if (--numPartsLeft > 0) return; // complete only when all parts uploaded

            var doneParams = {
                Bucket: bucket,
                Key: fileKey,
                MultipartUpload: multipartMap,
                UploadId: multipart.UploadId
            };

            console.log("Completing upload...");
            completeMultipartUpload(s3, doneParams);
        });
    }

    if (objeto_size < 5000000) {

        s3.putObject({
            Bucket: bucket,
            Key: fileKey,
            Body: objeto,
            ContentType: mmtipo
        }, function (mpErr, multipart) {
            if (mpErr) {
                console.log('Error! parte pequeña', mpErr)
                clearInterval(espera);
                $("#avance_text1").text("No tuvo exito, revise conección a internet.")

            }
            else {
                console.log('Parte pequeña ok')
                setProgressBar(100);
                clearInterval(espera);
                var delta = (new Date() - startTime) / 1000;
                console.log('Completed upload in', delta, 'seconds');
                $("#avance_text1").text("Importado en " + Math.round(delta, 0) + " segundos.")
                visualizarNoticia();
                return;
            }
        });

    } else {
        // Multipart
        console.log("Creating multipart upload for:", fileKey);
        s3.createMultipartUpload(multiPartParams, function (mpErr, multipart) {
            if (mpErr) {
                console.log('Error!', mpErr);
                clearInterval(espera);
                $("#avance_text1").text("No tuvo exito, revise conección a internet.")

                return;
            }
            console.log("Got upload ID", multipart.UploadId);

            // Grab each partSize chunk and upload it as a part
            for (var rangeStart = 0; rangeStart < objeto_size; rangeStart += partSize) {
                partNum++;
                var end = Math.min(rangeStart + partSize, objeto_size),
                    partParams = {
                        Body: objeto.slice(rangeStart, end),
                        Bucket: bucket,
                        Key: fileKey,
                        PartNumber: String(partNum),
                        UploadId: multipart.UploadId
                    };

                // Send a single part
                console.log('Uploading part: #', partParams.PartNumber, ', Range start:', rangeStart);
                uploadPart(s3, multipart, partParams);
            }
        });
    }
}

function obtenerUrlMmedia(carpeta, nombre) {

    var urls3 = " "
    var url = 'php/' + "obtener_url_multimedia.php";
    $.ajax({
        type: "POST",
        url: url,
        data: { "carpeta": carpeta, "nombre": nombre },
        dataType: "JSON",
        async: false,
        success: function (response) { urls3 = response.responseText },
        error: function (response) { urls3 = response.responseText }
    })

    return urls3
}
function obtenerFileMmedia(carpeta, nombre) {

    var urls3 = " "
    var url = 'php/' + "obtener_file_multimedia.php";
    $.ajax({
        type: "POST",
        url: url,
        data: { "carpeta": carpeta, "nombre": nombre },
        dataType: "JSON",
        async: false,
        success: function (response) { urls3 = response.responseText },
        error: function (response) { urls3 = response.responseText }
    })

    return urls3
}


function setProgressBar(porcentaje) {

    $('#bar-avance').addClass('progress-bar-animated');
    $('#footer').css('width', porcentaje + '%');


}

function validaCampoRut(campo) {
    if (validaRut(campo, "Chile") == false) {
        $("#" + campo).removeClass('entrada-valida').addClass('entrada-invalida')
        $("#" + campo + "_err").removeClass('campo-valido').addClass('campo-invalido').text("Rut no válido")
        return false
    }
    else {

        $("#" + campo).removeClass('entrada-invalida').addClass('entrada-valida')
        $("#" + campo + "_err").removeClass('campo-invalido').addClass('campo-valido').text("")
        return true

    }
};
function validaCampoNombre(campo) {
    if (validaNombre(campo) == false) {
        $("#" + campo).removeClass('entrada-valida').addClass('entrada-invalida')
        $("#" + campo + "_err").removeClass('campo-valido').addClass('campo-invalido').text("Campo debe contener letras")
        return false
    }
    else {

        $("#" + campo).removeClass('entrada-invalida').addClass('entrada-valida')
        $("#" + campo + "_err").removeClass('campo-invalido').addClass('campo-valido').text("")

        return true
    }
};

function validaCampoBlanco(campo) {
    if (esBlanco($("#" + campo).val()) || $("#" + campo).val() == 0) {
        $("#" + campo).removeClass('entrada-valida').addClass('entrada-invalida')
        $("#" + campo + "_err").removeClass('campo-valido').addClass('campo-invalido').text("No debe estar en blanco")
        return false
    }
    else {

        $("#" + campo).removeClass('entrada-invalida').addClass('entrada-valida')
        $("#" + campo + "_err").removeClass('campo-invalido').addClass('campo-valido').text("")

        return true
    }
};

function validaCampoSelect(campo) {
    if (esBlanco($("#" + campo).val()) || $("#" + campo).val() == 0) {
        $("#" + campo).removeClass('entrada-valida').addClass('entrada-invalida')
        $("#" + campo + "_err").removeClass('campo-valido').addClass('campo-invalido').text("Debe seleccionar un item")
        return false
    }
    else {

        $("#" + campo).removeClass('entrada-invalida').addClass('entrada-valida')
        $("#" + campo + "_err").removeClass('campo-invalido').addClass('campo-valido').text("")

        return true
    }
};


function validaCampoMail(campo) {

    if (!esBlanco($("#" + campo).val())) {

        if (validaMail(campo) == false) {
            $("#" + campo).removeClass('entrada-valida').addClass('entrada-invalida')
            $("#" + campo + "_err").removeClass('campo-valido').addClass('campo-invalido').text("El mail no es válido")
            return false
        }
        else {

            $("#" + campo).removeClass('entrada-invalida').addClass('entrada-valida')
            $("#" + campo + "_err").removeClass('campo-invalido').addClass('campo-valido').text("")

            return true
        }


    }


    $("#" + campo).removeClass('entrada-invalida').addClass('entrada-valida')
    $("#" + campo + "_err").removeClass('campo-invalido').addClass('campo-valido').text("")

    return true

};


function iniciaFormulario(formulario) {




    $("#" + formulario + " input[type=text]").each(function (index) {
        $(this).val("");

    });
    $("#" + formulario + " input[type=number]").each(function (index) {
        $(this).val(0);
    });

    $("#" + formulario + "  select").each(function (index) {
        $(this).val("");
    });


    $("#" + formulario + "  textarea").each(function (index) {
        $(this).val("");
    });
    $("#" + formulario + " input[type=datetime-local]").each(function (index) {
        $(this).val(hoy() + "T08:00");
    });
    $("#" + formulario + " input[type=date]").each(function (index) {
        $(this).val(hoy());
    });



};

function resetErrores(formulario) {
    $("#" + formulario + " input").each(function (index) {
        $(this).removeClass('entrada-invalida').addClass('entrada-valida')
    });

    $("#" + formulario + " select").each(function (index) {
        $(this).removeClass('entrada-invalida').addClass('entrada-valida')
    });



    $("[id$=_err]").each(function (index) {

        $(this).removeClass('campo-invalido').addClass('campo-valido').text("")
    });


}


function PeriodoTexto(per) {

    // aaaa_mm

    aa = per.substring(0, 4)
    mm = per.substring(5, 8)
    mtxt = "";
    switch (mm) {
        case '01':
            mtxt = "ENERO";
            break;
        case '02':
            mtxt = "FEBRERO";
            break;
        case '03':
            mtxt = "MARZO";
            break;
        case '04':
            mtxt = "ABRIL";
            break;
        case '05':
            mtxt = "MAYO";
            break;
        case '06':
            mtxt = "JUNIO";
            break;
        case '07':
            mtxt = "JULIO";
            break;
        case '08':
            mtxt = "AGOSTO";
            break;
        case '09':
            mtxt = "SEPTIEMBRE";
            break;
        case '10':
            mtxt = "OCTUBRE";
            break;
        case '11':
            mtxt = "NOVIEMBRE";
            break;
        case '12':
            mtxt = "DICIEMBRE";
            break;

        default:
            break;
    }

    return mtxt + " " + aa
}


/*************************************************************/
// NumeroALetras
// The MIT License (MIT)
// 
// Copyright (c) 2015 Luis Alfredo Chee 
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// @author Rodolfo Carmona
// @contributor Jean (jpbadoino@gmail.com)
/*************************************************************/
function Unidades(num) {

    switch (num) {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }

    return "";
}//Unidades()

function Decenas(num) {

    decena = Math.floor(num / 10);
    unidad = num - (decena * 10);

    switch (decena) {
        case 1:
            switch (unidad) {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + Unidades(unidad);
            }
        case 2:
            switch (unidad) {
                case 0: return "VEINTE";
                default: return "VEINTI" + Unidades(unidad);
            }
        case 3: return DecenasY("TREINTA", unidad);
        case 4: return DecenasY("CUARENTA", unidad);
        case 5: return DecenasY("CINCUENTA", unidad);
        case 6: return DecenasY("SESENTA", unidad);
        case 7: return DecenasY("SETENTA", unidad);
        case 8: return DecenasY("OCHENTA", unidad);
        case 9: return DecenasY("NOVENTA", unidad);
        case 0: return Unidades(unidad);
    }
}//Unidades()

function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
        return strSin + " Y " + Unidades(numUnidades)

    return strSin;
}//DecenasY()

function Centenas(num) {
    centenas = Math.floor(num / 100);
    decenas = num - (centenas * 100);

    switch (centenas) {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas);
        case 3: return "TRESCIENTOS " + Decenas(decenas);
        case 4: return "CUATROCIENTOS " + Decenas(decenas);
        case 5: return "QUINIENTOS " + Decenas(decenas);
        case 6: return "SEISCIENTOS " + Decenas(decenas);
        case 7: return "SETECIENTOS " + Decenas(decenas);
        case 8: return "OCHOCIENTOS " + Decenas(decenas);
        case 9: return "NOVECIENTOS " + Decenas(decenas);
    }

    return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    letras = "";

    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += "";

    return letras;
}//Seccion()

function Miles(num) {
    divisor = 1000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMiles = Seccion(num, divisor, "UN MIL", "MIL");
    strCentenas = Centenas(resto);

    if (strMiles == "")
        return strCentenas;

    return strMiles + " " + strCentenas;
}//Miles()

function Millones(num) {
    divisor = 1000000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
    strMiles = Miles(resto);

    if (strMillones == "")
        return strMiles;

    return strMillones + " " + strMiles;
}//Millones()

function NumeroALetras(num) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: 'PESOS',//"PESOS", 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: 'PESO', //"PESO", 'Dólar', 'Bolivar', 'etc'

        letrasMonedaCentavoPlural: "CENTAVOS",
        letrasMonedaCentavoSingular: "CENTAVO"
    };

    if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (function () {
            if (data.centavos == 1)
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular;
            else
                return Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
        })();
    };

    if (data.enteros == 0)
        return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
        return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    else
        return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}//NumeroALetras()

function tableToExcel(table, name, nheaders) {
    console.log('en exportar')
    const workbook = new ExcelJS.Workbook();

    workbook.creator = 'JasaServices.com';
    workbook.lastModifiedBy = 'JASA';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    // red tab colour
    const worksheet = workbook.addWorksheet('New Sheet', { properties: { tabColor: { argb: '87AFC6' } } });
    var textRange; var j = 0;
    tab = document.getElementById(table);
    for (j = 0; j < tab.rows.length; j++) {
        const rowValues = [];
        for (i = 1; i < tab.rows[j].cells.length; i++) {
            rowValues[i] = tab.rows[j].cells[i].innerText
        }
        worksheet.addRow(rowValues);

    }
    // Headers value

    // formato hoja
    var borderStyles = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
    };
    var fontStyles =
        { name: 'Calibri', family: 4, size: 10 }

    // formato todas las celdas
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        row.eachCell(function (cell, colNumber) {
            cell.border = borderStyles;
            cell.font = fontStyles;
            if (isNaN(cell.value) || esBlanco(cell.value)) {
                if (cell.value.length > 20) { cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }; }
                else {
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                }
            } else {
                cell.value = +cell.value;
                cell.alignment = { vertical: 'middle', horizontal: 'right' };
            }
        });
    });

    // formato cabeceras
    for (j = 0; j < nheaders; j++) {
        row = worksheet.getRow(j + 1);

        row.eachCell(function (cell, colNumber) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '87AFC6' } };
            cell.alignment = { vertical: 'center', horizontal: 'center' }
            cell.font = { name: 'Calibri', family: 4, size: 10, bold: true }
        });
    }


    worksheet.columns.forEach(column => {
        column.width = 20;
    });



    workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
        saveAs(blob, name + '.xlsx');

    });


}

function cargaCursosSelect(empresa, select) {
    $.ajax({
        type: "POST",
        url: 'php/crud_cursos.php',

        data: {


            'IdEmpresa': empresa,
            'IdAnoCab': 0,
            'IdCursoCab': 0,
            'IdLetraCab': 0,
            'IdJornadaCab': 0,
            'IdEspecialidadCab': 0,
            'Accion': "list"
        },
        dataType: "JSON",
        async: false,
        cache: false,
        success: function (data) {
            $('#' + select).empty();
            var $dropdown = $('#' + select);
            var i;
            $dropdown.append("<option value='0' selected>Seleccione...</option>");
            parsedData = data.data;
            $.each(parsedData, function (key, item) {
                $dropdown.append($("<option />").val(item.IdCur).text(item.Ano + " " + item.Curso + " " + item.Letra + " " + item.Jornada + " " + item.Especialidad));

            });
        },
    });
}
function mostrarInfo(d, formulario) {

    $(formulario + " input").each(function () {
        $(this).val(d[this.name])

    });

    $(formulario + "  select").each(function () {
        $(this).val(d[this.name])
        id01 = d[this.name]
        elemento = this.name
        $(formulario + "  #" + elemento + " option").each(function () {
            if ($(this).val() == id01) {
                $(this).prop('selected', true).trigger('change');
                console.log($(this).text())
            }

        });

    });


    $(formulario + " textarea").each(function () {
        $(this).val(d[this.name])

    });






}

function desformatearNumeros(formulario) {
    // console.log('en desformatear ' + formulario)
    $(formulario + ' .number-separator').each(function () {
        // console.log($(this).val());
        $(this).val($(this).val().replace(/\./g, ""))
        $(this).val($(this).val().replace(/\,/g, "."))
        // console.log("aca " + this.id)
        // console.log($(this).val());
    });
};
function desformatearEntero(Entero) {
    // console.log('en desformatear ' + formulario)
 
        // console.log($(this).val());
     res1=   Entero.replace(/\./g, "")
   //  res2 =   res2.replace(/\,/g, ".")
        return res1
        
};
function formatearNumeros(formulario) {
    // console.log('en formatear ' + formulario)
    $(formulario + ' .number-separator').each(function () {
        $(this).val($(this).val().replace(/\./g, ","));
        // console.log("aca " + this.id)
        // console.log($(this).val());
        element = document.getElementById(this.id);

        //   element.dispatchEvent(new Event('input', { bubbles: true }));
    });
};
function desformatearNumerosAll() {
    $('.number-separator').each(function () {
        // console.log($(this).val());
        $(this).val($(this).val().replace(/\./g, ""))
        $(this).val($(this).val().replace(/\,/g, "."))
        // console.log("aca " + this.id)
        // console.log($(this).val());
    });
};
function formatearNumerosAll() {
    $('.number-separator').each(function () {
        $(this).val($(this).val().replace(/\./g, ","));
        // console.log("aca " + this.id)
        // console.log($(this).val());
        element = document.getElementById(this.id);

        element.dispatchEvent(new Event('input', { bubbles: true }));
    });
};

function select2valor(nombre, valor) {
    $(nombre + " option").each(function () {
        if ($(this).val() == valor) {
            $(this).prop('selected', true).trigger('change');

        }

    })
};

function semaforo(l1, l2, l3) {
    content = "<table><tr>"
    content += "<td ><div class='sem1 " + l1 + "' ></div></td>"
    content += "<td><div class='sem1 " + l2 + "' '></div></td>"
    content += "<td><div class='sem1 " + l3 + "' '></div></td>"
    content += "</tr></table>"
    return content
}

function obtenerReferenciaDatos(id) {

    var obj = {
        Num1: 0,
        Num2: 0,
        Num3: 0,
        Num4: 0,
        Text1: "",
        Text2: "",
        Text3: "",
        Text4: "",
        Date1: "",
        Date2: ""

    };



    $.ajax(
        {
            type: "POST",
            url: "php/crud_referencias.php",
            data: { IdReferencia: id, Accion: 'get' },
            dataType: "JSON",
            async: false,

            success: function (dataRet) {
                d = dataRet.data;
                obj.Num1 = d.Num1
                obj.Num2 = d.Num2
                obj.Num3 = d.Num3
                obj.Num4 = d.Num4
                obj.Text1 = d.Text1
                obj.Text2 = d.Text2
                obj.Text3 = d.Text3
                obj.Text4 = d.Text4

                obj.Date1 = d.Date1
                obj.Date2 = d.Date2Text1



            }
        });

    return obj
}