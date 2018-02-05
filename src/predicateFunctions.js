/** ******************************************************************************************************************
 * @file Reversed functions for matching
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

export default {
    any() 
{
        return true;
    },
    isA: memoedProxy( {}, {}, name => target =>
        type( target ).toLowerCase() === name
    ),
    O: memoedProxy( Object ),
    N: memoedProxy( Number, {
        greaterThan: predicate => num => num > predicate,
        lessThan: predicate => num => num < predicate
    } ),
    S: memoedProxy( String )
};
