/** ******************************************************************************************************************
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

import assertType, { testValue } from '../../src/util/assertType';
import expectGroup, { testGroup } from  'lazyj';

testGroup( testValue, {
    '': () => {
        expectGroup()
            ( testValue( { 'num': 0 }, 'number'  ) )`  -> true`
            ( testValue( { 'obj': {} }, 'object'  ) )`  -> true`
            ( testValue( { 'arr': [] }, 'object' ) )`  toBeInstanceOf ${TypeError}`
            ( testValue( { 'num': 0 }, 'object' ) )` toBeInstanceOf ${TypeError}`
            ( () => testValue( [] ) )` toThrow ${Error}`
            ( () => testValue( {} ) )` toThrow ${Error}`
    }
} );

testGroup( assertType, {
    '': () => {
        class Test {
            constructor () {
                this[Symbol.toStringTag] = 'Test'
            }
        }
        const testClass = new Test();

        expectGroup()
            ( assertType.number( { 'num': 0 } ) )`  -> true`
            ( assertType.object( { 'obj': {} } ) )`  -> true`
            ( assertType.Test( { testClass } ) )`  -> true`
            ( ()  => assertType.object( { 'arr': [] } ) )`  toThrow ${TypeError}`
            ( ()  => assertType.object( { 'num': 0 } ) )`  toThrow ${TypeError}`
            ( ()  => assertType.array( [] ) )`  toThrow ${TypeError}`
            ( () => assertType.object() )`  toThrow ${Error}`
            ( ()  => assertType.notAThing( { 'num': 0 } ) )` toThrow ${Error}`
            ( () => assertType( [] ) )` toThrow ${Error}`
            ( assertType( { obj: {} }, 'object', 'function' ) )` toBeTruthy`
            ( assertType( { func: () => '' }, 'object', 'function' ) )` toBeTruthy`
    }
} );
