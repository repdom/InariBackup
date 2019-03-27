module.exports = function (Calendario) {
    Calendario.cantidadProgramacionesActivas = function(cb) {
        Calendario.dataSource.connector.query(`SELECT 
                                                            COUNT(f.codigo) as Cantidad FROM calendario AS f 
                                                            WHERE DATE(f.inicio_calendario) <= CURRENT_DATE AND DATE(f.fin_calendario) >= CURRENT_DATE;`,
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
}