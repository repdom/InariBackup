module.exports = function (FormularioModelo) {
    FormularioModelo.disableRemoteMethodByName('create');     // Removes (POST) /products
    FormularioModelo.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    FormularioModelo.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    FormularioModelo.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    FormularioModelo.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    FormularioModelo.disableRemoteMethodByName('createChangeStream');
}