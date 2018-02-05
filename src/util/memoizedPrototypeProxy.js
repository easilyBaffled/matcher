/** ******************************************************************************************************************
 * @file One of my fancy Proxies, and it remembers what has been called.
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

import type from 'type-detect';
import assertType from './assertType';

// Turns 'string'.endsWith( 'g' ) to endsWith( 'g' )( 'string' )
const defaultFunc = functionName => testVal => prototypeObj => {
    if( prototypeObj.prototype.constructor.name !== type( testVal ) )
        throw TypeError( 'Mismatched types' );
    return prototypeObj[ functionName ]( testVal );
};

/**
 *
 * @param {Object} baseObject - An object that will be masked by the Proxy
 * @param {Object} memo - An object to store calls, you can prefill this with functions and values
 * @param {Function} func -
 * @returns {Proxy<Object>}
 */
export default function memoizedPrototypeProxy( baseObject = {}, memo = {}, func = defaultFunc )
{
    // TODO: Would this be better with Flow & Flow-Runtime
    //          Flow would take care of type checking, and JStype declarations
    //          and Flow-Runtime would strip the flow annotations and turn them into in-function type asserts
    assertType( { baseObject }, 'object', 'function' );
    assertType.object( { memo } );
    assertType.function( { func } );

    baseObject = baseObject.prototype || baseObject;

    return new Proxy( baseObject,
        {
            memo,
            get( target, name ) 
            {
                const isMemoized = name in this.memo;
                const memoizedIsNotAFunction = isMemoized && type( this.memo[ name ] ).toLowerCase() !== 'function';

                if ( !isMemoized || memoizedIsNotAFunction )
                    this.memo[ name ] = func( name );

                else
                    return this.memo[ name ];
            }
        }
    );
}
