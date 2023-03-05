const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');

/**
 * 
 * @param {string} content 
 * @returns {string}
 */
async function css(content) {
    return await minify({
        compressor: cleanCSS,
        content
    });
}

module.exports = { css };