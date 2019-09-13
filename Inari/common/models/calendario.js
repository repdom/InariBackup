module.exports = function (Calendario) {
    Calendario.disableRemoteMethodByName('create');     // Removes (POST) /products
    Calendario.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    Calendario.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    Calendario.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    Calendario.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    Calendario.disableRemoteMethodByName('createChangeStream');
    Calendario.disableRemoteMethodByName('prototype.__create__formularioEvaluacion');
    Calendario.disableRemoteMethodByName('prototype.__delete__formularioEvaluacion');
    Calendario.disableRemoteMethodByName('prototype.__destroyById__formularioEvaluacion');
    Calendario.disableRemoteMethodByName('prototype.__updateById__formularioEvaluacion');
    Calendario.disableRemoteMethodByName('prototype.__update__formularioEvaluacion', false);
    Calendario.disableRemoteMethodByName('prototype.__destroy__formularioEvaluacion', false);

    Calendario.cantidadProgramacionesActivas = function(cb) {
        Calendario.dataSource.connector.query(`SELECT 
                                                            COUNT(f.codigo) as Cantidad FROM calendario AS f 
                                                            WHERE DATE(f.inicio_calendario) <= CURRENT_DATE AND DATE(f.fin_calendario) >= CURRENT_DATE;`,
        function(err, resp) {
            cb(err, resp);
        })
    }
    Calendario.programacionActiva = function(cb) {
        Calendario.dataSource.connector.query(
            `select * from calendario where DATE(calendario.fin_calendario) >= CURDATE() and DATE(calendario.inicio_calendario) <= CURDATE();`,
        function(err, resp) {
                cb(err, resp);
        })
    }
    Calendario.remoteMethod(
        'cantidadProgramacionesActivas', {
            http: { path: '/cantidadProgramacionesActivas', verb: 'get' },
            returns: { arg: 'data', type: 'number', root: true },
            description: 'Obtener cantidad de programaciones activas'
        }
    );
    Calendario.remoteMethod(
        'programacionActiva', {
            http: { path: '/programacionActiva', verb: 'get' },
            returns: { arg: 'data', type: 'array', root: true },
            description: 'Obtener los calendarios por fecha'
        }
    );
}