module.exports = function (Area) {
    Area.disableRemoteMethodByName('create');     // Removes (POST) /products
    Area.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    Area.disableRemoteMethodByName('Area.updateAttributes');
    Area.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    Area.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    // Removes (PUT) /products/:id
    Area.disableRemoteMethodByName('createChangeStream');
    Area.disableRemoteMethodByName('replaceById');
}