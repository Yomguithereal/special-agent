/**
 * Special-agent Unit Testing
 * ===========================
 *
 */
var assert = require('assert'),
    specialAgent = require('./index.js');

describe('Special Agent', function() {

  it('should expose some properties.', function() {
    assert(specialAgent.agents instanceof Array);
    assert(specialAgent.tags instanceof Array);
  });

  it('should be able to find several agents.', function() {
    assert(specialAgent.find(['windows']).length > 1);
    assert(specialAgent.find(['windows', 'modern']).length > 1);
    assert.deepEqual(specialAgent.find('windows'), specialAgent.find(['windows']));
  });

  it('should be possible to find a single agent.', function() {
    assert.strictEqual(specialAgent.findOne(['windows']), 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/527  (KHTML, like Gecko, Safari/419.3) Arora/0.6 (Change: )');
    assert.strictEqual(specialAgent.findOne('windows'), 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/527  (KHTML, like Gecko, Safari/419.3) Arora/0.6 (Change: )');
  });

  it('should be possible to limit the number of results.', function() {
    assert(specialAgent.find('windows', 10).length === 10);
    assert(specialAgent.find(['windows'], 10).length === 10);
  });

  it('should be possible to get random user agents.', function() {

    assert(specialAgent.findRandom('windows', 10).length === 10);
    assert(specialAgent.findRandom(['windows'], 10).length === 10);
    assert(typeof specialAgent.findOneRandom(['windows']) === 'string');
  });
});
