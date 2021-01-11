// script.js
class Horario {
  constructor (nameSchedule, morningStarts, morningEnds, eveningStarts, eveningEnds) {
    this.nombreHorario = nameSchedule;
    this.empiezaMatutino = morningStarts;
    this.acabaMatutino = morningEnds;
    this.empiezaVespertino = eveningStarts;
    this.acabaVespertino = eveningEnds;
  }
  mostrar() {
    document.write("<tr>");
    document.write("<td>" + this.nombreHorario + "</td>");
    document.write("<td>" + this.empiezaMatutino + "</td>");
    document.write("<td>" + this.acabaMatutino + "</td>");
    document.write("<td>" + this.empiezaVespertino + "</td>");
    document.write("<td>" + this.acabaVespertino + "</td>");
    document.write("</tr>");
  }
}

class Banco {
  constructor(name, interbankCommission, bankCommission, scheduleAttention) {
    this.nombre = name;
    this.comisionInterbancaria = interbankCommission;
    this.comisionBancaria = bankCommission;
    this.horarioAtencion = scheduleAttention;
  }
  mostrar() {
    document.write("<tr>");
    document.write("<td>" + this.nombre + "</td>");
    document.write("<td>$" + this.comisionInterbancaria + "</td>");
    document.write("<td>$" + this.comisionBancaria + "</td>");
    document.write("<td>" + this.horarioAtencion + "</td>");
    document.write("</tr>");
  }
}
class Cuenta {
  constructor(keyInterbank, bankName, balance) {
    this.clave = keyInterbank;
    this.banco = bankName;
    this.saldo = balance;
  }
  deposito(deposito) {
    this.saldo += deposito;
  }
  retiro(retiro) {
    this.saldo -= retiro;
  }
  mostrar() {
    document.write("<tr>");
    document.write("<td>" + this.clave + "</td>");
    document.write("<td>" + this.banco + "</td>");
    document.write("<td>$" + this.saldo + "</td>");
    document.write("</tr>");
  }
}
class Cliente {
  constructor(number, name, account) {
    this.numero = number; 
    this.nombre = name;
    this.cuenta = account;
  }
  mostrar() {
    document.write('<tr>');
    document.write('<td class="colorojo">' + this.numero + '</td>');
    document.write('<td>' + this.nombre + '</td>');
    document.write('<td>' + this.cuenta + '</td>');
    document.write('</tr>');
  }
}

class Transferencia {
  constructor(number, rootBank, rootAccount, destinationBank, destinationAccount, amount , date, commission) {
    this.numero = number;
    this.bancoOrigen = rootBank;
    this.cuentaOrigen =rootAccount;
    this.bancoDestino = destinationBank;
    this.cuentaDestino =destinationAccount;
    this.monto = amount;
    this.fecha = date;
    this.comision = commission;
  }
}

const MONTO_A_TRANSFERIR = parseInt('1000000');
var button = document.getElementById("transferir");
button.addEventListener("click", iniciaTransferencia);


var bancos = [];
var cuentas = [];
var clientes = [];
var transferencias = [];
var horarios = [];

horarios.push(new Horario("semanalMixto", "9", "12", "15", "20"));

bancos.push(new Banco("Santander", "100", "0", "semanalMixto"));
bancos.push(new Banco("BBVA","100", "0", "semanalMixto"));
bancos.push(new Banco("Citi Banamex","100", "0", "semanalMixto"));

cuentas.push(new Cuenta("1000001", "Santander", "2000000"));
cuentas.push(new Cuenta("1000002", "Santander", "2000000"));
cuentas.push(new Cuenta("2000001", "BBVA", "3000000"));
cuentas.push(new Cuenta("2000002", "BBVA", "3000000"));
cuentas.push(new Cuenta("3000001", "Citi Banamex", "1000000"));
cuentas.push(new Cuenta("3000002", "Citi Banamex", "1000000"));

