/** ******************************************************************************************************************
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

import match from '../src/match';
import expectGroup, { testGroup } from  'lazyj';
import { any, isA } from '../src/predicateFunctions';

class Test {
    func() {
        return 'test';
    }
}

const exampleObj = {
    a: 1,
    b: 2
}

testGroup( match, {
    '': () => {
        expectGroup()
            ( () => match() )` toThrow ${Error}`
            ( () => match( {} ) )` toThrow ${Error}`
            ( match( {}, {} ) )` toBeTruthy`
            ( () => match( '', '' ) )` toThrow ${TypeError}`
            ( () => match( [], [] ) )` toThrow ${TypeError}`

            ( match( exampleObj, exampleObj ) )` -> true `
            ( match( exampleObj, { a: val => val === 1, b: val => val === 2  } ) )` -> true `
            ( match( exampleObj, { a: /1/, b: /2/  } ) )` -> true `
            ( match( exampleObj, { a: isA.number } ) )` -> true `
            ( match( exampleObj, { b: any } ) )` -> true `

            ( match( exampleObj, { a: 2, b: 1 } ) )` -> false `
            ( match( exampleObj, { c: any } ) )` -> false `
            ( match( { c: 0 }, { a: any } ) )` -> false `

            ( match( { c: 'test' }, { c: /est/ } ) )` -> true `
            ( match( { c: 'test' }, { c: str => str.startsWith( 't' ) } ) )` -> true `

            ( match( new Test(), { func: isA.function } ) )` -> true `

            ( match( exampleObj, exampleObj, 'reward' ) )` -> "reward" `
            ( typeof match( exampleObj, exampleObj, () => '' ) )` -> "function" `
            ( match( exampleObj, exampleObj, exampleObj ) )` -> ${exampleObj} `

            ( match( exampleObj, { a: 2, b: 1 }, 'reward' ) )` -> false `


    }
} );
