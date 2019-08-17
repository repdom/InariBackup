// var app = require('../../server/server');
// var itemEvaluacionVar = app.models.ItemEvaluacion;
// let itemEvaluacionVar = app.dataSources.ItemEvaluacion;
module.exports = function (FormularioEvaluacion) {
    // var itemEvaluacionVar = FormularioEvaluacion.app.models.ItemEvaluacion;
    FormularioEvaluacion.insertarConItemes = function(formularioEvaluacion,cb) {
        formularioEvaluacion.formularios.forEach(function(element) {
            FormularioEvaluacion.upsert(element.formulario, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Sucess', result); // {count:X} <- how much records deleted
                    // console.log(FormularioEvaluacion.app.models.ItemEvaluacion);
                    /*items.foreach(r => {
    
                    })
                    itemEvaluacion.create(items, function(err, result) {
    
                    });*/
                    if (result.bloqueado === true) {
                        app.models.Area.find({where: {codigo: result.areaCodigo}}, function(err, result){
                            // result.forEach(e => {console.log(e.nombre)});
                            // console.log(result);
                            // cb(err);
                            result.forEach(e => {
                                // console.log(e.nombre)
                                FormularioEvaluacion.app.models.ColaMensajeria.find({}, function(err, result) {
                                    // cosole.log(result);
                                    result.forEach(function(element) {
                                        FormularioEvaluacion.app.models.Email.send({
                                            to: element.email,
                                            from: 'juan.thomas.angel@gmail.com',
                                            subject: `Area ${e.nombre} Bloqueada`,
                                            text: 'Area Bloqueada por culpa de incumplimiento grave',
                                            html: 'Favor comunicarse con <em>html</em>'
                                          }, function(err, mail) {
                                            console.log('email sent!');
                                            cb(err);
                                          });
                                    });
                                });        
                            });
                         });                    
                    }

                    var formularioCompleto = {};
                    formularioCompleto.formulario = result;
                    let formularioCodigo = result.codigo;
                    element.items = element.items.map(item => {return {...item, formularioEvaluacionCodigo: formularioCodigo}});
                    FormularioEvaluacion.app.models.ItemEvaluacion.create(element.items, function(err, result) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log('Sucess', result);
                            formularioCompleto.items = result
                        }
                        cb(err, formularioCompleto);
                    });
                    // cb(err, result);
                }
            });    
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