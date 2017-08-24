'use strict'

// Expose base module and add dom rendering.
module.exports = exports = require('./base')
var doc = document
var page = exports.prototype

/**
 * Updates the document with the current page options.
 * This will algorithm will avoid re-inserting nodes to prevent any browser issues.
 */
page.render = function () {
  this._renderTitle()
  this._renderRoots()
  this._renderHead()
}

/**
 * Updates the document title.
 */
page._renderTitle = function () {
  if (doc.title !== this._title) {
    doc.title = this._title
  }
}

/**
 * Updates attributes on root elements.
 */
page._renderRoots = function () {
  var tags = this._rootTags
  if (tags.html) updateAttrs(doc.documentElement, tags.html)
  if (tags.body) updateAttrs(doc.body, tags.body)
}

/**
 * Updates the head elements children.
 */
page._renderHead = function () {
  var tags = this._headTags
  var keys = this._keys
  var head = doc.head
  var $next = head.firstChild
  var $el, key, index, attrs, attr, val, nodeName
  var updated = {}

  while ($next) {
    $el = $next
    $next = $el.nextSibling
    nodeName = $el.nodeName.toLowerCase()
    key = this._getKey(nodeName, $el.attributes)
    if (!key) continue

    attrs = tags[keys[key]]
    if (attrs) {
      updated[key] = true
      updateAttrs($el, attrs)
    } else {
      head.removeChild($el)
    }
  }

  // Add new nodes.
  for (key in keys) {
    if (updated[key]) continue
    $el = doc.createElement(key.slice(0, key.indexOf('[')))
    index = keys[key]
    attrs = tags[index]
    for (attr in attrs) {
      val = attrs[attr]
      if (
        val == null ||
        val === false
      ) continue

      if (val === true) val = ''
      $el.setAttribute(attr, val)
    }

    // Insert new element at proper position.
    head.insertBefore($el, head.children[index + 1])
  }
}

/**
 * @private
 * Updates an elements attributes.
 *
 * @param {HTMLEntity} - the html element to update.
 * @param {object} attrs - the new attributes for the element.
 */
function updateAttrs ($el, attrs) {
  var $attrs = $el.attributes
  var attr, val

  // Add new attributes.
  for (attr in attrs) {
    val = attrs[attr]
    if (val === true) val = ''
    if (
      val == null ||
      val === false ||
      $el.getAttribute(attr) === val
    ) continue

    $el.setAttribute(attr, val)
  }

  // Remove old ones.
  for (var i = $attrs.length; i--;) {
    attr = $attrs[i].name
    val = attrs[attr]
    if (
      val != null &&
      val !== false
    ) continue

    $el.removeAttribute(attr)
  }
}
