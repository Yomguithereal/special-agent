[![Build Status](https://travis-ci.org/Yomguithereal/special-agent.svg)](https://travis-ci.org/Yomguithereal/special-agent)

# special-agent

Thin wrapper around a compilation of common user agent strings that one can query easily through tags.

## Installation

You can install `special-agent` with npm:

```bash
npm install special-agent
```

## Usage

`special-agent` lets you query its data through tags which are the same that the one produced by the [ua-parser-js](https://www.npmjs.com/package/ua-parser-js) lib plus the following ones:

```js
'legacy', 'modern', 'desktop', 'bot', 'downloader', 'feed-reader', 'search', 'library'
```

This is how you can use the library in node:

```js
var specialAgent = require('special-agent');

// Whole data
specialAgent.agents;

// Available tags
specialAgent.tags;
```

**#***.find*

```js
specialAgent.find(tag, [nb]);
specialAgent.find(tags, [nb]);

// Example - get 5 user agents for 'Windows'
var uastrings = specialAgent.find('Windows', 5);

// Example - get every user agents for 'Windows' and 'Chrome'
var uastrings = specialAgent.find(['Windows', 'Chrome']);
```

**#***.findOne*

```js
specialAgent.findOne(tag);
specialAgent.findOne(tagS);
```

**#***.findRandom*

```js
specialAgent.findRandom(tag, [nb]);
specialAgent.findRandom(tags, [nb]);
```

**#***.findOneRandom*

```js
specialAgent.findOneRandom(tag);
specialAgent.findOneRandom(tagS);
```

## Contribution

Contributions are more than welcome. Feel free to submit any pull request as long as you added unit tests if relevant and passed them all.

To install the development environment, clone your fork and use the following commands:

```bash
# Install dependencies
npm install

# Testing
npm test

# Building
npm run build
```

## License

MIT for the code and the following for the [data](http://techpatterns.com/forums/about304.html:

```
License: BSD 2 Clause

Copyright (c) 2015, Harald Hope

All rights reserved. Redistribution and use in source and binary forms,     with or without modification, are permitted provided that the following     conditions are met:     1. Redistributions of source code must retain the above copyright notice,     this list of conditions and the following disclaimer.     2. Redistributions in binary form must reproduce the above copyright notice, this     list of conditions and the following disclaimer in the documentation and/or other     materials provided with the distribution.     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'     AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE     IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE     ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE     LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR     CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF     SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS     INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER     IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)     ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE     POSSIBILITY OF SUCH DAMAGE.
```
