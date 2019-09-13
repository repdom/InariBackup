module.exports = function (Historial) {
    Historial.disableRemoteMethodByName('create');     // Removes (POST) /products
    Historial.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    Historial.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    Historial.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    Historial.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    Historial.disableRemoteMethodByName('createChangeStream');
}