clientes.push(new Cliente("1", "Joe", "1000001"));
clientes.push(new Cliente("2", "Joana", "1000002"));
clientes.push(new Cliente("3", "Alice", "2000001"));
clientes.push(new Cliente("4", "Scarlet", "2000002"));
clientes.push(new Cliente("5", "Bob", "3000001"));
clientes.push(new Cliente("6", "Natalia", "3000002"));

//transferencias.push(new Transferencia("1", "Santander", "1000001", "BBVA", "2000001", "1000000", "9", "100" ));

/* Funciones */
function validarCliente(number) {
  var validacion = "";
  for (var cliente of clientes) {
    if (number == cliente.numero) {
      validacion = true;
    }
  }
  return validacion;
}

function getNombreCliente(number) {
  var nombre = "";
  for (var cliente of clientes) {
    if (number == cliente.numero) {
      nombre = cliente.nombre;
    }
  }
  return nombre;
}

function getNumeroCuenta(number) {
  var cuenta = "";
  for (var cliente of clientes) {
    if (number == cliente.numero) {
      cuenta = cliente.cuenta;
    }
  }
  return cuenta;
}

function getNombreBanco(number) {
  var numCuenta = getNumeroCuenta(number);
  var banco = "";
  for (var cuenta of cuentas) {
    if (numCuenta == cuenta.clave) {
      banco = cuenta.banco;
    }
  }
  return banco;
}

function getSaldoCuenta(number) {
  var numCuenta = getNumeroCuenta(number);
  var saldo = "";
  for (var cuenta of cuentas) {
    if (numCuenta == cuenta.clave) {
      saldo = parseInt(cuenta.saldo);
    }
  }
  return saldo;
}

function getComisionInterbancaria(number) {
  var nombreBanco = getNombreBanco(number);
  var comisionInterbancaria = "";
  for (var banco of bancos) {
    if (nombreBanco == banco.nombre) {
      comisionInterbancaria = parseInt(banco.comisionInterbancaria);
    }
  }
  return comisionInterbancaria;
}

function getComisionBancaria(number) {
  var nombreBanco = getNombreBanco(number);
  var comisionBancaria = "";
  for (var banco of bancos) {
    if (nombreBanco == banco.nombre) {
      comisionBancaria = parseInt(banco.comisionBancaria);
    }
  }
  return comisionBancaria;
}


function getHorarioAtencion(number) {
  var nombreBanco = getNombreBanco(number);
  var horarioAtencion = "";
  for (var banco of bancos) {
    if (nombreBanco == banco.nombre) {
      horarioAtencion = banco.horarioAtencion;
    }
  }
  return horarioAtencion;
}

function getHorarioEmpiezaMatutino(number) {
  var horarioAtencion = getHorarioAtencion(number);
  var empiezaMatutino = "";
  for (var horario of horarios) {
    if (horarioAtencion == horario.nombreHorario) {
      empiezaMatutino = horario.empiezaMatutino;
    }
  }
  return empiezaMatutino;
}

function getHorarioAcabaMatutino(number) {
  var horarioAtencion = getHorarioAtencion(number);
  var acabaMatutino = "";
  for (var horario of horarios) {
    if (horarioAtencion == horario.nombreHorario) {
      acabaMatutino = horario.acabaMatutino;
    }
  }
  return acabaMatutino;
}

function getHorarioEmpiezaVespertino(number) {
  var horarioAtencion = getHorarioAtencion(number);
  var empiezaVespertino = "";
  for (var horario of horarios) {
    if (horarioAtencion == horario.nombreHorario) {
      empiezaVespertino = horario.empiezaVespertino;
    }
  }
  return empiezaVespertino;
}

function getHorarioAcabaVespertino(number) {
  var horarioAtencion = getHorarioAtencion(number);
  var acabaVespertino = "";
  for (var horario of horarios) {
    if (horarioAtencion == horario.nombreHorario) {
      acabaVespertino = horario.acabaVespertino;
    }
  }
  return acabaVespertino;
}

