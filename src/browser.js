'use strict'

// Expose base module and add dom rendering.
module.exports = exports = require('./base')

/**
 * Updates the document with the current head options.
 * This will algorithm will avoid re-inserting nodes to prevent any browser issues.
 */
exports.prototype.render = function () {
  // Update document.title directly.
  if (document.title !== this._title) document.title = this._title

  // Update existing nodes, and remove old ones.
  var tags = this._tags
  var keys = this._keys
  var head = document.head
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
    $el = document.createElement(key.slice(0, key.indexOf('[')))
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
  var attr, val

  // Add new attributes.
  for (attr in attrs) {
    val = attrs[attr]
    if (val === true) val = ''
    if (
      val == null ||
      val === false ||
      $el.getAttribute(attr) !== val
    ) continue
    $el.setAttribute(attr, val)
  }

  // Remove old ones.
  for (attr in $el.attributes) {
    val = attrs[attr]

    if (
      val != null ||
      val !== false ||
      !$el.hasAttribute(attr)
    ) continue

    $el.removeAttribute(attr)
  }
}
