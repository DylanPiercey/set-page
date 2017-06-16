'use strict'

// List of indexable keys for specific types of elements.
var KEYS = {
  base: ['href'],
  script: ['type', 'src'],
  link: ['href', 'rel', 'media'],
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
  this._titleIndex = this._tags.length
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
  var key = this._getKey(name, attrs)
  var keys = this._keys
  var tags = this._tags
  var index = keys[key] = keys[key] || tags.length
  tags.splice(index, 1, attrs)
  return this
}

/**
 * @private
 * Resets all options for the page.
 */
Head.prototype._reset = function () {
  this._tags = []
  this._keys = Object.create(null)
  this._title = ''
  this._titleIndex = 0
}

/**
 * @private
 * Returns a valid css selector based on keys for a specific tag name.
 *
 * @param {string} tag - the tag name of the element.
 * @param {object} attrs - attributes containing keys for the element.
 * @return {string}
 */
Head.prototype._getKey = function (tag, attrs) {
  var keys = KEYS[tag]
  if (!keys) return

  var str = tag
  var i = keys.length
  var key, val
  for (;i--;) {
    key = keys[i]
    val = attrs[key]
    str += '[' + key + (val ? '=' + JSON.stringify(val) : '') + ']'
  }

  return str
}
