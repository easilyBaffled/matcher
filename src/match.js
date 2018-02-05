/** ******************************************************************************************************************
 * @file Match a target against a certain pattern.
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

export default function match( target, test, reward ) 
{
    if ( typeof target === "object" && typeof test === "object" ) 
{
        const res = Object.keys( test ).every( key => 
{
            if ( !( key in target ) ) return false;

            const tester = test[key];

            switch ( type( tester ) ) 
{
                case "function":
                    return tester( target[key] );
                case "RegExp":
                    return tester.test( target[key] );
                default:
                    return _.isEqual( tester, target[key] );
            }

            if ( pred.isA.function( test[key] ) ) return test[key]( target[key] );
        } );

        if ( reward ) return res && reward;

        return res;
    }
}
