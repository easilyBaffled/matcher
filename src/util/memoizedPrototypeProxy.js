/** ******************************************************************************************************************
 * @file One of my fancy Proxies, and it remembers what has been called.
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

import assertType from './assertType';

// Turns 'string'.endsWith( 'g' ) to endsWith( 'g' )( 'string' )
const defaultFunc = ( functionName, parentType ) => {
    if( !( parentType[ functionName ] ) )
        throw TypeError( `${functionName} is not a function in ${parentType}` );

    return testVal => prototypeObj => (
            prototypeObj[ functionName ]( testVal )
    );
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
                if( [ 'constructor' ].includes( name ) )
                    return target[ name ];

                if ( !(name in this.memo) )
                    this.memo[ name ] = func( name, target );
                return this.memo[ name ];
            }
        }
    );
}