/* Actailizar datos */
function actualizaSaldo(number, transfer){
  var numCuenta = getNumeroCuenta(number);
  var banco = "";
  for (var cuenta of cuentas) {
    if (numCuenta == cuenta.clave) {
      cuenta.saldo =  parseInt(cuenta.saldo) + parseInt(transfer);
    }
  }
  return banco;
}


/* Hora actual */

function getHoraActual() {
  var ahora =  new Date();
  return parseInt(ahora.getHours());
}

function esHorarioHabil(number){
  
  var hora_actual =  getHoraActual(); 

  var horarioAtencion = getHorarioAtencion(number);
  var habil = false;
  for (var horario of horarios) {
    if (horarioAtencion == horario.nombreHorario) {
      var empiezam_matutino = parseInt(horario.empiezaMatutino);
      var acaba_matutino = parseInt(horario.acabaMatutino);
      var empieza_vespertino = parseInt(horario.empiezaVespertino);
      var acaba_vespertino = parseInt(horario.acabaVespertino);
      if ( hora_actual >= empiezam_matutino && hora_actual <= acaba_matutino  ) {
        habil = true;
      } else if (hora_actual >= empieza_vespertino && hora_actual <= acaba_vespertino) {
        habil = true;
      }
    }
  }
  return habil;
}


/* Write */
function mostrarClientes() {
  document.write("<h2>Datos Cliente</h2>");
  document.write("<table>");
  document.write("<tr>");
  document.write("<th>Numero</th>");
  document.write("<th>Nombre</th>");
  document.write("<th>Clave Cuenta</th>");
  document.write("</tr>");
  
  for (var cliente of clientes) {
    cliente.mostrar();
  }
  
  document.write("</table>");
}


function mostrarCuentas() {

  document.write("<h2>Datos Cuentas</h2>");
  document.write("<table>");
  document.write("<tr>");
  document.write("<th>Clave</th>");
  document.write("<th>Nombre Banco</th>");
  document.write("<th>Saldo</th>");
  document.write("</tr>");

  for (var cuenta of cuentas) {
    cuenta.mostrar();
  }
  document.write("</table>");
}

function mostrarBancos() {
  document.write("<h2>Datos Bancos</h2>");
  document.write("<table>");
  document.write("<tr>");
  document.write("<th>Nombre</th>");
  document.write("<th>Comision Interbancaria</th>");
  document.write("<th>Comision mismo Banco</th>");
  document.write("<th>Horario de Atencion</th>");
  document.write("</tr>");

  for (var banco of bancos) {
    banco.mostrar();
  }
  document.write("</table>");
}

function mostrarHorarios() {
  document.write("<h2>Datos Horario</h2>");
  document.write("<table>");
  document.write("<tr>");
  document.write("<th>Nombre Horario</th>");
  document.write("<th>Empieza Horario Matutino </th>");
  document.write("<th>Acaba Horario Matutino</th>");
  document.write("<th>Empieza Horario Vespertino </th>");
  document.write("<th>Acaba Horario Vespertino</th>");
  document.write("</tr>");
  for (var horario of horarios) {
    horario.mostrar();
  }
  document.write("</table>");
}

starApp();

function starApp() {
  // Ver Clientes
  mostrarClientes();
  mostrarCuentas();
  mostrarBancos();
  mostrarHorarios();
}


