module.exports = function (ItemEvaluacion) {
    ItemEvaluacion.disableRemoteMethodByName('create');     // Removes (POST) /products
    ItemEvaluacion.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    ItemEvaluacion.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    ItemEvaluacion.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    ItemEvaluacion.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    ItemEvaluacion.disableRemoteMethodByName('createChangeStream');
    ItemEvaluacion.disableRemoteMethodByName('eliminarPorCodigoFormulario');
    
    ItemEvaluacion.eliminarPorCodigoFormulario = function(codigoFormularioEvaluacion, cb) {
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
        'eliminarPorCodigoFormulario', {
            http: { path: '/eliminarPorCodigoFormulario', verb: 'delete' },
            accepts: {arg: 'formularioEvaluacionCodigo', type: 'number', required: true, http: { source: 'query' } },
            returns: { arg: 'data', type: 'number', root: true },
            description: 'Borrar los ItemEvaluacion según e formulario modelo'
        }
    );
}