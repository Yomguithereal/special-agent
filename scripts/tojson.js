/**
 * Special-agent tojson script
 * ============================
 *
 * This scripts aims at transforming the popular 'useragentswitcher.xml' file
 * into an edible json file optimized for node.js usage.
 */
var artoo = require('artoo-js'),
    cheerio = require('artoo-js/node_modules/cheerio'),
    fs = require('fs');

// Helpers
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Data
var useragents = {
  browsers: {
    windows: {},
    mac: {},
    linux: {},
    unix: {}
  },
  mobiles: {},
  bots: [],
  misc: {}
};

var uadef = {
  title: 'description',
  useragent: 'useragent'
};

//-- 1) Reading and parsing the XML file
var xml = fs.readFileSync(__dirname + '/../data/useragentswitcher.xml', {encoding: 'utf-8'}),
    $ = cheerio.load(xml);

//-- 2) Basic UA
['windows', 'mac', 'linux', 'unix'].forEach(function(os) {
  var $folder = $('folder[description="Browsers - ' + capitalize(os) + '"]');

  useragents.browsers[os].legacy = artoo.scrape($folder.find('folder[description="Legacy Browsers"] useragent'), uadef);

  if ($folder.find('folder[description="Console Browsers"]').length)
    useragents.browsers[os].console = $folder.find('folder[description="Console Browsers"] useragent').scrape(uadef);

  useragents.browsers[os].modern = $folder.children('useragent').scrape(uadef);
});

//-- 3) Search bots
useragents.bots = $('useragentswitcher > folder[description="Spiders - Search"] useragent').scrape(uadef);

//-- 4) Mobiles
var $mobiles = $('useragentswitcher > folder[description="Mobile Devices"]');

useragents.mobiles.browsers = $mobiles.find('folder[description="Browsers"] > useragent').scrape(uadef);
useragents.mobiles.services = $mobiles.find('folder[description="Services"] > useragent').scrape(uadef);
useragents.mobiles.wap = $mobiles.find('folder[description="WAP Phones"] > useragent').scrape(uadef);

useragents.mobiles.os = {};
$mobiles.find('folder[description="OS"] > folder').each(function() {
  useragents.mobiles.os[$(this).attr('description').toLowerCase()] = $(this).find('useragent').scrape(uadef);
});

//-- 5) Miscellaneous
var $misc = $('useragentswitcher > folder[description="Miscellaneous"]');

var conversions = {
  'bots - spiders': 'spiders',
  'browsers - beos': 'beos',
  'browsers - os/2': 'os2',
  'feed readers': 'feedReaders',
  'game consoles': 'gameConsoles'
};

$misc.find('folder').each(function() {
  var title = $(this).attr('description').toLowerCase();

  useragents.misc[title in conversions ? conversions[title] : title] = $(this).find('useragent').scrape(uadef);
});

//-- 8) Tagging and merging
var output = {
  types: [
    'legacy',
    'modern',
    'console',
    'bots'
  ],
  items: []
};

Object.keys(useragents.browsers).forEach(function(os) {
  output.types.push(os);

  Object.keys(useragents.browsers[os]).forEach(function(type) {
    useragents.browsers[os][type].forEach(function(ua) {
      output.items.push({
        title: ua.title,
        useragent: ua.useragent,
        types: [os, type]
      });
    });
  });
});

useragents.bots.forEach(function(ua) {
  output.items.push({
    title: ua.title,
    useragent: ua.useragent,
    types: ['bot']
  });
});

// TODO: devices

//-- 7) Dumping as json
fs.writeFileSync(__dirname + '/../data/useragents.json', JSON.stringify(output));
fs.writeFileSync(__dirname + '/../data/pretty_useragents.json', JSON.stringify(output, null, 2));
