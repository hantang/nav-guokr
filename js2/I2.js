/* @generated */
(function(a, b) {
    function t() {
        if (a.GJS_URL) {
            var b = u(a.GJS_URL + "/");
            b.charAt(0) === "/" && b.charAt(1) !== "/" ? i.url = location.protocol + "//" + location.host + b : i.url = b
        } else {
            var c = document.getElementsByTagName("script"),
                d = c[c.length - 1],
                e;
            e = d.hasAttribute ? d.src : d.getAttribute("src", 4), e = e.replace(/\/[^\/]*$/, "") + "/", i.url = e
        }
        i.libUrl = i.url + (a.GJS_LIB_URL || "lib/");
        var f = /^(https?:\/\/[^\/]*)\/?.*$/,
            g = /^(file:\/\/.*)\/.*$/,
            h;
        (h = f.exec(i.url)) || (h = g.exec(i.url)) ? i.hostUrl = h[1]: G.log("Can't get hostUrl!")
    }

    function u(a) {
        a = a.replace(/([^:\/])\/+/g, "$1/");
        if (a.indexOf(".") === -1) return a;
        var b = a.split("/"),
            c = [],
            d = 0,
            e, f = b.length;
        for (; d < f; d++) e = b[d], e === ".." ? (c.length === 0 && G.log("Invalid module path:" + a), c.pop()) : e !== "." && c.push(e);
        return c.join("/")
    }

    function v(a, b) {
        var c;
        return p.test(a) ? b ? a = b.replace(q, "$1") + a : a = i.url + a : (c = o.exec(a)) ? c[0] === "/" && (a = i.hostUrl + a) : a = i.libUrl + a, a = u(a), r.test(a) || (a += s), a
    }

    function w(a, c) {
        c.call(b, a);
        if (a in f) {
            var d = f[a];
            for (var h = 0, i = d.length; h < i; h++) d[h].call(b, a);
            delete f[a]
        }
        delete g[a], delete e[a]
    }

    function x(a, c) {
        var d = g[a];
        if (d.deps) {
            var e = !1,
                f = function(f) {
                    if (e) return;
                    var g = y(d.deps);
                    g && (h[a] = d.wrap.apply(b, g), w(a, c), e = !0)
                };
            for (var i = 0, j = d.deps.length; i < j; i++) z(d.deps[i], f);
            f = null
        } else h[a] = d.wrap.apply(), w(a, c)
    }

    function y(a) {
        var b = [];
        for (var c = 0, d = a.length; c < d; c++) {
            var e = a[c],
                f = h[e];
            if (e in h) b.push(f);
            else return !1
        }
        return b
    }

    function z(a, c) {
        if (a in h) {
            c.call(b, a);
            return
        }
        if (a in e) {
            f[a] = f[a] || [], f[a].push(c);
            return
        }
        e[a] = !0;
        if (a in g) {
            x(a, c);
            return
        }
        G.loadScript(v(a), function() {
            a in h ? w(a, c) : a in g ? x(a, c) : (G.log("Module: " + a + " is not defined!"), h[a] = b, w(a, c))
        })
    }

    function A(a) {
        a = v(a);
        if (a in h) return h[a];
        var c = g[a];
        if (c) {
            var d = c.deps,
                e = [];
            if (d)
                for (var f = 0, i = d.length; f < i; f++) e.push(A(d[f]));
            return h[a] = c.wrap.apply(b, e), delete g[a], h[a]
        }
        G.log("Module " + a + " is not loaded!");
        return
    }

    function B(a, c) {
        if (a.length === 1) z(v(a[0]), function(a) {
            c.call && c.call(b, h[a])
        });
        else {
            var d = 0,
                e = a.length,
                f = !1,
                g = function() {
                    if (f) return;
                    var e = y(a);
                    e && (c.apply && c.apply(b, e), f = !0)
                };
            for (; d < e; d++) a[d] = v(a[d]);
            for (d = 0; d < e; d++) z(a[d], g)
        }
    }

    function C(a, b) {
        a = n.call(a) === "[object Array]" ? a : [a];
        if (!b) {
            if (a.length === 1) return A(a[0]);
            var c = 0,
                d = a.length,
                e = [];
            for (; c < d; c++) e.push(A(a[c]));
            return e
        }
        B(a, b)
    }
    "use strict";
    var c = "undefined";
    if (typeof G !== c) return;
    a.G = {};
    var d = a.document,
        e = {},
        f = {},
        g = {},
        h = {},
        i = {
            version: a.GJS_VERSION ? "?v" + a.GJS_VERSION : "",
            preload: a.GJS_PRELOAD || []
        },
        j = !1,
        k = !1,
        l = [],
        m = {
            complete: 1,
            loaded: 1,
            "undefined": 1
        },
        n = Object.prototype.toString,
        o = /^(?:\/|https?:\/\/|file:\/\/\/?)/,
        p = /^\.{1,2}?\//,
        q = /(\/)[^\/]*$/,
        r = /\.js(?:(?:\?|#)[\w\W]*)?$/,
        s = ".js" + i.version;
    G.staticFile = function(a) {
        return a[0] === "/" ? a = i.hostUrl + a : a = i.hostUrl + "/" + a, u(a)
    }, G.loadScript = function(a, b) {
        var c = d.createElement("script"),
            e = d.getElementsByTagName("head")[0];
        c.onload = c.onerror = c.onreadystatechange = function() {
            if (m[c.readyState]) {
                b && b(), c.onload = c.onerror = c.onreadystatechange = null;
                try {
                    if (c.clearAttributes) c.clearAttributes();
                    else
                        for (var a in c) delete c[a]
                } catch (d) {}
                e.removeChild(c), c = null
            }
        }, c.async = !0, c.src = a, c.type = "text/javascript", e.insertBefore(c, e.firstChild)
    }, G.def = function(a, c, d) {
        if (a in h || a in g) return;
        var e = d ? c : b,
            f, i;
        d = d || c, c = e, a = v(a);
        if (n.call(d) !== "[object Function]") h[a] = d;
        else {
            if (c)
                for (f = 0, i = c.length; f < i; f++) c[f] = v(c[f], a);
            g[a] = {
                name: a,
                deps: c,
                wrap: d
            }
        }
    }, G.req = function(b, c) {
        if (k || !i.preload.length) return C(b, c);
        l.push(function() {
            C(b, c)
        }), j || (j = !0, C(i.preload, function() {
            k = !0, j = !1;
            var a = 0,
                b = l.length;
            for (; a < b; a++) l[a]();
            l = null
        }))
    };
    if (typeof console !== c && typeof console.log !== c) try {
        G.log = console.log.apply ? function() {
            console.log.apply(console, arguments)
        } : console.log
    } catch (D) {
        G.log = console.log
    } else G.log = function() {};
    t()
})(window)