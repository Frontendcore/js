!function(a){var b,c,d={};d.is=function(a,b){return Object.prototype.toString.call(a).slice(8,-1)===b},d.copy=function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];a[c]=this.is(d,"Object")?this.copy({},d):this.is(d,"Array")?this.copy([],d):d}return a},d.log=function(a,b){(window._pen_debug_mode_on||b)&&console.log("%cPEN DEBUGGER: %c"+a,"font-family:arial,sans-serif;color:#1abf89;line-height:2em;","font-family:cursor,monospace;color:#333;")},d.shift=function(a,b,c){c=c||50;var d,e=this["_shift_fn"+a],f="shift_timeout"+a;e?e.concat([b,c]):e=[[b,c]],d=e.pop(),clearTimeout(this[f]),this[f]=setTimeout(function(){d[0]()},c)},d.merge=function(b){var c={"class":"pen",debug:!1,stay:b.stay||!b.debug,textarea:'<textarea name="content"></textarea>',list:["blockquote","h2","h3","p","insertorderedlist","insertunorderedlist","inserthorizontalrule","indent","outdent","bold","italic","underline","createlink"]};return 1===b.nodeType?c.editor=b:b.match&&b.match(/^#[\S]+$/)?c.editor=a.getElementById(b.slice(1)):c=d.copy(c,b),c},b=function(b){if(!b)return d.log("can't find config",!0);var c=d.merge(b);if(1!==c.editor.nodeType)return d.log("can't find editor");c.debug&&(window._pen_debug_mode_on=!0);var e=c.editor;e.classList.add(c["class"]);var f=e.getAttribute("contenteditable");f||e.setAttribute("contenteditable","true"),this.config=c,this._sel=a.getSelection(),this.actions(),this.toolbar(),this.markdown&&this.markdown.init(this),this.config.stay&&this.stay()},b.prototype._effectNode=function(a,b){for(var c=[];a!==this.config.editor;)a.nodeName.match(/(?:[pubia]|h[1-6]|blockquote|[uo]l|li)/i)&&c.push(b?a.nodeName.toLowerCase():a),a=a.parentNode;return c},b.prototype.nostyle=function(){var a=this.config.editor.querySelectorAll("[style]");return[].slice.call(a).forEach(function(a){a.removeAttribute("style")}),this},b.prototype.toolbar=function(){for(var b=this,c="",e=0,f=this.config.list;e<f.length;e++){var g=f[e],h="pen-icon icon-"+g;c+='<i class="'+h+'" data-action="'+g+'">'+(g.match(/^h[1-6]|p$/i)?g.toUpperCase():"")+"</i>","createlink"===g&&(c+='<input class="pen-input" placeholder="http://" />')}var i=a.createElement("div");i.setAttribute("class",this.config["class"]+"-menu pen-menu"),i.innerHTML=c,i.style.display="none",a.body.appendChild(this._menu=i);var j=function(){"block"===i.style.display&&b.menu()};window.addEventListener("resize",j),window.addEventListener("scroll",j);var k=this.config.editor,l=function(){b._isDestroyed||d.shift("toggle_menu",function(){var a=b._sel;a.isCollapsed?b._menu.style.display="none":(b._range=a.getRangeAt(0),b.menu().highlight())},200)};return k.addEventListener("mouseup",l),k.addEventListener("keyup",l),i.addEventListener("click",function(a){var c=a.target.getAttribute("data-action");if(c){var d=function(a){b._sel.removeAllRanges(),b._sel.addRange(b._range),b._actions(c,a),b._range=b._sel.getRangeAt(0),b.highlight().nostyle().menu()};if("createlink"===c){var e,f=i.getElementsByTagName("input")[0];return f.style.display="block",f.focus(),e=function(a){return a.style.display="none",a.value?d(a.value.replace(/(^\s+)|(\s+$)/g,"").replace(/^(?!http:\/\/|https:\/\/)(.*)$/,"http://$1")):(c="unlink",void d())},f.onkeypress=function(a){return 13===a.which?e(a.target):void 0},f.onkeypress}d()}}),this},b.prototype.highlight=function(){var a,b=this._sel.focusNode,c=this._effectNode(b),d=this._menu,e=d.querySelector("input");return[].slice.call(d.querySelectorAll(".active")).forEach(function(a){a.classList.remove("active")}),e&&(e.style.display="none"),a=function(a){var b=".icon-"+a,c=d.querySelector(b);return c&&c.classList.add("active")},c.forEach(function(b){var c=b.nodeName.toLowerCase();switch(c){case"a":return d.querySelector("input").value=b.href,a("createlink");case"i":return a("italic");case"u":return a("underline");case"b":return a("bold");case"ul":return a("insertunorderedlist");case"ol":return a("insertorderedlist");case"ol":return a("insertorderedlist");case"li":return a("indent");default:a(c)}}),this},b.prototype.actions=function(){var a,b,c,e,f=this;return a={block:/^(?:p|h[1-6]|blockquote|pre)$/,inline:/^(?:bold|italic|underline|insertorderedlist|insertunorderedlist|indent|outdent)$/,source:/^(?:insertimage|createlink|unlink)$/,insert:/^(?:inserthorizontalrule|insert)$/},c=function(a,b){var c=" to exec 「"+a+"」 command"+(b?" with value: "+b:"");d.log(document.execCommand(a,!1,b)&&f.config.debug?"success"+c:"fail"+c)},e=function(a){for(var b=f._sel.getRangeAt(0),d=b.startContainer;1!==d.nodeType;)d=d.parentNode;return b.selectNode(d),b.collapse(!1),c(a)},b=function(a){if(-1!==f._effectNode(f._sel.getRangeAt(0).startContainer,!0).indexOf(a)){if("blockquote"===a)return document.execCommand("outdent",!1,null);a="p"}return c("formatblock",a)},this._actions=function(f,g){f.match(a.block)?b(f):f.match(a.inline)||f.match(a.source)?c(f,g):f.match(a.insert)?e(f):this.config.debug&&d.log("can not find command function for name: "+f+(g?", value: "+g:""))},this},b.prototype.menu=function(){var a=this._range.getBoundingClientRect(),b=a.top-10,c=a.left+a.width/2,d=this._menu;return d.style.display="block",d.style.top=b-d.clientHeight+"px",d.style.left=c-d.clientWidth/2+"px",this},b.prototype.stay=function(){var a=this;window.onbeforeunload||(window.onbeforeunload=function(){return a._isDestroyed?void 0:"Are you going to leave here?"})},b.prototype.destroy=function(a){var b=a?!1:!0,c=a?"setAttribute":"removeAttribute";return a||(this._sel.removeAllRanges(),this._menu.style.display="none"),this._isDestroyed=b,this.config.editor[c]("contenteditable",""),this},b.prototype.rebuild=function(){return this.destroy("it's a joke")},c=function(a){if(!a)return d.log("can't find config",!0);var b=d.merge(a),c=b.editor.getAttribute("class");return c=c?c.replace(/\bpen\b/g,"")+" pen-textarea "+b["class"]:"pen pen-textarea",b.editor.setAttribute("class",c),b.editor.innerHTML=b.textarea,b.editor},this.Pen=a.getSelection?b:c}(document),function(){if(this.Pen){var a={keymap:{96:"`",62:">",49:"1",46:".",45:"-",42:"*",35:"#"},stack:[]};a.valid=function(a){var b=a.length;return a.match(/[#]{1,6}/)?["h"+b,b]:"```"===a?["pre",b]:">"===a?["blockquote",b]:"1."===a?["insertorderedlist",b]:"-"===a||"*"===a?["insertunorderedlist",b]:a.match(/(?:\.|\*|\-){3,}/)?["inserthorizontalrule",b]:void 0},a.parse=function(a){var b=a.keyCode||a.which;if(32===b){var c=this.stack.join("");return this.stack.length=0,this.valid(c)}return this.keymap[b]&&this.stack.push(this.keymap[b]),!1},a.action=function(a,b){if(!(a._sel.focusOffset>b[1])){var c=a._sel.focusNode;c.textContent=c.textContent.slice(b[1]),a._actions(b[0]),a.nostyle()}},a.init=function(b){b.config.editor.addEventListener("keypress",function(c){var d=a.parse(c);return d?a.action(b,d):void 0})},window.Pen.prototype.markdown=a}}(),function(a,b,c,d,e,f,g,h){"use strict";e.define("wysiwyg",[],function(){return{sPathCss:c.sPathCssUI+"?v="+c.sHash,mediator:f,bResize:!1,_oConstants:{EDITOR_SUFIX:"-editor",TEXTAREA_SUFIX:"-textarea",TEXTAREA_CLASS:"fc-wysiwyg-textarea",FULLSCREEN_EDITABLE_CLASS:"fc-wysiwyg-full-screen",TextHelp:"Select some text to get some formatting options.",TextVisual:'<i class="icon-eye"></i> VISUAL',TextHtml:'<i class="icon-code"></i> HTML',TextFullscreen:'<i class="icon-arrows-alt"></i> FULLSCREEN',TextMinscreen:'<i class="icon-minus"></i> MINIMIZE'},oDefault:{"class":"fc-wysiwyg",debug:!1,stay:!1,list:["bold","italic","underline","insertunorderedlist","createlink"]},onStart:function(){var a=d.getDataModules("wysiwyg"),b=this;d.loadCSS(this.sPathCss),d.trackModule("JS_Libraries","call","wysiwyg"),g(a).each(function(){"true"!==this.getAttribute("data-fc-active")&&(this.setAttribute("data-fc-active","true"),b.autobind(this))}),b.fDatePollyfill(),b.mediator.subscribe("close:wysiwyg",this.closeFormatOptions)},fDatePollyfill:function(){Date.now||(Date.now=function(){return(new Date).getTime()})},closeFormatOptions:function(){g(".fc-wysiwyg-menu").hide()},updateTextarea:function(a,c){c.value="<br>"==b.getElementById(a).innerHTML?"":b.getElementById(a).innerHTML},updateEditArea:function(a,c){b.getElementById(a).innerHTML=g("#"+c.id).val()},createEditArea:function(a,c,d){var e=b.createElement("div");return e.id=a,e.className="fc-wysiwyg",e.innerHTML=g(c).text(),e.setAttribute("data-help",d.help),e},createLink:function(a,c,d){var e=b.createElement("a");return e.innerHTML=d,e.href="#",e.id=c+"-"+a,e.className="button button-slim",e},createLinkGroup:function(a){var c=b.createElement("div");c.className="fc-wysiwyg-switch button-group ph-n";for(var d=0;d<a.length;d++)c.appendChild(a[d]);return c},bindForm:function(a,b){var c=this;g("#"+a).parents("form").on("submit",function(){g("#"+a).is(":visible")?c.updateEditArea(a,b):c.updateTextarea(a,b)})},bindHtmlButton:function(a,b,c){var d=this;g(b).on("focus",function(){g(this).parent().find(".fc-wysiwyg-switch").fadeIn()}).on("blur",function(){g(this).parent().find(".fc-wysiwyg-switch").fadeOut(),d.updateEditArea(a,b)}),g("#html-"+a).on("click",function(e){e.preventDefault(),g("#"+a).toggle(),g("#"+b.id).toggleClass(d._oConstants.TEXTAREA_CLASS),g("#"+a).is(":visible")?(this.innerHTML=c.html,d.updateEditArea(a,b),g("#"+a).focus()):(g(b).focus(),d.bResize===!1&&(require(["autosize"],function(){g(b).autosize()}),d.bResize=!0),d.closeFormatOptions(),this.innerHTML=c.visual,d.updateTextarea(a,b))})},bindScreenButton:function(a,b,c){var d=this;g("#screen-"+a).on("click",function(e){e.preventDefault(),g("#"+a).toggleClass(d._oConstants.FULLSCREEN_EDITABLE_CLASS),g("#"+b.id).toggleClass(d._oConstants.FULLSCREEN_EDITABLE_CLASS),g(this).parent().toggleClass("fc-wysiwyg-switch-full-screen"),g(".pen-menu").toggleClass("pen-menu-full-screen"),-1==this.innerHTML.indexOf(c.minscreen)?(g("body").css({overflow:"hidden",height:"100%"}),this.innerHTML=c.minscreen):(g("body").css({overflow:"auto",height:"auto"}),this.innerHTML=c.fullscreen)})},bindTextarea:function(a,b){var c=this;g("#"+a).on("blur",function(){c.updateTextarea(a,b),g(this).parent().find(".fc-wysiwyg-switch").fadeOut()}).on("focus",function(){g(this).parent().find(".fc-wysiwyg-switch").fadeIn()})},getText:function(a){for(var b,c=this,d={},e=["visual","help","fullscreen","minscreen","html"],f=0;f<e.length;f++)b=e[f],null!==a.getAttribute("data-fc-text-"+b)?d[b]=a.getAttribute("data-fc-text-"+b):d[b]=c._oConstants["Text"+b.charAt(0).toUpperCase()+b.slice(1)];return d},autobind:function(c){g(c).parent().css("position","relative");var e,f,i,j,k,l,m={},n=this,o=n.getText(c),p=Math.floor(Date.now()/1e3),q=c.id?c.id+n._oConstants.EDITOR_SUFIX:p+n._oConstants.EDITOR_SUFIX,r=c.getAttribute("data-fc-format-options"),s=n.createEditArea(q,c,o),t=[];if(""===c.id&&(c.id=p+n._oConstants.TEXTAREA_SUFIX),-1===a.navigator.userAgent.indexOf("MSIE")&&(null!==c.getAttribute("data-fc-html")?"false"!==c.getAttribute("data-fc-html")&&(j=n.createLink(q,"html",o.html),t.push(j)):(j=n.createLink(q,"html",o.html),t.push(j)),null!==c.getAttribute("data-fc-fullscreen")?"false"!==c.getAttribute("data-fc-fullscreen")&&(k=n.createLink(q,"screen",o.fullscreen),t.push(k)):(k=n.createLink(q,"screen",o.fullscreen),t.push(k))),t.length>0&&(l=n.createLinkGroup(t),g(c).after(l)),c.className=n._oConstants.TEXTAREA_CLASS+" fc-wysiwyg-html",g(c).before(s),m.editor=b.getElementById(q),m.textarea=c,null!==r){i=r.split(","),m.list=[];for(var u=0;i.length>u;u++)m.list.push(i[u])}e=d.mergeOptions(n.oDefault,m),f=new h(e),n.bindForm(q,c,o),n.bindTextarea(q,c,o),-1===a.navigator.userAgent.indexOf("MSIE")&&(null!==c.getAttribute("data-fc-html")?"false"!==c.getAttribute("data-fc-html")&&n.bindHtmlButton(q,c,o):n.bindHtmlButton(q,c,o),null!==c.getAttribute("data-fc-fullscreen")?"false"!==c.getAttribute("data-fc-fullscreen")&&n.bindScreenButton(q,c,o):n.bindScreenButton(q,c,o)),b.querySelectorAll&&b.querySelector("div[contenteditable]").addEventListener("paste",function(a){a.preventDefault();var c=a.clipboardData.getData("text/plain");b.execCommand("insertHTML",!1,c)}),d.removeLoading(c)},onStop:function(){this.sPathCss=null},onDestroy:function(){delete this.sPathCss}}})}(window,document,oGlobalSettings,FrontendTools,FrontendCore,FrontendMediator,$,Pen);