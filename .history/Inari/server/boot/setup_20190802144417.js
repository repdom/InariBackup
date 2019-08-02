'use strict';

module.exports = function(app) {
  let mysql = app.dataSources.mysql;

  let modelos = [
    'AccessToken',
    'ACL',
    'Role',
    'RoleMapping',
    'colaborador',
    'FormularioArea',
    'ItemEspeciales',
    'Grupos'
  ];

  mysql.autoupdate(modelos, function(err) {
    if (err) {
      throw err;
    }
    console.log(`===== ACTULIZANDO: modelo ${modelos} =====`);
    defaultRoles(app);
    crearUsuarioAdministrador(app);
    // crearConfiguracion(app);
  });
};

function defaultRoles(app) {
  let role = app.models.Role;

  let listOfRoles = [
        ['Administrador', 'Tiene acceso a todo el sistema.'],
        ['Verificador', 'Puede hacer las evaluaciones.'],
        ['Administrador de Area', 'Puede hacer análisis en las areas evaluadas'],
  ];

  listOfRoles.forEach(function(element) {
   // eslint-disable-next-line max-len
    role.findOrCreate({where: {name: element[0], description: element[1]}}, {name: element[0], description: element[1]},
            function(err, rol) {
              console.log(`===== OK ${rol.name} =====`);
            }
        );
  });
};

/* function crearConfiguracion(app) {
  let configuracion = app.models.Configuraciones;

     let config = {
        codigo: 1,
        ventas: 0,
        cierreDeCaja: "8:00:00 PM",
        aperturaDeCaja: "8:00:00 AM",
        gananciasTotales: 0,
        perdidasTotales: 0,
        fechaInicioPeriodo: "2000-01-01",
        fechaFinPeriodo: "2000-01-01"
    }
    console.log(`configuracion: ${config}`);

    configuracion.findOrCreate({where: {codigo: 1}}, {
        ventas: 0,
        cierreDeCaja: '8:00:00 PM',
        aperturaDeCaja: '8:00:00 AM',
        gananciasTotales: 0,
        perdidasTotales: 0,
        fechaInicioPeriodo: '2000-01-01',
        fechaFinPeriodo: '2000-01-01',
    },
     function(err, res) {
       console.log(`configuracion: ${res}`);
     });
} */

function crearUsuarioAdministrador(app) {
  let colaborador = app.models.colaborador;
  let rol = app.models.Role;
  let roleMapping = app.models.RoleMapping;

  // eslint-disable-next-line max-len
  colaborador.findOrCreate({where: {username: 'manager', email: 'manager@manager.com'}}, {
    username: 'manager',
    email: 'manager@manager.com',
    password: 'manager123',
    primerNombre: 'manager',
    primerApellido: 'manager',
    segundoNombre: 'manager',
    segundoApellido: 'managel',
    cedula: '000000000',
    cancelado: 0,
  },
        function(err, user) {
          if (err) return console.log(err);
          // eslint-disable-next-line max-len
          rol.findOrCreate({where: {name: 'Administrador', description: 'Tiene acceso a todo el sistema.'}}, {name: 'Administrador', description: 'Tiene acceso a todo el sistema.'},
                function(err, role) {
                    // if (err) return debug(err);
                  console.log(`===== OK ${role.name} =====`);

                  // eslint-disable-next-line max-len
                  roleMapping.findOrCreate({where: {roleId: role.id, principalId: user.id}}, {roleId: role.id, principalId: user.id, principalType: roleMapping.USER},
                        function(err, rolMapping) {
                          console.log(rolMapping);
                          if (err) return console.log(err);
                          console.log(`===== Rol asignado a ${user.username}`);
                        }
                    );
                }
            );
        }
    );
};

