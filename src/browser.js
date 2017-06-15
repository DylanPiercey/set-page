'use strict'

var Page = module.exports = require('./base')

/**
 * Updates the document with the current head options.
 * This will algorithm will avoid re-inserting nodes to prevent any browser issues.
 */
Page.prototype.render = function () {
  // Update document.title directly.
  if (document.title !== this._title) document.title = this._title

  // Update existing nodes, and remove old ones.
  var selectors = this._selectors
  var head = document.head
  var $next = head.firstChild
  var $el, selector, attrs, attr, val, nodeName
  var updated = {}

  while ($next) {
    $el = $next
    $next = $el.nextSibling
    nodeName = $el.nodeName.toLowerCase()
    selector = this._getSelector(nodeName, $el.attributes)
    if (!selector) continue

    attrs = selectors[selector]
    if (attrs) {
      updated[selector] = true
      updateAttrs($el, attrs)
    } else {
      head.removeChild($el)
    }
  }

  // Add new nodes.
  for (selector in selectors) {
    if (updated[selector]) continue
    $el = document.createElement(selector.slice(0, selector.indexOf('[')))
    attrs = selectors[selector]
    for (attr in attrs) {
      val = attrs[attr]
      if (
        val == null ||
        val === false
      ) continue

      if (val === true) val = ''
      $el.setAttribute(attr, val)
    }

    head.appendChild($el)
  }

  // Reset all tags
  this._reset()
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
