/** ******************************************************************************************************************
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

import proxy from '../../src/util/memoizedPrototypeProxy';
import expectGroup, { testGroup } from  'lazyj';

class Test {
    func() {
        return 'test';
    }
}

const memo = {
    func() {
        return 'test'
    }
}

testGroup( proxy, {
    '': () => {
        const eg = expectGroup()
            ( proxy( String ) )` toBeInstanceOf ${Object}`
            ( () => proxy( String.prototype ) )` toThrow ${TypeError}`
            ( proxy( String ).constructor.name )` -> "String"`
            ( proxy( Test.prototype ).constructor.name )` -> "Test"`
            ( proxy( Test ).constructor.name )` -> "Test"`
            ( () => proxy( '' ) )`  toThrow ${TypeError}`
            ( proxy( {} ) !== {} )` -> true`;

        const s =  proxy( String, memo );

        eg
            ( Object.keys( memo ) )` -> ${['func']} `
            ( typeof s.endsWith )` -> "function" `
            ( typeof s.endsWith('g') )` -> "function" `
            ( s.endsWith( 'g' )( 'string' ) )` -> true`
            ( s.startsWith( 'g' )( 'string' ) )` -> false`
            ( Object.keys( memo ) )` -> ${["func", "endsWith", "startsWith"]} `
            ( () => s.notReal )` toThrow`
    }
} );
