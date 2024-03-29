<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.15.2
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-class');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-class/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-class/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [Class](#markdown-header-class)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| CONSOLE_COLORS (Object) |LOCAL_IP (String) |TEMPLATE_TAG_CONFIG (Object) |
DEBUG_MODE (Boolean) |MODULES_LOADED (Object) |TEMPLATE_VARS (Array) |
ERROR_TYPES (Array) |PUBLIC_IP (String) |VERSION (String) |
HTTP_STATUS_TEMPLATE (Object) |RESPONSES (Object) |


## Methods

<a name='markdown-header-class'></a>
## Class

*** 
#### _Benchmarker_ 
***

**Info:** Class used to measure the run time of code

**Return:** (IBenchmarker)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _Cursor_ 
***

**Info:** Cursor class to facilitate iteration

**Return:** (ICursor<T>)

**Parameters:**

>* records: (Array<T>) Array used to create the iterator to iterate each item

**Overloads:**

>Parameters
>* records: (Object) Object used to create the iterator to iterate each property

*** 
#### _OrderedList_ 
***

**Info:** Collection class that filters out duplicate values and maintains an ordered list

**Return:** (IOrderedList<T>)

**Parameters:**

>None

**Overloads:**

>Parameters
>* records?: (Array<T>) Array used to create the initial items in the ordered list
>* sorter?: (SortIterator<T>) Function for sorting logic

*** 
#### _Queue_ 
***

**Info:** Collection class that follows FIFO

**Return:** (IQueue<T>)

**Parameters:**

>* records: (Array<T>) Array used to create the iterator to iterate each item

**Overloads:**

>None

*** 
#### _ServerManager_ 
***

**Info:** Class used to create a new context for HTTP server

**Return:** (void)

**Parameters:**

>* request: (HTTPRequest) HTTP request object provided by createServer
>* response: (HTTPResponse) HTTP response object provided by createServer

**Overloads:**

>None

*** 
#### _Set_ 
***

**Info:** Collection class that filters out duplicate values

**Return:** (ISet<T, TResult>)

**Parameters:**

>* records: (Array<T>) Array used to create the iterator to iterate each item

**Overloads:**

>None




## Download

 * [GitHub](https://github.com/craydent/node-library/modules/class)
 * [BitBucket](https://bitbucket.org/craydent/node-library/modules/class)
 * [GitLab](https://gitlab.com/craydent/node-library/modules/class)
Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>