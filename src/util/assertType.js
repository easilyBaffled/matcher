/** ******************************************************************************************************************
 * @file Short type insurance.
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";
// @flow

import type from 'type-detect';
import isEmpty from 'lodash-es/isEmpty';

import R from './required';
/**
 * Test if the target value is of the proper type using type-detect
 * Will return an error the types don't match
 * @param { Object.<any> } targetObject - An object { nameOfValue: ValueToTest } so nameOfValue can be used in the error message
 * @param {string} name - name of the type to check against
 * @returns {boolean|TypeError}
 */
export function testValue( targetObject = R( 'targetObject' ), name = R( 'name' ) )
{
    if ( type( targetObject ) !== 'Object' ) throw TypeError( `targetObject must be type Object instead it was a ${type( targetObject )}` );
    if ( isEmpty( targetObject ) ) throw Error( 'targetObject is Empty' );

    // By calling the function with assert.object( { someObj } ) we can then grab the variable, someObj, name as it was originally used
    const [key, value] = Object.entries( targetObject )[0];

    if ( type( value ).toLowerCase() === name.toLowerCase() )
    {
        return true;
    }
    else
    {
        const err = new TypeError( `${key} must be type ${name} instead it was a ${type( value )}` );
        err.stack = err.stack.replace( /\n([^\n]+)/, '' ).replace( /\n([^\n]+)/, '' ).replace( /\n([^\n]+)/, '' ).replace( /\n([^\n]+)/, '' ); // Remove the line referring to this file from the stack trace
        return err;
    }
}

/**assertType
 * The Proxy allows us to test against any valid type without having to write the function by hand.
 * The accessor name we use for the function assertType.{name} becomes the string we test against so
 * assertType.object( val ), assertType.function( val ), assertType.MyOwnClass( val ) become
 * type( val ) === 'object', type( val ) === 'function', type( val ) === 'MyOwnClass'
 */
export default new Proxy( assert,
    {
        get( target, name ) 
        {
            return targetObject => target( targetObject, name );
        }
    }
);

function assert( targetObject, ...args ) {
    let err = new TypeError( 'No types provided' );

    const res = args.some( type => {
        const val = testValue( targetObject, type );
        if( val instanceof Error )
            err = val;
        else
            return true;
    } );

    if( res )
        return true;
    else
        throw err;
}
