module.exports = function (ColaMensajeria) {
    ColaMensajeria.disableRemoteMethodByName('create');     // Removes (POST) /products
    ColaMensajeria.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    ColaMensajeria.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    ColaMensajeria.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    ColaMensajeria.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    ColaMensajeria.disableRemoteMethodByName('createChangeStream');
}