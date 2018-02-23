/** ******************************************************************************************************************
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

import matcher from '../src/matcher';
import expectGroup, { testGroup } from  'lazyj';
import { any, isA, N } from '../src/predicateFunctions';

const testObj = {
    a: 1,
    b: 2
}

const matcherWrapper = patternSet =>  (
    matcher( testObj, patternSet )
);

testGroup( matcher, {
    '': () => {
        expectGroup( matcherWrapper )
            ( [ [ testObj, 'reward' ], 'default' ] )` -> "reward" `
            ( [ [ { a: 1 }, 'reward' ], 'default' ] )` -> "reward" `
            ( [ [ { a: 2 }, 'reward' ], 'default' ] )` -> "default" `
            ( [
                [ { a: 2 }, 'skipped' ],
                [ { b: 2 }, 'reward' ],
                'default'
            ] )` -> "reward" `
            ( [
                [ { a: isA.string }, 'skipped' ],
                [ { a: N.greaterThan( 0 ) }, 'reward' ],
                'default'
            ] )` -> "reward" `;

        expectGroup()
            ( matcher() )` -> ${null} `

    }
} );
