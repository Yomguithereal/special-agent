/**
 * Special-agent
 * ==============
 *
 * A simple interface providing means to retrieve common user agents strings.
 */
var data = require('./data/useragents.json'),
    _ = require('lodash');

function get(tag, limit, random) {
  var tags = tag instanceof Array ? tag : [tag];

  var uas = _(data.items)
    .filter(function(item) {
      return tags.every(function(t) {
        return ~item.tags.indexOf(t);
      });
    });

  if (random)
    uas = uas.shuffle();

  if (typeof limit === 'number')
    uas = uas.take(limit);

  if (typeof limit === 'boolean' && limit)
    return uas.take(1).value()[0].ua;

  return uas.map('ua').value();
}

var specialAgent = {

  // Direct link to data
  agents: data.items,
  tags: data.tags,

  // Find user agents
  find: function(tag, limit) {
    return get(tag, limit);
  },

  // Find a single user agent
  findOne: function(tag) {
    return get(tag, true);
  },

  // Find random user agents
  findRandom: function(tag, limit) {
    return get(tag, limit, true);
  },

  // Find a single random user agent
  findOneRandom: function(tag) {
    return get(tag, true, true);
  }
};

/*
 * find
 * findAll
 * findByTitle
 * findByType
 * findOne
 * findRandom
 * findOneRandom
 * randomIterator
 * iterator
 * types
 */

// Non writable properties
Object.defineProperty(specialAgent, 'version', {
  value: '0.1.0'
});

// Exporting
module.exports = specialAgent;