/* Acion del boton */
function iniciaTransferencia() {
  var c_emisor = document.getElementById("cliente_emisor");
  var c_reseptor = document.getElementById("cliente_reseptor");
  var cliente_emisor = parseInt(c_emisor.value);
  var cliente_reseptor = parseInt(c_reseptor.value);

  
  /* Verificar cliente */
  if (cliente_emisor == cliente_reseptor && validarCliente(cliente_emisor) && validarCliente(cliente_reseptor)) {
    console.log("> No se pueden hacer autotransferencias a la misma cuenta.")
  } else if (validarCliente(cliente_emisor) || validarCliente(cliente_reseptor)) {
    
    if (validarCliente(cliente_emisor) && validarCliente(cliente_reseptor)) {
      console.log('> El cliente emisor y resepetor son validos');
      transferencia(cliente_emisor, cliente_reseptor, MONTO_A_TRANSFERIR);
    } else if(validarCliente(cliente_emisor)) {
      console.log('> Solo el cliente emisor es valido!');
    } else if(validarCliente(cliente_reseptor)) {
      console.log('> Solo el cliente resepetor es valido!');
    }
    
  } else {
    console.log('> Los cliente emisor y resepetor no son validos');
  } 

  function transferencia(cliente_emisor, cliente_reseptor, monto_a_tranferir) {
    /* verificar numeros de cuenta origen y destino */
    var cuenta_emisor = getNumeroCuenta(cliente_emisor);
    var cuenta_reseptor = getNumeroCuenta(cliente_reseptor);
    var banco_emisor = getNombreBanco(cliente_emisor);
    var banco_reseptor = getNombreBanco(cliente_reseptor);
    var comision_bancaria = getComisionBancaria(cliente_emisor);
    var comision_interbancaria = getComisionInterbancaria(cliente_emisor)
    var saldo_cuenta = getSaldoCuenta(cliente_emisor);
  //

    if(cuenta_emisor) {
      console.log('> El numero de cuenta del emisor es: ' + cuenta_emisor);
    } else {
      console.log('> El cliente emisor no tiene registrado un numero de cuenta');
    }

    if(cuenta_reseptor) {
      console.log('> El numero de cuenta del reseptor es: ' + cuenta_reseptor);
    } else {
      console.log('> El cliente reseptor no tiene registrado un numero de cuenta');
    }

    if(cuenta_emisor && cuenta_reseptor) {
      console.log('> Los numeros de cuenta son validos');
      costoTransaccion();
    }

    function costoTransaccion() {
      var comision = '';
      var transferencia_mas_comision = '';
      
      if(banco_emisor == banco_reseptor) {
        console.log('> La transferencia es en el banco ' + banco_emisor);
        comision = comision_bancaria;
      } else {
        console.log('> La transferencia es interbancaria de ' + banco_emisor + ' a ' +  banco_reseptor);
        comision = comision_interbancaria;
      }
      console.log('> La comision de la transferencia es de $' + comision);
      transferencia_mas_comision = monto_a_tranferir + comision;

      if(saldo_cuenta >= transferencia_mas_comision) {
        console.log('> Hay un aldo suficiente en la cuenta de origen');
        
        
        operacioTransaccion();
      } else {
        console.log('> Saldo insuficiente en la cuenta');
      }

      function operacioTransaccion() {

        //var historial;
      
        console.log('> El saldo de la cuenta emisora antes de la transferencia era $' + getSaldoCuenta(cliente_emisor));
        console.log('> El saldo de la cuenta reseptora antes de la transferencia era $' + getSaldoCuenta(cliente_reseptor));
        actualizaSaldo(cliente_emisor, -monto_a_tranferir);
        actualizaSaldo(cliente_emisor, -comision);
        actualizaSaldo(cliente_reseptor, monto_a_tranferir);

        console.log('> El saldo de la cuenta emisora despues de la transferencia es $' + getSaldoCuenta(cliente_emisor));
        console.log('> El saldo de la cuenta reseptora despues de la transferencia es $' + getSaldoCuenta(cliente_reseptor));


        if(esHorarioHabil(cliente_emisor)) {
          console.log('> Es un horario habil en este momento ya se ve reflejada la transaccion');

          //<-- historial
        } else {
          console.log('> Es un horario no habil, la transaccion no aparecera en el historial hata que se un horario habil');
        }
      }
      
    }
  }
}
