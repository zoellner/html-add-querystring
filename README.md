# html-add-querystring
Add querystring parameters to all links in html code

## Install
`npm i html-add-querystring`

## Use

```
const haq = require('html-add-querystring');

const html = '<html><body><a href="http://example.com">Test</a></body></html>';
const params = {foo: 'bar'};
const result = haq(html, params);
// result is '<html><head></head><body><a href="http://example.com/?foo=bar">Test</a></body></html>'

```

Note that the resulting html is somewhat cleaned up (head added in example aboce) because of the underlying use of [cheerio](https://github.com/cheeriojs/cheerio).


A good use case for this package is to add UTM Parameters to links in emails.
If you process includes rendering emails from templates (potentially pug or others), inlining css with [Juice](https://github.com/Automattic/juice), then this is for you. Simply feed the resulting html through this package with the appropriate utm parameters and all links in the email will have UTM Parameters.

If you're using "invalid urls", e.g. placeholder variables, you can pass an options object `{strict: false}` to haq as third parameter to simply return invalid urls instead of throwing an error.

## Changelog
### [1.3.0] - 2019-08-26
- (dev) dependency updates
### [1.2.0] - 2019-05-14
- dependency updates
### [1.1.0] - 2018-08-22
#### Added
- `strict: false` option
#### Changed
- updated dev dependencies

## License
MIT
