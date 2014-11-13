/**
 * Special-agent
 * ==============
 *
 * A simple interface providing means to retrieve common user agents strings.
 */
var useragents = require('./data/useragents.json');

var specialAgent = {};

// Non writable properties
Object.defineProperty(specialAgent, 'version', {
  value: '0.0.1'
});


// Exporting
module.exports = specialAgent;
