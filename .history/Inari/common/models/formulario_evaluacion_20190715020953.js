// var app = require('../../server/server');
// var itemEvaluacionVar = app.models.ItemEvaluacion;
let itemEvaluacionVar = app.dataSources.ItemEvaluacion;
module.exports = function (FormularioEvaluacion) {
    var itemEvaluacionVar = FormularioEvaluacionapp.models.ItemEvaluacion;
    FormularioEvaluacion.insertarConItemes = function(formularioEvaluacion,cb) {
        FormularioEvaluacion.create(formularioEvaluacion.formulario, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sucess', result); // {count:X} <- how much records deleted
                /*items.foreach(r => {

                })
                itemEvaluacion.create(items, function(err, result) {

                });*/
                let formularioCodigo = result.codigo;
                formularioEvaluacion.items = formularioEvaluacion.items.map(item => {return {...item, formularioEvaluacionCodigo: formularioCodigo}});
                itemEvaluacionVar.create(formularioEvaluacion.items, function(err, result) {
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
            accepts:{ arg: 'formularioEvaluacion', type: 'object', required: true, http: { source: 'body' }},
            returns: { arg: 'data', type: 'object', root: true },
            description: 'Insertar itemes con el formulario evaluacion'
        }
    );
}