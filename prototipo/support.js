// Runtime mínimo para abrir os arquivos .dc.html fora do Claude Design.
// Suporta {{buracos}}, <sc-for>, <sc-if>, eventos (onClick, onChange) e setState.
(function () {
  var inst, tpl, root;

  window.DCLogic = class {
    constructor(p) { this.props = p || {}; this.state = {}; }
    setState(p) {
      this.state = Object.assign({}, this.state, typeof p === 'function' ? p(this.state) : p);
      draw();
    }
  };

  function lookup(path, scope) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    if (/^-?\d/.test(path)) return Number(path);
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, scope);
  }

  function interp(str, scope) {
    var w = str.match(/^\s*\{\{([^}]+)\}\}\s*$/);
    if (w) return { whole: true, v: lookup(w[1], scope) };
    return {
      whole: false,
      v: str.replace(/\{\{([^}]+)\}\}/g, function (m, p) { var v = lookup(p, scope); return v == null ? '' : String(v); })
    };
  }

  function render(nodes, scope) {
    var out = [];
    Array.prototype.forEach.call(nodes, function (n) {
      if (n.nodeType === 3) {
        var r = interp(n.textContent, scope);
        out.push(document.createTextNode(r.whole ? (r.v == null ? '' : String(r.v)) : r.v));
        return;
      }
      if (n.nodeType !== 1) return;
      var tag = n.localName;
      if (tag === 'sc-for') {
        var list = lookup(n.getAttribute('list').replace(/[{}]/g, ''), scope) || [];
        var as = n.getAttribute('as');
        list.forEach(function (it, i) {
          var s = Object.assign({}, scope); s[as] = it; s.$index = i;
          out.push.apply(out, render(n.childNodes, s));
        });
        return;
      }
      if (tag === 'sc-if') {
        if (lookup(n.getAttribute('value').replace(/[{}]/g, ''), scope)) out.push.apply(out, render(n.childNodes, scope));
        return;
      }
      var el = document.createElementNS(n.namespaceURI, tag);
      Array.prototype.forEach.call(n.attributes, function (a) {
        if (a.name.indexOf('hint-') === 0) return;
        var r = interp(a.value, scope);
        if (r.whole) {
          if (typeof r.v === 'function') {
            if (a.name.indexOf('on') === 0) el.addEventListener(a.name.slice(2), r.v);
            return;
          }
          if (r.v === false || r.v == null) return;
          el.setAttribute(a.name, r.v === true ? '' : String(r.v));
        } else {
          el.setAttribute(a.name, r.v);
        }
      });
      render(n.childNodes, scope).forEach(function (c) { el.appendChild(c); });
      out.push(el);
    });
    return out;
  }

  function draw() {
    if (!root) return;
    var nodes = render(tpl.childNodes, inst.renderVals());
    root.replaceChildren.apply(root, nodes);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var st = document.createElement('style');
    st.textContent = [400, 500, 600, 700, 800].map(function (w) {
      return "@font-face{font-family:'Outfit';font-weight:" + w + ";src:url(fonts/outfit-latin-" + w + "-normal.woff2) format('woff2')}";
    }).join('') + 'body{display:flex;justify-content:center;background:#1E1E1E;min-height:100vh}';
    document.head.appendChild(st);

    var scr = document.querySelector('script[data-dc-script]');
    var C = new Function('DCLogic', scr.textContent + '\n;return Component;')(window.DCLogic);
    inst = new C({});
    var q = new URLSearchParams(location.search).get('state');
    if (q) inst.state = Object.assign({}, inst.state, JSON.parse(q));

    var x = document.querySelector('x-dc');
    var h = x.querySelector('helmet');
    if (h) {
      Array.prototype.slice.call(h.children).forEach(function (c) { if (c.localName !== 'link') document.head.appendChild(c); });
      h.remove();
    }
    tpl = x.cloneNode(true);
    root = document.createElement('div');
    x.replaceWith(root);
    draw();
    document.body.setAttribute('data-ready', '1');
  });
})();
