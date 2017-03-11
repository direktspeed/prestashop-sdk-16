# prestashop-sdk-16
Prestashop v1.6 Admin API for NodeJS for use in prestashop-sdk

# Example Shopify

```
// You can use Shop.api.add('endpoint',Object)
// prestashop-sdk-16.add('endpoint', Object)
const api = require('prestashop-sdk-16')

// type is simply the ec-name name of the ec module
var Presta = new api({
    connection:'https://apikey:apipass@yourdomain.tld/shopify'
  })

// Presta === CompletApi Model
Presta.get('orders').then(function(response) {
    console.log(response);
}).catch(function(errors) {
    console.log(errors);
});

//Or

Presta.get('orders', {id: 1}).then(function(response) {
    console.log(response);
}).catch(function(errors) {
    console.log(errors);
});

//And you can even use the filter querystrings

Presta.get('orders', {
    'display': 'full',
    'filter[id]': 1
}).then(function(response) {
    console.log(response);
}).catch(function(errors) {
    console.log(errors);
});

//You can add/edit too.

Presta.get('products', {
    id: 1
}).then(function(response) {
    response // product
}).catch(function(errors) {
    console.log(errors);
});

```
