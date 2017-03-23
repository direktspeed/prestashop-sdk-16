const qs = 'qs';
const xml2js = 'xml2js';
const Promise = 'bluebird';
const request = 'request-promise';

let parseString = Promise.promisify(xml2js.parseString);

class Api {
  constructor(shopUrl, key, options = {}) {
    if (!shopUrl) {
      throw new Error('Shop URL required');
    }
    if (!key) {
      throw new Error('API key required');
    }
    this.shopUrl = shopUrl;
    this.key = key;
    this.options = options;
  }
  executeRequest(method, url, options = {}) {
    this.debug(`Requesting[${method}] ${url} with options ${JSON.stringify(options)}`);
    return request[method](url, options).auth(this.key).catch(error => {
      this.debug(`Error: [${error}]`);
      return this.parse(error.error).then(parsedError => {
        let error = parsedError.prestashop.errors.error;
        let errorToThrow = Array.isArray(error) ? new Error(error.map(e => e.message).join('\n')) : new Error(error.message);
        if(error.code) {
          errorToThrow.code = error.code;
        }
        throw errorToThrow;
      });
    });
  }
  parse(response) {
    if(this.options.raw) {
      return response;
    }
    return parseString(response, {
      explicitArray: false,
      trim: true
    });
  }
  build(data) {
    let builder = new xml2js.Builder();
    return builder.buildObject(data);
  }
  fromXML(xml) {
        /*
        <prestashop>
        <cart>
          <id/>
          <id_address_delivery>3</id_address_delivery>
          <id_address_invoice>3</id_address_invoice>
          <id_currency>1</id_currency>
          <id_customer>2</id_customer>
          <id_guest>0</id_guest>
          <id_lang>2</id_lang>
          <id_carrier>8</id_carrier>
          <recyclable>1</recyclable>
          <gift>0</gift>
          <gift_message/>
          <associations>
           <cart_rows>
            <cart_row>
        	 <id_product>10</id_product>
        	 <id_product_attribute>39</id_product_attribute>
        	 <quantity>1</quantity>
            </cart_row>
           </cart_rows>
          </associations>
        </cart>
        </prestashop>
        $opt = array( 'resource' => 'carts' );
        $xml = add( xml );
         */

  }
  add(resource, data = {}, options = {}) {
    let url = this.resource(resource),
      requestData = '';
    if(!data || typeof data !== 'object') {
      throw new Error('No data specified to send, should be an object');
    }
    requestData = this.build(data);
    let query = this.stringify(options);
    if(query.length) {
      url += `?${query}`;
    }
    return this.executeRequest('post', url, {form: requestData}).then(response => this.parse(response));
  }
  get(resource, options = {}) {
    let url = this.resource(resource);
    if(options.id) {
      url += options.id;
      delete options.id;
    }
    let query = this.stringify(options);
    if(query.length) {
      url += `?${query}`;
    }
    return this.executeRequest('get', url).then(response => this.parse(response));
  }
  edit(resource, data = {}, options = {}) {
    let url = this.resource(resource),
      requestData = '';
    if(!data || typeof data !== 'object') {
      throw new Error('No data specified to send, should be an object');
    }
    if(!options.id) {
      throw new Error('Id not specified');
    }
    url += options.id;
    delete options.id;
    requestData = this.build(data);
    let query = this.stringify(options);
    if(query.length) {
      url += `?${query}`;
    }
    return this.executeRequest('put', url, {form: requestData}).then(response => this.parse(response));
  }
  delete(resource, options = {}) {
    let url = this.resource(resource);
    if(!options.id) {
      throw new Error('Id not specified');
    }
    if(Array.isArray(options.id)) {
      url += `[${options.id.split(',')}]`;
    } else {
      url += options.id;
    }
    delete options.id;
    let query = this.stringify(options);
    if(query.length) {
      url += `?${query}`;
    }
    return this.executeRequest('delete', url).then(response => this.parse(response));
  }
  head(resource, options = {}) {
    let url = this.resource(resource);
    if(options.id) {
      url += options.id;
      delete options.id;
    }
    let query = this.stringify(options);
    if(query.length) {
      url += `?${query}`;
    }
    return this.executeRequest('head', url).then(response => this.parse(response));
  }
  resource(resource = '') {
    return /^https?/.test(resource) ? resource : `${this.shopUrl}/api/${resource}/`;
  }
  debug(message) {
    if(this.options.debug) {
      console.log(message);
    }
  }
  stringify(obj) {
    return qs.stringify(obj);
  }
}

module.exports=Api;
