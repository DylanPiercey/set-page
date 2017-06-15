'use strict'

var assert = require('assert')
var PageHTML = require('../src/index')
var PageDocument = require('../src/browser')

describe('Page', function () {
  describe('server', function () {
    it('should set <title>', function () {
      var page = new PageHTML()
      page.title('Hello')
      assert.equal(page.renderToString(), '<head><title>Hello</title></head>')
    })

    it('should override <title>', function () {
      var page = new PageHTML()
      page
        .title('Hello')
        .title('Hello 2')
      assert.equal(page.renderToString(), '<head><title>Hello 2</title></head>')
    })

    it('should set <link>', function () {
      var page = new PageHTML()
      page.link({ rel: 'stylesheet', href: 'index.css' })
      assert.equal(page.renderToString(), '<head><link rel="stylesheet" href="index.css"></head>')
    })

    it('should override <link>', function () {
      var page = new PageHTML()
      page
        .link({ rel: 'stylesheet', href: 'index.css' })
        .link({ rel: 'stylesheet', href: 'index.css', custom: 'test' })
      assert.equal(page.renderToString(), '<head><link rel="stylesheet" href="index.css" custom="test"></head>')
    })

    it('should append <link>', function () {
      var page = new PageHTML()
      page
        .link({ rel: 'stylesheet', href: 'index.css' })
        .link({ rel: 'preload', href: 'index.css' })
        .link({ rel: 'stylesheet', href: 'index2.css' })
      assert.equal(page.renderToString(), '<head><link rel="stylesheet" href="index.css"><link rel="preload" href="index.css"><link rel="stylesheet" href="index2.css"></head>')
    })

    it('should set <base>', function () {
      var page = new PageHTML()
      page.base({ href: '/admin', target: '_blank' })
      assert.equal(page.renderToString(), '<head><base href="/admin" target="_blank"></head>')
    })

    it('should override <base>', function () {
      var page = new PageHTML()
      page
        .base({ href: '/admin', target: '_blank' })
        .base({ href: '/admin', target: '_self' })
      assert.equal(page.renderToString(), '<head><base href="/admin" target="_self"></head>')
    })

    it('should append <base>', function () {
      var page = new PageHTML()
      page
        .base({ href: '/admin', target: '_blank' })
        .base({ href: '/admin2', target: '_self' })
      assert.equal(page.renderToString(), '<head><base href="/admin" target="_blank"><base href="/admin2" target="_self"></head>')
    })

    it('should set <meta>', function () {
      var page = new PageHTML()
      page.meta({ name: 'description', content: 'Hello' })
      assert.equal(page.renderToString(), '<head><meta name="description" content="Hello"></head>')
    })

    it('should override <meta>', function () {
      var page = new PageHTML()
      page
        .meta({ name: 'description', content: 'Hello' })
        .meta({ name: 'description', content: 'Hello 2' })
      assert.equal(page.renderToString(), '<head><meta name="description" content="Hello 2"></head>')
    })

    it('should append <meta>', function () {
      var page = new PageHTML()
      page
        .meta({ name: 'description', content: 'Hello' })
        .meta({ name: 'something', content: 'Hello 2' })
      assert.equal(page.renderToString(), '<head><meta name="description" content="Hello"><meta name="something" content="Hello 2"></head>')
    })

    it('should set <script>', function () {
      var page = new PageHTML()
      page.script({ src: 'index.js' })
      assert.equal(page.renderToString(), '<head><script src="index.js"></script></head>')
    })

    it('should override <script>', function () {
      var page = new PageHTML()
      page
        .script({ src: 'index.js' })
        .script({ src: 'index.js', async: true })
      assert.equal(page.renderToString(), '<head><script src="index.js" async></script></head>')
    })

    it('should append <script>', function () {
      var page = new PageHTML()
      page
        .script({ src: 'index.js' })
        .script({ src: 'index2.js', async: true })
      assert.equal(page.renderToString(), '<head><script src="index.js"></script><script src="index2.js" async></script></head>')
    })

    it('should set all', function () {
      var page = new PageHTML()
      page
        .title('Hello')
        .link({ rel: 'stylesheet', href: 'index.css' })
        .base({ href: '/admin', target: '_blank' })
        .meta({ name: 'description', content: 'Hello' })
        .script({ src: 'index.js' })
      assert.equal(page.renderToString(), '<head><title>Hello</title><link rel="stylesheet" href="index.css"><base href="/admin" target="_blank"><meta name="description" content="Hello"><script src="index.js"></script></head>')
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
      assert.equal(document.head.outerHTML, '<head><title>Hello</title></head>')
    })

    it('should override <title>', function () {
      var page = new PageDocument()
      page
        .title('Hello')
        .title('Hello 2')
      page.render()
      assert.equal(document.head.outerHTML, '<head><title>Hello 2</title></head>')
    })

    it('should set <link>', function () {
      var page = new PageDocument()
      page.link({ rel: 'stylesheet', href: 'index.css' })
      page.render()
      assert.equal(document.head.outerHTML, '<head><link rel="stylesheet" href="index.css"></head>')
    })

    it('should override <link>', function () {
      var page = new PageDocument()
      page
        .link({ rel: 'stylesheet', href: 'index.css' })
        .link({ rel: 'stylesheet', href: 'index.css', custom: 'test' })
      page.render()
      assert.equal(document.head.outerHTML, '<head><link rel="stylesheet" href="index.css" custom="test"></head>')
    })

    it('should append <link>', function () {
      var page = new PageDocument()
      page
        .link({ rel: 'stylesheet', href: 'index.css' })
        .link({ rel: 'preload', href: 'index.css' })
        .link({ rel: 'stylesheet', href: 'index2.css' })
      page.render()
      assert.equal(document.head.outerHTML, '<head><link rel="stylesheet" href="index.css"><link rel="preload" href="index.css"><link rel="stylesheet" href="index2.css"></head>')
    })

    it('should set <base>', function () {
      var page = new PageDocument()
      page.base({ href: '/admin', target: '_blank' })
      page.render()
      assert.equal(document.head.outerHTML, '<head><base href="/admin" target="_blank"></head>')
    })

    it('should override <base>', function () {
      var page = new PageDocument()
      page
        .base({ href: '/admin', target: '_blank' })
        .base({ href: '/admin', target: '_self' })
      page.render()
      assert.equal(document.head.outerHTML, '<head><base href="/admin" target="_self"></head>')
    })

    it('should append <base>', function () {
      var page = new PageDocument()
      page
        .base({ href: '/admin', target: '_blank' })
        .base({ href: '/admin2', target: '_self' })
      page.render()
      assert.equal(document.head.outerHTML, '<head><base href="/admin" target="_blank"><base href="/admin2" target="_self"></head>')
    })

    it('should set <meta>', function () {
      var page = new PageDocument()
      page.meta({ name: 'description', content: 'Hello' })
      page.render()
      assert.equal(document.head.outerHTML, '<head><meta name="description" content="Hello"></head>')
    })

    it('should override <meta>', function () {
      var page = new PageDocument()
      page
        .meta({ name: 'description', content: 'Hello' })
        .meta({ name: 'description', content: 'Hello 2' })
      page.render()
      assert.equal(document.head.outerHTML, '<head><meta name="description" content="Hello 2"></head>')
    })

    it('should append <meta>', function () {
      var page = new PageDocument()
      page
        .meta({ name: 'description', content: 'Hello' })
        .meta({ name: 'something', content: 'Hello 2' })
      page.render()
      assert.equal(document.head.outerHTML, '<head><meta name="description" content="Hello"><meta name="something" content="Hello 2"></head>')
    })

    it('should set <script>', function () {
      var page = new PageDocument()
      page.script({ src: 'index.js' })
      page.render()
      assert.equal(document.head.outerHTML, '<head><script src="index.js"></script></head>')
    })

    it('should override <script>', function () {
      var page = new PageDocument()
      page
        .script({ src: 'index.js' })
        .script({ src: 'index.js', async: true })
      page.render()
      assert.equal(document.head.outerHTML, '<head><script src="index.js" async=""></script></head>')
    })

    it('should append <script>', function () {
      var page = new PageDocument()
      page
        .script({ src: 'index.js' })
        .script({ src: 'index2.js', async: true })
      page.render()
      assert.equal(document.head.outerHTML, '<head><script src="index.js"></script><script src="index2.js" async=""></script></head>')
    })

    it('should set all', function () {
      var page = new PageDocument()
      page
        .title('Hello')
        .link({ rel: 'stylesheet', href: 'index.css' })
        .base({ href: '/admin', target: '_blank' })
        .meta({ name: 'description', content: 'Hello' })
        .script({ src: 'index.js' })
      page.render()
      assert.equal(document.head.outerHTML, '<head><title>Hello</title><link rel="stylesheet" href="index.css"><base href="/admin" target="_blank"><meta name="description" content="Hello"><script src="index.js"></script></head>')
    })
  })
})
