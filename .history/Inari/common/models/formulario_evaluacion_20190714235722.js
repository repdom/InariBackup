module.exports = function(FormularioEvaluacion) {
    FormularioEvaluacion.insertarConItemes = function(codigoFormularioEvaluacion, cb) {
        ItemEvaluacion.destroyAll({formularioEvaluacionCodigo: codigoFormularioEvaluacion}, function(err, result) {
            if(err){
               console.log(err);
            }else{
               console.log('Sucess', result); // {count:X} <- how much records deleted
            }
            cb(err, result);
        });
    }

    ItemEvaluacion.remoteMethod(
        'insertarConItemes', {
            http: { path: '/insertarConItemes', verb: 'post' },
            accepts: {arg: 'formularioEvaluacion', type: 'object', required: true},
            returns: { arg: 'data', type: 'number', root: true },
            description: 'Borrar los ItemEvaluacion según e formulario modelo'
        }
    );
}