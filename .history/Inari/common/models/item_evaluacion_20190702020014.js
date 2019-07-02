module.exports = function (ItemEvaluacion) {
    ItemEvaluacion.eliminarPorCodigoFormulario = function(codigoFormularioEvaluacion, cb) {
        ItemEvaluacion.destroyAll({formularioEvaluacionCodigo: codigoFormularioEvaluacion}, function(err, result) {
            if(err){
               console.log(err);
            }else{
               console.log('Sucess', result); // {count:X} <- how much records deleted
            }
        });
    }

    ItemEvaluacion.remoteMethod(
        'eliminarPorCodigoFormulario', {
            http: { path: '/eliminarPorCodigoFormulario', verb: 'delete' },
            accepts: {arg: 'formularioEvaluacionCodigo', type: 'number', required: true, http: { source: 'query' } },
            returns: { arg: 'data', type: 'number', root: true },
            description: 'Borrar los ItemEvaluacion según e formulario modelo'
        }
    );
}