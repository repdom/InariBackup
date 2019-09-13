module.exports = function (Email) {
    Email.disableRemoteMethodByName('create');     // Removes (POST) /products
    Email.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    Email.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    Email.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    Email.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    Email.disableRemoteMethodByName('createChangeStream');
}