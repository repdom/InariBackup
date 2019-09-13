module.exports = function(ItemEspecialesEvaluacion) {
    ItemEspecialesEvaluacion.disableRemoteMethodByName('create');     // Removes (POST) /products
    ItemEspecialesEvaluacion.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    ItemEspecialesEvaluacion.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    ItemEspecialesEvaluacion.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    ItemEspecialesEvaluacion.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    ItemEspecialesEvaluacion.disableRemoteMethodByName('createChangeStream');
}
