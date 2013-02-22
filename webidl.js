/* https://github.com/lachlanhunt/webidl.js */

;(function(global) {
    "use strict";
    var floor = Math.floor,
        abs = Math.abs,
        round = Math.round,
        pow = Math.pow,
        min = Math.min,
        max = Math.max;

    function sign(n) {
        n = +n;
        return (n === 0 ? 1/n : n) < 0 ? -1 : 1;
    }

    function roundToNearest(value) {
        value = ((floor(value) % 2 === 0) && (abs(value % 1) === 0.5)) ?
            round(value) - 1 : round(value);

        return value === -0 ? 0 : value;
    }

    /*
     * The ECMAScript remainder operator (%) is not useful because it uses truncated rounding.
     * This mod function uses floored rounding instead, as needed by WebIDL and ECMAScript algorithms.
     */
    Object.defineProperty(Number.prototype, "mod", {
        value: function mod(n) {
            var a = +this;
            return a - n * floor(a/n);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });

    var WebIDL = {
        toAny: function toAny(value) {
            if (value === undefined || value === null) {
                // For undefined, IDL says to use a special object that represents the undefined value.
                // Can't do that effectively in JS, just keep it as is.
                return value;
            } else if (typeof value === "number") {
                return WebIDL.toBoolean(value);
            } else if (typeof value === "number") {
                return WebIDL.toUnrestrictedDouble(value);
            } else if (typeof value === "string") {
                return WebIDL.toDOMString(value);
            } else {
                return WebIDL.toObject(value);
            }
        },

        toBoolean: function toBoolean(value) {
            return Boolean(value);
        },

        toByte: function toByte(value, extAttrs) {
            /*
             * Set values to true if the extended attribute appears, false otherwise
             * The recognised attributes are:
             * extAttrs = {
             *     EnforceRange: false,
             *     Clamp: false
             * }
             */
            var x = Number(value);
            if (extAttrs && extAttrs.EnforceRange) {
                if (isNaN(x) || x === Infinity || x === -Infinity) throw new TypeError("Cannot EnforceRange on value");
                x = sign(x) * floor(abs(x));
                if (x < pow(-2, 7) || x > pow(2, 7) - 1) throw new TypeError("Value is out of range");
                return x;
            } else if (!isNaN(x) && extAttrs && extAttrs.Clamp) {
                x = min(max(x, pow(-2, 7)), pow(2, 7) - 1);
                return roundToNearest(x);
            } else if (isNaN(x) || x === 0 || x === Infinity || x === -Infinity) {
                return 0;
            } else {
                x = sign(x) * floor(abs(x));
                x = x.mod(pow(2, 8));
                return (x >= pow(2, 7)) ? x - pow(2, 8) : x;
            }
        },

        toOctet: function toOctet(value, extAttrs) {
            /*
             * Set values to true if the extended attribute appears, false otherwise
             * The recognised attributes are:
             * extAttrs = {
             *     EnforceRange: false,
             *     Clamp: false
             * }
             */
            var x = Number(value);
            if (extAttrs && extAttrs.EnforceRange) {
                if (isNaN(x) || x === Infinity || x === -Infinity) throw new TypeError("Cannot EnforceRange on value");
                x = sign(x) * floor(abs(x));
                if (x < 0 || x > pow(2, 8) - 1) throw new TypeError("Value is out of range");
                return x;
            } else if (!isNaN(x) && extAttrs && extAttrs.Clamp) {
                x = min(max(x, 0), pow(2, 8) - 1);
                return roundToNearest(x);
            } else if (isNaN(x) || x === 0 || x === Infinity || x === -Infinity) {
                return 0;
            } else {
                x = sign(x) * floor(abs(x));
                x = x.mod(pow(2, 8));
                return x;
            }
        },

        toShort: function toShort(value, extAttrs) {
            /*
             * Set values to true if the extended attribute appears, false otherwise
             * The recognised attributes are:
             * extAttrs = {
             *     EnforceRange: false,
             *     Clamp: false
             * }
             */
            var x = Number(value);
            if (extAttrs && extAttrs.EnforceRange) {
                if (isNaN(x) || x === Infinity || x === -Infinity) throw new TypeError("Cannot EnforceRange on value");
                x = sign(x) * floor(abs(x));
                if (x < pow(-2, 15) || x > pow(2, 15) - 1) throw new TypeError("Value is out of range");
                return x;
            } else if (!isNaN(x) && extAttrs && extAttrs.Clamp) {
                x = min(max(x, pow(-2, 15)), pow(2, 15) - 1);
                return roundToNearest(x);
            } else if (isNaN(x) || x === 0 || x === Infinity || x === -Infinity) {
                return 0;
            } else {
                x = sign(x) * floor(abs(x));
                x = x.mod(pow(2, 16));
                return (x >= pow(2, 15)) ? x - pow(2, 16) : x;
            }
        },

        toUnsignedShort: function toUnsignedShort(value, extAttrs) {
            /*
             * Set values to true if the extended attribute appears, false otherwise
             * The recognised attributes are:
             * extAttrs = {
             *     EnforceRange: false,
             *     Clamp: false
             * }
             */
            var x = Number(value);
            if (extAttrs && extAttrs.EnforceRange) {
                if (isNaN(x) || x === Infinity || x === -Infinity) throw new TypeError("Cannot EnforceRange on value");
                x = sign(x) * floor(abs(x));
                if (x < 0 || x > pow(2, 16) - 1) throw new TypeError("Value is out of range");
                return x;
            } else if (!isNaN(x) && extAttrs && extAttrs.Clamp) {
                x = min(max(x, 0), pow(2, 16) - 1);
                return roundToNearest(x);
            } else if (isNaN(x) || x === 0 || x === Infinity || x === -Infinity) {
                return 0;
            } else {
                x = sign(x) * floor(abs(x));
                x = x.mod(pow(2, 16));
                return x;
            }
        },

        toLong: function toLong(value, extAttrs) {
            /*
             * Set values to true if the extended attribute appears, false otherwise
             * The recognised attributes are:
             * extAttrs = {
             *     EnforceRange: false,
             *     Clamp: false
             * }
             */
            var x = Number(value);
            if (extAttrs && extAttrs.EnforceRange) {
                if (isNaN(x) || x === Infinity || x === -Infinity) throw new TypeError("Cannot EnforceRange on value");
                x = sign(x) * floor(abs(x));
                if (x < pow(-2, 31) || x > pow(2, 31) - 1) throw new TypeError("Value is out of range");
                return x;
            } else if (!isNaN(x) && extAttrs && extAttrs.Clamp) {
                x = min(max(x, pow(-2, 31)), pow(2, 31) - 1);
                return roundToNearest(x);
            } else if (isNaN(x) || x === 0 || x === Infinity || x === -Infinity) {
                return 0;
            } else {
                x = sign(x) * floor(abs(x));
                x = x.mod(pow(2, 32));
                return (x >= pow(2, 31)) ? x - pow(2, 32) : x;
            }
        },

        toUnsignedLong: function toUnsignedLong(value, extAttrs) {
            /*
             * Set values to true if the extended attribute appears, false otherwise
             * The recognised attributes are:
             * extAttrs = {
             *     EnforceRange: false,
             *     Clamp: false
             * }
             */
            var x = Number(value);
            if (extAttrs && extAttrs.EnforceRange) {
                if (isNaN(x) || x === Infinity || x === -Infinity) throw new TypeError("Cannot EnforceRange on value");
                x = sign(x) * floor(abs(x));
                if (x < 0 || x > pow(2, 32) - 1) throw new TypeError("Value is out of range");
                return x;
            } else if (!isNaN(x) && extAttrs && extAttrs.Clamp) {
                x = min(max(x, 0), pow(2, 32) - 1);
                return roundToNearest(x);
            } else if (isNaN(x) || x === 0 || x === Infinity || x === -Infinity) {
                return 0;
            } else {
                x = sign(x) * floor(abs(x));
                x = x.mod(pow(2, 32));
                return x;
            }
        },

        toLongLong: function toLongLong(value, extAttrs) {
            /*
             * Note: Integers above 2^53-1 or below -2^53+1 are approximated due to IEEE 754 limitations
             *
             * Set values to true if the extended attribute appears, false otherwise
             * The recognised attributes are:
             * extAttrs = {
             *     EnforceRange: false,
             *     Clamp: false
             * }
             */
            var x = Number(value);
            if (extAttrs && extAttrs.EnforceRange) {
                if (isNaN(x) || x === Infinity || x === -Infinity) throw new TypeError("Cannot EnforceRange on value");
                x = sign(x) * floor(abs(x));
                if (x < pow(-2, 63) || x > pow(2, 63) - 1) throw new TypeError("Value is out of range");
                return x;
            } else if (!isNaN(x) && extAttrs && extAttrs.Clamp) {
                x = min(max(x, pow(-2, 63)), pow(2, 63) - 1);
                return roundToNearest(x);
            } else if (isNaN(x) || x === 0 || x === Infinity || x === -Infinity) {
                return 0;
            } else {
                x = sign(x) * floor(abs(x));
                x = x.mod(pow(2, 64));
                return (x >= pow(2, 63)) ? x - pow(2, 64) : x;
            }
        },

        toUnsignedLongLong: function toUnsignedLongLong(value, extAttrs) {
            /*
             * Note: Integers above 2^53 are approximated due to ECMAScript limitations
             * Set values to true if the extended attribute appears, false otherwise
             * The recognised attributes are:
             * extAttrs = {
             *     EnforceRange: false,
             *     Clamp: false
             * }
             */
            var x = Number(value);
            if (extAttrs && extAttrs.EnforceRange) {
                if (isNaN(x) || x === Infinity || x === -Infinity) throw new TypeError("Cannot EnforceRange on value");
                x = sign(x) * floor(abs(x));
                if (x < 0 || x > pow(2, 64) - 1) throw new TypeError("Value is out of range");
                return x;
            } else if (!isNaN(x) && extAttrs && extAttrs.Clamp) {
                x = min(max(x, 0), pow(2, 64) - 1);
                return roundToNearest(x);
            } else if (isNaN(x) || x === 0 || x === Infinity || x === -Infinity) {
                return 0;
            } else {
                x = sign(x) * floor(abs(x));
                x = x.mod(pow(2, 64));
                return x;
            }
        },

        toFloat: function toFloat(value) {
            var x = WebIDL.toUnrestrictedFloat(value);
            if (isNaN(x) || !isFinite(x)) throw new TypeError("Cannot convert value to float");
            return x;
        },

        toUnrestrictedFloat: function toUnrestrictedFloat(value) {
            value = Number(value);

            // Nothing to be done for +/-0, +/-Infinity or NaN
            if (value === 0 || !isFinite(value) || isNaN(value)) return value;

            // 53 bit (including hidden bit) significand for 64 bit double precision value
            // 24 bit (including hidden bit) significand for 32 bit single precision value
            // Only work with the positive value. The sign will be fixed at the end.
            var sig52 = abs(value).toString(2),
                sig24;

            // Radix point
            var radixPoint = sig52.indexOf('.');
            sig52 = sig52.split('.').join('');

            // Leading zeros
            var zeros = sig52.indexOf("1"); // The number of 0s before the first 1.
            sig52 = sig52.substring(zeros);

            // Exponent
            // If there's no radix point, the exponent is length-1
            // e.g. "101" (length is 3)
            //       101 = 1.01 * 2^(length-1) = 1.01*2^2
            // If there is a radix point, the exponent is the index-1
            // e.g. "10.1". (index is 2)
            //       10.1 = 10 * 2^(index-1) = 10.1 * 2^1
            // The number of leading zeros are then subtracted.
            // e.g. 0.001 = 1.0 * 2^-3
            var exp = (radixPoint === -1 ? sig52.length :  radixPoint) - 1 - zeros;
            var shift; // Number of places to shift the radix point later

            // Round off the significand to the nearest even value
            var roundingPoint = sig52.length > 24 ? 25 : sig52.length;

            // Denormalised values
            if (exp < -126) {
                zeros -= 126; // Subtract insignificant zeros from significand
                var tail = sig52.length - roundingPoint;
                var length = zeros + sig52.length - tail;
                if (length > 24) {
                    roundingPoint -= length - 24;
                }
            }

            if (roundingPoint < 1) {
                // Underflow
                return sign(value) < 0 ? -0 : 0;
            } else if (roundingPoint < sig52.length) {
                // Shift the radix point to the left and round to nearest
                shift = (roundingPoint - sig52.length);
                sig24 = roundToNearest(parseInt(sig52, 2) * pow(2, shift)).toString(2);
            } else {
                // No change
                sig24 = sig52;
            }

            // The exponent represents the number in scientific notation.
            // e.g. 1.011 * 2^2 = 101.1 base 2 (5.5 base 10).
            // The shift represents the position of the radix point.
            // e.g. 101.1 = 1011 * 2^-1
            shift = exp - (sig24.length - 1);

            // Parse the entire number as a binary integer and then multiply by
            // the appropriate power of 2 in order to shift the radix point.
            var n = parseInt(sig24, 2) * Math.pow(2, shift);

            // Return the value, or +/-Infinity if it overflows.
            return sign(value) * (n >= Math.pow(2,128) ? Infinity : n);
        },

        toDouble: function toDouble(value) {
            var x = Number(value);
            if (isNaN(x) || x === Infinity || x === -Infinity) throw new TypeError("Cannot convert value to double");
            return x;
        },

        toUnrestrictedDouble: function toUnrestrictedDouble(value) {
            return Number(value);
        },

        toDOMString: function toDOMString(value) {
            return String(value);
        },

        toByteString: function toByteString(value) {
            var x = String(value);
            for (var i = 0; i < x.length; i++) {
                if (x.charCodeAt(i) > 255) throw new TypeError("Cannot convert value to ByteString");
            }
            return x;
        },

        toDictionary: function toDictionary(thisObj, value, members) {
            // This doesn't yet handle multiple inherited dictionaries.
            if (!(value === undefined || value === null || typeof value === "object")) {
                throw new TypeError("Cannot convert argument to dictionary");
            }

            for (var key in members) {
                var present = (value === undefined || value === null) ? false
                            : (key in value);
                if (present) {
                    thisObj[key] = typeConversion[members[key].type](value[key]);
                } else if (members[key].defaultValue !== undefined) {
                    thisObj[key] = members[key].defaultValue;
                }
            }
            return thisObj;
        },

        toObject: function toObject(value) {
            if (typeof value !== "object" || value === null) throw new TypeError("Cannot convert value to Object");
            return Object(value);
        },

        toInterfaceType: function toInterfaceType(value, definition) {
            // Not Yet Supported
        },

        toEnumerationType: function toEnumerationType(value, enumeration) {
            var x = String(value);
            if (!Array.isArray(enumeration)) enumeration = Array.prototype.slice.call(enumeration);
            if (enumeration.indexOf(x) === -1) throw new TypeError("Value is not one of the enumerated types.");
            return x;
        },

        toNullableType: function toNullableType(value, innerType, extAttrs) {
            if (value === undefined && extAttrs && extAttrs.TreatUndefinedAs) {
                if (extAttrs.TreatUndefinedAs === "EmptyString") {
                    return "";
                } else if (extAttrs.TreatUndefinedAs === "Null") {
                    return null;
                } else {
                    throw new TypeError("Cannot treat undefined as specified");
                }
            } else if (typeof value !== "function" && extAttrs && extAttrs.TreatNonCallableAsNull) {
                return null;
            } else if (value === undefined || value === null) {
                return null;
            } else {
                return typeConversion[innerType](value);
            }
        }
    };

    var typeConversion = {
        "byte":      WebIDL.toByte,
        "octet":     WebIDL.toOctet,
        "short":     WebIDL.toShort,
        "unsigned short":     WebIDL.toUnsignedShort,
        "long":     WebIDL.toLong,
        "unsigned long":     WebIDL.toUnsignedLong,
        "long long":     WebIDL.toLongLong,
        "unsigned long long":     WebIDL.toUnsignedLongLong,
        "float":     WebIDL.toFloat,
        "unrestricted float":     WebIDL.toUnrestrictedFloat,
        "double":    WebIDL.toDouble,
        "unrestricted double":    WebIDL.toUnrestrictedDouble,
        "boolean":   WebIDL.toBoolean,
        "DOMString": WebIDL.toDOMString,
        "ByteString": WebIDL.toByteString
    };

    global.WebIDL = WebIDL;
})(this);
