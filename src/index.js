'use strict'

var OPEN_TAGS = { script: true }
var escape = require('escape-html')

// Expose base module and add html rendering.
module.exports = exports = require('./base')
var head = exports.prototype

/**
 * Takes the current <head> settings and renders all of the children to an html string.
 *
 * @return {string}
 */
head.renderToString = function () {
  var rootTags = this._rootTags
  var headTags = this._headTags
  var keys = this._keys
  var parts = []
  var tag

  for (var key in keys) {
    tag = key.slice(0, key.indexOf('['))
    parts.push(tagToHtml(tag, headTags[keys[key]]))
  }

  // Add title manually at proper index.
  if (this._title) {
    parts.splice(this._titleIndex, 0, '<title>' + this._title + '</title>')
  }

  return {
    htmlAttributes: attrsToHtml(rootTags.html),
    bodyAttributes: attrsToHtml(rootTags.body),
    head: parts.join('')
  }
}

/**
 * @private
 * Builds to html for a tag + attrs object.
 *
 * @param {string} tag - the tag name for the element.
 * @param {object} attrs - the attributes for the element.
 * @return {string}
 */
function tagToHtml (tag, attrs) {
  return (
    '<' + tag + attrsToHtml(attrs) + '>' + (
      OPEN_TAGS[tag] ? '</' + tag + '>' : ''
    )
  )
}

/**
 * @private
 * Builds to html for an attrs object.
 *
 * @param {object} attrs - the attributes for the element.
 * @return {string}
 */
function attrsToHtml (attrs) {
  var key, attr
  var result = ''

  // Build attributes string.
  for (key in attrs) {
    attr = attrs[key]
    if (attr == null || attr === false) continue
    if (attr === true) result += ' ' + key
    else result += ' ' + key + '="' + escape(attr) + '"'
  }

  return result
}
