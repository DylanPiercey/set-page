'use strict'

// List of indexable keys for specific types of elements.
var KEYS = {
  base: ['href'],
  script: ['type', 'src'],
  link: ['href', 'rel', 'media'],
  meta: ['name', 'property', 'http-equiv', 'charset']
}
var ROOT_TAGS = ['html', 'body']
var HEAD_TAGS = Object.keys(KEYS)
var ALL_TAGS = ROOT_TAGS.concat(HEAD_TAGS, 'title')
var head = Head.prototype

// Expose base class.
module.exports = exports = Head
// List of supported tags handled by set-head.
exports.TAGS = ALL_TAGS

/**
 * @constructor
 * Creates a new renderable <head>.
 */
function Head () {
  this._headTags = []
  this._rootTags = {}
  this._keys = Object.create(null)
  this._title = ''
  this._titleIndex = 0
}

/**
 * Saves document title to be rendered.
 *
 * @param {string} title - the new document title.
 * @return {this}
 */
head.title = function (title) {
  this._title = title
  this._titleIndex = this._headTags.length
  return this
}

/**
 * @private
 * Adds a new custom node to the list of head items to be updated.
 *
 * @param {string} name - the name of the tag.
 * @param {object} attrs - the html attributes for the tag.
 * @return {this}
 */
head._tag = function (name, attrs) {
  var key = this._getKey(name, attrs)
  var keys = this._keys
  var tags = this._headTags
  var index = keys[key] = keys[key] || tags.length
  tags.splice(index, 1, attrs)
  return this
}

/**
 * @private
 * Returns a valid css selector based on keys for a specific tag name.
 *
 * @param {string} tag - the tag name of the element.
 * @param {object} attrs - attributes containing keys for the element.
 * @return {string}
 */
head._getKey = function (tag, attrs) {
  var keys = KEYS[tag]
  if (!keys) return

  var str = tag
  var i = keys.length
  var key, val
  for (;i--;) {
    key = keys[i]
    val = attrs[key]
    str += '[' + key + (val ? '=' + JSON.stringify(val.value || val) : '') + ']'
  }

  return str
}

// Add methods for each root tag.
ROOT_TAGS.forEach(function (tag) {
  head[tag] = function (attrs) {
    var tags = this._rootTags
    var prev = tags[tag] = tags[tag] || {}
    for (var key in attrs) prev[key] = attrs[key]
    return this
  }
})

// Add methods for each head tag.
HEAD_TAGS.forEach(function (tag) {
  head[tag] = function (attrs) {
    return this._tag(tag, attrs)
  }
})
