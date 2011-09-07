var util = require('util'),
    Rest = require('rest.node');

function Bitly(login, key) {
  Rest.call(this, 'http://api.bitly.com/v3');
  this.login = login;
  this.key = key;
}

util.inherits(Bitly, Rest);

Bitly.prototype.setRequestOptions = function(options, method, params) {
  options.path += method;
  options.query.login = this.login;
  options.query.apiKey = this.key;
  for (var k in params) {
    options.query[k] = params[k];
  }
};

Bitly.prototype.shorten = function(url, callback) {
  this.get('/shorten', {longUrl: encodeURI(url)}, callback);
};

['clicks', 'referrers', 'countries', 'info'].forEach(function(method) {
  Bitly.prototype[method] = function(short_url, callback) {
    this.get('/' + method, {shortUrl: short_url}, callback);
  };
});

module.exports = Bitly;