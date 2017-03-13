# prestashop-sdk-16
Prestashop v1.6 Admin API for NodeJS for use in prestashop-sdk
http://doc.prestashop.com/display/PS14/Web-service+reference

# Example Presta

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
# Example Presta
```
const nec = require('node-ecommerce-conector')

// type is simply the ec-name name of the ec module
var nec-presta = new nec({
    type: 'presta',
    version: '1.6',
    connection:{
      apiKey: 'kkkkkkkkkkkkk',
      storeUrl: 'https://yourdomain.tld/presta',
      options: {
        debug: true
      }
    }
  })

// nec-presta === CompletApi Model
nec-presta.get('orders').then(function(response) {
    console.log(response);
}).catch(function(errors) {
    console.log(errors);
});

//Or

nec-presta.get('orders', {id: 1}).then(function(response) {
    console.log(response);
}).catch(function(errors) {
    console.log(errors);
});

//And you can even use the filter querystrings

nec-presta.get('orders', {
    'display': 'full',
    'filter[id]': 1
}).then(function(response) {
    console.log(response);
}).catch(function(errors) {
    console.log(errors);
});

//You can add/edit too.

nec-presta.get('products', {
    id: 1
}).then(function(response) {
    response.prestashop.product.price = '1.99';
    return nec-presta.edit('products', response, {
        id: 1
    });
}).catch(function(errors) {
    console.log(errors);
});

```

## Additional inspiration Education

