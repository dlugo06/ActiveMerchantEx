/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (typeof element.data('ujs:enable-with') !== 'undefined') element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
(function() {
  if (typeof gon !== 'undefined') {
    braintree.setup(gon.client_token, "dropin", {
      container: "dropin"
    });
  }

}).call(this);
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./lib/extend');


},{"./lib/extend":2}],2:[function(require,module,exports){
/*!
 * node.extend
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * @fileoverview
 * Port of jQuery.extend that actually works on node.js
 */
var is = require('is');

function extend() {
  var target = arguments[0] || {};
  var i = 1;
  var length = arguments.length;
  var deep = false;
  var options, name, src, copy, copy_is_array, clone;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && !is.fn(target)) {
    target = {};
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    options = arguments[i]
    if (options != null) {
      if (typeof options === 'string') {
          options = options.split('');
      }
      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (is.hash(copy) || (copy_is_array = is.array(copy)))) {
          if (copy_is_array) {
            copy_is_array = false;
            clone = src && is.array(src) ? src : [];
          } else {
            clone = src && is.hash(src) ? src : {};
          }

          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy);

        // Don't bring in undefined values
        } else if (typeof copy !== 'undefined') {
          target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

/**
 * @public
 */
extend.version = '1.1.3';

/**
 * Exports module.
 */
module.exports = extend;


},{"is":3}],3:[function(require,module,exports){
/* globals window, HTMLElement */
/**!
 * is
 * the definitive JavaScript type testing library
 *
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */

var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;
var symbolValueOf;
if (typeof Symbol === 'function') {
  symbolValueOf = Symbol.prototype.valueOf;
}
var isActualNaN = function (value) {
  return value !== value;
};
var NON_HOST_TYPES = {
  'boolean': 1,
  number: 1,
  string: 1,
  undefined: 1
};

var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
var hexRegex = /^[A-Fa-f0-9]+$/;

/**
 * Expose `is`
 */

var is = module.exports = {};

/**
 * Test general.
 */

/**
 * is.type
 * Test if `value` is a type of `type`.
 *
 * @param {Mixed} value value to test
 * @param {String} type type
 * @return {Boolean} true if `value` is a type of `type`, false otherwise
 * @api public
 */

is.a = is.type = function (value, type) {
  return typeof value === type;
};

/**
 * is.defined
 * Test if `value` is defined.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is defined, false otherwise
 * @api public
 */

is.defined = function (value) {
  return typeof value !== 'undefined';
};

/**
 * is.empty
 * Test if `value` is empty.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is empty, false otherwise
 * @api public
 */

is.empty = function (value) {
  var type = toStr.call(value);
  var key;

  if (type === '[object Array]' || type === '[object Arguments]' || type === '[object String]') {
    return value.length === 0;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (owns.call(value, key)) { return false; }
    }
    return true;
  }

  return !value;
};

/**
 * is.equal
 * Test if `value` is equal to `other`.
 *
 * @param {Mixed} value value to test
 * @param {Mixed} other value to compare with
 * @return {Boolean} true if `value` is equal to `other`, false otherwise
 */

is.equal = function equal(value, other) {
  if (value === other) {
    return true;
  }

  var type = toStr.call(value);
  var key;

  if (type !== toStr.call(other)) {
    return false;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (!is.equal(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }
    for (key in other) {
      if (!is.equal(value[key], other[key]) || !(key in value)) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Array]') {
    key = value.length;
    if (key !== other.length) {
      return false;
    }
    while (--key) {
      if (!is.equal(value[key], other[key])) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Function]') {
    return value.prototype === other.prototype;
  }

  if (type === '[object Date]') {
    return value.getTime() === other.getTime();
  }

  return false;
};

/**
 * is.hosted
 * Test if `value` is hosted by `host`.
 *
 * @param {Mixed} value to test
 * @param {Mixed} host host to test with
 * @return {Boolean} true if `value` is hosted by `host`, false otherwise
 * @api public
 */

is.hosted = function (value, host) {
  var type = typeof host[value];
  return type === 'object' ? !!host[value] : !NON_HOST_TYPES[type];
};

/**
 * is.instance
 * Test if `value` is an instance of `constructor`.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an instance of `constructor`
 * @api public
 */

is.instance = is['instanceof'] = function (value, constructor) {
  return value instanceof constructor;
};

/**
 * is.nil / is.null
 * Test if `value` is null.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is null, false otherwise
 * @api public
 */

is.nil = is['null'] = function (value) {
  return value === null;
};

/**
 * is.undef / is.undefined
 * Test if `value` is undefined.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is undefined, false otherwise
 * @api public
 */

is.undef = is.undefined = function (value) {
  return typeof value === 'undefined';
};

/**
 * Test arguments.
 */

/**
 * is.args
 * Test if `value` is an arguments object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.args = is.arguments = function (value) {
  var isStandardArguments = toStr.call(value) === '[object Arguments]';
  var isOldArguments = !is.array(value) && is.arraylike(value) && is.object(value) && is.fn(value.callee);
  return isStandardArguments || isOldArguments;
};

/**
 * Test array.
 */

/**
 * is.array
 * Test if 'value' is an array.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an array, false otherwise
 * @api public
 */

is.array = Array.isArray || function (value) {
  return toStr.call(value) === '[object Array]';
};

/**
 * is.arguments.empty
 * Test if `value` is an empty arguments object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an empty arguments object, false otherwise
 * @api public
 */
is.args.empty = function (value) {
  return is.args(value) && value.length === 0;
};

/**
 * is.array.empty
 * Test if `value` is an empty array.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an empty array, false otherwise
 * @api public
 */
is.array.empty = function (value) {
  return is.array(value) && value.length === 0;
};

/**
 * is.arraylike
 * Test if `value` is an arraylike object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.arraylike = function (value) {
  return !!value && !is.bool(value)
    && owns.call(value, 'length')
    && isFinite(value.length)
    && is.number(value.length)
    && value.length >= 0;
};

/**
 * Test boolean.
 */

/**
 * is.bool
 * Test if `value` is a boolean.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 * @api public
 */

is.bool = is['boolean'] = function (value) {
  return toStr.call(value) === '[object Boolean]';
};

/**
 * is.false
 * Test if `value` is false.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is false, false otherwise
 * @api public
 */

is['false'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === false;
};

/**
 * is.true
 * Test if `value` is true.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is true, false otherwise
 * @api public
 */

is['true'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === true;
};

/**
 * Test date.
 */

/**
 * is.date
 * Test if `value` is a date.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a date, false otherwise
 * @api public
 */

is.date = function (value) {
  return toStr.call(value) === '[object Date]';
};

/**
 * Test element.
 */

/**
 * is.element
 * Test if `value` is an html element.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an HTML Element, false otherwise
 * @api public
 */

is.element = function (value) {
  return value !== undefined
    && typeof HTMLElement !== 'undefined'
    && value instanceof HTMLElement
    && value.nodeType === 1;
};

/**
 * Test error.
 */

/**
 * is.error
 * Test if `value` is an error object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an error object, false otherwise
 * @api public
 */

is.error = function (value) {
  return toStr.call(value) === '[object Error]';
};

/**
 * Test function.
 */

/**
 * is.fn / is.function (deprecated)
 * Test if `value` is a function.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 * @api public
 */

is.fn = is['function'] = function (value) {
  var isAlert = typeof window !== 'undefined' && value === window.alert;
  return isAlert || toStr.call(value) === '[object Function]';
};

/**
 * Test number.
 */

/**
 * is.number
 * Test if `value` is a number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a number, false otherwise
 * @api public
 */

is.number = function (value) {
  return toStr.call(value) === '[object Number]';
};

/**
 * is.infinite
 * Test if `value` is positive or negative infinity.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
 * @api public
 */
is.infinite = function (value) {
  return value === Infinity || value === -Infinity;
};

/**
 * is.decimal
 * Test if `value` is a decimal number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a decimal number, false otherwise
 * @api public
 */

is.decimal = function (value) {
  return is.number(value) && !isActualNaN(value) && !is.infinite(value) && value % 1 !== 0;
};

/**
 * is.divisibleBy
 * Test if `value` is divisible by `n`.
 *
 * @param {Number} value value to test
 * @param {Number} n dividend
 * @return {Boolean} true if `value` is divisible by `n`, false otherwise
 * @api public
 */

is.divisibleBy = function (value, n) {
  var isDividendInfinite = is.infinite(value);
  var isDivisorInfinite = is.infinite(n);
  var isNonZeroNumber = is.number(value) && !isActualNaN(value) && is.number(n) && !isActualNaN(n) && n !== 0;
  return isDividendInfinite || isDivisorInfinite || (isNonZeroNumber && value % n === 0);
};

/**
 * is.integer
 * Test if `value` is an integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 * @api public
 */

is.integer = is['int'] = function (value) {
  return is.number(value) && !isActualNaN(value) && value % 1 === 0;
};

/**
 * is.maximum
 * Test if `value` is greater than 'others' values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is greater than `others` values
 * @api public
 */

is.maximum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value < others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.minimum
 * Test if `value` is less than `others` values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is less than `others` values
 * @api public
 */

is.minimum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value > others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.nan
 * Test if `value` is not a number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is not a number, false otherwise
 * @api public
 */

is.nan = function (value) {
  return !is.number(value) || value !== value;
};

/**
 * is.even
 * Test if `value` is an even number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an even number, false otherwise
 * @api public
 */

is.even = function (value) {
  return is.infinite(value) || (is.number(value) && value === value && value % 2 === 0);
};

/**
 * is.odd
 * Test if `value` is an odd number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an odd number, false otherwise
 * @api public
 */

is.odd = function (value) {
  return is.infinite(value) || (is.number(value) && value === value && value % 2 !== 0);
};

/**
 * is.ge
 * Test if `value` is greater than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.ge = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value >= other;
};

/**
 * is.gt
 * Test if `value` is greater than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.gt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value > other;
};

/**
 * is.le
 * Test if `value` is less than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if 'value' is less than or equal to 'other'
 * @api public
 */

is.le = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value <= other;
};

/**
 * is.lt
 * Test if `value` is less than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if `value` is less than `other`
 * @api public
 */

is.lt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value < other;
};

/**
 * is.within
 * Test if `value` is within `start` and `finish`.
 *
 * @param {Number} value value to test
 * @param {Number} start lower bound
 * @param {Number} finish upper bound
 * @return {Boolean} true if 'value' is is within 'start' and 'finish'
 * @api public
 */
is.within = function (value, start, finish) {
  if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.number(value) || !is.number(start) || !is.number(finish)) {
    throw new TypeError('all arguments must be numbers');
  }
  var isAnyInfinite = is.infinite(value) || is.infinite(start) || is.infinite(finish);
  return isAnyInfinite || (value >= start && value <= finish);
};

/**
 * Test object.
 */

/**
 * is.object
 * Test if `value` is an object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an object, false otherwise
 * @api public
 */

is.object = function (value) {
  return toStr.call(value) === '[object Object]';
};

/**
 * is.hash
 * Test if `value` is a hash - a plain object literal.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a hash, false otherwise
 * @api public
 */

is.hash = function (value) {
  return is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

/**
 * Test regexp.
 */

/**
 * is.regexp
 * Test if `value` is a regular expression.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a regexp, false otherwise
 * @api public
 */

is.regexp = function (value) {
  return toStr.call(value) === '[object RegExp]';
};

/**
 * Test string.
 */

/**
 * is.string
 * Test if `value` is a string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a string, false otherwise
 * @api public
 */

is.string = function (value) {
  return toStr.call(value) === '[object String]';
};

/**
 * Test base64 string.
 */

/**
 * is.base64
 * Test if `value` is a valid base64 encoded string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
 * @api public
 */

is.base64 = function (value) {
  return is.string(value) && (!value.length || base64Regex.test(value));
};

/**
 * Test base64 string.
 */

/**
 * is.hex
 * Test if `value` is a valid hex encoded string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
 * @api public
 */

is.hex = function (value) {
  return is.string(value) && (!value.length || hexRegex.test(value));
};

/**
 * is.symbol
 * Test if `value` is an ES6 Symbol
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a Symbol, false otherise
 * @api public
 */

is.symbol = function (value) {
  return typeof Symbol === 'function' && toStr.call(value) === '[object Symbol]' && typeof symbolValueOf.call(value) === 'symbol';
};

},{}],4:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.qj||(f.qj={})).js=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var QJ, rreturn, rtrim;

QJ = function(selector) {
  if (QJ.isDOMElement(selector)) {
    return selector;
  }
  return document.querySelectorAll(selector);
};

QJ.isDOMElement = function(el) {
  return el && (el.nodeName != null);
};

rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

QJ.trim = function(text) {
  if (text === null) {
    return "";
  } else {
    return (text + "").replace(rtrim, "");
  }
};

rreturn = /\r/g;

QJ.val = function(el, val) {
  var ret;
  if (arguments.length > 1) {
    return el.value = val;
  } else {
    ret = el.value;
    if (typeof ret === "string") {
      return ret.replace(rreturn, "");
    } else {
      if (ret === null) {
        return "";
      } else {
        return ret;
      }
    }
  }
};

QJ.preventDefault = function(eventObject) {
  if (typeof eventObject.preventDefault === "function") {
    eventObject.preventDefault();
    return;
  }
  eventObject.returnValue = false;
  return false;
};

QJ.normalizeEvent = function(e) {
  var original;
  original = e;
  e = {
    which: original.which != null ? original.which : void 0,
    target: original.target || original.srcElement,
    preventDefault: function() {
      return QJ.preventDefault(original);
    },
    originalEvent: original,
    data: original.data || original.detail
  };
  if (e.which == null) {
    e.which = original.charCode != null ? original.charCode : original.keyCode;
  }
  return e;
};

QJ.on = function(element, eventName, callback) {
  var el, multEventName, originalCallback, _i, _j, _len, _len1, _ref;
  if (element.length) {
    for (_i = 0, _len = element.length; _i < _len; _i++) {
      el = element[_i];
      QJ.on(el, eventName, callback);
    }
    return;
  }
  if (eventName.match(" ")) {
    _ref = eventName.split(" ");
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      multEventName = _ref[_j];
      QJ.on(element, multEventName, callback);
    }
    return;
  }
  originalCallback = callback;
  callback = function(e) {
    e = QJ.normalizeEvent(e);
    return originalCallback(e);
  };
  if (element.addEventListener) {
    return element.addEventListener(eventName, callback, false);
  }
  if (element.attachEvent) {
    eventName = "on" + eventName;
    return element.attachEvent(eventName, callback);
  }
  element['on' + eventName] = callback;
};

QJ.addClass = function(el, className) {
  var e;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.addClass(e, className));
      }
      return _results;
    })();
  }
  if (el.classList) {
    return el.classList.add(className);
  } else {
    return el.className += ' ' + className;
  }
};

QJ.hasClass = function(el, className) {
  var e, hasClass, _i, _len;
  if (el.length) {
    hasClass = true;
    for (_i = 0, _len = el.length; _i < _len; _i++) {
      e = el[_i];
      hasClass = hasClass && QJ.hasClass(e, className);
    }
    return hasClass;
  }
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
};

QJ.removeClass = function(el, className) {
  var cls, e, _i, _len, _ref, _results;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.removeClass(e, className));
      }
      return _results;
    })();
  }
  if (el.classList) {
    _ref = className.split(' ');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cls = _ref[_i];
      _results.push(el.classList.remove(cls));
    }
    return _results;
  } else {
    return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

QJ.toggleClass = function(el, className, bool) {
  var e;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.toggleClass(e, className, bool));
      }
      return _results;
    })();
  }
  if (bool) {
    if (!QJ.hasClass(el, className)) {
      return QJ.addClass(el, className);
    }
  } else {
    return QJ.removeClass(el, className);
  }
};

QJ.append = function(el, toAppend) {
  var e;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.append(e, toAppend));
      }
      return _results;
    })();
  }
  return el.insertAdjacentHTML('beforeend', toAppend);
};

QJ.find = function(el, selector) {
  if (el instanceof NodeList || el instanceof Array) {
    el = el[0];
  }
  return el.querySelectorAll(selector);
};

QJ.trigger = function(el, name, data) {
  var e, ev;
  try {
    ev = new CustomEvent(name, {
      detail: data
    });
  } catch (_error) {
    e = _error;
    ev = document.createEvent('CustomEvent');
    if (ev.initCustomEvent) {
      ev.initCustomEvent(name, true, true, data);
    } else {
      ev.initEvent(name, true, true, data);
    }
  }
  return el.dispatchEvent(ev);
};

module.exports = QJ;


},{}]},{},[1])
(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
module.exports = require('cssify');
},{"cssify":6}],6:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}],7:[function(require,module,exports){
(function (global){
var Card, QJ, extend, payment;

require('../scss/card.scss');

QJ = require('qj');

payment = require('payment');

extend = require('node.extend');

Card = (function() {
  var bindVal;

  Card.prototype.cardTemplate = '' + '<div class="jp-card-container">' + '<div class="jp-card">' + '<div class="jp-card-front">' + '<div class="jp-card-logo jp-card-elo">' + '<div class="e">e</div>' + '<div class="l">l</div>' + '<div class="o">o</div>' + '</div>' + '<div class="jp-card-logo jp-card-visa">visa</div>' + '<div class="jp-card-logo jp-card-mastercard">MasterCard</div>' + '<div class="jp-card-logo jp-card-maestro">Maestro</div>' + '<div class="jp-card-logo jp-card-amex"></div>' + '<div class="jp-card-logo jp-card-discover">discover</div>' + '<div class="jp-card-logo jp-card-dankort"><div class="dk"><div class="d"></div><div class="k"></div></div></div>' + '<div class="jp-card-lower">' + '<div class="jp-card-shiny"></div>' + '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' + '<div class="jp-card-number jp-card-display">{{number}}</div>' + '<div class="jp-card-name jp-card-display">{{name}}</div>' + '<div class="jp-card-expiry jp-card-display" data-before="{{monthYear}}" data-after="{{validDate}}">{{expiry}}</div>' + '</div>' + '</div>' + '<div class="jp-card-back">' + '<div class="jp-card-bar"></div>' + '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' + '<div class="jp-card-shiny"></div>' + '</div>' + '</div>' + '</div>';

  Card.prototype.template = function(tpl, data) {
    return tpl.replace(/\{\{(.*?)\}\}/g, function(match, key, str) {
      return data[key];
    });
  };

  Card.prototype.cardTypes = ['jp-card-amex', 'jp-card-dankort', 'jp-card-dinersclub', 'jp-card-discover', 'jp-card-jcb', 'jp-card-laser', 'jp-card-maestro', 'jp-card-mastercard', 'jp-card-unionpay', 'jp-card-visa', 'jp-card-visaelectron', 'jp-card-elo'];

  Card.prototype.defaults = {
    formatting: true,
    formSelectors: {
      numberInput: 'input[name="number"]',
      expiryInput: 'input[name="expiry"]',
      cvcInput: 'input[name="cvc"]',
      nameInput: 'input[name="name"]'
    },
    cardSelectors: {
      cardContainer: '.jp-card-container',
      card: '.jp-card',
      numberDisplay: '.jp-card-number',
      expiryDisplay: '.jp-card-expiry',
      cvcDisplay: '.jp-card-cvc',
      nameDisplay: '.jp-card-name'
    },
    messages: {
      validDate: 'valid\nthru',
      monthYear: 'month/year'
    },
    placeholders: {
      number: '&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;',
      cvc: '&bull;&bull;&bull;',
      expiry: '&bull;&bull;/&bull;&bull;',
      name: 'Full Name'
    },
    classes: {
      valid: 'jp-card-valid',
      invalid: 'jp-card-invalid'
    },
    debug: false
  };

  function Card(opts) {
    this.options = extend(true, this.defaults, opts);
    if (!this.options.form) {
      console.log("Please provide a form");
      return;
    }
    this.$el = QJ(this.options.form);
    if (!this.options.container) {
      console.log("Please provide a container");
      return;
    }
    this.$container = QJ(this.options.container);
    this.render();
    this.attachHandlers();
    this.handleInitialPlaceholders();
  }

  Card.prototype.render = function() {
    var $cardContainer, baseWidth, name, obj, ref, ref1, selector, ua;
    QJ.append(this.$container, this.template(this.cardTemplate, extend({}, this.options.messages, this.options.placeholders)));
    ref = this.options.cardSelectors;
    for (name in ref) {
      selector = ref[name];
      this["$" + name] = QJ.find(this.$container, selector);
    }
    ref1 = this.options.formSelectors;
    for (name in ref1) {
      selector = ref1[name];
      selector = this.options[name] ? this.options[name] : selector;
      obj = QJ.find(this.$el, selector);
      if (!obj.length && this.options.debug) {
        console.error("Card can't find a " + name + " in your form.");
      }
      this["$" + name] = obj;
    }
    if (this.options.formatting) {
      Payment.formatCardNumber(this.$numberInput);
      Payment.formatCardCVC(this.$cvcInput);
      Payment.formatCardExpiry(this.$expiryInput);
    }
    if (this.options.width) {
      $cardContainer = QJ(this.options.cardSelectors.cardContainer)[0];
      baseWidth = parseInt($cardContainer.clientWidth);
      $cardContainer.style.transform = "scale(" + (this.options.width / baseWidth) + ")";
    }
    if (typeof navigator !== "undefined" && navigator !== null ? navigator.userAgent : void 0) {
      ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) {
        QJ.addClass(this.$card, 'jp-card-safari');
      }
    }
    if (/MSIE 10\./i.test(navigator.userAgent)) {
      QJ.addClass(this.$card, 'jp-card-ie-10');
    }
    if (/rv:11.0/i.test(navigator.userAgent)) {
      return QJ.addClass(this.$card, 'jp-card-ie-11');
    }
  };

  Card.prototype.attachHandlers = function() {
    var expiryFilters;
    bindVal(this.$numberInput, this.$numberDisplay, {
      fill: false,
      filters: this.validToggler('cardNumber')
    });
    QJ.on(this.$numberInput, 'payment.cardType', this.handle('setCardType'));
    expiryFilters = [
      function(val) {
        return val.replace(/(\s+)/g, '');
      }
    ];
    expiryFilters.push(this.validToggler('cardExpiry'));
    bindVal(this.$expiryInput, this.$expiryDisplay, {
      join: function(text) {
        if (text[0].length === 2 || text[1]) {
          return "/";
        } else {
          return "";
        }
      },
      filters: expiryFilters
    });
    bindVal(this.$cvcInput, this.$cvcDisplay, {
      filters: this.validToggler('cardCVC')
    });
    QJ.on(this.$cvcInput, 'focus', this.handle('flipCard'));
    QJ.on(this.$cvcInput, 'blur', this.handle('unflipCard'));
    return bindVal(this.$nameInput, this.$nameDisplay, {
      fill: false,
      filters: this.validToggler('cardHolderName'),
      join: ' '
    });
  };

  Card.prototype.handleInitialPlaceholders = function() {
    var el, name, ref, results, selector;
    ref = this.options.formSelectors;
    results = [];
    for (name in ref) {
      selector = ref[name];
      el = this["$" + name];
      if (QJ.val(el)) {
        QJ.trigger(el, 'paste');
        results.push(setTimeout(function() {
          return QJ.trigger(el, 'keyup');
        }));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Card.prototype.handle = function(fn) {
    return (function(_this) {
      return function(e) {
        var args;
        args = Array.prototype.slice.call(arguments);
        args.unshift(e.target);
        return _this.handlers[fn].apply(_this, args);
      };
    })(this);
  };

  Card.prototype.validToggler = function(validatorName) {
    var isValid;
    if (validatorName === "cardExpiry") {
      isValid = function(val) {
        var objVal;
        objVal = Payment.fns.cardExpiryVal(val);
        return Payment.fns.validateCardExpiry(objVal.month, objVal.year);
      };
    } else if (validatorName === "cardCVC") {
      isValid = (function(_this) {
        return function(val) {
          return Payment.fns.validateCardCVC(val, _this.cardType);
        };
      })(this);
    } else if (validatorName === "cardNumber") {
      isValid = function(val) {
        return Payment.fns.validateCardNumber(val);
      };
    } else if (validatorName === "cardHolderName") {
      isValid = function(val) {
        return val !== "";
      };
    }
    return (function(_this) {
      return function(val, $in, $out) {
        var result;
        result = isValid(val);
        _this.toggleValidClass($in, result);
        _this.toggleValidClass($out, result);
        return val;
      };
    })(this);
  };

  Card.prototype.toggleValidClass = function(el, test) {
    QJ.toggleClass(el, this.options.classes.valid, test);
    return QJ.toggleClass(el, this.options.classes.invalid, !test);
  };

  Card.prototype.handlers = {
    setCardType: function($el, e) {
      var cardType;
      cardType = e.data;
      if (!QJ.hasClass(this.$card, cardType)) {
        QJ.removeClass(this.$card, 'jp-card-unknown');
        QJ.removeClass(this.$card, this.cardTypes.join(' '));
        QJ.addClass(this.$card, "jp-card-" + cardType);
        QJ.toggleClass(this.$card, 'jp-card-identified', cardType !== 'unknown');
        return this.cardType = cardType;
      }
    },
    flipCard: function() {
      return QJ.addClass(this.$card, 'jp-card-flipped');
    },
    unflipCard: function() {
      return QJ.removeClass(this.$card, 'jp-card-flipped');
    }
  };

  bindVal = function(el, out, opts) {
    var joiner, o, outDefaults;
    if (opts == null) {
      opts = {};
    }
    opts.fill = opts.fill || false;
    opts.filters = opts.filters || [];
    if (!(opts.filters instanceof Array)) {
      opts.filters = [opts.filters];
    }
    opts.join = opts.join || "";
    if (!(typeof opts.join === "function")) {
      joiner = opts.join;
      opts.join = function() {
        return joiner;
      };
    }
    outDefaults = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = out.length; j < len; j++) {
        o = out[j];
        results.push(o.textContent);
      }
      return results;
    })();
    QJ.on(el, 'focus', function() {
      return QJ.addClass(out, 'jp-card-focused');
    });
    QJ.on(el, 'blur', function() {
      return QJ.removeClass(out, 'jp-card-focused');
    });
    QJ.on(el, 'keyup change paste', function(e) {
      var elem, filter, i, j, join, k, len, len1, outEl, outVal, ref, results, val;
      val = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = el.length; j < len; j++) {
          elem = el[j];
          results.push(QJ.val(elem));
        }
        return results;
      })();
      join = opts.join(val);
      val = val.join(join);
      if (val === join) {
        val = "";
      }
      ref = opts.filters;
      for (j = 0, len = ref.length; j < len; j++) {
        filter = ref[j];
        val = filter(val, el, out);
      }
      results = [];
      for (i = k = 0, len1 = out.length; k < len1; i = ++k) {
        outEl = out[i];
        if (opts.fill) {
          outVal = val + outDefaults[i].substring(val.length);
        } else {
          outVal = val || outDefaults[i];
        }
        results.push(outEl.textContent = outVal);
      }
      return results;
    });
    return el;
  };

  return Card;

})();

module.exports = Card;

global.Card = Card;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../scss/card.scss":8,"node.extend":1,"payment":9,"qj":4}],8:[function(require,module,exports){
module.exports = require('sassify')('.jp-card.jp-card-safari.jp-card-identified .jp-card-front:before, .jp-card.jp-card-safari.jp-card-identified .jp-card-back:before {   background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);   background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%); }  .jp-card.jp-card-ie-10.jp-card-flipped, .jp-card.jp-card-ie-11.jp-card-flipped {   -webkit-transform: 0deg;   -moz-transform: 0deg;   -ms-transform: 0deg;   -o-transform: 0deg;   transform: 0deg; }   .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-front, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-front {     -webkit-transform: rotateY(0deg);     -moz-transform: rotateY(0deg);     -ms-transform: rotateY(0deg);     -o-transform: rotateY(0deg);     transform: rotateY(0deg); }   .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back {     -webkit-transform: rotateY(0deg);     -moz-transform: rotateY(0deg);     -ms-transform: rotateY(0deg);     -o-transform: rotateY(0deg);     transform: rotateY(0deg); }     .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back:after, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back:after {       left: 18%; }     .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-cvc, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-cvc {       -webkit-transform: rotateY(180deg);       -moz-transform: rotateY(180deg);       -ms-transform: rotateY(180deg);       -o-transform: rotateY(180deg);       transform: rotateY(180deg);       left: 5%; }     .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-shiny, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-shiny {       left: 84%; }       .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-shiny:after, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-shiny:after {         left: -480%;         -webkit-transform: rotateY(180deg);         -moz-transform: rotateY(180deg);         -ms-transform: rotateY(180deg);         -o-transform: rotateY(180deg);         transform: rotateY(180deg); }  .jp-card.jp-card-ie-10.jp-card-amex .jp-card-back, .jp-card.jp-card-ie-11.jp-card-amex .jp-card-back {   display: none; }  .jp-card-logo {   height: 36px;   width: 60px;   font-style: italic; }   .jp-card-logo, .jp-card-logo:before, .jp-card-logo:after {     box-sizing: border-box; }  .jp-card-logo.jp-card-amex {   text-transform: uppercase;   font-size: 4px;   font-weight: bold;   color: white;   background-image: repeating-radial-gradient(circle at center, #FFF 1px, #999 2px);   background-image: repeating-radial-gradient(circle at center, #FFF 1px, #999 2px);   border: 1px solid #EEE; }   .jp-card-logo.jp-card-amex:before, .jp-card-logo.jp-card-amex:after {     width: 28px;     display: block;     position: absolute;     left: 16px; }   .jp-card-logo.jp-card-amex:before {     height: 28px;     content: "american";     top: 3px;     text-align: left;     padding-left: 2px;     padding-top: 11px;     background: #267AC3; }   .jp-card-logo.jp-card-amex:after {     content: "express";     bottom: 11px;     text-align: right;     padding-right: 2px; }  .jp-card.jp-card-amex.jp-card-flipped {   -webkit-transform: none;   -moz-transform: none;   -ms-transform: none;   -o-transform: none;   transform: none; }  .jp-card.jp-card-amex.jp-card-identified .jp-card-front:before, .jp-card.jp-card-amex.jp-card-identified .jp-card-back:before {   background-color: #108168; }  .jp-card.jp-card-amex.jp-card-identified .jp-card-front .jp-card-logo.jp-card-amex {   opacity: 1; }  .jp-card.jp-card-amex.jp-card-identified .jp-card-front .jp-card-cvc {   visibility: visible; }  .jp-card.jp-card-amex.jp-card-identified .jp-card-front:after {   opacity: 1; }  .jp-card-logo.jp-card-discover {   background: #FF6600;   color: #111;   text-transform: uppercase;   font-style: normal;   font-weight: bold;   font-size: 10px;   text-align: center;   overflow: hidden;   z-index: 1;   padding-top: 9px;   letter-spacing: .03em;   border: 1px solid #EEE; }   .jp-card-logo.jp-card-discover:before, .jp-card-logo.jp-card-discover:after {     content: " ";     display: block;     position: absolute; }   .jp-card-logo.jp-card-discover:before {     background: white;     width: 200px;     height: 200px;     border-radius: 200px;     bottom: -5%;     right: -80%;     z-index: -1; }   .jp-card-logo.jp-card-discover:after {     width: 8px;     height: 8px;     border-radius: 4px;     top: 10px;     left: 27px;     background-color: #FF6600;     background-image: -webkit-radial-gradient(#FF6600, #fff);     background-image: radial-gradient(  #FF6600, #fff);     content: "network";     font-size: 4px;     line-height: 24px;     text-indent: -7px; }  .jp-card .jp-card-front .jp-card-logo.jp-card-discover {   right: 12%;   top: 18%; }  .jp-card.jp-card-discover.jp-card-identified .jp-card-front:before, .jp-card.jp-card-discover.jp-card-identified .jp-card-back:before {   background-color: #86B8CF; }  .jp-card.jp-card-discover.jp-card-identified .jp-card-logo.jp-card-discover {   opacity: 1; }  .jp-card.jp-card-discover.jp-card-identified .jp-card-front:after {   -webkit-transition: 400ms;   -moz-transition: 400ms;   transition: 400ms;   content: " ";   display: block;   background-color: #FF6600;   background-image: -webkit-linear-gradient(#FF6600, #ffa366, #FF6600);   background-image: linear-gradient(#FF6600, #ffa366, #FF6600);   height: 50px;   width: 50px;   border-radius: 25px;   position: absolute;   left: 100%;   top: 15%;   margin-left: -25px;   box-shadow: inset 1px 1px 3px 1px rgba(0, 0, 0, 0.5); }  .jp-card-logo.jp-card-visa {   background: white;   text-transform: uppercase;   color: #1A1876;   text-align: center;   font-weight: bold;   font-size: 15px;   line-height: 18px; }   .jp-card-logo.jp-card-visa:before, .jp-card-logo.jp-card-visa:after {     content: " ";     display: block;     width: 100%;     height: 25%; }   .jp-card-logo.jp-card-visa:before {     background: #1A1876; }   .jp-card-logo.jp-card-visa:after {     background: #E79800; }  .jp-card.jp-card-visa.jp-card-identified .jp-card-front:before, .jp-card.jp-card-visa.jp-card-identified .jp-card-back:before {   background-color: #191278; }  .jp-card.jp-card-visa.jp-card-identified .jp-card-logo.jp-card-visa {   opacity: 1; }  .jp-card-logo.jp-card-mastercard {   color: white;   font-weight: bold;   text-align: center;   font-size: 9px;   line-height: 36px;   z-index: 1;   text-shadow: 1px 1px rgba(0, 0, 0, 0.6); }   .jp-card-logo.jp-card-mastercard:before, .jp-card-logo.jp-card-mastercard:after {     content: " ";     display: block;     width: 36px;     top: 0;     position: absolute;     height: 36px;     border-radius: 18px; }   .jp-card-logo.jp-card-mastercard:before {     left: 0;     background: #FF0000;     z-index: -1; }   .jp-card-logo.jp-card-mastercard:after {     right: 0;     background: #FFAB00;     z-index: -2; }  .jp-card.jp-card-mastercard.jp-card-identified .jp-card-front .jp-card-logo.jp-card-mastercard, .jp-card.jp-card-mastercard.jp-card-identified .jp-card-back .jp-card-logo.jp-card-mastercard {   box-shadow: none; }  .jp-card.jp-card-mastercard.jp-card-identified .jp-card-front:before, .jp-card.jp-card-mastercard.jp-card-identified .jp-card-back:before {   background-color: #0061A8; }  .jp-card.jp-card-mastercard.jp-card-identified .jp-card-logo.jp-card-mastercard {   opacity: 1; }  .jp-card-logo.jp-card-maestro {   color: white;   font-weight: bold;   text-align: center;   font-size: 14px;   line-height: 36px;   z-index: 1;   text-shadow: 1px 1px rgba(0, 0, 0, 0.6); }   .jp-card-logo.jp-card-maestro:before, .jp-card-logo.jp-card-maestro:after {     content: " ";     display: block;     width: 36px;     top: 0;     position: absolute;     height: 36px;     border-radius: 18px; }   .jp-card-logo.jp-card-maestro:before {     left: 0;     background: #0064CB;     z-index: -1; }   .jp-card-logo.jp-card-maestro:after {     right: 0;     background: #CC0000;     z-index: -2; }  .jp-card.jp-card-maestro.jp-card-identified .jp-card-front .jp-card-logo.jp-card-maestro, .jp-card.jp-card-maestro.jp-card-identified .jp-card-back .jp-card-logo.jp-card-maestro {   box-shadow: none; }  .jp-card.jp-card-maestro.jp-card-identified .jp-card-front:before, .jp-card.jp-card-maestro.jp-card-identified .jp-card-back:before {   background-color: #0B2C5F; }  .jp-card.jp-card-maestro.jp-card-identified .jp-card-logo.jp-card-maestro {   opacity: 1; }  .jp-card-logo.jp-card-dankort {   width: 60px;   height: 36px;   padding: 3px;   border-radius: 8px;   border: #000000 1px solid;   background-color: #FFFFFF; }   .jp-card-logo.jp-card-dankort .dk {     position: relative;     width: 100%;     height: 100%;     overflow: hidden; }     .jp-card-logo.jp-card-dankort .dk:before {       background-color: #ED1C24;       content: \'\';       position: absolute;       width: 100%;       height: 100%;       display: block;       border-radius: 6px; }     .jp-card-logo.jp-card-dankort .dk:after {       content: \'\';       position: absolute;       top: 50%;       margin-top: -7.7px;       right: 0;       width: 0;       height: 0;       border-style: solid;       border-width: 7px 7px 10px 0;       border-color: transparent #ED1C24 transparent transparent;       z-index: 1; }   .jp-card-logo.jp-card-dankort .d, .jp-card-logo.jp-card-dankort .k {     position: absolute;     top: 50%;     width: 50%;     display: block;     height: 15.4px;     margin-top: -7.7px;     background: white; }   .jp-card-logo.jp-card-dankort .d {     left: 0;     border-radius: 0 8px 10px 0; }     .jp-card-logo.jp-card-dankort .d:before {       content: \'\';       position: absolute;       top: 50%;       left: 50%;       display: block;       background: #ED1C24;       border-radius: 2px 4px 6px 0px;       height: 5px;       width: 7px;       margin: -3px 0 0 -4px; }   .jp-card-logo.jp-card-dankort .k {     right: 0; }     .jp-card-logo.jp-card-dankort .k:before, .jp-card-logo.jp-card-dankort .k:after {       content: \'\';       position: absolute;       right: 50%;       width: 0;       height: 0;       border-style: solid;       margin-right: -1px; }     .jp-card-logo.jp-card-dankort .k:before {       top: 0;       border-width: 8px 5px 0 0;       border-color: #ED1C24 transparent transparent transparent; }     .jp-card-logo.jp-card-dankort .k:after {       bottom: 0;       border-width: 0 5px 8px 0;       border-color: transparent transparent #ED1C24 transparent; }  .jp-card.jp-card-dankort.jp-card-identified .jp-card-front:before, .jp-card.jp-card-dankort.jp-card-identified .jp-card-back:before {   background-color: #0055C7; }  .jp-card.jp-card-dankort.jp-card-identified .jp-card-logo.jp-card-dankort {   opacity: 1; }  .jp-card-logo.jp-card-elo {   height: 50px;   width: 50px;   border-radius: 100%;   background: black;   color: white;   text-align: center;   text-transform: lowercase;   font-size: 21px;   font-style: normal;   letter-spacing: 1px;   font-weight: bold;   padding-top: 13px; }   .jp-card-logo.jp-card-elo .e, .jp-card-logo.jp-card-elo .l, .jp-card-logo.jp-card-elo .o {     display: inline-block;     position: relative; }   .jp-card-logo.jp-card-elo .e {     -webkit-transform: rotate(-15deg);     -moz-transform: rotate(-15deg);     -ms-transform: rotate(-15deg);     -o-transform: rotate(-15deg);     transform: rotate(-15deg); }   .jp-card-logo.jp-card-elo .o {     position: relative;     display: inline-block;     width: 12px;     height: 12px;     right: 0;     top: 7px;     border-radius: 100%;     background-image: -webkit-linear-gradient( yellow 50%, red 50%);     background-image: linear-gradient( yellow 50%, red 50%);     -webkit-transform: rotate(40deg);     -moz-transform: rotate(40deg);     -ms-transform: rotate(40deg);     -o-transform: rotate(40deg);     transform: rotate(40deg);     text-indent: -9999px; }     .jp-card-logo.jp-card-elo .o:before {       content: "";       position: absolute;       width: 49%;       height: 49%;       background: black;       border-radius: 100%;       text-indent: -99999px;       top: 25%;       left: 25%; }  .jp-card.jp-card-elo.jp-card-identified .jp-card-front:before, .jp-card.jp-card-elo.jp-card-identified .jp-card-back:before {   background-color: #6F6969; }  .jp-card.jp-card-elo.jp-card-identified .jp-card-logo.jp-card-elo {   opacity: 1; }  .jp-card-container {   -webkit-perspective: 1000px;   -moz-perspective: 1000px;   perspective: 1000px;   width: 350px;   max-width: 100%;   height: 200px;   margin: auto;   z-index: 1;   position: relative; }  .jp-card {   font-family: "Helvetica Neue";   line-height: 1;   position: relative;   width: 100%;   height: 100%;   min-width: 315px;   border-radius: 10px;   -webkit-transform-style: preserve-3d;   -moz-transform-style: preserve-3d;   -ms-transform-style: preserve-3d;   -o-transform-style: preserve-3d;   transform-style: preserve-3d;   -webkit-transition: all 400ms linear;   -moz-transition: all 400ms linear;   transition: all 400ms linear; }   .jp-card > *, .jp-card > *:before, .jp-card > *:after {     -moz-box-sizing: border-box;     -webkit-box-sizing: border-box;     box-sizing: border-box;     font-family: inherit; }   .jp-card.jp-card-flipped {     -webkit-transform: rotateY(180deg);     -moz-transform: rotateY(180deg);     -ms-transform: rotateY(180deg);     -o-transform: rotateY(180deg);     transform: rotateY(180deg); }   .jp-card .jp-card-front, .jp-card .jp-card-back {     -webkit-backface-visibility: hidden;     backface-visibility: hidden;     -webkit-transform-style: preserve-3d;     -moz-transform-style: preserve-3d;     -ms-transform-style: preserve-3d;     -o-transform-style: preserve-3d;     transform-style: preserve-3d;     -webkit-transition: all 400ms linear;     -moz-transition: all 400ms linear;     transition: all 400ms linear;     width: 100%;     height: 100%;     position: absolute;     top: 0;     left: 0;     overflow: hidden;     border-radius: 10px;     background: #DDD; }     .jp-card .jp-card-front:before, .jp-card .jp-card-back:before {       content: " ";       display: block;       position: absolute;       width: 100%;       height: 100%;       top: 0;       left: 0;       opacity: 0;       border-radius: 10px;       -webkit-transition: all 400ms ease;       -moz-transition: all 400ms ease;       transition: all 400ms ease; }     .jp-card .jp-card-front:after, .jp-card .jp-card-back:after {       content: " ";       display: block; }     .jp-card .jp-card-front .jp-card-display, .jp-card .jp-card-back .jp-card-display {       color: white;       font-weight: normal;       opacity: 0.5;       -webkit-transition: opacity 400ms linear;       -moz-transition: opacity 400ms linear;       transition: opacity 400ms linear; }       .jp-card .jp-card-front .jp-card-display.jp-card-focused, .jp-card .jp-card-back .jp-card-display.jp-card-focused {         opacity: 1;         font-weight: 700; }     .jp-card .jp-card-front .jp-card-cvc, .jp-card .jp-card-back .jp-card-cvc {       font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;       font-size: 14px; }     .jp-card .jp-card-front .jp-card-shiny, .jp-card .jp-card-back .jp-card-shiny {       width: 50px;       height: 35px;       border-radius: 5px;       background: #CCC;       position: relative; }       .jp-card .jp-card-front .jp-card-shiny:before, .jp-card .jp-card-back .jp-card-shiny:before {         content: " ";         display: block;         width: 70%;         height: 60%;         border-top-right-radius: 5px;         border-bottom-right-radius: 5px;         background: #d9d9d9;         position: absolute;         top: 20%; }   .jp-card .jp-card-front .jp-card-logo {     position: absolute;     opacity: 0;     right: 5%;     top: 8%;     -webkit-transition: 400ms;     -moz-transition: 400ms;     transition: 400ms; }   .jp-card .jp-card-front .jp-card-lower {     width: 80%;     position: absolute;     left: 10%;     bottom: 30px; }     @media only screen and (max-width: 480px) {       .jp-card .jp-card-front .jp-card-lower {         width: 90%;         left: 5%; } }     .jp-card .jp-card-front .jp-card-lower .jp-card-cvc {       visibility: hidden;       float: right;       position: relative;       bottom: 5px; }     .jp-card .jp-card-front .jp-card-lower .jp-card-number {       font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;       font-size: 24px;       clear: both;       margin-bottom: 30px; }     .jp-card .jp-card-front .jp-card-lower .jp-card-expiry {       font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;       letter-spacing: 0em;       position: relative;       float: right;       width: 25%; }       .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:before, .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:after {         font-family: "Helvetica Neue";         font-weight: bold;         font-size: 7px;         white-space: pre;         display: block;         opacity: .5; }       .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:before {         content: attr(data-before);         margin-bottom: 2px;         font-size: 7px;         text-transform: uppercase; }       .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:after {         position: absolute;         content: attr(data-after);         text-align: right;         right: 100%;         margin-right: 5px;         margin-top: 2px;         bottom: 0; }     .jp-card .jp-card-front .jp-card-lower .jp-card-name {       text-transform: uppercase;       font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;       font-size: 20px;       max-height: 45px;       position: absolute;       bottom: 0;       width: 190px;       display: -webkit-box;       -webkit-line-clamp: 2;       -webkit-box-orient: horizontal;       overflow: hidden;       text-overflow: ellipsis; }   .jp-card .jp-card-back {     -webkit-transform: rotateY(180deg);     -moz-transform: rotateY(180deg);     -ms-transform: rotateY(180deg);     -o-transform: rotateY(180deg);     transform: rotateY(180deg); }     .jp-card .jp-card-back .jp-card-bar {       background-color: #444;       background-image: -webkit-linear-gradient(#444, #333);       background-image: linear-gradient(#444, #333);       width: 100%;       height: 20%;       position: absolute;       top: 10%; }     .jp-card .jp-card-back:after {       content: " ";       display: block;       background-color: #FFF;       background-image: -webkit-linear-gradient(#FFF, #FFF);       background-image: linear-gradient(#FFF, #FFF);       width: 80%;       height: 16%;       position: absolute;       top: 40%;       left: 2%; }     .jp-card .jp-card-back .jp-card-cvc {       position: absolute;       top: 40%;       left: 85%;       -webkit-transition-delay: 600ms;       -moz-transition-delay: 600ms;       transition-delay: 600ms; }     .jp-card .jp-card-back .jp-card-shiny {       position: absolute;       top: 66%;       left: 2%; }       .jp-card .jp-card-back .jp-card-shiny:after {         content: "This card has been issued by Jesse Pollak and is licensed for anyone to use anywhere for free.\AIt comes with no warranty.\A For support issues, please visit: github.com/jessepollak/card.";         position: absolute;         left: 120%;         top: 5%;         color: white;         font-size: 7px;         width: 230px;         opacity: .5; }   .jp-card.jp-card-identified {     box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); }     .jp-card.jp-card-identified .jp-card-front, .jp-card.jp-card-identified .jp-card-back {       background-color: #000;       background-color: rgba(0, 0, 0, 0.5); }       .jp-card.jp-card-identified .jp-card-front:before, .jp-card.jp-card-identified .jp-card-back:before {         -webkit-transition: all 400ms ease;         -moz-transition: all 400ms ease;         transition: all 400ms ease;         background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 15% 80%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);         background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 15% 80%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);         opacity: 1; }       .jp-card.jp-card-identified .jp-card-front .jp-card-logo, .jp-card.jp-card-identified .jp-card-back .jp-card-logo {         box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3); }     .jp-card.jp-card-identified.no-radial-gradient .jp-card-front:before, .jp-card.jp-card-identified.no-radial-gradient .jp-card-back:before {       background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);       background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%); }  /*# sourceMappingURL=data:application/json;base64,ewoJInZlcnNpb24iOiAzLAoJImZpbGUiOiAic3JjL3Njc3MvY2FyZC5zY3NzIiwKCSJzb3VyY2VzIjogWwoJCSJzcmMvc2Nzcy9jYXJkLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvX2JvdXJib24uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9zZXR0aW5ncy9fcHJlZml4ZXIuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9zZXR0aW5ncy9fcHgtdG8tZW0uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9zZXR0aW5ncy9fYXNzZXQtcGlwZWxpbmUuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9oZWxwZXJzL19ncmFkaWVudC1wb3NpdGlvbnMtcGFyc2VyLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvaGVscGVycy9fbGluZWFyLXBvc2l0aW9ucy1wYXJzZXIuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9oZWxwZXJzL19yYWRpYWwtYXJnLXBhcnNlci5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2hlbHBlcnMvX3JhZGlhbC1wb3NpdGlvbnMtcGFyc2VyLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvaGVscGVycy9fcmVuZGVyLWdyYWRpZW50cy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2hlbHBlcnMvX3NoYXBlLXNpemUtc3RyaXBwZXIuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9mdW5jdGlvbnMvX2NvbG9yLWxpZ2h0bmVzcy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fZmxleC1ncmlkLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvZnVuY3Rpb25zL19nb2xkZW4tcmF0aW8uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9mdW5jdGlvbnMvX2dyaWQtd2lkdGguc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9mdW5jdGlvbnMvX2xpbmVhci1ncmFkaWVudC5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fbW9kdWxhci1zY2FsZS5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fcHgtdG8tZW0uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9mdW5jdGlvbnMvX3B4LXRvLXJlbS5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fcmFkaWFsLWdyYWRpZW50LnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvZnVuY3Rpb25zL19zdHJpcC11bml0cy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fdGludC1zaGFkZS5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fdHJhbnNpdGlvbi1wcm9wZXJ0eS1uYW1lLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvZnVuY3Rpb25zL191bnBhY2suc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19hbmltYXRpb24uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19hcHBlYXJhbmNlLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fYmFja2ZhY2UtdmlzaWJpbGl0eS5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2NzczMvX2JhY2tncm91bmQuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19iYWNrZ3JvdW5kLWltYWdlLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fYm9yZGVyLWltYWdlLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fYm9yZGVyLXJhZGl1cy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2NzczMvX2JveC1zaXppbmcuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19jYWxjLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fY29sdW1ucy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2NzczMvX2ZpbHRlci5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2NzczMvX2ZsZXgtYm94LnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fZm9udC1mYWNlLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fZm9udC1mZWF0dXJlLXNldHRpbmdzLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9faHlwaGVucy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2NzczMvX2hpZHBpLW1lZGlhLXF1ZXJ5LnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9faW1hZ2UtcmVuZGVyaW5nLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9faW5saW5lLWJsb2NrLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fa2V5ZnJhbWVzLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fbGluZWFyLWdyYWRpZW50LnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fcGVyc3BlY3RpdmUuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19yYWRpYWwtZ3JhZGllbnQuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL190cmFuc2Zvcm0uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL190cmFuc2l0aW9uLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fdXNlci1zZWxlY3Quc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19wbGFjZWhvbGRlci5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9fYnV0dG9uLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL19jbGVhcmZpeC5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9fZGlyZWN0aW9uYWwtdmFsdWVzLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL19lbGxpcHNpcy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9fZm9udC1mYW1pbHkuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9hZGRvbnMvX2hpZGUtdGV4dC5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9faHRtbDUtaW5wdXQtdHlwZXMuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9hZGRvbnMvX3Bvc2l0aW9uLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL19wcmVmaXhlci5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9fcmV0aW5hLWltYWdlLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL19zaXplLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL190aW1pbmctZnVuY3Rpb25zLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL190cmlhbmdsZS5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9fd29yZC13cmFwLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvX2JvdXJib24tZGVwcmVjYXRlZC11cGNvbWluZy5zY3NzIiwKCQkic3JjL3Njc3MvX21peGlucy5zY3NzIiwKCQkic3JjL3Njc3MvYnJvd3NlcnMvX3NhZmFyaS5zY3NzIiwKCQkic3JjL3Njc3MvYnJvd3NlcnMvX2llLnNjc3MiLAoJCSJzcmMvc2Nzcy9jYXJkcy9fYW1leC5zY3NzIiwKCQkic3JjL3Njc3MvY2FyZHMvX2NhcmQuc2NzcyIsCgkJInNyYy9zY3NzL2xvZ29zL19hbWV4LnNjc3MiLAoJCSJzcmMvc2Nzcy9sb2dvcy9fbG9nby5zY3NzIiwKCQkic3JjL3Njc3MvY2FyZHMvX2Rpc2NvdmVyLnNjc3MiLAoJCSJzcmMvc2Nzcy9sb2dvcy9fZGlzY292ZXIuc2NzcyIsCgkJInNyYy9zY3NzL2NhcmRzL192aXNhLnNjc3MiLAoJCSJzcmMvc2Nzcy9sb2dvcy9fdmlzYS5zY3NzIiwKCQkic3JjL3Njc3MvY2FyZHMvX21hc3RlcmNhcmQuc2NzcyIsCgkJInNyYy9zY3NzL2xvZ29zL19tYXN0ZXJjYXJkLnNjc3MiLAoJCSJzcmMvc2Nzcy9jYXJkcy9fbWFlc3Ryby5zY3NzIiwKCQkic3JjL3Njc3MvbG9nb3MvX21hZXN0cm8uc2NzcyIsCgkJInNyYy9zY3NzL2NhcmRzL19kYW5rb3J0LnNjc3MiLAoJCSJzcmMvc2Nzcy9sb2dvcy9fZGFua29ydC5zY3NzIiwKCQkic3JjL3Njc3MvY2FyZHMvX2Vsby5zY3NzIiwKCQkic3JjL3Njc3MvbG9nb3MvX2Vsby5zY3NzIgoJXSwKCSJzb3VyY2VzQ29udGVudCI6IFsKCQkiQGltcG9ydCBcImJvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib3VyYm9uXCI7XG5AaW1wb3J0IFwibWl4aW5zXCI7XG5cbi8vIGJyb3dzZXIgc3BlY2lmaWMgaGFja3NcbkBpbXBvcnQgXCJicm93c2Vycy9zYWZhcmlcIjtcbkBpbXBvcnQgXCJicm93c2Vycy9pZVwiO1xuXG5AaW1wb3J0IFwiY2FyZHMvYW1leFwiO1xuQGltcG9ydCBcImNhcmRzL2Rpc2NvdmVyXCI7XG5AaW1wb3J0IFwiY2FyZHMvdmlzYVwiO1xuQGltcG9ydCBcImNhcmRzL21hc3RlcmNhcmRcIjtcbkBpbXBvcnQgXCJjYXJkcy9tYWVzdHJvXCI7XG5AaW1wb3J0IFwiY2FyZHMvZGFua29ydFwiO1xuQGltcG9ydCBcImNhcmRzL2Vsb1wiO1xuXG4uanAtY2FyZC1jb250YWluZXIge1xuICAgIEBpbmNsdWRlIHBlcnNwZWN0aXZlKDEwMDBweCk7XG4gICAgd2lkdGg6ICRjYXJkLXdpZHRoO1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6ICRjYXJkLWhlaWdodDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgei1pbmRleDogMTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5qcC1jYXJkIHtcbiAgICBmb250LWZhbWlseTogJGNhcmQtZm9udC1mYW1pbHk7XG4gICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBtaW4td2lkdGg6IDMxNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6ICRjYXJkLWJvcmRlci1yYWRpdXM7XG5cbiAgICAmID4gKiwgJiA+ICo6YmVmb3JlLCAmID4gKjphZnRlciB7XG4gICAgICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDsgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94OyBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSB0cmFuc2Zvcm0tc3R5bGUocHJlc2VydmUtM2QpO1xuICAgIEBpbmNsdWRlIHRyYW5zaXRpb24oYWxsICRjYXJkLXRyYW5zaXRpb24tdGltZSBsaW5lYXIpO1xuXG4gICAgJi5qcC1jYXJkLWZsaXBwZWQge1xuICAgICAgICBAaW5jbHVkZSB0cmFuc2Zvcm0ocm90YXRlWSgxODBkZWcpKTtcbiAgICB9XG5cbiAgICAuanAtY2FyZC1mcm9udCwgLmpwLWNhcmQtYmFjayB7XG4gICAgICAgIEBpbmNsdWRlIGJhY2tmYWNlLXZpc2liaWxpdHkoaGlkZGVuKTtcbiAgICAgICAgQGluY2x1ZGUgdHJhbnNmb3JtLXN0eWxlKHByZXNlcnZlLTNkKTtcbiAgICAgICAgQGluY2x1ZGUgdHJhbnNpdGlvbihhbGwgJGNhcmQtdHJhbnNpdGlvbi10aW1lIGxpbmVhcik7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAkY2FyZC1ib3JkZXItcmFkaXVzO1xuICAgICAgICBiYWNrZ3JvdW5kOiAjREREO1xuXG4gICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgIEBpbmNsdWRlIHNoYXBlKCk7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICAgIEBpbmNsdWRlIHRyYW5zaXRpb24oYWxsICRjYXJkLXRyYW5zaXRpb24tdGltZSBlYXNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgQGluY2x1ZGUgc2hhcGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5qcC1jYXJkLWRpc3BsYXkge1xuICAgICAgICAgICAgY29sb3I6ICRjYXJkLWZvbnQtY29sb3I7XG4gICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgICAgb3BhY2l0eTogMC41O1xuICAgICAgICAgICAgQGluY2x1ZGUgdHJhbnNpdGlvbihvcGFjaXR5ICRjYXJkLXRyYW5zaXRpb24tdGltZSBsaW5lYXIpO1xuICAgICAgICAgICAgJi5qcC1jYXJkLWZvY3VzZWQge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICAgICAgICAmLnZhbGlkIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAuanAtY2FyZC1jdmMge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICRjYXJkLW1vbm9zcGFjZS1mb250LWZhbWlseTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5qcC1jYXJkLXNoaW55IHtcbiAgICAgICAgICAgICRjb2xvcjogI0NDQztcbiAgICAgICAgICAgICRyYWRpdXM6IDVweDtcbiAgICAgICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAzNXB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICRjb2xvcjtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICBAaW5jbHVkZSBzaGFwZSgpO1xuICAgICAgICAgICAgICAgICRoZWlnaHQ6IDYwJTtcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAlO1xuICAgICAgICAgICAgICAgIGhlaWdodDogJGhlaWdodDtcbiAgICAgICAgICAgICAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogJHJhZGl1cztcbiAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogJHJhZGl1cztcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaWdodGVuKCRjb2xvciwgNSUpO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICB0b3A6ICgxMDAlIC0gJGhlaWdodCkgLyAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuanAtY2FyZC1mcm9udCB7XG5cbiAgICAgICAgLmpwLWNhcmQtbG9nb3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgICByaWdodDogNSU7XG4gICAgICAgICAgICB0b3A6IDglO1xuICAgICAgICAgICAgQGluY2x1ZGUgdHJhbnNpdGlvbigkY2FyZC10cmFuc2l0aW9uLXRpbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmpwLWNhcmQtbG93ZXIge1xuICAgICAgICAgICAgJHdpZHRoOiA4MCU7XG4gICAgICAgICAgICB3aWR0aDogJHdpZHRoO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgbGVmdDogKDEwMCUgLSAkd2lkdGgpIC8gMjtcbiAgICAgICAgICAgIGJvdHRvbTogMzBweDtcblxuICAgICAgICAgICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDogNDgwcHgpIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgICAgICAgICAgIGxlZnQ6IDUlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuanAtY2FyZC1jdmMge1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgICAgIGJvdHRvbTogNXB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuanAtY2FyZC1udW1iZXIge1xuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAkY2FyZC1tb25vc3BhY2UtZm9udC1mYW1pbHk7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgICAgICAgIGNsZWFyOiBib3RoO1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5qcC1jYXJkLWV4cGlyeSB7XG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6ICRjYXJkLW1vbm9zcGFjZS1mb250LWZhbWlseTtcbiAgICAgICAgICAgICAgICAkbGFiZWwtcGFkZGluZzogNXB4O1xuICAgICAgICAgICAgICAgIGxldHRlci1zcGFjaW5nOiAwZW07XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgICAgIGZsb2F0OiByaWdodDtcbiAgICAgICAgICAgICAgICB3aWR0aDogMjUlO1xuXG4gICAgICAgICAgICAgICAgJjpiZWZvcmUsICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgICAgICBmb250LWZhbWlseTogJGNhcmQtZm9udC1mYW1pbHk7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDdweDtcbiAgICAgICAgICAgICAgICAgICAgd2hpdGUtc3BhY2U6IHByZTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYXR0cihkYXRhLWJlZm9yZSk7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206ICRsYWJlbC1wYWRkaW5nIC0gM3B4O1xuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDdweDtcbiAgICAgICAgICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAmOmFmdGVyIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBhdHRyKGRhdGEtYWZ0ZXIpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogJGxhYmVsLXBhZGRpbmc7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmpwLWNhcmQtbmFtZSB7XG4gICAgICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgICAgICAgICBmb250LWZhbWlseTogJGNhcmQtbW9ub3NwYWNlLWZvbnQtZmFtaWx5O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgICAgICAgICBtYXgtaGVpZ2h0OiA0NXB4O1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDE5MHB4O1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgICAgICAgICAgICAgIC13ZWJraXQtbGluZS1jbGFtcDogMjtcbiAgICAgICAgICAgICAgICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5qcC1jYXJkLWJhY2sge1xuICAgICAgICBAaW5jbHVkZSB0cmFuc2Zvcm0ocm90YXRlWSgxODBkZWcpKTtcbiAgICAgICAgJGJhci10b3Atb2Zmc2V0OiA0MCU7XG4gICAgICAgICRzaWduYXR1cmUtaGVpZ2h0OiAxNiU7XG4gICAgICAgICRzaWduYXR1cmUtbGVmdDogMiU7XG5cbiAgICAgICAgLmpwLWNhcmQtYmFyIHtcbiAgICAgICAgICAgIEBpbmNsdWRlIGxpbmVhci1ncmFkaWVudCgjNDQ0LCAjMzMzKTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAyMCU7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDEwJTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgQGluY2x1ZGUgc2hhcGUoKTtcbiAgICAgICAgICAgIEBpbmNsdWRlIGxpbmVhci1ncmFkaWVudCgjRkZGLCAjRkZGKTtcbiAgICAgICAgICAgIHdpZHRoOiA4MCU7XG4gICAgICAgICAgICBoZWlnaHQ6ICRzaWduYXR1cmUtaGVpZ2h0O1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAkYmFyLXRvcC1vZmZzZXQ7XG4gICAgICAgICAgICBsZWZ0OiAkc2lnbmF0dXJlLWxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICAuanAtY2FyZC1jdmMge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAkYmFyLXRvcC1vZmZzZXQ7XG4gICAgICAgICAgICBsZWZ0OiA4NSU7XG4gICAgICAgICAgICBAaW5jbHVkZSB0cmFuc2l0aW9uLWRlbGF5KCRjYXJkLXRyYW5zaXRpb24tdGltZSArIDIwMG1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5qcC1jYXJkLXNoaW55IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogJGJhci10b3Atb2Zmc2V0ICsgJHNpZ25hdHVyZS1oZWlnaHQgKyAxMCU7XG4gICAgICAgICAgICBsZWZ0OiAkc2lnbmF0dXJlLWxlZnQ7XG5cbiAgICAgICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiVGhpcyBjYXJkIGhhcyBiZWVuIGlzc3VlZCBieSBKZXNzZSBQb2xsYWsgYW5kIGlzIGxpY2Vuc2VkIGZvciBhbnlvbmUgdG8gdXNlIGFueXdoZXJlIGZvciBmcmVlLlxcQUl0IGNvbWVzIHdpdGggbm8gd2FycmFudHkuXFxBIEZvciBzdXBwb3J0IGlzc3VlcywgcGxlYXNlIHZpc2l0OiBnaXRodWIuY29tL2plc3NlcG9sbGFrL2NhcmQuXCI7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgIGxlZnQ6IDEyMCU7XG4gICAgICAgICAgICAgICAgdG9wOiA1JTtcbiAgICAgICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA3cHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIzMHB4O1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5qcC1jYXJkLWlkZW50aWZpZWQge1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMjBweCByZ2JhKDAsMCwwLDAuMyk7XG5cbiAgICAgICAgLmpwLWNhcmQtZnJvbnQsIC5qcC1jYXJkLWJhY2sge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcblxuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIEBpbmNsdWRlIHRyYW5zaXRpb24oYWxsICRjYXJkLXRyYW5zaXRpb24tdGltZSBlYXNlKTtcbiAgICAgICAgICAgICAgICBAaW5jbHVkZSBjYXJkLXRleHR1cmUoKTtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgICAgICAgIC8vIGJveC1zaGFkb3c6IGluc2V0IDAgMCA1cHggcmdiYSgyNTUsMjU1LDI1NSwxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmpwLWNhcmQtbG9nbyB7XG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYubm8tcmFkaWFsLWdyYWRpZW50IHtcbiAgICAgICAgICAgIC5qcC1jYXJkLWZyb250LCAuanAtY2FyZC1iYWNrIHtcbiAgICAgICAgICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgICAgIEBpbmNsdWRlIGNhcmQtdGV4dHVyZSgkcmFkaWFsLWdyYWRpZW50OiBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwKCQkiLy8gU2V0dGluZ3NcbkBpbXBvcnQgXCJzZXR0aW5ncy9wcmVmaXhlclwiO1xuQGltcG9ydCBcInNldHRpbmdzL3B4LXRvLWVtXCI7XG5AaW1wb3J0IFwic2V0dGluZ3MvYXNzZXQtcGlwZWxpbmVcIjtcblxuLy8gQ3VzdG9tIEhlbHBlcnNcbkBpbXBvcnQgXCJoZWxwZXJzL2dyYWRpZW50LXBvc2l0aW9ucy1wYXJzZXJcIjtcbkBpbXBvcnQgXCJoZWxwZXJzL2xpbmVhci1wb3NpdGlvbnMtcGFyc2VyXCI7XG5AaW1wb3J0IFwiaGVscGVycy9yYWRpYWwtYXJnLXBhcnNlclwiO1xuQGltcG9ydCBcImhlbHBlcnMvcmFkaWFsLXBvc2l0aW9ucy1wYXJzZXJcIjtcbkBpbXBvcnQgXCJoZWxwZXJzL3JlbmRlci1ncmFkaWVudHNcIjtcbkBpbXBvcnQgXCJoZWxwZXJzL3NoYXBlLXNpemUtc3RyaXBwZXJcIjtcblxuLy8gQ3VzdG9tIEZ1bmN0aW9uc1xuQGltcG9ydCBcImZ1bmN0aW9ucy9jb2xvci1saWdodG5lc3NcIjtcbkBpbXBvcnQgXCJmdW5jdGlvbnMvZmxleC1ncmlkXCI7XG5AaW1wb3J0IFwiZnVuY3Rpb25zL2dvbGRlbi1yYXRpb1wiO1xuQGltcG9ydCBcImZ1bmN0aW9ucy9ncmlkLXdpZHRoXCI7XG5AaW1wb3J0IFwiZnVuY3Rpb25zL2xpbmVhci1ncmFkaWVudFwiO1xuQGltcG9ydCBcImZ1bmN0aW9ucy9tb2R1bGFyLXNjYWxlXCI7XG5AaW1wb3J0IFwiZnVuY3Rpb25zL3B4LXRvLWVtXCI7XG5AaW1wb3J0IFwiZnVuY3Rpb25zL3B4LXRvLXJlbVwiO1xuQGltcG9ydCBcImZ1bmN0aW9ucy9yYWRpYWwtZ3JhZGllbnRcIjtcbkBpbXBvcnQgXCJmdW5jdGlvbnMvc3RyaXAtdW5pdHNcIjtcbkBpbXBvcnQgXCJmdW5jdGlvbnMvdGludC1zaGFkZVwiO1xuQGltcG9ydCBcImZ1bmN0aW9ucy90cmFuc2l0aW9uLXByb3BlcnR5LW5hbWVcIjtcbkBpbXBvcnQgXCJmdW5jdGlvbnMvdW5wYWNrXCI7XG5cbi8vIENTUzMgTWl4aW5zXG5AaW1wb3J0IFwiY3NzMy9hbmltYXRpb25cIjtcbkBpbXBvcnQgXCJjc3MzL2FwcGVhcmFuY2VcIjtcbkBpbXBvcnQgXCJjc3MzL2JhY2tmYWNlLXZpc2liaWxpdHlcIjtcbkBpbXBvcnQgXCJjc3MzL2JhY2tncm91bmRcIjtcbkBpbXBvcnQgXCJjc3MzL2JhY2tncm91bmQtaW1hZ2VcIjtcbkBpbXBvcnQgXCJjc3MzL2JvcmRlci1pbWFnZVwiO1xuQGltcG9ydCBcImNzczMvYm9yZGVyLXJhZGl1c1wiO1xuQGltcG9ydCBcImNzczMvYm94LXNpemluZ1wiO1xuQGltcG9ydCBcImNzczMvY2FsY1wiO1xuQGltcG9ydCBcImNzczMvY29sdW1uc1wiO1xuQGltcG9ydCBcImNzczMvZmlsdGVyXCI7XG5AaW1wb3J0IFwiY3NzMy9mbGV4LWJveFwiO1xuQGltcG9ydCBcImNzczMvZm9udC1mYWNlXCI7XG5AaW1wb3J0IFwiY3NzMy9mb250LWZlYXR1cmUtc2V0dGluZ3NcIjtcbkBpbXBvcnQgXCJjc3MzL2h5cGhlbnNcIjtcbkBpbXBvcnQgXCJjc3MzL2hpZHBpLW1lZGlhLXF1ZXJ5XCI7XG5AaW1wb3J0IFwiY3NzMy9pbWFnZS1yZW5kZXJpbmdcIjtcbkBpbXBvcnQgXCJjc3MzL2lubGluZS1ibG9ja1wiO1xuQGltcG9ydCBcImNzczMva2V5ZnJhbWVzXCI7XG5AaW1wb3J0IFwiY3NzMy9saW5lYXItZ3JhZGllbnRcIjtcbkBpbXBvcnQgXCJjc3MzL3BlcnNwZWN0aXZlXCI7XG5AaW1wb3J0IFwiY3NzMy9yYWRpYWwtZ3JhZGllbnRcIjtcbkBpbXBvcnQgXCJjc3MzL3RyYW5zZm9ybVwiO1xuQGltcG9ydCBcImNzczMvdHJhbnNpdGlvblwiO1xuQGltcG9ydCBcImNzczMvdXNlci1zZWxlY3RcIjtcbkBpbXBvcnQgXCJjc3MzL3BsYWNlaG9sZGVyXCI7XG5cbi8vIEFkZG9ucyAmIG90aGVyIG1peGluc1xuQGltcG9ydCBcImFkZG9ucy9idXR0b25cIjtcbkBpbXBvcnQgXCJhZGRvbnMvY2xlYXJmaXhcIjtcbkBpbXBvcnQgXCJhZGRvbnMvZGlyZWN0aW9uYWwtdmFsdWVzXCI7XG5AaW1wb3J0IFwiYWRkb25zL2VsbGlwc2lzXCI7XG5AaW1wb3J0IFwiYWRkb25zL2ZvbnQtZmFtaWx5XCI7XG5AaW1wb3J0IFwiYWRkb25zL2hpZGUtdGV4dFwiO1xuQGltcG9ydCBcImFkZG9ucy9odG1sNS1pbnB1dC10eXBlc1wiO1xuQGltcG9ydCBcImFkZG9ucy9wb3NpdGlvblwiO1xuQGltcG9ydCBcImFkZG9ucy9wcmVmaXhlclwiO1xuQGltcG9ydCBcImFkZG9ucy9yZXRpbmEtaW1hZ2VcIjtcbkBpbXBvcnQgXCJhZGRvbnMvc2l6ZVwiO1xuQGltcG9ydCBcImFkZG9ucy90aW1pbmctZnVuY3Rpb25zXCI7XG5AaW1wb3J0IFwiYWRkb25zL3RyaWFuZ2xlXCI7XG5AaW1wb3J0IFwiYWRkb25zL3dvcmQtd3JhcFwiO1xuXG4vLyBTb29uIHRvIGJlIGRlcHJlY2F0ZWQgTWl4aW5zXG5AaW1wb3J0IFwiYm91cmJvbi1kZXByZWNhdGVkLXVwY29taW5nXCI7XG4iLAoJCSIvLyBWYXJpYWJsZSBzZXR0aW5ncyBmb3IgL2FkZG9ucy9wcmVmaXhlci5zY3NzXG4kcHJlZml4LWZvci13ZWJraXQ6ICAgIHRydWUgIWRlZmF1bHQ7XG4kcHJlZml4LWZvci1tb3ppbGxhOiAgIHRydWUgIWRlZmF1bHQ7XG4kcHJlZml4LWZvci1taWNyb3NvZnQ6IHRydWUgIWRlZmF1bHQ7XG4kcHJlZml4LWZvci1vcGVyYTogICAgIHRydWUgIWRlZmF1bHQ7XG4kcHJlZml4LWZvci1zcGVjOiAgICAgIHRydWUgIWRlZmF1bHQ7IC8vIHJlcXVpcmVkIGZvciBrZXlmcmFtZSBtaXhpblxuIiwKCQkiJGVtLWJhc2U6IDE2cHggIWRlZmF1bHQ7XG4iLAoJCSIkYXNzZXQtcGlwZWxpbmU6IGZhbHNlICFkZWZhdWx0O1xuIiwKCQkiQGZ1bmN0aW9uIF9ncmFkaWVudC1wb3NpdGlvbnMtcGFyc2VyKCRncmFkaWVudC10eXBlLCAkZ3JhZGllbnQtcG9zaXRpb25zKSB7XG4gIEBpZiAkZ3JhZGllbnQtcG9zaXRpb25zXG4gIGFuZCAoJGdyYWRpZW50LXR5cGUgPT0gbGluZWFyKVxuICBhbmQgKHR5cGUtb2YoJGdyYWRpZW50LXBvc2l0aW9ucykgIT0gY29sb3IpIHtcbiAgICAkZ3JhZGllbnQtcG9zaXRpb25zOiBfbGluZWFyLXBvc2l0aW9ucy1wYXJzZXIoJGdyYWRpZW50LXBvc2l0aW9ucyk7XG4gIH1cbiAgQGVsc2UgaWYgJGdyYWRpZW50LXBvc2l0aW9uc1xuICBhbmQgKCRncmFkaWVudC10eXBlID09IHJhZGlhbClcbiAgYW5kICh0eXBlLW9mKCRncmFkaWVudC1wb3NpdGlvbnMpICE9IGNvbG9yKSB7XG4gICAgJGdyYWRpZW50LXBvc2l0aW9uczogX3JhZGlhbC1wb3NpdGlvbnMtcGFyc2VyKCRncmFkaWVudC1wb3NpdGlvbnMpO1xuICB9XG4gIEByZXR1cm4gJGdyYWRpZW50LXBvc2l0aW9ucztcbn1cbiIsCgkJIkBmdW5jdGlvbiBfbGluZWFyLXBvc2l0aW9ucy1wYXJzZXIoJHBvcykge1xuICAkdHlwZTogdHlwZS1vZihudGgoJHBvcywgMSkpO1xuICAkc3BlYzogbnVsbDtcbiAgJGRlZ3JlZTogbnVsbDtcbiAgJHNpZGU6IG51bGw7XG4gICRjb3JuZXI6IG51bGw7XG4gICRsZW5ndGg6IGxlbmd0aCgkcG9zKTtcbiAgLy8gUGFyc2UgU2lkZSBhbmQgY29ybmVyIHBvc2l0aW9uc1xuICBAaWYgKCRsZW5ndGggPiAxKSB7XG4gICAgQGlmIG50aCgkcG9zLCAxKSA9PSBcInRvXCIgeyAvLyBOZXdlciBzeW50YXhcbiAgICAgICRzaWRlOiBudGgoJHBvcywgMik7XG5cbiAgICAgIEBpZiAkbGVuZ3RoID09IDIgeyAvLyBlZy4gdG8gdG9wXG4gICAgICAgIC8vIFN3YXAgZm9yIGJhY2t3YXJkcyBjb21wYXRhYmlsaXR5XG4gICAgICAgICRkZWdyZWU6IF9wb3NpdGlvbi1mbGlwcGVyKG50aCgkcG9zLCAyKSk7XG4gICAgICB9XG4gICAgICBAZWxzZSBpZiAkbGVuZ3RoID09IDMgeyAvLyBlZy4gdG8gdG9wIGxlZnRcbiAgICAgICAgJGNvcm5lcjogbnRoKCRwb3MsIDMpO1xuICAgICAgfVxuICAgIH1cbiAgICBAZWxzZSBpZiAkbGVuZ3RoID09IDIgeyAvLyBPbGRlciBzeW50YXggKFwidG9wIGxlZnRcIilcbiAgICAgICRzaWRlOiBfcG9zaXRpb24tZmxpcHBlcihudGgoJHBvcywgMSkpO1xuICAgICAgJGNvcm5lcjogX3Bvc2l0aW9uLWZsaXBwZXIobnRoKCRwb3MsIDIpKTtcbiAgICB9XG5cbiAgICBAaWYgKFwiI3skc2lkZX0gI3skY29ybmVyfVwiID09IFwibGVmdCB0b3BcIikgb3IgKFwiI3skc2lkZX0gI3skY29ybmVyfVwiID09IFwidG9wIGxlZnRcIikge1xuICAgICAgJGRlZ3JlZTogX3Bvc2l0aW9uLWZsaXBwZXIoI3skc2lkZX0pIF9wb3NpdGlvbi1mbGlwcGVyKCN7JGNvcm5lcn0pO1xuICAgIH1cbiAgICBAZWxzZSBpZiAoXCIjeyRzaWRlfSAjeyRjb3JuZXJ9XCIgPT0gXCJyaWdodCB0b3BcIikgb3IgKFwiI3skc2lkZX0gI3skY29ybmVyfVwiID09IFwidG9wIHJpZ2h0XCIpIHtcbiAgICAgICRkZWdyZWU6IF9wb3NpdGlvbi1mbGlwcGVyKCN7JHNpZGV9KSBfcG9zaXRpb24tZmxpcHBlcigjeyRjb3JuZXJ9KTtcbiAgICB9XG4gICAgQGVsc2UgaWYgKFwiI3skc2lkZX0gI3skY29ybmVyfVwiID09IFwicmlnaHQgYm90dG9tXCIpIG9yIChcIiN7JHNpZGV9ICN7JGNvcm5lcn1cIiA9PSBcImJvdHRvbSByaWdodFwiKSB7XG4gICAgICAkZGVncmVlOiBfcG9zaXRpb24tZmxpcHBlcigjeyRzaWRlfSkgX3Bvc2l0aW9uLWZsaXBwZXIoI3skY29ybmVyfSk7XG4gICAgfVxuICAgIEBlbHNlIGlmIChcIiN7JHNpZGV9ICN7JGNvcm5lcn1cIiA9PSBcImxlZnQgYm90dG9tXCIpIG9yIChcIiN7JHNpZGV9ICN7JGNvcm5lcn1cIiA9PSBcImJvdHRvbSBsZWZ0XCIpIHtcbiAgICAgICRkZWdyZWU6IF9wb3NpdGlvbi1mbGlwcGVyKCN7JHNpZGV9KSBfcG9zaXRpb24tZmxpcHBlcigjeyRjb3JuZXJ9KTtcbiAgICB9XG4gICAgJHNwZWM6IHRvICRzaWRlICRjb3JuZXI7XG4gIH1cbiAgQGVsc2UgaWYgJGxlbmd0aCA9PSAxIHtcbiAgICAvLyBTd2FwIGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eVxuICAgIEBpZiAkdHlwZSA9PSBzdHJpbmcge1xuICAgICAgJGRlZ3JlZTogJHBvcztcbiAgICAgICRzcGVjOiB0byBfcG9zaXRpb24tZmxpcHBlcigkcG9zKTtcbiAgICB9XG4gICAgQGVsc2Uge1xuICAgICAgJGRlZ3JlZTogLTI3MCAtICRwb3M7IC8vcm90YXRlIHRoZSBncmFkaWVudCBvcHBvc2l0ZSBmcm9tIHNwZWNcbiAgICAgICRzcGVjOiAkcG9zO1xuICAgIH1cbiAgfVxuICAkZGVncmVlOiB1bnF1b3RlKCRkZWdyZWUgKyBcIixcIik7XG4gICRzcGVjOiAgIHVucXVvdGUoJHNwZWMgKyBcIixcIik7XG4gIEByZXR1cm4gJGRlZ3JlZSAkc3BlYztcbn1cblxuQGZ1bmN0aW9uIF9wb3NpdGlvbi1mbGlwcGVyKCRwb3MpIHtcbiBAcmV0dXJuIGlmKCRwb3MgPT0gbGVmdCwgcmlnaHQsIG51bGwpXG4gICAgICAgICBpZigkcG9zID09IHJpZ2h0LCBsZWZ0LCBudWxsKVxuICAgICAgICAgaWYoJHBvcyA9PSB0b3AsIGJvdHRvbSwgbnVsbClcbiAgICAgICAgIGlmKCRwb3MgPT0gYm90dG9tLCB0b3AsIG51bGwpO1xufVxuIiwKCQkiQGZ1bmN0aW9uIF9yYWRpYWwtYXJnLXBhcnNlcigkRzEsICRHMiwgJHBvcywgJHNoYXBlLXNpemUpIHtcbiAgQGVhY2ggJHZhbHVlIGluICRHMSwgJEcyIHtcbiAgICAkZmlyc3QtdmFsOiBudGgoJHZhbHVlLCAxKTtcbiAgICAkcG9zLXR5cGU6ICB0eXBlLW9mKCRmaXJzdC12YWwpO1xuICAgICRzcGVjLWF0LWluZGV4OiBudWxsO1xuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHNwZWMgd2FzIHBhc3NlZCB0byBtaXhpblxuICAgIEBpZiB0eXBlLW9mKCR2YWx1ZSkgPT0gbGlzdCB7XG4gICAgICAkc3BlYy1hdC1pbmRleDogaWYoaW5kZXgoJHZhbHVlLCBhdCksIGluZGV4KCR2YWx1ZSwgYXQpLCBmYWxzZSk7XG4gICAgfVxuICAgIEBpZiAkc3BlYy1hdC1pbmRleCB7XG4gICAgICBAaWYgJHNwZWMtYXQtaW5kZXggPiAxIHtcbiAgICAgICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAoJHNwZWMtYXQtaW5kZXggLSAxKSB7XG4gICAgICAgICAgJHNoYXBlLXNpemU6ICRzaGFwZS1zaXplIG50aCgkdmFsdWUsICRpKTtcbiAgICAgICAgfVxuICAgICAgICBAZm9yICRpIGZyb20gKCRzcGVjLWF0LWluZGV4ICsgMSkgdGhyb3VnaCBsZW5ndGgoJHZhbHVlKSB7XG4gICAgICAgICAgJHBvczogJHBvcyBudGgoJHZhbHVlLCAkaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEBlbHNlIGlmICRzcGVjLWF0LWluZGV4ID09IDEge1xuICAgICAgICBAZm9yICRpIGZyb20gKCRzcGVjLWF0LWluZGV4ICsgMSkgdGhyb3VnaCBsZW5ndGgoJHZhbHVlKSB7XG4gICAgICAgICAgJHBvczogJHBvcyBudGgoJHZhbHVlLCAkaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICRHMTogbnVsbDtcbiAgICB9XG5cbiAgICAvLyBJZiBub3Qgc3BlYyBjYWxjdWxhdGUgY29ycmVjdCB2YWx1ZXNcbiAgICBAZWxzZSB7XG4gICAgICBAaWYgKCRwb3MtdHlwZSAhPSBjb2xvcikgb3IgKCRmaXJzdC12YWwgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgIEBpZiAoJHBvcy10eXBlID09IG51bWJlcilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJjZW50ZXJcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJ0b3BcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJyaWdodFwiKVxuICAgICAgICBvciAoJGZpcnN0LXZhbCA9PSBcImJvdHRvbVwiKVxuICAgICAgICBvciAoJGZpcnN0LXZhbCA9PSBcImxlZnRcIikge1xuXG4gICAgICAgICAgJHBvczogJHZhbHVlO1xuXG4gICAgICAgICAgQGlmICRwb3MgPT0gJEcxIHtcbiAgICAgICAgICAgICRHMTogbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBAZWxzZSBpZlxuICAgICAgICAgICAoJGZpcnN0LXZhbCA9PSBcImVsbGlwc2VcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJjaXJjbGVcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJjbG9zZXN0LXNpZGVcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJjbG9zZXN0LWNvcm5lclwiKVxuICAgICAgICBvciAoJGZpcnN0LXZhbCA9PSBcImZhcnRoZXN0LXNpZGVcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJmYXJ0aGVzdC1jb3JuZXJcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJjb250YWluXCIpXG4gICAgICAgIG9yICgkZmlyc3QtdmFsID09IFwiY292ZXJcIikge1xuXG4gICAgICAgICAgJHNoYXBlLXNpemU6ICR2YWx1ZTtcblxuICAgICAgICAgIEBpZiAkdmFsdWUgPT0gJEcxIHtcbiAgICAgICAgICAgICRHMTogbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBAZWxzZSBpZiAkdmFsdWUgPT0gJEcyIHtcbiAgICAgICAgICAgICRHMjogbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgQHJldHVybiAkRzEsICRHMiwgJHBvcywgJHNoYXBlLXNpemU7XG59XG4iLAoJCSJAZnVuY3Rpb24gX3JhZGlhbC1wb3NpdGlvbnMtcGFyc2VyKCRncmFkaWVudC1wb3MpIHtcbiAgJHNoYXBlLXNpemU6IG50aCgkZ3JhZGllbnQtcG9zLCAxKTtcbiAgJHBvczogICAgICAgIG50aCgkZ3JhZGllbnQtcG9zLCAyKTtcbiAgJHNoYXBlLXNpemUtc3BlYzogX3NoYXBlLXNpemUtc3RyaXBwZXIoJHNoYXBlLXNpemUpO1xuXG4gICRwcmUtc3BlYzogdW5xdW90ZShpZigkcG9zLCBcIiN7JHBvc30sIFwiLCBudWxsKSlcbiAgICAgICAgICAgICB1bnF1b3RlKGlmKCRzaGFwZS1zaXplLCBcIiN7JHNoYXBlLXNpemV9LFwiLCBudWxsKSk7XG4gICRwb3Mtc3BlYzogaWYoJHBvcywgXCJhdCAjeyRwb3N9XCIsIG51bGwpO1xuXG4gICRzcGVjOiBcIiN7JHNoYXBlLXNpemUtc3BlY30gI3skcG9zLXNwZWN9XCI7XG5cbiAgLy8gQWRkIGNvbW1hXG4gIEBpZiAoJHNwZWMgIT0gJyAgJykge1xuICAgICRzcGVjOiBcIiN7JHNwZWN9LFwiXG4gIH1cblxuICBAcmV0dXJuICRwcmUtc3BlYyAkc3BlYztcbn1cbiIsCgkJIi8vIFVzZXIgZm9yIGxpbmVhciBhbmQgcmFkaWFsIGdyYWRpZW50cyB3aXRoaW4gYmFja2dyb3VuZC1pbWFnZSBvciBib3JkZXItaW1hZ2UgcHJvcGVydGllc1xuXG5AZnVuY3Rpb24gX3JlbmRlci1ncmFkaWVudHMoJGdyYWRpZW50LXBvc2l0aW9ucywgJGdyYWRpZW50cywgJGdyYWRpZW50LXR5cGUsICR2ZW5kb3I6IGZhbHNlKSB7XG4gICRwcmUtc3BlYzogbnVsbDtcbiAgJHNwZWM6IG51bGw7XG4gICR2ZW5kb3ItZ3JhZGllbnRzOiBudWxsO1xuICBAaWYgJGdyYWRpZW50LXR5cGUgPT0gbGluZWFyIHtcbiAgICBAaWYgJGdyYWRpZW50LXBvc2l0aW9ucyB7XG4gICAgICAkcHJlLXNwZWM6IG50aCgkZ3JhZGllbnQtcG9zaXRpb25zLCAxKTtcbiAgICAgICRzcGVjOiAgICAgbnRoKCRncmFkaWVudC1wb3NpdGlvbnMsIDIpO1xuICAgIH1cbiAgfVxuICBAZWxzZSBpZiAkZ3JhZGllbnQtdHlwZSA9PSByYWRpYWwge1xuICAgICRwcmUtc3BlYzogbnRoKCRncmFkaWVudC1wb3NpdGlvbnMsIDEpO1xuICAgICRzcGVjOiAgICAgbnRoKCRncmFkaWVudC1wb3NpdGlvbnMsIDIpO1xuICB9XG5cbiAgQGlmICR2ZW5kb3Ige1xuICAgICR2ZW5kb3ItZ3JhZGllbnRzOiAtI3skdmVuZG9yfS0jeyRncmFkaWVudC10eXBlfS1ncmFkaWVudCgjeyRwcmUtc3BlY30gJGdyYWRpZW50cyk7XG4gIH1cbiAgQGVsc2UgaWYgJHZlbmRvciA9PSBmYWxzZSB7XG4gICAgJHZlbmRvci1ncmFkaWVudHM6IFwiI3skZ3JhZGllbnQtdHlwZX0tZ3JhZGllbnQoI3skc3BlY30gI3skZ3JhZGllbnRzfSlcIjtcbiAgICAkdmVuZG9yLWdyYWRpZW50czogdW5xdW90ZSgkdmVuZG9yLWdyYWRpZW50cyk7XG4gIH1cbiAgQHJldHVybiAkdmVuZG9yLWdyYWRpZW50cztcbn1cbiIsCgkJIkBmdW5jdGlvbiBfc2hhcGUtc2l6ZS1zdHJpcHBlcigkc2hhcGUtc2l6ZSkge1xuICAkc2hhcGUtc2l6ZS1zcGVjOiBudWxsO1xuICBAZWFjaCAkdmFsdWUgaW4gJHNoYXBlLXNpemUge1xuICAgIEBpZiAoJHZhbHVlID09IFwiY292ZXJcIikgb3IgKCR2YWx1ZSA9PSBcImNvbnRhaW5cIikge1xuICAgICAgJHZhbHVlOiBudWxsO1xuICAgIH1cbiAgICAkc2hhcGUtc2l6ZS1zcGVjOiBcIiN7JHNoYXBlLXNpemUtc3BlY30gI3skdmFsdWV9XCI7XG4gIH1cbiAgQHJldHVybiAkc2hhcGUtc2l6ZS1zcGVjO1xufVxuIiwKCQkiLy8gUHJvZ3JhbWF0aWNhbGx5IGRldGVybWluZXMgd2hldGhlciBhIGNvbG9yIGlzIGxpZ2h0IG9yIGRhcmtcbi8vIFJldHVybnMgYSBib29sZWFuXG4vLyBNb3JlIGRldGFpbHMgaGVyZSBodHRwOi8vcm9ib3RzLnRob3VnaHRib3QuY29tL2Nsb3Nlci1sb29rLWNvbG9yLWxpZ2h0bmVzc1xuXG5AZnVuY3Rpb24gaXMtbGlnaHQoJGhleC1jb2xvcikge1xuICAkLWxvY2FsLXJlZDogcmVkKHJnYmEoJGhleC1jb2xvciwgMS4wKSk7XG4gICQtbG9jYWwtZ3JlZW46IGdyZWVuKHJnYmEoJGhleC1jb2xvciwgMS4wKSk7XG4gICQtbG9jYWwtYmx1ZTogYmx1ZShyZ2JhKCRoZXgtY29sb3IsIDEuMCkpO1xuXG4gICQtbG9jYWwtbGlnaHRuZXNzOiAoJC1sb2NhbC1yZWQgKiAwLjIxMjYgKyAkLWxvY2FsLWdyZWVuICogMC43MTUyICsgJC1sb2NhbC1ibHVlICogMC4wNzIyKSAvIDI1NTtcblxuICBAcmV0dXJuICQtbG9jYWwtbGlnaHRuZXNzID4gLjY7XG59XG4iLAoJCSIvLyBGbGV4aWJsZSBncmlkXG5AZnVuY3Rpb24gZmxleC1ncmlkKCRjb2x1bW5zLCAkY29udGFpbmVyLWNvbHVtbnM6ICRmZy1tYXgtY29sdW1ucykge1xuICAkd2lkdGg6ICRjb2x1bW5zICogJGZnLWNvbHVtbiArICgkY29sdW1ucyAtIDEpICogJGZnLWd1dHRlcjtcbiAgJGNvbnRhaW5lci13aWR0aDogJGNvbnRhaW5lci1jb2x1bW5zICogJGZnLWNvbHVtbiArICgkY29udGFpbmVyLWNvbHVtbnMgLSAxKSAqICRmZy1ndXR0ZXI7XG4gIEByZXR1cm4gcGVyY2VudGFnZSgkd2lkdGggLyAkY29udGFpbmVyLXdpZHRoKTtcbn1cblxuLy8gRmxleGlibGUgZ3V0dGVyXG5AZnVuY3Rpb24gZmxleC1ndXR0ZXIoJGNvbnRhaW5lci1jb2x1bW5zOiAkZmctbWF4LWNvbHVtbnMsICRndXR0ZXI6ICRmZy1ndXR0ZXIpIHtcbiAgJGNvbnRhaW5lci13aWR0aDogJGNvbnRhaW5lci1jb2x1bW5zICogJGZnLWNvbHVtbiArICgkY29udGFpbmVyLWNvbHVtbnMgLSAxKSAqICRmZy1ndXR0ZXI7XG4gIEByZXR1cm4gcGVyY2VudGFnZSgkZ3V0dGVyIC8gJGNvbnRhaW5lci13aWR0aCk7XG59XG5cbi8vIFRoZSAkZmctY29sdW1uLCAkZmctZ3V0dGVyIGFuZCAkZmctbWF4LWNvbHVtbnMgdmFyaWFibGVzIG11c3QgYmUgZGVmaW5lZCBpbiB5b3VyIGJhc2Ugc3R5bGVzaGVldCB0byBwcm9wZXJseSB1c2UgdGhlIGZsZXgtZ3JpZCBmdW5jdGlvbi5cbi8vIFRoaXMgZnVuY3Rpb24gdGFrZXMgdGhlIGZsdWlkIGdyaWQgZXF1YXRpb24gKHRhcmdldCAvIGNvbnRleHQgPSByZXN1bHQpIGFuZCB1c2VzIGNvbHVtbnMgdG8gaGVscCBkZWZpbmUgZWFjaC5cbi8vXG4vLyBUaGUgY2FsY3VsYXRpb24gcHJlc3VtZXMgdGhhdCB5b3VyIGNvbHVtbiBzdHJ1Y3R1cmUgd2lsbCBiZSBtaXNzaW5nIHRoZSBsYXN0IGd1dHRlcjpcbi8vXG4vLyAgIC0tIGNvbHVtbiAtLSBndXR0ZXIgLS0gY29sdW1uIC0tIGd1dHRlciAtLSBjb2x1bW5cbi8vXG4vLyAgJGZnLWNvbHVtbjogNjBweDsgICAgICAgICAgICAgLy8gQ29sdW1uIFdpZHRoXG4vLyAgJGZnLWd1dHRlcjogMjVweDsgICAgICAgICAgICAgLy8gR3V0dGVyIFdpZHRoXG4vLyAgJGZnLW1heC1jb2x1bW5zOiAxMjsgICAgICAgICAgLy8gVG90YWwgQ29sdW1ucyBGb3IgTWFpbiBDb250YWluZXJcbi8vXG4vLyAgZGl2IHtcbi8vICAgIHdpZHRoOiBmbGV4LWdyaWQoNCk7ICAgICAgICAvLyByZXR1cm5zICgzMTVweCAvIDk5NXB4KSA9IDMxLjY1ODI5JTtcbi8vICAgIG1hcmdpbi1sZWZ0OiBmbGV4LWd1dHRlcigpOyAvLyByZXR1cm5zICgyNXB4IC8gOTk1cHgpID0gMi41MTI1NiU7XG4vL1xuLy8gICAgcCB7XG4vLyAgICAgIHdpZHRoOiBmbGV4LWdyaWQoMiwgNCk7ICAvLyByZXR1cm5zICgxNDVweCAvIDMxNXB4KSA9IDQ2LjAzMTc0NiU7XG4vLyAgICAgIGZsb2F0OiBsZWZ0O1xuLy8gICAgICBtYXJnaW46IGZsZXgtZ3V0dGVyKDQpOyAgLy8gcmV0dXJucyAoMjVweCAvIDMxNXB4KSA9IDcuOTM2NTA4JTtcbi8vICAgIH1cbi8vXG4vLyAgICBibG9ja3F1b3RlIHtcbi8vICAgICAgZmxvYXQ6IGxlZnQ7XG4vLyAgICAgIHdpZHRoOiBmbGV4LWdyaWQoMiwgNCk7IC8vIHJldHVybnMgKDE0NXB4IC8gMzE1cHgpID0gNDYuMDMxNzQ2JTtcbi8vICAgIH1cbi8vICB9IiwKCQkiQGZ1bmN0aW9uIGdvbGRlbi1yYXRpbygkdmFsdWUsICRpbmNyZW1lbnQpIHtcbiAgQHJldHVybiBtb2R1bGFyLXNjYWxlKCR2YWx1ZSwgJGluY3JlbWVudCwgJGdvbGRlbilcbn1cbiIsCgkJIkBmdW5jdGlvbiBncmlkLXdpZHRoKCRuKSB7XG4gIEByZXR1cm4gJG4gKiAkZ3ctY29sdW1uICsgKCRuIC0gMSkgKiAkZ3ctZ3V0dGVyO1xufVxuXG4vLyBUaGUgJGd3LWNvbHVtbiBhbmQgJGd3LWd1dHRlciB2YXJpYWJsZXMgbXVzdCBiZSBkZWZpbmVkIGluIHlvdXIgYmFzZSBzdHlsZXNoZWV0IHRvIHByb3Blcmx5IHVzZSB0aGUgZ3JpZC13aWR0aCBmdW5jdGlvbi5cbi8vXG4vLyAgJGd3LWNvbHVtbjogMTAwcHg7ICAgICAgICAgLy8gQ29sdW1uIFdpZHRoXG4vLyAgJGd3LWd1dHRlcjogNDBweDsgICAgICAgICAgLy8gR3V0dGVyIFdpZHRoXG4vL1xuLy8gIGRpdiB7XG4vLyAgICB3aWR0aDogZ3JpZC13aWR0aCg0KTsgICAgLy8gcmV0dXJucyA1MjBweDtcbi8vICAgIG1hcmdpbi1sZWZ0OiAkZ3ctZ3V0dGVyOyAvLyByZXR1cm5zIDQwcHg7XG4vLyAgfVxuIiwKCQkiQGZ1bmN0aW9uIGxpbmVhci1ncmFkaWVudCgkcG9zLCAkZ3JhZGllbnRzLi4uKSB7XG4gICR0eXBlOiBsaW5lYXI7XG4gICRwb3MtdHlwZTogdHlwZS1vZihudGgoJHBvcywgMSkpO1xuXG4gIC8vIGlmICRwb3MgZG9lc24ndCBleGlzdCwgZml4ICRncmFkaWVudFxuICBAaWYgKCRwb3MtdHlwZSA9PSBjb2xvcikgb3IgKG50aCgkcG9zLCAxKSA9PSBcInRyYW5zcGFyZW50XCIpICB7XG4gICAgJGdyYWRpZW50czogemlwKCRwb3MgJGdyYWRpZW50cyk7XG4gICAgJHBvczogZmFsc2U7XG4gIH1cblxuICAkdHlwZS1ncmFkaWVudDogJHR5cGUsICRwb3MsICRncmFkaWVudHM7XG4gIEByZXR1cm4gJHR5cGUtZ3JhZGllbnQ7XG59XG4iLAoJCSIvLyBTY2FsaW5nIFZhcmlhYmxlc1xuJGdvbGRlbjogICAgICAgICAgIDEuNjE4O1xuJG1pbm9yLXNlY29uZDogICAgIDEuMDY3O1xuJG1ham9yLXNlY29uZDogICAgIDEuMTI1O1xuJG1pbm9yLXRoaXJkOiAgICAgIDEuMjtcbiRtYWpvci10aGlyZDogICAgICAxLjI1O1xuJHBlcmZlY3QtZm91cnRoOiAgIDEuMzMzO1xuJGF1Z21lbnRlZC1mb3VydGg6IDEuNDE0O1xuJHBlcmZlY3QtZmlmdGg6ICAgIDEuNTtcbiRtaW5vci1zaXh0aDogICAgICAxLjY7XG4kbWFqb3Itc2l4dGg6ICAgICAgMS42Njc7XG4kbWlub3Itc2V2ZW50aDogICAgMS43Nzg7XG4kbWFqb3Itc2V2ZW50aDogICAgMS44NzU7XG4kb2N0YXZlOiAgICAgICAgICAgMjtcbiRtYWpvci10ZW50aDogICAgICAyLjU7XG4kbWFqb3ItZWxldmVudGg6ICAgMi42Njc7XG4kbWFqb3ItdHdlbGZ0aDogICAgMztcbiRkb3VibGUtb2N0YXZlOiAgICA0O1xuXG5AZnVuY3Rpb24gbW9kdWxhci1zY2FsZSgkdmFsdWUsICRpbmNyZW1lbnQsICRyYXRpbykge1xuICAkdjE6IG50aCgkdmFsdWUsIDEpO1xuICAkdjI6IG50aCgkdmFsdWUsIGxlbmd0aCgkdmFsdWUpKTtcbiAgJHZhbHVlOiAkdjE7XG5cbiAgLy8gc2NhbGUgJHYyIHRvIGp1c3QgYWJvdmUgJHYxXG4gIEB3aGlsZSAkdjIgPiAkdjEge1xuICAgICR2MjogKCR2MiAvICRyYXRpbyk7IC8vIHdpbGwgYmUgb2ZmLWJ5LTFcbiAgfVxuICBAd2hpbGUgJHYyIDwgJHYxIHtcbiAgICAkdjI6ICgkdjIgKiAkcmF0aW8pOyAvLyB3aWxsIGZpeCBvZmYtYnktMVxuICB9XG5cbiAgLy8gY2hlY2sgQUZURVIgc2NhbGluZyAkdjIgdG8gcHJldmVudCBkb3VibGUtY291bnRpbmcgY29ybmVyLWNhc2VcbiAgJGRvdWJsZS1zdHJhbmRlZDogJHYyID4gJHYxO1xuXG4gIEBpZiAkaW5jcmVtZW50ID4gMCB7XG4gICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAkaW5jcmVtZW50IHtcbiAgICAgIEBpZiAkZG91YmxlLXN0cmFuZGVkIGFuZCAoJHYxICogJHJhdGlvKSA+ICR2MiB7XG4gICAgICAgICR2YWx1ZTogJHYyO1xuICAgICAgICAkdjI6ICgkdjIgKiAkcmF0aW8pO1xuICAgICAgfSBAZWxzZSB7XG4gICAgICAgICR2MTogKCR2MSAqICRyYXRpbyk7XG4gICAgICAgICR2YWx1ZTogJHYxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBpZiAkaW5jcmVtZW50IDwgMCB7XG4gICAgLy8gYWRqdXN0ICR2MiB0byBqdXN0IGJlbG93ICR2MVxuICAgIEBpZiAkZG91YmxlLXN0cmFuZGVkIHtcbiAgICAgICR2MjogKCR2MiAvICRyYXRpbyk7XG4gICAgfVxuXG4gICAgQGZvciAkaSBmcm9tICRpbmNyZW1lbnQgdGhyb3VnaCAtMSB7XG4gICAgICBAaWYgJGRvdWJsZS1zdHJhbmRlZCBhbmQgKCR2MSAvICRyYXRpbykgPCAkdjIge1xuICAgICAgICAkdmFsdWU6ICR2MjtcbiAgICAgICAgJHYyOiAoJHYyIC8gJHJhdGlvKTtcbiAgICAgIH0gQGVsc2Uge1xuICAgICAgICAkdjE6ICgkdjEgLyAkcmF0aW8pO1xuICAgICAgICAkdmFsdWU6ICR2MTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBAcmV0dXJuICR2YWx1ZTtcbn1cbiIsCgkJIi8vIENvbnZlcnQgcGl4ZWxzIHRvIGVtc1xuLy8gZWcuIGZvciBhIHJlbGF0aW9uYWwgdmFsdWUgb2YgMTJweCB3cml0ZSBlbSgxMikgd2hlbiB0aGUgcGFyZW50IGlzIDE2cHhcbi8vIGlmIHRoZSBwYXJlbnQgaXMgYW5vdGhlciB2YWx1ZSBzYXkgMjRweCB3cml0ZSBlbSgxMiwgMjQpXG5cbkBmdW5jdGlvbiBlbSgkcHh2YWwsICRiYXNlOiAkZW0tYmFzZSkge1xuICBAaWYgbm90IHVuaXRsZXNzKCRweHZhbCkge1xuICAgICAgJHB4dmFsOiBzdHJpcC11bml0cygkcHh2YWwpO1xuICB9XG4gIEBpZiBub3QgdW5pdGxlc3MoJGJhc2UpIHtcbiAgICAgICRiYXNlOiBzdHJpcC11bml0cygkYmFzZSk7XG4gIH1cbiAgQHJldHVybiAoJHB4dmFsIC8gJGJhc2UpICogMWVtO1xufVxuIiwKCQkiLy8gQ29udmVydCBwaXhlbHMgdG8gcmVtc1xuLy8gZWcuIGZvciBhIHJlbGF0aW9uYWwgdmFsdWUgb2YgMTJweCB3cml0ZSByZW0oMTIpXG4vLyBBc3N1bWVzICRlbS1iYXNlIGlzIHRoZSBmb250LXNpemUgb2YgPGh0bWw+XG5cbkBmdW5jdGlvbiByZW0oJHB4dmFsKSB7XG4gIEBpZiBub3QgdW5pdGxlc3MoJHB4dmFsKSB7XG4gICAgICAkcHh2YWw6IHN0cmlwLXVuaXRzKCRweHZhbCk7XG4gIH1cblxuICAkYmFzZTogJGVtLWJhc2U7XG4gIEBpZiBub3QgdW5pdGxlc3MoJGJhc2UpIHtcbiAgICAgICRiYXNlOiBzdHJpcC11bml0cygkYmFzZSk7XG4gIH1cbiAgQHJldHVybiAoJHB4dmFsIC8gJGJhc2UpICogMXJlbTtcbn1cbiIsCgkJIi8vIFRoaXMgZnVuY3Rpb24gaXMgcmVxdWlyZWQgYW5kIHVzZWQgYnkgdGhlIGJhY2tncm91bmQtaW1hZ2UgbWl4aW4uXG5AZnVuY3Rpb24gcmFkaWFsLWdyYWRpZW50KCRHMSwgICAgICAgICRHMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJEczOiBudWxsLCAgJEc0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAkRzU6IG51bGwsICAkRzY6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICRHNzogbnVsbCwgICRHODogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJEc5OiBudWxsLCAgJEcxMDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJHBvczogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJHNoYXBlLXNpemU6IG51bGwpIHtcblxuICAkZGF0YTogX3JhZGlhbC1hcmctcGFyc2VyKCRHMSwgJEcyLCAkcG9zLCAkc2hhcGUtc2l6ZSk7XG4gICRHMTogIG50aCgkZGF0YSwgMSk7XG4gICRHMjogIG50aCgkZGF0YSwgMik7XG4gICRwb3M6IG50aCgkZGF0YSwgMyk7XG4gICRzaGFwZS1zaXplOiBudGgoJGRhdGEsIDQpO1xuXG4gICR0eXBlOiByYWRpYWw7XG4gICRncmFkaWVudDogJEcxLCAkRzIsICRHMywgJEc0LCAkRzUsICRHNiwgJEc3LCAkRzgsICRHOSwgJEcxMDtcblxuICAkdHlwZS1ncmFkaWVudDogJHR5cGUsICRzaGFwZS1zaXplICRwb3MsICRncmFkaWVudDtcbiAgQHJldHVybiAkdHlwZS1ncmFkaWVudDtcbn1cblxuXG4iLAoJCSIvLyBTcnRpcHMgdGhlIHVuaXRzIGZyb20gYSB2YWx1ZS4gZS5nLiAxMnB4IC0+IDEyXG5cbkBmdW5jdGlvbiBzdHJpcC11bml0cygkdmFsKSB7XG4gIEByZXR1cm4gKCR2YWwgLyAoJHZhbCAqIDAgKyAxKSk7XG59XG4iLAoJCSIvLyBBZGQgcGVyY2VudGFnZSBvZiB3aGl0ZSB0byBhIGNvbG9yXG5AZnVuY3Rpb24gdGludCgkY29sb3IsICRwZXJjZW50KXtcbiAgQHJldHVybiBtaXgod2hpdGUsICRjb2xvciwgJHBlcmNlbnQpO1xufVxuXG4vLyBBZGQgcGVyY2VudGFnZSBvZiBibGFjayB0byBhIGNvbG9yXG5AZnVuY3Rpb24gc2hhZGUoJGNvbG9yLCAkcGVyY2VudCl7XG4gIEByZXR1cm4gbWl4KGJsYWNrLCAkY29sb3IsICRwZXJjZW50KTtcbn1cbiIsCgkJIi8vIFJldHVybiB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgbmFtZXMgaWYgYXBwcm9wcmlhdGVcbi8vIEV4YW1wbGU6IHRyYW5zaXRpb24tcHJvcGVydHktbmFtZXMoKHRyYW5zZm9ybSwgY29sb3IsIGJhY2tncm91bmQpLCBtb3opIC0+IC1tb3otdHJhbnNmb3JtLCBjb2xvciwgYmFja2dyb3VuZFxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuQGZ1bmN0aW9uIHRyYW5zaXRpb24tcHJvcGVydHktbmFtZXMoJHByb3BzLCAkdmVuZG9yOiBmYWxzZSkge1xuXHQkbmV3LXByb3BzOiAoKTtcblx0XG5cdEBlYWNoICRwcm9wIGluICRwcm9wcyB7XG5cdFx0JG5ldy1wcm9wczogYXBwZW5kKCRuZXctcHJvcHMsIHRyYW5zaXRpb24tcHJvcGVydHktbmFtZSgkcHJvcCwgJHZlbmRvciksIGNvbW1hKTtcblx0fVxuXG5cdEByZXR1cm4gJG5ldy1wcm9wcztcbn1cblxuQGZ1bmN0aW9uIHRyYW5zaXRpb24tcHJvcGVydHktbmFtZSgkcHJvcCwgJHZlbmRvcjogZmFsc2UpIHtcblx0Ly8gcHV0IG90aGVyIHByb3BlcnRpZXMgdGhhdCBuZWVkIHRvIGJlIHByZWZpeGVkIGhlcmUgYXN3ZWxsXG5cdEBpZiAkdmVuZG9yIGFuZCAkcHJvcCA9PSB0cmFuc2Zvcm0ge1xuXHRcdEByZXR1cm4gdW5xdW90ZSgnLScrJHZlbmRvcisnLScrJHByb3ApO1xuXHR9XG5cdEBlbHNlIHtcblx0XHRAcmV0dXJuICRwcm9wO1xuXHR9XG59IiwKCQkiLy8gQ29udmVydCBzaG9ydGhhbmQgdG8gdGhlIDQtdmFsdWUgc3ludGF4XG5cbkBmdW5jdGlvbiB1bnBhY2soJHNob3J0aGFuZCkge1xuICBAaWYgbGVuZ3RoKCRzaG9ydGhhbmQpID09IDEge1xuICAgIEByZXR1cm4gbnRoKCRzaG9ydGhhbmQsIDEpIG50aCgkc2hvcnRoYW5kLCAxKSBudGgoJHNob3J0aGFuZCwgMSkgbnRoKCRzaG9ydGhhbmQsIDEpO1xuICB9XG4gIEBlbHNlIGlmIGxlbmd0aCgkc2hvcnRoYW5kKSA9PSAyIHtcbiAgICBAcmV0dXJuIG50aCgkc2hvcnRoYW5kLCAxKSBudGgoJHNob3J0aGFuZCwgMikgbnRoKCRzaG9ydGhhbmQsIDEpIG50aCgkc2hvcnRoYW5kLCAyKTtcbiAgfVxuICBAZWxzZSBpZiBsZW5ndGgoJHNob3J0aGFuZCkgPT0gMyB7XG4gICAgQHJldHVybiBudGgoJHNob3J0aGFuZCwgMSkgbnRoKCRzaG9ydGhhbmQsIDIpIG50aCgkc2hvcnRoYW5kLCAzKSBudGgoJHNob3J0aGFuZCwgMik7XG4gIH1cbiAgQGVsc2Uge1xuICAgIEByZXR1cm4gJHNob3J0aGFuZDtcbiAgfVxufVxuXG4iLAoJCSIvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLWFuaW1hdGlvbnMvI3RoZS1hbmltYXRpb24tbmFtZS1wcm9wZXJ0eS1cbi8vIEVhY2ggb2YgdGhlc2UgbWl4aW5zIHN1cHBvcnQgY29tbWEgc2VwYXJhdGVkIGxpc3RzIG9mIHZhbHVlcywgd2hpY2ggYWxsb3dzIGRpZmZlcmVudCB0cmFuc2l0aW9ucyBmb3IgaW5kaXZpZHVhbCBwcm9wZXJ0aWVzIHRvIGJlIGRlc2NyaWJlZCBpbiBhIHNpbmdsZSBzdHlsZSBydWxlLiBFYWNoIHZhbHVlIGluIHRoZSBsaXN0IGNvcnJlc3BvbmRzIHRvIHRoZSB2YWx1ZSBhdCB0aGF0IHNhbWUgcG9zaXRpb24gaW4gdGhlIG90aGVyIHByb3BlcnRpZXMuXG5cbi8vIE9mZmljaWFsIGFuaW1hdGlvbiBzaG9ydGhhbmQgcHJvcGVydHkuXG5AbWl4aW4gYW5pbWF0aW9uICgkYW5pbWF0aW9ucy4uLikge1xuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24sICRhbmltYXRpb25zLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG4vLyBJbmRpdmlkdWFsIEFuaW1hdGlvbiBQcm9wZXJ0aWVzXG5AbWl4aW4gYW5pbWF0aW9uLW5hbWUgKCRuYW1lcy4uLikge1xuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24tbmFtZSwgJG5hbWVzLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5cbkBtaXhpbiBhbmltYXRpb24tZHVyYXRpb24gKCR0aW1lcy4uLikge1xuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24tZHVyYXRpb24sICR0aW1lcywgd2Via2l0IG1veiBzcGVjKTtcbn1cblxuXG5AbWl4aW4gYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbiAoJG1vdGlvbnMuLi4pIHtcbi8vIGVhc2UgfCBsaW5lYXIgfCBlYXNlLWluIHwgZWFzZS1vdXQgfCBlYXNlLWluLW91dFxuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uLCAkbW90aW9ucywgd2Via2l0IG1veiBzcGVjKTtcbn1cblxuXG5AbWl4aW4gYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCAoJHZhbHVlcy4uLikge1xuLy8gaW5maW5pdGUgfCA8bnVtYmVyPlxuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24taXRlcmF0aW9uLWNvdW50LCAkdmFsdWVzLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5cbkBtaXhpbiBhbmltYXRpb24tZGlyZWN0aW9uICgkZGlyZWN0aW9ucy4uLikge1xuLy8gbm9ybWFsIHwgYWx0ZXJuYXRlXG4gIEBpbmNsdWRlIHByZWZpeGVyKGFuaW1hdGlvbi1kaXJlY3Rpb24sICRkaXJlY3Rpb25zLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5cbkBtaXhpbiBhbmltYXRpb24tcGxheS1zdGF0ZSAoJHN0YXRlcy4uLikge1xuLy8gcnVubmluZyB8IHBhdXNlZFxuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24tcGxheS1zdGF0ZSwgJHN0YXRlcywgd2Via2l0IG1veiBzcGVjKTtcbn1cblxuXG5AbWl4aW4gYW5pbWF0aW9uLWRlbGF5ICgkdGltZXMuLi4pIHtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYW5pbWF0aW9uLWRlbGF5LCAkdGltZXMsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cblxuQG1peGluIGFuaW1hdGlvbi1maWxsLW1vZGUgKCRtb2Rlcy4uLikge1xuLy8gbm9uZSB8IGZvcndhcmRzIHwgYmFja3dhcmRzIHwgYm90aFxuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24tZmlsbC1tb2RlLCAkbW9kZXMsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG4iLAoJCSJAbWl4aW4gYXBwZWFyYW5jZSAoJHZhbHVlKSB7XG4gIEBpbmNsdWRlIHByZWZpeGVyKGFwcGVhcmFuY2UsICR2YWx1ZSwgd2Via2l0IG1veiBtcyBvIHNwZWMpO1xufVxuIiwKCQkiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuLy8gQmFja2ZhY2UtdmlzaWJpbGl0eSBtaXhpblxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuQG1peGluIGJhY2tmYWNlLXZpc2liaWxpdHkoJHZpc2liaWxpdHkpIHtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYmFja2ZhY2UtdmlzaWJpbGl0eSwgJHZpc2liaWxpdHksIHdlYmtpdCBzcGVjKTtcbn1cbiIsCgkJIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vIEJhY2tncm91bmQgcHJvcGVydHkgZm9yIGFkZGluZyBtdWx0aXBsZSBiYWNrZ3JvdW5kcyB1c2luZyBzaG9ydGhhbmRcbi8vIG5vdGF0aW9uLlxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuXG5AbWl4aW4gYmFja2dyb3VuZChcbiAgJGJhY2tncm91bmQtMSAgICAgICAsICRiYWNrZ3JvdW5kLTI6IG51bGwsXG4gICRiYWNrZ3JvdW5kLTM6IG51bGwsICRiYWNrZ3JvdW5kLTQ6IG51bGwsXG4gICRiYWNrZ3JvdW5kLTU6IG51bGwsICRiYWNrZ3JvdW5kLTY6IG51bGwsXG4gICRiYWNrZ3JvdW5kLTc6IG51bGwsICRiYWNrZ3JvdW5kLTg6IG51bGwsXG4gICRiYWNrZ3JvdW5kLTk6IG51bGwsICRiYWNrZ3JvdW5kLTEwOiBudWxsLFxuICAkZmFsbGJhY2s6IG51bGxcbikge1xuICAkYmFja2dyb3VuZHM6ICRiYWNrZ3JvdW5kLTEsICRiYWNrZ3JvdW5kLTIsXG4gICAgICAgICAgICAgICAgJGJhY2tncm91bmQtMywgJGJhY2tncm91bmQtNCxcbiAgICAgICAgICAgICAgICAkYmFja2dyb3VuZC01LCAkYmFja2dyb3VuZC02LFxuICAgICAgICAgICAgICAgICRiYWNrZ3JvdW5kLTcsICRiYWNrZ3JvdW5kLTgsXG4gICAgICAgICAgICAgICAgJGJhY2tncm91bmQtOSwgJGJhY2tncm91bmQtMTA7XG5cbiAgJGZhbGxiYWNrLWNvbG9yOiBmYWxzZTtcbiAgQGlmICh0eXBlLW9mKCRmYWxsYmFjaykgPT0gY29sb3IpIG9yICgkZmFsbGJhY2sgPT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgJGZhbGxiYWNrLWNvbG9yOiAkZmFsbGJhY2s7XG4gIH1cbiAgQGVsc2Uge1xuICAgICRmYWxsYmFjay1jb2xvcjogX2V4dHJhY3QtYmFja2dyb3VuZC1jb2xvcigkYmFja2dyb3VuZHMpO1xuICB9XG5cbiAgQGlmICRmYWxsYmFjay1jb2xvciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGZhbGxiYWNrLWNvbG9yO1xuICB9XG4gIGJhY2tncm91bmQ6IF9iYWNrZ3JvdW5kLWFkZC1wcmVmaXgoJGJhY2tncm91bmRzLCB3ZWJraXQpO1xuICBiYWNrZ3JvdW5kOiBfYmFja2dyb3VuZC1hZGQtcHJlZml4KCRiYWNrZ3JvdW5kcyk7XG59XG5cbkBmdW5jdGlvbiBfZXh0cmFjdC1iYWNrZ3JvdW5kLWNvbG9yKCRiYWNrZ3JvdW5kcykge1xuICAkZmluYWwtYmctbGF5ZXI6IG50aCgkYmFja2dyb3VuZHMsIGxlbmd0aCgkYmFja2dyb3VuZHMpKTtcbiAgQGlmIHR5cGUtb2YoJGZpbmFsLWJnLWxheWVyKSA9PSBsaXN0IHtcbiAgICBAZm9yICRpIGZyb20gMSB0aHJvdWdoIGxlbmd0aCgkZmluYWwtYmctbGF5ZXIpIHtcbiAgICAgICR2YWx1ZTogbnRoKCRmaW5hbC1iZy1sYXllciwgJGkpO1xuICAgICAgQGlmIHR5cGUtb2YoJHZhbHVlKSA9PSBjb2xvciB7XG4gICAgICAgIEByZXR1cm4gJHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBAcmV0dXJuIGZhbHNlO1xufVxuXG5AZnVuY3Rpb24gX2JhY2tncm91bmQtYWRkLXByZWZpeCgkYmFja2dyb3VuZHMsICR2ZW5kb3I6IGZhbHNlKSB7XG4gICRiYWNrZ3JvdW5kcy1wcmVmaXhlZDogKCk7XG5cbiAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCBsZW5ndGgoJGJhY2tncm91bmRzKSB7XG4gICAgJHNob3J0aGFuZDogbnRoKCRiYWNrZ3JvdW5kcywgJGkpOyAvLyBHZXQgbWVtYmVyIGZvciBjdXJyZW50IGluZGV4XG4gICAgJHR5cGU6IHR5cGUtb2YoJHNob3J0aGFuZCk7IC8vIEdldCB0eXBlIG9mIHZhcmlhYmxlIC0gTGlzdCAoZ3JhZGllbnQpIG9yIFN0cmluZyAoaW1hZ2UpXG5cbiAgICAvLyBJZiBzaG9ydGhhbmQgaXMgYSBsaXN0IChncmFkaWVudClcbiAgICBAaWYgJHR5cGUgPT0gbGlzdCB7XG4gICAgICAkZmlyc3QtbWVtYmVyOiBudGgoJHNob3J0aGFuZCwgMSk7IC8vIEdldCBmaXJzdCBtZW1iZXIgb2Ygc2hvcnRoYW5kXG5cbiAgICAgIC8vIExpbmVhciBHcmFkaWVudFxuICAgICAgQGlmIGluZGV4KGxpbmVhciByYWRpYWwsIG50aCgkZmlyc3QtbWVtYmVyLCAxKSkge1xuICAgICAgICAkZ3JhZGllbnQtdHlwZTogbnRoKCRmaXJzdC1tZW1iZXIsIDEpOyAvLyBsaW5lYXIgfHwgcmFkaWFsXG4gICAgICAgICRncmFkaWVudC1hcmdzOiAgICAgIGZhbHNlO1xuICAgICAgICAkZ3JhZGllbnQtcG9zaXRpb25zOiBmYWxzZTtcbiAgICAgICAgJHNob3J0aGFuZC1zdGFydDogICAgZmFsc2U7XG4gICAgICAgIEBpZiB0eXBlLW9mKCRmaXJzdC1tZW1iZXIpID09IGxpc3QgeyAvLyBMaW5lYXIgZ3JhZGllbnQgcGx1cyBhZGRpdGlvbmFsIHNob3J0aGFuZCB2YWx1ZXMgLSBsZyhyZWQsb3JhbmdlKXJlcGVhdCwuLi5cbiAgICAgICAgICAkZ3JhZGllbnQtcG9zaXRpb25zOiBudGgoJGZpcnN0LW1lbWJlciwgMik7XG4gICAgICAgICAgJGdyYWRpZW50LWFyZ3M6ICAgICAgbnRoKCRmaXJzdC1tZW1iZXIsIDMpO1xuICAgICAgICAgICRzaG9ydGhhbmQtc3RhcnQ6IDI7XG4gICAgICAgIH1cbiAgICAgICAgQGVsc2UgeyAvLyBMaW5lYXIgZ3JhZGllbnQgb25seSAtIGxnKHJlZCxvcmFuZ2UpLC4uLlxuICAgICAgICAgICRncmFkaWVudC1wb3NpdGlvbnM6IG50aCgkc2hvcnRoYW5kLCAyKTtcbiAgICAgICAgICAkZ3JhZGllbnQtYXJnczogICAgICBudGgoJHNob3J0aGFuZCwgMyk7IC8vIEdldCBncmFkaWVudCAocmVkLCBibHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgJGdyYWRpZW50LXBvc2l0aW9uczogX2dyYWRpZW50LXBvc2l0aW9ucy1wYXJzZXIoJGdyYWRpZW50LXR5cGUsICRncmFkaWVudC1wb3NpdGlvbnMpO1xuICAgICAgICAkZ3JhZGllbnQ6IF9yZW5kZXItZ3JhZGllbnRzKCRncmFkaWVudC1wb3NpdGlvbnMsICRncmFkaWVudC1hcmdzLCAkZ3JhZGllbnQtdHlwZSwgJHZlbmRvcik7XG5cbiAgICAgICAgLy8gQXBwZW5kIGFueSBhZGRpdGlvbmFsIHNob3J0aGFuZCBhcmdzIHRvIGdyYWRpZW50XG4gICAgICAgIEBpZiAkc2hvcnRoYW5kLXN0YXJ0IHtcbiAgICAgICAgICBAZm9yICRqIGZyb20gJHNob3J0aGFuZC1zdGFydCB0aHJvdWdoIGxlbmd0aCgkc2hvcnRoYW5kKSB7XG4gICAgICAgICAgICAkZ3JhZGllbnQ6IGpvaW4oJGdyYWRpZW50LCBudGgoJHNob3J0aGFuZCwgJGopLCBzcGFjZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICRiYWNrZ3JvdW5kcy1wcmVmaXhlZDogYXBwZW5kKCRiYWNrZ3JvdW5kcy1wcmVmaXhlZCwgJGdyYWRpZW50LCBjb21tYSk7XG4gICAgICB9XG4gICAgICAvLyBJbWFnZSB3aXRoIGFkZGl0aW9uYWwgcHJvcGVydGllc1xuICAgICAgQGVsc2Uge1xuICAgICAgICAkYmFja2dyb3VuZHMtcHJlZml4ZWQ6IGFwcGVuZCgkYmFja2dyb3VuZHMtcHJlZml4ZWQsICRzaG9ydGhhbmQsIGNvbW1hKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gSWYgc2hvcnRoYW5kIGlzIGEgc2ltcGxlIHN0cmluZyAoY29sb3Igb3IgaW1hZ2UpXG4gICAgQGVsc2UgaWYgJHR5cGUgPT0gc3RyaW5nIHtcbiAgICAgICRiYWNrZ3JvdW5kcy1wcmVmaXhlZDogam9pbigkYmFja2dyb3VuZHMtcHJlZml4ZWQsICRzaG9ydGhhbmQsIGNvbW1hKTtcbiAgICB9XG4gIH1cbiAgQHJldHVybiAkYmFja2dyb3VuZHMtcHJlZml4ZWQ7XG59XG5cbi8vRXhhbXBsZXM6XG4gIC8vQGluY2x1ZGUgYmFja2dyb3VuZChsaW5lYXItZ3JhZGllbnQodG9wLCBvcmFuZ2UsIHJlZCkpO1xuICAvL0BpbmNsdWRlIGJhY2tncm91bmQocmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA0MCUgNDAlLCBvcmFuZ2UsIHJlZCkpO1xuICAvL0BpbmNsdWRlIGJhY2tncm91bmQodXJsKFwiL2ltYWdlcy9hLnBuZ1wiKSBuby1yZXBlYXQsIGxpbmVhci1ncmFkaWVudChvcmFuZ2UsIHJlZCkpO1xuICAvL0BpbmNsdWRlIGJhY2tncm91bmQodXJsKFwiaW1hZ2UucG5nXCIpIGNlbnRlciBjZW50ZXIsIGxpbmVhci1ncmFkaWVudChvcmFuZ2UsIHJlZCksIHVybChcImltYWdlLnBuZ1wiKSk7XG4iLAoJCSIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4vLyBCYWNrZ3JvdW5kLWltYWdlIHByb3BlcnR5IGZvciBhZGRpbmcgbXVsdGlwbGUgYmFja2dyb3VuZCBpbWFnZXMgd2l0aFxuLy8gZ3JhZGllbnRzLCBvciBmb3Igc3RyaW5naW5nIG11bHRpcGxlIGdyYWRpZW50cyB0b2dldGhlci5cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cblxuQG1peGluIGJhY2tncm91bmQtaW1hZ2UoJGltYWdlcy4uLikge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBfYWRkLXByZWZpeCgkaW1hZ2VzLCB3ZWJraXQpO1xuICBiYWNrZ3JvdW5kLWltYWdlOiBfYWRkLXByZWZpeCgkaW1hZ2VzKTtcbn1cblxuQGZ1bmN0aW9uIF9hZGQtcHJlZml4KCRpbWFnZXMsICR2ZW5kb3I6IGZhbHNlKSB7XG4gICRpbWFnZXMtcHJlZml4ZWQ6ICgpO1xuICAkZ3JhZGllbnQtcG9zaXRpb25zOiBmYWxzZTtcbiAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCBsZW5ndGgoJGltYWdlcykge1xuICAgICR0eXBlOiB0eXBlLW9mKG50aCgkaW1hZ2VzLCAkaSkpOyAvLyBHZXQgdHlwZSBvZiB2YXJpYWJsZSAtIExpc3Qgb3IgU3RyaW5nXG5cbiAgICAvLyBJZiB2YXJpYWJsZSBpcyBhIGxpc3QgLSBHcmFkaWVudFxuICAgIEBpZiAkdHlwZSA9PSBsaXN0IHtcbiAgICAgICRncmFkaWVudC10eXBlOiBudGgobnRoKCRpbWFnZXMsICRpKSwgMSk7IC8vIGxpbmVhciBvciByYWRpYWxcbiAgICAgICRncmFkaWVudC1wb3M6IG51bGw7XG4gICAgICAkZ3JhZGllbnQtYXJnczogbnVsbDtcblxuICAgICAgQGlmICgkZ3JhZGllbnQtdHlwZSA9PSBsaW5lYXIpIG9yICgkZ3JhZGllbnQtdHlwZSA9PSByYWRpYWwpIHtcbiAgICAgICAgJGdyYWRpZW50LXBvczogIG50aChudGgoJGltYWdlcywgJGkpLCAyKTsgLy8gR2V0IGdyYWRpZW50IHBvc2l0aW9uXG4gICAgICAgICRncmFkaWVudC1hcmdzOiBudGgobnRoKCRpbWFnZXMsICRpKSwgMyk7IC8vIEdldCBhY3R1YWwgZ3JhZGllbnQgKHJlZCwgYmx1ZSlcbiAgICAgIH1cbiAgICAgIEBlbHNlIHtcbiAgICAgICAgJGdyYWRpZW50LWFyZ3M6IG50aChudGgoJGltYWdlcywgJGkpLCAyKTsgLy8gR2V0IGFjdHVhbCBncmFkaWVudCAocmVkLCBibHVlKVxuICAgICAgfVxuXG4gICAgICAkZ3JhZGllbnQtcG9zaXRpb25zOiBfZ3JhZGllbnQtcG9zaXRpb25zLXBhcnNlcigkZ3JhZGllbnQtdHlwZSwgJGdyYWRpZW50LXBvcyk7XG4gICAgICAkZ3JhZGllbnQ6IF9yZW5kZXItZ3JhZGllbnRzKCRncmFkaWVudC1wb3NpdGlvbnMsICRncmFkaWVudC1hcmdzLCAkZ3JhZGllbnQtdHlwZSwgJHZlbmRvcik7XG4gICAgICAkaW1hZ2VzLXByZWZpeGVkOiBhcHBlbmQoJGltYWdlcy1wcmVmaXhlZCwgJGdyYWRpZW50LCBjb21tYSk7XG4gICAgfVxuICAgIC8vIElmIHZhcmlhYmxlIGlzIGEgc3RyaW5nIC0gSW1hZ2VcbiAgICBAZWxzZSBpZiAkdHlwZSA9PSBzdHJpbmcge1xuICAgICAgJGltYWdlcy1wcmVmaXhlZDogam9pbigkaW1hZ2VzLXByZWZpeGVkLCBudGgoJGltYWdlcywgJGkpLCBjb21tYSk7XG4gICAgfVxuICB9XG4gIEByZXR1cm4gJGltYWdlcy1wcmVmaXhlZDtcbn1cblxuLy9FeGFtcGxlczpcbiAgLy9AaW5jbHVkZSBiYWNrZ3JvdW5kLWltYWdlKGxpbmVhci1ncmFkaWVudCh0b3AsIG9yYW5nZSwgcmVkKSk7XG4gIC8vQGluY2x1ZGUgYmFja2dyb3VuZC1pbWFnZShyYWRpYWwtZ3JhZGllbnQoNTAlIDUwJSwgY292ZXIgY2lyY2xlLCBvcmFuZ2UsIHJlZCkpO1xuICAvL0BpbmNsdWRlIGJhY2tncm91bmQtaW1hZ2UodXJsKFwiL2ltYWdlcy9hLnBuZ1wiKSwgbGluZWFyLWdyYWRpZW50KG9yYW5nZSwgcmVkKSk7XG4gIC8vQGluY2x1ZGUgYmFja2dyb3VuZC1pbWFnZSh1cmwoXCJpbWFnZS5wbmdcIiksIGxpbmVhci1ncmFkaWVudChvcmFuZ2UsIHJlZCksIHVybChcImltYWdlLnBuZ1wiKSk7XG4gIC8vQGluY2x1ZGUgYmFja2dyb3VuZC1pbWFnZShsaW5lYXItZ3JhZGllbnQoaHNsYSgwLCAxMDAlLCAxMDAlLCAwLjI1KSAwJSwgaHNsYSgwLCAxMDAlLCAxMDAlLCAwLjA4KSA1MCUsIHRyYW5zcGFyZW50IDUwJSksIGxpbmVhci1ncmFkaWVudChvcmFuZ2UsIHJlZCkpO1xuIiwKCQkiQG1peGluIGJvcmRlci1pbWFnZSgkaW1hZ2VzKSB7XG4gIC13ZWJraXQtYm9yZGVyLWltYWdlOiBfYm9yZGVyLWFkZC1wcmVmaXgoJGltYWdlcywgd2Via2l0KTtcbiAgICAgLW1vei1ib3JkZXItaW1hZ2U6IF9ib3JkZXItYWRkLXByZWZpeCgkaW1hZ2VzLCBtb3opO1xuICAgICAgIC1vLWJvcmRlci1pbWFnZTogX2JvcmRlci1hZGQtcHJlZml4KCRpbWFnZXMsIG8pO1xuICAgICAgICAgIGJvcmRlci1pbWFnZTogX2JvcmRlci1hZGQtcHJlZml4KCRpbWFnZXMpO1xuICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG59XG5cbkBmdW5jdGlvbiBfYm9yZGVyLWFkZC1wcmVmaXgoJGltYWdlcywgJHZlbmRvcjogZmFsc2UpIHtcbiAgJGJvcmRlci1pbWFnZTogbnVsbDtcbiAgJGltYWdlcy10eXBlOiAgdHlwZS1vZihudGgoJGltYWdlcywgMSkpO1xuICAkZmlyc3QtdmFyOiAgICBudGgobnRoKCRpbWFnZXMsIDEpLCAxKTsgICAgICAgICAgLy8gR2V0IHR5cGUgb2YgR3JhZGllbnQgKExpbmVhciB8fCByYWRpYWwpXG5cbiAgLy8gSWYgaW5wdXQgaXMgYSBncmFkaWVudFxuICBAaWYgJGltYWdlcy10eXBlID09IHN0cmluZyB7XG4gICAgQGlmICgkZmlyc3QtdmFyID09IFwibGluZWFyXCIpIG9yICgkZmlyc3QtdmFyID09IFwicmFkaWFsXCIpIHtcbiAgICAgICRncmFkaWVudC10eXBlOiBudGgoJGltYWdlcywgMSk7ICAgICAgICAgICAvLyBHZXQgdHlwZSBvZiBncmFkaWVudCAobGluZWFyIHx8IHJhZGlhbClcbiAgICAgICRncmFkaWVudC1wb3M6ICBudGgoJGltYWdlcywgMik7ICAgICAgICAgICAvLyBHZXQgZ3JhZGllbnQgcG9zaXRpb25cbiAgICAgICRncmFkaWVudC1hcmdzOiBudGgoJGltYWdlcywgMyk7ICAgICAgICAgICAvLyBHZXQgYWN0dWFsIGdyYWRpZW50IChyZWQsIGJsdWUpXG4gICAgICAkZ3JhZGllbnQtcG9zaXRpb25zOiBfZ3JhZGllbnQtcG9zaXRpb25zLXBhcnNlcigkZ3JhZGllbnQtdHlwZSwgJGdyYWRpZW50LXBvcyk7XG4gICAgICAkYm9yZGVyLWltYWdlOiAgX3JlbmRlci1ncmFkaWVudHMoJGdyYWRpZW50LXBvc2l0aW9ucywgJGdyYWRpZW50LWFyZ3MsICRncmFkaWVudC10eXBlLCAkdmVuZG9yKTtcbiAgICB9XG4gICAgLy8gSWYgaW5wdXQgaXMgYSBVUkxcbiAgICBAZWxzZSB7XG4gICAgICAkYm9yZGVyLWltYWdlOiAkaW1hZ2VzO1xuICAgIH1cbiAgfVxuICAvLyBJZiBpbnB1dCBpcyBncmFkaWVudCBvciB1cmwgKyBhZGRpdGlvbmFsIGFyZ3NcbiAgQGVsc2UgaWYgJGltYWdlcy10eXBlID09IGxpc3Qge1xuICAgICR0eXBlOiB0eXBlLW9mKG50aCgkaW1hZ2VzLCAxKSk7ICAgICAgICAgICAvLyBHZXQgdHlwZSBvZiB2YXJpYWJsZSAtIExpc3Qgb3IgU3RyaW5nXG5cbiAgICAvLyBJZiB2YXJpYWJsZSBpcyBhIGxpc3QgLSBHcmFkaWVudFxuICAgIEBpZiAkdHlwZSA9PSBsaXN0IHtcbiAgICAgICRncmFkaWVudDogbnRoKCRpbWFnZXMsIDEpO1xuICAgICAgJGdyYWRpZW50LXR5cGU6IG50aCgkZ3JhZGllbnQsIDEpOyAgICAgICAgICAgLy8gR2V0IHR5cGUgb2YgZ3JhZGllbnQgKGxpbmVhciB8fCByYWRpYWwpXG4gICAgICAkZ3JhZGllbnQtcG9zOiAgbnRoKCRncmFkaWVudCwgMik7ICAgICAgICAgICAvLyBHZXQgZ3JhZGllbnQgcG9zaXRpb25cbiAgICAgICRncmFkaWVudC1hcmdzOiBudGgoJGdyYWRpZW50LCAzKTsgICAgICAgICAgIC8vIEdldCBhY3R1YWwgZ3JhZGllbnQgKHJlZCwgYmx1ZSlcbiAgICAgICRncmFkaWVudC1wb3NpdGlvbnM6IF9ncmFkaWVudC1wb3NpdGlvbnMtcGFyc2VyKCRncmFkaWVudC10eXBlLCAkZ3JhZGllbnQtcG9zKTtcbiAgICAgICRib3JkZXItaW1hZ2U6ICBfcmVuZGVyLWdyYWRpZW50cygkZ3JhZGllbnQtcG9zaXRpb25zLCAkZ3JhZGllbnQtYXJncywgJGdyYWRpZW50LXR5cGUsICR2ZW5kb3IpO1xuXG4gICAgICBAZm9yICRpIGZyb20gMiB0aHJvdWdoIGxlbmd0aCgkaW1hZ2VzKSB7XG4gICAgICAgICRib3JkZXItaW1hZ2U6IGFwcGVuZCgkYm9yZGVyLWltYWdlLCBudGgoJGltYWdlcywgJGkpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgQHJldHVybiAkYm9yZGVyLWltYWdlO1xufVxuXG4vL0V4YW1wbGVzOlxuLy8gQGluY2x1ZGUgYm9yZGVyLWltYWdlKHVybChcImltYWdlLnBuZ1wiKSk7XG4vLyBAaW5jbHVkZSBib3JkZXItaW1hZ2UodXJsKFwiaW1hZ2UucG5nXCIpIDIwIHN0cmV0Y2gpO1xuLy8gQGluY2x1ZGUgYm9yZGVyLWltYWdlKGxpbmVhci1ncmFkaWVudCg0NWRlZywgb3JhbmdlLCB5ZWxsb3cpKTtcbi8vIEBpbmNsdWRlIGJvcmRlci1pbWFnZShsaW5lYXItZ3JhZGllbnQoNDVkZWcsIG9yYW5nZSwgeWVsbG93KSBzdHJldGNoKTtcbi8vIEBpbmNsdWRlIGJvcmRlci1pbWFnZShsaW5lYXItZ3JhZGllbnQoNDVkZWcsIG9yYW5nZSwgeWVsbG93KSAyMCAzMCA0MCA1MCBzdHJldGNoIHJvdW5kKTtcbi8vIEBpbmNsdWRlIGJvcmRlci1pbWFnZShyYWRpYWwtZ3JhZGllbnQodG9wLCBjb3Zlciwgb3JhbmdlLCB5ZWxsb3csIG9yYW5nZSkpO1xuXG4iLAoJCSIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4vLyBTaG9ydGhhbmQgQm9yZGVyLXJhZGl1cyBtaXhpbnNcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbkBtaXhpbiBib3JkZXItdG9wLXJhZGl1cygkcmFkaWkpIHtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cywgJHJhZGlpLCBzcGVjKTtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm9yZGVyLXRvcC1yaWdodC1yYWRpdXMsICRyYWRpaSwgc3BlYyk7XG59XG5cbkBtaXhpbiBib3JkZXItYm90dG9tLXJhZGl1cygkcmFkaWkpIHtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1cywgJHJhZGlpLCBzcGVjKTtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXMsICRyYWRpaSwgc3BlYyk7XG59XG5cbkBtaXhpbiBib3JkZXItbGVmdC1yYWRpdXMoJHJhZGlpKSB7XG4gIEBpbmNsdWRlIHByZWZpeGVyKGJvcmRlci10b3AtbGVmdC1yYWRpdXMsICRyYWRpaSwgc3BlYyk7XG4gIEBpbmNsdWRlIHByZWZpeGVyKGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXMsICRyYWRpaSwgc3BlYyk7XG59XG5cbkBtaXhpbiBib3JkZXItcmlnaHQtcmFkaXVzKCRyYWRpaSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihib3JkZXItdG9wLXJpZ2h0LXJhZGl1cywgJHJhZGlpLCBzcGVjKTtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXMsICRyYWRpaSwgc3BlYyk7XG59XG4iLAoJCSJAbWl4aW4gYm94LXNpemluZyAoJGJveCkge1xuLy8gIGNvbnRlbnQtYm94IHwgYm9yZGVyLWJveCB8IGluaGVyaXRcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm94LXNpemluZywgJGJveCwgd2Via2l0IG1veiBzcGVjKTtcbn1cbiIsCgkJIkBtaXhpbiBjYWxjKCRwcm9wZXJ0eSwgJHZhbHVlKSB7XG4gICN7JHByb3BlcnR5fTogLXdlYmtpdC1jYWxjKCN7JHZhbHVlfSk7XG4gICN7JHByb3BlcnR5fTogICAgICAgICBjYWxjKCN7JHZhbHVlfSk7XG59XG4iLAoJCSJAbWl4aW4gY29sdW1ucygkYXJnOiBhdXRvKSB7XG4vLyA8Y29sdW1uLWNvdW50PiB8fCA8Y29sdW1uLXdpZHRoPlxuICBAaW5jbHVkZSBwcmVmaXhlcihjb2x1bW5zLCAkYXJnLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gY29sdW1uLWNvdW50KCRpbnQ6IGF1dG8pIHtcbi8vIGF1dG8gfHwgaW50ZWdlclxuICBAaW5jbHVkZSBwcmVmaXhlcihjb2x1bW4tY291bnQsICRpbnQsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbkBtaXhpbiBjb2x1bW4tZ2FwKCRsZW5ndGg6IG5vcm1hbCkge1xuLy8gbm9ybWFsIHx8IGxlbmd0aFxuICBAaW5jbHVkZSBwcmVmaXhlcihjb2x1bW4tZ2FwLCAkbGVuZ3RoLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gY29sdW1uLWZpbGwoJGFyZzogYXV0bykge1xuLy8gYXV0byB8fCBsZW5ndGhcbiAgQGluY2x1ZGUgcHJlZml4ZXIoY29sdW1uLWZpbGwsICRhcmcsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbkBtaXhpbiBjb2x1bW4tcnVsZSgkYXJnKSB7XG4vLyA8Ym9yZGVyLXdpZHRoPiB8fCA8Ym9yZGVyLXN0eWxlPiB8fCA8Y29sb3I+XG4gIEBpbmNsdWRlIHByZWZpeGVyKGNvbHVtbi1ydWxlLCAkYXJnLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gY29sdW1uLXJ1bGUtY29sb3IoJGNvbG9yKSB7XG4gIEBpbmNsdWRlIHByZWZpeGVyKGNvbHVtbi1ydWxlLWNvbG9yLCAkY29sb3IsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbkBtaXhpbiBjb2x1bW4tcnVsZS1zdHlsZSgkc3R5bGU6IG5vbmUpIHtcbi8vIG5vbmUgfCBoaWRkZW4gfCBkYXNoZWQgfCBkb3R0ZWQgfCBkb3VibGUgfCBncm9vdmUgfCBpbnNldCB8IGluc2V0IHwgb3V0c2V0IHwgcmlkZ2UgfCBzb2xpZFxuICBAaW5jbHVkZSBwcmVmaXhlcihjb2x1bW4tcnVsZS1zdHlsZSwgJHN0eWxlLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gY29sdW1uLXJ1bGUtd2lkdGggKCR3aWR0aDogbm9uZSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihjb2x1bW4tcnVsZS13aWR0aCwgJHdpZHRoLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gY29sdW1uLXNwYW4oJGFyZzogbm9uZSkge1xuLy8gbm9uZSB8fCBhbGxcbiAgQGluY2x1ZGUgcHJlZml4ZXIoY29sdW1uLXNwYW4sICRhcmcsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbkBtaXhpbiBjb2x1bW4td2lkdGgoJGxlbmd0aDogYXV0bykge1xuLy8gYXV0byB8fCBsZW5ndGhcbiAgQGluY2x1ZGUgcHJlZml4ZXIoY29sdW1uLXdpZHRoLCAkbGVuZ3RoLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuIiwKCQkiQG1peGluIGZpbHRlcigkZnVuY3Rpb246IG5vbmUpIHtcbiAgLy8gPGZpbHRlci1mdW5jdGlvbj4gWzxmaWx0ZXItZnVuY3Rpb25dKiB8IG5vbmVcbiAgQGluY2x1ZGUgcHJlZml4ZXIoZmlsdGVyLCAkZnVuY3Rpb24sIHdlYmtpdCBzcGVjKTtcbn1cblxuIiwKCQkiLy8gQ1NTMyBGbGV4aWJsZSBCb3ggTW9kZWwgYW5kIHByb3BlcnR5IGRlZmF1bHRzXG5cbi8vIEN1c3RvbSBzaG9ydGhhbmQgbm90YXRpb24gZm9yIGZsZXhib3hcbkBtaXhpbiBib3goJG9yaWVudDogaW5saW5lLWF4aXMsICRwYWNrOiBzdGFydCwgJGFsaWduOiBzdHJldGNoKSB7XG4gIEBpbmNsdWRlIGRpc3BsYXktYm94O1xuICBAaW5jbHVkZSBib3gtb3JpZW50KCRvcmllbnQpO1xuICBAaW5jbHVkZSBib3gtcGFjaygkcGFjayk7XG4gIEBpbmNsdWRlIGJveC1hbGlnbigkYWxpZ24pO1xufVxuXG5AbWl4aW4gZGlzcGxheS1ib3gge1xuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgZGlzcGxheTogLW1vei1ib3g7XG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94OyAvLyBJRSAxMFxuICBkaXNwbGF5OiBib3g7XG59XG5cbkBtaXhpbiBib3gtb3JpZW50KCRvcmllbnQ6IGlubGluZS1heGlzKSB7XG4vLyBob3Jpem9udGFsfHZlcnRpY2FsfGlubGluZS1heGlzfGJsb2NrLWF4aXN8aW5oZXJpdFxuICBAaW5jbHVkZSBwcmVmaXhlcihib3gtb3JpZW50LCAkb3JpZW50LCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gYm94LXBhY2soJHBhY2s6IHN0YXJ0KSB7XG4vLyBzdGFydHxlbmR8Y2VudGVyfGp1c3RpZnlcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm94LXBhY2ssICRwYWNrLCB3ZWJraXQgbW96IHNwZWMpO1xuICAtbXMtZmxleC1wYWNrOiAkcGFjazsgLy8gSUUgMTBcbn1cblxuQG1peGluIGJveC1hbGlnbigkYWxpZ246IHN0cmV0Y2gpIHtcbi8vIHN0YXJ0fGVuZHxjZW50ZXJ8YmFzZWxpbmV8c3RyZXRjaFxuICBAaW5jbHVkZSBwcmVmaXhlcihib3gtYWxpZ24sICRhbGlnbiwgd2Via2l0IG1veiBzcGVjKTtcbiAgLW1zLWZsZXgtYWxpZ246ICRhbGlnbjsgLy8gSUUgMTBcbn1cblxuQG1peGluIGJveC1kaXJlY3Rpb24oJGRpcmVjdGlvbjogbm9ybWFsKSB7XG4vLyBub3JtYWx8cmV2ZXJzZXxpbmhlcml0XG4gIEBpbmNsdWRlIHByZWZpeGVyKGJveC1kaXJlY3Rpb24sICRkaXJlY3Rpb24sIHdlYmtpdCBtb3ogc3BlYyk7XG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjsgLy8gSUUgMTBcbn1cblxuQG1peGluIGJveC1saW5lcygkbGluZXM6IHNpbmdsZSkge1xuLy8gc2luZ2xlfG11bHRpcGxlXG4gIEBpbmNsdWRlIHByZWZpeGVyKGJveC1saW5lcywgJGxpbmVzLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gYm94LW9yZGluYWwtZ3JvdXAoJGludDogMSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihib3gtb3JkaW5hbC1ncm91cCwgJGludCwgd2Via2l0IG1veiBzcGVjKTtcbiAgLW1zLWZsZXgtb3JkZXI6ICRpbnQ7IC8vIElFIDEwXG59XG5cbkBtaXhpbiBib3gtZmxleCgkdmFsdWU6IDAuMCkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihib3gtZmxleCwgJHZhbHVlLCB3ZWJraXQgbW96IHNwZWMpO1xuICAtbXMtZmxleDogJHZhbHVlOyAvLyBJRSAxMFxufVxuXG5AbWl4aW4gYm94LWZsZXgtZ3JvdXAoJGludDogMSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihib3gtZmxleC1ncm91cCwgJGludCwgd2Via2l0IG1veiBzcGVjKTtcbn1cblxuLy8gQ1NTMyBGbGV4aWJsZSBCb3ggTW9kZWwgYW5kIHByb3BlcnR5IGRlZmF1bHRzXG4vLyBVbmlmaWVkIGF0dHJpYnV0ZXMgZm9yIDIwMDksIDIwMTEsIGFuZCAyMDEyIGZsYXZvdXJzLlxuXG4vLyAyMDA5IC0gZGlzcGxheSAoYm94IHwgaW5saW5lLWJveClcbi8vIDIwMTEgLSBkaXNwbGF5IChmbGV4Ym94IHwgaW5saW5lLWZsZXhib3gpXG4vLyAyMDEyIC0gZGlzcGxheSAoZmxleCB8IGlubGluZS1mbGV4KVxuQG1peGluIGRpc3BsYXkoJHZhbHVlKSB7XG4vLyAgZmxleCB8IGlubGluZS1mbGV4XG4gICAgQGlmICR2YWx1ZSA9PSBcImZsZXhcIiB7XG4gICAgICAgIC8vIDIwMDlcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgICAgIGRpc3BsYXk6IC1tb3otYm94O1xuICAgICAgICBkaXNwbGF5OiBib3g7XG5cbiAgICAgICAgLy8gMjAxMlxuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IC1tb3otZmxleDtcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7IC8vIDIwMTEgKElFIDEwKVxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IFwiaW5saW5lLWZsZXhcIiB7XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtaW5saW5lLWJveDtcbiAgICAgICAgZGlzcGxheTogLW1vei1pbmxpbmUtYm94O1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYm94O1xuXG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtaW5saW5lLWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IC1tb3otaW5saW5lLWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IC1tcy1pbmxpbmUtZmxleGJveDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgfVxuXG4gICAgQGVsc2Uge1xuICAgICAgICBkaXNwbGF5OiAkdmFsdWU7XG4gICAgfVxufVxuXG4vLyAyMDA5IC0gYm94LWZsZXggKGludGVnZXIpXG4vLyAyMDExIC0gZmxleCAoZGVjaW1hbCB8IHdpZHRoIGRlY2ltYWwpXG4vLyAyMDEyIC0gZmxleCAoaW50ZWdlciBpbnRlZ2VyIHdpZHRoKVxuQG1peGluIGZsZXgoJHZhbHVlKSB7XG5cbiAgICAvLyBHcmFiIGZsZXgtZ3JvdyBmb3Igb2xkZXIgYnJvd3NlcnMuXG4gICAgJGZsZXgtZ3JvdzogbnRoKCR2YWx1ZSwgMSk7XG5cbiAgICAvLyAyMDA5XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoYm94LWZsZXgsICRmbGV4LWdyb3csIHdlYmtpdCBtb3ogc3BlYyk7XG5cbiAgICAvLyAyMDExIChJRSAxMCksIDIwMTJcbiAgICBAaW5jbHVkZSBwcmVmaXhlcihmbGV4LCAkdmFsdWUsIHdlYmtpdCBtb3ogbXMgc3BlYyk7XG59XG5cbi8vIDIwMDkgLSBib3gtb3JpZW50ICggaG9yaXpvbnRhbCB8IHZlcnRpY2FsIHwgaW5saW5lLWF4aXMgfCBibG9jay1heGlzKVxuLy8gICAgICAtIGJveC1kaXJlY3Rpb24gKG5vcm1hbCB8IHJldmVyc2UpICAgICAgXG4vLyAyMDExIC0gZmxleC1kaXJlY3Rpb24gKHJvdyB8IHJvdy1yZXZlcnNlIHwgY29sdW1uIHwgY29sdW1uLXJldmVyc2UpXG4vLyAyMDEyIC0gZmxleC1kaXJlY3Rpb24gKHJvdyB8IHJvdy1yZXZlcnNlIHwgY29sdW1uIHwgY29sdW1uLXJldmVyc2UpXG5AbWl4aW4gZmxleC1kaXJlY3Rpb24oJHZhbHVlOiByb3cpIHtcblxuICAgIC8vIEFsdCB2YWx1ZXMuXG4gICAgJHZhbHVlLTIwMDk6ICR2YWx1ZTtcbiAgICAkdmFsdWUtMjAxMTogJHZhbHVlO1xuICAgICRkaXJlY3Rpb246IFwibm9ybWFsXCI7XG5cbiAgICBAaWYgJHZhbHVlID09IHJvdyB7XG4gICAgICAgICR2YWx1ZS0yMDA5OiBob3Jpem9udGFsO1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IFwicm93LXJldmVyc2VcIiB7XG4gICAgICAgICR2YWx1ZS0yMDA5OiBob3Jpem9udGFsO1xuICAgICAgICAkZGlyZWN0aW9uOiByZXZlcnNlO1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IGNvbHVtbiB7XG4gICAgICAgICR2YWx1ZS0yMDA5OiB2ZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBAZWxzZWlmICR2YWx1ZSA9PSBcImNvbHVtbi1yZXZlcnNlXCIge1xuICAgICAgICAkdmFsdWUtMjAwOTogdmVydGljYWw7XG4gICAgICAgICRkaXJlY3Rpb246IHJldmVyc2U7XG4gICAgfVxuXG4gICAgLy8gMjAwOVxuICAgIEBpbmNsdWRlIHByZWZpeGVyKGJveC1vcmllbnQsICR2YWx1ZS0yMDA5LCB3ZWJraXQgbW96IHNwZWMpO1xuICAgIEBpZiAkZGlyZWN0aW9uID09IFwicmV2ZXJzZVwiIHtcbiAgICAgICAgQGluY2x1ZGUgcHJlZml4ZXIoYm94LWRpcmVjdGlvbiwgJGRpcmVjdGlvbiwgd2Via2l0IG1veiBzcGVjKTtcbiAgICB9XG5cbiAgICAvLyAyMDEyXG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoZmxleC1kaXJlY3Rpb24sICR2YWx1ZSwgd2Via2l0IG1veiBzcGVjKTtcblxuICAgIC8vIDIwMTEgKElFIDEwKVxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogJHZhbHVlO1xufVxuXG4vLyAyMDA5IC0gYm94LWxpbmVzIChzaW5nbGUgfCBtdWx0aXBsZSlcbi8vIDIwMTEgLSBmbGV4LXdyYXAgKG5vd3JhcCB8IHdyYXAgfCB3cmFwLXJldmVyc2UpXG4vLyAyMDEyIC0gZmxleC13cmFwIChub3dyYXAgfCB3cmFwIHwgd3JhcC1yZXZlcnNlKVxuQG1peGluIGZsZXgtd3JhcCgkdmFsdWU6IG5vd3JhcCkge1xuXG4gICAgLy8gQWx0IHZhbHVlcy5cbiAgICAkYWx0LXZhbHVlOiAkdmFsdWU7XG4gICAgQGlmICR2YWx1ZSA9PSBub3dyYXAge1xuICAgICAgICAkYWx0LXZhbHVlOiBzaW5nbGU7XG4gICAgfVxuXG4gICAgQGVsc2VpZiAkdmFsdWUgPT0gd3JhcCB7XG4gICAgICAgICRhbHQtdmFsdWU6IG11bHRpcGxlO1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IFwid3JhcC1yZXZlcnNlXCIge1xuICAgICAgICAkYWx0LXZhbHVlOiBtdWx0aXBsZTtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBwcmVmaXhlcihib3gtbGluZXMsICRhbHQtdmFsdWUsIHdlYmtpdCBtb3ogc3BlYyk7XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoZmxleC13cmFwLCAkdmFsdWUsIHdlYmtpdCBtb3ogbXMgc3BlYyk7XG59XG5cbi8vIDIwMDkgLSBUT0RPOiBwYXJzZSB2YWx1ZXMgaW50byBmbGV4LWRpcmVjdGlvbi9mbGV4LXdyYXBcbi8vIDIwMTEgLSBUT0RPOiBwYXJzZSB2YWx1ZXMgaW50byBmbGV4LWRpcmVjdGlvbi9mbGV4LXdyYXBcbi8vIDIwMTIgLSBmbGV4LWZsb3cgKGZsZXgtZGlyZWN0aW9uIHx8IGZsZXgtd3JhcClcbkBtaXhpbiBmbGV4LWZsb3coJHZhbHVlKSB7XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoZmxleC1mbG93LCAkdmFsdWUsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbi8vIDIwMDkgLSBib3gtb3JkaW5hbC1ncm91cCAoaW50ZWdlcilcbi8vIDIwMTEgLSBmbGV4LW9yZGVyIChpbnRlZ2VyKVxuLy8gMjAxMiAtIG9yZGVyIChpbnRlZ2VyKVxuQG1peGluIG9yZGVyKCRpbnQ6IDApIHtcbiAgICAvLyAyMDA5XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoYm94LW9yZGluYWwtZ3JvdXAsICRpbnQsIHdlYmtpdCBtb3ogc3BlYyk7XG5cbiAgICAvLyAyMDEyXG4gICAgQGluY2x1ZGUgcHJlZml4ZXIob3JkZXIsICRpbnQsIHdlYmtpdCBtb3ogc3BlYyk7XG5cbiAgICAvLyAyMDExIChJRSAxMClcbiAgICAtbXMtZmxleC1vcmRlcjogJGludDtcbn1cblxuLy8gMjAxMiAtIGZsZXgtZ3JvdyAobnVtYmVyKVxuQG1peGluIGZsZXgtZ3JvdygkbnVtYmVyOiAwKSB7XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoZmxleC1ncm93LCAkbnVtYmVyLCB3ZWJraXQgbW96IHNwZWMpO1xuICAgIC1tcy1mbGV4LXBvc2l0aXZlOiAkbnVtYmVyO1xufVxuXG4vLyAyMDEyIC0gZmxleC1zaHJpbmsgKG51bWJlcilcbkBtaXhpbiBmbGV4LXNocmluaygkbnVtYmVyOiAxKSB7XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoZmxleC1zaHJpbmssICRudW1iZXIsIHdlYmtpdCBtb3ogc3BlYyk7XG4gICAgLW1zLWZsZXgtbmVnYXRpdmU6ICRudW1iZXI7XG59XG5cbi8vIDIwMTIgLSBmbGV4LWJhc2lzIChudW1iZXIpXG5AbWl4aW4gZmxleC1iYXNpcygkd2lkdGg6IGF1dG8pIHtcbiAgICBAaW5jbHVkZSBwcmVmaXhlcihmbGV4LWJhc2lzLCAkd2lkdGgsIHdlYmtpdCBtb3ogc3BlYyk7XG4gICAgLW1zLWZsZXgtcHJlZmVycmVkLXNpemU6ICR3aWR0aDtcbn1cblxuLy8gMjAwOSAtIGJveC1wYWNrIChzdGFydCB8IGVuZCB8IGNlbnRlciB8IGp1c3RpZnkpXG4vLyAyMDExIC0gZmxleC1wYWNrIChzdGFydCB8IGVuZCB8IGNlbnRlciB8IGp1c3RpZnkpXG4vLyAyMDEyIC0ganVzdGlmeS1jb250ZW50IChmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBzcGFjZS1iZXR3ZWVuIHwgc3BhY2UtYXJvdW5kKVxuQG1peGluIGp1c3RpZnktY29udGVudCAoJHZhbHVlOiBmbGV4LXN0YXJ0KSB7XG5cbiAgICAvLyBBbHQgdmFsdWVzLlxuICAgICRhbHQtdmFsdWU6ICR2YWx1ZTtcbiAgICBAaWYgJHZhbHVlID09IFwiZmxleC1zdGFydFwiIHtcbiAgICAgICAgJGFsdC12YWx1ZTogc3RhcnQ7XG4gICAgfVxuXG4gICAgQGVsc2VpZiAkdmFsdWUgPT0gXCJmbGV4LWVuZFwiIHtcbiAgICAgICAgJGFsdC12YWx1ZTogZW5kO1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IFwic3BhY2UtYmV0d2VlblwiIHtcbiAgICAgICAgJGFsdC12YWx1ZToganVzdGlmeTtcbiAgICB9XG5cbiAgICBAZWxzZWlmICR2YWx1ZSA9PSBcInNwYWNlLWFyb3VuZFwiIHtcbiAgICAgICAgJGFsdC12YWx1ZTogY2VudGVyO1xuICAgIH1cblxuICAgIC8vIDIwMDlcbiAgICBAaW5jbHVkZSBwcmVmaXhlcihib3gtcGFjaywgJGFsdC12YWx1ZSwgd2Via2l0IG1veiBzcGVjKTtcblxuICAgIC8vIDIwMTJcbiAgICBAaW5jbHVkZSBwcmVmaXhlcihqdXN0aWZ5LWNvbnRlbnQsICR2YWx1ZSwgd2Via2l0IG1veiBtcyBvIHNwZWMpO1xuXG4gICAgLy8gMjAxMSAoSUUgMTApXG4gICAgLW1zLWZsZXgtcGFjazogJGFsdC12YWx1ZTtcbn1cblxuLy8gMjAwOSAtIGJveC1hbGlnbiAoc3RhcnQgfCBlbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2gpXG4vLyAyMDExIC0gZmxleC1hbGlnbiAoc3RhcnQgfCBlbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2gpXG4vLyAyMDEyIC0gYWxpZ24taXRlbXMgKGZsZXgtc3RhcnQgfCBmbGV4LWVuZCB8IGNlbnRlciB8IGJhc2VsaW5lIHwgc3RyZXRjaClcbkBtaXhpbiBhbGlnbi1pdGVtcygkdmFsdWU6IHN0cmV0Y2gpIHtcblxuICAgICRhbHQtdmFsdWU6ICR2YWx1ZTtcblxuICAgIEBpZiAkdmFsdWUgPT0gXCJmbGV4LXN0YXJ0XCIge1xuICAgICAgICAkYWx0LXZhbHVlOiBzdGFydDtcbiAgICB9ICAgIFxuXG4gICAgQGVsc2VpZiAkdmFsdWUgPT0gXCJmbGV4LWVuZFwiIHtcbiAgICAgICAgJGFsdC12YWx1ZTogZW5kO1xuICAgIH1cblxuICAgIC8vIDIwMDlcbiAgICBAaW5jbHVkZSBwcmVmaXhlcihib3gtYWxpZ24sICRhbHQtdmFsdWUsIHdlYmtpdCBtb3ogc3BlYyk7XG5cbiAgICAvLyAyMDEyXG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoYWxpZ24taXRlbXMsICR2YWx1ZSwgd2Via2l0IG1veiBtcyBvIHNwZWMpO1xuICAgIFxuICAgIC8vIDIwMTEgKElFIDEwKVxuICAgIC1tcy1mbGV4LWFsaWduOiAkYWx0LXZhbHVlOyAgICBcbn1cblxuLy8gMjAxMSAtIGZsZXgtaXRlbS1hbGlnbiAoYXV0byB8IHN0YXJ0IHwgZW5kIHwgY2VudGVyIHwgYmFzZWxpbmUgfCBzdHJldGNoKVxuLy8gMjAxMiAtIGFsaWduLXNlbGYgKGF1dG8gfCBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2gpXG5AbWl4aW4gYWxpZ24tc2VsZigkdmFsdWU6IGF1dG8pIHtcblxuICAgICR2YWx1ZS0yMDExOiAkdmFsdWU7XG4gICAgQGlmICR2YWx1ZSA9PSBcImZsZXgtc3RhcnRcIiB7XG4gICAgICAgICR2YWx1ZS0yMDExOiBzdGFydDtcbiAgICB9ICAgIFxuXG4gICAgQGVsc2VpZiAkdmFsdWUgPT0gXCJmbGV4LWVuZFwiIHtcbiAgICAgICAgJHZhbHVlLTIwMTE6IGVuZDtcbiAgICB9XG5cbiAgICAvLyAyMDEyXG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoYWxpZ24tc2VsZiwgJHZhbHVlLCB3ZWJraXQgbW96IHNwZWMpO1xuXG4gICAgLy8gMjAxMSAoSUUgMTApXG4gICAgLW1zLWZsZXgtaXRlbS1hbGlnbjogJHZhbHVlLTIwMTE7XG59XG5cbi8vIDIwMTEgLSBmbGV4LWxpbmUtcGFjayAoc3RhcnQgfCBlbmQgfCBjZW50ZXIgfCBqdXN0aWZ5IHwgZGlzdHJpYnV0ZSB8IHN0cmV0Y2gpXG4vLyAyMDEyIC0gYWxpZ24tY29udGVudCAoZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgc3BhY2UtYmV0d2VlbiB8IHNwYWNlLWFyb3VuZCB8IHN0cmV0Y2gpXG5AbWl4aW4gYWxpZ24tY29udGVudCgkdmFsdWU6IHN0cmV0Y2gpIHtcblxuICAgICR2YWx1ZS0yMDExOiAkdmFsdWU7XG4gICAgQGlmICR2YWx1ZSA9PSBcImZsZXgtc3RhcnRcIiB7XG4gICAgICAgICR2YWx1ZS0yMDExOiBzdGFydDtcbiAgICB9ICAgIFxuXG4gICAgQGVsc2VpZiAkdmFsdWUgPT0gXCJmbGV4LWVuZFwiIHtcbiAgICAgICAgJHZhbHVlLTIwMTE6IGVuZDtcbiAgICB9XG5cbiAgICBAZWxzZWlmICR2YWx1ZSA9PSBcInNwYWNlLWJldHdlZW5cIiB7XG4gICAgICAgICR2YWx1ZS0yMDExOiBqdXN0aWZ5O1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IFwic3BhY2UtYXJvdW5kXCIge1xuICAgICAgICAkdmFsdWUtMjAxMTogZGlzdHJpYnV0ZTtcbiAgICB9XG5cbiAgICAvLyAyMDEyXG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoYWxpZ24tY29udGVudCwgJHZhbHVlLCB3ZWJraXQgbW96IHNwZWMpO1xuXG4gICAgLy8gMjAxMSAoSUUgMTApXG4gICAgLW1zLWZsZXgtbGluZS1wYWNrOiAkdmFsdWUtMjAxMTtcbn1cblxuIiwKCQkiLy8gT3JkZXIgb2YgdGhlIGluY2x1ZGVzIG1hdHRlcnMsIGFuZCBpdCBpczogbm9ybWFsLCBib2xkLCBpdGFsaWMsIGJvbGQraXRhbGljLlxuXG5AbWl4aW4gZm9udC1mYWNlKCRmb250LWZhbWlseSwgJGZpbGUtcGF0aCwgJHdlaWdodDogbm9ybWFsLCAkc3R5bGU6IG5vcm1hbCwgJGFzc2V0LXBpcGVsaW5lOiAkYXNzZXQtcGlwZWxpbmUpIHtcbiAgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcbiAgICBmb250LXdlaWdodDogJHdlaWdodDtcbiAgICBmb250LXN0eWxlOiAkc3R5bGU7XG5cbiAgICBAaWYgJGFzc2V0LXBpcGVsaW5lID09IHRydWUge1xuICAgICAgc3JjOiBmb250LXVybCgnI3skZmlsZS1wYXRofS5lb3QnKTtcbiAgICAgIHNyYzogZm9udC11cmwoJyN7JGZpbGUtcGF0aH0uZW90PyNpZWZpeCcpICAgICAgICAgIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcbiAgICAgICAgICAgZm9udC11cmwoJyN7JGZpbGUtcGF0aH0ud29mZicpICAgICAgICAgICAgICAgIGZvcm1hdCgnd29mZicpLFxuICAgICAgICAgICBmb250LXVybCgnI3skZmlsZS1wYXRofS50dGYnKSAgICAgICAgICAgICAgICAgZm9ybWF0KCd0cnVldHlwZScpLFxuICAgICAgICAgICBmb250LXVybCgnI3skZmlsZS1wYXRofS5zdmcjI3skZm9udC1mYW1pbHl9JykgZm9ybWF0KCdzdmcnKTtcbiAgICB9IEBlbHNlIHtcbiAgICAgIHNyYzogdXJsKCcjeyRmaWxlLXBhdGh9LmVvdCcpO1xuICAgICAgc3JjOiB1cmwoJyN7JGZpbGUtcGF0aH0uZW90PyNpZWZpeCcpICAgICAgICAgICAgICAgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLFxuICAgICAgICAgICB1cmwoJyN7JGZpbGUtcGF0aH0ud29mZicpICAgICAgICAgICAgICAgICAgICAgZm9ybWF0KCd3b2ZmJyksXG4gICAgICAgICAgIHVybCgnI3skZmlsZS1wYXRofS50dGYnKSAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQoJ3RydWV0eXBlJyksXG4gICAgICAgICAgIHVybCgnI3skZmlsZS1wYXRofS5zdmcjI3skZm9udC1mYW1pbHl9JykgICAgICBmb3JtYXQoJ3N2ZycpO1xuICAgIH1cbiAgfVxufVxuIiwKCQkiLy8gRm9udCBmZWF0dXJlIHNldHRpbmdzIG1peGluIGFuZCBwcm9wZXJ0eSBkZWZhdWx0LlxuLy8gRXhhbXBsZXM6IEBpbmNsdWRlIGZvbnQtZmVhdHVyZS1zZXR0aW5ncyhcImxpZ2FcIik7XG4vLyAgICAgICAgICAgQGluY2x1ZGUgZm9udC1mZWF0dXJlLXNldHRpbmdzKFwibG51bVwiIGZhbHNlKTtcbi8vICAgICAgICAgICBAaW5jbHVkZSBmb250LWZlYXR1cmUtc2V0dGluZ3MoXCJwbnVtXCIgMSwgXCJrZXJuXCIgMCk7XG4vLyAgICAgICAgICAgQGluY2x1ZGUgZm9udC1mZWF0dXJlLXNldHRpbmdzKFwic3MwMVwiLCBcInNzMDJcIik7XG5cbkBtaXhpbiBmb250LWZlYXR1cmUtc2V0dGluZ3MoJHNldHRpbmdzLi4uKSB7XG4gIEBpZiBsZW5ndGgoJHNldHRpbmdzKSA9PSAwIHsgJHNldHRpbmdzOiBub25lOyB9XG4gIEBpbmNsdWRlIHByZWZpeGVyKGZvbnQtZmVhdHVyZS1zZXR0aW5ncywgJHNldHRpbmdzLCB3ZWJraXQgbW96IG1zIHNwZWMpO1xufSIsCgkJIkBtaXhpbiBoeXBoZW5zKCRoeXBoZW5hdGlvbjogbm9uZSkge1xuLy8gbm9uZSB8IG1hbnVhbCB8IGF1dG9cbiAgQGluY2x1ZGUgcHJlZml4ZXIoaHlwaGVucywgJGh5cGhlbmF0aW9uLCB3ZWJraXQgbW96IG1zIHNwZWMpO1xufSIsCgkJIi8vIEhpRFBJIG1peGluLiBEZWZhdWx0IHZhbHVlIHNldCB0byAxLjMgdG8gdGFyZ2V0IEdvb2dsZSBOZXh1cyA3IChodHRwOi8vYmphbmdvLmNvbS9hcnRpY2xlcy9taW4tZGV2aWNlLXBpeGVsLXJhdGlvLylcbkBtaXhpbiBoaWRwaSgkcmF0aW86IDEuMykge1xuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86ICRyYXRpbyksXG4gIG9ubHkgc2NyZWVuIGFuZCAobWluLS1tb3otZGV2aWNlLXBpeGVsLXJhdGlvOiAkcmF0aW8pLFxuICBvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86ICN7JHJhdGlvfS8xKSxcbiAgb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogI3tyb3VuZCgkcmF0aW8qOTYpfWRwaSksXG4gIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246ICN7JHJhdGlvfWRwcHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuIiwKCQkiQG1peGluIGltYWdlLXJlbmRlcmluZyAoJG1vZGU6YXV0bykge1xuXG4gIEBpZiAoJG1vZGUgPT0gY3Jpc3AtZWRnZXMpIHtcbiAgICAgIC1tcy1pbnRlcnBvbGF0aW9uLW1vZGU6IG5lYXJlc3QtbmVpZ2hib3I7IC8vIElFOCtcbiAgICAgIGltYWdlLXJlbmRlcmluZzogLW1vei1jcmlzcC1lZGdlcztcbiAgICAgIGltYWdlLXJlbmRlcmluZzogLW8tY3Jpc3AtZWRnZXM7XG4gICAgICBpbWFnZS1yZW5kZXJpbmc6IC13ZWJraXQtb3B0aW1pemUtY29udHJhc3Q7XG4gICAgICBpbWFnZS1yZW5kZXJpbmc6IGNyaXNwLWVkZ2VzO1xuICB9XG5cbiAgQGVsc2Uge1xuICAgICAgaW1hZ2UtcmVuZGVyaW5nOiAkbW9kZTtcbiAgfVxufVxuIiwKCQkiLy8gTGVnYWN5IHN1cHBvcnQgZm9yIGlubGluZS1ibG9jayBpbiBJRTcgKG1heWJlIElFNilcbkBtaXhpbiBpbmxpbmUtYmxvY2sge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbiAgem9vbTogMTtcbiAgKmRpc3BsYXk6IGlubGluZTtcbiAgKnZlcnRpY2FsLWFsaWduOiBhdXRvO1xufVxuIiwKCQkiLy8gQWRkcyBrZXlmcmFtZXMgYmxvY2tzIGZvciBzdXBwb3J0ZWQgcHJlZml4ZXMsIHJlbW92aW5nIHJlZHVuZGFudCBwcmVmaXhlcyBpbiB0aGUgYmxvY2sncyBjb250ZW50XG5AbWl4aW4ga2V5ZnJhbWVzKCRuYW1lKSB7XG4gICRvcmlnaW5hbC1wcmVmaXgtZm9yLXdlYmtpdDogICAgJHByZWZpeC1mb3Itd2Via2l0O1xuICAkb3JpZ2luYWwtcHJlZml4LWZvci1tb3ppbGxhOiAgICRwcmVmaXgtZm9yLW1vemlsbGE7XG4gICRvcmlnaW5hbC1wcmVmaXgtZm9yLW1pY3Jvc29mdDogJHByZWZpeC1mb3ItbWljcm9zb2Z0O1xuICAkb3JpZ2luYWwtcHJlZml4LWZvci1vcGVyYTogICAgICRwcmVmaXgtZm9yLW9wZXJhO1xuICAkb3JpZ2luYWwtcHJlZml4LWZvci1zcGVjOiAgICAgICRwcmVmaXgtZm9yLXNwZWM7XG5cbiAgQGlmICRvcmlnaW5hbC1wcmVmaXgtZm9yLXdlYmtpdCB7XG4gICAgQGluY2x1ZGUgZGlzYWJsZS1wcmVmaXgtZm9yLWFsbCgpO1xuICAgICRwcmVmaXgtZm9yLXdlYmtpdDogdHJ1ZTtcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgI3skbmFtZX0ge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG4gIEBpZiAkb3JpZ2luYWwtcHJlZml4LWZvci1tb3ppbGxhIHtcbiAgICBAaW5jbHVkZSBkaXNhYmxlLXByZWZpeC1mb3ItYWxsKCk7XG4gICAgJHByZWZpeC1mb3ItbW96aWxsYTogdHJ1ZTtcbiAgICBALW1vei1rZXlmcmFtZXMgI3skbmFtZX0ge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG5cbiAgJHByZWZpeC1mb3Itd2Via2l0OiAgICAkb3JpZ2luYWwtcHJlZml4LWZvci13ZWJraXQ7XG4gICRwcmVmaXgtZm9yLW1vemlsbGE6ICAgJG9yaWdpbmFsLXByZWZpeC1mb3ItbW96aWxsYTtcbiAgJHByZWZpeC1mb3ItbWljcm9zb2Z0OiAkb3JpZ2luYWwtcHJlZml4LWZvci1taWNyb3NvZnQ7XG4gICRwcmVmaXgtZm9yLW9wZXJhOiAgICAgJG9yaWdpbmFsLXByZWZpeC1mb3Itb3BlcmE7XG4gICRwcmVmaXgtZm9yLXNwZWM6ICAgICAgJG9yaWdpbmFsLXByZWZpeC1mb3Itc3BlYztcblxuICBAaWYgJG9yaWdpbmFsLXByZWZpeC1mb3Itc3BlYyB7XG4gICAgQGtleWZyYW1lcyAjeyRuYW1lfSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbn1cbiIsCgkJIkBtaXhpbiBsaW5lYXItZ3JhZGllbnQoJHBvcywgJEcxLCAkRzI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICRHMzogbnVsbCwgJEc0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAkRzU6IG51bGwsICRHNjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgJEc3OiBudWxsLCAkRzg6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICRHOTogbnVsbCwgJEcxMDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgJGZhbGxiYWNrOiBudWxsKSB7XG4gIC8vIERldGVjdCB3aGF0IHR5cGUgb2YgdmFsdWUgZXhpc3RzIGluICRwb3NcbiAgJHBvcy10eXBlOiB0eXBlLW9mKG50aCgkcG9zLCAxKSk7XG4gICRwb3Mtc3BlYzogbnVsbDtcbiAgJHBvcy1kZWdyZWU6IG51bGw7XG5cbiAgLy8gSWYgJHBvcyBpcyBtaXNzaW5nIGZyb20gbWl4aW4sIHJlYXNzaWduIHZhcnMgYW5kIGFkZCBkZWZhdWx0IHBvc2l0aW9uXG4gIEBpZiAoJHBvcy10eXBlID09IGNvbG9yKSBvciAobnRoKCRwb3MsIDEpID09IFwidHJhbnNwYXJlbnRcIikgIHtcbiAgICAkRzEwOiAkRzk7ICRHOTogJEc4OyAkRzg6ICRHNzsgJEc3OiAkRzY7ICRHNjogJEc1O1xuICAgICAkRzU6ICRHNDsgJEc0OiAkRzM7ICRHMzogJEcyOyAkRzI6ICRHMTsgJEcxOiAkcG9zO1xuICAgICAkcG9zOiBudWxsO1xuICB9XG5cbiAgQGlmICRwb3Mge1xuICAgICRwb3NpdGlvbnM6IF9saW5lYXItcG9zaXRpb25zLXBhcnNlcigkcG9zKTtcbiAgICAkcG9zLWRlZ3JlZTogbnRoKCRwb3NpdGlvbnMsIDEpO1xuICAgICRwb3Mtc3BlYzogICBudGgoJHBvc2l0aW9ucywgMik7XG4gIH1cblxuICAkZnVsbDogJEcxLCAkRzIsICRHMywgJEc0LCAkRzUsICRHNiwgJEc3LCAkRzgsICRHOSwgJEcxMDtcblxuICAvLyBTZXQgJEcxIGFzIHRoZSBkZWZhdWx0IGZhbGxiYWNrIGNvbG9yXG4gICRmYWxsYmFjay1jb2xvcjogbnRoKCRHMSwgMSk7XG5cbiAgLy8gSWYgJGZhbGxiYWNrIGlzIGEgY29sb3IgdXNlIHRoYXQgY29sb3IgYXMgdGhlIGZhbGxiYWNrIGNvbG9yXG4gIEBpZiAodHlwZS1vZigkZmFsbGJhY2spID09IGNvbG9yKSBvciAoJGZhbGxiYWNrID09IFwidHJhbnNwYXJlbnRcIikge1xuICAgICRmYWxsYmFjay1jb2xvcjogJGZhbGxiYWNrO1xuICB9XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogJGZhbGxiYWNrLWNvbG9yO1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCgkcG9zLWRlZ3JlZSAkZnVsbCk7IC8vIFNhZmFyaSA1LjErLCBDaHJvbWVcbiAgYmFja2dyb3VuZC1pbWFnZTogdW5xdW90ZShcImxpbmVhci1ncmFkaWVudCgjeyRwb3Mtc3BlY30jeyRmdWxsfSlcIik7XG59XG4iLAoJCSJAbWl4aW4gcGVyc3BlY3RpdmUoJGRlcHRoOiBub25lKSB7XG4gIC8vIG5vbmUgfCA8bGVuZ3RoPlxuICBAaW5jbHVkZSBwcmVmaXhlcihwZXJzcGVjdGl2ZSwgJGRlcHRoLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gcGVyc3BlY3RpdmUtb3JpZ2luKCR2YWx1ZTogNTAlIDUwJSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihwZXJzcGVjdGl2ZS1vcmlnaW4sICR2YWx1ZSwgd2Via2l0IG1veiBzcGVjKTtcbn1cbiIsCgkJIi8vIFJlcXVpcmVzIFNhc3MgMy4xK1xuQG1peGluIHJhZGlhbC1ncmFkaWVudCgkRzEsICAgICAgICAkRzIsXG4gICAgICAgICAgICAgICAgICAgICAgICRHMzogbnVsbCwgJEc0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAkRzU6IG51bGwsICRHNjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgJEc3OiBudWxsLCAkRzg6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICRHOTogbnVsbCwgJEcxMDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgJHBvczogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgJHNoYXBlLXNpemU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICRmYWxsYmFjazogbnVsbCkge1xuXG4gICRkYXRhOiBfcmFkaWFsLWFyZy1wYXJzZXIoJEcxLCAkRzIsICRwb3MsICRzaGFwZS1zaXplKTtcbiAgJEcxOiAgbnRoKCRkYXRhLCAxKTtcbiAgJEcyOiAgbnRoKCRkYXRhLCAyKTtcbiAgJHBvczogbnRoKCRkYXRhLCAzKTtcbiAgJHNoYXBlLXNpemU6IG50aCgkZGF0YSwgNCk7XG5cbiAgJGZ1bGw6ICRHMSwgJEcyLCAkRzMsICRHNCwgJEc1LCAkRzYsICRHNywgJEc4LCAkRzksICRHMTA7XG5cbiAgLy8gU3RyaXAgZGVwcmVjYXRlZCBjb3Zlci9jb250YWluIGZvciBzcGVjXG4gICRzaGFwZS1zaXplLXNwZWM6IF9zaGFwZS1zaXplLXN0cmlwcGVyKCRzaGFwZS1zaXplKTtcblxuICAvLyBTZXQgJEcxIGFzIHRoZSBkZWZhdWx0IGZhbGxiYWNrIGNvbG9yXG4gICRmaXJzdC1jb2xvcjogbnRoKCRmdWxsLCAxKTtcbiAgJGZhbGxiYWNrLWNvbG9yOiBudGgoJGZpcnN0LWNvbG9yLCAxKTtcblxuICBAaWYgKHR5cGUtb2YoJGZhbGxiYWNrKSA9PSBjb2xvcikgb3IgKCRmYWxsYmFjayA9PSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAkZmFsbGJhY2stY29sb3I6ICRmYWxsYmFjaztcbiAgfVxuXG4gIC8vIEFkZCBDb21tYXMgYW5kIHNwYWNlc1xuICAkc2hhcGUtc2l6ZTogaWYoJHNoYXBlLXNpemUsICcjeyRzaGFwZS1zaXplfSwgJywgbnVsbCk7XG4gICRwb3M6ICAgICAgICBpZigkcG9zLCAnI3skcG9zfSwgJywgbnVsbCk7XG4gICRwb3Mtc3BlYzogICBpZigkcG9zLCAnYXQgI3skcG9zfScsIG51bGwpO1xuICAkc2hhcGUtc2l6ZS1zcGVjOiBpZigoJHNoYXBlLXNpemUtc3BlYyAhPSAnICcpIGFuZCAoJHBvcyA9PSBudWxsKSwgJyN7JHNoYXBlLXNpemUtc3BlY30sICcsICcjeyRzaGFwZS1zaXplLXNwZWN9ICcpO1xuXG4gIGJhY2tncm91bmQtY29sb3I6ICAkZmFsbGJhY2stY29sb3I7XG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtcmFkaWFsLWdyYWRpZW50KHVucXVvdGUoI3skcG9zfSN7JHNoYXBlLXNpemV9I3skZnVsbH0pKTtcbiAgYmFja2dyb3VuZC1pbWFnZTogdW5xdW90ZShcInJhZGlhbC1ncmFkaWVudCgjeyRzaGFwZS1zaXplLXNwZWN9I3skcG9zLXNwZWN9I3skZnVsbH0pXCIpO1xufVxuIiwKCQkiQG1peGluIHRyYW5zZm9ybSgkcHJvcGVydHk6IG5vbmUpIHtcbi8vICBub25lIHwgPHRyYW5zZm9ybS1mdW5jdGlvbj5cbiAgQGluY2x1ZGUgcHJlZml4ZXIodHJhbnNmb3JtLCAkcHJvcGVydHksIHdlYmtpdCBtb3ogbXMgbyBzcGVjKTtcbn1cblxuQG1peGluIHRyYW5zZm9ybS1vcmlnaW4oJGF4ZXM6IDUwJSkge1xuLy8geC1heGlzIC0gbGVmdCB8IGNlbnRlciB8IHJpZ2h0ICB8IGxlbmd0aCB8ICVcbi8vIHktYXhpcyAtIHRvcCAgfCBjZW50ZXIgfCBib3R0b20gfCBsZW5ndGggfCAlXG4vLyB6LWF4aXMgLSAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoXG4gIEBpbmNsdWRlIHByZWZpeGVyKHRyYW5zZm9ybS1vcmlnaW4sICRheGVzLCB3ZWJraXQgbW96IG1zIG8gc3BlYyk7XG59XG5cbkBtaXhpbiB0cmFuc2Zvcm0tc3R5bGUgKCRzdHlsZTogZmxhdCkge1xuICBAaW5jbHVkZSBwcmVmaXhlcih0cmFuc2Zvcm0tc3R5bGUsICRzdHlsZSwgd2Via2l0IG1veiBtcyBvIHNwZWMpO1xufVxuIiwKCQkiLy8gU2hvcnRoYW5kIG1peGluLiBTdXBwb3J0cyBtdWx0aXBsZSBwYXJlbnRoZXNlcy1kZWxpbWluYXRlZCB2YWx1ZXMgZm9yIGVhY2ggdmFyaWFibGUuXG4vLyBFeGFtcGxlOiBAaW5jbHVkZSB0cmFuc2l0aW9uIChhbGwgMnMgZWFzZS1pbi1vdXQpO1xuLy8gICAgICAgICAgQGluY2x1ZGUgdHJhbnNpdGlvbiAob3BhY2l0eSAxcyBlYXNlLWluIDJzLCB3aWR0aCAycyBlYXNlLW91dCk7XG4vLyAgICAgICAgICBAaW5jbHVkZSB0cmFuc2l0aW9uLXByb3BlcnR5ICh0cmFuc2Zvcm0sIG9wYWNpdHkpO1xuXG5AbWl4aW4gdHJhbnNpdGlvbiAoJHByb3BlcnRpZXMuLi4pIHtcbiAgLy8gRml4IGZvciB2ZW5kb3ItcHJlZml4IHRyYW5zZm9ybSBwcm9wZXJ0eVxuICAkbmVlZHMtcHJlZml4ZXM6IGZhbHNlO1xuICAkd2Via2l0OiAoKTtcbiAgJG1vejogKCk7XG4gICRzcGVjOiAoKTtcblxuICAvLyBDcmVhdGUgbGlzdHMgZm9yIHZlbmRvci1wcmVmaXhlZCB0cmFuc2Zvcm1cbiAgQGVhY2ggJGxpc3QgaW4gJHByb3BlcnRpZXMge1xuICAgIEBpZiBudGgoJGxpc3QsIDEpID09IFwidHJhbnNmb3JtXCIge1xuICAgICAgJG5lZWRzLXByZWZpeGVzOiB0cnVlO1xuICAgICAgJGxpc3QxOiAtd2Via2l0LXRyYW5zZm9ybTtcbiAgICAgICRsaXN0MjogLW1vei10cmFuc2Zvcm07XG4gICAgICAkbGlzdDM6ICgpO1xuXG4gICAgICBAZWFjaCAkdmFyIGluICRsaXN0IHtcbiAgICAgICAgJGxpc3QzOiBqb2luKCRsaXN0MywgJHZhcik7XG5cbiAgICAgICAgQGlmICR2YXIgIT0gXCJ0cmFuc2Zvcm1cIiB7XG4gICAgICAgICAgJGxpc3QxOiBqb2luKCRsaXN0MSwgJHZhcik7XG4gICAgICAgICAgJGxpc3QyOiBqb2luKCRsaXN0MiwgJHZhcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJHdlYmtpdDogYXBwZW5kKCR3ZWJraXQsICRsaXN0MSk7XG4gICAgICAgICAkbW96OiBhcHBlbmQoJG1veiwgICAgJGxpc3QyKTtcbiAgICAgICAgJHNwZWM6IGFwcGVuZCgkc3BlYywgICAkbGlzdDMpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBsaXN0cyBmb3Igbm9uLXByZWZpeGVkIHRyYW5zaXRpb24gcHJvcGVydGllc1xuICAgIEBlbHNlIHtcbiAgICAgICR3ZWJraXQ6ICBhcHBlbmQoJHdlYmtpdCwgJGxpc3QsIGNvbW1hKTtcbiAgICAgICRtb3o6ICAgICBhcHBlbmQoJG1veiwgICAgJGxpc3QsIGNvbW1hKTtcbiAgICAgICRzcGVjOiAgICBhcHBlbmQoJHNwZWMsICAgJGxpc3QsIGNvbW1hKTtcbiAgICB9XG4gIH1cblxuICBAaWYgJG5lZWRzLXByZWZpeGVzIHtcbiAgICAtd2Via2l0LXRyYW5zaXRpb246ICR3ZWJraXQ7XG4gICAgICAgLW1vei10cmFuc2l0aW9uOiAkbW96O1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogJHNwZWM7XG4gIH1cbiAgQGVsc2Uge1xuICAgIEBpZiBsZW5ndGgoJHByb3BlcnRpZXMpID49IDEge1xuICAgICAgQGluY2x1ZGUgcHJlZml4ZXIodHJhbnNpdGlvbiwgJHByb3BlcnRpZXMsIHdlYmtpdCBtb3ogc3BlYyk7XG4gICAgfVxuXG4gICAgQGVsc2Uge1xuICAgICAgJHByb3BlcnRpZXM6IGFsbCAwLjE1cyBlYXNlLW91dCAwcztcbiAgICAgIEBpbmNsdWRlIHByZWZpeGVyKHRyYW5zaXRpb24sICRwcm9wZXJ0aWVzLCB3ZWJraXQgbW96IHNwZWMpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gdHJhbnNpdGlvbi1wcm9wZXJ0eSAoJHByb3BlcnRpZXMuLi4pIHtcbiAgIC13ZWJraXQtdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNpdGlvbi1wcm9wZXJ0eS1uYW1lcygkcHJvcGVydGllcywgJ3dlYmtpdCcpO1xuICAgICAgLW1vei10cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2l0aW9uLXByb3BlcnR5LW5hbWVzKCRwcm9wZXJ0aWVzLCAnbW96Jyk7XG4gICAgICAgICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IHRyYW5zaXRpb24tcHJvcGVydHktbmFtZXMoJHByb3BlcnRpZXMsIGZhbHNlKTtcbn1cblxuQG1peGluIHRyYW5zaXRpb24tZHVyYXRpb24gKCR0aW1lcy4uLikge1xuICBAaW5jbHVkZSBwcmVmaXhlcih0cmFuc2l0aW9uLWR1cmF0aW9uLCAkdGltZXMsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbkBtaXhpbiB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbiAoJG1vdGlvbnMuLi4pIHtcbi8vIGVhc2UgfCBsaW5lYXIgfCBlYXNlLWluIHwgZWFzZS1vdXQgfCBlYXNlLWluLW91dCB8IGN1YmljLWJlemllcigpXG4gIEBpbmNsdWRlIHByZWZpeGVyKHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uLCAkbW90aW9ucywgd2Via2l0IG1veiBzcGVjKTtcbn1cblxuQG1peGluIHRyYW5zaXRpb24tZGVsYXkgKCR0aW1lcy4uLikge1xuICBAaW5jbHVkZSBwcmVmaXhlcih0cmFuc2l0aW9uLWRlbGF5LCAkdGltZXMsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG4iLAoJCSJAbWl4aW4gdXNlci1zZWxlY3QoJGFyZzogbm9uZSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcih1c2VyLXNlbGVjdCwgJGFyZywgd2Via2l0IG1veiBtcyBzcGVjKTtcbn1cbiIsCgkJIkBtaXhpbiBwbGFjZWhvbGRlciB7XG4gICRwbGFjZWhvbGRlcnM6IFwiOi13ZWJraXQtaW5wdXRcIiBcIjotbW96XCIgXCItbW96XCIgXCItbXMtaW5wdXRcIjtcbiAgQGVhY2ggJHBsYWNlaG9sZGVyIGluICRwbGFjZWhvbGRlcnMge1xuICAgICY6I3skcGxhY2Vob2xkZXJ9LXBsYWNlaG9sZGVyIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfVxufVxuIiwKCQkiQG1peGluIGJ1dHRvbiAoJHN0eWxlOiBzaW1wbGUsICRiYXNlLWNvbG9yOiAjNDI5NGYwLCAkdGV4dC1zaXplOiBpbmhlcml0LCAkcGFkZGluZzogN3B4IDE4cHgpIHtcblxuICBAaWYgdHlwZS1vZigkc3R5bGUpID09IHN0cmluZyBhbmQgdHlwZS1vZigkYmFzZS1jb2xvcikgPT0gY29sb3Ige1xuICAgIEBpbmNsdWRlIGJ1dHRvbnN0eWxlKCRzdHlsZSwgJGJhc2UtY29sb3IsICR0ZXh0LXNpemUsICRwYWRkaW5nKTtcbiAgfVxuXG4gIEBpZiB0eXBlLW9mKCRzdHlsZSkgPT0gc3RyaW5nIGFuZCB0eXBlLW9mKCRiYXNlLWNvbG9yKSA9PSBudW1iZXIge1xuICAgICRwYWRkaW5nOiAkdGV4dC1zaXplO1xuICAgICR0ZXh0LXNpemU6ICRiYXNlLWNvbG9yO1xuICAgICRiYXNlLWNvbG9yOiAjNDI5NGYwO1xuXG4gICAgQGlmICRwYWRkaW5nID09IGluaGVyaXQge1xuICAgICAgJHBhZGRpbmc6IDdweCAxOHB4O1xuICAgIH1cblxuICAgIEBpbmNsdWRlIGJ1dHRvbnN0eWxlKCRzdHlsZSwgJGJhc2UtY29sb3IsICR0ZXh0LXNpemUsICRwYWRkaW5nKTtcbiAgfVxuXG4gIEBpZiB0eXBlLW9mKCRzdHlsZSkgPT0gY29sb3IgYW5kIHR5cGUtb2YoJGJhc2UtY29sb3IpID09IGNvbG9yIHtcbiAgICAkYmFzZS1jb2xvcjogJHN0eWxlO1xuICAgICRzdHlsZTogc2ltcGxlO1xuICAgIEBpbmNsdWRlIGJ1dHRvbnN0eWxlKCRzdHlsZSwgJGJhc2UtY29sb3IsICR0ZXh0LXNpemUsICRwYWRkaW5nKTtcbiAgfVxuXG4gIEBpZiB0eXBlLW9mKCRzdHlsZSkgPT0gY29sb3IgYW5kIHR5cGUtb2YoJGJhc2UtY29sb3IpID09IG51bWJlciB7XG4gICAgJHBhZGRpbmc6ICR0ZXh0LXNpemU7XG4gICAgJHRleHQtc2l6ZTogJGJhc2UtY29sb3I7XG4gICAgJGJhc2UtY29sb3I6ICRzdHlsZTtcbiAgICAkc3R5bGU6IHNpbXBsZTtcblxuICAgIEBpZiAkcGFkZGluZyA9PSBpbmhlcml0IHtcbiAgICAgICRwYWRkaW5nOiA3cHggMThweDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBidXR0b25zdHlsZSgkc3R5bGUsICRiYXNlLWNvbG9yLCAkdGV4dC1zaXplLCAkcGFkZGluZyk7XG4gIH1cblxuICBAaWYgdHlwZS1vZigkc3R5bGUpID09IG51bWJlciB7XG4gICAgJHBhZGRpbmc6ICRiYXNlLWNvbG9yO1xuICAgICR0ZXh0LXNpemU6ICRzdHlsZTtcbiAgICAkYmFzZS1jb2xvcjogIzQyOTRmMDtcbiAgICAkc3R5bGU6IHNpbXBsZTtcblxuICAgIEBpZiAkcGFkZGluZyA9PSAjNDI5NGYwIHtcbiAgICAgICRwYWRkaW5nOiA3cHggMThweDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBidXR0b25zdHlsZSgkc3R5bGUsICRiYXNlLWNvbG9yLCAkdGV4dC1zaXplLCAkcGFkZGluZyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgfVxufVxuXG5cbi8vIFNlbGVjdG9yIFN0eWxlIEJ1dHRvblxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuQG1peGluIGJ1dHRvbnN0eWxlKCR0eXBlLCAkYi1jb2xvciwgJHQtc2l6ZSwgJHBhZCkge1xuICAvLyBHcmF5c2NhbGUgYnV0dG9uXG4gIEBpZiAkdHlwZSA9PSBzaW1wbGUgYW5kICRiLWNvbG9yID09IGdyYXlzY2FsZSgkYi1jb2xvcikge1xuICAgIEBpbmNsdWRlIHNpbXBsZSgkYi1jb2xvciwgdHJ1ZSwgJHQtc2l6ZSwgJHBhZCk7XG4gIH1cblxuICBAaWYgJHR5cGUgPT0gc2hpbnkgYW5kICRiLWNvbG9yID09IGdyYXlzY2FsZSgkYi1jb2xvcikge1xuICAgIEBpbmNsdWRlIHNoaW55KCRiLWNvbG9yLCB0cnVlLCAkdC1zaXplLCAkcGFkKTtcbiAgfVxuXG4gIEBpZiAkdHlwZSA9PSBwaWxsIGFuZCAkYi1jb2xvciA9PSBncmF5c2NhbGUoJGItY29sb3IpIHtcbiAgICBAaW5jbHVkZSBwaWxsKCRiLWNvbG9yLCB0cnVlLCAkdC1zaXplLCAkcGFkKTtcbiAgfVxuXG4gIEBpZiAkdHlwZSA9PSBmbGF0IGFuZCAkYi1jb2xvciA9PSBncmF5c2NhbGUoJGItY29sb3IpIHtcbiAgICBAaW5jbHVkZSBmbGF0KCRiLWNvbG9yLCB0cnVlLCAkdC1zaXplLCAkcGFkKTtcbiAgfVxuXG4gIC8vIENvbG9yZWQgYnV0dG9uXG4gIEBpZiAkdHlwZSA9PSBzaW1wbGUge1xuICAgIEBpbmNsdWRlIHNpbXBsZSgkYi1jb2xvciwgZmFsc2UsICR0LXNpemUsICRwYWQpO1xuICB9XG5cbiAgQGVsc2UgaWYgJHR5cGUgPT0gc2hpbnkge1xuICAgIEBpbmNsdWRlIHNoaW55KCRiLWNvbG9yLCBmYWxzZSwgJHQtc2l6ZSwgJHBhZCk7XG4gIH1cblxuICBAZWxzZSBpZiAkdHlwZSA9PSBwaWxsIHtcbiAgICBAaW5jbHVkZSBwaWxsKCRiLWNvbG9yLCBmYWxzZSwgJHQtc2l6ZSwgJHBhZCk7XG4gIH1cblxuICBAZWxzZSBpZiAkdHlwZSA9PSBmbGF0IHtcbiAgICBAaW5jbHVkZSBmbGF0KCRiLWNvbG9yLCBmYWxzZSwgJHQtc2l6ZSwgJHBhZCk7XG4gIH1cbn1cblxuXG4vLyBTaW1wbGUgQnV0dG9uXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG5AbWl4aW4gc2ltcGxlKCRiYXNlLWNvbG9yLCAkZ3JheXNjYWxlOiBmYWxzZSwgJHRleHRzaXplOiBpbmhlcml0LCAkcGFkZGluZzogN3B4IDE4cHgpIHtcbiAgJGNvbG9yOiAgICAgICAgIGhzbCgwLCAwLCAxMDAlKTtcbiAgJGJvcmRlcjogICAgICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHNhdHVyYXRpb246ICA5JSwgICRsaWdodG5lc3M6IC0xNCUpO1xuICAkaW5zZXQtc2hhZG93OiAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkc2F0dXJhdGlvbjogLTglLCAgJGxpZ2h0bmVzczogIDE1JSk7XG4gICRzdG9wLWdyYWRpZW50OiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiAgOSUsICAkbGlnaHRuZXNzOiAtMTElKTtcbiAgJHRleHQtc2hhZG93OiAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHNhdHVyYXRpb246ICAxNSUsICRsaWdodG5lc3M6IC0xOCUpO1xuXG4gIEBpZiBpcy1saWdodCgkYmFzZS1jb2xvcikge1xuICAgICRjb2xvcjogICAgICAgaHNsKDAsIDAsIDIwJSk7XG4gICAgJHRleHQtc2hhZG93OiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiAxMCUsICRsaWdodG5lc3M6IDQlKTtcbiAgfVxuXG4gIEBpZiAkZ3JheXNjYWxlID09IHRydWUge1xuICAgICRib3JkZXI6ICAgICAgICBncmF5c2NhbGUoJGJvcmRlcik7XG4gICAgJGluc2V0LXNoYWRvdzogIGdyYXlzY2FsZSgkaW5zZXQtc2hhZG93KTtcbiAgICAkc3RvcC1ncmFkaWVudDogZ3JheXNjYWxlKCRzdG9wLWdyYWRpZW50KTtcbiAgICAkdGV4dC1zaGFkb3c6ICAgZ3JheXNjYWxlKCR0ZXh0LXNoYWRvdyk7XG4gIH1cblxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgMCAkaW5zZXQtc2hhZG93O1xuICBjb2xvcjogJGNvbG9yO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogJHRleHRzaXplO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgQGluY2x1ZGUgbGluZWFyLWdyYWRpZW50ICgkYmFzZS1jb2xvciwgJHN0b3AtZ3JhZGllbnQpO1xuICBwYWRkaW5nOiAkcGFkZGluZztcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LXNoYWRvdzogMCAxcHggMCAkdGV4dC1zaGFkb3c7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgJGJhc2UtY29sb3ItaG92ZXI6ICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHNhdHVyYXRpb246IC00JSwgJGxpZ2h0bmVzczogLTUlKTtcbiAgICAkaW5zZXQtc2hhZG93LWhvdmVyOiAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkc2F0dXJhdGlvbjogLTclLCAkbGlnaHRuZXNzOiAgNSUpO1xuICAgICRzdG9wLWdyYWRpZW50LWhvdmVyOiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiAgOCUsICRsaWdodG5lc3M6IC0xNCUpO1xuXG4gICAgQGlmICRncmF5c2NhbGUgPT0gdHJ1ZSB7XG4gICAgICAkYmFzZS1jb2xvci1ob3ZlcjogICAgZ3JheXNjYWxlKCRiYXNlLWNvbG9yLWhvdmVyKTtcbiAgICAgICRpbnNldC1zaGFkb3ctaG92ZXI6ICBncmF5c2NhbGUoJGluc2V0LXNoYWRvdy1ob3Zlcik7XG4gICAgICAkc3RvcC1ncmFkaWVudC1ob3ZlcjogZ3JheXNjYWxlKCRzdG9wLWdyYWRpZW50LWhvdmVyKTtcbiAgICB9XG5cbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwIDAgJGluc2V0LXNoYWRvdy1ob3ZlcjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgQGluY2x1ZGUgbGluZWFyLWdyYWRpZW50ICgkYmFzZS1jb2xvci1ob3ZlciwgJHN0b3AtZ3JhZGllbnQtaG92ZXIpO1xuICB9XG5cbiAgJjphY3RpdmU6bm90KDpkaXNhYmxlZCksXG4gICY6Zm9jdXM6bm90KDpkaXNhYmxlZCkge1xuICAgICRib3JkZXItYWN0aXZlOiAgICAgICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiA5JSwgJGxpZ2h0bmVzczogLTE0JSk7XG4gICAgJGluc2V0LXNoYWRvdy1hY3RpdmU6IGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHNhdHVyYXRpb246IDclLCAkbGlnaHRuZXNzOiAtMTclKTtcblxuICAgIEBpZiAkZ3JheXNjYWxlID09IHRydWUge1xuICAgICAgJGJvcmRlci1hY3RpdmU6ICAgICAgIGdyYXlzY2FsZSgkYm9yZGVyLWFjdGl2ZSk7XG4gICAgICAkaW5zZXQtc2hhZG93LWFjdGl2ZTogZ3JheXNjYWxlKCRpbnNldC1zaGFkb3ctYWN0aXZlKTtcbiAgICB9XG5cbiAgICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyLWFjdGl2ZTtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgOHB4IDRweCAkaW5zZXQtc2hhZG93LWFjdGl2ZSwgaW5zZXQgMCAwIDhweCA0cHggJGluc2V0LXNoYWRvdy1hY3RpdmU7XG4gIH1cbn1cblxuXG4vLyBTaGlueSBCdXR0b25cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbkBtaXhpbiBzaGlueSgkYmFzZS1jb2xvciwgJGdyYXlzY2FsZTogZmFsc2UsICR0ZXh0c2l6ZTogaW5oZXJpdCwgJHBhZGRpbmc6IDdweCAxOHB4KSB7XG4gICRjb2xvcjogICAgICAgICBoc2woMCwgMCwgMTAwJSk7XG4gICRib3JkZXI6ICAgICAgICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRyZWQ6IC0xMTcsICRncmVlbjogLTExMSwgJGJsdWU6IC04MSk7XG4gICRib3JkZXItYm90dG9tOiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRyZWQ6IC0xMjYsICRncmVlbjogLTEyNywgJGJsdWU6IC0xMjIpO1xuICAkZm91cnRoLXN0b3A6ICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAtNzksICAkZ3JlZW46IC03MCwgICRibHVlOiAtNDYpO1xuICAkaW5zZXQtc2hhZG93OiAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAgMzcsICAkZ3JlZW46ICAyOSwgICRibHVlOiAgMTIpO1xuICAkc2Vjb25kLXN0b3A6ICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAtNTYsICAkZ3JlZW46IC01MCwgICRibHVlOiAtMzMpO1xuICAkdGV4dC1zaGFkb3c6ICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAtMTQwLCAkZ3JlZW46IC0xNDEsICRibHVlOiAtMTE0KTtcbiAgJHRoaXJkLXN0b3A6ICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHJlZDogLTg2LCAgJGdyZWVuOiAtNzUsICAkYmx1ZTogLTQ4KTtcblxuICBAaWYgaXMtbGlnaHQoJGJhc2UtY29sb3IpIHtcbiAgICAkY29sb3I6ICAgICAgIGhzbCgwLCAwLCAyMCUpO1xuICAgICR0ZXh0LXNoYWRvdzogYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkc2F0dXJhdGlvbjogMTAlLCAkbGlnaHRuZXNzOiA0JSk7XG4gIH1cblxuICBAaWYgJGdyYXlzY2FsZSA9PSB0cnVlIHtcbiAgICAkYm9yZGVyOiAgICAgICAgZ3JheXNjYWxlKCRib3JkZXIpO1xuICAgICRib3JkZXItYm90dG9tOiBncmF5c2NhbGUoJGJvcmRlci1ib3R0b20pO1xuICAgICRmb3VydGgtc3RvcDogICBncmF5c2NhbGUoJGZvdXJ0aC1zdG9wKTtcbiAgICAkaW5zZXQtc2hhZG93OiAgZ3JheXNjYWxlKCRpbnNldC1zaGFkb3cpO1xuICAgICRzZWNvbmQtc3RvcDogICBncmF5c2NhbGUoJHNlY29uZC1zdG9wKTtcbiAgICAkdGV4dC1zaGFkb3c6ICAgZ3JheXNjYWxlKCR0ZXh0LXNoYWRvdyk7XG4gICAgJHRoaXJkLXN0b3A6ICAgIGdyYXlzY2FsZSgkdGhpcmQtc3RvcCk7XG4gIH1cblxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGJvcmRlci1ib3R0b207XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAwICRpbnNldC1zaGFkb3c7XG4gIGNvbG9yOiAkY29sb3I7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAkdGV4dHNpemU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBAaW5jbHVkZSBsaW5lYXItZ3JhZGllbnQodG9wLCAkYmFzZS1jb2xvciAwJSwgJHNlY29uZC1zdG9wIDUwJSwgJHRoaXJkLXN0b3AgNTAlLCAkZm91cnRoLXN0b3AgMTAwJSk7XG4gIHBhZGRpbmc6ICRwYWRkaW5nO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdGV4dC1zaGFkb3c6IDAgLTFweCAxcHggJHRleHQtc2hhZG93O1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgICRmaXJzdC1zdG9wLWhvdmVyOiAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAtMTMsICRncmVlbjogLTE1LCAkYmx1ZTogLTE4KTtcbiAgICAkc2Vjb25kLXN0b3AtaG92ZXI6IGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHJlZDogLTY2LCAkZ3JlZW46IC02MiwgJGJsdWU6IC01MSk7XG4gICAgJHRoaXJkLXN0b3AtaG92ZXI6ICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRyZWQ6IC05MywgJGdyZWVuOiAtODUsICRibHVlOiAtNjYpO1xuICAgICRmb3VydGgtc3RvcC1ob3ZlcjogYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAtODYsICRncmVlbjogLTgwLCAkYmx1ZTogLTYzKTtcblxuICAgIEBpZiAkZ3JheXNjYWxlID09IHRydWUge1xuICAgICAgJGZpcnN0LXN0b3AtaG92ZXI6ICBncmF5c2NhbGUoJGZpcnN0LXN0b3AtaG92ZXIpO1xuICAgICAgJHNlY29uZC1zdG9wLWhvdmVyOiBncmF5c2NhbGUoJHNlY29uZC1zdG9wLWhvdmVyKTtcbiAgICAgICR0aGlyZC1zdG9wLWhvdmVyOiAgZ3JheXNjYWxlKCR0aGlyZC1zdG9wLWhvdmVyKTtcbiAgICAgICRmb3VydGgtc3RvcC1ob3ZlcjogZ3JheXNjYWxlKCRmb3VydGgtc3RvcC1ob3Zlcik7XG4gICAgfVxuXG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIEBpbmNsdWRlIGxpbmVhci1ncmFkaWVudCh0b3AsICRmaXJzdC1zdG9wLWhvdmVyICAwJSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2Vjb25kLXN0b3AtaG92ZXIgNTAlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlyZC1zdG9wLWhvdmVyICA1MCUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZvdXJ0aC1zdG9wLWhvdmVyIDEwMCUpO1xuICB9XG5cbiAgJjphY3RpdmU6bm90KDpkaXNhYmxlZCksXG4gICY6Zm9jdXM6bm90KDpkaXNhYmxlZCkge1xuICAgICRpbnNldC1zaGFkb3ctYWN0aXZlOiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRyZWQ6IC0xMTEsICRncmVlbjogLTExNiwgJGJsdWU6IC0xMjIpO1xuXG4gICAgQGlmICRncmF5c2NhbGUgPT0gdHJ1ZSB7XG4gICAgICAkaW5zZXQtc2hhZG93LWFjdGl2ZTogZ3JheXNjYWxlKCRpbnNldC1zaGFkb3ctYWN0aXZlKTtcbiAgICB9XG5cbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCAwICRpbnNldC1zaGFkb3ctYWN0aXZlO1xuICB9XG59XG5cblxuLy8gUGlsbCBCdXR0b25cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbkBtaXhpbiBwaWxsKCRiYXNlLWNvbG9yLCAkZ3JheXNjYWxlOiBmYWxzZSwgJHRleHRzaXplOiBpbmhlcml0LCAkcGFkZGluZzogN3B4IDE4cHgpIHtcbiAgJGNvbG9yOiAgICAgICAgIGhzbCgwLCAwLCAxMDAlKTtcbiAgJGJvcmRlci1ib3R0b206IGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogIDgsICRzYXR1cmF0aW9uOiAtMTElLCAkbGlnaHRuZXNzOiAtMjYlKTtcbiAgJGJvcmRlci1zaWRlczogIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogIDQsICRzYXR1cmF0aW9uOiAtMjElLCAkbGlnaHRuZXNzOiAtMjElKTtcbiAgJGJvcmRlci10b3A6ICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogLTEsICRzYXR1cmF0aW9uOiAtMzAlLCAkbGlnaHRuZXNzOiAtMTUlKTtcbiAgJGluc2V0LXNoYWRvdzogIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogLTEsICRzYXR1cmF0aW9uOiAtMSUsICAkbGlnaHRuZXNzOiAgNyUpO1xuICAkc3RvcC1ncmFkaWVudDogYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiAgOCwgJHNhdHVyYXRpb246ICAxNCUsICRsaWdodG5lc3M6IC0xMCUpO1xuICAkdGV4dC1zaGFkb3c6ICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiAgNSwgJHNhdHVyYXRpb246IC0xOSUsICRsaWdodG5lc3M6IC0xNSUpO1xuXG4gIEBpZiBpcy1saWdodCgkYmFzZS1jb2xvcikge1xuICAgICRjb2xvcjogICAgICAgaHNsKDAsIDAsIDIwJSk7XG4gICAgJHRleHQtc2hhZG93OiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiAxMCUsICRsaWdodG5lc3M6IDQlKTtcbiAgfVxuXG4gIEBpZiAkZ3JheXNjYWxlID09IHRydWUge1xuICAgICRib3JkZXItYm90dG9tOiBncmF5c2NhbGUoJGJvcmRlci1ib3R0b20pO1xuICAgICRib3JkZXItc2lkZXM6ICBncmF5c2NhbGUoJGJvcmRlci1zaWRlcyk7XG4gICAgJGJvcmRlci10b3A6ICAgIGdyYXlzY2FsZSgkYm9yZGVyLXRvcCk7XG4gICAgJGluc2V0LXNoYWRvdzogIGdyYXlzY2FsZSgkaW5zZXQtc2hhZG93KTtcbiAgICAkc3RvcC1ncmFkaWVudDogZ3JheXNjYWxlKCRzdG9wLWdyYWRpZW50KTtcbiAgICAkdGV4dC1zaGFkb3c6ICAgZ3JheXNjYWxlKCR0ZXh0LXNoYWRvdyk7XG4gIH1cblxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyLXRvcDtcbiAgYm9yZGVyLWNvbG9yOiAkYm9yZGVyLXRvcCAkYm9yZGVyLXNpZGVzICRib3JkZXItYm90dG9tO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwIDAgJGluc2V0LXNoYWRvdztcbiAgY29sb3I6ICRjb2xvcjtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6ICR0ZXh0c2l6ZTtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIEBpbmNsdWRlIGxpbmVhci1ncmFkaWVudCAoJGJhc2UtY29sb3IsICRzdG9wLWdyYWRpZW50KTtcbiAgcGFkZGluZzogJHBhZGRpbmc7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LXNoYWRvdzogMCAtMXB4IDFweCAkdGV4dC1zaGFkb3c7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgJGJhc2UtY29sb3ItaG92ZXI6ICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaWdodG5lc3M6IC00LjUlKTtcbiAgICAkYm9yZGVyLWJvdHRvbTogICAgICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiAgOCwgJHNhdHVyYXRpb246ICAxMy41JSwgJGxpZ2h0bmVzczogLTMyJSk7XG4gICAgJGJvcmRlci1zaWRlczogICAgICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogIDQsICRzYXR1cmF0aW9uOiAtMiUsICAgICRsaWdodG5lc3M6IC0yNyUpO1xuICAgICRib3JkZXItdG9wOiAgICAgICAgICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRodWU6IC0xLCAkc2F0dXJhdGlvbjogLTE3JSwgICAkbGlnaHRuZXNzOiAtMjElKTtcbiAgICAkaW5zZXQtc2hhZG93LWhvdmVyOiAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAgICAgICAgICAgJHNhdHVyYXRpb246IC0xJSwgICAgJGxpZ2h0bmVzczogIDMlKTtcbiAgICAkc3RvcC1ncmFkaWVudC1ob3ZlcjogYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiAgOCwgJHNhdHVyYXRpb246IC00JSwgICAgJGxpZ2h0bmVzczogLTE1LjUlKTtcbiAgICAkdGV4dC1zaGFkb3ctaG92ZXI6ICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiAgNSwgJHNhdHVyYXRpb246IC01JSwgICAgJGxpZ2h0bmVzczogLTIyJSk7XG5cbiAgICBAaWYgJGdyYXlzY2FsZSA9PSB0cnVlIHtcbiAgICAgICRiYXNlLWNvbG9yLWhvdmVyOiAgICBncmF5c2NhbGUoJGJhc2UtY29sb3ItaG92ZXIpO1xuICAgICAgJGJvcmRlci1ib3R0b206ICAgICAgIGdyYXlzY2FsZSgkYm9yZGVyLWJvdHRvbSk7XG4gICAgICAkYm9yZGVyLXNpZGVzOiAgICAgICAgZ3JheXNjYWxlKCRib3JkZXItc2lkZXMpO1xuICAgICAgJGJvcmRlci10b3A6ICAgICAgICAgIGdyYXlzY2FsZSgkYm9yZGVyLXRvcCk7XG4gICAgICAkaW5zZXQtc2hhZG93LWhvdmVyOiAgZ3JheXNjYWxlKCRpbnNldC1zaGFkb3ctaG92ZXIpO1xuICAgICAgJHN0b3AtZ3JhZGllbnQtaG92ZXI6IGdyYXlzY2FsZSgkc3RvcC1ncmFkaWVudC1ob3Zlcik7XG4gICAgICAkdGV4dC1zaGFkb3ctaG92ZXI6ICAgZ3JheXNjYWxlKCR0ZXh0LXNoYWRvdy1ob3Zlcik7XG4gICAgfVxuXG4gICAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlci10b3A7XG4gICAgYm9yZGVyLWNvbG9yOiAkYm9yZGVyLXRvcCAkYm9yZGVyLXNpZGVzICRib3JkZXItYm90dG9tO1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgMCAkaW5zZXQtc2hhZG93LWhvdmVyO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBAaW5jbHVkZSBsaW5lYXItZ3JhZGllbnQgKCRiYXNlLWNvbG9yLWhvdmVyLCAkc3RvcC1ncmFkaWVudC1ob3Zlcik7XG4gICAgdGV4dC1zaGFkb3c6IDAgLTFweCAxcHggJHRleHQtc2hhZG93LWhvdmVyO1xuICAgIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIH1cblxuICAmOmFjdGl2ZTpub3QoOmRpc2FibGVkKSxcbiAgJjpmb2N1czpub3QoOmRpc2FibGVkKSB7XG4gICAgJGFjdGl2ZS1jb2xvcjogICAgICAgICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRodWU6IDQsICAkc2F0dXJhdGlvbjogLTEyJSwgICRsaWdodG5lc3M6IC0xMCUpO1xuICAgICRib3JkZXItYWN0aXZlOiAgICAgICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiA2LCAgJHNhdHVyYXRpb246IC0yLjUlLCAkbGlnaHRuZXNzOiAtMzAlKTtcbiAgICAkYm9yZGVyLWJvdHRvbS1hY3RpdmU6IGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogMTEsICRzYXR1cmF0aW9uOiAgNiUsICAgJGxpZ2h0bmVzczogLTMxJSk7XG4gICAgJGluc2V0LXNoYWRvdy1hY3RpdmU6ICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRodWU6IDksICAkc2F0dXJhdGlvbjogIDIlLCAgICRsaWdodG5lc3M6IC0yMS41JSk7XG4gICAgJHRleHQtc2hhZG93LWFjdGl2ZTogICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRodWU6IDUsICAkc2F0dXJhdGlvbjogLTEyJSwgICRsaWdodG5lc3M6IC0yMS41JSk7XG5cbiAgICBAaWYgJGdyYXlzY2FsZSA9PSB0cnVlIHtcbiAgICAgICRhY3RpdmUtY29sb3I6ICAgICAgICAgZ3JheXNjYWxlKCRhY3RpdmUtY29sb3IpO1xuICAgICAgJGJvcmRlci1hY3RpdmU6ICAgICAgICBncmF5c2NhbGUoJGJvcmRlci1hY3RpdmUpO1xuICAgICAgJGJvcmRlci1ib3R0b20tYWN0aXZlOiBncmF5c2NhbGUoJGJvcmRlci1ib3R0b20tYWN0aXZlKTtcbiAgICAgICRpbnNldC1zaGFkb3ctYWN0aXZlOiAgZ3JheXNjYWxlKCRpbnNldC1zaGFkb3ctYWN0aXZlKTtcbiAgICAgICR0ZXh0LXNoYWRvdy1hY3RpdmU6ICAgZ3JheXNjYWxlKCR0ZXh0LXNoYWRvdy1hY3RpdmUpO1xuICAgIH1cblxuICAgIGJhY2tncm91bmQ6ICRhY3RpdmUtY29sb3I7XG4gICAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlci1hY3RpdmU7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRib3JkZXItYm90dG9tLWFjdGl2ZTtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IDNweCAkaW5zZXQtc2hhZG93LWFjdGl2ZTtcbiAgICB0ZXh0LXNoYWRvdzogMCAtMXB4IDFweCAkdGV4dC1zaGFkb3ctYWN0aXZlO1xuICB9XG59XG5cblxuXG4vLyBGbGF0IEJ1dHRvblxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuQG1peGluIGZsYXQoJGJhc2UtY29sb3IsICRncmF5c2NhbGU6IGZhbHNlLCAkdGV4dHNpemU6IGluaGVyaXQsICRwYWRkaW5nOiA3cHggMThweCkge1xuICAkY29sb3I6ICAgICAgICAgaHNsKDAsIDAsIDEwMCUpO1xuXG4gIEBpZiBpcy1saWdodCgkYmFzZS1jb2xvcikge1xuICAgICRjb2xvcjogICAgICAgaHNsKDAsIDAsIDIwJSk7XG4gIH1cblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFzZS1jb2xvcjtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiAkY29sb3I7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgcGFkZGluZzogN3B4IDE4cHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpe1xuICAgICRiYXNlLWNvbG9yLWhvdmVyOiAgICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiA0JSwgJGxpZ2h0bmVzczogNSUpO1xuXG4gICAgQGlmICRncmF5c2NhbGUgPT0gdHJ1ZSB7XG4gICAgICAkYmFzZS1jb2xvci1ob3ZlcjogZ3JheXNjYWxlKCRiYXNlLWNvbG9yLWhvdmVyKTtcbiAgICB9XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFzZS1jb2xvci1ob3ZlcjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICAmOmFjdGl2ZTpub3QoOmRpc2FibGVkKSxcbiAgJjpmb2N1czpub3QoOmRpc2FibGVkKSB7XG4gICAgJGJhc2UtY29sb3ItYWN0aXZlOiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiAtNCUsICRsaWdodG5lc3M6IC01JSk7XG5cbiAgICBAaWYgJGdyYXlzY2FsZSA9PSB0cnVlIHtcbiAgICAgICRiYXNlLWNvbG9yLWFjdGl2ZTogZ3JheXNjYWxlKCRiYXNlLWNvbG9yLWFjdGl2ZSk7XG4gICAgfVxuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJhc2UtY29sb3ItYWN0aXZlO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxufVxuIiwKCQkiLy8gTW9kZXJuIG1pY3JvIGNsZWFyZml4IHByb3ZpZGVzIGFuIGVhc3kgd2F5IHRvIGNvbnRhaW4gZmxvYXRzIHdpdGhvdXQgYWRkaW5nIGFkZGl0aW9uYWwgbWFya3VwLlxuLy9cbi8vIEV4YW1wbGUgdXNhZ2U6XG4vL1xuLy8gICAgLy8gQ29udGFpbiBhbGwgZmxvYXRzIHdpdGhpbiAud3JhcHBlclxuLy8gICAgLndyYXBwZXIge1xuLy8gICAgICBAaW5jbHVkZSBjbGVhcmZpeDtcbi8vICAgICAgLmNvbnRlbnQsXG4vLyAgICAgIC5zaWRlYmFyIHtcbi8vICAgICAgICBmbG9hdCA6IGxlZnQ7XG4vLyAgICAgIH1cbi8vICAgIH1cblxuQG1peGluIGNsZWFyZml4IHtcbiAgJjphZnRlciB7XG4gICAgY29udGVudDpcIlwiO1xuICAgIGRpc3BsYXk6dGFibGU7XG4gICAgY2xlYXI6Ym90aDtcbiAgfVxufVxuXG4vLyBBY2tub3dsZWRnZW1lbnRzXG4vLyBCZWF0ICp0aGF0KiBjbGVhcmZpeDogW1RoaWVycnkgS29ibGVudHpdKGh0dHA6Ly93d3cuY3NzLTEwMS5vcmcvYXJ0aWNsZXMvY2xlYXJmaXgvbGF0ZXN0LW5ldy1jbGVhcmZpeC1zby1mYXIucGhwKVxuIiwKCQkiLy8gZGlyZWN0aW9uYWwtcHJvcGVydHkgbWl4aW5zIGFyZSBzaG9ydGhhbmRzXG4vLyBmb3Igd3JpdGluZyBwcm9wZXJ0aWVzIGxpa2UgdGhlIGZvbGxvd2luZ1xuLy9cbi8vIEBpbmNsdWRlIG1hcmdpbihudWxsIDAgMTBweCk7XG4vLyAtLS0tLS1cbi8vIG1hcmdpbi1yaWdodDogMDtcbi8vIG1hcmdpbi1ib3R0b206IDEwcHg7XG4vLyBtYXJnaW4tbGVmdDogMDtcbi8vXG4vLyAtIG9yIC1cbi8vXG4vLyBAaW5jbHVkZSBib3JkZXItc3R5bGUoZG90dGVkIG51bGwpO1xuLy8gLS0tLS0tXG4vLyBib3JkZXItdG9wLXN0eWxlOiBkb3R0ZWQ7XG4vLyBib3JkZXItYm90dG9tLXN0eWxlOiBkb3R0ZWQ7XG4vL1xuLy8gLS0tLS0tXG4vL1xuLy8gTm90ZTogWW91IGNhbiBhbHNvIHVzZSBmYWxzZSBpbnN0ZWFkIG9mIG51bGxcblxuQGZ1bmN0aW9uIGNvbGxhcHNlLWRpcmVjdGlvbmFscygkdmFscykge1xuICAkb3V0cHV0OiBudWxsO1xuXG4gICRBOiBudGgoICR2YWxzLCAxICk7XG4gICRCOiBpZiggbGVuZ3RoKCR2YWxzKSA8IDIsICRBLCBudGgoJHZhbHMsIDIpKTtcbiAgJEM6IGlmKCBsZW5ndGgoJHZhbHMpIDwgMywgJEEsIG50aCgkdmFscywgMykpO1xuICAkRDogaWYoIGxlbmd0aCgkdmFscykgPCAyLCAkQSwgbnRoKCR2YWxzLCBpZiggbGVuZ3RoKCR2YWxzKSA8IDQsIDIsIDQpICkpO1xuXG4gIEBpZiAkQSA9PSAwIHsgJEE6IDAgfVxuICBAaWYgJEIgPT0gMCB7ICRCOiAwIH1cbiAgQGlmICRDID09IDAgeyAkQzogMCB9XG4gIEBpZiAkRCA9PSAwIHsgJEQ6IDAgfVxuXG4gIEBpZiAkQSA9PSAkQiBhbmQgJEEgPT0gJEMgYW5kICRBID09ICREIHsgJG91dHB1dDogJEEgICAgICAgICAgfVxuICBAZWxzZSBpZiAkQSA9PSAkQyBhbmQgJEIgPT0gJEQgICAgICAgICB7ICRvdXRwdXQ6ICRBICRCICAgICAgIH1cbiAgQGVsc2UgaWYgJEIgPT0gJEQgICAgICAgICAgICAgICAgICAgICAgeyAkb3V0cHV0OiAkQSAkQiAkQyAgICB9XG4gIEBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgJG91dHB1dDogJEEgJEIgJEMgJEQgfVxuXG4gIEByZXR1cm4gJG91dHB1dDtcbn1cblxuQGZ1bmN0aW9uIGNvbnRhaW5zLWZhbHN5KCRsaXN0KSB7XG4gIEBlYWNoICRpdGVtIGluICRsaXN0IHtcbiAgICBAaWYgbm90ICRpdGVtIHtcbiAgICAgIEByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBAcmV0dXJuIGZhbHNlO1xufVxuXG5AbWl4aW4gZGlyZWN0aW9uYWwtcHJvcGVydHkoJHByZSwgJHN1ZiwgJHZhbHMpIHtcbiAgLy8gUHJvcGVydHkgTmFtZXNcbiAgJHRvcDogICAgJHByZSArIFwiLXRvcFwiICAgICsgaWYoJHN1ZiwgXCItI3skc3VmfVwiLCBcIlwiKTtcbiAgJGJvdHRvbTogJHByZSArIFwiLWJvdHRvbVwiICsgaWYoJHN1ZiwgXCItI3skc3VmfVwiLCBcIlwiKTtcbiAgJGxlZnQ6ICAgJHByZSArIFwiLWxlZnRcIiAgICsgaWYoJHN1ZiwgXCItI3skc3VmfVwiLCBcIlwiKTtcbiAgJHJpZ2h0OiAgJHByZSArIFwiLXJpZ2h0XCIgICsgaWYoJHN1ZiwgXCItI3skc3VmfVwiLCBcIlwiKTtcbiAgJGFsbDogICAgJHByZSArICAgICAgICAgICAgIGlmKCRzdWYsIFwiLSN7JHN1Zn1cIiwgXCJcIik7XG5cbiAgJHZhbHM6IGNvbGxhcHNlLWRpcmVjdGlvbmFscygkdmFscyk7XG5cbiAgQGlmIGNvbnRhaW5zLWZhbHN5KCR2YWxzKSB7XG4gICAgQGlmIG50aCgkdmFscywgMSkgeyAjeyR0b3B9OiBudGgoJHZhbHMsIDEpOyB9XG5cbiAgICBAaWYgbGVuZ3RoKCR2YWxzKSA9PSAxIHtcbiAgICAgIEBpZiBudGgoJHZhbHMsIDEpIHsgI3skcmlnaHR9OiBudGgoJHZhbHMsIDEpOyB9XG4gICAgfSBAZWxzZSB7XG4gICAgICBAaWYgbnRoKCR2YWxzLCAyKSB7ICN7JHJpZ2h0fTogbnRoKCR2YWxzLCAyKTsgfVxuICAgIH1cblxuICAgIC8vIHByb3A6IHRvcC9ib3R0b20gcmlnaHQvbGVmdFxuICAgIEBpZiBsZW5ndGgoJHZhbHMpID09IDIge1xuICAgICAgQGlmIG50aCgkdmFscywgMSkgeyAjeyRib3R0b219OiBudGgoJHZhbHMsIDEpOyB9XG4gICAgICBAaWYgbnRoKCR2YWxzLCAyKSB7ICN7JGxlZnR9OiAgIG50aCgkdmFscywgMik7IH1cblxuICAgIC8vIHByb3A6IHRvcCByaWdodC9sZWZ0IGJvdHRvbVxuICAgIH0gQGVsc2UgaWYgbGVuZ3RoKCR2YWxzKSA9PSAzIHtcbiAgICAgIEBpZiBudGgoJHZhbHMsIDMpIHsgI3skYm90dG9tfTogbnRoKCR2YWxzLCAzKTsgfVxuICAgICAgQGlmIG50aCgkdmFscywgMikgeyAjeyRsZWZ0fTogICBudGgoJHZhbHMsIDIpOyB9XG5cbiAgICAvLyBwcm9wOiB0b3AgcmlnaHQgYm90dG9tIGxlZnRcbiAgICB9IEBlbHNlIGlmIGxlbmd0aCgkdmFscykgPT0gNCB7XG4gICAgICBAaWYgbnRoKCR2YWxzLCAzKSB7ICN7JGJvdHRvbX06IG50aCgkdmFscywgMyk7IH1cbiAgICAgIEBpZiBudGgoJHZhbHMsIDQpIHsgI3skbGVmdH06ICAgbnRoKCR2YWxzLCA0KTsgfVxuICAgIH1cblxuICAvLyBwcm9wOiB0b3AvcmlnaHQvYm90dG9tL2xlZnRcbiAgfSBAZWxzZSB7XG4gICAgI3skYWxsfTogJHZhbHM7XG4gIH1cbn1cblxuQG1peGluIG1hcmdpbigkdmFscy4uLikge1xuICBAaW5jbHVkZSBkaXJlY3Rpb25hbC1wcm9wZXJ0eShtYXJnaW4sIGZhbHNlLCAkdmFscy4uLik7XG59XG5cbkBtaXhpbiBwYWRkaW5nKCR2YWxzLi4uKSB7XG4gIEBpbmNsdWRlIGRpcmVjdGlvbmFsLXByb3BlcnR5KHBhZGRpbmcsIGZhbHNlLCAkdmFscy4uLik7XG59XG5cbkBtaXhpbiBib3JkZXItc3R5bGUoJHZhbHMuLi4pIHtcbiAgQGluY2x1ZGUgZGlyZWN0aW9uYWwtcHJvcGVydHkoYm9yZGVyLCBzdHlsZSwgJHZhbHMuLi4pO1xufVxuXG5AbWl4aW4gYm9yZGVyLWNvbG9yKCR2YWxzLi4uKSB7XG4gIEBpbmNsdWRlIGRpcmVjdGlvbmFsLXByb3BlcnR5KGJvcmRlciwgY29sb3IsICR2YWxzLi4uKTtcbn1cblxuQG1peGluIGJvcmRlci13aWR0aCgkdmFscy4uLikge1xuICBAaW5jbHVkZSBkaXJlY3Rpb25hbC1wcm9wZXJ0eShib3JkZXIsIHdpZHRoLCAkdmFscy4uLik7XG59XG4iLAoJCSJAbWl4aW4gZWxsaXBzaXMoJHdpZHRoOiAxMDAlKSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWF4LXdpZHRoOiAkd2lkdGg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuIiwKCQkiJGdlb3JnaWE6IEdlb3JnaWEsIENhbWJyaWEsIFwiVGltZXMgTmV3IFJvbWFuXCIsIFRpbWVzLCBzZXJpZjtcbiRoZWx2ZXRpY2E6IFwiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBSb2JvdG8sIEFyaWFsLCBzYW5zLXNlcmlmO1xuJGx1Y2lkYS1ncmFuZGU6IFwiTHVjaWRhIEdyYW5kZVwiLCBUYWhvbWEsIFZlcmRhbmEsIEFyaWFsLCBzYW5zLXNlcmlmO1xuJG1vbm9zcGFjZTogXCJCaXRzdHJlYW0gVmVyYSBTYW5zIE1vbm9cIiwgQ29uc29sYXMsIENvdXJpZXIsIG1vbm9zcGFjZTtcbiR2ZXJkYW5hOiBWZXJkYW5hLCBHZW5ldmEsIHNhbnMtc2VyaWY7XG4iLAoJCSJAbWl4aW4gaGlkZS10ZXh0IHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAmOmJlZm9yZSB7XG4gICAgY29udGVudDogXCJcIjtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cbn1cbiIsCgkJIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vIEdlbmVyYXRlIGEgdmFyaWFibGUgKCRhbGwtdGV4dC1pbnB1dHMpIHdpdGggYSBsaXN0IG9mIGFsbCBodG1sNVxuLy8gaW5wdXQgdHlwZXMgdGhhdCBoYXZlIGEgdGV4dC1iYXNlZCBpbnB1dCwgZXhjbHVkaW5nIHRleHRhcmVhLlxuLy8gaHR0cDovL2RpdmVpbnRvaHRtbDUub3JnL2Zvcm1zLmh0bWxcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbiRpbnB1dHMtbGlzdDogJ2lucHV0W3R5cGU9XCJlbWFpbFwiXScsXG4gICAgICAgICAgICAgICdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyxcbiAgICAgICAgICAgICAgJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScsXG4gICAgICAgICAgICAgICdpbnB1dFt0eXBlPVwic2VhcmNoXCJdJyxcbiAgICAgICAgICAgICAgJ2lucHV0W3R5cGU9XCJ0ZWxcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cInRleHRcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cInVybFwiXScsXG5cbiAgICAgICAgICAgICAgLy8gV2Via2l0ICYgR2Vja28gbWF5IGNoYW5nZSB0aGUgZGlzcGxheSBvZiB0aGVzZSBpbiB0aGUgZnV0dXJlXG4gICAgICAgICAgICAgICdpbnB1dFt0eXBlPVwiY29sb3JcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cImRhdGVcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cImRhdGV0aW1lXCJdJyxcbiAgICAgICAgICAgICAgJ2lucHV0W3R5cGU9XCJkYXRldGltZS1sb2NhbFwiXScsXG4gICAgICAgICAgICAgICdpbnB1dFt0eXBlPVwibW9udGhcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cInRpbWVcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cIndlZWtcIl0nO1xuXG4kdW5xdW90ZWQtaW5wdXRzLWxpc3Q6ICgpO1xuQGVhY2ggJGlucHV0LXR5cGUgaW4gJGlucHV0cy1saXN0IHtcbiAgJHVucXVvdGVkLWlucHV0cy1saXN0OiBhcHBlbmQoJHVucXVvdGVkLWlucHV0cy1saXN0LCB1bnF1b3RlKCRpbnB1dC10eXBlKSwgY29tbWEpO1xufVxuXG4kYWxsLXRleHQtaW5wdXRzOiAkdW5xdW90ZWQtaW5wdXRzLWxpc3Q7XG5cblxuLy8gSG92ZXIgUHNldWRvLWNsYXNzXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4kYWxsLXRleHQtaW5wdXRzLWhvdmVyOiAoKTtcbkBlYWNoICRpbnB1dC10eXBlIGluICR1bnF1b3RlZC1pbnB1dHMtbGlzdCB7XG4gICAgICAkaW5wdXQtdHlwZS1ob3ZlcjogJGlucHV0LXR5cGUgKyBcIjpob3ZlclwiO1xuICAgICAgJGFsbC10ZXh0LWlucHV0cy1ob3ZlcjogYXBwZW5kKCRhbGwtdGV4dC1pbnB1dHMtaG92ZXIsICRpbnB1dC10eXBlLWhvdmVyLCBjb21tYSk7XG59XG5cbi8vIEZvY3VzIFBzZXVkby1jbGFzc1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuJGFsbC10ZXh0LWlucHV0cy1mb2N1czogKCk7XG5AZWFjaCAkaW5wdXQtdHlwZSBpbiAkdW5xdW90ZWQtaW5wdXRzLWxpc3Qge1xuICAgICAgJGlucHV0LXR5cGUtZm9jdXM6ICRpbnB1dC10eXBlICsgXCI6Zm9jdXNcIjtcbiAgICAgICRhbGwtdGV4dC1pbnB1dHMtZm9jdXM6IGFwcGVuZCgkYWxsLXRleHQtaW5wdXRzLWZvY3VzLCAkaW5wdXQtdHlwZS1mb2N1cywgY29tbWEpO1xufVxuXG4vLyBZb3UgbXVzdCB1c2UgaW50ZXJwb2xhdGlvbiBvbiB0aGUgdmFyaWFibGU6XG4vLyAjeyRhbGwtdGV4dC1pbnB1dHN9XG4vLyAjeyRhbGwtdGV4dC1pbnB1dHMtaG92ZXJ9XG4vLyAjeyRhbGwtdGV4dC1pbnB1dHMtZm9jdXN9XG5cbi8vIEV4YW1wbGVcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vICAgI3skYWxsLXRleHQtaW5wdXRzfSwgdGV4dGFyZWEge1xuLy8gICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbi8vICAgfVxuXG5cblxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuLy8gR2VuZXJhdGUgYSB2YXJpYWJsZSAoJGFsbC1idXR0b24taW5wdXRzKSB3aXRoIGEgbGlzdCBvZiBhbGwgaHRtbDVcbi8vIGlucHV0IHR5cGVzIHRoYXQgaGF2ZSBhIGJ1dHRvbi1iYXNlZCBpbnB1dCwgZXhjbHVkaW5nIGJ1dHRvbi5cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbiRpbnB1dHMtYnV0dG9uLWxpc3Q6ICdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdJyxcbiAgICAgICAgICAgICAgICAgICAgICdpbnB1dFt0eXBlPVwicmVzZXRcIl0nLFxuICAgICAgICAgICAgICAgICAgICAgJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nO1xuXG4kdW5xdW90ZWQtaW5wdXRzLWJ1dHRvbi1saXN0OiAoKTtcbkBlYWNoICRpbnB1dC10eXBlIGluICRpbnB1dHMtYnV0dG9uLWxpc3Qge1xuICAkdW5xdW90ZWQtaW5wdXRzLWJ1dHRvbi1saXN0OiBhcHBlbmQoJHVucXVvdGVkLWlucHV0cy1idXR0b24tbGlzdCwgdW5xdW90ZSgkaW5wdXQtdHlwZSksIGNvbW1hKTtcbn1cblxuJGFsbC1idXR0b24taW5wdXRzOiAkdW5xdW90ZWQtaW5wdXRzLWJ1dHRvbi1saXN0O1xuXG5cbi8vIEhvdmVyIFBzZXVkby1jbGFzc1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuJGFsbC1idXR0b24taW5wdXRzLWhvdmVyOiAoKTtcbkBlYWNoICRpbnB1dC10eXBlIGluICR1bnF1b3RlZC1pbnB1dHMtYnV0dG9uLWxpc3Qge1xuICAgICAgJGlucHV0LXR5cGUtaG92ZXI6ICRpbnB1dC10eXBlICsgXCI6aG92ZXJcIjtcbiAgICAgICRhbGwtYnV0dG9uLWlucHV0cy1ob3ZlcjogYXBwZW5kKCRhbGwtYnV0dG9uLWlucHV0cy1ob3ZlciwgJGlucHV0LXR5cGUtaG92ZXIsIGNvbW1hKTtcbn1cblxuLy8gRm9jdXMgUHNldWRvLWNsYXNzXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4kYWxsLWJ1dHRvbi1pbnB1dHMtZm9jdXM6ICgpO1xuQGVhY2ggJGlucHV0LXR5cGUgaW4gJHVucXVvdGVkLWlucHV0cy1idXR0b24tbGlzdCB7XG4gICAgICAkaW5wdXQtdHlwZS1mb2N1czogJGlucHV0LXR5cGUgKyBcIjpmb2N1c1wiO1xuICAgICAgJGFsbC1idXR0b24taW5wdXRzLWZvY3VzOiBhcHBlbmQoJGFsbC1idXR0b24taW5wdXRzLWZvY3VzLCAkaW5wdXQtdHlwZS1mb2N1cywgY29tbWEpO1xufVxuXG4vLyBBY3RpdmUgUHNldWRvLWNsYXNzXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4kYWxsLWJ1dHRvbi1pbnB1dHMtYWN0aXZlOiAoKTtcbkBlYWNoICRpbnB1dC10eXBlIGluICR1bnF1b3RlZC1pbnB1dHMtYnV0dG9uLWxpc3Qge1xuICAgICAgJGlucHV0LXR5cGUtYWN0aXZlOiAkaW5wdXQtdHlwZSArIFwiOmFjdGl2ZVwiO1xuICAgICAgJGFsbC1idXR0b24taW5wdXRzLWFjdGl2ZTogYXBwZW5kKCRhbGwtYnV0dG9uLWlucHV0cy1hY3RpdmUsICRpbnB1dC10eXBlLWFjdGl2ZSwgY29tbWEpO1xufVxuXG4vLyBZb3UgbXVzdCB1c2UgaW50ZXJwb2xhdGlvbiBvbiB0aGUgdmFyaWFibGU6XG4vLyAjeyRhbGwtYnV0dG9uLWlucHV0c31cbi8vICN7JGFsbC1idXR0b24taW5wdXRzLWhvdmVyfVxuLy8gI3skYWxsLWJ1dHRvbi1pbnB1dHMtZm9jdXN9XG4vLyAjeyRhbGwtYnV0dG9uLWlucHV0cy1hY3RpdmV9XG5cbi8vIEV4YW1wbGVcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vICAgI3skYWxsLWJ1dHRvbi1pbnB1dHN9LCBidXR0b24ge1xuLy8gICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbi8vICAgfVxuIiwKCQkiQG1peGluIHBvc2l0aW9uICgkcG9zaXRpb246IHJlbGF0aXZlLCAkY29vcmRpbmF0ZXM6IDAgMCAwIDApIHtcblxuICBAaWYgdHlwZS1vZigkcG9zaXRpb24pID09IGxpc3Qge1xuICAgICRjb29yZGluYXRlczogJHBvc2l0aW9uO1xuICAgICRwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cblxuICAkY29vcmRpbmF0ZXM6IHVucGFjaygkY29vcmRpbmF0ZXMpO1xuXG4gICR0b3A6IG50aCgkY29vcmRpbmF0ZXMsIDEpO1xuICAkcmlnaHQ6IG50aCgkY29vcmRpbmF0ZXMsIDIpO1xuICAkYm90dG9tOiBudGgoJGNvb3JkaW5hdGVzLCAzKTtcbiAgJGxlZnQ6IG50aCgkY29vcmRpbmF0ZXMsIDQpO1xuXG4gIHBvc2l0aW9uOiAkcG9zaXRpb247XG5cbiAgQGlmICgkdG9wIGFuZCAkdG9wID09IGF1dG8pIG9yICh0eXBlLW9mKCR0b3ApID09IG51bWJlciBhbmQgbm90IHVuaXRsZXNzKCR0b3ApKSB7XG4gICAgdG9wOiAkdG9wO1xuICB9XG5cbiAgQGlmICgkcmlnaHQgYW5kICRyaWdodCA9PSBhdXRvKSBvciAodHlwZS1vZigkcmlnaHQpID09IG51bWJlciBhbmQgbm90IHVuaXRsZXNzKCRyaWdodCkpIHtcbiAgICByaWdodDogJHJpZ2h0O1xuICB9XG5cbiAgQGlmICgkYm90dG9tIGFuZCAkYm90dG9tID09IGF1dG8pIG9yICh0eXBlLW9mKCRib3R0b20pID09IG51bWJlciBhbmQgbm90IHVuaXRsZXNzKCRib3R0b20pKSB7XG4gICAgYm90dG9tOiAkYm90dG9tO1xuICB9XG5cbiAgQGlmICgkbGVmdCBhbmQgJGxlZnQgPT0gYXV0bykgb3IgKHR5cGUtb2YoJGxlZnQpID09IG51bWJlciBhbmQgbm90IHVuaXRsZXNzKCRsZWZ0KSkge1xuICAgIGxlZnQ6ICRsZWZ0O1xuICB9XG59XG4iLAoJCSIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4vLyBFeGFtcGxlOiBAaW5jbHVkZSBwcmVmaXhlcihib3JkZXItcmFkaXVzLCAkcmFkaWksIHdlYmtpdCBtcyBzcGVjKTtcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vIFZhcmlhYmxlcyBsb2NhdGVkIGluIC9zZXR0aW5ncy9fcHJlZml4ZXIuc2Nzc1xuXG5AbWl4aW4gcHJlZml4ZXIgKCRwcm9wZXJ0eSwgJHZhbHVlLCAkcHJlZml4ZXMpIHtcbiAgQGVhY2ggJHByZWZpeCBpbiAkcHJlZml4ZXMge1xuICAgIEBpZiAkcHJlZml4ID09IHdlYmtpdCB7XG4gICAgICBAaWYgJHByZWZpeC1mb3Itd2Via2l0IHtcbiAgICAgICAgLXdlYmtpdC0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgQGVsc2UgaWYgJHByZWZpeCA9PSBtb3oge1xuICAgICAgQGlmICRwcmVmaXgtZm9yLW1vemlsbGEge1xuICAgICAgICAtbW96LSN7JHByb3BlcnR5fTogJHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBAZWxzZSBpZiAkcHJlZml4ID09IG1zIHtcbiAgICAgIEBpZiAkcHJlZml4LWZvci1taWNyb3NvZnQge1xuICAgICAgICAtbXMtI3skcHJvcGVydHl9OiAkdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIEBlbHNlIGlmICRwcmVmaXggPT0gbyB7XG4gICAgICBAaWYgJHByZWZpeC1mb3Itb3BlcmEge1xuICAgICAgICAtby0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgQGVsc2UgaWYgJHByZWZpeCA9PSBzcGVjIHtcbiAgICAgIEBpZiAkcHJlZml4LWZvci1zcGVjIHtcbiAgICAgICAgI3skcHJvcGVydHl9OiAkdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIEBlbHNlICB7XG4gICAgICBAd2FybiBcIlVucmVjb2duaXplZCBwcmVmaXg6ICN7JHByZWZpeH1cIjtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIGRpc2FibGUtcHJlZml4LWZvci1hbGwoKSB7XG4gICRwcmVmaXgtZm9yLXdlYmtpdDogICAgZmFsc2U7XG4gICRwcmVmaXgtZm9yLW1vemlsbGE6ICAgZmFsc2U7XG4gICRwcmVmaXgtZm9yLW1pY3Jvc29mdDogZmFsc2U7XG4gICRwcmVmaXgtZm9yLW9wZXJhOiAgICAgZmFsc2U7XG4gICRwcmVmaXgtZm9yLXNwZWM6ICAgICAgZmFsc2U7XG59XG4iLAoJCSJAbWl4aW4gcmV0aW5hLWltYWdlKCRmaWxlbmFtZSwgJGJhY2tncm91bmQtc2l6ZSwgJGV4dGVuc2lvbjogcG5nLCAkcmV0aW5hLWZpbGVuYW1lOiBudWxsLCAkcmV0aW5hLXN1ZmZpeDogXzJ4LCAkYXNzZXQtcGlwZWxpbmU6ICRhc3NldC1waXBlbGluZSkge1xuICBAaWYgJGFzc2V0LXBpcGVsaW5lIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBpbWFnZS11cmwoXCIjeyRmaWxlbmFtZX0uI3skZXh0ZW5zaW9ufVwiKTtcbiAgfVxuICBAZWxzZSB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogICAgICAgdXJsKFwiI3skZmlsZW5hbWV9LiN7JGV4dGVuc2lvbn1cIik7XG4gIH1cblxuICBAaW5jbHVkZSBoaWRwaSB7XG4gICAgQGlmICRhc3NldC1waXBlbGluZSB7XG4gICAgICBAaWYgJHJldGluYS1maWxlbmFtZSB7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGltYWdlLXVybChcIiN7JHJldGluYS1maWxlbmFtZX0uI3skZXh0ZW5zaW9ufVwiKTtcbiAgICAgIH1cbiAgICAgIEBlbHNlIHtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogaW1hZ2UtdXJsKFwiI3skZmlsZW5hbWV9I3skcmV0aW5hLXN1ZmZpeH0uI3skZXh0ZW5zaW9ufVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBAZWxzZSB7XG4gICAgICBAaWYgJHJldGluYS1maWxlbmFtZSB7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiN7JHJldGluYS1maWxlbmFtZX0uI3skZXh0ZW5zaW9ufVwiKTtcbiAgICAgIH1cbiAgICAgIEBlbHNlIHtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiI3skZmlsZW5hbWV9I3skcmV0aW5hLXN1ZmZpeH0uI3skZXh0ZW5zaW9ufVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrZ3JvdW5kLXNpemU6ICRiYWNrZ3JvdW5kLXNpemU7XG5cbiAgfVxufVxuIiwKCQkiQG1peGluIHNpemUoJHNpemUpIHtcbiAgQGlmIGxlbmd0aCgkc2l6ZSkgPT0gMSB7XG4gICAgQGlmICRzaXplID09IGF1dG8ge1xuICAgICAgd2lkdGg6ICAkc2l6ZTtcbiAgICAgIGhlaWdodDogJHNpemU7XG4gICAgfVxuXG4gICAgQGVsc2UgaWYgdW5pdGxlc3MoJHNpemUpIHtcbiAgICAgIHdpZHRoOiAgJHNpemUgKyBweDtcbiAgICAgIGhlaWdodDogJHNpemUgKyBweDtcbiAgICB9XG5cbiAgICBAZWxzZSBpZiBub3QodW5pdGxlc3MoJHNpemUpKSB7XG4gICAgICB3aWR0aDogICRzaXplO1xuICAgICAgaGVpZ2h0OiAkc2l6ZTtcbiAgICB9XG4gIH1cblxuICAvLyBXaWR0aCB4IEhlaWdodFxuICBAaWYgbGVuZ3RoKCRzaXplKSA9PSAyIHtcbiAgICAkd2lkdGg6ICBudGgoJHNpemUsIDEpO1xuICAgICRoZWlnaHQ6IG50aCgkc2l6ZSwgMik7XG5cbiAgICBAaWYgJHdpZHRoID09IGF1dG8ge1xuICAgICAgd2lkdGg6ICR3aWR0aDtcbiAgICB9XG4gICAgQGVsc2UgaWYgbm90KHVuaXRsZXNzKCR3aWR0aCkpIHtcbiAgICAgIHdpZHRoOiAkd2lkdGg7XG4gICAgfVxuICAgIEBlbHNlIGlmIHVuaXRsZXNzKCR3aWR0aCkge1xuICAgICAgd2lkdGg6ICR3aWR0aCArIHB4O1xuICAgIH1cblxuICAgIEBpZiAkaGVpZ2h0ID09IGF1dG8ge1xuICAgICAgaGVpZ2h0OiAkaGVpZ2h0O1xuICAgIH1cbiAgICBAZWxzZSBpZiBub3QodW5pdGxlc3MoJGhlaWdodCkpIHtcbiAgICAgIGhlaWdodDogJGhlaWdodDtcbiAgICB9XG4gICAgQGVsc2UgaWYgdW5pdGxlc3MoJGhlaWdodCkge1xuICAgICAgaGVpZ2h0OiAkaGVpZ2h0ICsgcHg7XG4gICAgfVxuICB9XG59XG4iLAoJCSIvLyBDU1MgY3ViaWMtYmV6aWVyIHRpbWluZyBmdW5jdGlvbnMuIFRpbWluZyBmdW5jdGlvbnMgY291cnRlc3kgb2YganF1ZXJ5LmVhc2llIChnaXRodWIuY29tL2phdWtpYS9lYXNpZSlcbi8vIFRpbWluZyBmdW5jdGlvbnMgYXJlIHRoZSBzYW1lIGFzIGRlbW8nZWQgaGVyZTogaHR0cDovL2pxdWVyeXVpLmNvbS9yZXNvdXJjZXMvZGVtb3MvZWZmZWN0L2Vhc2luZy5odG1sXG5cbi8vIEVBU0UgSU5cbiRlYXNlLWluLXF1YWQ6ICAgICAgY3ViaWMtYmV6aWVyKDAuNTUwLCAgMC4wODUsIDAuNjgwLCAwLjUzMCk7XG4kZWFzZS1pbi1jdWJpYzogICAgIGN1YmljLWJlemllcigwLjU1MCwgIDAuMDU1LCAwLjY3NSwgMC4xOTApO1xuJGVhc2UtaW4tcXVhcnQ6ICAgICBjdWJpYy1iZXppZXIoMC44OTUsICAwLjAzMCwgMC42ODUsIDAuMjIwKTtcbiRlYXNlLWluLXF1aW50OiAgICAgY3ViaWMtYmV6aWVyKDAuNzU1LCAgMC4wNTAsIDAuODU1LCAwLjA2MCk7XG4kZWFzZS1pbi1zaW5lOiAgICAgIGN1YmljLWJlemllcigwLjQ3MCwgIDAuMDAwLCAwLjc0NSwgMC43MTUpO1xuJGVhc2UtaW4tZXhwbzogICAgICBjdWJpYy1iZXppZXIoMC45NTAsICAwLjA1MCwgMC43OTUsIDAuMDM1KTtcbiRlYXNlLWluLWNpcmM6ICAgICAgY3ViaWMtYmV6aWVyKDAuNjAwLCAgMC4wNDAsIDAuOTgwLCAwLjMzNSk7XG4kZWFzZS1pbi1iYWNrOiAgICAgIGN1YmljLWJlemllcigwLjYwMCwgLTAuMjgwLCAwLjczNSwgMC4wNDUpO1xuXG4vLyBFQVNFIE9VVFxuJGVhc2Utb3V0LXF1YWQ6ICAgICBjdWJpYy1iZXppZXIoMC4yNTAsICAwLjQ2MCwgMC40NTAsIDAuOTQwKTtcbiRlYXNlLW91dC1jdWJpYzogICAgY3ViaWMtYmV6aWVyKDAuMjE1LCAgMC42MTAsIDAuMzU1LCAxLjAwMCk7XG4kZWFzZS1vdXQtcXVhcnQ6ICAgIGN1YmljLWJlemllcigwLjE2NSwgIDAuODQwLCAwLjQ0MCwgMS4wMDApO1xuJGVhc2Utb3V0LXF1aW50OiAgICBjdWJpYy1iZXppZXIoMC4yMzAsICAxLjAwMCwgMC4zMjAsIDEuMDAwKTtcbiRlYXNlLW91dC1zaW5lOiAgICAgY3ViaWMtYmV6aWVyKDAuMzkwLCAgMC41NzUsIDAuNTY1LCAxLjAwMCk7XG4kZWFzZS1vdXQtZXhwbzogICAgIGN1YmljLWJlemllcigwLjE5MCwgIDEuMDAwLCAwLjIyMCwgMS4wMDApO1xuJGVhc2Utb3V0LWNpcmM6ICAgICBjdWJpYy1iZXppZXIoMC4wNzUsICAwLjgyMCwgMC4xNjUsIDEuMDAwKTtcbiRlYXNlLW91dC1iYWNrOiAgICAgY3ViaWMtYmV6aWVyKDAuMTc1LCAgMC44ODUsIDAuMzIwLCAxLjI3NSk7XG5cbi8vIEVBU0UgSU4gT1VUXG4kZWFzZS1pbi1vdXQtcXVhZDogIGN1YmljLWJlemllcigwLjQ1NSwgIDAuMDMwLCAwLjUxNSwgMC45NTUpO1xuJGVhc2UtaW4tb3V0LWN1YmljOiBjdWJpYy1iZXppZXIoMC42NDUsICAwLjA0NSwgMC4zNTUsIDEuMDAwKTtcbiRlYXNlLWluLW91dC1xdWFydDogY3ViaWMtYmV6aWVyKDAuNzcwLCAgMC4wMDAsIDAuMTc1LCAxLjAwMCk7XG4kZWFzZS1pbi1vdXQtcXVpbnQ6IGN1YmljLWJlemllcigwLjg2MCwgIDAuMDAwLCAwLjA3MCwgMS4wMDApO1xuJGVhc2UtaW4tb3V0LXNpbmU6ICBjdWJpYy1iZXppZXIoMC40NDUsICAwLjA1MCwgMC41NTAsIDAuOTUwKTtcbiRlYXNlLWluLW91dC1leHBvOiAgY3ViaWMtYmV6aWVyKDEuMDAwLCAgMC4wMDAsIDAuMDAwLCAxLjAwMCk7XG4kZWFzZS1pbi1vdXQtY2lyYzogIGN1YmljLWJlemllcigwLjc4NSwgIDAuMTM1LCAwLjE1MCwgMC44NjApO1xuJGVhc2UtaW4tb3V0LWJhY2s6ICBjdWJpYy1iZXppZXIoMC42ODAsIC0wLjU1MCwgMC4yNjUsIDEuNTUwKTtcbiIsCgkJIkBtaXhpbiB0cmlhbmdsZSAoJHNpemUsICRjb2xvciwgJGRpcmVjdGlvbikge1xuICBoZWlnaHQ6IDA7XG4gIHdpZHRoOiAwO1xuXG4gICR3aWR0aDogbnRoKCRzaXplLCAxKTtcbiAgJGhlaWdodDogbnRoKCRzaXplLCBsZW5ndGgoJHNpemUpKTtcblxuICAkZm9yZWdyb3VuZC1jb2xvcjogbnRoKCRjb2xvciwgMSk7XG4gICRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhZGVmYXVsdDtcbiAgQGlmIChsZW5ndGgoJGNvbG9yKSA9PSAyKSB7XG4gICAgJGJhY2tncm91bmQtY29sb3I6IG50aCgkY29sb3IsIDIpO1xuICB9XG5cbiAgQGlmICgkZGlyZWN0aW9uID09IHVwKSBvciAoJGRpcmVjdGlvbiA9PSBkb3duKSBvciAoJGRpcmVjdGlvbiA9PSByaWdodCkgb3IgKCRkaXJlY3Rpb24gPT0gbGVmdCkge1xuXG4gICAgJHdpZHRoOiAkd2lkdGggLyAyO1xuICAgICRoZWlnaHQ6IGlmKGxlbmd0aCgkc2l6ZSkgPiAxLCAkaGVpZ2h0LCAkaGVpZ2h0LzIpO1xuXG4gICAgQGlmICRkaXJlY3Rpb24gPT0gdXAge1xuICAgICAgYm9yZGVyLWxlZnQ6ICR3aWR0aCBzb2xpZCAkYmFja2dyb3VuZC1jb2xvcjtcbiAgICAgIGJvcmRlci1yaWdodDogJHdpZHRoIHNvbGlkICRiYWNrZ3JvdW5kLWNvbG9yO1xuICAgICAgYm9yZGVyLWJvdHRvbTogJGhlaWdodCBzb2xpZCAkZm9yZWdyb3VuZC1jb2xvcjtcblxuICAgIH0gQGVsc2UgaWYgJGRpcmVjdGlvbiA9PSByaWdodCB7XG4gICAgICBib3JkZXItdG9wOiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgICBib3JkZXItYm90dG9tOiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgICBib3JkZXItbGVmdDogJGhlaWdodCBzb2xpZCAkZm9yZWdyb3VuZC1jb2xvcjtcblxuICAgIH0gQGVsc2UgaWYgJGRpcmVjdGlvbiA9PSBkb3duIHtcbiAgICAgIGJvcmRlci1sZWZ0OiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgICBib3JkZXItcmlnaHQ6ICR3aWR0aCBzb2xpZCAkYmFja2dyb3VuZC1jb2xvcjtcbiAgICAgIGJvcmRlci10b3A6ICRoZWlnaHQgc29saWQgJGZvcmVncm91bmQtY29sb3I7XG5cbiAgICB9IEBlbHNlIGlmICRkaXJlY3Rpb24gPT0gbGVmdCB7XG4gICAgICBib3JkZXItdG9wOiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgICBib3JkZXItYm90dG9tOiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgICBib3JkZXItcmlnaHQ6ICRoZWlnaHQgc29saWQgJGZvcmVncm91bmQtY29sb3I7XG4gICAgfVxuICB9XG5cbiAgQGVsc2UgaWYgKCRkaXJlY3Rpb24gPT0gdXAtcmlnaHQpIG9yICgkZGlyZWN0aW9uID09IHVwLWxlZnQpIHtcbiAgICBib3JkZXItdG9wOiAkaGVpZ2h0IHNvbGlkICRmb3JlZ3JvdW5kLWNvbG9yO1xuXG4gICAgQGlmICRkaXJlY3Rpb24gPT0gdXAtcmlnaHQge1xuICAgICAgYm9yZGVyLWxlZnQ6ICAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG5cbiAgICB9IEBlbHNlIGlmICRkaXJlY3Rpb24gPT0gdXAtbGVmdCB7XG4gICAgICBib3JkZXItcmlnaHQ6ICR3aWR0aCBzb2xpZCAkYmFja2dyb3VuZC1jb2xvcjtcbiAgICB9XG4gIH1cblxuICBAZWxzZSBpZiAoJGRpcmVjdGlvbiA9PSBkb3duLXJpZ2h0KSBvciAoJGRpcmVjdGlvbiA9PSBkb3duLWxlZnQpIHtcbiAgICBib3JkZXItYm90dG9tOiAkaGVpZ2h0IHNvbGlkICRmb3JlZ3JvdW5kLWNvbG9yO1xuXG4gICAgQGlmICRkaXJlY3Rpb24gPT0gZG93bi1yaWdodCB7XG4gICAgICBib3JkZXItbGVmdDogICR3aWR0aCBzb2xpZCAkYmFja2dyb3VuZC1jb2xvcjtcblxuICAgIH0gQGVsc2UgaWYgJGRpcmVjdGlvbiA9PSBkb3duLWxlZnQge1xuICAgICAgYm9yZGVyLXJpZ2h0OiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgfVxuICB9XG5cbiAgQGVsc2UgaWYgKCRkaXJlY3Rpb24gPT0gaW5zZXQtdXApIHtcbiAgICBib3JkZXItd2lkdGg6ICRoZWlnaHQgJHdpZHRoO1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgYm9yZGVyLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvciAkYmFja2dyb3VuZC1jb2xvciAkZm9yZWdyb3VuZC1jb2xvcjtcbiAgfVxuXG4gIEBlbHNlIGlmICgkZGlyZWN0aW9uID09IGluc2V0LWRvd24pIHtcbiAgICBib3JkZXItd2lkdGg6ICRoZWlnaHQgJHdpZHRoO1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgYm9yZGVyLWNvbG9yOiAkZm9yZWdyb3VuZC1jb2xvciAkYmFja2dyb3VuZC1jb2xvciAkYmFja2dyb3VuZC1jb2xvcjtcbiAgfVxuXG4gIEBlbHNlIGlmICgkZGlyZWN0aW9uID09IGluc2V0LXJpZ2h0KSB7XG4gICAgYm9yZGVyLXdpZHRoOiAkd2lkdGggJGhlaWdodDtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjogJGJhY2tncm91bmQtY29sb3IgJGJhY2tncm91bmQtY29sb3IgJGJhY2tncm91bmQtY29sb3IgJGZvcmVncm91bmQtY29sb3I7XG4gIH1cblxuICBAZWxzZSBpZiAoJGRpcmVjdGlvbiA9PSBpbnNldC1sZWZ0KSB7XG4gICAgYm9yZGVyLXdpZHRoOiAkd2lkdGggJGhlaWdodDtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjogJGJhY2tncm91bmQtY29sb3IgJGZvcmVncm91bmQtY29sb3IgJGJhY2tncm91bmQtY29sb3IgJGJhY2tncm91bmQtY29sb3I7XG4gIH1cbn1cbiIsCgkJIkBtaXhpbiB3b3JkLXdyYXAoJHdyYXA6IGJyZWFrLXdvcmQpIHtcbiAgd29yZC13cmFwOiAkd3JhcDtcblxuICBAaWYgJHdyYXAgPT0gYnJlYWstd29yZCB7XG4gICAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbiAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XG4gIH1cbn1cbiIsCgkJIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vIFRoZXNlIG1peGlucy9mdW5jdGlvbnMgYXJlIGRlcHJlY2F0ZWRcbi8vIFRoZXkgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IE1BSk9SIHZlcnNpb24gcmVsZWFzZVxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuQG1peGluIGJveC1zaGFkb3cgKCRzaGFkb3dzLi4uKSB7XG4gIEBpbmNsdWRlIHByZWZpeGVyKGJveC1zaGFkb3csICRzaGFkb3dzLCBzcGVjKTtcbiAgQHdhcm4gXCJib3gtc2hhZG93IGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIHJlbGVhc2VcIjtcbn1cblxuQG1peGluIGJhY2tncm91bmQtc2l6ZSAoJGxlbmd0aHMuLi4pIHtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYmFja2dyb3VuZC1zaXplLCAkbGVuZ3Rocywgc3BlYyk7XG4gIEB3YXJuIFwiYmFja2dyb3VuZC1zaXplIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIHJlbGVhc2VcIjtcbn1cbiIsCgkJIi8vIElNUE9SVCBPTkNFXG4vLyBXZSB1c2UgdGhpcyB0byBwcmV2ZW50IHN0eWxlcyBmcm9tIGJlaW5nIGxvYWRlZCBtdWx0aXBsZSB0aW1lcyBmb3IgY29tcGVuZW50cyB0aGF0IHJlbHkgb24gb3RoZXIgY29tcG9uZW50cy5cbiRtb2R1bGVzOiAoKSAhZGVmYXVsdDtcbkBtaXhpbiBleHBvcnRzKCRuYW1lKSB7XG4gIC8vIEltcG9ydCBmcm9tIGdsb2JhbCBzY29wZVxuICAkbW9kdWxlczogJG1vZHVsZXMgIWdsb2JhbDtcbiAgLy8gQ2hlY2sgaWYgYSBtb2R1bGUgaXMgYWxyZWFkeSBvbiB0aGUgbGlzdFxuICAkbW9kdWxlX2luZGV4OiBpbmRleCgkbW9kdWxlcywgJG5hbWUpO1xuICBAaWYgKCgkbW9kdWxlX2luZGV4ID09IG51bGwpIG9yICgkbW9kdWxlX2luZGV4ID09IGZhbHNlKSkge1xuICAgICRtb2R1bGVzOiBhcHBlbmQoJG1vZHVsZXMsICRuYW1lKSAhZ2xvYmFsO1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBzaGFwZSgpIHtcbiAgICBjb250ZW50OiBcIiBcIjtcbiAgICBkaXNwbGF5OiBibG9jaztcbn1cblxuQG1peGluIGNhcmQtdGV4dHVyZSgkcmFkaWFsLWdyYWRpZW50OiB0cnVlKSB7XG4gICAgJGIxOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xuICAgICRiMjogb3BhY2lmeSgkYjEsIC4wMyk7XG4gICAgJGIzOiBvcGFjaWZ5KCRiMSwgLjA0KTtcbiAgICAkYjQ6IG9wYWNpZnkoJGIxLCAuMDUpO1xuXG4gICAgQGlmICgkcmFkaWFsLWdyYWRpZW50KSB7XG4gICAgICAgIEBpbmNsdWRlIGJhY2tncm91bmQtaW1hZ2UoXG4gICAgICAgICAgICByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDQ1ZGVnLFxuICAgICAgICAgICAgICAkYjEgMXB4LCAkYjIgMnB4LFxuICAgICAgICAgICAgICAkYjMgM3B4LCAkYjQgNHB4XG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDEzNWRlZyxcbiAgICAgICAgICAgICAgJGI0IDFweCwgJGIxIDJweCxcbiAgICAgICAgICAgICAgJGIzIDNweCwgJGIyIDRweFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoOTBkZWcsXG4gICAgICAgICAgICAgICRiMSAxcHgsICRiMiAycHgsXG4gICAgICAgICAgICAgICRiMyAzcHgsICRiNCA0cHhcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDIxMGRlZyxcbiAgICAgICAgICAgICAgJGIxIDFweCwgJGIyIDJweCxcbiAgICAgICAgICAgICAgJGIzIDNweCwgJGI0IDRweFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlcGVhdGluZy1yYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDMwJSAzMCUsXG4gICAgICAgICAgICAgICRiMSAxcHgsICRiMiAycHgsXG4gICAgICAgICAgICAgICRiMyAzcHgsICRiNCA0cHhcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICByZXBlYXRpbmctcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA3MCUgNzAlLFxuICAgICAgICAgICAgICAkYjEgMXB4LCAkYjIgMnB4LFxuICAgICAgICAgICAgICAkYjMgM3B4LCAkYjQgNHB4XG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgcmVwZWF0aW5nLXJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgOTAlIDIwJSxcbiAgICAgICAgICAgICAgJGIxIDFweCwgJGIyIDJweCxcbiAgICAgICAgICAgICAgJGIzIDNweCwgJGI0IDRweFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlcGVhdGluZy1yYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDE1JSA4MCUsXG4gICAgICAgICAgICAgICRiMSAxcHgsICRiMiAycHgsXG4gICAgICAgICAgICAgICRiMyAzcHgsICRiNCA0cHhcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBsaW5lYXItZ3JhZGllbnQoLTI1ZGVnLCAkYjEgNTAlLCBvcGFjaWZ5KCRiMSwgLjIpIDcwJSwgJGIxIDkwJSlcbiAgICAgICAgKTtcbiAgICB9IEBlbHNlIHtcbiAgICAgICAgQGluY2x1ZGUgYmFja2dyb3VuZC1pbWFnZShcbiAgICAgICAgICAgIHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoNDVkZWcsXG4gICAgICAgICAgICAgICRiMSAxcHgsICRiMiAycHgsXG4gICAgICAgICAgICAgICRiMyAzcHgsICRiNCA0cHhcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoMTM1ZGVnLFxuICAgICAgICAgICAgICAkYjQgMXB4LCAkYjEgMnB4LFxuICAgICAgICAgICAgICAkYjMgM3B4LCAkYjIgNHB4XG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCg5MGRlZyxcbiAgICAgICAgICAgICAgJGIxIDFweCwgJGIyIDJweCxcbiAgICAgICAgICAgICAgJGIzIDNweCwgJGI0IDRweFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoMjEwZGVnLFxuICAgICAgICAgICAgICAkYjEgMXB4LCAkYjIgMnB4LFxuICAgICAgICAgICAgICAkYjMgM3B4LCAkYjQgNHB4XG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbGluZWFyLWdyYWRpZW50KC0yNWRlZywgJGIxIDUwJSwgb3BhY2lmeSgkYjEsIC4yKSA3MCUsICRiMSA5MCUpXG4gICAgICAgICk7XG4gICAgfVxufSIsCgkJIi5qcC1jYXJkLmpwLWNhcmQtc2FmYXJpIHtcbiAgICYuanAtY2FyZC1pZGVudGlmaWVkIHtcbiAgICAgICAgLmpwLWNhcmQtZnJvbnQsIC5qcC1jYXJkLWJhY2sge1xuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIEBpbmNsdWRlIGNhcmQtdGV4dHVyZSgkcmFkaWFsLWdyYWRpZW50OiBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwKCQkiLmpwLWNhcmQuanAtY2FyZC1pZS0xMCwgLmpwLWNhcmQuanAtY2FyZC1pZS0xMSB7XG4gICAgJi5qcC1jYXJkLWZsaXBwZWQge1xuICAgICAgICBAaW5jbHVkZSB0cmFuc2Zvcm0oMGRlZyk7XG4gICAgICAgIC5qcC1jYXJkLWZyb250IHtcbiAgICAgICAgICAgIEBpbmNsdWRlIHRyYW5zZm9ybShyb3RhdGVZKDBkZWcpKTtcbiAgICAgICAgfVxuICAgICAgICAuanAtY2FyZC1iYWNrIHtcbiAgICAgICAgICAgIEBpbmNsdWRlIHRyYW5zZm9ybShyb3RhdGVZKDBkZWcpKTtcblxuICAgICAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICAgICBsZWZ0OiAxOCU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5qcC1jYXJkLWN2YyB7XG4gICAgICAgICAgICAgICAgQGluY2x1ZGUgdHJhbnNmb3JtKHJvdGF0ZVkoMTgwZGVnKSk7XG4gICAgICAgICAgICAgICAgbGVmdDogNSU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5qcC1jYXJkLXNoaW55ICB7XG4gICAgICAgICAgICAgICAgbGVmdDogODQlO1xuICAgICAgICAgICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAtNDgwJTtcbiAgICAgICAgICAgICAgICAgICAgQGluY2x1ZGUgdHJhbnNmb3JtKHJvdGF0ZVkoMTgwZGVnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuLmpwLWNhcmQuanAtY2FyZC1pZS0xMC5qcC1jYXJkLWFtZXggLmpwLWNhcmQtYmFjaywgLmpwLWNhcmQuanAtY2FyZC1pZS0xMS5qcC1jYXJkLWFtZXggLmpwLWNhcmQtYmFjayB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cbiIsCgkJIkBpbXBvcnQgXCJjYXJkXCI7XG5AaW1wb3J0IFwiLi4vbG9nb3MvYW1leFwiO1xuXG4kZmlsbC1jb2xvcjogIzEwODE2ODtcblxuLmpwLWNhcmQuanAtY2FyZC1hbWV4IHtcblxuICAgICYuanAtY2FyZC1mbGlwcGVke1xuICAgICAgICBAaW5jbHVkZSB0cmFuc2Zvcm0obm9uZSk7XG4gICAgfVxuXG4gICAgJi5qcC1jYXJkLWlkZW50aWZpZWQge1xuICAgICAgICAuanAtY2FyZC1mcm9udCwgLmpwLWNhcmQtYmFjayB7XG4gICAgICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGZpbGwtY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAuanAtY2FyZC1mcm9udCB7XG5cbiAgICAgICAgICAgIC5qcC1jYXJkLWxvZ28uanAtY2FyZC1hbWV4IHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuanAtY2FyZC1jdmMge1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLAoJCSIkY2FyZC13aWR0aDogMzUwcHg7XG4kY2FyZC1oZWlnaHQ6IDIwMHB4O1xuJGNhcmQtYm9yZGVyLXJhZGl1czogMTBweDtcbiRjYXJkLWZpbGwtY29sb3I6ICMzMzk5Q0M7XG4kY2FyZC1mb250LWZhbWlseTogXCJIZWx2ZXRpY2EgTmV1ZVwiO1xuJGNhcmQtbW9ub3NwYWNlLWZvbnQtZmFtaWx5OiBcIkJpdHN0cmVhbSBWZXJhIFNhbnMgTW9ub1wiLCBDb25zb2xhcywgQ291cmllciwgbW9ub3NwYWNlO1xuJGNhcmQtZm9udC1jb2xvcjogd2hpdGU7XG4kY2FyZC10cmFuc2l0aW9uLXRpbWU6IDQwMG1zOyIsCgkJIkBpbXBvcnQgXCJsb2dvXCI7XG5cbi5qcC1jYXJkLWxvZ28uanAtY2FyZC1hbWV4IHtcbiAgICAkYm94LW9mZnNldDogOHB4O1xuICAgICRib3gtd2lkdGg6ICRsb2dvLWhlaWdodCAtICRib3gtb2Zmc2V0O1xuICAgICRib3gtaGVpZ2h0OiAkYm94LXdpZHRoO1xuICAgICRmb250LXNpemU6IDRweDtcbiAgICAkZm9udC1wYWRkaW5nOiAycHg7XG5cbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuXG4gICAgZm9udC1zaXplOiAkZm9udC1zaXplO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiB3aGl0ZTtcblxuICAgIEBpbmNsdWRlIGJhY2tncm91bmQtaW1hZ2UocmVwZWF0aW5nLXJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgY2VudGVyLCAjRkZGIDFweCwgIzk5OSAycHgpKTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRUVFO1xuXG4gICAgJjpiZWZvcmUsICY6YWZ0ZXIge1xuICAgICAgICB3aWR0aDogJGJveC13aWR0aDtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogKCRsb2dvLXdpZHRoIC0gJGJveC13aWR0aCkgLyAyO1xuICAgIH1cblxuICAgICY6YmVmb3JlIHtcbiAgICAgICAgJGJsdWU6ICMyNjdBQzM7XG4gICAgICAgIGhlaWdodDogJGJveC1oZWlnaHQ7XG4gICAgICAgIGNvbnRlbnQ6IFwiYW1lcmljYW5cIjtcbiAgICAgICAgLy8gYm94LXNoYWRvdzogMXB4IDFweCAwIDAgcmdiYSgwLCAwLCAwLCAwLjYpO1xuICAgICAgICB0b3A6ICRib3gtb2Zmc2V0IC8gMiAtIDE7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIHBhZGRpbmctbGVmdDogJGZvbnQtcGFkZGluZztcbiAgICAgICAgcGFkZGluZy10b3A6ICRib3gtaGVpZ2h0IC8gMiAtICRmb250LXNpemUgKyAxO1xuICAgICAgICBiYWNrZ3JvdW5kOiAkYmx1ZTtcbiAgICB9XG5cbiAgICAmOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogXCJleHByZXNzXCI7XG4gICAgICAgIGJvdHRvbTogJGJveC1oZWlnaHQgLyAyIC0gJGZvbnQtc2l6ZSArIDE7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAkZm9udC1wYWRkaW5nO1xuICAgIH1cbn1cbiIsCgkJIiRsb2dvLWhlaWdodDogMzZweDtcbiRsb2dvLXdpZHRoOiA2MHB4O1xuXG5AaW5jbHVkZSBleHBvcnRzKFwiX2xvZ28uc2Nzc1wiKSB7XG4gICAgLmpwLWNhcmQtbG9nbyB7XG4gICAgICAgICYsICY6YmVmb3JlLCAmOmFmdGVyIHtcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cbiAgICAgICAgaGVpZ2h0OiAkbG9nby1oZWlnaHQ7XG4gICAgICAgIHdpZHRoOiAkbG9nby13aWR0aDtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIH1cbn1cbiIsCgkJIkBpbXBvcnQgXCJjYXJkXCI7XG5AaW1wb3J0IFwiLi4vbG9nb3MvZGlzY292ZXJcIjtcblxuJGZpbGwtY29sb3I6ICM4NkI4Q0Y7XG4kaGlnaGxpZ2h0LWNvbG9yOiAjRkY2NjAwO1xuXG4uanAtY2FyZCB7XG4gICAgLmpwLWNhcmQtZnJvbnQgLmpwLWNhcmQtbG9nby5qcC1jYXJkLWRpc2NvdmVyIHtcbiAgICAgICAgcmlnaHQ6IDEyJTtcbiAgICAgICAgdG9wOiAxOCU7XG4gICAgfVxufVxuXG4uanAtY2FyZC5qcC1jYXJkLWRpc2NvdmVyIHtcblxuICAgICYuanAtY2FyZC1pZGVudGlmaWVkIHtcbiAgICAgICAgLmpwLWNhcmQtZnJvbnQsIC5qcC1jYXJkLWJhY2sge1xuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRmaWxsLWNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5qcC1jYXJkLWxvZ28uanAtY2FyZC1kaXNjb3ZlciB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLmpwLWNhcmQtZnJvbnQge1xuICAgICAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICAgICAgJHNpemU6IDUwcHg7XG4gICAgICAgICAgICAgICAgQGluY2x1ZGUgdHJhbnNpdGlvbigkY2FyZC10cmFuc2l0aW9uLXRpbWUpO1xuICAgICAgICAgICAgICAgIEBpbmNsdWRlIHNoYXBlKCk7XG4gICAgICAgICAgICAgICAgQGluY2x1ZGUgbGluZWFyLWdyYWRpZW50KCRoaWdobGlnaHQtY29sb3IsIGxpZ2h0ZW4oJGhpZ2hsaWdodC1jb2xvciwgMjAlKSwgJGhpZ2hsaWdodC1jb2xvcik7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAkc2l6ZTtcbiAgICAgICAgICAgICAgICB3aWR0aDogJHNpemU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogJHNpemUgLyAyO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICBsZWZ0OiAxMDAlO1xuICAgICAgICAgICAgICAgIHRvcDogMTUlO1xuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAtJHNpemUgLyAyO1xuICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggM3B4IDFweCByZ2JhKDAsIDAsIDAsIC41KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsCgkJIkBpbXBvcnQgXCJsb2dvXCI7XG5cbi5qcC1jYXJkLWxvZ28uanAtY2FyZC1kaXNjb3ZlciB7XG4gICAgJG9yYW5nZTogI0ZGNjYwMDtcbiAgICAkb2Zmc2V0OiA5cHg7XG4gICAgYmFja2dyb3VuZDogJG9yYW5nZTtcbiAgICBjb2xvcjogIzExMTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgei1pbmRleDogMTtcbiAgICBwYWRkaW5nLXRvcDogJG9mZnNldDtcbiAgICBsZXR0ZXItc3BhY2luZzogLjAzZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0VFRTtcblxuICAgICY6YmVmb3JlLCAmOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgfVxuXG4gICAgJjpiZWZvcmUge1xuICAgICAgICAkc2l6ZTogMjAwcHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICB3aWR0aDogJHNpemU7XG4gICAgICAgIGhlaWdodDogJHNpemU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICRzaXplO1xuICAgICAgICBib3R0b206IC01JTtcbiAgICAgICAgcmlnaHQ6IC04MCU7XG4gICAgICAgIHotaW5kZXg6IC0xO1xuICAgIH1cblxuICAgICY6YWZ0ZXIge1xuICAgICAgICAkc2l6ZTogOHB4O1xuICAgICAgICB3aWR0aDogJHNpemU7XG4gICAgICAgIGhlaWdodDogJHNpemU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICRzaXplIC8yO1xuICAgICAgICB0b3A6ICRvZmZzZXQgKyAxO1xuICAgICAgICBsZWZ0OiAyN3B4O1xuICAgICAgICBAaW5jbHVkZSByYWRpYWwtZ3JhZGllbnQoJG9yYW5nZSwgI2ZmZik7XG4gICAgICAgIGNvbnRlbnQ6IFwibmV0d29ya1wiO1xuICAgICAgICBmb250LXNpemU6IDRweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gICAgICAgIHRleHQtaW5kZW50OiAtN3B4O1xuICAgIH1cbn1cbiIsCgkJIkBpbXBvcnQgXCJjYXJkXCI7XG5AaW1wb3J0IFwiLi4vbG9nb3MvdmlzYVwiO1xuXG4kZmlsbC1jb2xvcjogIzE5MTI3ODtcblxuLmpwLWNhcmQuanAtY2FyZC12aXNhIHtcbiAgICAmLmpwLWNhcmQtaWRlbnRpZmllZCB7XG4gICAgICAgIC5qcC1jYXJkLWZyb250LCAuanAtY2FyZC1iYWNrIHtcbiAgICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZmlsbC1jb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuanAtY2FyZC1sb2dvLmpwLWNhcmQtdmlzYSB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB9XG4gICAgfVxufSIsCgkJIkBpbXBvcnQgXCJsb2dvXCI7XG5cbi5qcC1jYXJkLWxvZ28uanAtY2FyZC12aXNhIHtcbiAgICAvLyBkaXNwbGF5OiBub25lO1xuICAgICRibHVlOiAjMUExODc2O1xuICAgICR5ZWxsb3c6ICNFNzk4MDA7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBjb2xvcjogJGJsdWU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBsaW5lLWhlaWdodDogMThweDtcblxuXG4gICAgJjpiZWZvcmUsICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIiBcIjtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDI1JTtcbiAgICB9XG5cbiAgICAmOmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQ6ICRibHVlO1xuICAgIH1cblxuICAgICY6YWZ0ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiAkeWVsbG93O1xuICAgIH1cbn1cbiIsCgkJIkBpbXBvcnQgXCJjYXJkXCI7XG5AaW1wb3J0IFwiLi4vbG9nb3MvbWFzdGVyY2FyZFwiO1xuXG4kZmlsbC1jb2xvcjogIzAwNjFBODtcblxuLmpwLWNhcmQuanAtY2FyZC1tYXN0ZXJjYXJkIHtcbiAgICAmLmpwLWNhcmQtaWRlbnRpZmllZCB7XG4gICAgICAgIC5qcC1jYXJkLWZyb250LCAuanAtY2FyZC1iYWNrIHtcbiAgICAgICAgICAgIC5qcC1jYXJkLWxvZ28uanAtY2FyZC1tYXN0ZXJjYXJkIHtcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRmaWxsLWNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5qcC1jYXJkLWxvZ28uanAtY2FyZC1tYXN0ZXJjYXJkIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLAoJCSJAaW1wb3J0IFwibG9nb1wiO1xuXG4uanAtY2FyZC1sb2dvLmpwLWNhcmQtbWFzdGVyY2FyZCB7XG4gICAgLy8gZGlzcGxheTogbm9uZTtcbiAgICAkcmVkOiAjRkYwMDAwO1xuICAgICR5ZWxsb3c6ICNGRkFCMDA7XG4gICAgJG9mZnNldDogMDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogOXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAkbG9nby1oZWlnaHQ7XG4gICAgei1pbmRleDogMTtcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCByZ2JhKDAsIDAsIDAsIC42KTtcbiAgICAmOmJlZm9yZSwgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgd2lkdGg6ICRsb2dvLWhlaWdodDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGhlaWdodDogJGxvZ28taGVpZ2h0O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAkbG9nby1oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgICY6YmVmb3JlIHtcbiAgICAgICAgbGVmdDogJG9mZnNldDtcbiAgICAgICAgYmFja2dyb3VuZDogJHJlZDtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgfVxuXG4gICAgJjphZnRlciB7XG4gICAgICAgIHJpZ2h0OiAkb2Zmc2V0O1xuICAgICAgICBiYWNrZ3JvdW5kOiAkeWVsbG93O1xuICAgICAgICB6LWluZGV4OiAtMjtcbiAgICB9XG59XG4iLAoJCSJAaW1wb3J0IFwiY2FyZFwiO1xuQGltcG9ydCBcIi4uL2xvZ29zL21hZXN0cm9cIjtcblxuJGZpbGwtY29sb3I6ICMwQjJDNUY7XG5cbi5qcC1jYXJkLmpwLWNhcmQtbWFlc3RybyB7XG4gICAgJi5qcC1jYXJkLWlkZW50aWZpZWQge1xuICAgICAgICAuanAtY2FyZC1mcm9udCwgLmpwLWNhcmQtYmFjayB7XG4gICAgICAgICAgICAuanAtY2FyZC1sb2dvLmpwLWNhcmQtbWFlc3RybyB7XG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZmlsbC1jb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuanAtY2FyZC1sb2dvLmpwLWNhcmQtbWFlc3RybyB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwKCQkiQGltcG9ydCBcImxvZ29cIjtcblxuLmpwLWNhcmQtbG9nby5qcC1jYXJkLW1hZXN0cm8ge1xuICAgIC8vIGRpc3BsYXk6IG5vbmU7XG4gICAgJGJsdWU6ICMwMDY0Q0I7XG4gICAgJHJlZDogI0NDMDAwMDtcbiAgICAkb2Zmc2V0OiAwO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAkbG9nby1oZWlnaHQ7XG4gICAgei1pbmRleDogMTtcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCByZ2JhKDAsIDAsIDAsIC42KTtcbiAgICAmOmJlZm9yZSwgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgd2lkdGg6ICRsb2dvLWhlaWdodDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGhlaWdodDogJGxvZ28taGVpZ2h0O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAkbG9nby1oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgICY6YmVmb3JlIHtcbiAgICAgICAgbGVmdDogJG9mZnNldDtcbiAgICAgICAgYmFja2dyb3VuZDogJGJsdWU7XG4gICAgICAgIHotaW5kZXg6IC0xO1xuICAgIH1cblxuICAgICY6YWZ0ZXIge1xuICAgICAgICByaWdodDogJG9mZnNldDtcbiAgICAgICAgYmFja2dyb3VuZDogJHJlZDtcbiAgICAgICAgei1pbmRleDogLTI7XG4gICAgfVxufVxuIiwKCQkiQGltcG9ydCBcImNhcmRcIjtcbkBpbXBvcnQgXCIuLi9sb2dvcy9kYW5rb3J0XCI7XG5cbiRmaWxsLWNvbG9yOiAjMDA1NUM3O1xuXG4uanAtY2FyZC5qcC1jYXJkLWRhbmtvcnQge1xuICAgICYuanAtY2FyZC1pZGVudGlmaWVkIHtcbiAgICAgICAgLmpwLWNhcmQtZnJvbnQsIC5qcC1jYXJkLWJhY2sge1xuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRmaWxsLWNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5qcC1jYXJkLWxvZ28uanAtY2FyZC1kYW5rb3J0IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLAoJCSJAaW1wb3J0IFwibG9nb1wiO1xuXG4uanAtY2FyZC1sb2dvLmpwLWNhcmQtZGFua29ydCB7XG4gICAgJHdoaXRlOiAjRkZGRkZGO1xuICAgICRibGFjazogIzAwMDAwMDtcbiAgICAkcmVkOiAjRUQxQzI0O1xuICAgICRwYWRkaW5nOiAzcHg7XG4gICAgJHJhZGl1czogOHB4O1xuXG4gICAgJGlubmVyLWhlaWdodDogJGxvZ28taGVpZ2h0IC0gKCRwYWRkaW5nICogMikgLSAyOyAvLyBoZWlnaHQgLSBwYWRkaW5nIC0gYm9yZGVyXG4gICAgJGxldHRlci1oZWlnaHQ6ICRpbm5lci1oZWlnaHQgKiAwLjU1O1xuXG4gICAgd2lkdGg6ICRsb2dvLXdpZHRoO1xuICAgIGhlaWdodDogJGxvZ28taGVpZ2h0O1xuICAgIHBhZGRpbmc6ICRwYWRkaW5nO1xuICAgIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gICAgYm9yZGVyOiAkYmxhY2sgMXB4IHNvbGlkO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcblxuICAgIC5kayB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogMTAwJTtcblxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgICAgJjpiZWZvcmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcmVkO1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJHJhZGl1cyowLjc1O1xuICAgICAgfVxuICAgICAgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBtYXJnaW4tdG9wOiAtKCRsZXR0ZXItaGVpZ2h0LzIpO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiA3cHggN3B4IDEwcHggMDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudCAkcmVkIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5kLCAuayB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIHdpZHRoOiA1MCU7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGhlaWdodDogJGxldHRlci1oZWlnaHQ7XG4gICAgICBtYXJnaW4tdG9wOiAtKCRsZXR0ZXItaGVpZ2h0LzIpO1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgfVxuICAgIC5kIHtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBib3JkZXItcmFkaXVzOiAwIDhweCAxMHB4IDA7XG4gICAgICAmOmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBiYWNrZ3JvdW5kOiAkcmVkO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHggNHB4IDZweCAwcHg7XG4gICAgICAgIGhlaWdodDogNXB4O1xuICAgICAgICB3aWR0aDogN3B4O1xuICAgICAgICBtYXJnaW46IC0zcHggMCAwIC00cHg7XG4gICAgICB9XG4gICAgfVxuICAgIC5rIHtcbiAgICAgIHJpZ2h0OiAwO1xuXG4gICAgICAmOmJlZm9yZSwgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiA1MCU7XG4gICAgICAgIHdpZHRoOiAwO1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgIG1hcmdpbi1yaWdodDogLTFweDtcbiAgICAgIH1cblxuICAgICAgJjpiZWZvcmUge1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGJvcmRlci13aWR0aDogOHB4IDVweCAwIDA7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHJlZCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcbiAgICAgIH1cblxuICAgICAgJjphZnRlciB7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAwIDVweCA4cHggMDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAkcmVkIHRyYW5zcGFyZW50O1xuICAgICAgfVxuICAgIH1cbn1cbiIsCgkJIkBpbXBvcnQgXCJjYXJkXCI7XG5AaW1wb3J0IFwiLi4vbG9nb3MvZWxvXCI7XG5cbiRmaWxsLWNvbG9yOiAjNkY2OTY5O1xuXG4uanAtY2FyZC5qcC1jYXJkLWVsbyB7XG4gICAgJi5qcC1jYXJkLWlkZW50aWZpZWQge1xuICAgICAgICAuanAtY2FyZC1mcm9udCwgLmpwLWNhcmQtYmFjayB7XG4gICAgICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGZpbGwtY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmpwLWNhcmQtbG9nby5qcC1jYXJkLWVsbyB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwKCQkiQGltcG9ydCBcImxvZ29cIjtcblxuLmpwLWNhcmQtbG9nby5qcC1jYXJkLWVsbyB7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogYmxhY2s7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlO1xuICAgIGZvbnQtc2l6ZTogMjFweDtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBwYWRkaW5nLXRvcDogMTNweDtcblxuICAgIC5lLCAubCwgLm8ge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG5cbiAgICAuZSB7XG4gICAgICAgIEBpbmNsdWRlIHRyYW5zZm9ybShyb3RhdGUoLTE1ZGVnKSk7XG4gICAgfVxuXG4gICAgLm8ge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgd2lkdGg6IDEycHg7XG4gICAgICAgIGhlaWdodDogMTJweDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHRvcDogN3B4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBAaW5jbHVkZSBiYWNrZ3JvdW5kLWltYWdlKGxpbmVhci1ncmFkaWVudCh5ZWxsb3cgNTAlLCByZWQgNTAlKSk7XG4gICAgICAgIEBpbmNsdWRlIHRyYW5zZm9ybShyb3RhdGUoNDBkZWcpKTtcbiAgICAgICAgdGV4dC1pbmRlbnQ6IC05OTk5cHg7XG5cbiAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiA0OSU7XG4gICAgICAgICAgICBoZWlnaHQ6IDQ5JTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGJsYWNrO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgICAgIHRleHQtaW5kZW50OiAtOTk5OTlweDtcbiAgICAgICAgICAgIHRvcDogMjUlO1xuICAgICAgICAgICAgbGVmdDogMjUlO1xuICAgICAgICB9XG4gICAgfVxufVxuIgoJXSwKCSJtYXBwaW5ncyI6ICJBa0VBQSxRQUFRLEFBQUEsZUFBZSxBQUNuQixtQkFBbUIsQ0FDZixjQUFjLEFBQ1QsT0FBTyxFQUhwQixRQUFRLEFBQUEsZUFBZSxBQUNuQixtQkFBbUIsQ0FDQyxhQUFhLEFBQ3hCLE9BQU8sQ0FBQztFdENHbkIsZ0JBQWdCLEVxQ3lETix5SkFBeUIsRUFJekIsMEpBQXlCLEVBSXpCLHlKQUF5QixFQUl6QiwwSkFBeUIsRXhEekQyQixzSEFBUTtFbUJYdEUsZ0JBQWdCLEVxQ3dETix5SkFBeUIsRUFJekIsMEpBQXlCLEVBSXpCLHlKQUF5QixFQUl6QiwwSkFBeUIsRXhEckRkLDZHQUFPLEd5RGpCakI7O0FDTGIsUUFBUSxBQUFBLGNBQWMsQUFDakIsZ0JBQWdCLEVBREcsUUFBUSxBQUFBLGNBQWMsQUFDekMsZ0JBQWdCLENBQUM7RVRRZCxpQkFBb0IsRVNQRCxJQUFJO0VUWXZCLGNBQWlCLEVTWkUsSUFBSTtFVGlCdkIsYUFBZ0IsRVNqQkcsSUFBSTtFVHNCdkIsWUFBZSxFU3RCSSxJQUFJO0VUMkJ2QixTQUFZLEVTM0JPLElBQUksR0F3QjFCO0VBMUJMLFFBQVEsQUFBQSxjQUFjLEFBQ2pCLGdCQUFnQixDQUViLGNBQWMsRUFIRSxRQUFRLEFBQUEsY0FBYyxBQUN6QyxnQkFBZ0IsQ0FFYixjQUFjLENBQUM7SVRNZixpQkFBb0IsRVNMRyxhQUFPO0lUVTlCLGNBQWlCLEVTVk0sYUFBTztJVGU5QixhQUFnQixFU2ZPLGFBQU87SVRvQjlCLFlBQWUsRVNwQlEsYUFBTztJVHlCOUIsU0FBWSxFU3pCVyxhQUFPLEdBQzdCO0VBTFQsUUFBUSxBQUFBLGNBQWMsQUFDakIsZ0JBQWdCLENBS2IsYUFBYSxFQU5HLFFBQVEsQUFBQSxjQUFjLEFBQ3pDLGdCQUFnQixDQUtiLGFBQWEsQ0FBQztJVEdkLGlCQUFvQixFU0ZHLGFBQU87SVRPOUIsY0FBaUIsRVNQTSxhQUFPO0lUWTlCLGFBQWdCLEVTWk8sYUFBTztJVGlCOUIsWUFBZSxFU2pCUSxhQUFPO0lUc0I5QixTQUFZLEVTdEJXLGFBQU8sR0FrQjdCO0lBekJULFFBQVEsQUFBQSxjQUFjLEFBQ2pCLGdCQUFnQixDQUtiLGFBQWEsQUFHUixNQUFNLEVBVEssUUFBUSxBQUFBLGNBQWMsQUFDekMsZ0JBQWdCLENBS2IsYUFBYSxBQUdSLE1BQU0sQ0FBQztNQUNMLElBQUksRUFBRSxHQUFJLEdBQ1o7SUFYYixRQUFRLEFBQUEsY0FBYyxBQUNqQixnQkFBZ0IsQ0FLYixhQUFhLENBT1QsWUFBWSxFQWJBLFFBQVEsQUFBQSxjQUFjLEFBQ3pDLGdCQUFnQixDQUtiLGFBQWEsQ0FPVCxZQUFZLENBQUM7TVRKakIsaUJBQW9CLEVTS08sZUFBTztNVEFsQyxjQUFpQixFU0FVLGVBQU87TVRLbEMsYUFBZ0IsRVNMVyxlQUFPO01UVWxDLFlBQWUsRVNWWSxlQUFPO01UZWxDLFNBQVksRVNmZSxlQUFPO01BQzFCLElBQUksRUFBRSxFQUFHLEdBQ1o7SUFoQmIsUUFBUSxBQUFBLGNBQWMsQUFDakIsZ0JBQWdCLENBS2IsYUFBYSxDQVlULGNBQWMsRUFsQkYsUUFBUSxBQUFBLGNBQWMsQUFDekMsZ0JBQWdCLENBS2IsYUFBYSxDQVlULGNBQWMsQ0FBRTtNQUNaLElBQUksRUFBRSxHQUFJLEdBS2I7TUF4QmIsUUFBUSxBQUFBLGNBQWMsQUFDakIsZ0JBQWdCLENBS2IsYUFBYSxDQVlULGNBQWMsQUFFVCxNQUFNLEVBcEJDLFFBQVEsQUFBQSxjQUFjLEFBQ3pDLGdCQUFnQixDQUtiLGFBQWEsQ0FZVCxjQUFjLEFBRVQsTUFBTSxDQUFDO1FBQ0osSUFBSSxFQUFFLEtBQU07UVRaeEIsaUJBQW9CLEVTYVcsZUFBTztRVFJ0QyxjQUFpQixFU1FjLGVBQU87UVRIdEMsYUFBZ0IsRVNHZSxlQUFPO1FURXRDLFlBQWUsRVNGZ0IsZUFBTztRVE90QyxTQUFZLEVTUG1CLGVBQU8sR0FDN0I7O0FBS2pCLFFBQVEsQUFBQSxjQUFjLEFBQUEsYUFBYSxDQUFDLGFBQWEsRUFBRSxRQUFRLEFBQUEsY0FBYyxBQUFBLGFBQWEsQ0FBQyxhQUFhLENBQUM7RUFDakcsT0FBTyxFQUFFLElBQUssR0FDakI7O0FJMUJHLGFBQWEsQ0FBQztFQUlWLE1BQU0sRUFSQSxJQUFJO0VBU1YsS0FBSyxFQVJBLElBQUk7RUFTVCxVQUFVLEVBQUUsTUFBTyxHQUN0QjtFQVBELGFBQWEsRUFBYixhQUFhLEFBQ0wsT0FBTyxFQURmLGFBQWEsQUFDSyxNQUFNLENBQUM7SUFDakIsVUFBVSxFQUFFLFVBQVcsR0FDMUI7O0FETFQsYUFBYSxBQUFBLGFBQWEsQ0FBQztFQU92QixjQUFjLEVBQUUsU0FBVTtFQUUxQixTQUFTLEVBTEcsR0FBRztFQU1mLFdBQVcsRUFBRSxJQUFLO0VBQ2xCLEtBQUssRUFBRSxLQUFNO0UxQ1BmLGdCQUFnQixFMENTWSwrREFBeUI7RTFDUnJELGdCQUFnQixFMENRWSwrREFBeUI7RUFDbkQsTUFBTSxFQUFFLGNBQWUsR0EyQjFCO0VBekNELGFBQWEsQUFBQSxhQUFhLEFBZ0JyQixPQUFPLEVBaEJaLGFBQWEsQUFBQSxhQUFhLEFBZ0JYLE1BQU0sQ0FBQztJQUNkLEtBQUssRUNuQkMsSUFBSTtJRG9CVixPQUFPLEVBQUUsS0FBTTtJQUNmLFFBQVEsRUFBRSxRQUFTO0lBQ25CLElBQUksRUNyQkMsSUFBSSxHRHNCWjtFQXJCTCxhQUFhLEFBQUEsYUFBYSxBQXVCckIsT0FBTyxDQUFDO0lBRUwsTUFBTSxFQzNCQSxJQUFJO0lENEJWLE9BQU8sRUFBRSxVQUFXO0lBRXBCLEdBQUcsRUEzQk0sR0FBRztJQTRCWixVQUFVLEVBQUUsSUFBSztJQUNqQixZQUFZLEVBekJELEdBQUc7SUEwQmQsV0FBVyxFQ2pDTCxJQUFJO0lEa0NWLFVBQVUsRUFSSCxPQUFPLEdBU2pCO0VBakNMLGFBQWEsQUFBQSxhQUFhLEFBbUNyQixNQUFNLENBQUM7SUFDSixPQUFPLEVBQUUsU0FBVTtJQUNuQixNQUFNLEVDdkNBLElBQUk7SUR3Q1YsVUFBVSxFQUFFLEtBQU07SUFDbEIsYUFBYSxFQWxDRixHQUFHLEdBbUNqQjs7QUZyQ0wsUUFBUSxBQUFBLGFBQWEsQUFFaEIsZ0JBQWdCLENBQUE7RVZFYixpQkFBb0IsRVVERCxJQUFJO0VWTXZCLGNBQWlCLEVVTkUsSUFBSTtFVld2QixhQUFnQixFVVhHLElBQUk7RVZnQnZCLFlBQWUsRVVoQkksSUFBSTtFVnFCdkIsU0FBWSxFVXJCTyxJQUFJLEdBQzFCOztBQUpMLFFBQVEsQUFBQSxhQUFhLEFBTWhCLG1CQUFtQixDQUNoQixjQUFjLEFBQ1QsT0FBTyxFQVJwQixRQUFRLEFBQUEsYUFBYSxBQU1oQixtQkFBbUIsQ0FDQSxhQUFhLEFBQ3hCLE9BQU8sQ0FBQztFQUNMLGdCQUFnQixFQVhuQixPQUFPLEdBWVA7O0FBVmIsUUFBUSxBQUFBLGFBQWEsQUFNaEIsbUJBQW1CLENBT2hCLGNBQWMsQ0FFVixhQUFhLEFBQUEsYUFBYSxDQUFDO0VBQ3ZCLE9BQU8sRUFBRSxDQUFFLEdBQ2Q7O0FBakJiLFFBQVEsQUFBQSxhQUFhLEFBTWhCLG1CQUFtQixDQU9oQixjQUFjLENBTVYsWUFBWSxDQUFDO0VBQ1QsVUFBVSxFQUFFLE9BQVEsR0FDdkI7O0FBckJiLFFBQVEsQUFBQSxhQUFhLEFBTWhCLG1CQUFtQixDQU9oQixjQUFjLEFBVVQsTUFBTSxDQUFDO0VBQ0osT0FBTyxFQUFFLENBQUUsR0FDZDs7QUs1QmIsYUFBYSxBQUFBLGlCQUFpQixDQUFDO0VBRzNCLFVBQVUsRUFGRCxPQUFPO0VBR2hCLEtBQUssRUFBRSxJQUFLO0VBQ1osY0FBYyxFQUFFLFNBQVU7RUFDMUIsVUFBVSxFQUFFLE1BQU87RUFDbkIsV0FBVyxFQUFFLElBQUs7RUFDbEIsU0FBUyxFQUFFLElBQUs7RUFDaEIsVUFBVSxFQUFFLE1BQU87RUFDbkIsUUFBUSxFQUFFLE1BQU87RUFDakIsT0FBTyxFQUFFLENBQUU7RUFDWCxXQUFXLEVBVkYsR0FBRztFQVdaLGNBQWMsRUFBRSxLQUFNO0VBQ3RCLE1BQU0sRUFBRSxjQUFlLEdBZ0MxQjtFQTlDRCxhQUFhLEFBQUEsaUJBQWlCLEFBZ0J6QixPQUFPLEVBaEJaLGFBQWEsQUFBQSxpQkFBaUIsQUFnQmYsTUFBTSxDQUFDO0lBQ2QsT0FBTyxFQUFFLEdBQUk7SUFDYixPQUFPLEVBQUUsS0FBTTtJQUNmLFFBQVEsRUFBRSxRQUFTLEdBQ3RCO0VBcEJMLGFBQWEsQUFBQSxpQkFBaUIsQUFzQnpCLE9BQU8sQ0FBQztJQUVMLFVBQVUsRUFBRSxLQUFNO0lBQ2xCLEtBQUssRUFGRSxLQUFLO0lBR1osTUFBTSxFQUhDLEtBQUs7SUFJWixhQUFhLEVBSk4sS0FBSztJQUtaLE1BQU0sRUFBRSxHQUFJO0lBQ1osS0FBSyxFQUFFLElBQUs7SUFDWixPQUFPLEVBQUUsRUFBRyxHQUNmO0VBL0JMLGFBQWEsQUFBQSxpQkFBaUIsQUFpQ3pCLE1BQU0sQ0FBQztJQUVKLEtBQUssRUFERSxHQUFHO0lBRVYsTUFBTSxFQUZDLEdBQUc7SUFHVixhQUFhLEVBSE4sR0FBRztJQUlWLEdBQUcsRUFwQ0UsSUFBRztJQXFDUixJQUFJLEVBQUUsSUFBSztJNUJOakIsZ0JBQWdCLEU0QmhDTCxPQUFPO0k1QmlDbEIsZ0JBQWdCLEVBQUUsc0NBQXVCO0lBQ3pDLGdCQUFnQixFQUFFLGdDQUFPO0k0Qk1uQixPQUFPLEVBQUUsU0FBVTtJQUNuQixTQUFTLEVBQUUsR0FBSTtJQUNmLFdBQVcsRUFBRSxJQUFLO0lBQ2xCLFdBQVcsRUFBRSxJQUFLLEdBQ3JCOztBRHpDTCxRQUFRLENBQ0osY0FBYyxDQUFDLGFBQWEsQUFBQSxpQkFBaUIsQ0FBQztFQUMxQyxLQUFLLEVBQUUsR0FBSTtFQUNYLEdBQUcsRUFBRSxHQUFJLEdBQ1o7O0FBR0wsUUFBUSxBQUFBLGlCQUFpQixBQUVwQixtQkFBbUIsQ0FDaEIsY0FBYyxBQUNULE9BQU8sRUFKcEIsUUFBUSxBQUFBLGlCQUFpQixBQUVwQixtQkFBbUIsQ0FDQSxhQUFhLEFBQ3hCLE9BQU8sQ0FBQztFQUNMLGdCQUFnQixFQWZuQixPQUFPLEdBZ0JQOztBQU5iLFFBQVEsQUFBQSxpQkFBaUIsQUFFcEIsbUJBQW1CLENBTWhCLGFBQWEsQUFBQSxpQkFBaUIsQ0FBQztFQUMzQixPQUFPLEVBQUUsQ0FBRSxHQUNkOztBQVZULFFBQVEsQUFBQSxpQkFBaUIsQUFFcEIsbUJBQW1CLENBVWhCLGNBQWMsQUFDVCxNQUFNLENBQUM7RWRqQlosa0JBQW9CLEVXRkwsS0FBSztFWE9wQixlQUFpQixFV1BGLEtBQUs7RVhzQnBCLFVBQVksRVd0QkcsS0FBSztFSlF4QixPQUFPLEVBQUUsR0FBSTtFQUNiLE9BQU8sRUFBRSxLQUFNO0V0QmtCakIsZ0JBQWdCLEU2QjlCQSxPQUFPO0U3QitCdkIsZ0JBQWdCLEVBQUUsa0RBQXVCO0VBQ3pDLGdCQUFnQixFQUFFLDBDQUFPO0U2QkxYLE1BQU0sRUFKQyxJQUFJO0VBS1gsS0FBSyxFQUxFLElBQUk7RUFNWCxhQUFhLEVBTk4sSUFBSTtFQU9YLFFBQVEsRUFBRSxRQUFTO0VBQ25CLElBQUksRUFBRSxJQUFLO0VBQ1gsR0FBRyxFQUFFLEdBQUk7RUFDVCxXQUFXLEVBVkosS0FBSTtFQVdYLFVBQVUsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFJLEdBQ3pDOztBR3JDYixhQUFhLEFBQUEsYUFBYSxDQUFDO0VBSXZCLFVBQVUsRUFBRSxLQUFNO0VBQ2xCLGNBQWMsRUFBRSxTQUFVO0VBQzFCLEtBQUssRUFKRSxPQUFPO0VBS2QsVUFBVSxFQUFFLE1BQU87RUFDbkIsV0FBVyxFQUFFLElBQUs7RUFDbEIsU0FBUyxFQUFFLElBQUs7RUFDaEIsV0FBVyxFQUFFLElBQUssR0FpQnJCO0VBM0JELGFBQWEsQUFBQSxhQUFhLEFBYXJCLE9BQU8sRUFiWixhQUFhLEFBQUEsYUFBYSxBQWFYLE1BQU0sQ0FBQztJQUNkLE9BQU8sRUFBRSxHQUFJO0lBQ2IsT0FBTyxFQUFFLEtBQU07SUFDZixLQUFLLEVBQUUsSUFBSztJQUNaLE1BQU0sRUFBRSxHQUFJLEdBQ2Y7RUFsQkwsYUFBYSxBQUFBLGFBQWEsQUFvQnJCLE9BQU8sQ0FBQztJQUNMLFVBQVUsRUFuQlAsT0FBTyxHQW9CYjtFQXRCTCxhQUFhLEFBQUEsYUFBYSxBQXdCckIsTUFBTSxDQUFDO0lBQ0osVUFBVSxFQXRCTCxPQUFPLEdBdUJmOztBRHZCTCxRQUFRLEFBQUEsYUFBYSxBQUNoQixtQkFBbUIsQ0FDaEIsY0FBYyxBQUNULE9BQU8sRUFIcEIsUUFBUSxBQUFBLGFBQWEsQUFDaEIsbUJBQW1CLENBQ0EsYUFBYSxBQUN4QixPQUFPLENBQUM7RUFDTCxnQkFBZ0IsRUFObkIsT0FBTyxHQU9QOztBQUxiLFFBQVEsQUFBQSxhQUFhLEFBQ2hCLG1CQUFtQixDQU1oQixhQUFhLEFBQUEsYUFBYSxDQUFDO0VBQ3ZCLE9BQU8sRUFBRSxDQUFFLEdBQ2Q7O0FHWlQsYUFBYSxBQUFBLG1CQUFtQixDQUFDO0VBSzdCLEtBQUssRUFBRSxLQUFNO0VBQ2IsV0FBVyxFQUFFLElBQUs7RUFDbEIsVUFBVSxFQUFFLE1BQU87RUFDbkIsU0FBUyxFQUFFLEdBQUk7RUFDZixXQUFXLEVOWEQsSUFBSTtFTVlkLE9BQU8sRUFBRSxDQUFFO0VBQ1gsV0FBVyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQUksR0FzQjVCO0VBakNELGFBQWEsQUFBQSxtQkFBbUIsQUFZM0IsT0FBTyxFQVpaLGFBQWEsQUFBQSxtQkFBbUIsQUFZakIsTUFBTSxDQUFDO0lBQ2QsT0FBTyxFQUFFLEdBQUk7SUFDYixPQUFPLEVBQUUsS0FBTTtJQUNmLEtBQUssRU5qQkMsSUFBSTtJTWtCVixHQUFHLEVBQUUsQ0FBRTtJQUNQLFFBQVEsRUFBRSxRQUFTO0lBQ25CLE1BQU0sRU5wQkEsSUFBSTtJTXFCVixhQUFhLEVOckJQLElBQUksR01zQmI7RUFwQkwsYUFBYSxBQUFBLG1CQUFtQixBQXNCM0IsT0FBTyxDQUFDO0lBQ0wsSUFBSSxFQW5CQyxDQUFDO0lBb0JOLFVBQVUsRUF0QlIsT0FBTztJQXVCVCxPQUFPLEVBQUUsRUFBRyxHQUNmO0VBMUJMLGFBQWEsQUFBQSxtQkFBbUIsQUE0QjNCLE1BQU0sQ0FBQztJQUNKLEtBQUssRUF6QkEsQ0FBQztJQTBCTixVQUFVLEVBM0JMLE9BQU87SUE0QlosT0FBTyxFQUFFLEVBQUcsR0FDZjs7QUQ3QkwsUUFBUSxBQUFBLG1CQUFtQixBQUN0QixtQkFBbUIsQ0FDaEIsY0FBYyxDQUNWLGFBQWEsQUFBQSxtQkFBbUIsRUFINUMsUUFBUSxBQUFBLG1CQUFtQixBQUN0QixtQkFBbUIsQ0FDQSxhQUFhLENBQ3pCLGFBQWEsQUFBQSxtQkFBbUIsQ0FBQztFQUM3QixVQUFVLEVBQUUsSUFBSyxHQUNwQjs7QUFMYixRQUFRLEFBQUEsbUJBQW1CLEFBQ3RCLG1CQUFtQixDQUNoQixjQUFjLEFBSVQsT0FBTyxFQU5wQixRQUFRLEFBQUEsbUJBQW1CLEFBQ3RCLG1CQUFtQixDQUNBLGFBQWEsQUFJeEIsT0FBTyxDQUFDO0VBQ0wsZ0JBQWdCLEVBVG5CLE9BQU8sR0FVUDs7QUFSYixRQUFRLEFBQUEsbUJBQW1CLEFBQ3RCLG1CQUFtQixDQVNoQixhQUFhLEFBQUEsbUJBQW1CLENBQUM7RUFDN0IsT0FBTyxFQUFFLENBQUUsR0FDZDs7QUdmVCxhQUFhLEFBQUEsZ0JBQWdCLENBQUM7RUFLMUIsS0FBSyxFQUFFLEtBQU07RUFDYixXQUFXLEVBQUUsSUFBSztFQUNsQixVQUFVLEVBQUUsTUFBTztFQUNuQixTQUFTLEVBQUUsSUFBSztFQUNoQixXQUFXLEVSWEQsSUFBSTtFUVlkLE9BQU8sRUFBRSxDQUFFO0VBQ1gsV0FBVyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQUksR0FzQjVCO0VBakNELGFBQWEsQUFBQSxnQkFBZ0IsQUFZeEIsT0FBTyxFQVpaLGFBQWEsQUFBQSxnQkFBZ0IsQUFZZCxNQUFNLENBQUM7SUFDZCxPQUFPLEVBQUUsR0FBSTtJQUNiLE9BQU8sRUFBRSxLQUFNO0lBQ2YsS0FBSyxFUmpCQyxJQUFJO0lRa0JWLEdBQUcsRUFBRSxDQUFFO0lBQ1AsUUFBUSxFQUFFLFFBQVM7SUFDbkIsTUFBTSxFUnBCQSxJQUFJO0lRcUJWLGFBQWEsRVJyQlAsSUFBSSxHUXNCYjtFQXBCTCxhQUFhLEFBQUEsZ0JBQWdCLEFBc0J4QixPQUFPLENBQUM7SUFDTCxJQUFJLEVBbkJDLENBQUM7SUFvQk4sVUFBVSxFQXRCUCxPQUFPO0lBdUJWLE9BQU8sRUFBRSxFQUFHLEdBQ2Y7RUExQkwsYUFBYSxBQUFBLGdCQUFnQixBQTRCeEIsTUFBTSxDQUFDO0lBQ0osS0FBSyxFQXpCQSxDQUFDO0lBMEJOLFVBQVUsRUEzQlIsT0FBTztJQTRCVCxPQUFPLEVBQUUsRUFBRyxHQUNmOztBRDdCTCxRQUFRLEFBQUEsZ0JBQWdCLEFBQ25CLG1CQUFtQixDQUNoQixjQUFjLENBQ1YsYUFBYSxBQUFBLGdCQUFnQixFQUh6QyxRQUFRLEFBQUEsZ0JBQWdCLEFBQ25CLG1CQUFtQixDQUNBLGFBQWEsQ0FDekIsYUFBYSxBQUFBLGdCQUFnQixDQUFDO0VBQzFCLFVBQVUsRUFBRSxJQUFLLEdBQ3BCOztBQUxiLFFBQVEsQUFBQSxnQkFBZ0IsQUFDbkIsbUJBQW1CLENBQ2hCLGNBQWMsQUFJVCxPQUFPLEVBTnBCLFFBQVEsQUFBQSxnQkFBZ0IsQUFDbkIsbUJBQW1CLENBQ0EsYUFBYSxBQUl4QixPQUFPLENBQUM7RUFDTCxnQkFBZ0IsRUFUbkIsT0FBTyxHQVVQOztBQVJiLFFBQVEsQUFBQSxnQkFBZ0IsQUFDbkIsbUJBQW1CLENBU2hCLGFBQWEsQUFBQSxnQkFBZ0IsQ0FBQztFQUMxQixPQUFPLEVBQUUsQ0FBRSxHQUNkOztBR2ZULGFBQWEsQUFBQSxnQkFBZ0IsQ0FBQztFQVUxQixLQUFLLEVWWEksSUFBSTtFVVliLE1BQU0sRVZiSSxJQUFJO0VVY2QsT0FBTyxFQVJHLEdBQUc7RUFTYixhQUFhLEVBUkosR0FBRztFQVNaLE1BQU0sRUFaRSxPQUFPLENBWUEsR0FBRyxDQUFDLEtBQUs7RUFDeEIsZ0JBQWdCLEVBZFIsT0FBTyxHQWlHbEI7RUFsR0QsYUFBYSxBQUFBLGdCQUFnQixDQWlCekIsR0FBRyxDQUFDO0lBQ0YsUUFBUSxFQUFFLFFBQVM7SUFDbkIsS0FBSyxFQUFFLElBQUs7SUFDWixNQUFNLEVBQUUsSUFBSztJQUViLFFBQVEsRUFBRSxNQUFPLEdBd0JsQjtJQTlDTCxhQUFhLEFBQUEsZ0JBQWdCLENBaUJ6QixHQUFHLEFBT0EsT0FBTyxDQUFDO01BQ1AsZ0JBQWdCLEVBdEJkLE9BQU87TUF1QlQsT0FBTyxFQUFFLEVBQUc7TUFDWixRQUFRLEVBQUUsUUFBUztNQUNuQixLQUFLLEVBQUUsSUFBSztNQUNaLE1BQU0sRUFBRSxJQUFLO01BQ2IsT0FBTyxFQUFFLEtBQU07TUFDZixhQUFhLEVBMUJSLEdBQUcsR0EyQlQ7SUFoQ1AsYUFBYSxBQUFBLGdCQUFnQixDQWlCekIsR0FBRyxBQWdCQSxNQUFNLENBQUM7TUFDTixPQUFPLEVBQUUsRUFBRztNQUNaLFFBQVEsRUFBRSxRQUFTO01BQ25CLEdBQUcsRUFBRSxHQUFJO01BQ1QsVUFBVSxFVnZDSixNQUFJO01Vd0NWLEtBQUssRUFBRSxDQUFFO01BQ1QsS0FBSyxFQUFFLENBQUU7TUFDVCxNQUFNLEVBQUUsQ0FBRTtNQUNWLFlBQVksRUFBRSxLQUFNO01BQ3BCLFlBQVksRUFBRSxjQUFlO01BQzdCLFlBQVksRUFBRSxXQUFXLENBeEN2QixPQUFPLENBd0NzQixXQUFXLENBQUMsV0FBVztNQUN0RCxPQUFPLEVBQUUsQ0FBRSxHQUNaO0VBN0NQLGFBQWEsQUFBQSxnQkFBZ0IsQ0FnRHpCLEVBQUUsRUFoRE4sYUFBYSxBQUFBLGdCQUFnQixDQWdEckIsRUFBRSxDQUFDO0lBQ0wsUUFBUSxFQUFFLFFBQVM7SUFDbkIsR0FBRyxFQUFFLEdBQUk7SUFDVCxLQUFLLEVBQUUsR0FBSTtJQUNYLE9BQU8sRUFBRSxLQUFNO0lBQ2YsTUFBTSxFVnZERSxNQUFJO0lVd0RaLFVBQVUsRVZ4REYsTUFBSTtJVXlEWixVQUFVLEVBQUUsS0FBTSxHQUNuQjtFQXhETCxhQUFhLEFBQUEsZ0JBQWdCLENBeUR6QixFQUFFLENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBRTtJQUNSLGFBQWEsRUFBRSxZQUFhLEdBYTdCO0lBeEVMLGFBQWEsQUFBQSxnQkFBZ0IsQ0F5RHpCLEVBQUUsQUFHQyxPQUFPLENBQUM7TUFDUCxPQUFPLEVBQUUsRUFBRztNQUNaLFFBQVEsRUFBRSxRQUFTO01BQ25CLEdBQUcsRUFBRSxHQUFJO01BQ1QsSUFBSSxFQUFFLEdBQUk7TUFDVixPQUFPLEVBQUUsS0FBTTtNQUNmLFVBQVUsRUEvRFIsT0FBTztNQWdFVCxhQUFhLEVBQUUsZUFBZ0I7TUFDL0IsTUFBTSxFQUFFLEdBQUk7TUFDWixLQUFLLEVBQUUsR0FBSTtNQUNYLE1BQU0sRUFBRSxhQUFjLEdBQ3ZCO0VBdkVQLGFBQWEsQUFBQSxnQkFBZ0IsQ0F5RXpCLEVBQUUsQ0FBQztJQUNELEtBQUssRUFBRSxDQUFFLEdBdUJWO0lBakdMLGFBQWEsQUFBQSxnQkFBZ0IsQ0F5RXpCLEVBQUUsQUFHQyxPQUFPLEVBNUVkLGFBQWEsQUFBQSxnQkFBZ0IsQ0F5RXpCLEVBQUUsQUFHVyxNQUFNLENBQUM7TUFDaEIsT0FBTyxFQUFFLEVBQUc7TUFDWixRQUFRLEVBQUUsUUFBUztNQUNuQixLQUFLLEVBQUUsR0FBSTtNQUNYLEtBQUssRUFBRSxDQUFFO01BQ1QsTUFBTSxFQUFFLENBQUU7TUFDVixZQUFZLEVBQUUsS0FBTTtNQUNwQixZQUFZLEVBQUUsSUFBSyxHQUNwQjtJQXBGUCxhQUFhLEFBQUEsZ0JBQWdCLENBeUV6QixFQUFFLEFBYUMsT0FBTyxDQUFDO01BQ1AsR0FBRyxFQUFFLENBQUU7TUFDUCxZQUFZLEVBQUUsV0FBWTtNQUMxQixZQUFZLEVBdEZWLE9BQU8sQ0FzRlUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQ3ZEO0lBMUZQLGFBQWEsQUFBQSxnQkFBZ0IsQ0F5RXpCLEVBQUUsQUFtQkMsTUFBTSxDQUFDO01BQ04sTUFBTSxFQUFFLENBQUU7TUFDVixZQUFZLEVBQUUsV0FBWTtNQUMxQixZQUFZLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0E1Rm5DLE9BQU8sQ0E0RmtDLFdBQVcsR0FDdkQ7O0FEN0ZQLFFBQVEsQUFBQSxnQkFBZ0IsQUFDbkIsbUJBQW1CLENBQ2hCLGNBQWMsQUFDVCxPQUFPLEVBSHBCLFFBQVEsQUFBQSxnQkFBZ0IsQUFDbkIsbUJBQW1CLENBQ0EsYUFBYSxBQUN4QixPQUFPLENBQUM7RUFDTCxnQkFBZ0IsRUFObkIsT0FBTyxHQU9QOztBQUxiLFFBQVEsQUFBQSxnQkFBZ0IsQUFDbkIsbUJBQW1CLENBTWhCLGFBQWEsQUFBQSxnQkFBZ0IsQ0FBQztFQUMxQixPQUFPLEVBQUUsQ0FBRSxHQUNkOztBR1pULGFBQWEsQUFBQSxZQUFZLENBQUM7RUFDdEIsTUFBTSxFQUFFLElBQUs7RUFDYixLQUFLLEVBQUUsSUFBSztFQUNaLGFBQWEsRUFBRSxJQUFLO0VBQ3BCLFVBQVUsRUFBRSxLQUFNO0VBQ2xCLEtBQUssRUFBRSxLQUFNO0VBQ2IsVUFBVSxFQUFFLE1BQU87RUFDbkIsY0FBYyxFQUFFLFNBQVU7RUFDMUIsU0FBUyxFQUFFLElBQUs7RUFDaEIsVUFBVSxFQUFFLE1BQU87RUFDbkIsY0FBYyxFQUFFLEdBQUk7RUFDcEIsV0FBVyxFQUFFLElBQUs7RUFDbEIsV0FBVyxFQUFFLElBQUssR0FtQ3JCO0VBL0NELGFBQWEsQUFBQSxZQUFZLENBY3JCLEVBQUUsRUFkTixhQUFhLEFBQUEsWUFBWSxDQWNqQixFQUFFLEVBZFYsYUFBYSxBQUFBLFlBQVksQ0FjYixFQUFFLENBQUM7SUFDUCxPQUFPLEVBQUUsWUFBYTtJQUN0QixRQUFRLEVBQUUsUUFBUyxHQUN0QjtFQWpCTCxhQUFhLEFBQUEsWUFBWSxDQW1CckIsRUFBRSxDQUFDO0l6QlpDLGlCQUFvQixFeUJhRCxjQUFNO0l6QlJ6QixjQUFpQixFeUJRRSxjQUFNO0l6Qkh6QixhQUFnQixFeUJHRyxjQUFNO0l6QkV6QixZQUFlLEV5QkZJLGNBQU07SXpCT3pCLFNBQVksRXlCUE8sY0FBTSxHQUM1QjtFQXJCTCxhQUFhLEFBQUEsWUFBWSxDQXVCckIsRUFBRSxDQUFDO0lBQ0MsUUFBUSxFQUFFLFFBQVM7SUFDbkIsT0FBTyxFQUFFLFlBQWE7SUFDdEIsS0FBSyxFQUFFLElBQUs7SUFDWixNQUFNLEVBQUUsSUFBSztJQUNiLEtBQUssRUFBRSxDQUFFO0lBQ1QsR0FBRyxFQUFFLEdBQUk7SUFDVCxhQUFhLEVBQUUsSUFBSztJdkQxQjFCLGdCQUFnQixFbkJZOEMsNkNBQVE7SW1CWHRFLGdCQUFnQixFbkJlSyxxQ0FBTztJaURidEIsaUJBQW9CLEV5QnlCRCxhQUFNO0l6QnBCekIsY0FBaUIsRXlCb0JFLGFBQU07SXpCZnpCLGFBQWdCLEV5QmVHLGFBQU07SXpCVnpCLFlBQWUsRXlCVUksYUFBTTtJekJMekIsU0FBWSxFeUJLTyxhQUFNO0lBQ3pCLFdBQVcsRUFBRSxPQUFRLEdBYXhCO0lBOUNMLGFBQWEsQUFBQSxZQUFZLENBdUJyQixFQUFFLEFBWUcsT0FBTyxDQUFDO01BQ0wsT0FBTyxFQUFFLEVBQUc7TUFDWixRQUFRLEVBQUUsUUFBUztNQUNuQixLQUFLLEVBQUUsR0FBSTtNQUNYLE1BQU0sRUFBRSxHQUFJO01BQ1osVUFBVSxFQUFFLEtBQU07TUFDbEIsYUFBYSxFQUFFLElBQUs7TUFDcEIsV0FBVyxFQUFFLFFBQVM7TUFDdEIsR0FBRyxFQUFFLEdBQUk7TUFDVCxJQUFJLEVBQUUsR0FBSSxHQUNiOztBRDFDVCxRQUFRLEFBQUEsWUFBWSxBQUNmLG1CQUFtQixDQUNoQixjQUFjLEFBQ1QsT0FBTyxFQUhwQixRQUFRLEFBQUEsWUFBWSxBQUNmLG1CQUFtQixDQUNBLGFBQWEsQUFDeEIsT0FBTyxDQUFDO0VBQ0wsZ0JBQWdCLEVBTm5CLE9BQU8sR0FPUDs7QUFMYixRQUFRLEFBQUEsWUFBWSxBQUNmLG1CQUFtQixDQU1oQixhQUFhLEFBQUEsWUFBWSxDQUFDO0VBQ3RCLE9BQU8sRUFBRSxDQUFFLEdBQ2Q7O0FsRkNULGtCQUFrQixDQUFDO0UwRE5YLG1CQUFvQixFMURPSCxNQUFNO0UwREZ2QixnQkFBaUIsRTFERUEsTUFBTTtFMERhdkIsV0FBWSxFMURiSyxNQUFNO0VBQzNCLEtBQUssRXFFakJJLEtBQUs7RXJFa0JkLFNBQVMsRUFBRSxJQUFLO0VBQ2hCLE1BQU0sRXFFbEJJLEtBQUs7RXJFbUJmLE1BQU0sRUFBRSxJQUFLO0VBQ2IsT0FBTyxFQUFFLENBQUU7RUFDWCxRQUFRLEVBQUUsUUFBUyxHQUN0Qjs7QUFFRCxRQUFRLENBQUM7RUFDTCxXQUFXLEVxRXRCSSxnQkFBZ0I7RXJFdUIvQixXQUFXLEVBQUUsQ0FBRTtFQUNmLFFBQVEsRUFBRSxRQUFTO0VBQ25CLEtBQUssRUFBRSxJQUFLO0VBQ1osTUFBTSxFQUFFLElBQUs7RUFDYixTQUFTLEVBQUUsS0FBTTtFQUNqQixhQUFhLEVxRTlCSSxJQUFJO0VYT2pCLHVCQUFvQixFMUQ4QkMsV0FBVztFMER6QmhDLG9CQUFpQixFMUR5QkksV0FBVztFMERwQmhDLG1CQUFnQixFMURvQkssV0FBVztFMERmaEMsa0JBQWUsRTFEZU0sV0FBVztFMERWaEMsZUFBWSxFMURVUyxXQUFXO0UwRDlCaEMsa0JBQW9CLEUxRCtCSixHQUFHLENxRWpDSixLQUFLLENyRWlDc0IsTUFBTTtFMEQxQmhELGVBQWlCLEUxRDBCRCxHQUFHLENxRWpDSixLQUFLLENyRWlDc0IsTUFBTTtFMERYaEQsVUFBWSxFMURXSSxHQUFHLENxRWpDSixLQUFLLENyRWlDc0IsTUFBTSxHQThPdkQ7RUE3UEQsUUFBUSxHQVNBLENBQUMsRUFUVCxRQUFRLEdBU08sQ0FBQyxBQUFBLE9BQU8sRUFUdkIsUUFBUSxHQVNxQixDQUFDLEFBQUEsTUFBTSxDQUFDO0lBQzdCLGVBQWUsRUFBRSxVQUFXO0lBQUUsa0JBQWtCLEVBQUUsVUFBVztJQUFFLFVBQVUsRUFBRSxVQUFXO0lBQ3RGLFdBQVcsRUFBRSxPQUFRLEdBQ3hCO0VBWkwsUUFBUSxBQWlCSCxnQkFBZ0IsQ0FBQztJMERqQ2QsaUJBQW9CLEUxRGtDRCxlQUFPO0kwRDdCMUIsY0FBaUIsRTFENkJFLGVBQU87STBEeEIxQixhQUFnQixFMUR3QkcsZUFBTztJMERuQjFCLFlBQWUsRTFEbUJJLGVBQU87STBEZDFCLFNBQVksRTFEY08sZUFBTyxHQUM3QjtFQW5CTCxRQUFRLENBcUJKLGNBQWMsRUFyQmxCLFFBQVEsQ0FxQlksYUFBYSxDQUFDO0kwRHJDMUIsMkJBQW9CLEUxRHNDUyxNQUFNO0kwRGxCbkMsbUJBQVksRTFEa0JpQixNQUFNO0kwRHRDbkMsdUJBQW9CLEUxRHVDSyxXQUFXO0kwRGxDcEMsb0JBQWlCLEUxRGtDUSxXQUFXO0kwRDdCcEMsbUJBQWdCLEUxRDZCUyxXQUFXO0kwRHhCcEMsa0JBQWUsRTFEd0JVLFdBQVc7STBEbkJwQyxlQUFZLEUxRG1CYSxXQUFXO0kwRHZDcEMsa0JBQW9CLEUxRHdDQSxHQUFHLENxRTFDUixLQUFLLENyRTBDMEIsTUFBTTtJMERuQ3BELGVBQWlCLEUxRG1DRyxHQUFHLENxRTFDUixLQUFLLENyRTBDMEIsTUFBTTtJMERwQnBELFVBQVksRTFEb0JRLEdBQUcsQ3FFMUNSLEtBQUssQ3JFMEMwQixNQUFNO0lBQ3BELEtBQUssRUFBRSxJQUFLO0lBQ1osTUFBTSxFQUFFLElBQUs7SUFDYixRQUFRLEVBQUUsUUFBUztJQUNuQixHQUFHLEVBQUUsQ0FBRTtJQUNQLElBQUksRUFBRSxDQUFFO0lBQ1IsUUFBUSxFQUFFLE1BQU87SUFDakIsYUFBYSxFcUV0REEsSUFBSTtJckV1RGpCLFVBQVUsRUFBRSxJQUFLLEdBdURwQjtJQXZGTCxRQUFRLENBcUJKLGNBQWMsQUFhVCxPQUFPLEVBbENoQixRQUFRLENBcUJZLGFBQWEsQUFheEIsT0FBTyxDQUFDO01pRTVDYixPQUFPLEVBQUUsR0FBSTtNQUNiLE9BQU8sRUFBRSxLQUFNO01qRTZDUCxRQUFRLEVBQUUsUUFBUztNQUNuQixLQUFLLEVBQUUsSUFBSztNQUNaLE1BQU0sRUFBRSxJQUFLO01BQ2IsR0FBRyxFQUFFLENBQUU7TUFDUCxJQUFJLEVBQUUsQ0FBRTtNQUNSLE9BQU8sRUFBRSxDQUFFO01BQ1gsYUFBYSxFQUFFLElBQUs7TTBEMUR4QixrQkFBb0IsRTFEMkRJLEdBQUcsQ3FFN0RaLEtBQUssQ3JFNkQ4QixJQUFJO00wRHREdEQsZUFBaUIsRTFEc0RPLEdBQUcsQ3FFN0RaLEtBQUssQ3JFNkQ4QixJQUFJO00wRHZDdEQsVUFBWSxFMUR1Q1ksR0FBRyxDcUU3RFosS0FBSyxDckU2RDhCLElBQUksR0FDckQ7SUE1Q1QsUUFBUSxDQXFCSixjQUFjLEFBeUJULE1BQU0sRUE5Q2YsUUFBUSxDQXFCWSxhQUFhLEFBeUJ4QixNQUFNLENBQUM7TWlFeERaLE9BQU8sRUFBRSxHQUFJO01BQ2IsT0FBTyxFQUFFLEtBQU0sR2pFeURWO0lBaERULFFBQVEsQ0FxQkosY0FBYyxDQTZCVixnQkFBZ0IsRUFsRHhCLFFBQVEsQ0FxQlksYUFBYSxDQTZCekIsZ0JBQWdCLENBQUM7TUFDYixLQUFLLEVxRXRFQyxLQUFLO01yRXVFWCxXQUFXLEVBQUUsTUFBTztNQUNwQixPQUFPLEVBQUUsR0FBSTtNMERyRWpCLGtCQUFvQixFMURzRUksT0FBTyxDcUV4RWhCLEtBQUssQ3JFd0VrQyxNQUFNO00wRGpFNUQsZUFBaUIsRTFEaUVPLE9BQU8sQ3FFeEVoQixLQUFLLENyRXdFa0MsTUFBTTtNMERsRDVELFVBQVksRTFEa0RZLE9BQU8sQ3FFeEVoQixLQUFLLENyRXdFa0MsTUFBTSxHQU0zRDtNQTVEVCxRQUFRLENBcUJKLGNBQWMsQ0E2QlYsZ0JBQWdCLEFBS1gsZ0JBQWdCLEVBdkQ3QixRQUFRLENBcUJZLGFBQWEsQ0E2QnpCLGdCQUFnQixBQUtYLGdCQUFnQixDQUFDO1FBQ2QsT0FBTyxFQUFFLENBQUU7UUFDWCxXQUFXLEVBQUUsR0FBSSxHQUVwQjtJQTNEYixRQUFRLENBcUJKLGNBQWMsQ0F5Q1YsWUFBWSxFQTlEcEIsUUFBUSxDQXFCWSxhQUFhLENBeUN6QixZQUFZLENBQUM7TUFDVCxXQUFXLEVxRW5GTSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVM7TXJFb0Z6RSxTQUFTLEVBQUUsSUFBSyxHQUNuQjtJQWpFVCxRQUFRLENBcUJKLGNBQWMsQ0E4Q1YsY0FBYyxFQW5FdEIsUUFBUSxDQXFCWSxhQUFhLENBOEN6QixjQUFjLENBQUM7TUFHWCxLQUFLLEVBQUUsSUFBSztNQUNaLE1BQU0sRUFBRSxJQUFLO01BQ2IsYUFBYSxFQUhKLEdBQUc7TUFJWixVQUFVLEVBTEYsSUFBSTtNQU1aLFFBQVEsRUFBRSxRQUFTLEdBWXRCO01BdEZULFFBQVEsQ0FxQkosY0FBYyxDQThDVixjQUFjLEFBUVQsT0FBTyxFQTNFcEIsUUFBUSxDQXFCWSxhQUFhLENBOEN6QixjQUFjLEFBUVQsT0FBTyxDQUFDO1FpRXJGakIsT0FBTyxFQUFFLEdBQUk7UUFDYixPQUFPLEVBQUUsS0FBTTtRakV1RkgsS0FBSyxFQUFFLEdBQUk7UUFDWCxNQUFNLEVBRkcsR0FBRztRQUdaLHVCQUF1QixFQVhsQixHQUFHO1FBWVIsMEJBQTBCLEVBWnJCLEdBQUc7UUFhUixVQUFVLEVBQUUsT0FBTztRQUNuQixRQUFRLEVBQUUsUUFBUztRQUNuQixHQUFHLEVBQUcsR0FBSSxHQUNiO0VBckZiLFFBQVEsQ0F5RkosY0FBYyxDQUVWLGFBQWEsQ0FBQTtJQUNULFFBQVEsRUFBRSxRQUFTO0lBQ25CLE9BQU8sRUFBRSxDQUFFO0lBQ1gsS0FBSyxFQUFFLEVBQUc7SUFDVixHQUFHLEVBQUUsRUFBRztJMEQvR1osa0JBQW9CLEVXRkwsS0FBSztJWE9wQixlQUFpQixFV1BGLEtBQUs7SVhzQnBCLFVBQVksRVd0QkcsS0FBSyxHckVtSG5CO0VBakdULFFBQVEsQ0F5RkosY0FBYyxDQVVWLGNBQWMsQ0FBQztJQUVYLEtBQUssRUFERyxHQUFHO0lBRVgsUUFBUSxFQUFFLFFBQVM7SUFDbkIsSUFBSSxFQUFHLEdBQUk7SUFDWCxNQUFNLEVBQUUsSUFBSyxHQXNFaEI7SUFwRUcsTUFBTSxNQUFELE1BQU0sTUFBTSxTQUFTLEVBQUUsS0FBSztNQTFHN0MsUUFBUSxDQXlGSixjQUFjLENBVVYsY0FBYyxDQUFDO1FBUVAsS0FBSyxFQUFFLEdBQUk7UUFDWCxJQUFJLEVBQUUsRUFBRyxHQWtFaEI7SUE5S1QsUUFBUSxDQXlGSixjQUFjLENBVVYsY0FBYyxDQVlWLFlBQVksQ0FBQztNQUNULFVBQVUsRUFBRSxNQUFPO01BQ25CLEtBQUssRUFBRSxLQUFNO01BQ2IsUUFBUSxFQUFFLFFBQVM7TUFDbkIsTUFBTSxFQUFFLEdBQUksR0FDZjtJQXBIYixRQUFRLENBeUZKLGNBQWMsQ0FVVixjQUFjLENBbUJWLGVBQWUsQ0FBQztNQUNaLFdBQVcsRXFFM0lFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUztNckU0SXJFLFNBQVMsRUFBRSxJQUFLO01BQ2hCLEtBQUssRUFBRSxJQUFLO01BQ1osYUFBYSxFQUFFLElBQUssR0FDdkI7SUEzSGIsUUFBUSxDQXlGSixjQUFjLENBVVYsY0FBYyxDQTBCVixlQUFlLENBQUM7TUFDWixXQUFXLEVxRWxKRSwwQkFBMEIsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVM7TXJFb0pyRSxjQUFjLEVBQUUsR0FBSTtNQUNwQixRQUFRLEVBQUUsUUFBUztNQUNuQixLQUFLLEVBQUUsS0FBTTtNQUNiLEtBQUssRUFBRSxHQUFJLEdBMkJkO01BOUpiLFFBQVEsQ0F5RkosY0FBYyxDQVVWLGNBQWMsQ0EwQlYsZUFBZSxBQVFWLE9BQU8sRUFySXhCLFFBQVEsQ0F5RkosY0FBYyxDQVVWLGNBQWMsQ0EwQlYsZUFBZSxBQVFBLE1BQU0sQ0FBQztRQUNkLFdBQVcsRXFFM0paLGdCQUFnQjtRckU0SmYsV0FBVyxFQUFFLElBQUs7UUFDbEIsU0FBUyxFQUFFLEdBQUk7UUFDZixXQUFXLEVBQUUsR0FBSTtRQUNqQixPQUFPLEVBQUUsS0FBTTtRQUNmLE9BQU8sRUFBRSxFQUFHLEdBQ2Y7TUE1SWpCLFFBQVEsQ0F5RkosY0FBYyxDQVVWLGNBQWMsQ0EwQlYsZUFBZSxBQWlCVixPQUFPLENBQUM7UUFDTCxPQUFPLEVBQUUsaUJBQUk7UUFDYixhQUFhLEVBakJELEdBQUc7UUFrQmYsU0FBUyxFQUFFLEdBQUk7UUFDZixjQUFjLEVBQUUsU0FBVSxHQUM3QjtNQW5KakIsUUFBUSxDQXlGSixjQUFjLENBVVYsY0FBYyxDQTBCVixlQUFlLEFBd0JWLE1BQU0sQ0FBQztRQUNKLFFBQVEsRUFBRSxRQUFTO1FBQ25CLE9BQU8sRUFBRSxnQkFBSTtRQUNiLFVBQVUsRUFBRSxLQUFNO1FBQ2xCLEtBQUssRUFBRSxJQUFLO1FBQ1osWUFBWSxFQTNCQSxHQUFHO1FBNEJmLFVBQVUsRUFBRSxHQUFJO1FBQ2hCLE1BQU0sRUFBRSxDQUFFLEdBQ2I7SUE3SmpCLFFBQVEsQ0F5RkosY0FBYyxDQVVWLGNBQWMsQ0E2RFYsYUFBYSxDQUFDO01BQ1YsY0FBYyxFQUFFLFNBQVU7TUFDMUIsV0FBVyxFcUV0TEUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTO01yRXVMckUsU0FBUyxFQUFFLElBQUs7TUFDaEIsVUFBVSxFQUFFLElBQUs7TUFDakIsUUFBUSxFQUFFLFFBQVM7TUFDbkIsTUFBTSxFQUFFLENBQUU7TUFDVixLQUFLLEVBQUUsS0FBTTtNQUNiLE9BQU8sRUFBRSxXQUFZO01BQ3JCLGtCQUFrQixFQUFFLENBQUU7TUFDdEIsa0JBQWtCLEVBQUUsVUFBVztNQUMvQixRQUFRLEVBQUUsTUFBTztNQUNqQixhQUFhLEVBQUUsUUFBUyxHQUMzQjtFQTdLYixRQUFRLENBaUxKLGFBQWEsQ0FBQztJMERqTVYsaUJBQW9CLEUxRGtNRCxlQUFPO0kwRDdMMUIsY0FBaUIsRTFENkxFLGVBQU87STBEeEwxQixhQUFnQixFMUR3TEcsZUFBTztJMERuTDFCLFlBQWUsRTFEbUxJLGVBQU87STBEOUsxQixTQUFZLEUxRDhLTyxlQUFPLEdBOEM3QjtJQWhPTCxRQUFRLENBaUxKLGFBQWEsQ0FNVCxZQUFZLENBQUM7TTJDOUtuQixnQkFBZ0IsRTNDK0ttQixJQUFJO00yQzlLdkMsZ0JBQWdCLEVBQUUsbUNBQXVCO01BQ3pDLGdCQUFnQixFQUFFLDJCQUFPO00zQzhLZixLQUFLLEVBQUUsSUFBSztNQUNaLE1BQU0sRUFBRSxHQUFJO01BQ1osUUFBUSxFQUFFLFFBQVM7TUFDbkIsR0FBRyxFQUFFLEdBQUksR0FDWjtJQTdMVCxRQUFRLENBaUxKLGFBQWEsQUFjUixNQUFNLENBQUM7TWlFek1aLE9BQU8sRUFBRSxHQUFJO01BQ2IsT0FBTyxFQUFFLEtBQU07TXRCa0JqQixnQkFBZ0IsRTNDd0xtQixJQUFJO00yQ3ZMdkMsZ0JBQWdCLEVBQUUsbUNBQXVCO01BQ3pDLGdCQUFnQixFQUFFLDJCQUFPO00zQ3VMZixLQUFLLEVBQUUsR0FBSTtNQUNYLE1BQU0sRUFmUyxHQUFHO01BZ0JsQixRQUFRLEVBQUUsUUFBUztNQUNuQixHQUFHLEVBbEJVLEdBQUc7TUFtQmhCLElBQUksRUFqQlMsRUFBRSxHQWtCbEI7SUF2TVQsUUFBUSxDQWlMSixhQUFhLENBd0JULFlBQVksQ0FBQztNQUNULFFBQVEsRUFBRSxRQUFTO01BQ25CLEdBQUcsRUF4QlUsR0FBRztNQXlCaEIsSUFBSSxFQUFFLEdBQUk7TTBENU5kLHdCQUFvQixFV0ZMLEtBQUs7TVhPcEIscUJBQWlCLEVXUEYsS0FBSztNWHNCcEIsZ0JBQVksRVd0QkcsS0FBSyxHckVnT25CO0lBOU1ULFFBQVEsQ0FpTEosYUFBYSxDQStCVCxjQUFjLENBQUM7TUFDWCxRQUFRLEVBQUUsUUFBUztNQUNuQixHQUFHLEVBL0JVLEdBQUc7TUFnQ2hCLElBQUksRUE5QlMsRUFBRSxHQTBDbEI7TUEvTlQsUUFBUSxDQWlMSixhQUFhLENBK0JULGNBQWMsQUFLVCxNQUFNLENBQUM7UUFDSixPQUFPLEVBQUUsNkxBQThMO1FBQ3ZNLFFBQVEsRUFBRSxRQUFTO1FBQ25CLElBQUksRUFBRSxJQUFLO1FBQ1gsR0FBRyxFQUFFLEVBQUc7UUFDUixLQUFLLEVBQUUsS0FBTTtRQUNiLFNBQVMsRUFBRSxHQUFJO1FBQ2YsS0FBSyxFQUFFLEtBQU07UUFDYixPQUFPLEVBQUUsRUFBRyxHQUNmO0VBOU5iLFFBQVEsQUFrT0gsbUJBQW1CLENBQUM7SUFDakIsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFJLEdBeUI1QjtJQTVQTCxRQUFRLEFBa09ILG1CQUFtQixDQUdoQixjQUFjLEVBck90QixRQUFRLEFBa09ILG1CQUFtQixDQUdBLGFBQWEsQ0FBQztNQUMxQixnQkFBZ0IsRUFBRSxJQUFLO01BQ3ZCLGdCQUFnQixFQUFFLGtCQUFJLEdBWXpCO01BblBULFFBQVEsQUFrT0gsbUJBQW1CLENBR2hCLGNBQWMsQUFJVCxPQUFPLEVBek9wQixRQUFRLEFBa09ILG1CQUFtQixDQUdBLGFBQWEsQUFJeEIsT0FBTyxDQUFDO1EwRHpQYixrQkFBb0IsRTFEMFBRLEdBQUcsQ3FFNVBoQixLQUFLLENyRTRQa0MsSUFBSTtRMERyUDFELGVBQWlCLEUxRHFQVyxHQUFHLENxRTVQaEIsS0FBSyxDckU0UGtDLElBQUk7UTBEdE8xRCxVQUFZLEUxRHNPZ0IsR0FBRyxDcUU1UGhCLEtBQUssQ3JFNFBrQyxJQUFJO1E0QjdQaEUsZ0JBQWdCLEVxQ3FCTix5SkFBeUIsRUFJekIsMEpBQXlCLEVBSXpCLHlKQUF5QixFQUl6QiwwSkFBeUIsRUFJekIscUtBQXlCLEVBSXpCLHFLQUF5QixFQUl6QixxS0FBeUIsRUFJekIscUtBQXlCLEV4RHJDMkIsc0hBQVE7UW1CWHRFLGdCQUFnQixFcUNvQk4seUpBQXlCLEVBSXpCLDBKQUF5QixFQUl6Qix5SkFBeUIsRUFJekIsMEpBQXlCLEVBSXpCLHFLQUF5QixFQUl6QixxS0FBeUIsRUFJekIscUtBQXlCLEVBSXpCLHFLQUF5QixFeERqQ2QsNkdBQU87UVQrT2QsT0FBTyxFQUFFLENBQUUsR0FFZDtNQTlPYixRQUFRLEFBa09ILG1CQUFtQixDQUdoQixjQUFjLENBV1YsYUFBYSxFQWhQekIsUUFBUSxBQWtPSCxtQkFBbUIsQ0FHQSxhQUFhLENBV3pCLGFBQWEsQ0FBQztRQUNWLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsd0JBQUksR0FDN0I7SUFsUGIsUUFBUSxBQWtPSCxtQkFBbUIsQUFtQmYsbUJBQW1CLENBQ2hCLGNBQWMsQUFDVCxPQUFPLEVBdlB4QixRQUFRLEFBa09ILG1CQUFtQixBQW1CZixtQkFBbUIsQ0FDQSxhQUFhLEFBQ3hCLE9BQU8sQ0FBQztNNEIxUXZCLGdCQUFnQixFcUN5RE4seUpBQXlCLEVBSXpCLDBKQUF5QixFQUl6Qix5SkFBeUIsRUFJekIsMEpBQXlCLEV4RHpEMkIsc0hBQVE7TW1CWHRFLGdCQUFnQixFcUN3RE4seUpBQXlCLEVBSXpCLDBKQUF5QixFQUl6Qix5SkFBeUIsRUFJekIsMEpBQXlCLEV4RHJEZCw2R0FBTyxHVDRQYiIsCgkibmFtZXMiOiBbXQp9 */');;
},{"sassify":5}],9:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.payment || (g.payment = {})).js = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var QJ, rreturn, rtrim;

QJ = function(selector) {
  if (QJ.isDOMElement(selector)) {
    return selector;
  }
  return document.querySelectorAll(selector);
};

QJ.isDOMElement = function(el) {
  return el && (el.nodeName != null);
};

rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

QJ.trim = function(text) {
  if (text === null) {
    return "";
  } else {
    return (text + "").replace(rtrim, "");
  }
};

rreturn = /\r/g;

QJ.val = function(el, val) {
  var ret;
  if (arguments.length > 1) {
    return el.value = val;
  } else {
    ret = el.value;
    if (typeof ret === "string") {
      return ret.replace(rreturn, "");
    } else {
      if (ret === null) {
        return "";
      } else {
        return ret;
      }
    }
  }
};

QJ.preventDefault = function(eventObject) {
  if (typeof eventObject.preventDefault === "function") {
    eventObject.preventDefault();
    return;
  }
  eventObject.returnValue = false;
  return false;
};

QJ.normalizeEvent = function(e) {
  var original;
  original = e;
  e = {
    which: original.which != null ? original.which : void 0,
    target: original.target || original.srcElement,
    preventDefault: function() {
      return QJ.preventDefault(original);
    },
    originalEvent: original,
    data: original.data || original.detail
  };
  if (e.which == null) {
    e.which = original.charCode != null ? original.charCode : original.keyCode;
  }
  return e;
};

QJ.on = function(element, eventName, callback) {
  var el, i, j, len, len1, multEventName, originalCallback, ref;
  if (element.length) {
    for (i = 0, len = element.length; i < len; i++) {
      el = element[i];
      QJ.on(el, eventName, callback);
    }
    return;
  }
  if (eventName.match(" ")) {
    ref = eventName.split(" ");
    for (j = 0, len1 = ref.length; j < len1; j++) {
      multEventName = ref[j];
      QJ.on(element, multEventName, callback);
    }
    return;
  }
  originalCallback = callback;
  callback = function(e) {
    e = QJ.normalizeEvent(e);
    return originalCallback(e);
  };
  if (element.addEventListener) {
    return element.addEventListener(eventName, callback, false);
  }
  if (element.attachEvent) {
    eventName = "on" + eventName;
    return element.attachEvent(eventName, callback);
  }
  element['on' + eventName] = callback;
};

QJ.addClass = function(el, className) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.addClass(e, className));
      }
      return results;
    })();
  }
  if (el.classList) {
    return el.classList.add(className);
  } else {
    return el.className += ' ' + className;
  }
};

QJ.hasClass = function(el, className) {
  var e, hasClass, i, len;
  if (el.length) {
    hasClass = true;
    for (i = 0, len = el.length; i < len; i++) {
      e = el[i];
      hasClass = hasClass && QJ.hasClass(e, className);
    }
    return hasClass;
  }
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
};

QJ.removeClass = function(el, className) {
  var cls, e, i, len, ref, results;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.removeClass(e, className));
      }
      return results;
    })();
  }
  if (el.classList) {
    ref = className.split(' ');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      cls = ref[i];
      results.push(el.classList.remove(cls));
    }
    return results;
  } else {
    return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

QJ.toggleClass = function(el, className, bool) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.toggleClass(e, className, bool));
      }
      return results;
    })();
  }
  if (bool) {
    if (!QJ.hasClass(el, className)) {
      return QJ.addClass(el, className);
    }
  } else {
    return QJ.removeClass(el, className);
  }
};

QJ.append = function(el, toAppend) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.append(e, toAppend));
      }
      return results;
    })();
  }
  return el.insertAdjacentHTML('beforeend', toAppend);
};

QJ.find = function(el, selector) {
  if (el instanceof NodeList || el instanceof Array) {
    el = el[0];
  }
  return el.querySelectorAll(selector);
};

QJ.trigger = function(el, name, data) {
  var e, error, ev;
  try {
    ev = new CustomEvent(name, {
      detail: data
    });
  } catch (error) {
    e = error;
    ev = document.createEvent('CustomEvent');
    if (ev.initCustomEvent) {
      ev.initCustomEvent(name, true, true, data);
    } else {
      ev.initEvent(name, true, true, data);
    }
  }
  return el.dispatchEvent(ev);
};

module.exports = QJ;


},{}],2:[function(require,module,exports){
(function (global){
var Payment, QJ, cardFromNumber, cardFromType, cards, defaultFormat, formatBackCardNumber, formatBackExpiry, formatCardNumber, formatExpiry, formatForwardExpiry, formatForwardSlash, formatMonthExpiry, hasTextSelected, luhnCheck, reFormatCardNumber, restrictCVC, restrictCardNumber, restrictCombinedExpiry, restrictExpiry, restrictMonthExpiry, restrictNumeric, restrictYearExpiry, setCardType,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

QJ = require('qj/src/qj.coffee');

defaultFormat = /(\d{1,4})/g;

cards = [
  {
    type: 'amex',
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [4],
    luhn: true
  }, {
    type: 'dankort',
    pattern: /^5019/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'dinersclub',
    pattern: /^(36|38|30[0-5])/,
    format: defaultFormat,
    length: [14],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'discover',
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'jcb',
    pattern: /^35/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'laser',
    pattern: /^(6706|6771|6709)/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'maestro',
    pattern: /^(5018|5020|5038|6304|6703|6759|676[1-3])/,
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'mastercard',
    pattern: /^5[1-5]/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'unionpay',
    pattern: /^62/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false
  }, {
    type: 'visaelectron',
    pattern: /^4(026|17500|405|508|844|91[37])/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'visa',
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'elo',
    pattern: /^4011|438935|45(1416|76)|50(4175|6699|67|90[4-7])|63(6297|6368)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }
];

cardFromNumber = function(num) {
  var card, i, len;
  num = (num + '').replace(/\D/g, '');
  for (i = 0, len = cards.length; i < len; i++) {
    card = cards[i];
    if (card.pattern.test(num)) {
      return card;
    }
  }
};

cardFromType = function(type) {
  var card, i, len;
  for (i = 0, len = cards.length; i < len; i++) {
    card = cards[i];
    if (card.type === type) {
      return card;
    }
  }
};

luhnCheck = function(num) {
  var digit, digits, i, len, odd, sum;
  odd = true;
  sum = 0;
  digits = (num + '').split('').reverse();
  for (i = 0, len = digits.length; i < len; i++) {
    digit = digits[i];
    digit = parseInt(digit, 10);
    if ((odd = !odd)) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

hasTextSelected = function(target) {
  var ref;
  if ((target.selectionStart != null) && target.selectionStart !== target.selectionEnd) {
    return true;
  }
  if ((typeof document !== "undefined" && document !== null ? (ref = document.selection) != null ? ref.createRange : void 0 : void 0) != null) {
    if (document.selection.createRange().text) {
      return true;
    }
  }
  return false;
};

reFormatCardNumber = function(e) {
  return setTimeout((function(_this) {
    return function() {
      var target, value;
      target = e.target;
      value = QJ.val(target);
      value = Payment.fns.formatCardNumber(value);
      return QJ.val(target, value);
    };
  })(this));
};

formatCardNumber = function(e) {
  var card, digit, length, re, target, upperLength, value;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  value = QJ.val(target);
  card = cardFromNumber(value + digit);
  length = (value.replace(/\D/g, '') + digit).length;
  upperLength = 16;
  if (card) {
    upperLength = card.length[card.length.length - 1];
  }
  if (length >= upperLength) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }
  if (card && card.type === 'amex') {
    re = /^(\d{4}|\d{4}\s\d{6})$/;
  } else {
    re = /(?:^|\s)(\d{4})$/;
  }
  if (re.test(value)) {
    e.preventDefault();
    return QJ.val(target, value + ' ' + digit);
  } else if (re.test(value + digit)) {
    e.preventDefault();
    return QJ.val(target, value + digit + ' ');
  }
};

formatBackCardNumber = function(e) {
  var target, value;
  target = e.target;
  value = QJ.val(target);
  if (e.meta) {
    return;
  }
  if (e.which !== 8) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }
  if (/\d\s$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\d\s$/, ''));
  } else if (/\s\d?$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\s\d?$/, ''));
  }
};

formatExpiry = function(e) {
  var digit, target, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  val = QJ.val(target) + digit;
  if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
    e.preventDefault();
    return QJ.val(target, "0" + val + " / ");
  } else if (/^\d\d$/.test(val)) {
    e.preventDefault();
    return QJ.val(target, val + " / ");
  }
};

formatMonthExpiry = function(e) {
  var digit, target, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  val = QJ.val(target) + digit;
  if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
    e.preventDefault();
    return QJ.val(target, "0" + val);
  } else if (/^\d\d$/.test(val)) {
    e.preventDefault();
    return QJ.val(target, "" + val);
  }
};

formatForwardExpiry = function(e) {
  var digit, target, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  val = QJ.val(target);
  if (/^\d\d$/.test(val)) {
    return QJ.val(target, val + " / ");
  }
};

formatForwardSlash = function(e) {
  var slash, target, val;
  slash = String.fromCharCode(e.which);
  if (slash !== '/') {
    return;
  }
  target = e.target;
  val = QJ.val(target);
  if (/^\d$/.test(val) && val !== '0') {
    return QJ.val(target, "0" + val + " / ");
  }
};

formatBackExpiry = function(e) {
  var target, value;
  if (e.metaKey) {
    return;
  }
  target = e.target;
  value = QJ.val(target);
  if (e.which !== 8) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }
  if (/\d(\s|\/)+$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\d(\s|\/)*$/, ''));
  } else if (/\s\/\s?\d?$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\s\/\s?\d?$/, ''));
  }
};

restrictNumeric = function(e) {
  var input;
  if (e.metaKey || e.ctrlKey) {
    return true;
  }
  if (e.which === 32) {
    return e.preventDefault();
  }
  if (e.which === 0) {
    return true;
  }
  if (e.which < 33) {
    return true;
  }
  input = String.fromCharCode(e.which);
  if (!/[\d\s]/.test(input)) {
    return e.preventDefault();
  }
};

restrictCardNumber = function(e) {
  var card, digit, target, value;
  target = e.target;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  value = (QJ.val(target) + digit).replace(/\D/g, '');
  card = cardFromNumber(value);
  if (card) {
    if (!(value.length <= card.length[card.length.length - 1])) {
      return e.preventDefault();
    }
  } else {
    if (!(value.length <= 16)) {
      return e.preventDefault();
    }
  }
};

restrictExpiry = function(e, length) {
  var digit, target, value;
  target = e.target;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  value = QJ.val(target) + digit;
  value = value.replace(/\D/g, '');
  if (value.length > length) {
    return e.preventDefault();
  }
};

restrictCombinedExpiry = function(e) {
  return restrictExpiry(e, 6);
};

restrictMonthExpiry = function(e) {
  return restrictExpiry(e, 2);
};

restrictYearExpiry = function(e) {
  return restrictExpiry(e, 4);
};

restrictCVC = function(e) {
  var digit, target, val;
  target = e.target;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  val = QJ.val(target) + digit;
  if (!(val.length <= 4)) {
    return e.preventDefault();
  }
};

setCardType = function(e) {
  var allTypes, card, cardType, target, val;
  target = e.target;
  val = QJ.val(target);
  cardType = Payment.fns.cardType(val) || 'unknown';
  if (!QJ.hasClass(target, cardType)) {
    allTypes = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = cards.length; i < len; i++) {
        card = cards[i];
        results.push(card.type);
      }
      return results;
    })();
    QJ.removeClass(target, 'unknown');
    QJ.removeClass(target, allTypes.join(' '));
    QJ.addClass(target, cardType);
    QJ.toggleClass(target, 'identified', cardType !== 'unknown');
    return QJ.trigger(target, 'payment.cardType', cardType);
  }
};

Payment = (function() {
  function Payment() {}

  Payment.fns = {
    cardExpiryVal: function(value) {
      var month, prefix, ref, year;
      value = value.replace(/\s/g, '');
      ref = value.split('/', 2), month = ref[0], year = ref[1];
      if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      month = parseInt(month, 10);
      year = parseInt(year, 10);
      return {
        month: month,
        year: year
      };
    },
    validateCardNumber: function(num) {
      var card, ref;
      num = (num + '').replace(/\s+|-/g, '');
      if (!/^\d+$/.test(num)) {
        return false;
      }
      card = cardFromNumber(num);
      if (!card) {
        return false;
      }
      return (ref = num.length, indexOf.call(card.length, ref) >= 0) && (card.luhn === false || luhnCheck(num));
    },
    validateCardExpiry: function(month, year) {
      var currentTime, expiry, prefix, ref;
      if (typeof month === 'object' && 'month' in month) {
        ref = month, month = ref.month, year = ref.year;
      }
      if (!(month && year)) {
        return false;
      }
      month = QJ.trim(month);
      year = QJ.trim(year);
      if (!/^\d+$/.test(month)) {
        return false;
      }
      if (!/^\d+$/.test(year)) {
        return false;
      }
      if (!(parseInt(month, 10) <= 12)) {
        return false;
      }
      if (year.length === 2) {
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      expiry = new Date(year, month);
      currentTime = new Date;
      expiry.setMonth(expiry.getMonth() - 1);
      expiry.setMonth(expiry.getMonth() + 1, 1);
      return expiry > currentTime;
    },
    validateCardCVC: function(cvc, type) {
      var ref, ref1;
      cvc = QJ.trim(cvc);
      if (!/^\d+$/.test(cvc)) {
        return false;
      }
      if (type && cardFromType(type)) {
        return ref = cvc.length, indexOf.call((ref1 = cardFromType(type)) != null ? ref1.cvcLength : void 0, ref) >= 0;
      } else {
        return cvc.length >= 3 && cvc.length <= 4;
      }
    },
    cardType: function(num) {
      var ref;
      if (!num) {
        return null;
      }
      return ((ref = cardFromNumber(num)) != null ? ref.type : void 0) || null;
    },
    formatCardNumber: function(num) {
      var card, groups, ref, upperLength;
      card = cardFromNumber(num);
      if (!card) {
        return num;
      }
      upperLength = card.length[card.length.length - 1];
      num = num.replace(/\D/g, '');
      num = num.slice(0, +upperLength + 1 || 9e9);
      if (card.format.global) {
        return (ref = num.match(card.format)) != null ? ref.join(' ') : void 0;
      } else {
        groups = card.format.exec(num);
        if (groups != null) {
          groups.shift();
        }
        return groups != null ? groups.join(' ') : void 0;
      }
    }
  };

  Payment.restrictNumeric = function(el) {
    return QJ.on(el, 'keypress', restrictNumeric);
  };

  Payment.cardExpiryVal = function(el) {
    return Payment.fns.cardExpiryVal(QJ.val(el));
  };

  Payment.formatCardCVC = function(el) {
    Payment.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictCVC);
    return el;
  };

  Payment.formatCardExpiry = function(el) {
    var month, year;
    Payment.restrictNumeric(el);
    if (el.length && el.length === 2) {
      month = el[0], year = el[1];
      this.formatCardExpiryMultiple(month, year);
    } else {
      QJ.on(el, 'keypress', restrictCombinedExpiry);
      QJ.on(el, 'keypress', formatExpiry);
      QJ.on(el, 'keypress', formatForwardSlash);
      QJ.on(el, 'keypress', formatForwardExpiry);
      QJ.on(el, 'keydown', formatBackExpiry);
    }
    return el;
  };

  Payment.formatCardExpiryMultiple = function(month, year) {
    QJ.on(month, 'keypress', restrictMonthExpiry);
    QJ.on(month, 'keypress', formatMonthExpiry);
    return QJ.on(year, 'keypress', restrictYearExpiry);
  };

  Payment.formatCardNumber = function(el) {
    Payment.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictCardNumber);
    QJ.on(el, 'keypress', formatCardNumber);
    QJ.on(el, 'keydown', formatBackCardNumber);
    QJ.on(el, 'keyup', setCardType);
    QJ.on(el, 'paste', reFormatCardNumber);
    return el;
  };

  Payment.getCardArray = function() {
    return cards;
  };

  Payment.setCardArray = function(cardArray) {
    cards = cardArray;
    return true;
  };

  Payment.addToCardArray = function(cardObject) {
    return cards.push(cardObject);
  };

  Payment.removeFromCardArray = function(type) {
    var key, value;
    for (key in cards) {
      value = cards[key];
      if (value.type === type) {
        cards.splice(key, 1);
      }
    }
    return true;
  };

  return Payment;

})();

module.exports = Payment;

global.Payment = Payment;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"qj/src/qj.coffee":1}]},{},[2])(2)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"qj/src/qj.coffee":10}],10:[function(require,module,exports){
var QJ, rreturn, rtrim;

QJ = function(selector) {
  if (QJ.isDOMElement(selector)) {
    return selector;
  }
  return document.querySelectorAll(selector);
};

QJ.isDOMElement = function(el) {
  return el && (el.nodeName != null);
};

rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

QJ.trim = function(text) {
  if (text === null) {
    return "";
  } else {
    return (text + "").replace(rtrim, "");
  }
};

rreturn = /\r/g;

QJ.val = function(el, val) {
  var ret;
  if (arguments.length > 1) {
    return el.value = val;
  } else {
    ret = el.value;
    if (typeof ret === "string") {
      return ret.replace(rreturn, "");
    } else {
      if (ret === null) {
        return "";
      } else {
        return ret;
      }
    }
  }
};

QJ.preventDefault = function(eventObject) {
  if (typeof eventObject.preventDefault === "function") {
    eventObject.preventDefault();
    return;
  }
  eventObject.returnValue = false;
  return false;
};

QJ.normalizeEvent = function(e) {
  var original;
  original = e;
  e = {
    which: original.which != null ? original.which : void 0,
    target: original.target || original.srcElement,
    preventDefault: function() {
      return QJ.preventDefault(original);
    },
    originalEvent: original,
    data: original.data || original.detail
  };
  if (e.which == null) {
    e.which = original.charCode != null ? original.charCode : original.keyCode;
  }
  return e;
};

QJ.on = function(element, eventName, callback) {
  var el, i, j, len, len1, multEventName, originalCallback, ref;
  if (element.length) {
    for (i = 0, len = element.length; i < len; i++) {
      el = element[i];
      QJ.on(el, eventName, callback);
    }
    return;
  }
  if (eventName.match(" ")) {
    ref = eventName.split(" ");
    for (j = 0, len1 = ref.length; j < len1; j++) {
      multEventName = ref[j];
      QJ.on(element, multEventName, callback);
    }
    return;
  }
  originalCallback = callback;
  callback = function(e) {
    e = QJ.normalizeEvent(e);
    return originalCallback(e);
  };
  if (element.addEventListener) {
    return element.addEventListener(eventName, callback, false);
  }
  if (element.attachEvent) {
    eventName = "on" + eventName;
    return element.attachEvent(eventName, callback);
  }
  element['on' + eventName] = callback;
};

QJ.addClass = function(el, className) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.addClass(e, className));
      }
      return results;
    })();
  }
  if (el.classList) {
    return el.classList.add(className);
  } else {
    return el.className += ' ' + className;
  }
};

QJ.hasClass = function(el, className) {
  var e, hasClass, i, len;
  if (el.length) {
    hasClass = true;
    for (i = 0, len = el.length; i < len; i++) {
      e = el[i];
      hasClass = hasClass && QJ.hasClass(e, className);
    }
    return hasClass;
  }
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
};

QJ.removeClass = function(el, className) {
  var cls, e, i, len, ref, results;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.removeClass(e, className));
      }
      return results;
    })();
  }
  if (el.classList) {
    ref = className.split(' ');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      cls = ref[i];
      results.push(el.classList.remove(cls));
    }
    return results;
  } else {
    return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

QJ.toggleClass = function(el, className, bool) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.toggleClass(e, className, bool));
      }
      return results;
    })();
  }
  if (bool) {
    if (!QJ.hasClass(el, className)) {
      return QJ.addClass(el, className);
    }
  } else {
    return QJ.removeClass(el, className);
  }
};

QJ.append = function(el, toAppend) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.append(e, toAppend));
      }
      return results;
    })();
  }
  return el.insertAdjacentHTML('beforeend', toAppend);
};

QJ.find = function(el, selector) {
  if (el instanceof NodeList || el instanceof Array) {
    el = el[0];
  }
  return el.querySelectorAll(selector);
};

QJ.trigger = function(el, name, data) {
  var e, error, ev;
  try {
    ev = new CustomEvent(name, {
      detail: data
    });
  } catch (error) {
    e = error;
    ev = document.createEvent('CustomEvent');
    if (ev.initCustomEvent) {
      ev.initCustomEvent(name, true, true, data);
    } else {
      ev.initEvent(name, true, true, data);
    }
  }
  return el.dispatchEvent(ev);
};

module.exports = QJ;


},{}]},{},[7]);
// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(function() {
  var card = new Card({
    form: 'form',
    container: '.card',
    debug: true
  });
});
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




