/** ******************************************************************************************************************
 * @file A collection of functions that can be used for matching values
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/

import type from 'type-detect';
import { memoizedProxy } from './util';

/**
 * A matching function used to assert simply that the key exists
 * @returns {true}
 */
export function any()
{
    return true;
}

/**
 * A matching set used to test types. What ever you use as the key name, will be what is used as the type eg:
 * isA.object( val ) will test if val is an object
 * @type {Proxy<Object>}
 */
export const isA = memoizedProxy( {}, {
        primative: value => [ 'boolean', 'number', 'string', 'symbol', 'undefined' ].includes( typeof value )
    }, name => target =>
        type( target ).toLowerCase() === name
    );

/**
 * A matching set used to test Numbers. All of the properties of N are the functions available from Number.prototype, only they work in reverse.
 * You call it like N.greaterThan( 5 )( val ) which will test `val > 5` or N.isNaN()( val ) to confirm val is a NaN
 * @type {Proxy<Object>}
 */
export const N = memoizedProxy( Number, { // Include extra functions greaterThan and lessThan
        greaterThan: predicate => num => num > predicate,
        lessThan: predicate => num => num < predicate
    } );

/**
 * /**
 * A matching set used to test Strings. All of the properties of S are the functions available from String.prototype, only they work in reverse.
 * You call it like `S.startsWith( 'S' )( val )` which will test `val.startsWith('S')` or `S.includes( 'x' )( val )`
 * @type {Proxy<Object>}
 */
export const S = memoizedProxy( String );
