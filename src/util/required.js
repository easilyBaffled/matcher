/** ******************************************************************************************************************
 * @file Forces function parameters to be required.
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/

/**
 * Used as a default parameter to force parameters to be required
 *
 * function someFunc( firstParam = '', secondParam = require( 'secondParam' ), )
 * @param {string} name
 */
export default ( name = '' )=>
{
    // TODO: get the function name from the stack trace and use it in the messaging.
    const err = new Error( name ? name.toString() + " is a required parameter" : "A parameter is required for this function." );
    err.stack = err.stack.replace( /\n([^\n]+)/, '' ); // Remove the line referring to this file from the stack trace
    throw err
};

