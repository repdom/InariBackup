'use strict';

module.exports = function(Colaborador) {
    Colaborador.disableRemoteMethodByName('create');     // Removes (POST) /products
    Colaborador.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    Colaborador.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    Colaborador.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    Colaborador.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    Colaborador.disableRemoteMethodByName('createChangeStream');

    Colaborador.disableRemoteMethodByName('prototype.__count__accessTokens');
    Colaborador.disableRemoteMethodByName('prototype.__create__accessTokens');
    Colaborador.disableRemoteMethodByName('prototype.__delete__accessTokens');
    Colaborador.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
    Colaborador.disableRemoteMethodByName('prototype.__findById__accessTokens');
    Colaborador.disableRemoteMethodByName('prototype.__get__accessTokens');
    Colaborador.disableRemoteMethodByName('prototype.__updateById__accessTokens');
};
