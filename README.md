# zouti

![NPM version](http://img.shields.io/npm/v/zouti.svg) ![Dependency Status](https://david-dm.org/krkn/zouti.svg) ![Downloads counter](http://img.shields.io/npm/dm/zouti.svg)

Useful tools & functions we use on every krkn projects.

## Getting Started
Install the module with: `npm install zouti`

```javascript
var zouti = require( "zouti" );
```

## Documentation

### zouti.log( message, context, type )

Print a formated console log like below, with date, context between brackets, then message.

    5 Mar 22:58:06 - [node] foo

The `type` parameter is a `String` which can be :

* `"ERROR"`, `"ERR"`, `"RED"` : print the message in red
* `"WARNING"`, `"WARN"`, `"YELLOW"` : print the message in yellow
* `"SUCCESS"`, `"GREEN"` : print the message in green
* `"MAGENTA"` : print the message in magenta
* every other values prints the message in cyan

### zouti.warning( message, context ), zouti.warn( message, context )

Alias for zouti.log( message, context, "WARNING" )

### zouti.error( message, context ), zouti.notOk( message, context )

Alias for zouti.log( message, context, "ERROR" )

### zouti.success( message, context ), zouti.ok( message, context )

Alias for zouti.log( message, context, "SUCCESS" )

### zouti.clearConsole()

Clear the console by sending the string `\u001B[2J\u001B[0;0f` to it.

### zouti.bench( name, log )

Called the first time, start a benchmark.  
When it's called the second time with the same `name`, stop the benchmark and print elapsed time (if the `log` argument is set to true - which is by default), in milliseconds.  
The second call returns an object with literal and numerical values (in milliseconds).

### zouti.uuid()

Generate an [UUID](https://gist.github.com/bmc/1893440) compliant to RFC 4122.

### zouti.sleep( duration )

Make the program *sleep* for `duration` seconds.
**Note:** this function must be used with care, eats a lot of CPU's power.

### zouti.md5( string ), zouti.sha1( string ), zouti.sha256( string ), zouti.sha512( string ), zouti.whirlpool( string )

Returns the *hashed* version of the given string, using the specified algorythm.  
These functions use the native `crypto` module of node.js.

### zouti.kindOf( value )

Returns the type of the given value, returning `number`, `string`, `boolean`, `function`, `regexp`, `array`, `date`, `error`, `null`, `undefined` or `object`.  
Based on `grunt.util.kindOf`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Lint your code using [Grunt](http://gruntjs.com/).

## Release History

* **0.0.1**: initial release (05/03/2014)
* **0.1.0**: refactor `bench` method (08/06/2014)
* **0.2.0**: add `clearConsole` method (03/10/2014)

## License
Copyright (c) 2014 krkn  
Licensed under the WTFPL license.
