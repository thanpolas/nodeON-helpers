# nodeON-helpers

> A Collection of helper methods.

[![Build Status](https://secure.travis-ci.org/thanpolas/nodeOn-helpers.png?branch=master)](http://travis-ci.org/thanpolas/nodeOn-helpers)

## Install

Install the module using NPM:

```
npm install nodeon-helpers --save
```

## <a name='TOC'>Table of Contents</a>

1. [API](#api)
    1. [Set a salt string](#setSalt)
    1. [Generate a random string](#generateRandomString)
    1. [Generate a random number](#generateRandomNumber)
    1. [Hash a string using bcrypt](#hash)
    1. [Verify a hashed string match](#hashVerify)
    1. [Get a url safe string](#urlify)
    1. [Truncate arguments from a function](#truncateArgs)
    1. [Will copy an array over an existing one](#pushCopy)
    1. [Get the current user HOME dir](#getUserHome)

## API

### <a name='setSalt'>Set a salt string</a>

> ### helpers.setSalt(salt)
>
>    * **salt** `string` Any string.

Use it once to set a salt for the crypto functions.

**[[⬆]](#TOC)**

### <a name='generateRandomString'>Generate a random string</a>

> ### helpers.generateRandomString(optLength)
>
>    * **optLength** `number=` Define length, default 32.
>
> *Returns* `string` The random string.

Returns a randomized string.

**[[⬆]](#TOC)**


### <a name='generateRandomNumber'>Generate a random number</a>

> ### helpers.generateRandomNumber(optLength)
>
>    * **optLength** `number=` Define length, default 20.
>
> *Returns* `string` The random string of numbers.

Returns a randomized string only with numbers.

**[[⬆]](#TOC)**


### <a name='hash'>Hash a string using bcrypt</a>

> ### helpers.hash(text, done)
>
>    * **text** `string` The string to hash.
>    * **done** `Function()` Node.js style callback.
>

Hashes a string using the [bcrypt library](https://github.com/ncb000gt/node.bcrypt.js/).

**[[⬆]](#TOC)**


### <a name='hashVerify'>Verify a hashed string match</a>

> ### helpers.hashVerify(hash, text, done)
>
>    * **hash** `string` The hashed string.
>    * **text** `string` The string to test.
>    * **done** `Function(boolean)` Callback with a single argument, boolean.
>

Tests if the given string matches the provided hash.

**[[⬆]](#TOC)**


### <a name='urlify'>Get a url safe string</a>

> ### helpers.urlify(text, optRandLen)
>
>    * **text** `string` The string to urlify.
>    * **optRandLen** `number` How many numbers to use for randomizing the url, default 6.

Get a url safe string.

```js
var helpers = require('nodeon-helpers');

var urlString = helpers.urlify('a name with spaces');

console.log(urlString);
// prints: "458202-a-name-with-spaces"
```

**[[⬆]](#TOC)**

### <a name='truncateArgs'>Truncate arguments from a function</a>

> ### helpers.truncateArgs(fn, count, optSelf)
>
>    * **fn** `Function` The function to truncate arguments.
>    * **count** `number` How many arguments to allow before truncating.
>    * **optSelf** `Object=` Optionally apply context.
>
> *Return* `Function` The function to invoke.

Will truncate arguments from a function.

```js
var helpers = require('nodeon-helpers');

function run(one, two, three) {
    console.log(one); // prints 1
    console.log(two); // prints "undefined"
    console.log(three); // prints "undefined"
}

var fn = helpers.truncateArgs(run, 1);

fn(1, 2, 3);
```

**[[⬆]](#TOC)**

### <a name='pushCopy'>Will copy an array over an existing one</a>

> ### helpers.pushCopy(src, dst)
>
>    * **src** `Array` The source array.
>    * **dst** `Array` The destination array.
>

Will copy an array over an existing one.

```js
var helpers = require('nodeon-helpers');

var src = [4,5,6];
var dst = [1,2,3];

helpers.pushCopy(src, dst);

console.log(dst);
// prints: [1, 2, 3, 4, 5, 6]
```

**[[⬆]](#TOC)**

### <a name='getUserHome'>Get the current user HOME dir.</a>

> ### helpers.getUserHome()
>
> *Return* `string` The full path to the user's HOME.

Get the user's HOME directory.

**[[⬆]](#TOC)**


## Release History

- **v0.0.1**, *14 Aug 2014*
    - Big Bang

## License

Copyright (c) 2014 Thanasis Polychronakis. Licensed under the MIT license.
