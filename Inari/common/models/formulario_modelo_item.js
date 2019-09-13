module.exports = function (FormularioModeloItem) {
    FormularioModeloItem.disableRemoteMethodByName('create');     // Removes (POST) /products
    FormularioModeloItem.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    FormularioModeloItem.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    FormularioModeloItem.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    FormularioModeloItem.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    FormularioModeloItem.disableRemoteMethodByName('createChangeStream');
}