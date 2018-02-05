/** ******************************************************************************************************************
 * @file Configuration for Wallaby Test utility.
 * @authors Danny Michaelis <daniel.michaelis@iongroup.com>,
 * @date 23-Jan-2018
 *********************************************************************************************************************/
"use strict";

// https://wallabyjs.com/docs/integration/jest.html
module.exports = function () {
    return {
        files: ['src/**/*.js', '!src/**/__tests__/*.js'],

        tests: ['src/**/__tests__/*.js'],

        env: {
            type: 'node',
            runner: 'node'
        },

        testFramework: 'jest'
    };
};
