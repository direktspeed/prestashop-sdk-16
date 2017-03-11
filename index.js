// external dependencies
var Presta = require(__dirname+'/api');

function init(connection) {
  console.log(connection);
  return new Presta(connection.storeUrl, connection.apiKey, connection.options);
}

module.exports = init;
