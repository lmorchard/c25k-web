// bling.js
// Borrowed from https://gist.github.com/paulirish/12fb951a8b893a454b32

module.exports = window.$ = document.querySelectorAll.bind(document);
window.$$ = document.querySelector.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
  return this;
}

NodeList.prototype.__proto__ = Array.prototype

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem, i) {
    elem.on(name, fn);
  });
  return this;
}
