/*
 * nodeON-helpers
 * A collection of helper funcs
 * https://github.com/thanpolas/nodeON-helpers
 *
 * Copyright ©2015 Thanasis Polychronakis
 * Licensed under the MIT license.
 */

/**
 * @fileoverview Helpers.
 */

var __ = require('lodash');
var slug = require('slug');

var helpers = module.exports = {};

/**
 * Adds a {@code getInstance} static method that always return the same instance
 * object.
 * @param {!Function} Ctor The constructor for the class to add the static
 *     method to.
 */
helpers.addSingletonGetter = function(Ctor) {
  Ctor.getInstance = function() {
    if (Ctor._instance) {
      return Ctor._instance;
    }
    return Ctor._instance = new Ctor();
  };
};

/**
 * Generate a random string.
 *
 * @param  {number=} optLength How long the string should be, default 32.
 * @return {string} a random string.
 */
helpers.generateRandomString = function(optLength) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

  var length = optLength || 32;
  var string = '';
  var randomNumber = 0;
  for (var i = 0; i < length; i++) {
    randomNumber = Math.floor(Math.random() * chars.length);
    string += chars.substring(randomNumber, randomNumber + 1);
  }

  return string;
};

/**
 * Generate a random number, returns type string!.
 *
 * @param  {number=} optLength How long, default 20.
 * @return {string} A random number cast to string.
 */
helpers.generateRandomNumber = function(optLength) {
  var nums = '0123456789';
  var numLen = nums.length;
  var length = optLength || 20;

  var string = '';
  var randomNumber = 0;
  for (var i = 0; i < length; i++) {
    randomNumber = Math.floor(Math.random() * numLen);
    string += nums.substring(randomNumber, randomNumber + 1);
  }

  return string;
};


/**
 * Returns a unique-ish url-friendly string,
 * uses a 6 random number to raise entropy.
 *
 * @param  {string} token The token you need to be urlified.
 * @param {number=} optRandLen Define how many random numbers, default 6,
 *  disable 0.
 * @return {string} urlefied string.
 */
helpers.urlify = function(token, optRandLen) {
  var randLen = 6;
  if (__.isNumber(optRandLen)) {
    randLen = optRandLen;
  }
  var out = '';
  if (randLen) {
    out += helpers.generateRandomNumber(randLen);
    out += '-';
  }
  out += slug(token).toLowerCase();
  return out;
};

/**
 * Truncates the argument number the function is invoked with.
 *
 * @param {Function} fn The function which arguments needs truncating.
 * @param {number} count
 * @return {Function} The function to use.
 * @cudos Petka Antonov
 */
helpers.truncateArgs = function (fn, count, optThisArg) {
  var thisArg = optThisArg || null;
  return function() {
    return fn.apply(thisArg, [].slice.call(arguments,0, count));
  };
};

/**
 * Skips the first n arguments of a function to be invoked.
 *
 * @param {Function} fn The function which arguments needs truncating.
 * @param {number} skip How many arguments to truncate from.
 * @return {Function=} optThisArg Context.
 * @return {Function} The function to use.
 */
helpers.skipArgs = function(fn, skip, optThisArg) {
  var thisArg = optThisArg || null;
  return function() {
    return fn.apply(thisArg, [].slice.call(arguments, skip));
  };
};

/**
 * Copy an array to another using push().
 *
 * @param {Array} src The src Array.
 * @param {Array} dst The dst Array.
 */
helpers.pushCopy = function(src, dst) {
  src.forEach(function(item) {
    dst.push(item);
  });
};

/**
 * Get the user's home directory.
 *
 * @return {string} The full path to the user's home directory.
 */
helpers.getUserHome = function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
};

/**
 * Determines if a value is a number type.
 *
 * @param {string} num The value to check
 * @return {boolean} Yes or no.
 * @see http://stackoverflow.com/questions/6449611/how-to-check-whether-a-value-is-a-number-in-javascript-or-jquery
 */
helpers.isNumeric = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

/**
 * Determines if the request made accepts a JSON response.
 *
 * @param {Object} req The express request Object.
 * @return {boolean} True / false.
 */
helpers.isRequestJson = function(req) {
  if (req && req.headers && req.headers.accept) {
    return !!req.headers.accept.match(/json/);
  } else {
    return false;
  }
};

/**
 * Zero Padding for a number, 2 --> '002'.
 *
 * @param {number} number The number to apply zero padding on.
 * @param {number} width The length of the padding.
 * @return {string} The zero padded number.
 * @see http://stackoverflow.com/questions/1267283/how-can-i-create-a-zerofilled-value-using-javascript
 */
helpers.zeroPadding = function ( number, width ) {
  width -= number.toString().length;
  if ( width > 0 ) {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ''; // always return a string
};
