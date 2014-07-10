!function(a) {
    var b, c = {
        className: "autosizejs",
        id: "autosizejs",
        append: "\n",
        callback: !1,
        resizeDelay: 10,
        placeholder: !0
    }, d = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>', e = [ "fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent" ], f = a(d).data("autosize", !0)[0];
    f.style.lineHeight = "99px", "99px" === a(f).css("lineHeight") && e.push("lineHeight"), 
    f.style.lineHeight = "", a.fn.autosize = function(d) {
        return this.length ? (d = a.extend({}, c, d || {}), f.parentNode !== document.body && a(document.body).append(f), 
        this.each(function() {
            function c() {
                var b, c = window.getComputedStyle ? window.getComputedStyle(m, null) : !1;
                c ? (b = m.getBoundingClientRect().width, (0 === b || "number" != typeof b) && (b = parseInt(c.width, 10)), 
                a.each([ "paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth" ], function(a, d) {
                    b -= parseInt(c[d], 10);
                })) : b = n.width(), f.style.width = Math.max(b, 0) + "px";
            }
            function g() {
                var g = {};
                if (b = m, f.className = d.className, f.id = d.id, j = parseInt(n.css("maxHeight"), 10), 
                a.each(e, function(a, b) {
                    g[b] = n.css(b);
                }), a(f).css(g).attr("wrap", n.attr("wrap")), c(), window.chrome) {
                    var h = m.style.width;
                    m.style.width = "0px";
                    {
                        m.offsetWidth;
                    }
                    m.style.width = h;
                }
            }
            function h() {
                var a, e;
                b !== m ? g() : c(), f.value = !m.value && d.placeholder ? (n.attr("placeholder") || "") + d.append : m.value + d.append, 
                f.style.overflowY = m.style.overflowY, e = parseInt(m.style.height, 10), f.scrollTop = 0, 
                f.scrollTop = 9e4, a = f.scrollTop, j && a > j ? (m.style.overflowY = "scroll", 
                a = j) : (m.style.overflowY = "hidden", k > a && (a = k)), a += o, e !== a && (m.style.height = a + "px", 
                p && d.callback.call(m, m));
            }
            function i() {
                clearTimeout(l), l = setTimeout(function() {
                    var a = n.width();
                    a !== r && (r = a, h());
                }, parseInt(d.resizeDelay, 10));
            }
            var j, k, l, m = this, n = a(m), o = 0, p = a.isFunction(d.callback), q = {
                height: m.style.height,
                overflow: m.style.overflow,
                overflowY: m.style.overflowY,
                wordWrap: m.style.wordWrap,
                resize: m.style.resize
            }, r = n.width(), s = n.css("resize");
            n.data("autosize") || (n.data("autosize", !0), ("border-box" === n.css("box-sizing") || "border-box" === n.css("-moz-box-sizing") || "border-box" === n.css("-webkit-box-sizing")) && (o = n.outerHeight() - n.height()), 
            k = Math.max(parseInt(n.css("minHeight"), 10) - o || 0, n.height()), n.css({
                overflow: "hidden",
                overflowY: "hidden",
                wordWrap: "break-word"
            }), "vertical" === s ? n.css("resize", "none") : "both" === s && n.css("resize", "horizontal"), 
            "onpropertychange" in m ? "oninput" in m ? n.on("input.autosize keyup.autosize", h) : n.on("propertychange.autosize", function() {
                "value" === event.propertyName && h();
            }) : n.on("input.autosize", h), d.resizeDelay !== !1 && a(window).on("resize.autosize", i), 
            n.on("autosize.resize", h), n.on("autosize.resizeIncludeStyle", function() {
                b = null, h();
            }), n.on("autosize.destroy", function() {
                b = null, clearTimeout(l), a(window).off("resize", i), n.off("autosize").off(".autosize").css(q).removeData("autosize");
            }), h());
        })) : this;
    };
}(window.jQuery || window.$);