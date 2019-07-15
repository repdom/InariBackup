var app = require('../../server/server');

module.exports = function (FormularioEvaluacion) {
    var itemEvaluacion = app.models.ItemEvaluacion;
    FormularioEvaluacion.insertarConItemes = function(formularioEvaluacion, items,cb) {
        FormularioEvaluacion.create(formularioEvaluacion, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sucess', result); // {count:X} <- how much records deleted
                
            }
            cb(err, result);
        });
        itemEvaluacion.create()
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