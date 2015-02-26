/**
 * Special-agent tojson script
 * ============================
 *
 * This scripts aims at transforming the popular 'useragentswitcher.xml' file
 * into an edible json file optimized for node.js usage.
 */
var artoo = require('artoo-js'),
    cheerio = require('artoo-js/node_modules/cheerio'),
    UAParser = require('ua-parser-js'),
    fs = require('fs'),
    _ = require('lodash');

artoo.bootstrap(cheerio);

//-- Data
var output = {
  // tags: [
  //   'acer',
  //   'amazon',
  //   'android',
  //   'apple',
  //   'barnes-and-noble',
  //   'beos',
  //   'blackberry',
  //   'bot',
  //   'downloader',
  //   'feed-reader',
  //   'game-console',
  //   'google',
  //   'hp',
  //   'htc',
  //   'ios',
  //   'legacy',
  //   'lg',
  //   'library',
  //   'linux',
  //   'mac',
  //   'maemo',
  //   'mda',
  //   'misc',
  //   'modern',
  //   'motorola',
  //   'nec',
  //   'nokia',
  //   'os/2',
  //   'palm',
  //   'samsung',
  //   'search',
  //   'service',
  //   'shell',
  //   'sony',
  //   'symbian',
  //   'tablet',
  //   'unix',
  //   'wap',
  //   'validator',
  //   'windows',
  //   'zune'
  // ],
  items: []
};

//-- Helpers
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

var uadef = {
  // title: 'description',
  ua: 'useragent'
};

function scrape(tags) {
  return function() {
    tags = tags.filter(function(t) {
      return ~['legacy', 'modern', 'desktop', 'bot', 'downloader', 'feed-reader', 'search', 'library'].indexOf(t);
    });

    output.items.push(_.extend({tags: tags}, $(this).scrapeOne(uadef)));
  };
}

//-- Reading and parsing the XML file
var xml = fs.readFileSync(__dirname + '/../data/useragentswitcher.xml', {encoding: 'utf-8'}),
    $ = cheerio.load(xml, {xmlMode: true}),
    $root = $('useragentswitcher');

//-- Scraping
var windows = $root.find('folder[description="Browsers - Windows"]'),
    mac = $root.find('folder[description="Browsers - Mac"]'),
    linux = $root.find('folder[description="Browsers - Linux"]'),
    unix = $root.find('folder[description="Browsers - Unix"]'),
    mobiles = $root.find('folder[description="Mobile Devices"]'),
    spiders = $root.find('folder[description="Spiders - Search"]'),
    misc = $root.find('folder[description="Miscellaneous"]');

windows.find('folder[description="Legacy Browsers"] > useragent').each(scrape(['desktop', 'legacy', 'windows']));
windows.children('useragent').each(scrape(['desktop', 'windows', 'modern']));

mac.find('folder[description="Legacy Browsers"] > useragent').each(scrape(['desktop', 'legacy', 'mac']));
mac.children('useragent').each(scrape(['desktop', 'mac', 'modern']));

linux.find('folder[description="Legacy Browsers"] > useragent').each(scrape(['desktop', 'legacy', 'linux']));
linux.find('folder[description="Console Browsers"] > useragent').each(scrape(['desktop', 'shell', 'linux']));
linux.children('useragent').each(scrape(['desktop', 'linux', 'modern']));

unix.find('folder[description="Legacy Browsers"] > useragent').each(scrape(['desktop', 'legacy', 'unix']));
unix.find('folder[description="Console Browsers"] > useragent').each(scrape(['desktop', 'shell', 'unix']));
unix.children('useragent').each(scrape(['desktop', 'unix', 'modern']));

mobiles.find('folder[description="Browsers"] > useragent').each(scrape(['mobile']));

