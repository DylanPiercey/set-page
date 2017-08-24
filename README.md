<h1 align="center">
  <!-- Logo -->
  SET-PAGE
  <br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/set-page">
    <img src="https://img.shields.io/npm/v/set-page.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/set-page">
    <img src="https://img.shields.io/npm/dm/set-page.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/DylanPiercey/set-page">
    <img src="https://img.shields.io/gitter/room/DylanPiercey/set-page.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

***Formerly named set-head.***

Framework agnostic, isomorphic `<html>`, `<body` and `<head>` rendering utility.

# Installation

```console
npm install set-page
```

# Example

```javascript
import Page from 'set-page'

// Create a new page element, this should be done once per request.
const page = new Page()

page
  // Set html and body attributes.
  .html({ lang: 'en' })
  .body({ class: 'loading' })
  // Add elements to <head> via method chaining.
  .meta({ charset: 'utf8' })
  .title('My App')
  .base({ href: '/admin/' })
  .meta({ name: 'description' content: 'Cool stuff' })
  .link({ rel: 'stylesheet', href: 'index.css' })
  .script({ async: true, src: 'index.js' })
```

## Overriding

`set-page` makes overriding values easy. If you invoke page again later it will replace any existing similar head element and merge any body or html attributes.

The module uses special keying scheme for head elements found in [`./src/base.js`](https://github.com/DylanPiercey/set-page/blob/master/src/base.js#L4) under `const KEYS` to understand which elements to replace and which to add. Ultimately this allows for efficient re-ordering and rendering without any 'key' non-sense.

```js
// Setting defaults somewhere (perhaps in a middleware or plugin.)
page
  .title('My App')
  .meta({ name: 'author', content: 'Dylan Piercey' })
  .meta({ name: 'description', content: 'Welcome to the site' })
  .link({ rel: 'stylesheet', href: '/app.css' })
  .script({ async: true, src: '/app.js' })

// The later in a specific route you can continue chaining like so to override.
page
  .title('My App > My sub page')
  .meta({ name: 'description', content: 'Sub page description' })
```


## Browser Rendering

To render to the browser, simply invoke 'render' after all setting up the page.

```js
page.render()
```

## Server Rendering

Server side rendering is accomplished by invoking `renderToString` after setting up the page.

```js
export default (req, res) => {
  const parts = page.renderToString()
  res.end(`
    <!doctype html>
    <html${parts.htmlAttributes}>
      <page>${parts.head}</page>
      <body${parts.bodyAttributes}>
        ...
      </body>
    </html>
  `)
}
```

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
