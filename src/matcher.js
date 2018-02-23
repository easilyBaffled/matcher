/** ******************************************************************************************************************
 * @file Describe what matcher does.
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

import partition from 'lodash-es/partition';
import { isA } from './predicateFunctions';
import match from './match';

/**
 * Matches an object against a list of test sets returning the reward from the first set that matches
 * @param {object} target
 * @param {object} patternSet
 */
export default function patternMatch( target, patternSet )
{
    let [ matchers, defaultValue ] = partition( patternSet, matcher => isA.array( matcher ) );
    let result = defaultValue[ 0 ];

    for ( let entry of matchers )
    {
        let res = match( target, ...entry );

        if ( res ) 
        {
            result = res;
            break;
        }
    }

    return result;
}

patternMatch.preSet = patternSet => target => patternMatch( target, patternSet );
