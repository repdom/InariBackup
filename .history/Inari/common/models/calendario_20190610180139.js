module.exports = function (Calendario) {
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
            `select * from calendario where calendario.fin_calendario >= CURDATE() and calendario.inicio_calendario <= CURDATE();`,
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