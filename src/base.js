'use strict'

// List of indexable keys for specific types of elements.
var KEYS = {
  base: ['href'],
  link: ['href', 'rel'],
  script: ['type', 'src'],
  meta: ['name', 'property', 'http-equiv', 'charset']
}

// Expose base class.
module.exports = Head

/**
 * @constructor
 * Creates a new renderable <head>.
 */
function Head () {
  this._reset()
}

/**
 * Saves document title to be rendered.
 *
 * @param {string} title - the new document title.
 * @return {this}
 */
Head.prototype.title = function (title) {
  this._title = title
  this._titleIndex = this._index++
  return this
}

/**
 * Saves a <base> element to be rendered.
 *
 * @param {object} attrs - the attributes for the element.
 * @return {this}
 */
Head.prototype.base = function (attrs) {
  return this._tag('base', attrs)
}

/**
 * Saves a <link> element to be rendered.
 *
 * @param {object} attrs - the attributes for the element.
 * @return {this}
 */
Head.prototype.link = function (attrs) {
  return this._tag('link', attrs)
}

/**
 * Saves a <script> element to be rendered.
 *
 * @param {object} attrs - the attributes for the element.
 * @return {this}
 */
Head.prototype.script = function (attrs) {
  return this._tag('script', attrs)
}

/**
 * Saves a <meta> element to be rendered.
 *
 * @param {object} attrs - the attributes for the element.
 * @return {this}
 */
Head.prototype.meta = function (attrs) {
  return this._tag('meta', attrs)
}

/**
 * @private
 * Adds a new custom node to the list of head items to be updated.
 *
 * @param {string} name - the name of the tag.
 * @param {object} attrs - the html attributes for the tag.
 * @return {this}
 */
Head.prototype._tag = function (name, attrs) {
  var selector = this._getSelector(name, attrs)
  var selectors = this._selectors

  if (!selectors[selector]) this._index++
  selectors[selector] = attrs
  return this
}

/**
 * @private
 * Resets all options for the page.
 */
Head.prototype._reset = function () {
  this._title = ''
  this._selectors = {}
  this._index = this._titleIndex = 0
}

/**
 * @private
 * Returns a valid css selector based on keys for a specific tag name.
 *
 * @param {string} tag - the tag name of the element.
 * @param {object} attrs - attributes containing keys for the element.
 * @return {string}
 */
Head.prototype._getSelector = function (tag, attrs) {
  var keys = KEYS[tag]
  if (!keys) return

  var selector = tag
  var i = keys.length
  var key, val
  for (;i--;) {
    key = keys[i]
    val = attrs[key]
    selector += '[' + key + (val ? '=' + JSON.stringify(val) : '') + ']'
  }

  return selector
}
