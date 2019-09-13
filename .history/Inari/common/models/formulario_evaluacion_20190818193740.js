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
                        FormularioEvaluacion.app.models.Area.find({where: {codigo: result.areaCodigo}}, function(err, result){
                            // result.forEach(e => {console.log(e.nombre)});
                            // console.log(result);
                            // cb(err);
                            if (err) {
                                // cb(err);
                            } else {
                                result.forEach(function(e) {
                                    // console.log(e.nombre)
                                    FormularioEvaluacion.app.models.ColaMensajeria.find({}, function(err, result) {
                                        // cosole.log(result);
                                        if (err) {
                                            // cb(err);
                                        } else {
                                            result.forEach(function(element) {
                                                FormularioEvaluacion.app.models.Email.send({
                                                    to: element.email,
                                                    from: 'area.en.rojo@gmail.com',
                                                    subject: `Area ${e.nombre} Bloqueada`,
                                                    text: `Area ${e.nombre} Bloqueada por culpa de incumplimiento grave`,
                                                    html:  `Favor comunicarse con el administrador del área <em>${e.nombre}</em>`
                                                  }, function(err, mail) {
                                                    console.log('email sent!');
                                                    console.log(mail);
                                                    console.log(err);
                                                    // cb(err);
                                                  });
                                            });    
                                        }
                                    });        
                                });    
                            }
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
    FormularioEvaluacion.enviarEmailDeDesbloqueoDeArea = function(formularioBloqueado,cb) {
        FormularioEvaluacion.app.models.ColaMensajeria.find({}, function(err, result) {
            // cosole.log(result);
            if (err) {
                // cb(err);
            } else {
                result.forEach(function(element) {
                    FormularioEvaluacion.app.models.Email.send({
                        to: element.email,
                        from: 'area.en.rojo@gmail.com',
                        subject: `Área ${formularioBloqueado.nombreArea} ha vuelto a ser `,
                        text: `Area ${e.nombre} Bloqueada por culpa de incumplimiento grave`,
                        html:  `Favor comunicarse con el administrador del área <em>${e.nombre}</em>`
                      }, function(err, mail) {
                        console.log('email sent!');
                        console.log(mail);
                        console.log(err);
                        // cb(err);
                      });
                });    
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