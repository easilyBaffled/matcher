/** ******************************************************************************************************************
 * @file Describe what matcher does.
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

function patternMatch( target, patternSet ) 
{
    let result = !pred.isA.array( patternSet[patternSet.length - 1] ) ?
        patternSet[patternSet.length - 1]
        : patternSet.filter( entry => !pred.isA.array( entry ) )[0];

    for ( let entry of patternSet ) 
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
