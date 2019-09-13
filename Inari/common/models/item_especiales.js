'use strict';

module.exports = function(ItemEspeciales) {
    ItemEspeciales.disableRemoteMethodByName('create');     // Removes (POST) /products
    ItemEspeciales.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    ItemEspeciales.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    ItemEspeciales.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    ItemEspeciales.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    ItemEspeciales.disableRemoteMethodByName('createChangeStream');
};
