!function(a){"use strict";var b=null,c=!0,d=!1,e=Object.prototype,f=e.hasOwnProperty,g=e.toString,h={version:"1.0.2",debugMode:d,Module:b,Toolbox:b,Error:b,Utils:b};Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c,d;for(c=0,d=this.length;d>c;++c)c in this&&a.call(b,this[c],c,this)}),Function.prototype.bind||(Function.prototype.bind=function(a){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d&&a?this:a,b.concat(Array.prototype.slice.call(arguments)))};return d.prototype=this.prototype,e.prototype=new d,e}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var i={isClass:function(a,b){return g.call(a)==="[object "+b+"]"},isFunction:function(a){return i.isClass(a,"Function")},isObject:function(a){return i.isClass(a,"Object")},isArray:function(a){return i.isClass(a,"Array")},forIn:function(a,b){if(a&&i.isObject(a))for(var c in a)f.call(a,c)&&b(a[c],c)},extend:function(){for(var a=arguments,b=a.length,c=1,d=a[0]||{},e=function(a,b){d[b]=i.isObject(a)?i.extend(d[b],a):a};b>c;c++)i.forIn(a[c],e);return d},tryCatchDecorator:function(a,b,d){if(b.__decorated__)return b;var e=function(){try{return b.apply(a,arguments)}catch(c){h.Error.log(d+c.message)}};return e.__decorated__=c,e},createModuleObject:function(a,c){return a.apply(b,c)}};h.Utils=i;var j={},k=-1;h.Toolbox={request:function(a){var c=j[a];return c&&c.fpFactory&&c.fpFactory(++k)||b},register:function(a,b){return j[a]||!i.isFunction(b)?d:(j[a]={fpFactory:b},c)}},h.Error={log:function(b){a.console&&a.console.error&&a.console.error(b)},report:function(a){if(h.debugMode)throw new Error(a);this.log(a)}};var l={};h.Module={define:function(a,b,e){return l[a]||!i.isFunction(e)?d:(l[a]={fpCreator:e,oInstances:{},aToolsNames:b},c)},start:function(a,b){var d=this.getInstance(a);return d||(d=l[a].oInstances[a]={oInstance:this.instantiate(a)}),d.bIsStarted||(d.oInstance.onStart(b),d.bIsStarted=c),d.bIsStarted},stop:function(a,b){var e=this.getInstance(a);return e&&e.oInstance?(e.bIsStarted&&(i.isFunction(e.oInstance.onStop)&&e.oInstance.onStop(),e.bIsStarted=d),b?(i.isFunction(e.oInstance.onDestroy)&&e.oInstance.onDestroy(),delete l[a],c):!e.bIsStarted):d},instantiate:function(a){var b,c,d=l[a],e=d.aToolsNames,f=e.length,g=[];for(d||Error.report('The module "'+a+'" is not defined!');f--;)b=e[f],g.unshift(h.Toolbox.request(b));if(c=i.createModuleObject(d.fpCreator,g),h.debugMode)for(c.__tools__=c.__tools__||{},f=e.length;f--;)c.__tools__[e[f]]=g[f];else i.forIn(c,function(b,d){i.isFunction(b)&&(c[d]=i.tryCatchDecorator(c,b,'Error in module "'+a+'" executing method "'+d+'": '))});return c},getModules:function(){return l},getInstance:function(a,b){var c=l[a];return c||h.Error.report('The module "'+a+'" is not defined!'),"undefined"==typeof b&&(b=a),c.oInstances[b]}},a.TinyCore=h,a.define&&a.define.amd&&a.define("TinyCore",h),a.module&&a.module.exports&&(a.module.exports=h)}(this),!function(a){"use strict";var b=a.TinyCore,c=b.Utils,d=function(a){this.nSubscriberID=a};d.prototype=function(){var d={},e={};return{subscribe:function(a,f,g){var h=c.isArray(a)?a:[a],i=this.nSubscriberID;h.forEach(function(a){d[a]=d[a]||{},d[a][i]||(d[a][i]=b.debugMode?f.bind(g):c.tryCatchDecorator(g,f,'Error publishing topic "'+a+'": '),e[i]=e[i]||[],e[i].push(a))})},publish:function(b,e,f){var g=f?e:e&&c.extend({},e);c.forIn(d[b],function(c){a.setTimeout(function(){c({name:b,data:g})},0)})},unsubscribe:function(a){for(var b,e=c.isArray(a)?a:[a],f=e.length,g=this.nSubscriberID;f--;)b=d[e[f]],b&&b[g]&&delete b[g]},unsubscribeAll:function(){e[this.nSubscriberID]&&this.unsubscribe(e[this.nSubscriberID])}}}(),b.Toolbox.register("mediator",function(a){return new d(a)})}(this);var requirejs,require,define;!function(Y){function I(a){return"[object Function]"===L.call(a)}function J(a){return"[object Array]"===L.call(a)}function x(a,b){if(a){var c;for(c=0;c<a.length&&(!a[c]||!b(a[c],c,a));c+=1);}}function M(a,b){if(a){var c;for(c=a.length-1;c>-1&&(!a[c]||!b(a[c],c,a));c-=1);}}function r(a,b){return da.call(a,b)}function i(a,b){return r(a,b)&&a[b]}function E(a,b){for(var c in a)if(r(a,c)&&b(a[c],c))break}function Q(a,b,c,d){return b&&E(b,function(b,e){(c||!r(a,e))&&(d&&"string"!=typeof b?(a[e]||(a[e]={}),Q(a[e],b,c,d)):a[e]=b)}),a}function t(a,b){return function(){return b.apply(a,arguments)}}function Z(a){if(!a)return a;var b=Y;return x(a.split("."),function(a){b=b[a]}),b}function F(a,b,c,d){return b=Error(b+"\nhttp://requirejs.org/docs/errors.html#"+a),b.requireType=a,b.requireModules=d,c&&(b.originalError=c),b}function ea(a){function b(a,b,c){var d,e,f,g,h,j,k,l=b&&b.split("/");d=l;var m=A.map,n=m&&m["*"];if(a&&"."===a.charAt(0))if(b){for(d=i(A.pkgs,b)?l=[b]:l.slice(0,l.length-1),b=a=d.concat(a.split("/")),d=0;b[d];d+=1)if(e=b[d],"."===e)b.splice(d,1),d-=1;else if(".."===e){if(1===d&&(".."===b[2]||".."===b[0]))break;d>0&&(b.splice(d-1,2),d-=2)}d=i(A.pkgs,b=a[0]),a=a.join("/"),d&&a===b+"/"+d.main&&(a=b)}else 0===a.indexOf("./")&&(a=a.substring(2));if(c&&(l||n)&&m){for(b=a.split("/"),d=b.length;d>0;d-=1){if(f=b.slice(0,d).join("/"),l)for(e=l.length;e>0;e-=1)if((c=i(m,l.slice(0,e).join("/")))&&(c=i(c,f))){g=c,h=d;break}if(g)break;!j&&n&&i(n,f)&&(j=i(n,f),k=d)}!g&&j&&(g=j,h=k),g&&(b.splice(0,h,g),a=b.join("/"))}return a}function c(a){z&&x(document.getElementsByTagName("script"),function(b){return b.getAttribute("data-requiremodule")===a&&b.getAttribute("data-requirecontext")===v.contextName?(b.parentNode.removeChild(b),!0):void 0})}function d(a){var b=i(A.paths,a);return b&&J(b)&&1<b.length?(c(a),b.shift(),v.require.undef(a),v.require([a]),!0):void 0}function e(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function f(a,c,d,f){var g,h,j=null,k=c?c.name:null,l=a,m=!0,n="";return a||(m=!1,a="_@r"+(K+=1)),a=e(a),j=a[0],a=a[1],j&&(j=b(j,k,f),h=i(G,j)),a&&(j?n=h&&h.normalize?h.normalize(a,function(a){return b(a,k,f)}):b(a,k,f):(n=b(a,k,f),a=e(n),j=a[0],n=a[1],d=!0,g=v.nameToUrl(n))),d=!j||h||d?"":"_unnormalized"+(L+=1),{prefix:j,name:n,parentMap:c,unnormalized:!!d,url:g,originalName:l,isDefine:m,id:(j?j+"!"+n:n)+d}}function g(a){var b=a.id,c=i(B,b);return c||(c=B[b]=new v.Module(a)),c}function h(a,b,c){var d=a.id,e=i(B,d);!r(G,d)||e&&!e.defineEmitComplete?g(a).on(b,c):"defined"===b&&c(G[d])}function j(a,b){var c=a.requireModules,d=!1;b?b(a):(x(c,function(b){(b=i(B,b))&&(b.error=a,b.events.error&&(d=!0,b.emit("error",a)))}),d||l.onError(a))}function k(){R.length&&(fa.apply(D,[D.length-1,0].concat(R)),R=[])}function m(a,b,c){var d=a.map.id;a.error?a.emit("error",a.error):(b[d]=!0,x(a.depMaps,function(d,e){var f=d.id,g=i(B,f);g&&!a.depMatched[e]&&!c[f]&&(i(b,f)?(a.defineDep(e,G[f]),a.check()):m(g,b,c))}),c[d]=!0)}function n(){var a,b,e,f,g=(e=1e3*A.waitSeconds)&&v.startTime+e<(new Date).getTime(),h=[],i=[],k=!1,l=!0;if(!s){if(s=!0,E(B,function(e){if(a=e.map,b=a.id,e.enabled&&(a.isDefine||i.push(e),!e.error))if(!e.inited&&g)d(b)?k=f=!0:(h.push(b),c(b));else if(!e.inited&&e.fetched&&a.isDefine&&(k=!0,!a.prefix))return l=!1}),g&&h.length)return e=F("timeout","Load timeout for modules: "+h,null,h),e.contextName=v.contextName,j(e);l&&x(i,function(a){m(a,{},{})}),g&&!f||!k||!z&&!$||y||(y=setTimeout(function(){y=0,n()},50)),s=!1}}function o(a){r(G,a[0])||g(f(a[0],null,!0)).init(a[1],a[2])}function p(a){var a=a.currentTarget||a.srcElement,b=v.onScriptLoad;return a.detachEvent&&!V?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1),b=v.onScriptError,(!a.detachEvent||V)&&a.removeEventListener("error",b,!1),{node:a,id:a&&a.getAttribute("data-requiremodule")}}function q(){var a;for(k();D.length;){if(a=D.shift(),null===a[0])return j(F("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));o(a)}}var s,u,v,w,y,A={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},map:{},config:{}},B={},C={},D=[],G={},H={},K=1,L=1;return w={require:function(a){return a.require?a.require:a.require=v.makeRequire(a.map)},exports:function(a){return a.usingExports=!0,a.map.isDefine?a.exports?a.exports:a.exports=G[a.map.id]={}:void 0},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){return A.config&&i(A.config,a.map.id)||{}},exports:G[a.map.id]}}},u=function(a){this.events=i(C,a.id)||{},this.map=a,this.shim=i(A.shim,a.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},u.prototype={init:function(a,b,c,d){d=d||{},this.inited||(this.factory=b,c?this.on("error",c):this.events.error&&(c=t(this,function(a){this.emit("error",a)})),this.depMaps=a&&a.slice(0),this.errback=c,this.inited=!0,this.ignore=d.ignore,d.enabled||this.enabled?this.enable():this.check())},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0,v.startTime=(new Date).getTime();var a=this.map;if(!this.shim)return a.prefix?this.callPlugin():this.load();v.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],t(this,function(){return a.prefix?this.callPlugin():this.load()}))}},load:function(){var a=this.map.url;H[a]||(H[a]=!0,v.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var d=this.exports,e=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,1>this.depCount&&!this.defined){if(I(e)){if(this.events.error)try{d=v.execCb(c,e,b,d)}catch(f){a=f}else d=v.execCb(c,e,b,d);if(this.map.isDefine&&((b=this.module)&&void 0!==b.exports&&b.exports!==this.exports?d=b.exports:void 0===d&&this.usingExports&&(d=this.exports)),a)return a.requireMap=this.map,a.requireModules=[this.map.id],a.requireType="define",j(this.error=a)}else d=e;this.exports=d,this.map.isDefine&&!this.ignore&&(G[c]=d,l.onResourceLoad)&&l.onResourceLoad(v,this.map,this.depMaps),delete B[c],this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var a=this.map,c=a.id,d=f(a.prefix);this.depMaps.push(d),h(d,"defined",t(this,function(d){var e,k;k=this.map.name;var m=this.map.parentMap?this.map.parentMap.name:null,n=v.makeRequire(a.parentMap,{enableBuildCallback:!0});this.map.unnormalized?(d.normalize&&(k=d.normalize(k,function(a){return b(a,m,!0)})||""),d=f(a.prefix+"!"+k,this.map.parentMap),h(d,"defined",t(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),(k=i(B,d.id))&&(this.depMaps.push(d),this.events.error&&k.on("error",t(this,function(a){this.emit("error",a)})),k.enable())):(e=t(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),e.error=t(this,function(a){this.inited=!0,this.error=a,a.requireModules=[c],E(B,function(a){0===a.map.id.indexOf(c+"_unnormalized")&&delete B[a.map.id]}),j(a)}),e.fromText=t(this,function(b,d){var h=a.name,i=f(h),k=O;d&&(b=d),k&&(O=!1),g(i),r(A.config,c)&&(A.config[h]=A.config[c]);try{l.exec(b)}catch(m){return j(F("fromtexteval","fromText eval for "+c+" failed: "+m,m,[c]))}k&&(O=!0),this.depMaps.push(i),v.completeLoad(h),n([h],e)}),d.load(a.name,n,e,A))})),v.enable(d,this),this.pluginMaps[d.id]=d},enable:function(){this.enabling=this.enabled=!0,x(this.depMaps,t(this,function(a,b){var c,d;if("string"==typeof a){if(a=f(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[b]=a,c=i(w,a.id))return void(this.depExports[b]=c(this));this.depCount+=1,h(a,"defined",t(this,function(a){this.defineDep(b,a),this.check()})),this.errback&&h(a,"error",this.errback)}c=a.id,d=B[c],!r(w,c)&&d&&!d.enabled&&v.enable(a,this)})),E(this.pluginMaps,t(this,function(a){var b=i(B,a.id);b&&!b.enabled&&v.enable(a,this)})),this.enabling=!1,this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]),c.push(b)},emit:function(a,b){x(this.events[a],function(a){a(b)}),"error"===a&&delete this.events[a]}},v={config:A,contextName:a,registry:B,defined:G,urlFetched:H,defQueue:D,Module:u,makeModuleMap:f,nextTick:l.nextTick,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=A.pkgs,c=A.shim,d={paths:!0,config:!0,map:!0};E(a,function(a,b){d[b]?"map"===b?Q(A[b],a,!0,!0):Q(A[b],a,!0):A[b]=a}),a.shim&&(E(a.shim,function(a,b){J(a)&&(a={deps:a}),!a.exports&&!a.init||a.exportsFn||(a.exportsFn=v.makeShimExports(a)),c[b]=a}),A.shim=c),a.packages&&(x(a.packages,function(a){a="string"==typeof a?{name:a}:a,b[a.name]={name:a.name,location:a.location||a.name,main:(a.main||"main").replace(ga,"").replace(aa,"")}}),A.pkgs=b),E(B,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=f(b))}),(a.deps||a.callback)&&v.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;return a.init&&(b=a.init.apply(Y,arguments)),b||a.exports&&Z(a.exports)}},makeRequire:function(c,d){function e(b,h,i){var k,m;return d.enableBuildCallback&&h&&I(h)&&(h.__requireJsBuild=!0),"string"==typeof b?I(h)?j(F("requireargs","Invalid require call"),i):c&&r(w,b)?w[b](B[c.id]):l.get?l.get(v,b,c):(k=f(b,c,!1,!0),k=k.id,r(G,k)?G[k]:j(F("notloaded",'Module name "'+k+'" has not been loaded yet for context: '+a+(c?"":". Use require([])")))):(q(),v.nextTick(function(){q(),m=g(f(null,c)),m.skipMap=d.skipMap,m.init(b,h,i,{enabled:!0}),n()}),e)}return d=d||{},Q(e,{isBrowser:z,toUrl:function(a){var d,e=a.lastIndexOf("."),f=a.split("/")[0];return-1!==e&&("."!==f&&".."!==f||e>1)&&(d=a.substring(e,a.length),a=a.substring(0,e)),a=v.nameToUrl(b(a,c&&c.id,!0),d||".fake"),d?a:a.substring(0,a.length-5)},defined:function(a){return r(G,f(a,c,!1,!0).id)},specified:function(a){return a=f(a,c,!1,!0).id,r(G,a)||r(B,a)}}),c||(e.undef=function(a){k();var b=f(a,c,!0),d=i(B,a);delete G[a],delete H[b.url],delete C[a],d&&(d.events.defined&&(C[a]=d.events),delete B[a])}),e},enable:function(a){i(B,a.id)&&g(a).enable()},completeLoad:function(a){var b,c,e=i(A.shim,a)||{},f=e.exports;for(k();D.length;){if(c=D.shift(),null===c[0]){if(c[0]=a,b)break;b=!0}else c[0]===a&&(b=!0);o(c)}if(c=i(B,a),!b&&!r(G,a)&&c&&!c.inited){if(A.enforceDefine&&(!f||!Z(f)))return d(a)?void 0:j(F("nodefine","No define call for "+a,null,[a]));o([a,e.deps||[],e.exportsFn])}n()},nameToUrl:function(a,b){var c,d,e,f,g,h;if(l.jsExtRegExp.test(a))f=a+(b||"");else{for(c=A.paths,d=A.pkgs,f=a.split("/"),g=f.length;g>0;g-=1){if(h=f.slice(0,g).join("/"),e=i(d,h),h=i(c,h)){J(h)&&(h=h[0]),f.splice(0,g,h);break}if(e){c=a===e.name?e.location+"/"+e.main:e.location,f.splice(0,g,c);break}}f=f.join("/"),f+=b||(/\?/.test(f)?"":".js"),f=("/"===f.charAt(0)||f.match(/^[\w\+\.\-]+:/)?"":A.baseUrl)+f}return A.urlArgs?f+((-1===f.indexOf("?")?"?":"&")+A.urlArgs):f},load:function(a,b){l.load(v,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){("load"===a.type||ha.test((a.currentTarget||a.srcElement).readyState))&&(P=null,a=p(a),v.completeLoad(a.id))},onScriptError:function(a){var b=p(a);return d(b.id)?void 0:j(F("scripterror","Script error",a,[b.id]))}},v.require=v.makeRequire(),v}var l,w,B,D,s,H,P,K,ba,ca,ia=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,ja=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,aa=/\.js$/,ga=/^\.\//;w=Object.prototype;var L=w.toString,da=w.hasOwnProperty,fa=Array.prototype.splice,z=!("undefined"==typeof window||!navigator||!document),$=!z&&"undefined"!=typeof importScripts,ha=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,V="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),C={},q={},R=[],O=!1;if("undefined"==typeof define){if("undefined"!=typeof requirejs){if(I(requirejs))return;q=requirejs,requirejs=void 0}"undefined"!=typeof require&&!I(require)&&(q=require,require=void 0),l=requirejs=function(a,b,c,d){var e,f="_";return!J(a)&&"string"!=typeof a&&(e=a,J(b)?(a=b,b=c,c=d):a=[]),e&&e.context&&(f=e.context),(d=i(C,f))||(d=C[f]=l.s.newContext(f)),e&&d.configure(e),d.require(a,b,c)},l.config=function(a){return l(a)},l.nextTick="undefined"!=typeof setTimeout?function(a){setTimeout(a,4)}:function(a){a()},require||(require=l),l.version="2.1.4",l.jsExtRegExp=/^\/|:|\?|\.js$/,l.isBrowser=z,w=l.s={contexts:C,newContext:ea},l({}),x(["toUrl","undef","defined","specified"],function(a){l[a]=function(){var b=C._;return b.require[a].apply(b,arguments)}}),z&&(B=w.head=document.getElementsByTagName("head")[0],D=document.getElementsByTagName("base")[0])&&(B=w.head=D.parentNode),l.onError=function(a){throw a},l.load=function(a,b,c){var d,e=a&&a.config||{};return z?(d=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),d.type=e.scriptType||"text/javascript",d.charset="utf-8",d.async=!0,d.setAttribute("data-requirecontext",a.contextName),d.setAttribute("data-requiremodule",b),!d.attachEvent||d.attachEvent.toString&&0>d.attachEvent.toString().indexOf("[native code")||V?(d.addEventListener("load",a.onScriptLoad,!1),d.addEventListener("error",a.onScriptError,!1)):(O=!0,d.attachEvent("onreadystatechange",a.onScriptLoad)),d.src=c,K=d,D?B.insertBefore(d,D):B.appendChild(d),K=null,d):void($&&(importScripts(c),a.completeLoad(b)))},z&&M(document.getElementsByTagName("script"),function(a){return B||(B=a.parentNode),(s=a.getAttribute("data-main"))?(q.baseUrl||(H=s.split("/"),ba=H.pop(),ca=H.length?H.join("/")+"/":"./",q.baseUrl=ca,s=ba),s=s.replace(aa,""),q.deps=q.deps?q.deps.concat(s):[s],!0):void 0}),define=function(a,b,c){var d,e;"string"!=typeof a&&(c=b,b=a,a=null),J(b)||(c=b,b=[]),!b.length&&I(c)&&c.length&&(c.toString().replace(ia,"").replace(ja,function(a,c){b.push(c)}),b=(1===c.length?["require"]:["require","exports","module"]).concat(b)),O&&((d=K)||(P&&"interactive"===P.readyState||M(document.getElementsByTagName("script"),function(a){return"interactive"===a.readyState?P=a:void 0}),d=P),d&&(a||(a=d.getAttribute("data-requiremodule")),e=C[d.getAttribute("data-requirecontext")])),(e?e.defQueue:R).push([a,b,c])},define.amd={jQuery:!0},l.exec=function(b){return eval(b)},l(q)}}(this),!function(a){"use strict";var b=a.TinyCore,c=b.Utils,d=b.Module;if(!a.require||!a.define)throw new Error("Cannot add AMD extension to TinyCore: require.js seems to be missing!");var e={baseUrl:"modules"},f={require:c.extend({},e)},g={config:function(b){return"undefined"==typeof b?f:(c.extend(f,b),void a.require.config(f.require))},setErrorHandler:function(b){a.require.onError=b},define:function(b,c,e){a.define(b,c,function(){for(var a=[],f=c.length;f--;)a.unshift(c[f].split("/").pop());d.define(b,a,e)})},require:function(b,c){a.require(b,c)},requireAndStart:function(a,b){var e=[];c.isArray(a)||(a=[a]),a.forEach(function(b,c){"string"==typeof b&&(a[c]=b={name:b,startData:{}}),e.push(b.name)}),g.require(e,function(){a.forEach(function(a){d.start(a.name,a.startData)}),b&&b(a)})}};g.setErrorHandler(function(a){b.Error.log('Error loading module(s) "'+a.requireModules+'": '+a.message)}),b.AMD=g}(this),function(a){"use strict";var b=a.TinyCore,c=b.Utils,d=b.AMD,e=a.JSON,f=document,g=[],h={nodesIgnored:{SCRIPT:!0,IFRAME:!0}},i="data-tc-modules",j=";",k=new RegExp("([\\w-]+)(\\s*:\\s*({[^"+j+"]*}))?"),l="data-tc-defer",m=";",n={},o={},p=null,q=function(){return f.attachEvent?function(a,b,c){a.attachEvent("on"+b,c)}:function(a,b,c){a.addEventListener(b,c,!1)}}(),r=function(){return f.detachEvent?function(a,b,c){a.detachEvent("on"+b,c)}:function(a,b,c){a.removeEventListener(b,c,!1)}}(),s=function(a,b){var c=a.getAttribute(b);return c=c?c.trim():""},t=function(a){var b;for(o.nodesIgnored[a.nodeName]!==!0&&(b=s(a,i),b&&u(a,b)),a=a.firstChild;a;)1===a.nodeType&&t(a),a=a.nextSibling},u=function(a,b){var c,d,e,f,h,i=b.split(j),o=[];i.forEach(function(b){var c,d,e=b.match(k)||[],f=e[1]&&e[1].trim();f&&(c=e[3]&&e[3].trim(),d={name:f},d.startData=c?p(c):{},d.startData.element=a,o.push(d))}),c=s(a,l),c?(d=c.split(m),d.forEach(function(b){b&&(e=b.split(":"),f=e[0]&&e[0].trim(),h=e[1]&&e[1].trim(),n[f]=n[f]||{},n[f][h]=n[f][h]||[],n[f][h].push({node:a,modulesData:o,typeVal:h}))})):g=g.concat(o)},v=function(a){var b=function(b,c){var d=c.node,e=function(){r(d,b,e),h(c.modulesData,a)};q(d,b,e)},e=function(b,c){setTimeout(function(){h(c,a)},b)},g=function(b){var c=function(d){var e=d.pageX||d.clientX+f.body.scrollLeft,g=d.pageY||d.clientY+f.body.scrollTop,i=[];b.forEach(function(b,c){var d=+b.typeVal,f=b.node.getBoundingClientRect(),j=f.left-d,k=f.right+d,l=f.top-d,m=f.bottom+d;e>=j&&k>=e&&g>=l&&m>=g&&(i.push(c),h(b.modulesData,a))}),i.forEach(function(a){b.splice(a,1)}),b.length||r(f,"mousemove",c)};q(f,"mousemove",c)},h=function(a,b){var c=[];a.forEach(function(a){var b=a.name;n._loaded[b]||(n._loaded[b]=!0,c.push(a))}),c.length&&d.requireAndStart(c,b)},i=[];n._loaded={},c.forIn(n.event,function(a,c){a.forEach(function(a){b(c,a)})}),delete n.event,c.forIn(n.time,function(a,b){var c=[];a.forEach(function(a){c=c.concat(a.modulesData)}),e(b,c)}),delete n.time,c.forIn(n.distance,function(a){i=i.concat(a)}),i.length&&g(i),delete n.distance},w={domBoot:function(){var a,h;c.isFunction(arguments[0])?(a=f.body,h=arguments[0]):(a=arguments[0]||f.body,h=arguments[1]),p=function(a){return e.parse(a)},b.debugMode||(p=c.tryCatchDecorator(null,p,"Error while booting from DOM! ")),o=d.config().domBoot,g=[],t(a),g.length&&d.requireAndStart(g,h),v(h)}};c.extend(d.config(),{domBoot:h}),c.extend(d,w)}(this);var oTools={};if(!oGlobalSettings)var oGlobalSettings={};if(oTools.getDataModules=function(a){return document.querySelectorAll('[data-tc-modules="'+a+'"]')},oTools.loadCSS=function(a){var b=a.replace("/","");if(a&&!document.getElementById(b)){var c=document.createElement("link");c.rel="stylesheet",c.type="text/css",c.id=b,c.href=a,$(document.body).append(c)}},oTools.mergeJSON=function(a,b){var c=Object.create(b);for(var d in a)c.hasOwnProperty(d)?null!=a[d]&&a[d].constructor==Object&&(c[d]=mergeJSON(a[d],c[d])):c[d]=a[d];return c},oTools.mergeOptions=function(a,b){var c={};for(var d in a)c[d]=a[d];for(var d in b)c[d]=b[d];return c},oTools.mixOptions=function(a,b){return oTools.mergeJSON(a,b)},void 0===_gaq)var _gaq=null;oTools.trackModule=function(a,b,c,d){null!==_gaq&&oGlobalSettings.bTrackModules&&_gaq.push(["_trackEvent",a,b,c,d])},oTools.trackEvent=function(a,b,c,d){null!==_gaq&&_gaq.push(["_trackEvent",a,b,c,d])},oTools.trackPage=function(a){null!==_gaq&&_gaq.push(["_trackPageview",a])};var isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()}};oGlobalSettings.sPathJs||(oGlobalSettings.sPathJs="js/"),oGlobalSettings.sPathJsModules||(oGlobalSettings.sPathJsModules=oGlobalSettings.sPathJs+"modules"),oGlobalSettings.sPathJsLibs||(oGlobalSettings.sPathJsLibs=oGlobalSettings.sPathJs+"../../"),oGlobalSettings.sPathJsCore||(oGlobalSettings.sPathJsCore=oGlobalSettings.sPathJs+"../../"),oGlobalSettings.sPathCss||(oGlobalSettings.sPathCss="./css/"),oGlobalSettings.sPathCssUI||(oGlobalSettings.sPathCssUI=oGlobalSettings.sPathCss+"ui.css"),oGlobalSettings.bTrackModules||(oGlobalSettings.bTrackModules=!1),oGlobalSettings.sHash||(oGlobalSettings.sHash="1"),oGlobalSettings.oPaths||(oGlobalSettings.oPaths={}),oGlobalSettings.sDevice||(oGlobalSettings.sDevice=(isMobile.any(),"desktop"));for(var oDefaultPaths={libs:oGlobalSettings.sPathJs},aModules=["devicePackage","sidemenu","code","sortable","tags","modal","autocomplete","autosize","graph","stats","wysiwyg","truncate","tip","cart","polyfills","parallax","carousel","table","toggle","tabs","notification","dropdown","center-box"],nKey=0;nKey<aModules.length;nKey++)switch(aModules[nKey]){case"devicePackage":oDefaultPaths.devicePackage=void 0!==oGlobalSettings.oPaths[aModules[nKey]]?oGlobalSettings.oPaths[aModules[nKey]]:oGlobalSettings.sPathJsCore+"devices/"+oGlobalSettings.sDevice;break;default:oDefaultPaths[aModules[nKey]+"Libs"]=void 0!==oGlobalSettings.oPaths[aModules[nKey]]?oGlobalSettings.oPaths[aModules[nKey]]:oGlobalSettings.sPathJsCore+"ui/"+aModules[nKey].replace("",""),oDefaultPaths[aModules[nKey]]=void 0!==oGlobalSettings.oPaths[aModules[nKey]]?oGlobalSettings.oPaths[aModules[nKey]]:oGlobalSettings.sPathJsCore+"ui/"+aModules[nKey].replace("","")}var oPaths=oTools.mergeJSON(oDefaultPaths,oGlobalSettings.oPaths);TinyCore.AMD.config({require:{urlArgs:"v="+oGlobalSettings.sHash,baseUrl:oGlobalSettings.sPathJsModules,paths:oPaths}}),function(){var a="onDomReady",b=!1,c=[];if(!window[a]||"function"!=typeof window[a]){var d=function(){if(!document.body)return setTimeout(d,13);for(var a=0;a<c.length;a++)c[a]();c=[]},e=function(){if(document.addEventListener){var a=function(){document.removeEventListener("DOMContentLoaded",a,!1),d()};document.addEventListener("DOMContentLoaded",a,!1),window.addEventListener("load",d,!1)}else if(document.attachEvent){var b=function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",b),d())};document.attachEvent("onreadystatechange",b),window.attachEvent("onload",d);var e=!1;try{e=null===window.frameElement}catch(f){}if(document.documentElement.doScroll&&e){var g=function(){if(0!==c.length){try{document.documentElement.doScroll("left")}catch(a){return void setTimeout(g,1)}d()}};g()}}};window[a]=function(a){c.push(a),"complete"==document.readyState?d():b||(e(),b=!0)}}}(),TinyCore.AMD.define("responsive-images",["devicePackage"],function(){return{onStart:function(){$("img").unveil(200),$(window).resize(function(){$("img").unveil(200)}),oTools.trackEvent("JS_Libraries","call","responsive-images")},onStop:function(){this.sPathCss=null},onDestroy:function(){delete this.sPathCss}}}),onDomReady(function(){require(["devicePackage"],function(){TinyCore.AMD.domBoot(function(a){for(var b=0;b<a.length;b++)oTools.trackEvent("JS_Libraries","execute",a[b].name)})}),oGlobalSettings.bResponsiveImages===!0&&(TinyCore.AMD.requireAndStart("responsive-images"),oTools.trackEvent("JS_Libraries","execute","responsive-images")),oGlobalSettings.bCart===!0&&(TinyCore.AMD.requireAndStart("cart"),oTools.trackEvent("JS_Libraries","execute","cart"))});