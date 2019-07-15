var app = require('../../server/server');

module.exports = function (FormularioEvaluacion) {
    let itemEvaluacionVar = app.models.ItemEvaluacion;
    FormularioEvaluacion.insertarConItemes = function(formularioEvaluacion, items,cb) {
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
                });
                cb(err, result);
            }
        });
    }

    ItemEvaluacion.remoteMethod(
        'insertarConItemes', {
            http: { path: '/insertarConItemes', verb: 'post' },
            accepts: [
                { arg: 'formularioEvaluacion', type: 'FormularioEvaluacion', required: true },
                { arg: 'items', type: 'array', required: true }
            ],
            returns: { arg: 'data', type: 'number', root: true },
            description: 'Insertar itemes con el formulario evaluacion'
        }
    );
}