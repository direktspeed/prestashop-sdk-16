// external dependencies
var Presta = require(__dirname+'/api');

function init(connection) {
  require('debug')('prestashop-sdk-16::connection')(connection);
  return new Presta(connection.storeUrl, connection.apiKey, connection.options);
}

module.exports = init;
