if(FrontendTools.attributeToArray=function(a){return a.replace("[","").replace("]","").split(",")},FrontendTools.getDataModules=function(a){return $('[data-fc-modules*="'+a+'"]')},FrontendTools.loadCSS=function(a){var b=a.replace("/","");if(a&&!document.getElementById(b)){var c=document.createElement("link");c.rel="stylesheet",c.type="text/css",c.id=b,c.href=a,$(document.body).append(c)}},FrontendTools.mergeJSON=function(a,b){var c={};for(var d in a)c[d]=a[d];for(var d in b)c[d]=b[d];return c},FrontendTools.mergeOptions=function(a,b){var c={};for(var d in a)c[d]=a[d];for(var d in b)c[d]=b[d];return c},FrontendTools.mixOptions=function(a,b){return FrontendTools.mergeJSON(a,b)},FrontendTools.removeLoading=function(a,b,c){var d=a;void 0===b&&(b=""),-1!==a.parentNode.className.indexOf("loading")&&(d=a.parentNode),$(d).removeClass("loading"),$(d).addClass("animated fade-in"),""!==b&-1===a.className.indexOf(b)&&$(a).addClass(b),void 0!==c&&c()},void 0===_gaq)var _gaq=null;FrontendTools.trackModule=function(a,b,c,d){null!==_gaq&&oGlobalSettings.bTrackModules===!0&&FrontendTools.trackEvent(a,b,c,d)},FrontendTools.trackEvent=function(a,b,c,d){null!==_gaq&&_gaq.push(["_trackEvent",a,b,c,d])},FrontendTools.trackPage=function(a){null!==_gaq&&_gaq.push(["_trackPageview",a])};