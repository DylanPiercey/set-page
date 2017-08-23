<h1 align="center">
  <!-- Logo -->
  SET-HEAD
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
  <a href="https://npmjs.org/package/set-head">
    <img src="https://img.shields.io/npm/v/set-head.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/set-head">
    <img src="https://img.shields.io/npm/dm/set-head.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/DylanPiercey/set-head">
    <img src="https://img.shields.io/gitter/room/DylanPiercey/set-head.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

Isomorphic `<head>` updating and rendering utility.

# Installation

```console
npm install set-head
```

# Example

```javascript
import Head from 'set-head'

// Create a new head element, this should be done once per request.
const head = new Head()

// Add elements to head via method chaining.
head
  .meta({ charset: 'utf8' })
  .title('My App')
  .base({ href: '/admin/' })
  .meta({ name: 'description' content: 'Cool stuff' })
  .link({ rel: 'stylesheet', href: 'index.css' })
  .script({ async: true, src: 'index.js' })

// You can also set attributes on the html and body elements.
head
  .html({ lang: 'en' })
  .body({ class: 'loading' })
```

## Overriding

`set-head` makes overriding default header elements easy. If you invoke head again later it will replace any existing similar element.
The module uses special keying scheme found in [`./src/base.js`](https://github.com/DylanPiercey/set-head/blob/master/src/base.js#L4) under `const KEYS` to understand which elements to replace and which to add.

For the `html` and `body` any provided attributes are merged (properties are not concatenated).

```js
// Setting defaults somewhere (perhaps in a middleware or plugin.)
head
  .title('My App')
  .meta({ name: 'author', content: 'Dylan Piercey' })
  .meta({ name: 'description', content: 'Welcome to the site' })
  .link({ rel: 'stylesheet', href: 'index.css' })

// The later in a specific route you can continue chaining like so to override.
head
  .title('My App > My sub page')
  .meta({ name: 'description', content: 'Sub page description' })

// And then if we render we get (formatted for clarity)
head.renderToString().head === html`
  <title>My App > My sub page</title>
  <meta name="author" content="Dylan Piercey">
  <meta name="description" content="Sub page description">
  <link rel="stylesheet" href="index.css">
`
```


## Browser Rendering

To render to the browser, simply invoke 'render' after all of the head elements have been set.

```js
head.render()
```

## Server Rendering

Server side rendering is accomplished by invoking `renderToString` after all of the head elements have been set.

```js
export default (req, res) => {
  const parts = head.renderToString()
  res.end(`
    <!doctype html>
    <html${parts.htmlAttributes}>
      <head>${parts.head}</head>
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
