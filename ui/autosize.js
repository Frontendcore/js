!function(a){var b,c={className:"autosizejs",id:"autosizejs",append:"\n",callback:!1,resizeDelay:10,placeholder:!0},d=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent","whiteSpace"],e=a('<textarea tabindex="-1"/>').data("autosize",!0)[0];e.style.cssText="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;",e.style.lineHeight="99px","99px"===a(e).css("lineHeight")&&d.push("lineHeight"),e.style.lineHeight="",a.fn.autosize=function(f){return this.length?(f=a.extend({},c,f||{}),e.parentNode!==document.body&&a(document.body).append(e),this.each(function(){function c(){var b,c=window.getComputedStyle?window.getComputedStyle(m,null):null;c?(b=parseFloat(c.width),("border-box"===c.boxSizing||"border-box"===c.webkitBoxSizing||"border-box"===c.mozBoxSizing)&&a.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(a,d){b-=parseFloat(c[d])})):b=n.width(),e.style.width=Math.max(b,0)+"px"}function g(){var g={};if(b=m,e.className=f.className,e.id=f.id,j=parseFloat(n.css("maxHeight")),a.each(d,function(a,b){g[b]=n.css(b)}),a(e).css(g).attr("wrap",n.attr("wrap")),c(),window.chrome){var h=m.style.width;m.style.width="0px";m.offsetWidth;m.style.width=h}}function h(){var a,d;b!==m?g():c(),!m.value&&f.placeholder?e.value=n.attr("placeholder")||"":e.value=m.value,e.value+=f.append||"",e.style.overflowY=m.style.overflowY,d=parseFloat(m.style.height)||0,e.scrollTop=0,e.scrollTop=9e4,a=e.scrollTop,j&&a>j?(m.style.overflowY="scroll",a=j):(m.style.overflowY="hidden",k>a&&(a=k)),a+=o,Math.abs(d-a)>.01&&(m.style.height=a+"px",e.className=e.className,p&&f.callback.call(m,m),n.trigger("autosize.resized"))}function i(){clearTimeout(l),l=setTimeout(function(){var a=n.width();a!==r&&(r=a,h())},parseInt(f.resizeDelay,10))}var j,k,l,m=this,n=a(m),o=0,p=a.isFunction(f.callback),q={height:m.style.height,overflow:m.style.overflow,overflowY:m.style.overflowY,wordWrap:m.style.wordWrap,resize:m.style.resize},r=n.width(),s=n.css("resize");n.data("autosize")||(n.data("autosize",!0),("border-box"===n.css("box-sizing")||"border-box"===n.css("-moz-box-sizing")||"border-box"===n.css("-webkit-box-sizing"))&&(o=n.outerHeight()-n.height()),k=Math.max(parseFloat(n.css("minHeight"))-o||0,n.height()),n.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word"}),"vertical"===s?n.css("resize","none"):"both"===s&&n.css("resize","horizontal"),"onpropertychange"in m?"oninput"in m?n.on("input.autosize keyup.autosize",h):n.on("propertychange.autosize",function(){"value"===event.propertyName&&h()}):n.on("input.autosize",h),f.resizeDelay!==!1&&a(window).on("resize.autosize",i),n.on("autosize.resize",h),n.on("autosize.resizeIncludeStyle",function(){b=null,h()}),n.on("autosize.destroy",function(){b=null,clearTimeout(l),a(window).off("resize",i),n.off("autosize").off(".autosize").css(q).removeData("autosize")}),h())})):this}}(jQuery||$),function(a,b,c,d,e,f){"use strict";e.define("autosize",[],function(){return{onStart:function(){var a=d.getDataModules("autosize"),b=this;d.trackModule("JS_Libraries","call","autosize"),f(a).each(function(){b.autobind(this)})},autobind:function(a,b){f(a).addClass("animated height"),f(a).autosize(),d.removeLoading(a)}}})}(window,document,oGlobalSettings,FrontendTools,FrontendCore,$);