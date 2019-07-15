var app = require('../../server/server');

module.exports = function (FormularioEvaluacion) {
    let itemEvaluacionVar = app.models.ItemEvaluacion;
    FormularioEvaluacion.insertarConItemes = function(formularioEvaluacion,items,cb) {
        console.log(formularioEvaluacion)
        FormularioEvaluacion.create(formularioEvaluacion, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sucess', result); // {count:X} <- how much records deleted
                /*items.foreach(r => {

                })
                itemEvaluacion.create(items, function(err, result) {

                });*/
                let formularioCodigo = result.codigo;
                items = items.map(item => {return {...item, formularioEvaluacionCodigo: formularioCodigo}});
                itemEvaluacionVar.create(items, function(err, result) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('Sucess', result);
                    }
                    cb(err, result);
                });
                cb(err, result);
            }
        });
    }

    FormularioEvaluacion.remoteMethod(
        'insertarConItemes', {
            http: { path: '/insertarConItemes', verb: 'post' },
            accepts: [
                { arg: 'formularioEvaluacion', type: 'FormularioEvaluacion', required: true, http: { source: 'body' }},
                { arg: 'items', type: 'array', required: true, http: { source: 'body' }}
            ],
            returns: { arg: 'data', type: 'object'},
            description: 'Insertar itemes con el formulario evaluacion'
        }
    );
}