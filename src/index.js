'use strict'

var OPEN_TAGS = { script: true }
var escape = require('escape-html')
var Page = module.exports = require('./base')

/**
 * Takes the current <head> settings and renders all of the children to an html string.
 *
 * @return {string}
 */
Page.prototype.renderToString = function () {
  var selectors = this._selectors
  var parts = []
  var tag

  for (var selector in selectors) {
    tag = selector.slice(0, selector.indexOf('['))
    parts.push(toHTML(tag, selectors[selector]))
  }

  // Add title manually at proper index.
  if (this._title) parts.splice(this._titleIndex, 0, '<title>' + this._title + '</title>')

  this._reset()

  return parts.join('')
}

/**
 * @private
 * Builds to html for a tag + attrs object.
 *
 * @param {string} tag - the tag name for the element.
 * @param {object} attrs - the attributes for the element.
 * @return {string}
 */
function toHTML (tag, attrs) {
  var key, attr
  var attributes = ''

  // Build attributes string.
  for (key in attrs) {
    attr = attrs[key]
    if (attr == null || attr === false) continue
    if (attr === true) attributes += ' ' + key
    else attributes += ' ' + key + '="' + escape(attr) + '"'
  }

  return (
    '<' + tag + attributes + '>' + (
      OPEN_TAGS[tag] ? '</' + tag + '>' : ''
    )
  )
}
