'use strict';

module.exports = function(Formularioarea) {
    Formularioarea.disableRemoteMethodByName('create');     // Removes (POST) /products
    Formularioarea.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    Formularioarea.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    Formularioarea.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    Formularioarea.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    Formularioarea.disableRemoteMethodByName('createChangeStream');
};
