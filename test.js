'use strict';

const haq = require('./index');

const assert = require('assert');

const html = '<html><head></head><body><a href="http://example.com/?foo=bar">Url Test</a></body></html>';
const htmlRelative = '<html><head></head><body><a href="/">Url Test</a></body></html>';

const params = {foo: 'baz'};

const resultOverwrite = haq(html, params, {existing: 'overwrite'});
const resultAppend = haq(html, params, {existing: 'append'});
const resultIgnore = haq(html, params, {existing: 'ignore'});

const resultRelative = haq(htmlRelative, params, {base: 'http://example.com'});

assert.strictEqual(resultOverwrite, '<html><head></head><body><a href="http://example.com/?foo=baz">Url Test</a></body></html>');
assert.strictEqual(resultAppend, '<html><head></head><body><a href="http://example.com/?foo=bar&foo=baz">Url Test</a></body></html>');
assert.strictEqual(resultIgnore, '<html><head></head><body><a href="http://example.com/?foo=bar">Url Test</a></body></html>');
assert.strictEqual(resultRelative, '<html><head></head><body><a href="http://example.com/?foo=baz">Url Test</a></body></html>');
