'use strict';

module.exports = function(Grupos) {
    Grupos.disableRemoteMethodByName('create');     // Removes (POST) /products
    Grupos.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    Grupos.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    Grupos.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    Grupos.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    Grupos.disableRemoteMethodByName('createChangeStream');

    Grupos.disableRemoteMethodByName('prototype.__create__items');
    Grupos.disableRemoteMethodByName('prototype.__delete__items');
    Grupos.disableRemoteMethodByName('prototype.__destroyById__items');
    Grupos.disableRemoteMethodByName('prototype.__updateById__items');
};
