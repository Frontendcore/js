!function(a) {
    jQuery.fn.serializeTree = function(b, c, d) {
        var e, f = "";
        return e = void 0 == d ? this.children() : this.children().not(d), e.length > 0 ? e.each(function() {
            var e = a(this), g = "";
            e.find("ul").length > 0 ? (c += "[" + e.attr(b) + "]", g = a("ul:first", e).serializeTree(b, c, d), 
            c = c.replace(/\[[^\]\[]*\]$/, "")) : e.find("ol").length > 0 ? (c += "[" + e.attr(b) + "]", 
            g = a("ol:first", e).serializeTree(b, c, d), c = c.replace(/\[[^\]\[]*\]$/, "")) : f += "&" + c + "[]=" + e.attr(b), 
            g && (f += g);
        }) : f += "&" + c + "[" + this.attr(b) + "]=", f ? f : !1;
    };
}(jQuery);