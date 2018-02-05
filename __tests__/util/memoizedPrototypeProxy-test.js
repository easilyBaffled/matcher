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
    memoFunc() {
        return 'memoFunc'
    }
}

testGroup( proxy, {
    '': () => {
        //console.log(proxy( String ));
        // const eg = expectGroup()
        //     ( proxy( String ) )` -> ${String.prototype}`
        //     ( proxy( String ) )`  -> ${String.prototype}`
        //     ( () => proxy( '' ) )` toThrow ${TypeError}`
        //     ( proxy( Test.prototype ) )`  -> ${Test.prototype}`
        //     ( proxy( Test ) )`  -> ${Test.prototype}`
        //     ( proxy( {} ) )`  -> ${{}}`;
        //
        // const s =  proxy( String, memo );
        //
        //     eg( s.endsWith( 'g' )( 'string' ) )` -> true`
        //     ( s.startsWith( 'g' )( 'string' ) )` -> false`;
        //
        // console.log( memo )
    }
} );
