/** ******************************************************************************************************************
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

import { required } from '../../src/util';
import expectGroup, { testGroup } from  'lazyj';

const R = required;

const tryCatch = ( func, ...args ) => {
        try {
            return func( ...args );
        } catch( e ) {
            return e;
        }
}

const func = ( param = R( 'param' ) ) => 'worked'

testGroup( R, {
    '': async () => {

        expectGroup()
            ( ()  => required() )` toThrow ${Error}`
            ( tryCatch( func ).message.startsWith( 'param' ) )` -> true`
            ( tryCatch( func, 'param' ) )` -> "worked"`
            ( () => required( {} ) )` toThrow ${Error}`
            ( tryCatch( required, {} ).message )` -> "[object Object] is a required parameter"`
            ( () => required( [] ) )` toThrow ${Error}`
            ( tryCatch( required, [] ).message )` -> " is a required parameter"`


    }
} );
