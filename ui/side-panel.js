FrontendCore.define("side-panel",[],function(){return{sPathCss:oGlobalSettings.sPathCssUI+"?v="+oGlobalSettings.sHash,oDefault:{side:"left",menuWidth:"200px"},onStart:function(){var a=FrontendTools.getDataModules("side-panel"),b=this;FrontendTools.loadCSS(this.sPathCss),FrontendTools.trackModule("JS_Libraries","call","side-panel"),$(a).each(function(a){b.autobind(this,a)})},autobind:function(a,b){var c,d,e,f,g=this,h=a.href,i={},j=$(window).width();if(""===a.id&&(a.id="slide-panel-open"+b),null!==a.getAttribute("data-fc-width")&&(d=a.getAttribute("data-fc-width"),i.menuWidth=d,-1===d.indexOf("%")&&-1===d.indexOf("px")?(i.menuWidth+="px",d=parseInt(d,10)):d=-1===d.indexOf("%")?$("window").width()/parseInt(d,10):parseInt(d,10)),e=d,599>j&&e>599&&(i.menuWidth=j+"px"),null!==a.getAttribute("data-fc-position")&&(i.side=a.getAttribute("data-fc-position")),-1!==h.indexOf("#")&&(f=document.getElementById(h.split("#")[1])),c=FrontendTools.mergeOptions(g.oDefault,i),null!==a.getAttribute("data-fc-tab")){$(a).addClass("side-panel-tab").addClass("side-panel-tab-"+c.side),null!==a.getAttribute("data-fc-tab-top")&&$(a).css("top",a.getAttribute("data-fc-tab-top"));var k=a.outerHTML;$(a).remove(),$("body").append(k),a=document.getElementById(a.id)}if("false"!==a.getAttribute("data-fc-clone")){var l="-"+b,m=$(f).attr("id")+"-"+b,n=$(f).clone().attr("id",$(f).attr("id")+l);a.href="#"+m,n.find("[id]").each(function(){var a=$(this),b=a.attr("id")+l;a.attr("id",b)}),n.find("[href]").each(function(){var a,b=$(this),c=b.attr("href");-1!==c.indexOf("#")&&(a=c+l,b.attr("href",a))}),$("body").append(n[0]),$(f).remove(),f=document.getElementById(m),$(f).hide()}$(f).width(i.menuWidth),$(a).click(function(){$(f).removeClass("slide-out-"+c.side).addClass("animated slide-in-"+c.side+" side-panel-default side-panel-"+c.side),$(f).show(),void 0===$(".side-black-panel")[0]&&($("body").append('<div class="side-black-panel animated fade-in"></div>').css({overflow:"hidden",height:"100%"}),$(".side-black-panel").on("click",function(){var a=this;$(f).addClass("slide-out-"+c.side),$(a).addClass("fade-out"),$("body").css({overflow:"auto",height:"initial"}),setTimeout(function(){$(a).remove()},700)}))})},onStop:function(){this.sPathCss=null},onDestroy:function(){delete this.sPathCss}}});