```
'use strict';
let qs =require('qs');
let xml2js =require('xml2js');
let Promise =require('bluebird');
let request =require('request-promise');
let debug = require('debug');
let parseString = Promise.promisify(xml2js.parseString);



let XML = '<prestashop>'+
'<cart>'+
  '<id/>'+
  '<id_address_delivery>3</id_address_delivery>'+
  '<id_address_invoice>3</id_address_invoice>'+
  '<id_currency>1</id_currency>'+
  '<id_customer>2</id_customer>'+
  '<id_guest>0</id_guest>'+
  '<id_lang>2</id_lang>'+
  '<id_carrier>8</id_carrier>'+
  '<recyclable>1</recyclable>'+
  '<gift>0</gift>'+
  '<gift_message/>'+
  '<associations>'+
  ' <cart_rows>'+
    '<cart_row>'+
      '<id_product>10</id_product>'+
      '<id_product_attribute>39</id_product_attribute>'+
      '<quantity>1</quantity>'+
    '</cart_row>'+
  ' </cart_rows>'+
  '</associations>'+
'</cart>'+
'</prestashop>';



let JSON={
  'prestashop': {
    'cart': {
      'id': '',
      'id_address_delivery': '3',
      'id_address_invoice': '3',
      'id_currency': '1',
      'id_customer': '2',
      'id_guest': '0',
      'id_lang': '2',
      'id_carrier': '8',
      'recyclable': '1',
      'gift': '0',
      'gift_message': '',
      'associations': {
        'cart_rows': {
          'cart_row': {
            'id_product': '10',
            'id_product_attribute': '39',
            'quantity': '1'
          }
        }
      }
    }
  }
};


class me {
  static parse(response) {
              //if(this.options.raw) {
                //return response;
              //}
    return parseString(response, {
      explicitArray: false,
      trim: true
    });
  }
  static build(data) {
    let builder = new xml2js.Builder();
    return builder.buildObject(data);
  }
          }
//Shop.api.parse(XML)
//Produces JS
me.parse(XML).then(x=> debug('log')(JSON.stringify(x,null,2)));

//Shop.api.add
//Get cart empty '/api/carts?schema=blank'
// let xml = webService.get('carts', {"schema":"blank"});


let id_customer    = 0;
let id_address     = 0;
let id_cart        = 0;

let webService = Shop.api;
function createOrder(customer,)
/*
 *  1. Create new customer
 */
if (!customer) {
  let customer = webService.get('customers', {'schema':'blank'});
  // Adding dinamic values
  // Required
  customer.passwd              = passwd;
  customer.lastname            = lastname;
  customer.firstname           = firstname;
  customer.email               = email;
  // Others
  customer.id_lang             = id_lang;
  customer.id_shop             = 1;
  customer.id_shop_group       = 1;
  customer.id_default_group    = id_group; // Customers
  customer.active              = 1;
  customer.newsletter          = 1;
  customer.newsletter_date_add = new Date();
  customer.last_passwd_gen     = new Date();
  customer.date_add            = new Date();
  customer.date_upd            = new Date();
  customer.id_gender           = id_gender;
  customer.associations.groups.group[0].id = id_group; // customers

  // Adding the new customer
  customer.id = webService.add('customers', customer ).id; // newCustomer.id
}

if (!id_address) {
   // CREATE Address
  let address = webService.get('addresses', {'schema':'blank'});

  // Adding dinamic and mandatory fields
  // Required
  address.id_customer  = id_customer;
  address.id_country   = id_country;
  address.alias        = firstname+' '+lastname+'\\'+alias;
  address.lastname     = lastname;
  address.firstname    = firstname;
  address.city         = city;
  address.address1     = address1;
  // Others
  address.phone_mobile = phone_mobile;
  address.postcode     = zip;
  address.date_add     = new Date();
  address.date_upd     = new Date();

  address.id = webService.add('addresses',address);

}

 /*
 * 3. Create new cart
 *
 */
if(!id_cart){
  // Getting the empty XML document to send back completed
  let Cart = webService.get('carts', {'schema':'blank'});
  // Adding dinamic and mandatory fields
  // Required
  Cart.id_currency         = id_currency;
  Cart.id_lang             = id_lang;
  Cart.associations.cart_rows.cart_row[0].id_product            = products[0]['id_product'];
  Cart.associations.cart_rows.cart_row[0].id_product_attribute  = products[0]['id_product_attribute'];
  Cart.associations.cart_rows.cart_row[0].id_address_delivery   = id_address;
  Cart.associations.cart_rows.cart_row[0].quantity              = products[0]['quantity'];
  // Others
  Cart.id_address_delivery = id_address;
  Cart.id_address_invoice  = id_address;
  Cart.id_customer         = id_customer;
  Cart.carrier             = id_carrier;
  Cart.date_add            = new Date();
  Cart.date_upd            = new Date();

  // Adding the new customer's cart
  let myCart = webService.add('carts',Cart );

}

/*
 * 4. Create the order
 *
 */
let Order = webService.get('orders', {schema: 'blank'}); // Getting the structure of an order
// Adding dinamic and required fields
// Required
Order.id_address_delivery    = id_address; // Customer address
Order.id_address_invoice     = id_address;
Order.id_cart                = id_cart;
Order.id_currency            = id_currency;
Order.id_lang                = id_lang;
Order.id_customer            = id_customer;
Order.id_carrier             = id_carrier;
Order.module                 = order_module;
Order.payment                = order_payment;
Order.total_paid             = total_paid;
Order.total_paid_real        = total_paid_real;
Order.total_products         = total_products;
Order.total_products_wt      = total_products_wt;
Order.conversion_rate        = 1;
// Others
Order.valid                      = 1;
Order.current_state              = id_status;
Order.total_discounts            = total_discounts;
Order.total_discounts_tax_incl   = total_discounts_tax_incl;
Order.total_discounts_tax_excl   = total_discounts_tax_excl;
Order.total_paid_tax_incl        = total_paid_tax_incl;
Order.total_paid_tax_excl        = total_paid_tax_excl;
Order.total_shipping             = total_shipping;
Order.total_shipping_tax_incl    = total_shipping_tax_incl;
Order.total_shipping_tax_excl    = total_shipping_tax_excl;
// Order Row. Required
Order.associations.order_rows.order_row[0].product_id             = products[0]['id_product'];
Order.associations.order_rows.order_row[0].product_attribute_id   = products[0]['id_product_attribute'];
Order.associations.order_rows.order_row[0].product_quantity       = products[0]['quantity'];
// Order Row. Others
Order.associations.order_rows.order_row[0].product_name           = products[0]['name'];
Order.associations.order_rows.order_row[0].product_reference      = products[0]['reference'];
Order.associations.order_rows.order_row[0].product_price          = products[0]['product_price'];
Order.associations.order_rows.order_row[0].unit_price_tax_incl    = products[0]['product_price'];
Order.associations.order_rows.order_row[0].unit_price_tax_excl    = products[0]['product_price'];

// Creating the order
let myOrder = webService.add('orders' ,Order )
Order.id = myOrder.id;
Order.secure_key = myOrder.secure_key
debug('LOG:')('Customer: '+myCustomer.id+' address: '+myAddress.id+' cart: '+myCart.id+' Order: '+myOrder.id);

let history = webService.get('order_histories',{schema:'blank'});

history.id_order = Order.id;
history.id_order_state = '3'; // myOrder.current_state

history.id = webService.add('order_histories',history).id;



```
