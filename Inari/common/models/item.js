module.exports = function (Item) {
    Item.disableRemoteMethodByName('create');     // Removes (POST) /products
    Item.disableRemoteMethodByName('upsert');     // Removes (PUT) /products
    Item.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /products/:id
    Item.disableRemoteMethodByName('updateAll');  // Removes (POST) /products/update
    Item.disableRemoteMethodByName('prototype.updateAttributes');
    // Removes (PUT) /products/:id
    Item.disableRemoteMethodByName('createChangeStream');
}