webidl.js
=========

A JavaScript implementation of the ECMAScript to WebIDL value conversion algorithms for DOM API prototyping

Simple Usage Instructions
=========================

Include webidl.js in your page and invoke the the appropriate method to covert the given value into the
specified type.

e.g. the following is a function prototype for a hypothetical Point object.

    function Point(x, y) {
    	this.x = WebIDL.toLong(x, {EnforceRange: true});
    	this.y = WebIDL.toLong(y, {EnforceRange: true});
    }

In this case, the values x and y will be cast to numbers, and their values converted to signed 32 bit
integers, if possible.  Because the optional EnforceRange flag has been set, a TypeError exception will be
thrown, in accordance with WebIDL, if the supplied values are out of range or cannot be converted to a Number.
