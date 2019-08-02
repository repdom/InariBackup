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
    'Grupos',
    'Item',
    'FormularioEvaluacion',
    'ItemEvaluacion',
    'ItemEspecialesEvaluacion',
  ];

  mysql.autoupdate(modelos, function(err) {
    if (err) {
      throw err;
    }
    console.log(`===== ACTULIZANDO: modelo ${modelos} =====`);
    defaultRoles(app);
    crearUsuarioAdministrador(app);
    defaultGrupos(app);
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

function defaultGrupos(app) {
  let grupos = app.models.Grupos;

  let listOfGrupos = [
      ['Edificios', 'Construcción y el diseño de los edificios'],
      ['Áreas', 'Disposición de los locales y de área de trabajo'],
      ['Servicios', 'Servicios - aire, agua, energía'],
      ['Residuos',	'Disposición de Residuos'],
      ['Equipos', 'LyM	Equipos idoneos, limpieza y mantenimiento'],
      ['Compras', 'Gestión de los materiales comprados'],
      ['Contaminación', 'Medidas para la prevención de la contaminación cruzada'],
      ['Lim y Desinf', 'Limpieza y desinfección'],
      ['Plagas', 'Control de Plagas'],
      ['Higiene', 'Higiene del personal e instalaciones para empleados'],
      ['Retrabajo', 'Retrabajo'],
      ['Recall', 'Procedimientos de retiro del producto'],
      ['Almacén', 'Almacén'],
      ['Etiqueta', 'Información del producto y sensibilización de los consumidores'],
      ['Defensa', 'Defensa de los Alimentos, Biovigilancia y Bioterrorismo'],
      ['PPR Op', 'Prerequisitos Operativos'],
      ['PCC', 'Puntos Críticos de Control'],
      ['Sistema', 'Sistema de Gestión de la Inocuidad'],
    ];
    
    listOfGrupos.forEach(function(element) {
      // eslint-disable-next-line max-len
      // console.log(element);
      grupos.findOrCreate({where: {nombre: element[0], descripcion: element[1]}}, {nombre: element[0], descripcion: element[1]},
               function(err, grupo) {
                 console.log(`===== OK ${grupo.nombre} =====`);
               }
           );
     });   
};

function defaultItemsEspeciales(app) {
  let grupos = app.models.ItemEspeciales;

  let listOfItemEspeciales = [
    ['Cédula de Mejora', 'Cédula de Mejora'],
    ['Área Liberada', 'Área Liberada'],
    ['Acciones Inmediatas', 'Acciones Inmediatas'],
    ['Acciones Correctoras',	'Acciones Correctoras'],
    ['Acciones Preventivas', 'Acciones Preventivas'],
    ['Compras', 'Gestión de los materiales comprados'],
    ['Contaminación', 'Medidas para la prevención de la contaminación cruzada'],
    ['Lim y Desinf', 'Limpieza y desinfección'],
    ['Plagas', 'Control de Plagas'],
    ['Higiene', 'Higiene del personal e instalaciones para empleados'],
    ['Retrabajo', 'Retrabajo'],
    ['Recall', 'Procedimientos de retiro del producto'],
    ['Almacén', 'Almacén'],
    ['Etiqueta', 'Información del producto y sensibilización de los consumidores'],
    ['Defensa', 'Defensa de los Alimentos, Biovigilancia y Bioterrorismo'],
    ['PPR Op', 'Prerequisitos Operativos'],
    ['PCC', 'Puntos Críticos de Control'],
    ['Sistema', 'Sistema de Gestión de la Inocuidad'],
  ];

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

