'use strict';

const {URL} = require('url');
const defaults = require('lodash.defaults');
const cheerio = require('cheerio');


function modifyUrl(value, params, options) {
  let parsedUrl;
  try {
    parsedUrl = new URL(value, options.base);
  } catch (err) {
    if (err.code === 'ERR_INVALID_URL' && !options.strict) {
      return value;
    } else {
      throw err;
    }
  }
  Object.keys(params).forEach((key) => {
    if (!parsedUrl.searchParams.has(key) || options.existing === 'overwrite') {
      parsedUrl.searchParams.set(key, params[key]);
    } else if (options.existing === 'append') {
      parsedUrl.searchParams.append(key, params[key]);
    }
  });
  return parsedUrl.toString();
}

//options:
// -base: (String) url base for relative urls
// -exisiting: (String) one of append/overwrite/ignore for handling existing query parametrs
// -htmlparserOptions: (Object) options for htmlparser2. defaults to {decodeEntities: false}
function haq(html, params, options) {
  options = options || {};
  defaults(options, {
    existing: 'append',
    htmlparserOptions: {decodeEntities: false},
    strict: true
  });

  const $ = cheerio.load(html, options.htmlparserOptions);

  $('a').each((i, elem) => {
    $(elem).attr('href', (i, value) => modifyUrl(value, params, options));
  });

  return $.html();
}


module.exports = haq;
