/** ******************************************************************************************************************
 * @file Match a target against a certain pattern.
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
import R from './util/required';
import { isA } from './predicateFunctions';
import type from 'type-detect';
import isEqual from 'lodash-es/isEqual'

/**
 * Match a value against a test function, Regex else uses Lodash's isEqual.
 * @param {*} target - target to test
 * @param {function|RegExp|*} test - value to test against
 * @param {undefined|*} reward - an optional reward that can be returned if the target satisfies the test
 * @returns {boolean|reward} - returns result of the test or reward
 */
export default function match( target = R( 'target' ), test = R( 'test' ), reward )
{
    if ( isA.object( target ) && isA.object( test ) )
    {
        const res = Object.keys( test ).every( key => 
        {
            if ( !( key in target ) )
                return false;

            const tester = test[ key ];

            switch ( type( tester ) ) 
            {
                case "function":
                    return tester( target[key] );
                case "RegExp":
                    return tester.test( target[key] );
                default:
                    return isEqual( tester, target[key] );
            }
        } );

        if ( reward )
            return res && reward;

        return res;
    }
    else
        throw TypeError( `Match only handles objects right now
            ${target.toString()}
            ${test.toString()}
        ` )
}
