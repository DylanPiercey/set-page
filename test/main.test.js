'use strict'

var assert = require('assert')
var PageHTML = require('../src/index')
var PageDocument = require('../src/browser')

describe('Page', function () {
  describe('server', function () {
    it('should set <title>', function () {
      var page = new PageHTML()
      page.title('Hello')
      assert.equal(page.renderToString(), '<title>Hello</title>')
    })

    it('should override <title>', function () {
      var page = new PageHTML()
      page
        .title('Hello')
        .title('Hello 2')
      assert.equal(page.renderToString(), '<title>Hello 2</title>')
    })

    it('should set <link>', function () {
      var page = new PageHTML()
      page.link({ rel: 'stylesheet', href: 'index.css' })
      assert.equal(page.renderToString(), '<link rel="stylesheet" href="index.css">')
    })

    it('should override <link>', function () {
      var page = new PageHTML()
      page
        .link({ rel: 'stylesheet', href: 'index.css' })
        .link({ rel: 'stylesheet', href: 'index.css', custom: 'test' })
      assert.equal(page.renderToString(), '<link rel="stylesheet" href="index.css" custom="test">')
    })

    it('should append <link>', function () {
      var page = new PageHTML()
      page
        .link({ rel: 'stylesheet', href: 'index.css' })
        .link({ rel: 'preload', href: 'index.css' })
        .link({ rel: 'stylesheet', href: 'index2.css' })
      assert.equal(page.renderToString(), '<link rel="stylesheet" href="index.css"><link rel="preload" href="index.css"><link rel="stylesheet" href="index2.css">')
    })

    it('should set <base>', function () {
      var page = new PageHTML()
      page.base({ href: '/admin', target: '_blank' })
      assert.equal(page.renderToString(), '<base href="/admin" target="_blank">')
    })

    it('should override <base>', function () {
      var page = new PageHTML()
      page
        .base({ href: '/admin', target: '_blank' })
        .base({ href: '/admin', target: '_self' })
      assert.equal(page.renderToString(), '<base href="/admin" target="_self">')
    })

    it('should append <base>', function () {
      var page = new PageHTML()
      page
        .base({ href: '/admin', target: '_blank' })
        .base({ href: '/admin2', target: '_self' })
      assert.equal(page.renderToString(), '<base href="/admin" target="_blank"><base href="/admin2" target="_self">')
    })

    it('should set <meta>', function () {
      var page = new PageHTML()
      page.meta({ name: 'description', content: 'Hello' })
      assert.equal(page.renderToString(), '<meta name="description" content="Hello">')
    })

    it('should override <meta>', function () {
      var page = new PageHTML()
      page
        .meta({ name: 'description', content: 'Hello' })
        .meta({ name: 'description', content: 'Hello 2' })
      assert.equal(page.renderToString(), '<meta name="description" content="Hello 2">')
    })

    it('should append <meta>', function () {
      var page = new PageHTML()
      page
        .meta({ name: 'description', content: 'Hello' })
        .meta({ name: 'something', content: 'Hello 2' })
      assert.equal(page.renderToString(), '<meta name="description" content="Hello"><meta name="something" content="Hello 2">')
    })

    it('should set <script>', function () {
      var page = new PageHTML()
      page.script({ src: 'index.js' })
      assert.equal(page.renderToString(), '<script src="index.js"></script>')
    })

    it('should override <script>', function () {
      var page = new PageHTML()
      page
        .script({ src: 'index.js' })
        .script({ src: 'index.js', async: true })
      assert.equal(page.renderToString(), '<script src="index.js" async></script>')
    })

    it('should append <script>', function () {
      var page = new PageHTML()
      page
        .script({ src: 'index.js' })
        .script({ src: 'index2.js', async: true })
      assert.equal(page.renderToString(), '<script src="index.js"></script><script src="index2.js" async></script>')
    })

    it('should set all', function () {
      var page = new PageHTML()
      page
        .title('Hello')
        .link({ rel: 'stylesheet', href: 'index.css' })
        .base({ href: '/admin', target: '_blank' })
        .meta({ name: 'description', content: 'Hello' })
        .script({ src: 'index.js' })
      assert.equal(page.renderToString(), '<title>Hello</title><link rel="stylesheet" href="index.css"><base href="/admin" target="_blank"><meta name="description" content="Hello"><script src="index.js"></script>')
    })
  })

  describe('browser', function () {
    beforeEach(function () {
      document.head.innerHTML = ''
    })

    it('should set <title>', function () {
      var page = new PageDocument()
      page.title('Hello')
      page.render()
      assert.equal(document.head.innerHTML, '<title>Hello</title>')
    })

    it('should override <title>', function () {
      var page = new PageDocument()
      page
        .title('Hello')
        .title('Hello 2')
      page.render()
      assert.equal(document.head.innerHTML, '<title>Hello 2</title>')
    })

    it('should set <link>', function () {
      var page = new PageDocument()
      page.link({ rel: 'stylesheet', href: 'index.css' })
      page.render()
      assert.equal(document.head.innerHTML, '<link rel="stylesheet" href="index.css">')
    })

    it('should override <link>', function () {
      var page = new PageDocument()
      page
        .link({ rel: 'stylesheet', href: 'index.css' })
        .link({ rel: 'stylesheet', href: 'index.css', custom: 'test' })
      page.render()
      assert.equal(document.head.innerHTML, '<link rel="stylesheet" href="index.css" custom="test">')
    })

    it('should append <link>', function () {
      var page = new PageDocument()
      page
        .link({ rel: 'stylesheet', href: 'index.css' })
        .link({ rel: 'preload', href: 'index.css' })
        .link({ rel: 'stylesheet', href: 'index2.css' })
      page.render()
      assert.equal(document.head.innerHTML, '<link rel="stylesheet" href="index.css"><link rel="preload" href="index.css"><link rel="stylesheet" href="index2.css">')
    })

    it('should set <base>', function () {
      var page = new PageDocument()
      page.base({ href: '/admin', target: '_blank' })
      page.render()
      assert.equal(document.head.innerHTML, '<base href="/admin" target="_blank">')
    })

    it('should override <base>', function () {
      var page = new PageDocument()
      page
        .base({ href: '/admin', target: '_blank' })
        .base({ href: '/admin', target: '_self' })
      page.render()
      assert.equal(document.head.innerHTML, '<base href="/admin" target="_self">')
    })

    it('should append <base>', function () {
      var page = new PageDocument()
      page
        .base({ href: '/admin', target: '_blank' })
        .base({ href: '/admin2', target: '_self' })
      page.render()
      assert.equal(document.head.innerHTML, '<base href="/admin" target="_blank"><base href="/admin2" target="_self">')
    })

    it('should set <meta>', function () {
      var page = new PageDocument()
      page.meta({ name: 'description', content: 'Hello' })
      page.render()
      assert.equal(document.head.innerHTML, '<meta name="description" content="Hello">')
    })

    it('should override <meta>', function () {
      var page = new PageDocument()
      page
        .meta({ name: 'description', content: 'Hello' })
        .meta({ name: 'description', content: 'Hello 2' })
      page.render()
      assert.equal(document.head.innerHTML, '<meta name="description" content="Hello 2">')
    })

    it('should append <meta>', function () {
      var page = new PageDocument()
      page
        .meta({ name: 'description', content: 'Hello' })
        .meta({ name: 'something', content: 'Hello 2' })
      page.render()
      assert.equal(document.head.innerHTML, '<meta name="description" content="Hello"><meta name="something" content="Hello 2">')
    })

    it('should set <script>', function () {
      var page = new PageDocument()
      page.script({ src: 'index.js' })
      page.render()
      assert.equal(document.head.innerHTML, '<script src="index.js"></script>')
    })

    it('should override <script>', function () {
      var page = new PageDocument()
      page
        .script({ src: 'index.js' })
        .script({ src: 'index.js', async: true })
      page.render()
      assert.equal(document.head.innerHTML, '<script src="index.js" async=""></script>')
    })

    it('should append <script>', function () {
      var page = new PageDocument()
      page
        .script({ src: 'index.js' })
        .script({ src: 'index2.js', async: true })
      page.render()
      assert.equal(document.head.innerHTML, '<script src="index.js"></script><script src="index2.js" async=""></script>')
    })

    it('should set all', function () {
      var page = new PageDocument()
      page
        .title('Hello')
        .link({ rel: 'stylesheet', href: 'index.css' })
        .base({ href: '/admin', target: '_blank' })
        .meta({ name: 'description', content: 'Hello' })
        .script({ src: 'index.js' })
        .render()
      assert.equal(document.head.innerHTML, '<title>Hello</title><link rel="stylesheet" href="index.css"><base href="/admin" target="_blank"><meta name="description" content="Hello"><script src="index.js"></script>')

      page
        .title('Hello')
        .link({ rel: 'stylesheet', href: 'index.css' })
        .base({ href: '/admin', target: '_blank' })
        .meta({ name: 'extra', content: 'Hello' })
        .meta({ name: 'description', content: 'Hello' })
        .script({ src: 'index.js' })
        .render()
      assert.equal(document.head.innerHTML, '<title>Hello</title><link rel="stylesheet" href="index.css"><base href="/admin" target="_blank"><meta name="extra" content="Hello"><meta name="description" content="Hello"><script src="index.js"></script>')
    })
  })
})