mobiles.find('folder[description="Devices"] > folder[description="Tablets"] > useragent').each(scrape(['mobile', 'tablet']));
mobiles.find('folder[description="Devices"] > folder[description="Amazon (Kindle)"] > useragent').each(scrape(['mobile', 'amazon']));
mobiles.find('folder[description="Devices"] > folder[description="Acer"] > useragent').each(scrape(['mobile', 'acer']));
mobiles.find('folder[description="Devices"] > folder[description="Apple (iPhone etc)"] > useragent').each(scrape(['mobile', 'apple']));
mobiles.find('folder[description="Devices"] > folder[description="Barnes and Noble"] > useragent').each(scrape(['mobile', 'barnes-and-noble']));
mobiles.find('folder[description="Devices"] > folder[description="Blackberry (RIM)"] > useragent').each(scrape(['mobile', 'blackberry']));
mobiles.find('folder[description="Devices"] > folder[description="Google (Nexus etc.)"] > useragent').each(scrape(['mobile', 'google']));
mobiles.find('folder[description="Devices"] > folder[description="HP"] > useragent').each(scrape(['mobile', 'hp']));
mobiles.find('folder[description="Devices"] > folder[description="HTC"] > useragent').each(scrape(['mobile', 'htc']));
mobiles.find('folder[description="Devices"] > folder[description="LG"] > useragent').each(scrape(['mobile', 'lg']));
mobiles.find('folder[description="Devices"] > folder[description="MDA - T-Mobile"] > useragent').each(scrape(['mobile', 'mda']));
mobiles.find('folder[description="Devices"] > folder[description="Motorola"] > useragent').each(scrape(['mobile', 'motorola']));
mobiles.find('folder[description="Devices"] > folder[description="Nec"] > useragent').each(scrape(['mobile', 'nec']));
mobiles.find('folder[description="Devices"] > folder[description="Nokia"] > useragent').each(scrape(['mobile', 'nokia']));
mobiles.find('folder[description="Devices"] > folder[description="Palm"] > useragent').each(scrape(['mobile', 'palm']));
mobiles.find('folder[description="Devices"] > folder[description="Samsung"] > useragent').each(scrape(['mobile', 'samsung']));
mobiles.find('folder[description="Devices"] > folder[description="SonyEricson"] > useragent').each(scrape(['mobile', 'sony']));
mobiles.find('folder[description="Devices"] > folder[description="Zune (Microsoft)"] > useragent').each(scrape(['mobile', 'zune']));

mobiles.find('folder[description="OS"] > folder[description="Android"] > useragent').each(scrape(['mobile', 'android']));
mobiles.find('folder[description="OS"] > folder[description="iOS"] > useragent').each(scrape(['mobile', 'ios']));
mobiles.find('folder[description="OS"] > folder[description="Linux"] > useragent').each(scrape(['mobile', 'linux']));
mobiles.find('folder[description="OS"] > folder[description="Maemo"] > useragent').each(scrape(['mobile', 'maemo']));
mobiles.find('folder[description="OS"] > folder[description="Palm"] > useragent').each(scrape(['mobile', 'palm']));
mobiles.find('folder[description="OS"] > folder[description="Symbian"] > useragent').each(scrape(['mobile', 'symbian']));
mobiles.find('folder[description="OS"] > folder[description="Windows"] > useragent').each(scrape(['mobile', 'windows']));

mobiles.find('folder[description="Services"] > useragent').each(scrape(['mobile', 'service']));
mobiles.find('folder[description="WAP Phones"] > useragent').each(scrape(['mobile', 'wap']));

spiders.children('useragent').each(scrape(['search']));

misc.find('folder[description="Bots - Spiders"] > useragent').each(scrape(['bot']));
misc.find('folder[description="Browsers - Beos"] > useragent').each(scrape(['beos']));
misc.find('folder[description="Browsers - OS/2"] > useragent').each(scrape(['os/2']));
misc.find('folder[description="Downloaders"] > useragent').each(scrape(['downloader']));
misc.find('folder[description="Feed Readers"] > useragent').each(scrape(['feed-reader']));
misc.find('folder[description="Game Consoles"] > useragent').each(scrape(['game-console']));
misc.find('folder[description="Libraries"] > useragent').each(scrape(['library']));
misc.find('folder[description="Validators"] > useragent').each(scrape(['validator']));
misc.find('folder[description="Miscellaneous"] > useragent').each(scrape(['misc']));

//-- Checking tags possibly missing
// output.tags.forEach(function(tag) {
//   if (!_.first(output.items, function(i) {
//     return ~i.tags.indexOf(tag);
//   }))
//     throw Error('No useragent for ' + tag);
// });

//-- Deduping
var index = {};
output.items.forEach(function(i, idx) {
  if (!index[i.ua])
    index[i.ua] = {tags: i.tags, ua: i.ua, title: i.title};
});

output.items =  _.values(index);

//-- Add some more tags
output.items.forEach(function(i) {
  var parser = new UAParser();

  parser.setUA(i.ua);

  var browser = parser.getBrowser(),
      device = parser.getDevice(),
      engine = parser.getEngine(),
      os = parser.getOS(),
      cpu = parser.getCPU();

  if (browser.name)
    i.tags.push(browser.name.trim());

  if (device.type)
    i.tags.push(device.type.trim());

  if (device.vendor)
    i.tags.push(device.vendor.trim());

  if (engine.name)
    i.tags.push(engine.name.trim());

  if (os.name)
    i.tags.push(os.name.trim());

  if (cpu.architecture)
    i.tags.push(cpu.architecture.trim());

  i.tags = _.uniq(i.tags);
});

//-- Adjust tags
output.tags = _(output.items)
  .map('tags')
  .flatten()
  .uniq()
  .sortBy()
  .value();

//-- Dumping as json
fs.writeFileSync(__dirname + '/../data/useragents.json', JSON.stringify(output));
fs.writeFileSync(__dirname + '/../data/pretty_useragents.json', JSON.stringify(output, null, 2));
