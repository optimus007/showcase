(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class an{constructor(e,t,n,s,r="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),an.nextNameID=an.nextNameID||0,this.$name.id=`lil-gui-name-${++an.nextNameID}`,this.$widget=document.createElement(r),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Yc extends an{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Jr(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const $c={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:Jr,toHexString:Jr},cs={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},Kc={isPrimitive:!1,match:Array.isArray,fromHexString(i,e,t=1){const n=cs.fromHexString(i);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([i,e,t],n=1){n=255/n;const s=i*n<<16^e*n<<8^t*n<<0;return cs.toHexString(s)}},Zc={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){const n=cs.fromHexString(i);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:i,g:e,b:t},n=1){n=255/n;const s=i*n<<16^e*n<<8^t*n<<0;return cs.toHexString(s)}},Jc=[$c,cs,Kc,Zc];function Qc(i){return Jc.find(e=>e.match(i))}class eu extends an{constructor(e,t,n,s){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Qc(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=Jr(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class fr extends an{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class tu extends an{constructor(e,t,n,s,r,a){super(e,t,n,"number"),this._initInput(),this.min(s),this.max(r);const o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let g=parseFloat(this.$input.value);isNaN(g)||(this._stepExplicit&&(g=this._snap(g)),this.setValue(this._clamp(g)))},t=g=>{const M=parseFloat(this.$input.value);isNaN(M)||(this._snapClampSetValue(M+g),this.$input.value=this.getValue())},n=g=>{g.code==="Enter"&&this.$input.blur(),g.code==="ArrowUp"&&(g.preventDefault(),t(this._step*this._arrowKeyMultiplier(g))),g.code==="ArrowDown"&&(g.preventDefault(),t(this._step*this._arrowKeyMultiplier(g)*-1))},s=g=>{this._inputFocused&&(g.preventDefault(),t(this._step*this._normalizeMouseWheel(g)))};let r=!1,a,o,l,c,u;const h=5,d=g=>{a=g.clientX,o=l=g.clientY,r=!0,c=this.getValue(),u=0,window.addEventListener("mousemove",p),window.addEventListener("mouseup",v)},p=g=>{if(r){const M=g.clientX-a,y=g.clientY-o;Math.abs(y)>h?(g.preventDefault(),this.$input.blur(),r=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(M)>h&&v()}if(!r){const M=g.clientY-l;u-=M*this._step*this._arrowKeyMultiplier(g),c+u>this._max?u=this._max-c:c+u<this._min&&(u=this._min-c),this._snapClampSetValue(c+u)}l=g.clientY},v=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",v)},m=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",d),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(g,M,y,_,S)=>(g-M)/(y-M)*(S-_)+_,t=g=>{const M=this.$slider.getBoundingClientRect();let y=e(g,M.left,M.right,this._min,this._max);this._snapClampSetValue(y)},n=g=>{this._setDraggingStyle(!0),t(g.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",r)},s=g=>{t(g.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",r)};let a=!1,o,l;const c=g=>{g.preventDefault(),this._setDraggingStyle(!0),t(g.touches[0].clientX),a=!1},u=g=>{g.touches.length>1||(this._hasScrollBar?(o=g.touches[0].clientX,l=g.touches[0].clientY,a=!0):c(g),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",d))},h=g=>{if(a){const M=g.touches[0].clientX-o,y=g.touches[0].clientY-l;Math.abs(M)>Math.abs(y)?c(g):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d))}else g.preventDefault(),t(g.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d)},p=this._callOnFinishChange.bind(this),v=400;let m;const f=g=>{if(Math.abs(g.deltaX)<Math.abs(g.deltaY)&&this._hasScrollBar)return;g.preventDefault();const y=this._normalizeMouseWheel(g)*this._step;this._snapClampSetValue(this.getValue()+y),this.$input.value=this.getValue(),clearTimeout(m),m=setTimeout(p,v)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",f,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class nu extends an{constructor(e,t,n,s){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(s)?s:Object.values(s),this._names=Array.isArray(s)?s:Object.keys(s),this._names.forEach(r=>{const a=document.createElement("option");a.innerHTML=r,this.$select.appendChild(a)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class iu extends an{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const su=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "\u2195";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "\u25BE";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "\u25B8";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "\u2713";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function ru(i){const e=document.createElement("style");e.innerHTML=i;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Ga=!1;class ga{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:s,title:r="Controls",injectStyles:a=!0,touchStyles:o=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",l=>{(l.code==="Enter"||l.code==="Space")&&(l.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),o&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!Ga&&a&&(ru(su),Ga=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation())}add(e,t,n,s,r){if(Object(n)===n)return new nu(this,e,t,n);const a=e[t];switch(typeof a){case"number":return new tu(this,e,t,n,s,r);case"boolean":return new Yc(this,e,t);case"string":return new iu(this,e,t);case"function":return new fr(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,n=1){return new eu(this,e,t,n)}addFolder(e){return new ga({parent:this,title:e})}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof fr||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof fr)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}var rs=function(){var i=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(u){u.preventDefault(),n(++i%e.children.length)},!1);function t(u){return e.appendChild(u.dom),u}function n(u){for(var h=0;h<e.children.length;h++)e.children[h].style.display=h===u?"block":"none";i=u}var s=(performance||Date).now(),r=s,a=0,o=t(new rs.Panel("FPS","#0ff","#002")),l=t(new rs.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=t(new rs.Panel("MB","#f08","#201"));return n(0),{REVISION:16,dom:e,addPanel:t,showPanel:n,begin:function(){s=(performance||Date).now()},end:function(){a++;var u=(performance||Date).now();if(l.update(u-s,200),u>=r+1e3&&(o.update(a*1e3/(u-r),100),r=u,a=0,c)){var h=performance.memory;c.update(h.usedJSHeapSize/1048576,h.jsHeapSizeLimit/1048576)}return u},update:function(){s=this.end()},domElement:e,setMode:n}};rs.Panel=function(i,e,t){var n=1/0,s=0,r=Math.round,a=r(window.devicePixelRatio||1),o=80*a,l=48*a,c=3*a,u=2*a,h=3*a,d=15*a,p=74*a,v=30*a,m=document.createElement("canvas");m.width=o,m.height=l,m.style.cssText="width:80px;height:48px";var f=m.getContext("2d");return f.font="bold "+9*a+"px Helvetica,Arial,sans-serif",f.textBaseline="top",f.fillStyle=t,f.fillRect(0,0,o,l),f.fillStyle=e,f.fillText(i,c,u),f.fillRect(h,d,p,v),f.fillStyle=t,f.globalAlpha=.9,f.fillRect(h,d,p,v),{dom:m,update:function(g,M){n=Math.min(n,g),s=Math.max(s,g),f.fillStyle=t,f.globalAlpha=1,f.fillRect(0,0,o,d),f.fillStyle=e,f.fillText(r(g)+" "+i+" ("+r(n)+"-"+r(s)+")",c,u),f.drawImage(m,h+a,d,p-a,v,h,d,p-a,v),f.fillRect(h+p-a,d,a,v),f.fillStyle=t,f.globalAlpha=.9,f.fillRect(h+p-a,d,a,r((1-g/M)*v))}}};const au=rs;/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ki="146",pi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},mi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ou=0,Wa=1,lu=2,kl=1,cu=2,Li=3,zn=0,St=1,Rt=2,_t=0,Ni=1,ja=2,Xa=3,qa=4,uu=5,Pi=100,hu=101,du=102,Ya=103,$a=104,fu=200,pu=201,mu=202,gu=203,Hl=204,Vl=205,vu=206,_u=207,xu=208,yu=209,Mu=210,Gl=0,Wl=1,Qr=2,Js=3,Qs=4,jl=5,Xl=6,va=7,ql=0,Su=1,bu=2,Sn=0,wu=1,Tu=2,Eu=3,Yl=4,Au=5,$l=300,Fi=301,Ui=302,er=303,ea=304,ir=306,Qt=1e3,At=1001,tr=1002,je=1003,ta=1004,na=1005,Ee=1006,Kl=1007,oi=1008,xt=1009,Ru=1010,Cu=1011,Zl=1012,Du=1013,On=1014,Ft=1015,Ct=1016,Pu=1017,Lu=1018,ti=1020,Iu=1021,Nu=1022,vt=1023,_a=1024,Fu=1025,ni=1026,ri=1027,Jl=1028,Uu=1029,Ql=1030,Ou=1031,Bu=1033,pr=33776,mr=33777,gr=33778,vr=33779,Ka=35840,Za=35841,Ja=35842,Qa=35843,zu=36196,eo=37492,to=37496,no=37808,io=37809,so=37810,ro=37811,ao=37812,oo=37813,lo=37814,co=37815,uo=37816,ho=37817,fo=37818,po=37819,mo=37820,go=37821,vo=36492,us=2300,Oi=2301,_r=2302,_o=2400,xo=2401,yo=2402,ku=2500,Hu=1,ec=2,ln=3e3,ye=3001,Xt=3200,xa=3201,gs=0,Vu=1,_n="srgb",Jn="srgb-linear",xr=7680,Gu=519,ia=35044,sa="300 es",ra=1035;class cn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Mo=1234567;const as=Math.PI/180,hs=180/Math.PI;function en(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mt[i&255]+Mt[i>>8&255]+Mt[i>>16&255]+Mt[i>>24&255]+"-"+Mt[e&255]+Mt[e>>8&255]+"-"+Mt[e>>16&15|64]+Mt[e>>24&255]+"-"+Mt[t&63|128]+Mt[t>>8&255]+"-"+Mt[t>>16&255]+Mt[t>>24&255]+Mt[n&255]+Mt[n>>8&255]+Mt[n>>16&255]+Mt[n>>24&255]).toLowerCase()}function gt(i,e,t){return Math.max(e,Math.min(t,i))}function ya(i,e){return(i%e+e)%e}function Wu(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function ju(i,e,t){return i!==e?(t-i)/(e-i):0}function os(i,e,t){return(1-t)*i+t*e}function Xu(i,e,t,n){return os(i,e,1-Math.exp(-t*n))}function qu(i,e=1){return e-Math.abs(ya(i,e*2)-e)}function Yu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function $u(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Ku(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Zu(i,e){return i+Math.random()*(e-i)}function Ju(i){return i*(.5-Math.random())}function Qu(i){i!==void 0&&(Mo=i);let e=Mo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function eh(i){return i*as}function th(i){return i*hs}function aa(i){return(i&i-1)===0&&i!==0}function tc(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function nr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function nh(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),p=r((n-e)/2),v=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*h,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*v,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*v,o*c);break;case"ZYZ":i.set(l*v,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Mn(i,e){switch(e.constructor){case Float32Array:return i;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ye(i,e){switch(e.constructor){case Float32Array:return i;case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var nc=Object.freeze({__proto__:null,DEG2RAD:as,RAD2DEG:hs,generateUUID:en,clamp:gt,euclideanModulo:ya,mapLinear:Wu,inverseLerp:ju,lerp:os,damp:Xu,pingpong:qu,smoothstep:Yu,smootherstep:$u,randInt:Ku,randFloat:Zu,randFloatSpread:Ju,seededRandom:Qu,degToRad:eh,radToDeg:th,isPowerOfTwo:aa,ceilPowerOfTwo:tc,floorPowerOfTwo:nr,setQuaternionFromProperEuler:nh,normalize:Ye,denormalize:Mn});class re{constructor(e=0,t=0){re.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ut{constructor(){Ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],p=n[5],v=n[8],m=s[0],f=s[3],g=s[6],M=s[1],y=s[4],_=s[7],S=s[2],E=s[5],D=s[8];return r[0]=a*m+o*M+l*S,r[3]=a*f+o*y+l*E,r[6]=a*g+o*_+l*D,r[1]=c*m+u*M+h*S,r[4]=c*f+u*y+h*E,r[7]=c*g+u*_+h*D,r[2]=d*m+p*M+v*S,r[5]=d*f+p*y+v*E,r[8]=d*g+p*_+v*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*r,p=c*r-a*l,v=t*h+n*d+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/v;return e[0]=h*m,e[1]=(s*c-u*n)*m,e[2]=(o*n-s*a)*m,e[3]=d*m,e[4]=(u*t-s*l)*m,e[5]=(s*r-o*t)*m,e[6]=p*m,e[7]=(n*l-c*t)*m,e[8]=(a*t-n*r)*m,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=t,n[4]*=t,n[7]*=t,this}rotate(e){const t=Math.cos(e),n=Math.sin(e),s=this.elements,r=s[0],a=s[3],o=s[6],l=s[1],c=s[4],u=s[7];return s[0]=t*r+n*l,s[3]=t*a+n*c,s[6]=t*o+n*u,s[1]=-n*r+t*l,s[4]=-n*a+t*c,s[7]=-n*o+t*u,this}translate(e,t){const n=this.elements;return n[0]+=e*n[2],n[3]+=e*n[5],n[6]+=e*n[8],n[1]+=t*n[2],n[4]+=t*n[5],n[7]+=t*n[8],this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}function ic(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ds(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ks(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const yr={[_n]:{[Jn]:ii},[Jn]:{[_n]:Ks}},$t={legacyMode:!0,get workingColorSpace(){return Jn},set workingColorSpace(i){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(i,e,t){if(this.legacyMode||e===t||!e||!t)return i;if(yr[e]&&yr[e][t]!==void 0){const n=yr[e][t];return i.r=n(i.r),i.g=n(i.g),i.b=n(i.b),i}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)}},sc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ot={r:0,g:0,b:0},Kt={h:0,s:0,l:0},Ms={h:0,s:0,l:0};function Mr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}function Ss(i,e){return e.r=i.r,e.g=i.g,e.b=i.b,e}class xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_n){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$t.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Jn){return this.r=e,this.g=t,this.b=n,$t.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Jn){if(e=ya(e,1),t=gt(t,0,1),n=gt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Mr(a,r,e+1/3),this.g=Mr(a,r,e),this.b=Mr(a,r,e-1/3)}return $t.toWorkingColorSpace(this,s),this}setStyle(e,t=_n){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(r[1],10))/255,this.g=Math.min(255,parseInt(r[2],10))/255,this.b=Math.min(255,parseInt(r[3],10))/255,$t.toWorkingColorSpace(this,t),n(r[4]),this;if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(r[1],10))/100,this.g=Math.min(100,parseInt(r[2],10))/100,this.b=Math.min(100,parseInt(r[3],10))/100,$t.toWorkingColorSpace(this,t),n(r[4]),this;break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const l=parseFloat(r[1])/360,c=parseFloat(r[2])/100,u=parseFloat(r[3])/100;return n(r[4]),this.setHSL(l,c,u,t)}break}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.r=parseInt(r.charAt(0)+r.charAt(0),16)/255,this.g=parseInt(r.charAt(1)+r.charAt(1),16)/255,this.b=parseInt(r.charAt(2)+r.charAt(2),16)/255,$t.toWorkingColorSpace(this,t),this;if(a===6)return this.r=parseInt(r.charAt(0)+r.charAt(1),16)/255,this.g=parseInt(r.charAt(2)+r.charAt(3),16)/255,this.b=parseInt(r.charAt(4)+r.charAt(5),16)/255,$t.toWorkingColorSpace(this,t),this}return e&&e.length>0?this.setColorName(e,t):this}setColorName(e,t=_n){const n=sc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ii(e.r),this.g=ii(e.g),this.b=ii(e.b),this}copyLinearToSRGB(e){return this.r=Ks(e.r),this.g=Ks(e.g),this.b=Ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_n){return $t.fromWorkingColorSpace(Ss(this,ot),e),gt(ot.r*255,0,255)<<16^gt(ot.g*255,0,255)<<8^gt(ot.b*255,0,255)<<0}getHexString(e=_n){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Jn){$t.fromWorkingColorSpace(Ss(this,ot),t);const n=ot.r,s=ot.g,r=ot.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Jn){return $t.fromWorkingColorSpace(Ss(this,ot),t),e.r=ot.r,e.g=ot.g,e.b=ot.b,e}getStyle(e=_n){return $t.fromWorkingColorSpace(Ss(this,ot),e),e!==_n?`color(${e} ${ot.r} ${ot.g} ${ot.b})`:`rgb(${ot.r*255|0},${ot.g*255|0},${ot.b*255|0})`}offsetHSL(e,t,n){return this.getHSL(Kt),Kt.h+=e,Kt.s+=t,Kt.l+=n,this.setHSL(Kt.h,Kt.s,Kt.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Kt),e.getHSL(Ms);const n=os(Kt.h,Ms.h,t),s=os(Kt.s,Ms.s,t),r=os(Kt.l,Ms.l,t);return this.setHSL(n,s,r),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}xe.NAMES=sc;let gi;class rc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{gi===void 0&&(gi=ds("canvas")),gi.width=e.width,gi.height=e.height;const n=gi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ds("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ii(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ii(t[n]/255)*255):t[n]=ii(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class ac{constructor(e=null){this.isSource=!0,this.uuid=en(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Sr(s[a].image)):r.push(Sr(s[a]))}else r=Sr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Sr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?rc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ih=0;class st extends cn{constructor(e=st.DEFAULT_IMAGE,t=st.DEFAULT_MAPPING,n=At,s=At,r=Ee,a=oi,o=vt,l=xt,c=1,u=ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ih++}),this.uuid=en(),this.name="",this.source=new ac(e),this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$l)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qt:e.x=e.x-Math.floor(e.x);break;case At:e.x=e.x<0?0:1;break;case tr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qt:e.y=e.y-Math.floor(e.y);break;case At:e.y=e.y<0?0:1;break;case tr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}st.DEFAULT_IMAGE=null;st.DEFAULT_MAPPING=$l;class Xe{constructor(e=0,t=0,n=0,s=1){Xe.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],p=l[5],v=l[9],m=l[2],f=l[6],g=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-m)<.01&&Math.abs(v-f)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+m)<.1&&Math.abs(v+f)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,_=(p+1)/2,S=(g+1)/2,E=(u+d)/4,D=(h+m)/4,x=(v+f)/4;return y>_&&y>S?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=E/n,r=D/n):_>S?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=E/s,r=x/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=D/r,s=x/r),this.set(n,s,r,t),this}let M=Math.sqrt((f-v)*(f-v)+(h-m)*(h-m)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(f-v)/M,this.y=(h-m)/M,this.z=(d-u)/M,this.w=Math.acos((c+p+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $e extends cn{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Xe(0,0,e,t),this.scissorTest=!1,this.viewport=new Xe(0,0,e,t);const s={width:e,height:t,depth:1};this.texture=new st(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Ee,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ac(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oc extends st{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=je,this.minFilter=je,this.wrapR=At,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sh extends st{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=je,this.minFilter=je,this.wrapR=At,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rh extends $e{constructor(e=1,t=1,n=1,s={}){super(e,t,s),this.isWebGLMultipleRenderTargets=!0;const r=this.texture;this.texture=[];for(let a=0;a<n;a++)this.texture[a]=r.clone(),this.texture[a].isRenderTargetTexture=!0}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.texture.length;s<r;s++)this.texture[s].image.width=e,this.texture[s].image.height=t,this.texture[s].image.depth=n;this.dispose()}return this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t),this}copy(e){this.dispose(),this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.set(0,0,this.width,this.height),this.scissor.set(0,0,this.width,this.height),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.texture.length=0;for(let t=0,n=e.texture.length;t<n;t++)this.texture[t]=e.texture[t].clone(),this.texture[t].isRenderTargetTexture=!0;return this}}class qt{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],p=r[a+1],v=r[a+2],m=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=v,e[t+3]=m;return}if(h!==m||l!==d||c!==p||u!==v){let f=1-o;const g=l*d+c*p+u*v+h*m,M=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){const S=Math.sqrt(y),E=Math.atan2(S,g*M);f=Math.sin(f*E)/S,o=Math.sin(o*E)/S}const _=o*M;if(l=l*f+d*_,c=c*f+p*_,u=u*f+v*_,h=h*f+m*_,f===1-o){const S=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=S,c*=S,u*=S,h*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[a],d=r[a+1],p=r[a+2],v=r[a+3];return e[t]=o*v+u*h+l*p-c*d,e[t+1]=l*v+u*d+c*h-o*p,e[t+2]=c*v+u*p+o*d-l*h,e[t+3]=u*v-o*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),h=o(r/2),d=l(n/2),p=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=d*u*h+c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h-d*p*v;break;case"YXZ":this._x=d*u*h+c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h+d*p*v;break;case"ZXY":this._x=d*u*h-c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h-d*p*v;break;case"ZYX":this._x=d*u*h-c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h+d*p*v;break;case"YZX":this._x=d*u*h+c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h-d*p*v;break;case"XZY":this._x=d*u*h-c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h+d*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(So.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(So.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=l*t+a*s-o*n,u=l*n+o*t-r*s,h=l*s+r*n-a*t,d=-r*t-a*n-o*s;return this.x=c*l+d*-r+u*-o-h*-a,this.y=u*l+d*-a+h*-r-c*-o,this.z=h*l+d*-o+c*-a-u*-r,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return br.copy(this).projectOnVector(e),this.sub(br)}reflect(e){return this.sub(br.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const br=new C,So=new qt;class Hi{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,s=1/0,r=-1/0,a=-1/0,o=-1/0;for(let l=0,c=e.length;l<c;l+=3){const u=e[l],h=e[l+1],d=e[l+2];u<t&&(t=u),h<n&&(n=h),d<s&&(s=d),u>r&&(r=u),h>a&&(a=h),d>o&&(o=d)}return this.min.set(t,n,s),this.max.set(r,a,o),this}setFromBufferAttribute(e){let t=1/0,n=1/0,s=1/0,r=-1/0,a=-1/0,o=-1/0;for(let l=0,c=e.count;l<c;l++){const u=e.getX(l),h=e.getY(l),d=e.getZ(l);u<t&&(t=u),h<n&&(n=h),d<s&&(s=d),u>r&&(r=u),h>a&&(a=h),d>o&&(o=d)}return this.min.set(t,n,s),this.max.set(r,a,o),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0)if(t&&n.attributes!=null&&n.attributes.position!==void 0){const r=n.attributes.position;for(let a=0,o=r.count;a<o;a++)Gn.fromBufferAttribute(r,a).applyMatrix4(e.matrixWorld),this.expandByPoint(Gn)}else n.boundingBox===null&&n.computeBoundingBox(),wr.copy(n.boundingBox),wr.applyMatrix4(e.matrixWorld),this.union(wr);const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Gn),Gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yi),bs.subVectors(this.max,Yi),vi.subVectors(e.a,Yi),_i.subVectors(e.b,Yi),xi.subVectors(e.c,Yi),Tn.subVectors(_i,vi),En.subVectors(xi,_i),Wn.subVectors(vi,xi);let t=[0,-Tn.z,Tn.y,0,-En.z,En.y,0,-Wn.z,Wn.y,Tn.z,0,-Tn.x,En.z,0,-En.x,Wn.z,0,-Wn.x,-Tn.y,Tn.x,0,-En.y,En.x,0,-Wn.y,Wn.x,0];return!Tr(t,vi,_i,xi,bs)||(t=[1,0,0,0,1,0,0,0,1],!Tr(t,vi,_i,xi,bs))?!1:(ws.crossVectors(Tn,En),t=[ws.x,ws.y,ws.z],Tr(t,vi,_i,xi,bs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return Gn.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize(Gn).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const dn=[new C,new C,new C,new C,new C,new C,new C,new C],Gn=new C,wr=new Hi,vi=new C,_i=new C,xi=new C,Tn=new C,En=new C,Wn=new C,Yi=new C,bs=new C,ws=new C,jn=new C;function Tr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){jn.fromArray(i,r);const o=s.x*Math.abs(jn.x)+s.y*Math.abs(jn.y)+s.z*Math.abs(jn.z),l=e.dot(jn),c=t.dot(jn),u=n.dot(jn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const ah=new Hi,$i=new C,Er=new C;class Vi{constructor(e=new C,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ah.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$i.subVectors(e,this.center);const t=$i.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector($i,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Er.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($i.copy(e.center).add(Er)),this.expandByPoint($i.copy(e.center).sub(Er))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new C,Ar=new C,Ts=new C,An=new C,Rr=new C,Es=new C,Cr=new C;class Ma{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(n).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.direction).multiplyScalar(t).add(this.origin),fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ar.copy(e).add(t).multiplyScalar(.5),Ts.copy(t).sub(e).normalize(),An.copy(this.origin).sub(Ar);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ts),o=An.dot(this.direction),l=-An.dot(Ts),c=An.lengthSq(),u=Math.abs(1-a*a);let h,d,p,v;if(u>0)if(h=a*l-o,d=a*o-l,v=r*u,h>=0)if(d>=-v)if(d<=v){const m=1/u;h*=m,d*=m,p=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d<=-v?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+d*(d+2*l)+c):d<=v?(h=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+d*(d+2*l)+c);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;return n&&n.copy(this.direction).multiplyScalar(h).add(this.origin),s&&s.copy(Ts).multiplyScalar(d).add(Ar),p}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const n=fn.dot(this.direction),s=fn.dot(fn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return o<0&&l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,n,s,r){Rr.subVectors(t,e),Es.subVectors(n,e),Cr.crossVectors(Rr,Es);let a=this.direction.dot(Cr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;An.subVectors(this.origin,e);const l=o*this.direction.dot(Es.crossVectors(An,Es));if(l<0)return null;const c=o*this.direction.dot(Rr.cross(An));if(c<0||l+c>a)return null;const u=-o*An.dot(Cr);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class be{constructor(){be.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,s,r,a,o,l,c,u,h,d,p,v,m,f){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=h,g[14]=d,g[3]=p,g[7]=v,g[11]=m,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new be().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/yi.setFromMatrixColumn(e,0).length(),r=1/yi.setFromMatrixColumn(e,1).length(),a=1/yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,p=a*h,v=o*u,m=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+v*c,t[5]=d-m*c,t[9]=-o*l,t[2]=m-d*c,t[6]=v+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,p=l*h,v=c*u,m=c*h;t[0]=d+m*o,t[4]=v*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-v,t[6]=m+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,p=l*h,v=c*u,m=c*h;t[0]=d-m*o,t[4]=-a*h,t[8]=v+p*o,t[1]=p+v*o,t[5]=a*u,t[9]=m-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,p=a*h,v=o*u,m=o*h;t[0]=l*u,t[4]=v*c-p,t[8]=d*c+m,t[1]=l*h,t[5]=m*c+d,t[9]=p*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,v=o*l,m=o*c;t[0]=l*u,t[4]=m-d*h,t[8]=v*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+v,t[10]=d-m*h}else if(e.order==="XZY"){const d=a*l,p=a*c,v=o*l,m=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+m,t[5]=a*u,t[9]=p*h-v,t[2]=v*h-p,t[6]=o*u,t[10]=m*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(oh,e,lh)}lookAt(e,t,n){const s=this.elements;return It.subVectors(e,t),It.lengthSq()===0&&(It.z=1),It.normalize(),Rn.crossVectors(n,It),Rn.lengthSq()===0&&(Math.abs(n.z)===1?It.x+=1e-4:It.z+=1e-4,It.normalize(),Rn.crossVectors(n,It)),Rn.normalize(),As.crossVectors(It,Rn),s[0]=Rn.x,s[4]=As.x,s[8]=It.x,s[1]=Rn.y,s[5]=As.y,s[9]=It.y,s[2]=Rn.z,s[6]=As.z,s[10]=It.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],p=n[13],v=n[2],m=n[6],f=n[10],g=n[14],M=n[3],y=n[7],_=n[11],S=n[15],E=s[0],D=s[4],x=s[8],w=s[12],P=s[1],z=s[5],$=s[9],O=s[13],N=s[2],H=s[6],K=s[10],Z=s[14],V=s[3],U=s[7],k=s[11],ne=s[15];return r[0]=a*E+o*P+l*N+c*V,r[4]=a*D+o*z+l*H+c*U,r[8]=a*x+o*$+l*K+c*k,r[12]=a*w+o*O+l*Z+c*ne,r[1]=u*E+h*P+d*N+p*V,r[5]=u*D+h*z+d*H+p*U,r[9]=u*x+h*$+d*K+p*k,r[13]=u*w+h*O+d*Z+p*ne,r[2]=v*E+m*P+f*N+g*V,r[6]=v*D+m*z+f*H+g*U,r[10]=v*x+m*$+f*K+g*k,r[14]=v*w+m*O+f*Z+g*ne,r[3]=M*E+y*P+_*N+S*V,r[7]=M*D+y*z+_*H+S*U,r[11]=M*x+y*$+_*K+S*k,r[15]=M*w+y*O+_*Z+S*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],v=e[3],m=e[7],f=e[11],g=e[15];return v*(+r*l*h-s*c*h-r*o*d+n*c*d+s*o*p-n*l*p)+m*(+t*l*p-t*c*d+r*a*d-s*a*p+s*c*u-r*l*u)+f*(+t*c*h-t*o*p-r*a*h+n*a*p+r*o*u-n*c*u)+g*(-s*o*u-t*l*h+t*o*d+s*a*h-n*a*d+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],v=e[12],m=e[13],f=e[14],g=e[15],M=h*f*c-m*d*c+m*l*p-o*f*p-h*l*g+o*d*g,y=v*d*c-u*f*c-v*l*p+a*f*p+u*l*g-a*d*g,_=u*m*c-v*h*c+v*o*p-a*m*p-u*o*g+a*h*g,S=v*h*l-u*m*l-v*o*d+a*m*d+u*o*f-a*h*f,E=t*M+n*y+s*_+r*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/E;return e[0]=M*D,e[1]=(m*d*r-h*f*r-m*s*p+n*f*p+h*s*g-n*d*g)*D,e[2]=(o*f*r-m*l*r+m*s*c-n*f*c-o*s*g+n*l*g)*D,e[3]=(h*l*r-o*d*r-h*s*c+n*d*c+o*s*p-n*l*p)*D,e[4]=y*D,e[5]=(u*f*r-v*d*r+v*s*p-t*f*p-u*s*g+t*d*g)*D,e[6]=(v*l*r-a*f*r-v*s*c+t*f*c+a*s*g-t*l*g)*D,e[7]=(a*d*r-u*l*r+u*s*c-t*d*c-a*s*p+t*l*p)*D,e[8]=_*D,e[9]=(v*h*r-u*m*r-v*n*p+t*m*p+u*n*g-t*h*g)*D,e[10]=(a*m*r-v*o*r+v*n*c-t*m*c-a*n*g+t*o*g)*D,e[11]=(u*o*r-a*h*r-u*n*c+t*h*c+a*n*p-t*o*p)*D,e[12]=S*D,e[13]=(u*m*s-v*h*s+v*n*d-t*m*d-u*n*f+t*h*f)*D,e[14]=(v*o*s-a*m*s-v*n*l+t*m*l+a*n*f-t*o*f)*D,e[15]=(a*h*s-u*o*s+u*n*l-t*h*l-a*n*d+t*o*d)*D,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,d=r*c,p=r*u,v=r*h,m=a*u,f=a*h,g=o*h,M=l*c,y=l*u,_=l*h,S=n.x,E=n.y,D=n.z;return s[0]=(1-(m+g))*S,s[1]=(p+_)*S,s[2]=(v-y)*S,s[3]=0,s[4]=(p-_)*E,s[5]=(1-(d+g))*E,s[6]=(f+M)*E,s[7]=0,s[8]=(v+y)*D,s[9]=(f-M)*D,s[10]=(1-(d+m))*D,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=yi.set(s[0],s[1],s[2]).length();const a=yi.set(s[4],s[5],s[6]).length(),o=yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Zt.copy(this);const c=1/r,u=1/a,h=1/o;return Zt.elements[0]*=c,Zt.elements[1]*=c,Zt.elements[2]*=c,Zt.elements[4]*=u,Zt.elements[5]*=u,Zt.elements[6]*=u,Zt.elements[8]*=h,Zt.elements[9]*=h,Zt.elements[10]*=h,t.setFromRotationMatrix(Zt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a){const o=this.elements,l=2*r/(t-e),c=2*r/(n-s),u=(t+e)/(t-e),h=(n+s)/(n-s),d=-(a+r)/(a-r),p=-2*a*r/(a-r);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=d,o[14]=p,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,s,r,a){const o=this.elements,l=1/(t-e),c=1/(n-s),u=1/(a-r),h=(t+e)*l,d=(n+s)*c,p=(a+r)*u;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-d,o[2]=0,o[6]=0,o[10]=-2*u,o[14]=-p,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const yi=new C,Zt=new be,oh=new C(0,0,0),lh=new C(1,1,1),Rn=new C,As=new C,It=new C,bo=new be,wo=new qt;class vs{constructor(e=0,t=0,n=0,s=vs.DefaultOrder){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-gt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return bo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wo.setFromEuler(this),this.setFromQuaternion(wo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}vs.DefaultOrder="XYZ";vs.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class lc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ch=0;const To=new C,Mi=new qt,pn=new be,Rs=new C,Ki=new C,uh=new C,hh=new qt,Eo=new C(1,0,0),Ao=new C(0,1,0),Ro=new C(0,0,1),dh={type:"added"},Co={type:"removed"};class Ze extends cn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ch++}),this.uuid=en(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ze.DefaultUp.clone();const e=new C,t=new vs,n=new qt,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new be},normalMatrix:{value:new Ut}}),this.matrix=new be,this.matrixWorld=new be,this.matrixAutoUpdate=Ze.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Ze.DefaultMatrixWorldAutoUpdate,this.layers=new lc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.premultiply(Mi),this}rotateX(e){return this.rotateOnAxis(Eo,e)}rotateY(e){return this.rotateOnAxis(Ao,e)}rotateZ(e){return this.rotateOnAxis(Ro,e)}translateOnAxis(e,t){return To.copy(e).applyQuaternion(this.quaternion),this.position.add(To.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Eo,e)}translateY(e){return this.translateOnAxis(Ao,e)}translateZ(e){return this.translateOnAxis(Ro,e)}localToWorld(e){return e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Rs.copy(e):Rs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ki.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Ki,Rs,this.up):pn.lookAt(Rs,Ki,this.up),this.quaternion.setFromRotationMatrix(pn),s&&(pn.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(pn),this.quaternion.premultiply(Mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(dh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Co)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Co)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,e,uh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,hh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Ze.DefaultUp=new C(0,1,0);Ze.DefaultMatrixAutoUpdate=!0;Ze.DefaultMatrixWorldAutoUpdate=!0;const Jt=new C,mn=new C,Dr=new C,gn=new C,Si=new C,bi=new C,Do=new C,Pr=new C,Lr=new C,Ir=new C;class xn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Jt.subVectors(e,t),s.cross(Jt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Jt.subVectors(s,t),mn.subVectors(n,t),Dr.subVectors(e,t);const a=Jt.dot(Jt),o=Jt.dot(mn),l=Jt.dot(Dr),c=mn.dot(mn),u=mn.dot(Dr),h=a*c-o*o;if(h===0)return r.set(-2,-1,-1);const d=1/h,p=(c*l-o*u)*d,v=(a*u-o*l)*d;return r.set(1-p-v,v,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,gn),gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getUV(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,gn),l.set(0,0),l.addScaledVector(r,gn.x),l.addScaledVector(a,gn.y),l.addScaledVector(o,gn.z),l}static isFrontFacing(e,t,n,s){return Jt.subVectors(n,t),mn.subVectors(e,t),Jt.cross(mn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Jt.cross(mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return xn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return xn.getUV(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Si.subVectors(s,n),bi.subVectors(r,n),Pr.subVectors(e,n);const l=Si.dot(Pr),c=bi.dot(Pr);if(l<=0&&c<=0)return t.copy(n);Lr.subVectors(e,s);const u=Si.dot(Lr),h=bi.dot(Lr);if(u>=0&&h<=u)return t.copy(s);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Si,a);Ir.subVectors(e,r);const p=Si.dot(Ir),v=bi.dot(Ir);if(v>=0&&p<=v)return t.copy(r);const m=p*c-l*v;if(m<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(bi,o);const f=u*v-p*h;if(f<=0&&h-u>=0&&p-v>=0)return Do.subVectors(r,s),o=(h-u)/(h-u+(p-v)),t.copy(s).addScaledVector(Do,o);const g=1/(f+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Si,a).addScaledVector(bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let fh=0;class Ot extends cn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fh++}),this.uuid=en(),this.name="",this.type="Material",this.blending=Ni,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Hl,this.blendDst=Vl,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xr,this.stencilZFail=xr,this.stencilZPass=xr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const s=this[t];if(s===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ni&&(n.blending=this.blending),this.side!==zn&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Qn extends Ot{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ql,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const it=new C,Cs=new re;class pt{constructor(e,t,n){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n===!0,this.usage=ia,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cs.fromBufferAttribute(this,t),Cs.applyMatrix3(e),this.setXY(t,Cs.x,Cs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)it.fromBufferAttribute(this,t),it.applyMatrix3(e),this.setXYZ(t,it.x,it.y,it.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)it.fromBufferAttribute(this,t),it.applyMatrix4(e),this.setXYZ(t,it.x,it.y,it.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)it.fromBufferAttribute(this,t),it.applyNormalMatrix(e),this.setXYZ(t,it.x,it.y,it.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)it.fromBufferAttribute(this,t),it.transformDirection(e),this.setXYZ(t,it.x,it.y,it.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ye(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),s=Ye(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),s=Ye(s,this.array),r=Ye(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ia&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class cc extends pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class uc extends pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class jt extends pt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ph=0;const Vt=new be,Nr=new Ze,wi=new C,Nt=new Hi,Zi=new Hi,dt=new C;class Yt extends cn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ph++}),this.uuid=en(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ic(e)?uc:cc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ut().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vt.makeRotationFromQuaternion(e),this.applyMatrix4(Vt),this}rotateX(e){return Vt.makeRotationX(e),this.applyMatrix4(Vt),this}rotateY(e){return Vt.makeRotationY(e),this.applyMatrix4(Vt),this}rotateZ(e){return Vt.makeRotationZ(e),this.applyMatrix4(Vt),this}translate(e,t,n){return Vt.makeTranslation(e,t,n),this.applyMatrix4(Vt),this}scale(e,t,n){return Vt.makeScale(e,t,n),this.applyMatrix4(Vt),this}lookAt(e){return Nr.lookAt(e),Nr.updateMatrix(),this.applyMatrix4(Nr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new jt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Nt.setFromBufferAttribute(r),this.morphTargetsRelative?(dt.addVectors(this.boundingBox.min,Nt.min),this.boundingBox.expandByPoint(dt),dt.addVectors(this.boundingBox.max,Nt.max),this.boundingBox.expandByPoint(dt)):(this.boundingBox.expandByPoint(Nt.min),this.boundingBox.expandByPoint(Nt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(Nt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Zi.setFromBufferAttribute(o),this.morphTargetsRelative?(dt.addVectors(Nt.min,Zi.min),Nt.expandByPoint(dt),dt.addVectors(Nt.max,Zi.max),Nt.expandByPoint(dt)):(Nt.expandByPoint(Zi.min),Nt.expandByPoint(Zi.max))}Nt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)dt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(dt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)dt.fromBufferAttribute(o,c),l&&(wi.fromBufferAttribute(e,c),dt.add(wi)),s=Math.max(s,n.distanceToSquared(dt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let P=0;P<o;P++)c[P]=new C,u[P]=new C;const h=new C,d=new C,p=new C,v=new re,m=new re,f=new re,g=new C,M=new C;function y(P,z,$){h.fromArray(s,P*3),d.fromArray(s,z*3),p.fromArray(s,$*3),v.fromArray(a,P*2),m.fromArray(a,z*2),f.fromArray(a,$*2),d.sub(h),p.sub(h),m.sub(v),f.sub(v);const O=1/(m.x*f.y-f.x*m.y);!isFinite(O)||(g.copy(d).multiplyScalar(f.y).addScaledVector(p,-m.y).multiplyScalar(O),M.copy(p).multiplyScalar(m.x).addScaledVector(d,-f.x).multiplyScalar(O),c[P].add(g),c[z].add(g),c[$].add(g),u[P].add(M),u[z].add(M),u[$].add(M))}let _=this.groups;_.length===0&&(_=[{start:0,count:n.length}]);for(let P=0,z=_.length;P<z;++P){const $=_[P],O=$.start,N=$.count;for(let H=O,K=O+N;H<K;H+=3)y(n[H+0],n[H+1],n[H+2])}const S=new C,E=new C,D=new C,x=new C;function w(P){D.fromArray(r,P*3),x.copy(D);const z=c[P];S.copy(z),S.sub(D.multiplyScalar(D.dot(z))).normalize(),E.crossVectors(x,z);const O=E.dot(u[P])<0?-1:1;l[P*4]=S.x,l[P*4+1]=S.y,l[P*4+2]=S.z,l[P*4+3]=O}for(let P=0,z=_.length;P<z;++P){const $=_[P],O=$.start,N=$.count;for(let H=O,K=O+N;H<K;H+=3)w(n[H+0]),w(n[H+1]),w(n[H+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,u=new C,h=new C;if(e)for(let d=0,p=e.count;d<p;d+=3){const v=e.getX(d+0),m=e.getX(d+1),f=e.getX(d+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,f),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,f),o.add(u),l.add(u),c.add(u),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)dt.fromBufferAttribute(e,t),dt.normalize(),e.setXYZ(t,dt.x,dt.y,dt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let p=0,v=0;for(let m=0,f=l.length;m<f;m++){o.isInterleavedBufferAttribute?p=l[m]*o.data.stride+o.offset:p=l[m]*u;for(let g=0;g<u;g++)d[v++]=c[p++]}return new pt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Yt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],p=e(d,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,e.parameters!==void 0&&(this.parameters=Object.assign({},e.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const Po=new be,Ti=new Ma,Fr=new Vi,Cn=new C,Dn=new C,Pn=new C,Ur=new C,Or=new C,Br=new C,Ds=new C,Ps=new C,Ls=new C,Is=new re,Ns=new re,Fs=new re,zr=new C,Us=new C;class Et extends Ze{constructor(e=new Yt,t=new Qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;if(s===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(r),e.ray.intersectsSphere(Fr)===!1)||(Po.copy(r).invert(),Ti.copy(e.ray).applyMatrix4(Po),n.boundingBox!==null&&Ti.intersectsBox(n.boundingBox)===!1))return;let a;const o=n.index,l=n.attributes.position,c=n.morphAttributes.position,u=n.morphTargetsRelative,h=n.attributes.uv,d=n.attributes.uv2,p=n.groups,v=n.drawRange;if(o!==null)if(Array.isArray(s))for(let m=0,f=p.length;m<f;m++){const g=p[m],M=s[g.materialIndex],y=Math.max(g.start,v.start),_=Math.min(o.count,Math.min(g.start+g.count,v.start+v.count));for(let S=y,E=_;S<E;S+=3){const D=o.getX(S),x=o.getX(S+1),w=o.getX(S+2);a=Os(this,M,e,Ti,l,c,u,h,d,D,x,w),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=g.materialIndex,t.push(a))}}else{const m=Math.max(0,v.start),f=Math.min(o.count,v.start+v.count);for(let g=m,M=f;g<M;g+=3){const y=o.getX(g),_=o.getX(g+1),S=o.getX(g+2);a=Os(this,s,e,Ti,l,c,u,h,d,y,_,S),a&&(a.faceIndex=Math.floor(g/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(s))for(let m=0,f=p.length;m<f;m++){const g=p[m],M=s[g.materialIndex],y=Math.max(g.start,v.start),_=Math.min(l.count,Math.min(g.start+g.count,v.start+v.count));for(let S=y,E=_;S<E;S+=3){const D=S,x=S+1,w=S+2;a=Os(this,M,e,Ti,l,c,u,h,d,D,x,w),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=g.materialIndex,t.push(a))}}else{const m=Math.max(0,v.start),f=Math.min(l.count,v.start+v.count);for(let g=m,M=f;g<M;g+=3){const y=g,_=g+1,S=g+2;a=Os(this,s,e,Ti,l,c,u,h,d,y,_,S),a&&(a.faceIndex=Math.floor(g/3),t.push(a))}}}}function mh(i,e,t,n,s,r,a,o){let l;if(e.side===St?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side!==Rt,o),l===null)return null;Us.copy(o),Us.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Us);return c<t.near||c>t.far?null:{distance:c,point:Us.clone(),object:i}}function Os(i,e,t,n,s,r,a,o,l,c,u,h){Cn.fromBufferAttribute(s,c),Dn.fromBufferAttribute(s,u),Pn.fromBufferAttribute(s,h);const d=i.morphTargetInfluences;if(r&&d){Ds.set(0,0,0),Ps.set(0,0,0),Ls.set(0,0,0);for(let v=0,m=r.length;v<m;v++){const f=d[v],g=r[v];f!==0&&(Ur.fromBufferAttribute(g,c),Or.fromBufferAttribute(g,u),Br.fromBufferAttribute(g,h),a?(Ds.addScaledVector(Ur,f),Ps.addScaledVector(Or,f),Ls.addScaledVector(Br,f)):(Ds.addScaledVector(Ur.sub(Cn),f),Ps.addScaledVector(Or.sub(Dn),f),Ls.addScaledVector(Br.sub(Pn),f)))}Cn.add(Ds),Dn.add(Ps),Pn.add(Ls)}i.isSkinnedMesh&&(i.boneTransform(c,Cn),i.boneTransform(u,Dn),i.boneTransform(h,Pn));const p=mh(i,e,t,n,Cn,Dn,Pn,zr);if(p){o&&(Is.fromBufferAttribute(o,c),Ns.fromBufferAttribute(o,u),Fs.fromBufferAttribute(o,h),p.uv=xn.getUV(zr,Cn,Dn,Pn,Is,Ns,Fs,new re)),l&&(Is.fromBufferAttribute(l,c),Ns.fromBufferAttribute(l,u),Fs.fromBufferAttribute(l,h),p.uv2=xn.getUV(zr,Cn,Dn,Pn,Is,Ns,Fs,new re));const v={a:c,b:u,c:h,normal:new C,materialIndex:0};xn.getNormal(Cn,Dn,Pn,v.normal),p.face=v}return p}class _s extends Yt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,p=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(u,3)),this.setAttribute("uv",new jt(h,2));function v(m,f,g,M,y,_,S,E,D,x,w){const P=_/D,z=S/x,$=_/2,O=S/2,N=E/2,H=D+1,K=x+1;let Z=0,V=0;const U=new C;for(let k=0;k<K;k++){const ne=k*z-O;for(let J=0;J<H;J++){const se=J*P-$;U[m]=se*M,U[f]=ne*y,U[g]=N,c.push(U.x,U.y,U.z),U[m]=0,U[f]=0,U[g]=E>0?1:-1,u.push(U.x,U.y,U.z),h.push(J/D),h.push(1-k/x),Z+=1}}for(let k=0;k<x;k++)for(let ne=0;ne<D;ne++){const J=d+ne+H*k,se=d+ne+H*(k+1),de=d+(ne+1)+H*(k+1),we=d+(ne+1)+H*k;l.push(J,se,we),l.push(se,de,we),V+=6}o.addGroup(p,V,w),p+=V,d+=Z}}static fromJSON(e){return new _s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Bi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Tt(i){const e={};for(let t=0;t<i.length;t++){const n=Bi(i[t]);for(const s in n)e[s]=n[s]}return e}function gh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}const vh={clone:Bi,merge:Tt};var _h=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class et extends Ot{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_h,this.fragmentShader=xh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bi(e.uniforms),this.uniformsGroups=gh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Sa extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new be,this.projectionMatrix=new be,this.projectionMatrixInverse=new be}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class ft extends Sa{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(as*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return hs*2*Math.atan(Math.tan(as*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(as*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ei=90,Ai=1;class hc extends Ze{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const s=new ft(Ei,Ai,e,t);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new C(1,0,0)),this.add(s);const r=new ft(Ei,Ai,e,t);r.layers=this.layers,r.up.set(0,-1,0),r.lookAt(new C(-1,0,0)),this.add(r);const a=new ft(Ei,Ai,e,t);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(new C(0,1,0)),this.add(a);const o=new ft(Ei,Ai,e,t);o.layers=this.layers,o.up.set(0,0,-1),o.lookAt(new C(0,-1,0)),this.add(o);const l=new ft(Ei,Ai,e,t);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new C(0,0,1)),this.add(l);const c=new ft(Ei,Ai,e,t);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new C(0,0,-1)),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[s,r,a,o,l,c]=this.children,u=e.getRenderTarget(),h=e.toneMapping,d=e.xr.enabled;e.toneMapping=Sn,e.xr.enabled=!1;const p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,s),e.setRenderTarget(n,1),e.render(t,r),e.setRenderTarget(n,2),e.render(t,a),e.setRenderTarget(n,3),e.render(t,o),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=p,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(u),e.toneMapping=h,e.xr.enabled=d,n.texture.needsPMREMUpdate=!0}}class dc extends st{constructor(e,t,n,s,r,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Fi,super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ba extends $e{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new dc(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ee}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new _s(5,5,5),r=new et({name:"CubemapFromEquirect",uniforms:Bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:St,blending:_t});r.uniforms.tEquirect.value=t;const a=new Et(s,r),o=t.minFilter;return t.minFilter===oi&&(t.minFilter=Ee),new hc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const kr=new C,yh=new C,Mh=new Ut;class Yn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=kr.subVectors(n,t).cross(yh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){const n=e.delta(kr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(n).multiplyScalar(r).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Mh.getNormalMatrix(e),s=this.coplanarPoint(kr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ri=new Vi,Bs=new C;class wa{constructor(e=new Yn,t=new Yn,n=new Yn,s=new Yn,r=new Yn,a=new Yn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,s=n[0],r=n[1],a=n[2],o=n[3],l=n[4],c=n[5],u=n[6],h=n[7],d=n[8],p=n[9],v=n[10],m=n[11],f=n[12],g=n[13],M=n[14],y=n[15];return t[0].setComponents(o-s,h-l,m-d,y-f).normalize(),t[1].setComponents(o+s,h+l,m+d,y+f).normalize(),t[2].setComponents(o+r,h+c,m+p,y+g).normalize(),t[3].setComponents(o-r,h-c,m-p,y-g).normalize(),t[4].setComponents(o-a,h-u,m-v,y-M).normalize(),t[5].setComponents(o+a,h+u,m+v,y+M).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Ri)}intersectsSprite(e){return Ri.center.set(0,0,0),Ri.radius=.7071067811865476,Ri.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Bs.x=s.normal.x>0?e.max.x:e.min.x,Bs.y=s.normal.y>0?e.max.y:e.min.y,Bs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function fc(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Sh(i,e){const t=e.isWebGL2,n=new WeakMap;function s(c,u){const h=c.array,d=c.usage,p=i.createBuffer();i.bindBuffer(u,p),i.bufferData(u,h,d),c.onUploadCallback();let v;if(h instanceof Float32Array)v=5126;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=5123;else if(h instanceof Int16Array)v=5122;else if(h instanceof Uint32Array)v=5125;else if(h instanceof Int32Array)v=5124;else if(h instanceof Int8Array)v=5120;else if(h instanceof Uint8Array)v=5121;else if(h instanceof Uint8ClampedArray)v=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:v,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function r(c,u,h){const d=u.array,p=u.updateRange;i.bindBuffer(h,c),p.count===-1?i.bufferSubData(h,0,d):(t?i.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):i.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1)}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(i.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h===void 0?n.set(c,s(c,u)):h.version<c.version&&(r(h.buffer,c,u),h.version=c.version)}return{get:a,remove:o,update:l}}class sr extends Yt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,h=e/o,d=t/l,p=[],v=[],m=[],f=[];for(let g=0;g<u;g++){const M=g*d-a;for(let y=0;y<c;y++){const _=y*h-r;v.push(_,-M,0),m.push(0,0,1),f.push(y/o),f.push(1-g/l)}}for(let g=0;g<l;g++)for(let M=0;M<o;M++){const y=M+c*g,_=M+c*(g+1),S=M+1+c*(g+1),E=M+1+c*g;p.push(y,_,E),p.push(_,S,E)}this.setIndex(p),this.setAttribute("position",new jt(v,3)),this.setAttribute("normal",new jt(m,3)),this.setAttribute("uv",new jt(f,2))}static fromJSON(e){return new sr(e.width,e.height,e.widthSegments,e.heightSegments)}}var bh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,wh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Th=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Eh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ah=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ch="vec3 transformed = vec3( position );",Dh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ph=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,Lh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ih=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Nh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Fh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Uh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Oh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,kh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Hh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Vh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Gh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Wh=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,jh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,qh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$h="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kh=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Jh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Qh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ed=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,td=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,nd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,id=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ad=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,od=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,ld=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ud=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
#define Material_LightProbeLOD( material )	(0)`,hd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,dd=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,fd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,md=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,vd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,_d=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xd=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,yd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Md=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Sd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Td=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Ed=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ad=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Cd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ld=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Id=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Nd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Fd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Ud=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,Od=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Bd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Hd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,Vd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Gd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,Wd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,jd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,Yd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$d=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ef=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,tf=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,nf=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,sf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,af=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,of=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,cf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,df=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ff=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,pf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,mf=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,gf=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,vf=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,_f=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,xf=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,yf=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,Mf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bf=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		gl_FragColor = vec4( mix( pow( gl_FragColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), gl_FragColor.rgb * 0.0773993808, vec3( lessThanEqual( gl_FragColor.rgb, vec3( 0.04045 ) ) ) ), gl_FragColor.w );
	#endif
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Af=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Rf=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Cf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Df=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Pf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,If=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Nf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ff=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Uf=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Of=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Hf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Gf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$f=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jf=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,ep=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,ge={alphamap_fragment:bh,alphamap_pars_fragment:wh,alphatest_fragment:Th,alphatest_pars_fragment:Eh,aomap_fragment:Ah,aomap_pars_fragment:Rh,begin_vertex:Ch,beginnormal_vertex:Dh,bsdfs:Ph,iridescence_fragment:Lh,bumpmap_pars_fragment:Ih,clipping_planes_fragment:Nh,clipping_planes_pars_fragment:Fh,clipping_planes_pars_vertex:Uh,clipping_planes_vertex:Oh,color_fragment:Bh,color_pars_fragment:zh,color_pars_vertex:kh,color_vertex:Hh,common:Vh,cube_uv_reflection_fragment:Gh,defaultnormal_vertex:Wh,displacementmap_pars_vertex:jh,displacementmap_vertex:Xh,emissivemap_fragment:qh,emissivemap_pars_fragment:Yh,encodings_fragment:$h,encodings_pars_fragment:Kh,envmap_fragment:Zh,envmap_common_pars_fragment:Jh,envmap_pars_fragment:Qh,envmap_pars_vertex:ed,envmap_physical_pars_fragment:dd,envmap_vertex:td,fog_vertex:nd,fog_pars_vertex:id,fog_fragment:sd,fog_pars_fragment:rd,gradientmap_pars_fragment:ad,lightmap_fragment:od,lightmap_pars_fragment:ld,lights_lambert_fragment:cd,lights_lambert_pars_fragment:ud,lights_pars_begin:hd,lights_toon_fragment:fd,lights_toon_pars_fragment:pd,lights_phong_fragment:md,lights_phong_pars_fragment:gd,lights_physical_fragment:vd,lights_physical_pars_fragment:_d,lights_fragment_begin:xd,lights_fragment_maps:yd,lights_fragment_end:Md,logdepthbuf_fragment:Sd,logdepthbuf_pars_fragment:bd,logdepthbuf_pars_vertex:wd,logdepthbuf_vertex:Td,map_fragment:Ed,map_pars_fragment:Ad,map_particle_fragment:Rd,map_particle_pars_fragment:Cd,metalnessmap_fragment:Dd,metalnessmap_pars_fragment:Pd,morphcolor_vertex:Ld,morphnormal_vertex:Id,morphtarget_pars_vertex:Nd,morphtarget_vertex:Fd,normal_fragment_begin:Ud,normal_fragment_maps:Od,normal_pars_fragment:Bd,normal_pars_vertex:zd,normal_vertex:kd,normalmap_pars_fragment:Hd,clearcoat_normal_fragment_begin:Vd,clearcoat_normal_fragment_maps:Gd,clearcoat_pars_fragment:Wd,iridescence_pars_fragment:jd,output_fragment:Xd,packing:qd,premultiplied_alpha_fragment:Yd,project_vertex:$d,dithering_fragment:Kd,dithering_pars_fragment:Zd,roughnessmap_fragment:Jd,roughnessmap_pars_fragment:Qd,shadowmap_pars_fragment:ef,shadowmap_pars_vertex:tf,shadowmap_vertex:nf,shadowmask_pars_fragment:sf,skinbase_vertex:rf,skinning_pars_vertex:af,skinning_vertex:of,skinnormal_vertex:lf,specularmap_fragment:cf,specularmap_pars_fragment:uf,tonemapping_fragment:hf,tonemapping_pars_fragment:df,transmission_fragment:ff,transmission_pars_fragment:pf,uv_pars_fragment:mf,uv_pars_vertex:gf,uv_vertex:vf,uv2_pars_fragment:_f,uv2_pars_vertex:xf,uv2_vertex:yf,worldpos_vertex:Mf,background_vert:Sf,background_frag:bf,backgroundCube_vert:wf,backgroundCube_frag:Tf,cube_vert:Ef,cube_frag:Af,depth_vert:Rf,depth_frag:Cf,distanceRGBA_vert:Df,distanceRGBA_frag:Pf,equirect_vert:Lf,equirect_frag:If,linedashed_vert:Nf,linedashed_frag:Ff,meshbasic_vert:Uf,meshbasic_frag:Of,meshlambert_vert:Bf,meshlambert_frag:zf,meshmatcap_vert:kf,meshmatcap_frag:Hf,meshnormal_vert:Vf,meshnormal_frag:Gf,meshphong_vert:Wf,meshphong_frag:jf,meshphysical_vert:Xf,meshphysical_frag:qf,meshtoon_vert:Yf,meshtoon_frag:$f,points_vert:Kf,points_frag:Zf,shadow_vert:Jf,shadow_frag:Qf,sprite_vert:ep,sprite_frag:tp},ie={common:{diffuse:{value:new xe(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new Ut},uv2Transform:{value:new Ut},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new xe(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Ut}}},rn={basic:{uniforms:Tt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:ge.meshbasic_vert,fragmentShader:ge.meshbasic_frag},lambert:{uniforms:Tt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new xe(0)}}]),vertexShader:ge.meshlambert_vert,fragmentShader:ge.meshlambert_frag},phong:{uniforms:Tt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new xe(0)},specular:{value:new xe(1118481)},shininess:{value:30}}]),vertexShader:ge.meshphong_vert,fragmentShader:ge.meshphong_frag},standard:{uniforms:Tt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag},toon:{uniforms:Tt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new xe(0)}}]),vertexShader:ge.meshtoon_vert,fragmentShader:ge.meshtoon_frag},matcap:{uniforms:Tt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:ge.meshmatcap_vert,fragmentShader:ge.meshmatcap_frag},points:{uniforms:Tt([ie.points,ie.fog]),vertexShader:ge.points_vert,fragmentShader:ge.points_frag},dashed:{uniforms:Tt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ge.linedashed_vert,fragmentShader:ge.linedashed_frag},depth:{uniforms:Tt([ie.common,ie.displacementmap]),vertexShader:ge.depth_vert,fragmentShader:ge.depth_frag},normal:{uniforms:Tt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:ge.meshnormal_vert,fragmentShader:ge.meshnormal_frag},sprite:{uniforms:Tt([ie.sprite,ie.fog]),vertexShader:ge.sprite_vert,fragmentShader:ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null}},vertexShader:ge.background_vert,fragmentShader:ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0}},vertexShader:ge.backgroundCube_vert,fragmentShader:ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ge.cube_vert,fragmentShader:ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ge.equirect_vert,fragmentShader:ge.equirect_frag},distanceRGBA:{uniforms:Tt([ie.common,ie.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ge.distanceRGBA_vert,fragmentShader:ge.distanceRGBA_frag},shadow:{uniforms:Tt([ie.lights,ie.fog,{color:{value:new xe(0)},opacity:{value:1}}]),vertexShader:ge.shadow_vert,fragmentShader:ge.shadow_frag}};rn.physical={uniforms:Tt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new re(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new xe(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new xe(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new xe(1,1,1)},specularColorMap:{value:null}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag};function np(i,e,t,n,s,r,a){const o=new xe(0);let l=r===!0?0:1,c,u,h=null,d=0,p=null;function v(f,g){let M=!1,y=g.isScene===!0?g.background:null;y&&y.isTexture&&(y=(g.backgroundBlurriness>0?t:e).get(y));const _=i.xr,S=_.getSession&&_.getSession();S&&S.environmentBlendMode==="additive"&&(y=null),y===null?m(o,l):y&&y.isColor&&(m(y,1),M=!0),(i.autoClear||M)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),y&&(y.isCubeTexture||y.mapping===ir)?(u===void 0&&(u=new Et(new _s(1,1,1),new et({name:"BackgroundCubeMaterial",uniforms:Bi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:St,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,D,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,(h!==y||d!==y.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=y,d=y.version,p=i.toneMapping),u.layers.enableAll(),f.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Et(new sr(2,2),new et({name:"BackgroundMaterial",uniforms:Bi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,p=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))}function m(f,g){n.buffers.color.setClear(f.r,f.g,f.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(f,g=1){o.set(f),l=g,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,m(o,l)},render:v}}function ip(i,e,t,n){const s=i.getParameter(34921),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=f(null);let c=l,u=!1;function h(N,H,K,Z,V){let U=!1;if(a){const k=m(Z,K,H);c!==k&&(c=k,p(c.object)),U=g(N,Z,K,V),U&&M(N,Z,K,V)}else{const k=H.wireframe===!0;(c.geometry!==Z.id||c.program!==K.id||c.wireframe!==k)&&(c.geometry=Z.id,c.program=K.id,c.wireframe=k,U=!0)}V!==null&&t.update(V,34963),(U||u)&&(u=!1,x(N,H,K,Z),V!==null&&i.bindBuffer(34963,t.get(V).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function p(N){return n.isWebGL2?i.bindVertexArray(N):r.bindVertexArrayOES(N)}function v(N){return n.isWebGL2?i.deleteVertexArray(N):r.deleteVertexArrayOES(N)}function m(N,H,K){const Z=K.wireframe===!0;let V=o[N.id];V===void 0&&(V={},o[N.id]=V);let U=V[H.id];U===void 0&&(U={},V[H.id]=U);let k=U[Z];return k===void 0&&(k=f(d()),U[Z]=k),k}function f(N){const H=[],K=[],Z=[];for(let V=0;V<s;V++)H[V]=0,K[V]=0,Z[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:K,attributeDivisors:Z,object:N,attributes:{},index:null}}function g(N,H,K,Z){const V=c.attributes,U=H.attributes;let k=0;const ne=K.getAttributes();for(const J in ne)if(ne[J].location>=0){const de=V[J];let we=U[J];if(we===void 0&&(J==="instanceMatrix"&&N.instanceMatrix&&(we=N.instanceMatrix),J==="instanceColor"&&N.instanceColor&&(we=N.instanceColor)),de===void 0||de.attribute!==we||we&&de.data!==we.data)return!0;k++}return c.attributesNum!==k||c.index!==Z}function M(N,H,K,Z){const V={},U=H.attributes;let k=0;const ne=K.getAttributes();for(const J in ne)if(ne[J].location>=0){let de=U[J];de===void 0&&(J==="instanceMatrix"&&N.instanceMatrix&&(de=N.instanceMatrix),J==="instanceColor"&&N.instanceColor&&(de=N.instanceColor));const we={};we.attribute=de,de&&de.data&&(we.data=de.data),V[J]=we,k++}c.attributes=V,c.attributesNum=k,c.index=Z}function y(){const N=c.newAttributes;for(let H=0,K=N.length;H<K;H++)N[H]=0}function _(N){S(N,0)}function S(N,H){const K=c.newAttributes,Z=c.enabledAttributes,V=c.attributeDivisors;K[N]=1,Z[N]===0&&(i.enableVertexAttribArray(N),Z[N]=1),V[N]!==H&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,H),V[N]=H)}function E(){const N=c.newAttributes,H=c.enabledAttributes;for(let K=0,Z=H.length;K<Z;K++)H[K]!==N[K]&&(i.disableVertexAttribArray(K),H[K]=0)}function D(N,H,K,Z,V,U){n.isWebGL2===!0&&(K===5124||K===5125)?i.vertexAttribIPointer(N,H,K,V,U):i.vertexAttribPointer(N,H,K,Z,V,U)}function x(N,H,K,Z){if(n.isWebGL2===!1&&(N.isInstancedMesh||Z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();const V=Z.attributes,U=K.getAttributes(),k=H.defaultAttributeValues;for(const ne in U){const J=U[ne];if(J.location>=0){let se=V[ne];if(se===void 0&&(ne==="instanceMatrix"&&N.instanceMatrix&&(se=N.instanceMatrix),ne==="instanceColor"&&N.instanceColor&&(se=N.instanceColor)),se!==void 0){const de=se.normalized,we=se.itemSize,q=t.get(se);if(q===void 0)continue;const Be=q.buffer,Se=q.type,Te=q.bytesPerElement;if(se.isInterleavedBufferAttribute){const he=se.data,Ve=he.stride,Re=se.offset;if(he.isInstancedInterleavedBuffer){for(let _e=0;_e<J.locationSize;_e++)S(J.location+_e,he.meshPerAttribute);N.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let _e=0;_e<J.locationSize;_e++)_(J.location+_e);i.bindBuffer(34962,Be);for(let _e=0;_e<J.locationSize;_e++)D(J.location+_e,we/J.locationSize,Se,de,Ve*Te,(Re+we/J.locationSize*_e)*Te)}else{if(se.isInstancedBufferAttribute){for(let he=0;he<J.locationSize;he++)S(J.location+he,se.meshPerAttribute);N.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let he=0;he<J.locationSize;he++)_(J.location+he);i.bindBuffer(34962,Be);for(let he=0;he<J.locationSize;he++)D(J.location+he,we/J.locationSize,Se,de,we*Te,we/J.locationSize*he*Te)}}else if(k!==void 0){const de=k[ne];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(J.location,de);break;case 3:i.vertexAttrib3fv(J.location,de);break;case 4:i.vertexAttrib4fv(J.location,de);break;default:i.vertexAttrib1fv(J.location,de)}}}}E()}function w(){$();for(const N in o){const H=o[N];for(const K in H){const Z=H[K];for(const V in Z)v(Z[V].object),delete Z[V];delete H[K]}delete o[N]}}function P(N){if(o[N.id]===void 0)return;const H=o[N.id];for(const K in H){const Z=H[K];for(const V in Z)v(Z[V].object),delete Z[V];delete H[K]}delete o[N.id]}function z(N){for(const H in o){const K=o[H];if(K[N.id]===void 0)continue;const Z=K[N.id];for(const V in Z)v(Z[V].object),delete Z[V];delete K[N.id]}}function $(){O(),u=!0,c!==l&&(c=l,p(c.object))}function O(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:$,resetDefaultState:O,dispose:w,releaseStatesOfGeometry:P,releaseStatesOfProgram:z,initAttributes:y,enableAttribute:_,disableUnusedAttributes:E}}function sp(i,e,t,n){const s=n.isWebGL2;let r;function a(c){r=c}function o(c,u){i.drawArrays(r,c,u),t.update(u,r,1)}function l(c,u,h){if(h===0)return;let d,p;if(s)d=i,p="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[p](r,c,u,h),t.update(u,r,h)}this.setMode=a,this.render=o,this.renderInstances=l}function rp(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(D){if(D==="highp"){if(i.getShaderPrecisionFormat(35633,36338).precision>0&&i.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";D="mediump"}return D==="mediump"&&i.getShaderPrecisionFormat(35633,36337).precision>0&&i.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&i instanceof WebGL2ComputeRenderingContext;let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=i.getParameter(34930),d=i.getParameter(35660),p=i.getParameter(3379),v=i.getParameter(34076),m=i.getParameter(34921),f=i.getParameter(36347),g=i.getParameter(36348),M=i.getParameter(36349),y=d>0,_=a||e.has("OES_texture_float"),S=y&&_,E=a?i.getParameter(36183):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:v,maxAttributes:m,maxVertexUniforms:f,maxVaryings:g,maxFragmentUniforms:M,vertexTextures:y,floatFragmentTextures:_,floatVertexTextures:S,maxSamples:E}}function ap(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Yn,o=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d,p){const v=h.length!==0||d||n!==0||s;return s=d,t=u(h,p,0),n=h.length,v},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1,c()},this.setState=function(h,d,p){const v=h.clippingPlanes,m=h.clipIntersection,f=h.clipShadows,g=i.get(h);if(!s||v===null||v.length===0||r&&!f)r?u(null):c();else{const M=r?0:n,y=M*4;let _=g.clippingState||null;l.value=_,_=u(v,d,y,p);for(let S=0;S!==y;++S)_[S]=t[S];g.clippingState=_,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,p,v){const m=h!==null?h.length:0;let f=null;if(m!==0){if(f=l.value,v!==!0||f===null){const g=p+m*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(f===null||f.length<g)&&(f=new Float32Array(g));for(let y=0,_=p;y!==m;++y,_+=4)a.copy(h[y]).applyMatrix4(M,o),a.normal.toArray(f,_),f[_+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,f}}function op(i){let e=new WeakMap;function t(a,o){return o===er?a.mapping=Fi:o===ea&&(a.mapping=Ui),a}function n(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===er||o===ea)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ba(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Ta extends Sa{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ii=4,Lo=[.125,.215,.35,.446,.526,.582],Zn=20,Hr=new Ta,Io=new xe;let Vr=null;const $n=(1+Math.sqrt(5))/2,Ci=1/$n,No=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,$n,Ci),new C(0,$n,-Ci),new C(Ci,0,$n),new C(-Ci,0,$n),new C($n,Ci,0),new C(-$n,Ci,0)];class oa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Vr=this._renderer.getRenderTarget(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Oo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Vr),e.scissorTest=!1,zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fi||e.mapping===Ui?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vr=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ee,minFilter:Ee,generateMipmaps:!1,type:Ct,format:vt,encoding:ln,depthBuffer:!1},s=Fo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fo(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lp(r)),this._blurMaterial=cp(r,e,t)}return s}_compileMaterial(e){const t=new Et(this._lodPlanes[0],e);this._renderer.compile(t,Hr)}_sceneToCubeUV(e,t,n,s){const o=new ft(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Io),u.toneMapping=Sn,u.autoClear=!1;const p=new Qn({name:"PMREM.Background",side:St,depthWrite:!1,depthTest:!1}),v=new Et(new _s,p);let m=!1;const f=e.background;f?f.isColor&&(p.color.copy(f),e.background=null,m=!0):(p.color.copy(Io),m=!0);for(let g=0;g<6;g++){const M=g%3;M===0?(o.up.set(0,l[g],0),o.lookAt(c[g],0,0)):M===1?(o.up.set(0,0,l[g]),o.lookAt(0,c[g],0)):(o.up.set(0,l[g],0),o.lookAt(0,0,c[g]));const y=this._cubeSize;zs(s,M*y,g>2?y:0,y,y),u.setRenderTarget(s),m&&u.render(v,o),u.render(e,o)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Fi||e.mapping===Ui;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Oo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Et(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;zs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Hr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=No[(s-1)%No.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Et(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Zn-1),m=r/v,f=isFinite(r)?1+Math.floor(u*m):Zn;f>Zn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Zn}`);const g=[];let M=0;for(let D=0;D<Zn;++D){const x=D/m,w=Math.exp(-x*x/2);g.push(w),D===0?M+=w:D<f&&(M+=2*w)}for(let D=0;D<g.length;D++)g[D]=g[D]/M;d.envMap.value=e.texture,d.samples.value=f,d.weights.value=g,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:y}=this;d.dTheta.value=v,d.mipInt.value=y-n;const _=this._sizeLods[s],S=3*_*(s>y-Ii?s-y+Ii:0),E=4*(this._cubeSize-_);zs(t,S,E,3*_,2*_),l.setRenderTarget(t),l.render(h,Hr)}}function lp(i){const e=[],t=[],n=[];let s=i;const r=i-Ii+1+Lo.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Ii?l=Lo[a-i+Ii-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,v=6,m=3,f=2,g=1,M=new Float32Array(m*v*p),y=new Float32Array(f*v*p),_=new Float32Array(g*v*p);for(let E=0;E<p;E++){const D=E%3*2/3-1,x=E>2?0:-1,w=[D,x,0,D+2/3,x,0,D+2/3,x+1,0,D,x,0,D+2/3,x+1,0,D,x+1,0];M.set(w,m*v*E),y.set(d,f*v*E);const P=[E,E,E,E,E,E];_.set(P,g*v*E)}const S=new Yt;S.setAttribute("position",new pt(M,m)),S.setAttribute("uv",new pt(y,f)),S.setAttribute("faceIndex",new pt(_,g)),e.push(S),s>Ii&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Fo(i,e,t){const n=new $e(i,e,t);return n.texture.mapping=ir,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function cp(i,e,t){const n=new Float32Array(Zn),s=new C(0,1,0);return new et({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ea(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:_t,depthTest:!1,depthWrite:!1})}function Uo(){return new et({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ea(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:_t,depthTest:!1,depthWrite:!1})}function Oo(){return new et({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ea(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_t,depthTest:!1,depthWrite:!1})}function Ea(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function up(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===er||l===ea,u=l===Fi||l===Ui;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new oa(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&s(h)){t===null&&(t=new oa(i));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function hp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function dp(i,e,t,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",a),delete s[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const v in d)e.update(d[v],34962);const p=h.morphAttributes;for(const v in p){const m=p[v];for(let f=0,g=m.length;f<g;f++)e.update(m[f],34962)}}function c(h){const d=[],p=h.index,v=h.attributes.position;let m=0;if(p!==null){const M=p.array;m=p.version;for(let y=0,_=M.length;y<_;y+=3){const S=M[y+0],E=M[y+1],D=M[y+2];d.push(S,E,E,D,D,S)}}else{const M=v.array;m=v.version;for(let y=0,_=M.length/3-1;y<_;y+=3){const S=y+0,E=y+1,D=y+2;d.push(S,E,E,D,D,S)}}const f=new(ic(d)?uc:cc)(d,1);f.version=m;const g=r.get(h);g&&e.remove(g),r.set(h,f)}function u(h){const d=r.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function fp(i,e,t,n){const s=n.isWebGL2;let r;function a(d){r=d}let o,l;function c(d){o=d.type,l=d.bytesPerElement}function u(d,p){i.drawElements(r,p,o,d*l),t.update(p,r,1)}function h(d,p,v){if(v===0)return;let m,f;if(s)m=i,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,p,o,d*l,v),t.update(p,r,v)}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h}function pp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case 4:t.triangles+=o*(r/3);break;case 1:t.lines+=o*(r/2);break;case 3:t.lines+=o*(r-1);break;case 2:t.lines+=o*r;break;case 0:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function mp(i,e){return i[0]-e[0]}function gp(i,e){return Math.abs(e[1])-Math.abs(i[1])}function vp(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,a=new Xe,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h,d){const p=c.morphTargetInfluences;if(e.isWebGL2===!0){const v=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,m=v!==void 0?v.length:0;let f=r.get(u);if(f===void 0||f.count!==m){let H=function(){O.dispose(),r.delete(u),u.removeEventListener("dispose",H)};f!==void 0&&f.texture.dispose();const y=u.morphAttributes.position!==void 0,_=u.morphAttributes.normal!==void 0,S=u.morphAttributes.color!==void 0,E=u.morphAttributes.position||[],D=u.morphAttributes.normal||[],x=u.morphAttributes.color||[];let w=0;y===!0&&(w=1),_===!0&&(w=2),S===!0&&(w=3);let P=u.attributes.position.count*w,z=1;P>e.maxTextureSize&&(z=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const $=new Float32Array(P*z*4*m),O=new oc($,P,z,m);O.type=Ft,O.needsUpdate=!0;const N=w*4;for(let K=0;K<m;K++){const Z=E[K],V=D[K],U=x[K],k=P*z*4*K;for(let ne=0;ne<Z.count;ne++){const J=ne*N;y===!0&&(a.fromBufferAttribute(Z,ne),$[k+J+0]=a.x,$[k+J+1]=a.y,$[k+J+2]=a.z,$[k+J+3]=0),_===!0&&(a.fromBufferAttribute(V,ne),$[k+J+4]=a.x,$[k+J+5]=a.y,$[k+J+6]=a.z,$[k+J+7]=0),S===!0&&(a.fromBufferAttribute(U,ne),$[k+J+8]=a.x,$[k+J+9]=a.y,$[k+J+10]=a.z,$[k+J+11]=U.itemSize===4?a.w:1)}}f={count:m,texture:O,size:new re(P,z)},r.set(u,f),u.addEventListener("dispose",H)}let g=0;for(let y=0;y<p.length;y++)g+=p[y];const M=u.morphTargetsRelative?1:1-g;d.getUniforms().setValue(i,"morphTargetBaseInfluence",M),d.getUniforms().setValue(i,"morphTargetInfluences",p),d.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}else{const v=p===void 0?0:p.length;let m=n[u.id];if(m===void 0||m.length!==v){m=[];for(let _=0;_<v;_++)m[_]=[_,0];n[u.id]=m}for(let _=0;_<v;_++){const S=m[_];S[0]=_,S[1]=p[_]}m.sort(gp);for(let _=0;_<8;_++)_<v&&m[_][1]?(o[_][0]=m[_][0],o[_][1]=m[_][1]):(o[_][0]=Number.MAX_SAFE_INTEGER,o[_][1]=0);o.sort(mp);const f=u.morphAttributes.position,g=u.morphAttributes.normal;let M=0;for(let _=0;_<8;_++){const S=o[_],E=S[0],D=S[1];E!==Number.MAX_SAFE_INTEGER&&D?(f&&u.getAttribute("morphTarget"+_)!==f[E]&&u.setAttribute("morphTarget"+_,f[E]),g&&u.getAttribute("morphNormal"+_)!==g[E]&&u.setAttribute("morphNormal"+_,g[E]),s[_]=D,M+=D):(f&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),g&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),s[_]=0)}const y=u.morphTargetsRelative?1:1-M;d.getUniforms().setValue(i,"morphTargetBaseInfluence",y),d.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function _p(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);return s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),h}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const pc=new st,mc=new oc,gc=new sh,vc=new dc,Bo=[],zo=[],ko=new Float32Array(16),Ho=new Float32Array(9),Vo=new Float32Array(4);function Gi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Bo[s];if(r===void 0&&(r=new Float32Array(s),Bo[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function lt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ct(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function rr(i,e){let t=zo[e];t===void 0&&(t=new Int32Array(e),zo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function xp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2fv(this.addr,e),ct(t,e)}}function Mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(lt(t,e))return;i.uniform3fv(this.addr,e),ct(t,e)}}function Sp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4fv(this.addr,e),ct(t,e)}}function bp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;Vo.set(n),i.uniformMatrix2fv(this.addr,!1,Vo),ct(t,n)}}function wp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;Ho.set(n),i.uniformMatrix3fv(this.addr,!1,Ho),ct(t,n)}}function Tp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;ko.set(n),i.uniformMatrix4fv(this.addr,!1,ko),ct(t,n)}}function Ep(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Ap(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2iv(this.addr,e),ct(t,e)}}function Rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(lt(t,e))return;i.uniform3iv(this.addr,e),ct(t,e)}}function Cp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4iv(this.addr,e),ct(t,e)}}function Dp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2uiv(this.addr,e),ct(t,e)}}function Lp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(lt(t,e))return;i.uniform3uiv(this.addr,e),ct(t,e)}}function Ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4uiv(this.addr,e),ct(t,e)}}function Np(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2D(e||pc,s)}function Fp(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||gc,s)}function Up(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||vc,s)}function Op(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||mc,s)}function Bp(i){switch(i){case 5126:return xp;case 35664:return yp;case 35665:return Mp;case 35666:return Sp;case 35674:return bp;case 35675:return wp;case 35676:return Tp;case 5124:case 35670:return Ep;case 35667:case 35671:return Ap;case 35668:case 35672:return Rp;case 35669:case 35673:return Cp;case 5125:return Dp;case 36294:return Pp;case 36295:return Lp;case 36296:return Ip;case 35678:case 36198:case 36298:case 36306:case 35682:return Np;case 35679:case 36299:case 36307:return Fp;case 35680:case 36300:case 36308:case 36293:return Up;case 36289:case 36303:case 36311:case 36292:return Op}}function zp(i,e){i.uniform1fv(this.addr,e)}function kp(i,e){const t=Gi(e,this.size,2);i.uniform2fv(this.addr,t)}function Hp(i,e){const t=Gi(e,this.size,3);i.uniform3fv(this.addr,t)}function Vp(i,e){const t=Gi(e,this.size,4);i.uniform4fv(this.addr,t)}function Gp(i,e){const t=Gi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Wp(i,e){const t=Gi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function jp(i,e){const t=Gi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Xp(i,e){i.uniform1iv(this.addr,e)}function qp(i,e){i.uniform2iv(this.addr,e)}function Yp(i,e){i.uniform3iv(this.addr,e)}function $p(i,e){i.uniform4iv(this.addr,e)}function Kp(i,e){i.uniform1uiv(this.addr,e)}function Zp(i,e){i.uniform2uiv(this.addr,e)}function Jp(i,e){i.uniform3uiv(this.addr,e)}function Qp(i,e){i.uniform4uiv(this.addr,e)}function em(i,e,t){const n=this.cache,s=e.length,r=rr(t,s);lt(n,r)||(i.uniform1iv(this.addr,r),ct(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||pc,r[a])}function tm(i,e,t){const n=this.cache,s=e.length,r=rr(t,s);lt(n,r)||(i.uniform1iv(this.addr,r),ct(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||gc,r[a])}function nm(i,e,t){const n=this.cache,s=e.length,r=rr(t,s);lt(n,r)||(i.uniform1iv(this.addr,r),ct(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||vc,r[a])}function im(i,e,t){const n=this.cache,s=e.length,r=rr(t,s);lt(n,r)||(i.uniform1iv(this.addr,r),ct(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||mc,r[a])}function sm(i){switch(i){case 5126:return zp;case 35664:return kp;case 35665:return Hp;case 35666:return Vp;case 35674:return Gp;case 35675:return Wp;case 35676:return jp;case 5124:case 35670:return Xp;case 35667:case 35671:return qp;case 35668:case 35672:return Yp;case 35669:case 35673:return $p;case 5125:return Kp;case 36294:return Zp;case 36295:return Jp;case 36296:return Qp;case 35678:case 36198:case 36298:case 36306:case 35682:return em;case 35679:case 36299:case 36307:return tm;case 35680:case 36300:case 36308:case 36293:return nm;case 36289:case 36303:case 36311:case 36292:return im}}class rm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=Bp(t.type)}}class am{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=sm(t.type)}}class om{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Gr=/(\w+)(\])?(\[|\.)?/g;function Go(i,e){i.seq.push(e),i.map[e.id]=e}function lm(i,e,t){const n=i.name,s=n.length;for(Gr.lastIndex=0;;){const r=Gr.exec(n),a=Gr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Go(t,c===void 0?new rm(o,i,e):new am(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new om(o),Go(t,h)),t=h}}}class Zs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);lm(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Wo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}let cm=0;function um(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function hm(i){switch(i){case ln:return["Linear","( value )"];case ye:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",i),["Linear","( value )"]}}function jo(i,e,t){const n=i.getShaderParameter(e,35713),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+um(i.getShaderSource(e),a)}else return s}function dm(i,e){const t=hm(e);return"vec4 "+i+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function fm(i,e){let t;switch(e){case wu:t="Linear";break;case Tu:t="Reinhard";break;case Eu:t="OptimizedCineon";break;case Yl:t="ACESFilmic";break;case Au:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function pm(i){return[i.extensionDerivatives||!!i.envMapCubeUVHeight||i.bumpMap||i.tangentSpaceNormalMap||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ss).join(`
`)}function mm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function gm(i,e){const t={},n=i.getProgramParameter(e,35721);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===35674&&(o=2),r.type===35675&&(o=3),r.type===35676&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ss(i){return i!==""}function Xo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const vm=/^[ \t]*#include +<([\w\d./]+)>/gm;function la(i){return i.replace(vm,_m)}function _m(i,e){const t=ge[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return la(t)}const xm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yo(i){return i.replace(xm,ym)}function ym(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $o(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Mm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===cu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Li&&(e="SHADOWMAP_TYPE_VSM"),e}function Sm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Fi:case Ui:e="ENVMAP_TYPE_CUBE";break;case ir:e="ENVMAP_TYPE_CUBE_UV";break}return e}function bm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ui:e="ENVMAP_MODE_REFRACTION";break}return e}function wm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ql:e="ENVMAP_BLENDING_MULTIPLY";break;case Su:e="ENVMAP_BLENDING_MIX";break;case bu:e="ENVMAP_BLENDING_ADD";break}return e}function Tm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Em(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Mm(t),c=Sm(t),u=bm(t),h=wm(t),d=Tm(t),p=t.isWebGL2?"":pm(t),v=mm(r),m=s.createProgram();let f,g,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=[v].filter(ss).join(`
`),f.length>0&&(f+=`
`),g=[p,v].filter(ss).join(`
`),g.length>0&&(g+=`
`)):(f=[$o(t),"#define SHADER_NAME "+t.shaderName,v,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ss).join(`
`),g=[p,$o(t),"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Sn?"#define TONE_MAPPING":"",t.toneMapping!==Sn?ge.tonemapping_pars_fragment:"",t.toneMapping!==Sn?fm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ge.encodings_pars_fragment,dm("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ss).join(`
`)),a=la(a),a=Xo(a,t),a=qo(a,t),o=la(o),o=Xo(o,t),o=qo(o,t),a=Yo(a),o=Yo(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,f=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===sa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const y=M+f+a,_=M+g+o,S=Wo(s,35633,y),E=Wo(s,35632,_);if(s.attachShader(m,S),s.attachShader(m,E),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m),i.debug.checkShaderErrors){const w=s.getProgramInfoLog(m).trim(),P=s.getShaderInfoLog(S).trim(),z=s.getShaderInfoLog(E).trim();let $=!0,O=!0;if(s.getProgramParameter(m,35714)===!1){$=!1;const N=jo(s,S,"vertex"),H=jo(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,35715)+`

Program Info Log: `+w+`
`+N+`
`+H)}else w!==""?console.warn("THREE.WebGLProgram: Program Info Log:",w):(P===""||z==="")&&(O=!1);O&&(this.diagnostics={runnable:$,programLog:w,vertexShader:{log:P,prefix:f},fragmentShader:{log:z,prefix:g}})}s.deleteShader(S),s.deleteShader(E);let D;this.getUniforms=function(){return D===void 0&&(D=new Zs(s,m)),D};let x;return this.getAttributes=function(){return x===void 0&&(x=gm(s,m)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.name=t.shaderName,this.id=cm++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=S,this.fragmentShader=E,this}let Am=0;class Rm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Cm(e),t.set(e,n)),n}}class Cm{constructor(e){this.id=Am++,this.code=e,this.usedTimes=0}}function Dm(i,e,t,n,s,r,a){const o=new lc,l=new Rm,c=[],u=s.isWebGL2,h=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x,w,P,z,$){const O=z.fog,N=$.geometry,H=x.isMeshStandardMaterial?z.environment:null,K=(x.isMeshStandardMaterial?t:e).get(x.envMap||H),Z=!!K&&K.mapping===ir?K.image.height:null,V=v[x.type];x.precision!==null&&(p=s.getMaxPrecision(x.precision),p!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const U=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,k=U!==void 0?U.length:0;let ne=0;N.morphAttributes.position!==void 0&&(ne=1),N.morphAttributes.normal!==void 0&&(ne=2),N.morphAttributes.color!==void 0&&(ne=3);let J,se,de,we;if(V){const Ve=rn[V];J=Ve.vertexShader,se=Ve.fragmentShader}else J=x.vertexShader,se=x.fragmentShader,l.update(x),de=l.getVertexShaderID(x),we=l.getFragmentShaderID(x);const q=i.getRenderTarget(),Be=x.alphaTest>0,Se=x.clearcoat>0,Te=x.iridescence>0;return{isWebGL2:u,shaderID:V,shaderName:x.type,vertexShader:J,fragmentShader:se,defines:x.defines,customVertexShaderID:de,customFragmentShaderID:we,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,instancing:$.isInstancedMesh===!0,instancingColor:$.isInstancedMesh===!0&&$.instanceColor!==null,supportsVertexTextures:d,outputEncoding:q===null?i.outputEncoding:q.isXRRenderTarget===!0?q.texture.encoding:ln,map:!!x.map,matcap:!!x.matcap,envMap:!!K,envMapMode:K&&K.mapping,envMapCubeUVHeight:Z,lightMap:!!x.lightMap,aoMap:!!x.aoMap,emissiveMap:!!x.emissiveMap,bumpMap:!!x.bumpMap,normalMap:!!x.normalMap,objectSpaceNormalMap:x.normalMapType===Vu,tangentSpaceNormalMap:x.normalMapType===gs,decodeVideoTexture:!!x.map&&x.map.isVideoTexture===!0&&x.map.encoding===ye,clearcoat:Se,clearcoatMap:Se&&!!x.clearcoatMap,clearcoatRoughnessMap:Se&&!!x.clearcoatRoughnessMap,clearcoatNormalMap:Se&&!!x.clearcoatNormalMap,iridescence:Te,iridescenceMap:Te&&!!x.iridescenceMap,iridescenceThicknessMap:Te&&!!x.iridescenceThicknessMap,displacementMap:!!x.displacementMap,roughnessMap:!!x.roughnessMap,metalnessMap:!!x.metalnessMap,specularMap:!!x.specularMap,specularIntensityMap:!!x.specularIntensityMap,specularColorMap:!!x.specularColorMap,opaque:x.transparent===!1&&x.blending===Ni,alphaMap:!!x.alphaMap,alphaTest:Be,gradientMap:!!x.gradientMap,sheen:x.sheen>0,sheenColorMap:!!x.sheenColorMap,sheenRoughnessMap:!!x.sheenRoughnessMap,transmission:x.transmission>0,transmissionMap:!!x.transmissionMap,thicknessMap:!!x.thicknessMap,combine:x.combine,vertexTangents:!!x.normalMap&&!!N.attributes.tangent,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUvs:!!x.map||!!x.bumpMap||!!x.normalMap||!!x.specularMap||!!x.alphaMap||!!x.emissiveMap||!!x.roughnessMap||!!x.metalnessMap||!!x.clearcoatMap||!!x.clearcoatRoughnessMap||!!x.clearcoatNormalMap||!!x.iridescenceMap||!!x.iridescenceThicknessMap||!!x.displacementMap||!!x.transmissionMap||!!x.thicknessMap||!!x.specularIntensityMap||!!x.specularColorMap||!!x.sheenColorMap||!!x.sheenRoughnessMap,uvsVertexOnly:!(!!x.map||!!x.bumpMap||!!x.normalMap||!!x.specularMap||!!x.alphaMap||!!x.emissiveMap||!!x.roughnessMap||!!x.metalnessMap||!!x.clearcoatNormalMap||!!x.iridescenceMap||!!x.iridescenceThicknessMap||x.transmission>0||!!x.transmissionMap||!!x.thicknessMap||!!x.specularIntensityMap||!!x.specularColorMap||x.sheen>0||!!x.sheenColorMap||!!x.sheenRoughnessMap)&&!!x.displacementMap,fog:!!O,useFog:x.fog===!0,fogExp2:O&&O.isFogExp2,flatShading:!!x.flatShading,sizeAttenuation:x.sizeAttenuation,logarithmicDepthBuffer:h,skinning:$.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:k,morphTextureStride:ne,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:x.toneMapped?i.toneMapping:Sn,physicallyCorrectLights:i.physicallyCorrectLights,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Rt,flipSided:x.side===St,useDepthPacking:!!x.depthPacking,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:x.extensions&&x.extensions.derivatives,extensionFragDepth:x.extensions&&x.extensions.fragDepth,extensionDrawBuffers:x.extensions&&x.extensions.drawBuffers,extensionShaderTextureLOD:x.extensions&&x.extensions.shaderTextureLOD,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),customProgramCacheKey:x.customProgramCacheKey()}}function f(x){const w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)w.push(P),w.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(g(w,x),M(w,x),w.push(i.outputEncoding)),w.push(x.customProgramCacheKey),w.join()}function g(x,w){x.push(w.precision),x.push(w.outputEncoding),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.combine),x.push(w.vertexUvs),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function M(x,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.map&&o.enable(4),w.matcap&&o.enable(5),w.envMap&&o.enable(6),w.lightMap&&o.enable(7),w.aoMap&&o.enable(8),w.emissiveMap&&o.enable(9),w.bumpMap&&o.enable(10),w.normalMap&&o.enable(11),w.objectSpaceNormalMap&&o.enable(12),w.tangentSpaceNormalMap&&o.enable(13),w.clearcoat&&o.enable(14),w.clearcoatMap&&o.enable(15),w.clearcoatRoughnessMap&&o.enable(16),w.clearcoatNormalMap&&o.enable(17),w.iridescence&&o.enable(18),w.iridescenceMap&&o.enable(19),w.iridescenceThicknessMap&&o.enable(20),w.displacementMap&&o.enable(21),w.specularMap&&o.enable(22),w.roughnessMap&&o.enable(23),w.metalnessMap&&o.enable(24),w.gradientMap&&o.enable(25),w.alphaMap&&o.enable(26),w.alphaTest&&o.enable(27),w.vertexColors&&o.enable(28),w.vertexAlphas&&o.enable(29),w.vertexUvs&&o.enable(30),w.vertexTangents&&o.enable(31),w.uvsVertexOnly&&o.enable(32),x.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.physicallyCorrectLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.specularIntensityMap&&o.enable(15),w.specularColorMap&&o.enable(16),w.transmission&&o.enable(17),w.transmissionMap&&o.enable(18),w.thicknessMap&&o.enable(19),w.sheen&&o.enable(20),w.sheenColorMap&&o.enable(21),w.sheenRoughnessMap&&o.enable(22),w.decodeVideoTexture&&o.enable(23),w.opaque&&o.enable(24),x.push(o.mask)}function y(x){const w=v[x.type];let P;if(w){const z=rn[w];P=vh.clone(z.uniforms)}else P=x.uniforms;return P}function _(x,w){let P;for(let z=0,$=c.length;z<$;z++){const O=c[z];if(O.cacheKey===w){P=O,++P.usedTimes;break}}return P===void 0&&(P=new Em(i,w,x,r),c.push(P)),P}function S(x){if(--x.usedTimes===0){const w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),x.destroy()}}function E(x){l.remove(x)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:_,releaseProgram:S,releaseShaderCache:E,programs:c,dispose:D}}function Pm(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function Lm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ko(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Zo(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,p,v,m,f){let g=i[e];return g===void 0?(g={id:h.id,object:h,geometry:d,material:p,groupOrder:v,renderOrder:h.renderOrder,z:m,group:f},i[e]=g):(g.id=h.id,g.object=h,g.geometry=d,g.material=p,g.groupOrder=v,g.renderOrder=h.renderOrder,g.z=m,g.group=f),e++,g}function o(h,d,p,v,m,f){const g=a(h,d,p,v,m,f);p.transmission>0?n.push(g):p.transparent===!0?s.push(g):t.push(g)}function l(h,d,p,v,m,f){const g=a(h,d,p,v,m,f);p.transmission>0?n.unshift(g):p.transparent===!0?s.unshift(g):t.unshift(g)}function c(h,d){t.length>1&&t.sort(h||Lm),n.length>1&&n.sort(d||Ko),s.length>1&&s.sort(d||Ko)}function u(){for(let h=e,d=i.length;h<d;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function Im(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Zo,i.set(n,[a])):s>=r.length?(a=new Zo,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Nm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new xe};break;case"SpotLight":t={position:new C,direction:new C,color:new xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new xe,groundColor:new xe};break;case"RectAreaLight":t={color:new xe,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function Fm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Um=0;function Om(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Bm(i,e){const t=new Nm,n=Fm(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)s.probe.push(new C);const r=new C,a=new be,o=new be;function l(u,h){let d=0,p=0,v=0;for(let z=0;z<9;z++)s.probe[z].set(0,0,0);let m=0,f=0,g=0,M=0,y=0,_=0,S=0,E=0,D=0,x=0;u.sort(Om);const w=h!==!0?Math.PI:1;for(let z=0,$=u.length;z<$;z++){const O=u[z],N=O.color,H=O.intensity,K=O.distance,Z=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)d+=N.r*H*w,p+=N.g*H*w,v+=N.b*H*w;else if(O.isLightProbe)for(let V=0;V<9;V++)s.probe[V].addScaledVector(O.sh.coefficients[V],H);else if(O.isDirectionalLight){const V=t.get(O);if(V.color.copy(O.color).multiplyScalar(O.intensity*w),O.castShadow){const U=O.shadow,k=n.get(O);k.shadowBias=U.bias,k.shadowNormalBias=U.normalBias,k.shadowRadius=U.radius,k.shadowMapSize=U.mapSize,s.directionalShadow[m]=k,s.directionalShadowMap[m]=Z,s.directionalShadowMatrix[m]=O.shadow.matrix,_++}s.directional[m]=V,m++}else if(O.isSpotLight){const V=t.get(O);V.position.setFromMatrixPosition(O.matrixWorld),V.color.copy(N).multiplyScalar(H*w),V.distance=K,V.coneCos=Math.cos(O.angle),V.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),V.decay=O.decay,s.spot[g]=V;const U=O.shadow;if(O.map&&(s.spotLightMap[D]=O.map,D++,U.updateMatrices(O),O.castShadow&&x++),s.spotLightMatrix[g]=U.matrix,O.castShadow){const k=n.get(O);k.shadowBias=U.bias,k.shadowNormalBias=U.normalBias,k.shadowRadius=U.radius,k.shadowMapSize=U.mapSize,s.spotShadow[g]=k,s.spotShadowMap[g]=Z,E++}g++}else if(O.isRectAreaLight){const V=t.get(O);V.color.copy(N).multiplyScalar(H),V.halfWidth.set(O.width*.5,0,0),V.halfHeight.set(0,O.height*.5,0),s.rectArea[M]=V,M++}else if(O.isPointLight){const V=t.get(O);if(V.color.copy(O.color).multiplyScalar(O.intensity*w),V.distance=O.distance,V.decay=O.decay,O.castShadow){const U=O.shadow,k=n.get(O);k.shadowBias=U.bias,k.shadowNormalBias=U.normalBias,k.shadowRadius=U.radius,k.shadowMapSize=U.mapSize,k.shadowCameraNear=U.camera.near,k.shadowCameraFar=U.camera.far,s.pointShadow[f]=k,s.pointShadowMap[f]=Z,s.pointShadowMatrix[f]=O.shadow.matrix,S++}s.point[f]=V,f++}else if(O.isHemisphereLight){const V=t.get(O);V.skyColor.copy(O.color).multiplyScalar(H*w),V.groundColor.copy(O.groundColor).multiplyScalar(H*w),s.hemi[y]=V,y++}}M>0&&(e.isWebGL2||i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ie.LTC_FLOAT_1,s.rectAreaLTC2=ie.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ie.LTC_HALF_1,s.rectAreaLTC2=ie.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=p,s.ambient[2]=v;const P=s.hash;(P.directionalLength!==m||P.pointLength!==f||P.spotLength!==g||P.rectAreaLength!==M||P.hemiLength!==y||P.numDirectionalShadows!==_||P.numPointShadows!==S||P.numSpotShadows!==E||P.numSpotMaps!==D)&&(s.directional.length=m,s.spot.length=g,s.rectArea.length=M,s.point.length=f,s.hemi.length=y,s.directionalShadow.length=_,s.directionalShadowMap.length=_,s.pointShadow.length=S,s.pointShadowMap.length=S,s.spotShadow.length=E,s.spotShadowMap.length=E,s.directionalShadowMatrix.length=_,s.pointShadowMatrix.length=S,s.spotLightMatrix.length=E+D-x,s.spotLightMap.length=D,s.numSpotLightShadowsWithMaps=x,P.directionalLength=m,P.pointLength=f,P.spotLength=g,P.rectAreaLength=M,P.hemiLength=y,P.numDirectionalShadows=_,P.numPointShadows=S,P.numSpotShadows=E,P.numSpotMaps=D,s.version=Um++)}function c(u,h){let d=0,p=0,v=0,m=0,f=0;const g=h.matrixWorldInverse;for(let M=0,y=u.length;M<y;M++){const _=u[M];if(_.isDirectionalLight){const S=s.directional[d];S.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),d++}else if(_.isSpotLight){const S=s.spot[v];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),v++}else if(_.isRectAreaLight){const S=s.rectArea[m];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),o.identity(),a.copy(_.matrixWorld),a.premultiply(g),o.extractRotation(a),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),m++}else if(_.isPointLight){const S=s.point[p];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(g),p++}else if(_.isHemisphereLight){const S=s.hemi[f];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(g),f++}}}return{setup:l,setupView:c,state:s}}function Jo(i,e){const t=new Bm(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(h){n.push(h)}function o(h){s.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function zm(i,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new Jo(i,e),t.set(r,[l])):a>=o.length?(l=new Jo(i,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:n,dispose:s}}class _c extends Ot{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class km extends Ot{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new C,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Hm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Gm(i,e,t){let n=new wa;const s=new re,r=new re,a=new Xe,o=new _c({depthPacking:xa}),l=new km,c={},u=t.maxTextureSize,h={0:St,1:zn,2:Rt},d=new et({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:Hm,fragmentShader:Vm}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const v=new Yt;v.setAttribute("position",new pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new Et(v,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kl,this.render=function(_,S,E){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||_.length===0)return;const D=i.getRenderTarget(),x=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),P=i.state;P.setBlending(_t),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);for(let z=0,$=_.length;z<$;z++){const O=_[z],N=O.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const H=N.getFrameExtents();if(s.multiply(H),r.copy(N.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/H.x),s.x=r.x*H.x,N.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/H.y),s.y=r.y*H.y,N.mapSize.y=r.y)),N.map===null){const Z=this.type!==Li?{minFilter:je,magFilter:je}:{};N.map=new $e(s.x,s.y,Z),N.map.texture.name=O.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();const K=N.getViewportCount();for(let Z=0;Z<K;Z++){const V=N.getViewport(Z);a.set(r.x*V.x,r.y*V.y,r.x*V.z,r.y*V.w),P.viewport(a),N.updateMatrices(O,Z),n=N.getFrustum(),y(S,E,N.camera,O,this.type)}N.isPointLightShadow!==!0&&this.type===Li&&g(N,E),N.needsUpdate=!1}f.needsUpdate=!1,i.setRenderTarget(D,x,w)};function g(_,S){const E=e.update(m);d.defines.VSM_SAMPLES!==_.blurSamples&&(d.defines.VSM_SAMPLES=_.blurSamples,p.defines.VSM_SAMPLES=_.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),_.mapPass===null&&(_.mapPass=new $e(s.x,s.y)),d.uniforms.shadow_pass.value=_.map.texture,d.uniforms.resolution.value=_.mapSize,d.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(S,null,E,d,m,null),p.uniforms.shadow_pass.value=_.mapPass.texture,p.uniforms.resolution.value=_.mapSize,p.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(S,null,E,p,m,null)}function M(_,S,E,D,x,w){let P=null;const z=E.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(z!==void 0?P=z:P=E.isPointLight===!0?l:o,i.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0){const $=P.uuid,O=S.uuid;let N=c[$];N===void 0&&(N={},c[$]=N);let H=N[O];H===void 0&&(H=P.clone(),N[O]=H),P=H}return P.visible=S.visible,P.wireframe=S.wireframe,w===Li?P.side=S.shadowSide!==null?S.shadowSide:S.side:P.side=S.shadowSide!==null?S.shadowSide:h[S.side],P.alphaMap=S.alphaMap,P.alphaTest=S.alphaTest,P.clipShadows=S.clipShadows,P.clippingPlanes=S.clippingPlanes,P.clipIntersection=S.clipIntersection,P.displacementMap=S.displacementMap,P.displacementScale=S.displacementScale,P.displacementBias=S.displacementBias,P.wireframeLinewidth=S.wireframeLinewidth,P.linewidth=S.linewidth,E.isPointLight===!0&&P.isMeshDistanceMaterial===!0&&(P.referencePosition.setFromMatrixPosition(E.matrixWorld),P.nearDistance=D,P.farDistance=x),P}function y(_,S,E,D,x){if(_.visible===!1)return;if(_.layers.test(S.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&x===Li)&&(!_.frustumCulled||n.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,_.matrixWorld);const z=e.update(_),$=_.material;if(Array.isArray($)){const O=z.groups;for(let N=0,H=O.length;N<H;N++){const K=O[N],Z=$[K.materialIndex];if(Z&&Z.visible){const V=M(_,Z,D,E.near,E.far,x);i.renderBufferDirect(E,null,z,V,_,K)}}}else if($.visible){const O=M(_,$,D,E.near,E.far,x);i.renderBufferDirect(E,null,z,O,_,null)}}const P=_.children;for(let z=0,$=P.length;z<$;z++)y(P[z],S,E,D,x)}}function Wm(i,e,t){const n=t.isWebGL2;function s(){let L=!1;const j=new Xe;let Q=null;const ce=new Xe(0,0,0,0);return{setMask:function(me){Q!==me&&!L&&(i.colorMask(me,me,me,me),Q=me)},setLocked:function(me){L=me},setClear:function(me,ze,ht,yt,kn){kn===!0&&(me*=yt,ze*=yt,ht*=yt),j.set(me,ze,ht,yt),ce.equals(j)===!1&&(i.clearColor(me,ze,ht,yt),ce.copy(j))},reset:function(){L=!1,Q=null,ce.set(-1,0,0,0)}}}function r(){let L=!1,j=null,Q=null,ce=null;return{setTest:function(me){me?Be(2929):Se(2929)},setMask:function(me){j!==me&&!L&&(i.depthMask(me),j=me)},setFunc:function(me){if(Q!==me){switch(me){case Gl:i.depthFunc(512);break;case Wl:i.depthFunc(519);break;case Qr:i.depthFunc(513);break;case Js:i.depthFunc(515);break;case Qs:i.depthFunc(514);break;case jl:i.depthFunc(518);break;case Xl:i.depthFunc(516);break;case va:i.depthFunc(517);break;default:i.depthFunc(515)}Q=me}},setLocked:function(me){L=me},setClear:function(me){ce!==me&&(i.clearDepth(me),ce=me)},reset:function(){L=!1,j=null,Q=null,ce=null}}}function a(){let L=!1,j=null,Q=null,ce=null,me=null,ze=null,ht=null,yt=null,kn=null;return{setTest:function(Ke){L||(Ke?Be(2960):Se(2960))},setMask:function(Ke){j!==Ke&&!L&&(i.stencilMask(Ke),j=Ke)},setFunc:function(Ke,hn,kt){(Q!==Ke||ce!==hn||me!==kt)&&(i.stencilFunc(Ke,hn,kt),Q=Ke,ce=hn,me=kt)},setOp:function(Ke,hn,kt){(ze!==Ke||ht!==hn||yt!==kt)&&(i.stencilOp(Ke,hn,kt),ze=Ke,ht=hn,yt=kt)},setLocked:function(Ke){L=Ke},setClear:function(Ke){kn!==Ke&&(i.clearStencil(Ke),kn=Ke)},reset:function(){L=!1,j=null,Q=null,ce=null,me=null,ze=null,ht=null,yt=null,kn=null}}}const o=new s,l=new r,c=new a,u=new WeakMap,h=new WeakMap;let d={},p={},v=new WeakMap,m=[],f=null,g=!1,M=null,y=null,_=null,S=null,E=null,D=null,x=null,w=!1,P=null,z=null,$=null,O=null,N=null;const H=i.getParameter(35661);let K=!1,Z=0;const V=i.getParameter(7938);V.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(V)[1]),K=Z>=1):V.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),K=Z>=2);let U=null,k={};const ne=i.getParameter(3088),J=i.getParameter(2978),se=new Xe().fromArray(ne),de=new Xe().fromArray(J);function we(L,j,Q){const ce=new Uint8Array(4),me=i.createTexture();i.bindTexture(L,me),i.texParameteri(L,10241,9728),i.texParameteri(L,10240,9728);for(let ze=0;ze<Q;ze++)i.texImage2D(j+ze,0,6408,1,1,0,6408,5121,ce);return me}const q={};q[3553]=we(3553,3553,1),q[34067]=we(34067,34069,6),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Be(2929),l.setFunc(Js),rt(!1),Pt(Wa),Be(2884),tt(_t);function Be(L){d[L]!==!0&&(i.enable(L),d[L]=!0)}function Se(L){d[L]!==!1&&(i.disable(L),d[L]=!1)}function Te(L,j){return p[L]!==j?(i.bindFramebuffer(L,j),p[L]=j,n&&(L===36009&&(p[36160]=j),L===36160&&(p[36009]=j)),!0):!1}function he(L,j){let Q=m,ce=!1;if(L)if(Q=v.get(j),Q===void 0&&(Q=[],v.set(j,Q)),L.isWebGLMultipleRenderTargets){const me=L.texture;if(Q.length!==me.length||Q[0]!==36064){for(let ze=0,ht=me.length;ze<ht;ze++)Q[ze]=36064+ze;Q.length=me.length,ce=!0}}else Q[0]!==36064&&(Q[0]=36064,ce=!0);else Q[0]!==1029&&(Q[0]=1029,ce=!0);ce&&(t.isWebGL2?i.drawBuffers(Q):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Q))}function Ve(L){return f!==L?(i.useProgram(L),f=L,!0):!1}const Re={[Pi]:32774,[hu]:32778,[du]:32779};if(n)Re[Ya]=32775,Re[$a]=32776;else{const L=e.get("EXT_blend_minmax");L!==null&&(Re[Ya]=L.MIN_EXT,Re[$a]=L.MAX_EXT)}const _e={[fu]:0,[pu]:1,[mu]:768,[Hl]:770,[Mu]:776,[xu]:774,[vu]:772,[gu]:769,[Vl]:771,[yu]:775,[_u]:773};function tt(L,j,Q,ce,me,ze,ht,yt){if(L===_t){g===!0&&(Se(3042),g=!1);return}if(g===!1&&(Be(3042),g=!0),L!==uu){if(L!==M||yt!==w){if((y!==Pi||E!==Pi)&&(i.blendEquation(32774),y=Pi,E=Pi),yt)switch(L){case Ni:i.blendFuncSeparate(1,771,1,771);break;case ja:i.blendFunc(1,1);break;case Xa:i.blendFuncSeparate(0,769,0,1);break;case qa:i.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ni:i.blendFuncSeparate(770,771,1,771);break;case ja:i.blendFunc(770,1);break;case Xa:i.blendFuncSeparate(0,769,0,1);break;case qa:i.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}_=null,S=null,D=null,x=null,M=L,w=yt}return}me=me||j,ze=ze||Q,ht=ht||ce,(j!==y||me!==E)&&(i.blendEquationSeparate(Re[j],Re[me]),y=j,E=me),(Q!==_||ce!==S||ze!==D||ht!==x)&&(i.blendFuncSeparate(_e[Q],_e[ce],_e[ze],_e[ht]),_=Q,S=ce,D=ze,x=ht),M=L,w=null}function ut(L,j){L.side===Rt?Se(2884):Be(2884);let Q=L.side===St;j&&(Q=!Q),rt(Q),L.blending===Ni&&L.transparent===!1?tt(_t):tt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const ce=L.stencilWrite;c.setTest(ce),ce&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ge(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Be(32926):Se(32926)}function rt(L){P!==L&&(L?i.frontFace(2304):i.frontFace(2305),P=L)}function Pt(L){L!==ou?(Be(2884),L!==z&&(L===Wa?i.cullFace(1029):L===lu?i.cullFace(1028):i.cullFace(1032))):Se(2884),z=L}function at(L){L!==$&&(K&&i.lineWidth(L),$=L)}function Ge(L,j,Q){L?(Be(32823),(O!==j||N!==Q)&&(i.polygonOffset(j,Q),O=j,N=Q)):Se(32823)}function Bt(L){L?Be(3089):Se(3089)}function zt(L){L===void 0&&(L=33984+H-1),U!==L&&(i.activeTexture(L),U=L)}function A(L,j,Q){Q===void 0&&(U===null?Q=33984+H-1:Q=U);let ce=k[Q];ce===void 0&&(ce={type:void 0,texture:void 0},k[Q]=ce),(ce.type!==L||ce.texture!==j)&&(U!==Q&&(i.activeTexture(Q),U=Q),i.bindTexture(L,j||q[L]),ce.type=L,ce.texture=j)}function b(){const L=k[U];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function G(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ee(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function te(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ae(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Me(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function R(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function I(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function le(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function oe(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pe(L){se.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),se.copy(L))}function fe(L){de.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),de.copy(L))}function Ne(L,j){let Q=h.get(j);Q===void 0&&(Q=new WeakMap,h.set(j,Q));let ce=Q.get(L);ce===void 0&&(ce=i.getUniformBlockIndex(j,L.name),Q.set(L,ce))}function Fe(L,j){const ce=h.get(j).get(L);u.get(L)!==ce&&(i.uniformBlockBinding(j,ce,L.__bindingPointIndex),u.set(L,ce))}function qe(){i.disable(3042),i.disable(2884),i.disable(2929),i.disable(32823),i.disable(3089),i.disable(2960),i.disable(32926),i.blendEquation(32774),i.blendFunc(1,0),i.blendFuncSeparate(1,0,1,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(513),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(519,0,4294967295),i.stencilOp(7680,7680,7680),i.clearStencil(0),i.cullFace(1029),i.frontFace(2305),i.polygonOffset(0,0),i.activeTexture(33984),i.bindFramebuffer(36160,null),n===!0&&(i.bindFramebuffer(36009,null),i.bindFramebuffer(36008,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},U=null,k={},p={},v=new WeakMap,m=[],f=null,g=!1,M=null,y=null,_=null,S=null,E=null,D=null,x=null,w=!1,P=null,z=null,$=null,O=null,N=null,se.set(0,0,i.canvas.width,i.canvas.height),de.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Be,disable:Se,bindFramebuffer:Te,drawBuffers:he,useProgram:Ve,setBlending:tt,setMaterial:ut,setFlipSided:rt,setCullFace:Pt,setLineWidth:at,setPolygonOffset:Ge,setScissorTest:Bt,activeTexture:zt,bindTexture:A,unbindTexture:b,compressedTexImage2D:G,compressedTexImage3D:ee,texImage2D:ue,texImage3D:oe,updateUBOMapping:Ne,uniformBlockBinding:Fe,texStorage2D:I,texStorage3D:le,texSubImage2D:te,texSubImage3D:ae,compressedTexSubImage2D:Me,compressedTexSubImage3D:R,scissor:pe,viewport:fe,reset:qe}}function jm(i,e,t,n,s,r,a){const o=s.isWebGL2,l=s.maxTextures,c=s.maxCubemapSize,u=s.maxTextureSize,h=s.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=/OculusBrowser/g.test(typeof navigator>"u"?"":navigator.userAgent),v=new WeakMap;let m;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(A,b){return g?new OffscreenCanvas(A,b):ds("canvas")}function y(A,b,G,ee){let te=1;if((A.width>ee||A.height>ee)&&(te=ee/Math.max(A.width,A.height)),te<1||b===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const ae=b?nr:Math.floor,Me=ae(te*A.width),R=ae(te*A.height);m===void 0&&(m=M(Me,R));const I=G?M(Me,R):m;return I.width=Me,I.height=R,I.getContext("2d").drawImage(A,0,0,Me,R),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+Me+"x"+R+")."),I}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function _(A){return aa(A.width)&&aa(A.height)}function S(A){return o?!1:A.wrapS!==At||A.wrapT!==At||A.minFilter!==je&&A.minFilter!==Ee}function E(A,b){return A.generateMipmaps&&b&&A.minFilter!==je&&A.minFilter!==Ee}function D(A){i.generateMipmap(A)}function x(A,b,G,ee,te=!1){if(o===!1)return b;if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ae=b;return b===6403&&(G===5126&&(ae=33326),G===5131&&(ae=33325),G===5121&&(ae=33321)),b===33319&&(G===5126&&(ae=33328),G===5131&&(ae=33327),G===5121&&(ae=33323)),b===6408&&(G===5126&&(ae=34836),G===5131&&(ae=34842),G===5121&&(ae=ee===ye&&te===!1?35907:32856),G===32819&&(ae=32854),G===32820&&(ae=32855)),(ae===33325||ae===33326||ae===33327||ae===33328||ae===34842||ae===34836)&&e.get("EXT_color_buffer_float"),ae}function w(A,b,G){return E(A,G)===!0||A.isFramebufferTexture&&A.minFilter!==je&&A.minFilter!==Ee?Math.log2(Math.max(b.width,b.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?b.mipmaps.length:1}function P(A){return A===je||A===ta||A===na?9728:9729}function z(A){const b=A.target;b.removeEventListener("dispose",z),O(b),b.isVideoTexture&&v.delete(b)}function $(A){const b=A.target;b.removeEventListener("dispose",$),H(b)}function O(A){const b=n.get(A);if(b.__webglInit===void 0)return;const G=A.source,ee=f.get(G);if(ee){const te=ee[b.__cacheKey];te.usedTimes--,te.usedTimes===0&&N(A),Object.keys(ee).length===0&&f.delete(G)}n.remove(A)}function N(A){const b=n.get(A);i.deleteTexture(b.__webglTexture);const G=A.source,ee=f.get(G);delete ee[b.__cacheKey],a.memory.textures--}function H(A){const b=A.texture,G=n.get(A),ee=n.get(b);if(ee.__webglTexture!==void 0&&(i.deleteTexture(ee.__webglTexture),a.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let te=0;te<6;te++)i.deleteFramebuffer(G.__webglFramebuffer[te]),G.__webglDepthbuffer&&i.deleteRenderbuffer(G.__webglDepthbuffer[te]);else{if(i.deleteFramebuffer(G.__webglFramebuffer),G.__webglDepthbuffer&&i.deleteRenderbuffer(G.__webglDepthbuffer),G.__webglMultisampledFramebuffer&&i.deleteFramebuffer(G.__webglMultisampledFramebuffer),G.__webglColorRenderbuffer)for(let te=0;te<G.__webglColorRenderbuffer.length;te++)G.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(G.__webglColorRenderbuffer[te]);G.__webglDepthRenderbuffer&&i.deleteRenderbuffer(G.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let te=0,ae=b.length;te<ae;te++){const Me=n.get(b[te]);Me.__webglTexture&&(i.deleteTexture(Me.__webglTexture),a.memory.textures--),n.remove(b[te])}n.remove(b),n.remove(A)}let K=0;function Z(){K=0}function V(){const A=K;return A>=l&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+l),K+=1,A}function U(A){const b=[];return b.push(A.wrapS),b.push(A.wrapT),b.push(A.wrapR||0),b.push(A.magFilter),b.push(A.minFilter),b.push(A.anisotropy),b.push(A.internalFormat),b.push(A.format),b.push(A.type),b.push(A.generateMipmaps),b.push(A.premultiplyAlpha),b.push(A.flipY),b.push(A.unpackAlignment),b.push(A.encoding),b.join()}function k(A,b){const G=n.get(A);if(A.isVideoTexture&&Bt(A),A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){const ee=A.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Se(G,A,b);return}}t.bindTexture(3553,G.__webglTexture,33984+b)}function ne(A,b){const G=n.get(A);if(A.version>0&&G.__version!==A.version){Se(G,A,b);return}t.bindTexture(35866,G.__webglTexture,33984+b)}function J(A,b){const G=n.get(A);if(A.version>0&&G.__version!==A.version){Se(G,A,b);return}t.bindTexture(32879,G.__webglTexture,33984+b)}function se(A,b){const G=n.get(A);if(A.version>0&&G.__version!==A.version){Te(G,A,b);return}t.bindTexture(34067,G.__webglTexture,33984+b)}const de={[Qt]:10497,[At]:33071,[tr]:33648},we={[je]:9728,[ta]:9984,[na]:9986,[Ee]:9729,[Kl]:9985,[oi]:9987};function q(A,b,G){if(G?(i.texParameteri(A,10242,de[b.wrapS]),i.texParameteri(A,10243,de[b.wrapT]),(A===32879||A===35866)&&i.texParameteri(A,32882,de[b.wrapR]),i.texParameteri(A,10240,we[b.magFilter]),i.texParameteri(A,10241,we[b.minFilter])):(i.texParameteri(A,10242,33071),i.texParameteri(A,10243,33071),(A===32879||A===35866)&&i.texParameteri(A,32882,33071),(b.wrapS!==At||b.wrapT!==At)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(A,10240,P(b.magFilter)),i.texParameteri(A,10241,P(b.minFilter)),b.minFilter!==je&&b.minFilter!==Ee&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const ee=e.get("EXT_texture_filter_anisotropic");if(b.type===Ft&&e.has("OES_texture_float_linear")===!1||o===!1&&b.type===Ct&&e.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||n.get(b).__currentAnisotropy)&&(i.texParameterf(A,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy)}}function Be(A,b){let G=!1;A.__webglInit===void 0&&(A.__webglInit=!0,b.addEventListener("dispose",z));const ee=b.source;let te=f.get(ee);te===void 0&&(te={},f.set(ee,te));const ae=U(b);if(ae!==A.__cacheKey){te[ae]===void 0&&(te[ae]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),te[ae].usedTimes++;const Me=te[A.__cacheKey];Me!==void 0&&(te[A.__cacheKey].usedTimes--,Me.usedTimes===0&&N(b)),A.__cacheKey=ae,A.__webglTexture=te[ae].texture}return G}function Se(A,b,G){let ee=3553;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ee=35866),b.isData3DTexture&&(ee=32879);const te=Be(A,b),ae=b.source;t.bindTexture(ee,A.__webglTexture,33984+G);const Me=n.get(ae);if(ae.version!==Me.__version||te===!0){t.activeTexture(33984+G),i.pixelStorei(37440,b.flipY),i.pixelStorei(37441,b.premultiplyAlpha),i.pixelStorei(3317,b.unpackAlignment),i.pixelStorei(37443,0);const R=S(b)&&_(b.image)===!1;let I=y(b.image,R,!1,u);I=zt(b,I);const le=_(I)||o,ue=r.convert(b.format,b.encoding);let oe=r.convert(b.type),pe=x(b.internalFormat,ue,oe,b.encoding,b.isVideoTexture);q(ee,b,le);let fe;const Ne=b.mipmaps,Fe=o&&b.isVideoTexture!==!0,qe=Me.__version===void 0||te===!0,L=w(b,I,le);if(b.isDepthTexture)pe=6402,o?b.type===Ft?pe=36012:b.type===On?pe=33190:b.type===ti?pe=35056:pe=33189:b.type===Ft&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===ni&&pe===6402&&b.type!==Zl&&b.type!==On&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=On,oe=r.convert(b.type)),b.format===ri&&pe===6402&&(pe=34041,b.type!==ti&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=ti,oe=r.convert(b.type))),qe&&(Fe?t.texStorage2D(3553,1,pe,I.width,I.height):t.texImage2D(3553,0,pe,I.width,I.height,0,ue,oe,null));else if(b.isDataTexture)if(Ne.length>0&&le){Fe&&qe&&t.texStorage2D(3553,L,pe,Ne[0].width,Ne[0].height);for(let j=0,Q=Ne.length;j<Q;j++)fe=Ne[j],Fe?t.texSubImage2D(3553,j,0,0,fe.width,fe.height,ue,oe,fe.data):t.texImage2D(3553,j,pe,fe.width,fe.height,0,ue,oe,fe.data);b.generateMipmaps=!1}else Fe?(qe&&t.texStorage2D(3553,L,pe,I.width,I.height),t.texSubImage2D(3553,0,0,0,I.width,I.height,ue,oe,I.data)):t.texImage2D(3553,0,pe,I.width,I.height,0,ue,oe,I.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Fe&&qe&&t.texStorage3D(35866,L,pe,Ne[0].width,Ne[0].height,I.depth);for(let j=0,Q=Ne.length;j<Q;j++)fe=Ne[j],b.format!==vt?ue!==null?Fe?t.compressedTexSubImage3D(35866,j,0,0,0,fe.width,fe.height,I.depth,ue,fe.data,0,0):t.compressedTexImage3D(35866,j,pe,fe.width,fe.height,I.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?t.texSubImage3D(35866,j,0,0,0,fe.width,fe.height,I.depth,ue,oe,fe.data):t.texImage3D(35866,j,pe,fe.width,fe.height,I.depth,0,ue,oe,fe.data)}else{Fe&&qe&&t.texStorage2D(3553,L,pe,Ne[0].width,Ne[0].height);for(let j=0,Q=Ne.length;j<Q;j++)fe=Ne[j],b.format!==vt?ue!==null?Fe?t.compressedTexSubImage2D(3553,j,0,0,fe.width,fe.height,ue,fe.data):t.compressedTexImage2D(3553,j,pe,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?t.texSubImage2D(3553,j,0,0,fe.width,fe.height,ue,oe,fe.data):t.texImage2D(3553,j,pe,fe.width,fe.height,0,ue,oe,fe.data)}else if(b.isDataArrayTexture)Fe?(qe&&t.texStorage3D(35866,L,pe,I.width,I.height,I.depth),t.texSubImage3D(35866,0,0,0,0,I.width,I.height,I.depth,ue,oe,I.data)):t.texImage3D(35866,0,pe,I.width,I.height,I.depth,0,ue,oe,I.data);else if(b.isData3DTexture)Fe?(qe&&t.texStorage3D(32879,L,pe,I.width,I.height,I.depth),t.texSubImage3D(32879,0,0,0,0,I.width,I.height,I.depth,ue,oe,I.data)):t.texImage3D(32879,0,pe,I.width,I.height,I.depth,0,ue,oe,I.data);else if(b.isFramebufferTexture){if(qe)if(Fe)t.texStorage2D(3553,L,pe,I.width,I.height);else{let j=I.width,Q=I.height;for(let ce=0;ce<L;ce++)t.texImage2D(3553,ce,pe,j,Q,0,ue,oe,null),j>>=1,Q>>=1}}else if(Ne.length>0&&le){Fe&&qe&&t.texStorage2D(3553,L,pe,Ne[0].width,Ne[0].height);for(let j=0,Q=Ne.length;j<Q;j++)fe=Ne[j],Fe?t.texSubImage2D(3553,j,0,0,ue,oe,fe):t.texImage2D(3553,j,pe,ue,oe,fe);b.generateMipmaps=!1}else Fe?(qe&&t.texStorage2D(3553,L,pe,I.width,I.height),t.texSubImage2D(3553,0,0,0,ue,oe,I)):t.texImage2D(3553,0,pe,ue,oe,I);E(b,le)&&D(ee),Me.__version=ae.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function Te(A,b,G){if(b.image.length!==6)return;const ee=Be(A,b),te=b.source;t.bindTexture(34067,A.__webglTexture,33984+G);const ae=n.get(te);if(te.version!==ae.__version||ee===!0){t.activeTexture(33984+G),i.pixelStorei(37440,b.flipY),i.pixelStorei(37441,b.premultiplyAlpha),i.pixelStorei(3317,b.unpackAlignment),i.pixelStorei(37443,0);const Me=b.isCompressedTexture||b.image[0].isCompressedTexture,R=b.image[0]&&b.image[0].isDataTexture,I=[];for(let j=0;j<6;j++)!Me&&!R?I[j]=y(b.image[j],!1,!0,c):I[j]=R?b.image[j].image:b.image[j],I[j]=zt(b,I[j]);const le=I[0],ue=_(le)||o,oe=r.convert(b.format,b.encoding),pe=r.convert(b.type),fe=x(b.internalFormat,oe,pe,b.encoding),Ne=o&&b.isVideoTexture!==!0,Fe=ae.__version===void 0||ee===!0;let qe=w(b,le,ue);q(34067,b,ue);let L;if(Me){Ne&&Fe&&t.texStorage2D(34067,qe,fe,le.width,le.height);for(let j=0;j<6;j++){L=I[j].mipmaps;for(let Q=0;Q<L.length;Q++){const ce=L[Q];b.format!==vt?oe!==null?Ne?t.compressedTexSubImage2D(34069+j,Q,0,0,ce.width,ce.height,oe,ce.data):t.compressedTexImage2D(34069+j,Q,fe,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?t.texSubImage2D(34069+j,Q,0,0,ce.width,ce.height,oe,pe,ce.data):t.texImage2D(34069+j,Q,fe,ce.width,ce.height,0,oe,pe,ce.data)}}}else{L=b.mipmaps,Ne&&Fe&&(L.length>0&&qe++,t.texStorage2D(34067,qe,fe,I[0].width,I[0].height));for(let j=0;j<6;j++)if(R){Ne?t.texSubImage2D(34069+j,0,0,0,I[j].width,I[j].height,oe,pe,I[j].data):t.texImage2D(34069+j,0,fe,I[j].width,I[j].height,0,oe,pe,I[j].data);for(let Q=0;Q<L.length;Q++){const me=L[Q].image[j].image;Ne?t.texSubImage2D(34069+j,Q+1,0,0,me.width,me.height,oe,pe,me.data):t.texImage2D(34069+j,Q+1,fe,me.width,me.height,0,oe,pe,me.data)}}else{Ne?t.texSubImage2D(34069+j,0,0,0,oe,pe,I[j]):t.texImage2D(34069+j,0,fe,oe,pe,I[j]);for(let Q=0;Q<L.length;Q++){const ce=L[Q];Ne?t.texSubImage2D(34069+j,Q+1,0,0,oe,pe,ce.image[j]):t.texImage2D(34069+j,Q+1,fe,oe,pe,ce.image[j])}}}E(b,ue)&&D(34067),ae.__version=te.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function he(A,b,G,ee,te){const ae=r.convert(G.format,G.encoding),Me=r.convert(G.type),R=x(G.internalFormat,ae,Me,G.encoding);n.get(b).__hasExternalTextures||(te===32879||te===35866?t.texImage3D(te,0,R,b.width,b.height,b.depth,0,ae,Me,null):t.texImage2D(te,0,R,b.width,b.height,0,ae,Me,null)),t.bindFramebuffer(36160,A),Ge(b)?d.framebufferTexture2DMultisampleEXT(36160,ee,te,n.get(G).__webglTexture,0,at(b)):(te===3553||te>=34069&&te<=34074)&&i.framebufferTexture2D(36160,ee,te,n.get(G).__webglTexture,0),t.bindFramebuffer(36160,null)}function Ve(A,b,G){if(i.bindRenderbuffer(36161,A),b.depthBuffer&&!b.stencilBuffer){let ee=33189;if(G||Ge(b)){const te=b.depthTexture;te&&te.isDepthTexture&&(te.type===Ft?ee=36012:te.type===On&&(ee=33190));const ae=at(b);Ge(b)?d.renderbufferStorageMultisampleEXT(36161,ae,ee,b.width,b.height):i.renderbufferStorageMultisample(36161,ae,ee,b.width,b.height)}else i.renderbufferStorage(36161,ee,b.width,b.height);i.framebufferRenderbuffer(36160,36096,36161,A)}else if(b.depthBuffer&&b.stencilBuffer){const ee=at(b);G&&Ge(b)===!1?i.renderbufferStorageMultisample(36161,ee,35056,b.width,b.height):Ge(b)?d.renderbufferStorageMultisampleEXT(36161,ee,35056,b.width,b.height):i.renderbufferStorage(36161,34041,b.width,b.height),i.framebufferRenderbuffer(36160,33306,36161,A)}else{const ee=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let te=0;te<ee.length;te++){const ae=ee[te],Me=r.convert(ae.format,ae.encoding),R=r.convert(ae.type),I=x(ae.internalFormat,Me,R,ae.encoding),le=at(b);G&&Ge(b)===!1?i.renderbufferStorageMultisample(36161,le,I,b.width,b.height):Ge(b)?d.renderbufferStorageMultisampleEXT(36161,le,I,b.width,b.height):i.renderbufferStorage(36161,I,b.width,b.height)}}i.bindRenderbuffer(36161,null)}function Re(A,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,A),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),k(b.depthTexture,0);const ee=n.get(b.depthTexture).__webglTexture,te=at(b);if(b.depthTexture.format===ni)Ge(b)?d.framebufferTexture2DMultisampleEXT(36160,36096,3553,ee,0,te):i.framebufferTexture2D(36160,36096,3553,ee,0);else if(b.depthTexture.format===ri)Ge(b)?d.framebufferTexture2DMultisampleEXT(36160,33306,3553,ee,0,te):i.framebufferTexture2D(36160,33306,3553,ee,0);else throw new Error("Unknown depthTexture format")}function _e(A){const b=n.get(A),G=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!b.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Re(b.__webglFramebuffer,A)}else if(G){b.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)t.bindFramebuffer(36160,b.__webglFramebuffer[ee]),b.__webglDepthbuffer[ee]=i.createRenderbuffer(),Ve(b.__webglDepthbuffer[ee],A,!1)}else t.bindFramebuffer(36160,b.__webglFramebuffer),b.__webglDepthbuffer=i.createRenderbuffer(),Ve(b.__webglDepthbuffer,A,!1);t.bindFramebuffer(36160,null)}function tt(A,b,G){const ee=n.get(A);b!==void 0&&he(ee.__webglFramebuffer,A,A.texture,36064,3553),G!==void 0&&_e(A)}function ut(A){const b=A.texture,G=n.get(A),ee=n.get(b);A.addEventListener("dispose",$),A.isWebGLMultipleRenderTargets!==!0&&(ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture()),ee.__version=b.version,a.memory.textures++);const te=A.isWebGLCubeRenderTarget===!0,ae=A.isWebGLMultipleRenderTargets===!0,Me=_(A)||o;if(te){G.__webglFramebuffer=[];for(let R=0;R<6;R++)G.__webglFramebuffer[R]=i.createFramebuffer()}else{if(G.__webglFramebuffer=i.createFramebuffer(),ae)if(s.drawBuffers){const R=A.texture;for(let I=0,le=R.length;I<le;I++){const ue=n.get(R[I]);ue.__webglTexture===void 0&&(ue.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&A.samples>0&&Ge(A)===!1){const R=ae?b:[b];G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,G.__webglMultisampledFramebuffer);for(let I=0;I<R.length;I++){const le=R[I];G.__webglColorRenderbuffer[I]=i.createRenderbuffer(),i.bindRenderbuffer(36161,G.__webglColorRenderbuffer[I]);const ue=r.convert(le.format,le.encoding),oe=r.convert(le.type),pe=x(le.internalFormat,ue,oe,le.encoding,A.isXRRenderTarget===!0),fe=at(A);i.renderbufferStorageMultisample(36161,fe,pe,A.width,A.height),i.framebufferRenderbuffer(36160,36064+I,36161,G.__webglColorRenderbuffer[I])}i.bindRenderbuffer(36161,null),A.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),Ve(G.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(36160,null)}}if(te){t.bindTexture(34067,ee.__webglTexture),q(34067,b,Me);for(let R=0;R<6;R++)he(G.__webglFramebuffer[R],A,b,36064,34069+R);E(b,Me)&&D(34067),t.unbindTexture()}else if(ae){const R=A.texture;for(let I=0,le=R.length;I<le;I++){const ue=R[I],oe=n.get(ue);t.bindTexture(3553,oe.__webglTexture),q(3553,ue,Me),he(G.__webglFramebuffer,A,ue,36064+I,3553),E(ue,Me)&&D(3553)}t.unbindTexture()}else{let R=3553;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(o?R=A.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(R,ee.__webglTexture),q(R,b,Me),he(G.__webglFramebuffer,A,b,36064,R),E(b,Me)&&D(R),t.unbindTexture()}A.depthBuffer&&_e(A)}function rt(A){const b=_(A)||o,G=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ee=0,te=G.length;ee<te;ee++){const ae=G[ee];if(E(ae,b)){const Me=A.isWebGLCubeRenderTarget?34067:3553,R=n.get(ae).__webglTexture;t.bindTexture(Me,R),D(Me),t.unbindTexture()}}}function Pt(A){if(o&&A.samples>0&&Ge(A)===!1){const b=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],G=A.width,ee=A.height;let te=16384;const ae=[],Me=A.stencilBuffer?33306:36096,R=n.get(A),I=A.isWebGLMultipleRenderTargets===!0;if(I)for(let le=0;le<b.length;le++)t.bindFramebuffer(36160,R.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(36160,36064+le,36161,null),t.bindFramebuffer(36160,R.__webglFramebuffer),i.framebufferTexture2D(36009,36064+le,3553,null,0);t.bindFramebuffer(36008,R.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,R.__webglFramebuffer);for(let le=0;le<b.length;le++){ae.push(36064+le),A.depthBuffer&&ae.push(Me);const ue=R.__ignoreDepthValues!==void 0?R.__ignoreDepthValues:!1;if(ue===!1&&(A.depthBuffer&&(te|=256),A.stencilBuffer&&(te|=1024)),I&&i.framebufferRenderbuffer(36008,36064,36161,R.__webglColorRenderbuffer[le]),ue===!0&&(i.invalidateFramebuffer(36008,[Me]),i.invalidateFramebuffer(36009,[Me])),I){const oe=n.get(b[le]).__webglTexture;i.framebufferTexture2D(36009,36064,3553,oe,0)}i.blitFramebuffer(0,0,G,ee,0,0,G,ee,te,9728),p&&i.invalidateFramebuffer(36008,ae)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),I)for(let le=0;le<b.length;le++){t.bindFramebuffer(36160,R.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(36160,36064+le,36161,R.__webglColorRenderbuffer[le]);const ue=n.get(b[le]).__webglTexture;t.bindFramebuffer(36160,R.__webglFramebuffer),i.framebufferTexture2D(36009,36064+le,3553,ue,0)}t.bindFramebuffer(36009,R.__webglMultisampledFramebuffer)}}function at(A){return Math.min(h,A.samples)}function Ge(A){const b=n.get(A);return o&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Bt(A){const b=a.render.frame;v.get(A)!==b&&(v.set(A,b),A.update())}function zt(A,b){const G=A.encoding,ee=A.format,te=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===ra||G!==ln&&(G===ye?o===!1?e.has("EXT_sRGB")===!0&&ee===vt?(A.format=ra,A.minFilter=Ee,A.generateMipmaps=!1):b=rc.sRGBToLinear(b):(ee!==vt||te!==xt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",G)),b}this.allocateTextureUnit=V,this.resetTextureUnits=Z,this.setTexture2D=k,this.setTexture2DArray=ne,this.setTexture3D=J,this.setTextureCube=se,this.rebindTextures=tt,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=he,this.useMultisampledRTT=Ge}function Xm(i,e,t){const n=t.isWebGL2;function s(r,a=null){let o;if(r===xt)return 5121;if(r===Pu)return 32819;if(r===Lu)return 32820;if(r===Ru)return 5120;if(r===Cu)return 5122;if(r===Zl)return 5123;if(r===Du)return 5124;if(r===On)return 5125;if(r===Ft)return 5126;if(r===Ct)return n?5131:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Iu)return 6406;if(r===vt)return 6408;if(r===_a)return 6409;if(r===Fu)return 6410;if(r===ni)return 6402;if(r===ri)return 34041;if(r===Jl)return 6403;if(r===Nu)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(r===ra)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Uu)return 36244;if(r===Ql)return 33319;if(r===Ou)return 33320;if(r===Bu)return 36249;if(r===pr||r===mr||r===gr||r===vr)if(a===ye)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===pr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===mr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===gr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===vr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===pr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===mr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===gr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===vr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Ka||r===Za||r===Ja||r===Qa)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Ka)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Za)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ja)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Qa)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===zu)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===eo||r===to)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===eo)return a===ye?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===to)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===no||r===io||r===so||r===ro||r===ao||r===oo||r===lo||r===co||r===uo||r===ho||r===fo||r===po||r===mo||r===go)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===no)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===io)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===so)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===ro)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ao)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===oo)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===lo)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===co)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===uo)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ho)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===fo)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===po)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===mo)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===go)return a===ye?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===vo)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===vo)return a===ye?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return r===ti?n?34042:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class qm extends ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ei extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ym={type:"move"};class Wr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const m of e.hand.values()){const f=t.getJointPose(m,n);if(c.joints[m.jointName]===void 0){const M=new ei;M.matrixAutoUpdate=!1,M.visible=!1,c.joints[m.jointName]=M,c.add(M)}const g=c.joints[m.jointName];f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.jointRadius=f.radius),g.visible=f!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&d>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ym)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}}class xc extends st{constructor(e,t,n,s,r,a,o,l,c,u){if(u=u!==void 0?u:ni,u!==ni&&u!==ri)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ni&&(n=On),n===void 0&&u===ri&&(n=ti),super(null,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:je,this.minFilter=l!==void 0?l:je,this.flipY=!1,this.generateMipmaps=!1}}class $m extends cn{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=null,c=null,u=null,h=null,d=null,p=null;const v=t.getContextAttributes();let m=null,f=null;const g=[],M=[],y=new ft;y.layers.enable(1),y.viewport=new Xe;const _=new ft;_.layers.enable(2),_.viewport=new Xe;const S=[y,_],E=new qm;E.layers.enable(1),E.layers.enable(2);let D=null,x=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let k=g[U];return k===void 0&&(k=new Wr,g[U]=k),k.getTargetRaySpace()},this.getControllerGrip=function(U){let k=g[U];return k===void 0&&(k=new Wr,g[U]=k),k.getGripSpace()},this.getHand=function(U){let k=g[U];return k===void 0&&(k=new Wr,g[U]=k),k.getHandSpace()};function w(U){const k=M.indexOf(U.inputSource);if(k===-1)return;const ne=g[k];ne!==void 0&&ne.dispatchEvent({type:U.type,data:U.inputSource})}function P(){s.removeEventListener("select",w),s.removeEventListener("selectstart",w),s.removeEventListener("selectend",w),s.removeEventListener("squeeze",w),s.removeEventListener("squeezestart",w),s.removeEventListener("squeezeend",w),s.removeEventListener("end",P),s.removeEventListener("inputsourceschange",z);for(let U=0;U<g.length;U++){const k=M[U];k!==null&&(M[U]=null,g[U].disconnect(k))}D=null,x=null,e.setRenderTarget(m),d=null,h=null,u=null,s=null,f=null,V.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){r=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){o=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(U){l=U},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(U){if(s=U,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",w),s.addEventListener("selectstart",w),s.addEventListener("selectend",w),s.addEventListener("squeeze",w),s.addEventListener("squeezestart",w),s.addEventListener("squeezeend",w),s.addEventListener("end",P),s.addEventListener("inputsourceschange",z),v.xrCompatible!==!0&&await t.makeXRCompatible(),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const k={antialias:s.renderState.layers===void 0?v.antialias:!0,alpha:v.alpha,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,k),s.updateRenderState({baseLayer:d}),f=new $e(d.framebufferWidth,d.framebufferHeight,{format:vt,type:xt,encoding:e.outputEncoding,stencilBuffer:v.stencil})}else{let k=null,ne=null,J=null;v.depth&&(J=v.stencil?35056:33190,k=v.stencil?ri:ni,ne=v.stencil?ti:On);const se={colorFormat:32856,depthFormat:J,scaleFactor:r};u=new XRWebGLBinding(s,t),h=u.createProjectionLayer(se),s.updateRenderState({layers:[h]}),f=new $e(h.textureWidth,h.textureHeight,{format:vt,type:xt,depthTexture:new xc(h.textureWidth,h.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:v.stencil,encoding:e.outputEncoding,samples:v.antialias?4:0});const de=e.properties.get(f);de.__ignoreDepthValues=h.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(1),l=null,a=await s.requestReferenceSpace(o),V.setContext(s),V.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function z(U){for(let k=0;k<U.removed.length;k++){const ne=U.removed[k],J=M.indexOf(ne);J>=0&&(M[J]=null,g[J].dispatchEvent({type:"disconnected",data:ne}))}for(let k=0;k<U.added.length;k++){const ne=U.added[k];let J=M.indexOf(ne);if(J===-1){for(let de=0;de<g.length;de++)if(de>=M.length){M.push(ne),J=de;break}else if(M[de]===null){M[de]=ne,J=de;break}if(J===-1)break}const se=g[J];se&&se.dispatchEvent({type:"connected",data:ne})}}const $=new C,O=new C;function N(U,k,ne){$.setFromMatrixPosition(k.matrixWorld),O.setFromMatrixPosition(ne.matrixWorld);const J=$.distanceTo(O),se=k.projectionMatrix.elements,de=ne.projectionMatrix.elements,we=se[14]/(se[10]-1),q=se[14]/(se[10]+1),Be=(se[9]+1)/se[5],Se=(se[9]-1)/se[5],Te=(se[8]-1)/se[0],he=(de[8]+1)/de[0],Ve=we*Te,Re=we*he,_e=J/(-Te+he),tt=_e*-Te;k.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(tt),U.translateZ(_e),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert();const ut=we+_e,rt=q+_e,Pt=Ve-tt,at=Re+(J-tt),Ge=Be*q/rt*ut,Bt=Se*q/rt*ut;U.projectionMatrix.makePerspective(Pt,at,Ge,Bt,ut,rt)}function H(U,k){k===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(k.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(s===null)return;E.near=_.near=y.near=U.near,E.far=_.far=y.far=U.far,(D!==E.near||x!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),D=E.near,x=E.far);const k=U.parent,ne=E.cameras;H(E,k);for(let se=0;se<ne.length;se++)H(ne[se],k);E.matrixWorld.decompose(E.position,E.quaternion,E.scale),U.matrix.copy(E.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale);const J=U.children;for(let se=0,de=J.length;se<de;se++)J[se].updateMatrixWorld(!0);ne.length===2?N(E,y,_):E.projectionMatrix.copy(y.projectionMatrix)},this.getCamera=function(){return E},this.getFoveation=function(){if(h!==null)return h.fixedFoveation;if(d!==null)return d.fixedFoveation},this.setFoveation=function(U){h!==null&&(h.fixedFoveation=U),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=U)};let K=null;function Z(U,k){if(c=k.getViewerPose(l||a),p=k,c!==null){const ne=c.views;d!==null&&(e.setRenderTargetFramebuffer(f,d.framebuffer),e.setRenderTarget(f));let J=!1;ne.length!==E.cameras.length&&(E.cameras.length=0,J=!0);for(let se=0;se<ne.length;se++){const de=ne[se];let we=null;if(d!==null)we=d.getViewport(de);else{const Be=u.getViewSubImage(h,de);we=Be.viewport,se===0&&(e.setRenderTargetTextures(f,Be.colorTexture,h.ignoreDepthValues?void 0:Be.depthStencilTexture),e.setRenderTarget(f))}let q=S[se];q===void 0&&(q=new ft,q.layers.enable(se),q.viewport=new Xe,S[se]=q),q.matrix.fromArray(de.transform.matrix),q.projectionMatrix.fromArray(de.projectionMatrix),q.viewport.set(we.x,we.y,we.width,we.height),se===0&&E.matrix.copy(q.matrix),J===!0&&E.cameras.push(q)}}for(let ne=0;ne<g.length;ne++){const J=M[ne],se=g[ne];J!==null&&se!==void 0&&se.update(J,k,l||a)}K&&K(U,k),p=null}const V=new fc;V.setAnimationLoop(Z),this.setAnimationLoop=function(U){K=U},this.dispose=function(){}}}function Km(i,e){function t(m,f){m.fogColor.value.copy(f.color),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function n(m,f,g,M,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),c(m,f)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&d(m,f,y)):f.isMeshMatcapMaterial?(s(m,f),p(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),v(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?o(m,f,g,M):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map),f.alphaMap&&(m.alphaMap.value=f.alphaMap),f.bumpMap&&(m.bumpMap.value=f.bumpMap,m.bumpScale.value=f.bumpScale,f.side===St&&(m.bumpScale.value*=-1)),f.displacementMap&&(m.displacementMap.value=f.displacementMap,m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap),f.normalMap&&(m.normalMap.value=f.normalMap,m.normalScale.value.copy(f.normalScale),f.side===St&&m.normalScale.value.negate()),f.specularMap&&(m.specularMap.value=f.specularMap),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const g=e.get(f).envMap;if(g&&(m.envMap.value=g,m.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const _=i.physicallyCorrectLights!==!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*_}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity);let M;f.map?M=f.map:f.specularMap?M=f.specularMap:f.displacementMap?M=f.displacementMap:f.normalMap?M=f.normalMap:f.bumpMap?M=f.bumpMap:f.roughnessMap?M=f.roughnessMap:f.metalnessMap?M=f.metalnessMap:f.alphaMap?M=f.alphaMap:f.emissiveMap?M=f.emissiveMap:f.clearcoatMap?M=f.clearcoatMap:f.clearcoatNormalMap?M=f.clearcoatNormalMap:f.clearcoatRoughnessMap?M=f.clearcoatRoughnessMap:f.iridescenceMap?M=f.iridescenceMap:f.iridescenceThicknessMap?M=f.iridescenceThicknessMap:f.specularIntensityMap?M=f.specularIntensityMap:f.specularColorMap?M=f.specularColorMap:f.transmissionMap?M=f.transmissionMap:f.thicknessMap?M=f.thicknessMap:f.sheenColorMap?M=f.sheenColorMap:f.sheenRoughnessMap&&(M=f.sheenRoughnessMap),M!==void 0&&(M.isWebGLRenderTarget&&(M=M.texture),M.matrixAutoUpdate===!0&&M.updateMatrix(),m.uvTransform.value.copy(M.matrix));let y;f.aoMap?y=f.aoMap:f.lightMap&&(y=f.lightMap),y!==void 0&&(y.isWebGLRenderTarget&&(y=y.texture),y.matrixAutoUpdate===!0&&y.updateMatrix(),m.uv2Transform.value.copy(y.matrix))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function o(m,f,g,M){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*g,m.scale.value=M*.5,f.map&&(m.map.value=f.map),f.alphaMap&&(m.alphaMap.value=f.alphaMap),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let y;f.map?y=f.map:f.alphaMap&&(y=f.alphaMap),y!==void 0&&(y.matrixAutoUpdate===!0&&y.updateMatrix(),m.uvTransform.value.copy(y.matrix))}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map),f.alphaMap&&(m.alphaMap.value=f.alphaMap),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let g;f.map?g=f.map:f.alphaMap&&(g=f.alphaMap),g!==void 0&&(g.matrixAutoUpdate===!0&&g.updateMatrix(),m.uvTransform.value.copy(g.matrix))}function c(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.roughness.value=f.roughness,m.metalness.value=f.metalness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap),f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function d(m,f,g){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap)),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap),f.clearcoatNormalMap&&(m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),m.clearcoatNormalMap.value=f.clearcoatNormalMap,f.side===St&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap)),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=g.texture,m.transmissionSamplerSize.value.set(g.width,g.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap)}function p(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){m.referencePosition.value.copy(f.referencePosition),m.nearDistance.value=f.nearDistance,m.farDistance.value=f.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:n}}function Zm(i,e,t,n){let s={},r={},a=[];const o=t.isWebGL2?i.getParameter(35375):0;function l(M,y){const _=y.program;n.uniformBlockBinding(M,_)}function c(M,y){let _=s[M.id];_===void 0&&(v(M),_=u(M),s[M.id]=_,M.addEventListener("dispose",f));const S=y.program;n.updateUBOMapping(M,S);const E=e.render.frame;r[M.id]!==E&&(d(M),r[M.id]=E)}function u(M){const y=h();M.__bindingPointIndex=y;const _=i.createBuffer(),S=M.__size,E=M.usage;return i.bindBuffer(35345,_),i.bufferData(35345,S,E),i.bindBuffer(35345,null),i.bindBufferBase(35345,y,_),_}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const y=s[M.id],_=M.uniforms,S=M.__cache;i.bindBuffer(35345,y);for(let E=0,D=_.length;E<D;E++){const x=_[E];if(p(x,E,S)===!0){const w=x.value,P=x.__offset;typeof w=="number"?(x.__data[0]=w,i.bufferSubData(35345,P,x.__data)):(x.value.isMatrix3?(x.__data[0]=x.value.elements[0],x.__data[1]=x.value.elements[1],x.__data[2]=x.value.elements[2],x.__data[3]=x.value.elements[0],x.__data[4]=x.value.elements[3],x.__data[5]=x.value.elements[4],x.__data[6]=x.value.elements[5],x.__data[7]=x.value.elements[0],x.__data[8]=x.value.elements[6],x.__data[9]=x.value.elements[7],x.__data[10]=x.value.elements[8],x.__data[11]=x.value.elements[0]):w.toArray(x.__data),i.bufferSubData(35345,P,x.__data))}}i.bindBuffer(35345,null)}function p(M,y,_){const S=M.value;if(_[y]===void 0)return typeof S=="number"?_[y]=S:_[y]=S.clone(),!0;if(typeof S=="number"){if(_[y]!==S)return _[y]=S,!0}else{const E=_[y];if(E.equals(S)===!1)return E.copy(S),!0}return!1}function v(M){const y=M.uniforms;let _=0;const S=16;let E=0;for(let D=0,x=y.length;D<x;D++){const w=y[D],P=m(w);if(w.__data=new Float32Array(P.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=_,D>0){E=_%S;const z=S-E;E!==0&&z-P.boundary<0&&(_+=S-E,w.__offset=_)}_+=P.storage}return E=_%S,E>0&&(_+=S-E),M.__size=_,M.__cache={},this}function m(M){const y=M.value,_={boundary:0,storage:0};return typeof y=="number"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function f(M){const y=M.target;y.removeEventListener("dispose",f);const _=a.indexOf(y.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function g(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:g}}function Jm(){const i=ds("canvas");return i.style.display="block",i}function yc(i={}){this.isWebGLRenderer=!0;const e=i.canvas!==void 0?i.canvas:Jm(),t=i.context!==void 0?i.context:null,n=i.depth!==void 0?i.depth:!0,s=i.stencil!==void 0?i.stencil:!0,r=i.antialias!==void 0?i.antialias:!1,a=i.premultipliedAlpha!==void 0?i.premultipliedAlpha:!0,o=i.preserveDrawingBuffer!==void 0?i.preserveDrawingBuffer:!1,l=i.powerPreference!==void 0?i.powerPreference:"default",c=i.failIfMajorPerformanceCaveat!==void 0?i.failIfMajorPerformanceCaveat:!1;let u;t!==null?u=t.getContextAttributes().alpha:u=i.alpha!==void 0?i.alpha:!1;let h=null,d=null;const p=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=ln,this.physicallyCorrectLights=!1,this.toneMapping=Sn,this.toneMappingExposure=1,Object.defineProperties(this,{gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});const m=this;let f=!1,g=0,M=0,y=null,_=-1,S=null;const E=new Xe,D=new Xe;let x=null,w=e.width,P=e.height,z=1,$=null,O=null;const N=new Xe(0,0,w,P),H=new Xe(0,0,w,P);let K=!1;const Z=new wa;let V=!1,U=!1,k=null;const ne=new be,J=new re,se=new C,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function we(){return y===null?z:1}let q=t;function Be(T,B){for(let W=0;W<T.length;W++){const F=T[W],X=e.getContext(F,B);if(X!==null)return X}return null}try{const T={alpha:!0,depth:n,stencil:s,antialias:r,premultipliedAlpha:a,preserveDrawingBuffer:o,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ki}`),e.addEventListener("webglcontextlost",pe,!1),e.addEventListener("webglcontextrestored",fe,!1),e.addEventListener("webglcontextcreationerror",Ne,!1),q===null){const B=["webgl2","webgl","experimental-webgl"];if(m.isWebGL1Renderer===!0&&B.shift(),q=Be(B,T),q===null)throw Be(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}q.getShaderPrecisionFormat===void 0&&(q.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Se,Te,he,Ve,Re,_e,tt,ut,rt,Pt,at,Ge,Bt,zt,A,b,G,ee,te,ae,Me,R,I,le;function ue(){Se=new hp(q),Te=new rp(q,Se,i),Se.init(Te),R=new Xm(q,Se,Te),he=new Wm(q,Se,Te),Ve=new pp,Re=new Pm,_e=new jm(q,Se,he,Re,Te,R,Ve),tt=new op(m),ut=new up(m),rt=new Sh(q,Te),I=new ip(q,Se,rt,Te),Pt=new dp(q,rt,Ve,I),at=new _p(q,Pt,rt,Ve),te=new vp(q,Te,_e),b=new ap(Re),Ge=new Dm(m,tt,ut,Se,Te,I,b),Bt=new Km(m,Re),zt=new Im,A=new zm(Se,Te),ee=new np(m,tt,ut,he,at,u,a),G=new Gm(m,at,Te),le=new Zm(q,Ve,Te,he),ae=new sp(q,Se,Ve,Te),Me=new fp(q,Se,Ve,Te),Ve.programs=Ge.programs,m.capabilities=Te,m.extensions=Se,m.properties=Re,m.renderLists=zt,m.shadowMap=G,m.state=he,m.info=Ve}ue();const oe=new $m(m,q);this.xr=oe,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const T=Se.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Se.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(T){T!==void 0&&(z=T,this.setSize(w,P,!1))},this.getSize=function(T){return T.set(w,P)},this.setSize=function(T,B,W){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}w=T,P=B,e.width=Math.floor(T*z),e.height=Math.floor(B*z),W!==!1&&(e.style.width=T+"px",e.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(w*z,P*z).floor()},this.setDrawingBufferSize=function(T,B,W){w=T,P=B,z=W,e.width=Math.floor(T*W),e.height=Math.floor(B*W),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(E)},this.getViewport=function(T){return T.copy(N)},this.setViewport=function(T,B,W,F){T.isVector4?N.set(T.x,T.y,T.z,T.w):N.set(T,B,W,F),he.viewport(E.copy(N).multiplyScalar(z).floor())},this.getScissor=function(T){return T.copy(H)},this.setScissor=function(T,B,W,F){T.isVector4?H.set(T.x,T.y,T.z,T.w):H.set(T,B,W,F),he.scissor(D.copy(H).multiplyScalar(z).floor())},this.getScissorTest=function(){return K},this.setScissorTest=function(T){he.setScissorTest(K=T)},this.setOpaqueSort=function(T){$=T},this.setTransparentSort=function(T){O=T},this.getClearColor=function(T){return T.copy(ee.getClearColor())},this.setClearColor=function(){ee.setClearColor.apply(ee,arguments)},this.getClearAlpha=function(){return ee.getClearAlpha()},this.setClearAlpha=function(){ee.setClearAlpha.apply(ee,arguments)},this.clear=function(T=!0,B=!0,W=!0){let F=0;T&&(F|=16384),B&&(F|=256),W&&(F|=1024),q.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",pe,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",Ne,!1),zt.dispose(),A.dispose(),Re.dispose(),tt.dispose(),ut.dispose(),at.dispose(),I.dispose(),le.dispose(),Ge.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",ce),oe.removeEventListener("sessionend",me),k&&(k.dispose(),k=null),ze.stop()};function pe(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),f=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),f=!1;const T=Ve.autoReset,B=G.enabled,W=G.autoUpdate,F=G.needsUpdate,X=G.type;ue(),Ve.autoReset=T,G.enabled=B,G.autoUpdate=W,G.needsUpdate=F,G.type=X}function Ne(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Fe(T){const B=T.target;B.removeEventListener("dispose",Fe),qe(B)}function qe(T){L(T),Re.remove(T)}function L(T){const B=Re.get(T).programs;B!==void 0&&(B.forEach(function(W){Ge.releaseProgram(W)}),T.isShaderMaterial&&Ge.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,W,F,X,ve){B===null&&(B=de);const Ae=X.isMesh&&X.matrixWorld.determinant()<0,De=Wc(T,B,W,F,X);he.setMaterial(F,Ae);let Ce=W.index;const ke=W.attributes.position;if(Ce===null){if(ke===void 0||ke.count===0)return}else if(Ce.count===0)return;let Ie=1;F.wireframe===!0&&(Ce=Pt.getWireframeAttribute(W),Ie=2),I.setup(X,F,De,W,Ce);let Ue,Je=ae;Ce!==null&&(Ue=rt.get(Ce),Je=Me,Je.setIndex(Ue));const Hn=Ce!==null?Ce.count:ke.count,hi=W.drawRange.start*Ie,di=W.drawRange.count*Ie,sn=ve!==null?ve.start*Ie:0,He=ve!==null?ve.count*Ie:1/0,fi=Math.max(hi,sn),nt=Math.min(Hn,hi+di,sn+He)-1,Ht=Math.max(0,nt-fi+1);if(Ht!==0){if(X.isMesh)F.wireframe===!0?(he.setLineWidth(F.wireframeLinewidth*we()),Je.setMode(1)):Je.setMode(4);else if(X.isLine){let wn=F.linewidth;wn===void 0&&(wn=1),he.setLineWidth(wn*we()),X.isLineSegments?Je.setMode(1):X.isLineLoop?Je.setMode(2):Je.setMode(3)}else X.isPoints?Je.setMode(0):X.isSprite&&Je.setMode(4);if(X.isInstancedMesh)Je.renderInstances(fi,Ht,X.count);else if(W.isInstancedBufferGeometry){const wn=Math.min(W.instanceCount,W._maxInstanceCount);Je.renderInstances(fi,Ht,wn)}else Je.render(fi,Ht)}},this.compile=function(T,B){function W(F,X,ve){F.transparent===!0&&F.side===Rt?(F.side=St,F.needsUpdate=!0,kt(F,X,ve),F.side=zn,F.needsUpdate=!0,kt(F,X,ve),F.side=Rt):kt(F,X,ve)}d=A.get(T),d.init(),v.push(d),T.traverseVisible(function(F){F.isLight&&F.layers.test(B.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),d.setupLights(m.physicallyCorrectLights),T.traverse(function(F){const X=F.material;if(X)if(Array.isArray(X))for(let ve=0;ve<X.length;ve++){const Ae=X[ve];W(Ae,T,F)}else W(X,T,F)}),v.pop(),d=null};let j=null;function Q(T){j&&j(T)}function ce(){ze.stop()}function me(){ze.start()}const ze=new fc;ze.setAnimationLoop(Q),typeof self<"u"&&ze.setContext(self),this.setAnimationLoop=function(T){j=T,oe.setAnimationLoop(T),T===null?ze.stop():ze.start()},oe.addEventListener("sessionstart",ce),oe.addEventListener("sessionend",me),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(f===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(B),B=oe.getCamera()),T.isScene===!0&&T.onBeforeRender(m,T,B,y),d=A.get(T,v.length),d.init(),v.push(d),ne.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Z.setFromProjectionMatrix(ne),U=this.localClippingEnabled,V=b.init(this.clippingPlanes,U,B),h=zt.get(T,p.length),h.init(),p.push(h),ht(T,B,0,m.sortObjects),h.finish(),m.sortObjects===!0&&h.sort($,O),V===!0&&b.beginShadows();const W=d.state.shadowsArray;if(G.render(W,T,B),V===!0&&b.endShadows(),this.info.autoReset===!0&&this.info.reset(),ee.render(h,T),d.setupLights(m.physicallyCorrectLights),B.isArrayCamera){const F=B.cameras;for(let X=0,ve=F.length;X<ve;X++){const Ae=F[X];yt(h,T,Ae,Ae.viewport)}}else yt(h,T,B);y!==null&&(_e.updateMultisampleRenderTarget(y),_e.updateRenderTargetMipmap(y)),T.isScene===!0&&T.onAfterRender(m,T,B),I.resetDefaultState(),_=-1,S=null,v.pop(),v.length>0?d=v[v.length-1]:d=null,p.pop(),p.length>0?h=p[p.length-1]:h=null};function ht(T,B,W,F){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Z.intersectsSprite(T)){F&&se.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ne);const Ae=at.update(T),De=T.material;De.visible&&h.push(T,Ae,De,W,se.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(T.isSkinnedMesh&&T.skeleton.frame!==Ve.render.frame&&(T.skeleton.update(),T.skeleton.frame=Ve.render.frame),!T.frustumCulled||Z.intersectsObject(T))){F&&se.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ne);const Ae=at.update(T),De=T.material;if(Array.isArray(De)){const Ce=Ae.groups;for(let ke=0,Ie=Ce.length;ke<Ie;ke++){const Ue=Ce[ke],Je=De[Ue.materialIndex];Je&&Je.visible&&h.push(T,Ae,Je,W,se.z,Ue)}}else De.visible&&h.push(T,Ae,De,W,se.z,null)}}const ve=T.children;for(let Ae=0,De=ve.length;Ae<De;Ae++)ht(ve[Ae],B,W,F)}function yt(T,B,W,F){const X=T.opaque,ve=T.transmissive,Ae=T.transparent;d.setupLightsView(W),ve.length>0&&kn(X,B,W),F&&he.viewport(E.copy(F)),X.length>0&&Ke(X,B,W),ve.length>0&&Ke(ve,B,W),Ae.length>0&&Ke(Ae,B,W),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function kn(T,B,W){const F=Te.isWebGL2;k===null&&(k=new $e(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")?Ct:xt,minFilter:oi,samples:F&&r===!0?4:0})),m.getDrawingBufferSize(J),F?k.setSize(J.x,J.y):k.setSize(nr(J.x),nr(J.y));const X=m.getRenderTarget();m.setRenderTarget(k),m.clear();const ve=m.toneMapping;m.toneMapping=Sn,Ke(T,B,W),m.toneMapping=ve,_e.updateMultisampleRenderTarget(k),_e.updateRenderTargetMipmap(k),m.setRenderTarget(X)}function Ke(T,B,W){const F=B.isScene===!0?B.overrideMaterial:null;for(let X=0,ve=T.length;X<ve;X++){const Ae=T[X],De=Ae.object,Ce=Ae.geometry,ke=F===null?Ae.material:F,Ie=Ae.group;De.layers.test(W.layers)&&hn(De,B,W,Ce,ke,Ie)}}function hn(T,B,W,F,X,ve){T.onBeforeRender(m,B,W,F,X,ve),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),X.onBeforeRender(m,B,W,F,T,ve),X.transparent===!0&&X.side===Rt?(X.side=St,X.needsUpdate=!0,m.renderBufferDirect(W,B,F,X,T,ve),X.side=zn,X.needsUpdate=!0,m.renderBufferDirect(W,B,F,X,T,ve),X.side=Rt):m.renderBufferDirect(W,B,F,X,T,ve),T.onAfterRender(m,B,W,F,X,ve)}function kt(T,B,W){B.isScene!==!0&&(B=de);const F=Re.get(T),X=d.state.lights,ve=d.state.shadowsArray,Ae=X.state.version,De=Ge.getParameters(T,X.state,ve,B,W),Ce=Ge.getProgramCacheKey(De);let ke=F.programs;F.environment=T.isMeshStandardMaterial?B.environment:null,F.fog=B.fog,F.envMap=(T.isMeshStandardMaterial?ut:tt).get(T.envMap||F.environment),ke===void 0&&(T.addEventListener("dispose",Fe),ke=new Map,F.programs=ke);let Ie=ke.get(Ce);if(Ie!==void 0){if(F.currentProgram===Ie&&F.lightsStateVersion===Ae)return Ha(T,De),Ie}else De.uniforms=Ge.getUniforms(T),T.onBuild(W,De,m),T.onBeforeCompile(De,m),Ie=Ge.acquireProgram(De,Ce),ke.set(Ce,Ie),F.uniforms=De.uniforms;const Ue=F.uniforms;(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ue.clippingPlanes=b.uniform),Ha(T,De),F.needsLights=Xc(T),F.lightsStateVersion=Ae,F.needsLights&&(Ue.ambientLightColor.value=X.state.ambient,Ue.lightProbe.value=X.state.probe,Ue.directionalLights.value=X.state.directional,Ue.directionalLightShadows.value=X.state.directionalShadow,Ue.spotLights.value=X.state.spot,Ue.spotLightShadows.value=X.state.spotShadow,Ue.rectAreaLights.value=X.state.rectArea,Ue.ltc_1.value=X.state.rectAreaLTC1,Ue.ltc_2.value=X.state.rectAreaLTC2,Ue.pointLights.value=X.state.point,Ue.pointLightShadows.value=X.state.pointShadow,Ue.hemisphereLights.value=X.state.hemi,Ue.directionalShadowMap.value=X.state.directionalShadowMap,Ue.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ue.spotShadowMap.value=X.state.spotShadowMap,Ue.spotLightMatrix.value=X.state.spotLightMatrix,Ue.spotLightMap.value=X.state.spotLightMap,Ue.pointShadowMap.value=X.state.pointShadowMap,Ue.pointShadowMatrix.value=X.state.pointShadowMatrix);const Je=Ie.getUniforms(),Hn=Zs.seqWithValue(Je.seq,Ue);return F.currentProgram=Ie,F.uniformsList=Hn,Ie}function Ha(T,B){const W=Re.get(T);W.outputEncoding=B.outputEncoding,W.instancing=B.instancing,W.skinning=B.skinning,W.morphTargets=B.morphTargets,W.morphNormals=B.morphNormals,W.morphColors=B.morphColors,W.morphTargetsCount=B.morphTargetsCount,W.numClippingPlanes=B.numClippingPlanes,W.numIntersection=B.numClipIntersection,W.vertexAlphas=B.vertexAlphas,W.vertexTangents=B.vertexTangents,W.toneMapping=B.toneMapping}function Wc(T,B,W,F,X){B.isScene!==!0&&(B=de),_e.resetTextureUnits();const ve=B.fog,Ae=F.isMeshStandardMaterial?B.environment:null,De=y===null?m.outputEncoding:y.isXRRenderTarget===!0?y.texture.encoding:ln,Ce=(F.isMeshStandardMaterial?ut:tt).get(F.envMap||Ae),ke=F.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ie=!!F.normalMap&&!!W.attributes.tangent,Ue=!!W.morphAttributes.position,Je=!!W.morphAttributes.normal,Hn=!!W.morphAttributes.color,hi=F.toneMapped?m.toneMapping:Sn,di=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,sn=di!==void 0?di.length:0,He=Re.get(F),fi=d.state.lights;if(V===!0&&(U===!0||T!==S)){const Lt=T===S&&F.id===_;b.setState(F,T,Lt)}let nt=!1;F.version===He.__version?(He.needsLights&&He.lightsStateVersion!==fi.state.version||He.outputEncoding!==De||X.isInstancedMesh&&He.instancing===!1||!X.isInstancedMesh&&He.instancing===!0||X.isSkinnedMesh&&He.skinning===!1||!X.isSkinnedMesh&&He.skinning===!0||He.envMap!==Ce||F.fog===!0&&He.fog!==ve||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==b.numPlanes||He.numIntersection!==b.numIntersection)||He.vertexAlphas!==ke||He.vertexTangents!==Ie||He.morphTargets!==Ue||He.morphNormals!==Je||He.morphColors!==Hn||He.toneMapping!==hi||Te.isWebGL2===!0&&He.morphTargetsCount!==sn)&&(nt=!0):(nt=!0,He.__version=F.version);let Ht=He.currentProgram;nt===!0&&(Ht=kt(F,B,X));let wn=!1,qi=!1,ur=!1;const bt=Ht.getUniforms(),Vn=He.uniforms;if(he.useProgram(Ht.program)&&(wn=!0,qi=!0,ur=!0),F.id!==_&&(_=F.id,qi=!0),wn||S!==T){if(bt.setValue(q,"projectionMatrix",T.projectionMatrix),Te.logarithmicDepthBuffer&&bt.setValue(q,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),S!==T&&(S=T,qi=!0,ur=!0),F.isShaderMaterial||F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshStandardMaterial||F.envMap){const Lt=bt.map.cameraPosition;Lt!==void 0&&Lt.setValue(q,se.setFromMatrixPosition(T.matrixWorld))}(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&bt.setValue(q,"isOrthographic",T.isOrthographicCamera===!0),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial||F.isShadowMaterial||X.isSkinnedMesh)&&bt.setValue(q,"viewMatrix",T.matrixWorldInverse)}if(X.isSkinnedMesh){bt.setOptional(q,X,"bindMatrix"),bt.setOptional(q,X,"bindMatrixInverse");const Lt=X.skeleton;Lt&&(Te.floatVertexTextures?(Lt.boneTexture===null&&Lt.computeBoneTexture(),bt.setValue(q,"boneTexture",Lt.boneTexture,_e),bt.setValue(q,"boneTextureSize",Lt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const hr=W.morphAttributes;if((hr.position!==void 0||hr.normal!==void 0||hr.color!==void 0&&Te.isWebGL2===!0)&&te.update(X,W,F,Ht),(qi||He.receiveShadow!==X.receiveShadow)&&(He.receiveShadow=X.receiveShadow,bt.setValue(q,"receiveShadow",X.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(Vn.envMap.value=Ce,Vn.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),qi&&(bt.setValue(q,"toneMappingExposure",m.toneMappingExposure),He.needsLights&&jc(Vn,ur),ve&&F.fog===!0&&Bt.refreshFogUniforms(Vn,ve),Bt.refreshMaterialUniforms(Vn,F,z,P,k),Zs.upload(q,He.uniformsList,Vn,_e)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Zs.upload(q,He.uniformsList,Vn,_e),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&bt.setValue(q,"center",X.center),bt.setValue(q,"modelViewMatrix",X.modelViewMatrix),bt.setValue(q,"normalMatrix",X.normalMatrix),bt.setValue(q,"modelMatrix",X.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const Lt=F.uniformsGroups;for(let dr=0,qc=Lt.length;dr<qc;dr++)if(Te.isWebGL2){const Va=Lt[dr];le.update(Va,Ht),le.bind(Va,Ht)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ht}function jc(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function Xc(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return g},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(T,B,W){Re.get(T.texture).__webglTexture=B,Re.get(T.depthTexture).__webglTexture=W;const F=Re.get(T);F.__hasExternalTextures=!0,F.__hasExternalTextures&&(F.__autoAllocateDepthBuffer=W===void 0,F.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),F.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,B){const W=Re.get(T);W.__webglFramebuffer=B,W.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,W=0){y=T,g=B,M=W;let F=!0,X=null,ve=!1,Ae=!1;if(T){const Ce=Re.get(T);Ce.__useDefaultFramebuffer!==void 0?(he.bindFramebuffer(36160,null),F=!1):Ce.__webglFramebuffer===void 0?_e.setupRenderTarget(T):Ce.__hasExternalTextures&&_e.rebindTextures(T,Re.get(T.texture).__webglTexture,Re.get(T.depthTexture).__webglTexture);const ke=T.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Ae=!0);const Ie=Re.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(X=Ie[B],ve=!0):Te.isWebGL2&&T.samples>0&&_e.useMultisampledRTT(T)===!1?X=Re.get(T).__webglMultisampledFramebuffer:X=Ie,E.copy(T.viewport),D.copy(T.scissor),x=T.scissorTest}else E.copy(N).multiplyScalar(z).floor(),D.copy(H).multiplyScalar(z).floor(),x=K;if(he.bindFramebuffer(36160,X)&&Te.drawBuffers&&F&&he.drawBuffers(T,X),he.viewport(E),he.scissor(D),he.setScissorTest(x),ve){const Ce=Re.get(T.texture);q.framebufferTexture2D(36160,36064,34069+B,Ce.__webglTexture,W)}else if(Ae){const Ce=Re.get(T.texture),ke=B||0;q.framebufferTextureLayer(36160,36064,Ce.__webglTexture,W||0,ke)}_=-1},this.readRenderTargetPixels=function(T,B,W,F,X,ve,Ae){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=Re.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ae!==void 0&&(De=De[Ae]),De){he.bindFramebuffer(36160,De);try{const Ce=T.texture,ke=Ce.format,Ie=Ce.type;if(ke!==vt&&R.convert(ke)!==q.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ue=Ie===Ct&&(Se.has("EXT_color_buffer_half_float")||Te.isWebGL2&&Se.has("EXT_color_buffer_float"));if(Ie!==xt&&R.convert(Ie)!==q.getParameter(35738)&&!(Ie===Ft&&(Te.isWebGL2||Se.has("OES_texture_float")||Se.has("WEBGL_color_buffer_float")))&&!Ue){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-F&&W>=0&&W<=T.height-X&&q.readPixels(B,W,F,X,R.convert(ke),R.convert(Ie),ve)}finally{const Ce=y!==null?Re.get(y).__webglFramebuffer:null;he.bindFramebuffer(36160,Ce)}}},this.copyFramebufferToTexture=function(T,B,W=0){const F=Math.pow(2,-W),X=Math.floor(B.image.width*F),ve=Math.floor(B.image.height*F);_e.setTexture2D(B,0),q.copyTexSubImage2D(3553,W,0,0,T.x,T.y,X,ve),he.unbindTexture()},this.copyTextureToTexture=function(T,B,W,F=0){const X=B.image.width,ve=B.image.height,Ae=R.convert(W.format),De=R.convert(W.type);_e.setTexture2D(W,0),q.pixelStorei(37440,W.flipY),q.pixelStorei(37441,W.premultiplyAlpha),q.pixelStorei(3317,W.unpackAlignment),B.isDataTexture?q.texSubImage2D(3553,F,T.x,T.y,X,ve,Ae,De,B.image.data):B.isCompressedTexture?q.compressedTexSubImage2D(3553,F,T.x,T.y,B.mipmaps[0].width,B.mipmaps[0].height,Ae,B.mipmaps[0].data):q.texSubImage2D(3553,F,T.x,T.y,Ae,De,B.image),F===0&&W.generateMipmaps&&q.generateMipmap(3553),he.unbindTexture()},this.copyTextureToTexture3D=function(T,B,W,F,X=0){if(m.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ve=T.max.x-T.min.x+1,Ae=T.max.y-T.min.y+1,De=T.max.z-T.min.z+1,Ce=R.convert(F.format),ke=R.convert(F.type);let Ie;if(F.isData3DTexture)_e.setTexture3D(F,0),Ie=32879;else if(F.isDataArrayTexture)_e.setTexture2DArray(F,0),Ie=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}q.pixelStorei(37440,F.flipY),q.pixelStorei(37441,F.premultiplyAlpha),q.pixelStorei(3317,F.unpackAlignment);const Ue=q.getParameter(3314),Je=q.getParameter(32878),Hn=q.getParameter(3316),hi=q.getParameter(3315),di=q.getParameter(32877),sn=W.isCompressedTexture?W.mipmaps[0]:W.image;q.pixelStorei(3314,sn.width),q.pixelStorei(32878,sn.height),q.pixelStorei(3316,T.min.x),q.pixelStorei(3315,T.min.y),q.pixelStorei(32877,T.min.z),W.isDataTexture||W.isData3DTexture?q.texSubImage3D(Ie,X,B.x,B.y,B.z,ve,Ae,De,Ce,ke,sn.data):W.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),q.compressedTexSubImage3D(Ie,X,B.x,B.y,B.z,ve,Ae,De,Ce,sn.data)):q.texSubImage3D(Ie,X,B.x,B.y,B.z,ve,Ae,De,Ce,ke,sn),q.pixelStorei(3314,Ue),q.pixelStorei(32878,Je),q.pixelStorei(3316,Hn),q.pixelStorei(3315,hi),q.pixelStorei(32877,di),X===0&&F.generateMipmaps&&q.generateMipmap(Ie),he.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?_e.setTextureCube(T,0):T.isData3DTexture?_e.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?_e.setTexture2DArray(T,0):_e.setTexture2D(T,0),he.unbindTexture()},this.resetState=function(){g=0,M=0,y=null,he.reset(),I.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class Qm extends yc{}Qm.prototype.isWebGL1Renderer=!0;class ca extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.backgroundBlurriness=this.backgroundBlurriness),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class eg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ia,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=en()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wt=new C;class Aa{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s===!0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}setX(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ye(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Mn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),s=Ye(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ye(t,this.array),n=Ye(n,this.array),s=Ye(s,this.array),r=Ye(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new pt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Aa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will deinterleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Qo=new C,el=new Xe,tl=new Xe,tg=new C,nl=new be;class ng extends Et{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new be,this.bindMatrixInverse=new be}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Xe,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){const n=this.skeleton,s=this.geometry;el.fromBufferAttribute(s.attributes.skinIndex,e),tl.fromBufferAttribute(s.attributes.skinWeight,e),Qo.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=tl.getComponent(r);if(a!==0){const o=el.getComponent(r);nl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(tg.copy(Qo).applyMatrix4(nl),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Mc extends Ze{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ar extends st{constructor(e=null,t=1,n=1,s,r,a,o,l,c=je,u=je,h,d){super(null,a,o,l,c,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const il=new be,ig=new be;class Ra{constructor(e=[],t=[]){this.uuid=en(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new be)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new be;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:ig;il.multiplyMatrices(o,t[r]),il.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Ra(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=tc(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new ar(t,e,e,vt,Ft);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Mc),this.bones.push(a),this.boneInverses.push(new be().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class sl extends pt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const rl=new be,al=new be,ks=[],sg=new be,Ji=new Et;class rg extends Et{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new sl(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.frustumCulled=!1;for(let s=0;s<n;s++)this.setMatrixAt(s,sg)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Ji.geometry=this.geometry,Ji.material=this.material,Ji.material!==void 0)for(let r=0;r<s;r++){this.getMatrixAt(r,rl),al.multiplyMatrices(n,rl),Ji.matrixWorld=al,Ji.raycast(e,ks);for(let a=0,o=ks.length;a<o;a++){const l=ks[a];l.instanceId=r,l.object=this,t.push(l)}ks.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new sl(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Sc extends Ot{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new xe(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ol=new C,ll=new C,cl=new be,jr=new Ma,Hs=new Vi;class Ca extends Ze{constructor(e=new Yt,t=new Sc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ol.fromBufferAttribute(t,s-1),ll.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ol.distanceTo(ll);e.setAttribute("lineDistance",new jt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hs.copy(n.boundingSphere),Hs.applyMatrix4(s),Hs.radius+=r,e.ray.intersectsSphere(Hs)===!1)return;cl.copy(s).invert(),jr.copy(e.ray).applyMatrix4(cl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new C,u=new C,h=new C,d=new C,p=this.isLineSegments?2:1,v=n.index,f=n.attributes.position;if(v!==null){const g=Math.max(0,a.start),M=Math.min(v.count,a.start+a.count);for(let y=g,_=M-1;y<_;y+=p){const S=v.getX(y),E=v.getX(y+1);if(c.fromBufferAttribute(f,S),u.fromBufferAttribute(f,E),jr.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const x=e.ray.origin.distanceTo(d);x<e.near||x>e.far||t.push({distance:x,point:h.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{const g=Math.max(0,a.start),M=Math.min(f.count,a.start+a.count);for(let y=g,_=M-1;y<_;y+=p){if(c.fromBufferAttribute(f,y),u.fromBufferAttribute(f,y+1),jr.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const E=e.ray.origin.distanceTo(d);E<e.near||E>e.far||t.push({distance:E,point:h.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const ul=new C,hl=new C;class ag extends Ca{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)ul.fromBufferAttribute(t,s),hl.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ul.distanceTo(hl);e.setAttribute("lineDistance",new jt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class og extends Ca{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class bc extends Ot{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const dl=new be,ua=new Ma,Vs=new Vi,Gs=new C;class lg extends Ze{constructor(e=new Yt,t=new bc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(s),Vs.radius+=r,e.ray.intersectsSphere(Vs)===!1)return;dl.copy(s).invert(),ua.copy(e.ray).applyMatrix4(dl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let v=d,m=p;v<m;v++){const f=c.getX(v);Gs.fromBufferAttribute(h,f),fl(Gs,f,l,s,e,t,this)}}else{const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let v=d,m=p;v<m;v++)Gs.fromBufferAttribute(h,v),fl(Gs,v,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function fl(i,e,t,n,s,r,a){const o=ua.distanceSqToPoint(i);if(o<t){const l=new C;ua.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class cg extends st{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isVideoTexture=!0,this.minFilter=a!==void 0?a:Ee,this.magFilter=r!==void 0?r:Ee,this.generateMipmaps=!1;const u=this;function h(){u.needsUpdate=!0,e.requestVideoFrameCallback(h)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(h)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class pl extends st{constructor(e,t,n){super({width:e,height:t}),this.isFramebufferTexture=!0,this.format=n,this.magFilter=je,this.minFilter=je,this.generateMipmaps=!1,this.needsUpdate=!0}}class Da extends Yt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),u(),this.setAttribute("position",new jt(r,3)),this.setAttribute("normal",new jt(r.slice(),3)),this.setAttribute("uv",new jt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const y=new C,_=new C,S=new C;for(let E=0;E<t.length;E+=3)p(t[E+0],y),p(t[E+1],_),p(t[E+2],S),l(y,_,S,M)}function l(M,y,_,S){const E=S+1,D=[];for(let x=0;x<=E;x++){D[x]=[];const w=M.clone().lerp(_,x/E),P=y.clone().lerp(_,x/E),z=E-x;for(let $=0;$<=z;$++)$===0&&x===E?D[x][$]=w:D[x][$]=w.clone().lerp(P,$/z)}for(let x=0;x<E;x++)for(let w=0;w<2*(E-x)-1;w++){const P=Math.floor(w/2);w%2===0?(d(D[x][P+1]),d(D[x+1][P]),d(D[x][P])):(d(D[x][P+1]),d(D[x+1][P+1]),d(D[x+1][P]))}}function c(M){const y=new C;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(M),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function u(){const M=new C;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const _=f(M)/2/Math.PI+.5,S=g(M)/Math.PI+.5;a.push(_,1-S)}v(),h()}function h(){for(let M=0;M<a.length;M+=6){const y=a[M+0],_=a[M+2],S=a[M+4],E=Math.max(y,_,S),D=Math.min(y,_,S);E>.9&&D<.1&&(y<.2&&(a[M+0]+=1),_<.2&&(a[M+2]+=1),S<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function p(M,y){const _=M*3;y.x=e[_+0],y.y=e[_+1],y.z=e[_+2]}function v(){const M=new C,y=new C,_=new C,S=new C,E=new re,D=new re,x=new re;for(let w=0,P=0;w<r.length;w+=9,P+=6){M.set(r[w+0],r[w+1],r[w+2]),y.set(r[w+3],r[w+4],r[w+5]),_.set(r[w+6],r[w+7],r[w+8]),E.set(a[P+0],a[P+1]),D.set(a[P+2],a[P+3]),x.set(a[P+4],a[P+5]),S.copy(M).add(y).add(_).divideScalar(3);const z=f(S);m(E,P+0,M,z),m(D,P+2,y,z),m(x,P+4,_,z)}}function m(M,y,_,S){S<0&&M.x===1&&(a[y]=M.x-1),_.x===0&&_.z===0&&(a[y]=S/2/Math.PI+.5)}function f(M){return Math.atan2(M.z,-M.x)}function g(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}static fromJSON(e){return new Da(e.vertices,e.indices,e.radius,e.details)}}class Pa extends Da{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Pa(e.radius,e.detail)}}class xs extends Ot{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gs,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class li extends xs{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return gt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new xe(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class ug extends Ot{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gs,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}function Ln(i,e,t){return wc(i)?new i.constructor(i.subarray(e,t!==void 0?t:i.length)):i.slice(e,t)}function Ws(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function wc(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function hg(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function ml(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function Tc(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class ys{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class dg extends ys{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:_o,endingEnd:_o}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case xo:r=e,o=2*t-n;break;case yo:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case xo:a=e,l=2*n-t;break;case yo:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,p=this._weightNext,v=(n-t)/(s-t),m=v*v,f=m*v,g=-d*f+2*d*m-d*v,M=(1+d)*f+(-1.5-2*d)*m+(-.5+d)*v+1,y=(-1-p)*f+(1.5+p)*m+.5*v,_=p*f-p*m;for(let S=0;S!==o;++S)r[S]=g*a[u+S]+M*a[c+S]+y*a[l+S]+_*a[h+S];return r}}class fg extends ys{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[c+d]*h+a[l+d]*u;return r}}class pg extends ys{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class un{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ws(t,this.TimeBufferType),this.values=Ws(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ws(e.times,Array),values:Ws(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new pg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new fg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new dg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case us:t=this.InterpolantFactoryMethodDiscrete;break;case Oi:t=this.InterpolantFactoryMethodLinear;break;case _r:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return us;case this.InterpolantFactoryMethodLinear:return Oi;case this.InterpolantFactoryMethodSmooth:return _r}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=Ln(n,r,a),this.values=Ln(this.values,r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&wc(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=Ln(this.times),t=Ln(this.values),n=this.getValueSize(),s=this.getInterpolation()===_r,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{const h=o*n,d=h-n,p=h+n;for(let v=0;v!==n;++v){const m=t[h+v];if(m!==t[d+v]||m!==t[p+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let p=0;p!==n;++p)t[d+p]=t[h+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=Ln(e,0,a),this.values=Ln(t,0,a*n)):(this.times=e,this.values=t),this}clone(){const e=Ln(this.times,0),t=Ln(this.values,0),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}un.prototype.TimeBufferType=Float32Array;un.prototype.ValueBufferType=Float32Array;un.prototype.DefaultInterpolation=Oi;class Wi extends un{}Wi.prototype.ValueTypeName="bool";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=us;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;class Ec extends un{}Ec.prototype.ValueTypeName="color";class fs extends un{}fs.prototype.ValueTypeName="number";class mg extends ys{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t);let c=e*o;for(let u=c+o;c!==u;c+=4)qt.slerpFlat(r,0,a,c-o,a,c,l);return r}}class ai extends un{InterpolantFactoryMethodLinear(e){return new mg(this.times,this.values,this.getValueSize(),e)}}ai.prototype.ValueTypeName="quaternion";ai.prototype.DefaultInterpolation=Oi;ai.prototype.InterpolantFactoryMethodSmooth=void 0;class ji extends un{}ji.prototype.ValueTypeName="string";ji.prototype.ValueBufferType=Array;ji.prototype.DefaultInterpolation=us;ji.prototype.InterpolantFactoryMethodLinear=void 0;ji.prototype.InterpolantFactoryMethodSmooth=void 0;class ps extends un{}ps.prototype.ValueTypeName="vector";class gg{constructor(e,t=-1,n,s=ku){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=en(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(_g(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(un.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const u=hg(l);l=ml(l,1,u),c=ml(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new fs(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],u=c.name.match(r);if(u&&u.length>1){const h=u[1];let d=s[h];d||(s[h]=d=[]),d.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,p,v,m){if(p.length!==0){const f=[],g=[];Tc(p,f,g,v),f.length!==0&&m.push(new h(d,f,g))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let v;for(v=0;v<d.length;v++)if(d[v].morphTargets)for(let m=0;m<d[v].morphTargets.length;m++)p[d[v].morphTargets[m]]=-1;for(const m in p){const f=[],g=[];for(let M=0;M!==d[v].morphTargets.length;++M){const y=d[v];f.push(y.time),g.push(y.morphTarget===m?1:0)}s.push(new fs(".morphTargetInfluence["+m+"]",f,g))}l=p.length*a}else{const p=".bones["+t[h].name+"]";n(ps,p+".position",d,"pos",s),n(ai,p+".quaternion",d,"rot",s),n(ps,p+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function vg(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return fs;case"vector":case"vector2":case"vector3":case"vector4":return ps;case"color":return Ec;case"quaternion":return ai;case"bool":case"boolean":return Wi;case"string":return ji}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function _g(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=vg(i.type);if(i.times===void 0){const t=[],n=[];Tc(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const zi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class xg{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const p=c[h],v=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return v}return null}}}const yg=new xg;class Xi{constructor(e){this.manager=e!==void 0?e:yg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const vn={};class Mg extends Error{constructor(e,t){super(e),this.response=t}}class La extends Xi{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=zi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(vn[e]!==void 0){vn[e].push({onLoad:t,onProgress:n,onError:s});return}vn[e]=[],vn[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=vn[e],h=c.body.getReader(),d=c.headers.get("Content-Length"),p=d?parseInt(d):0,v=p!==0;let m=0;const f=new ReadableStream({start(g){M();function M(){h.read().then(({done:y,value:_})=>{if(y)g.close();else{m+=_.byteLength;const S=new ProgressEvent("progress",{lengthComputable:v,loaded:m,total:p});for(let E=0,D=u.length;E<D;E++){const x=u[E];x.onProgress&&x.onProgress(S)}g.enqueue(_),M()}})}}});return new Response(f)}else throw new Mg(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(d);return c.arrayBuffer().then(v=>p.decode(v))}}}).then(c=>{zi.add(e,c);const u=vn[e];delete vn[e];for(let h=0,d=u.length;h<d;h++){const p=u[h];p.onLoad&&p.onLoad(c)}}).catch(c=>{const u=vn[e];if(u===void 0)throw this.manager.itemError(e),c;delete vn[e];for(let h=0,d=u.length;h<d;h++){const p=u[h];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Sg extends Xi{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=zi.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=ds("img");function l(){u(),zi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class bg extends Xi{constructor(e){super(e)}load(e,t,n,s){const r=this,a=new ar,o=new La(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(l){const c=r.parse(l);!c||(c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:At,a.wrapT=c.wrapT!==void 0?c.wrapT:At,a.magFilter=c.magFilter!==void 0?c.magFilter:Ee,a.minFilter=c.minFilter!==void 0?c.minFilter:Ee,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.encoding!==void 0&&(a.encoding=c.encoding),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=oi),c.mipmapCount===1&&(a.minFilter=Ee),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c))},n,s),a}}class Ac extends Xi{constructor(e){super(e)}load(e,t,n,s){const r=new st,a=new Sg(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Ia extends Ze{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Xr=new be,gl=new C,vl=new C;class Na{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.map=null,this.mapPass=null,this.matrix=new be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wa,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new Xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;gl.setFromMatrixPosition(e.matrixWorld),t.position.copy(gl),vl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vl),t.updateMatrixWorld(),Xr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class wg extends Na{constructor(){super(new ft(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=hs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Tg extends Ia{constructor(e,t,n=0,s=Math.PI/3,r=0,a=1){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ze.DefaultUp),this.updateMatrix(),this.target=new Ze,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new wg}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const _l=new be,Qi=new C,qr=new C;class Eg extends Na{constructor(){super(new ft(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new re(4,2),this._viewportCount=6,this._viewports=[new Xe(2,1,1,1),new Xe(0,1,1,1),new Xe(3,1,1,1),new Xe(1,1,1,1),new Xe(3,0,1,1),new Xe(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Qi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Qi),qr.copy(n.position),qr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(qr),n.updateMatrixWorld(),s.makeTranslation(-Qi.x,-Qi.y,-Qi.z),_l.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_l)}}class Ag extends Ia{constructor(e,t,n=0,s=1){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Eg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Rg extends Na{constructor(){super(new Ta(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Rc extends Ia{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DefaultUp),this.updateMatrix(),this.target=new Ze,this.shadow=new Rg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class si{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Cg extends Xi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=zi.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){zi.add(e,l),t&&t(l),r.manager.itemEnd(e)}).catch(function(l){s&&s(l),r.manager.itemError(e),r.manager.itemEnd(e)}),r.manager.itemStart(e)}}const Fa="\\[\\]\\.:\\/",Dg=new RegExp("["+Fa+"]","g"),Ua="[^"+Fa+"]",Pg="[^"+Fa.replace("\\.","")+"]",Lg=/((?:WC+[\/:])*)/.source.replace("WC",Ua),Ig=/(WCOD+)?/.source.replace("WCOD",Pg),Ng=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ua),Fg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ua),Ug=new RegExp("^"+Lg+Ig+Ng+Fg+"$"),Og=["material","materials","bones","map"];class Bg{constructor(e,t,n){const s=n||We.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class We{constructor(e,t,n){this.path=t,this.parsedPath=n||We.parseTrackName(t),this.node=We.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new We.Composite(e,t,n):new We(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Dg,"")}static parseTrackName(e){const t=Ug.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Og.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=We.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}We.Composite=Bg;We.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};We.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};We.prototype.GetterByBindingType=[We.prototype._getValue_direct,We.prototype._getValue_array,We.prototype._getValue_arrayElement,We.prototype._getValue_toArray];We.prototype.SetterByBindingTypeAndVersioning=[[We.prototype._setValue_direct,We.prototype._setValue_direct_setNeedsUpdate,We.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[We.prototype._setValue_array,We.prototype._setValue_array_setNeedsUpdate,We.prototype._setValue_array_setMatrixWorldNeedsUpdate],[We.prototype._setValue_arrayElement,We.prototype._setValue_arrayElement_setNeedsUpdate,We.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[We.prototype._setValue_fromArray,We.prototype._setValue_fromArray_setNeedsUpdate,We.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Y{constructor(e){this.value=e}clone(){return new Y(this.value.clone===void 0?this.value:this.value.clone())}}class xl{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(gt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const yn=zg();function zg(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,s[l]=24,s[l|256]=24):(n[l]=31744,n[l|256]=64512,s[l]=13,s[l|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;(c&8388608)===0;)c<<=1,u-=8388608;c&=-8388609,u+=947912704,r[l]=c|u}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function kg(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=gt(i,-65504,65504),yn.floatView[0]=i;const e=yn.uint32View[0],t=e>>23&511;return yn.baseTable[t]+((e&8388607)>>yn.shiftTable[t])}function Hg(i){const e=i>>10;return yn.uint32View[0]=yn.mantissaTable[yn.offsetTable[e]+(i&1023)]+yn.exponentTable[e],yn.floatView[0]}var js=Object.freeze({__proto__:null,toHalfFloat:kg,fromHalfFloat:Hg});class Vg extends $e{constructor(e,t,n){console.error('THREE.WebGLMultisampleRenderTarget has been removed. Use a normal render target and set the "samples" property to greater 0 to enable multisampling.'),super(e,t,n),this.samples=4}}class Gg extends sr{constructor(e,t,n,s){console.warn("THREE.PlaneBufferGeometry has been renamed to THREE.PlaneGeometry."),super(e,t,n,s)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ki}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ki);const yl={type:"change"},Yr={type:"start"},Ml={type:"end"};class Wg extends cn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:pi.ROTATE,MIDDLE:pi.DOLLY,RIGHT:pi.PAN},this.touches={ONE:mi.ROTATE,TWO:mi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",zt),this._domElementKeyEvents=R},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(yl),n.update(),r=s.NONE},this.update=function(){const R=new C,I=new qt().setFromUnitVectors(e.up,new C(0,1,0)),le=I.clone().invert(),ue=new C,oe=new qt,pe=2*Math.PI;return function(){const Ne=n.object.position;R.copy(Ne).sub(n.target),R.applyQuaternion(I),o.setFromVector3(R),n.autoRotate&&r===s.NONE&&w(D()),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let Fe=n.minAzimuthAngle,qe=n.maxAzimuthAngle;return isFinite(Fe)&&isFinite(qe)&&(Fe<-Math.PI?Fe+=pe:Fe>Math.PI&&(Fe-=pe),qe<-Math.PI?qe+=pe:qe>Math.PI&&(qe-=pe),Fe<=qe?o.theta=Math.max(Fe,Math.min(qe,o.theta)):o.theta=o.theta>(Fe+qe)/2?Math.max(Fe,o.theta):Math.min(qe,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),o.radius*=c,o.radius=Math.max(n.minDistance,Math.min(n.maxDistance,o.radius)),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),R.setFromSpherical(o),R.applyQuaternion(le),Ne.copy(n.target).add(R),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),c=1,h||ue.distanceToSquared(n.object.position)>a||8*(1-oe.dot(n.object.quaternion))>a?(n.dispatchEvent(yl),ue.copy(n.object.position),oe.copy(n.object.quaternion),h=!1,!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",G),n.domElement.removeEventListener("pointerdown",tt),n.domElement.removeEventListener("pointercancel",Pt),n.domElement.removeEventListener("wheel",Bt),n.domElement.removeEventListener("pointermove",ut),n.domElement.removeEventListener("pointerup",rt),n._domElementKeyEvents!==null&&n._domElementKeyEvents.removeEventListener("keydown",zt)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new xl,l=new xl;let c=1;const u=new C;let h=!1;const d=new re,p=new re,v=new re,m=new re,f=new re,g=new re,M=new re,y=new re,_=new re,S=[],E={};function D(){return 2*Math.PI/60/60*n.autoRotateSpeed}function x(){return Math.pow(.95,n.zoomSpeed)}function w(R){l.theta-=R}function P(R){l.phi-=R}const z=function(){const R=new C;return function(le,ue){R.setFromMatrixColumn(ue,0),R.multiplyScalar(-le),u.add(R)}}(),$=function(){const R=new C;return function(le,ue){n.screenSpacePanning===!0?R.setFromMatrixColumn(ue,1):(R.setFromMatrixColumn(ue,0),R.crossVectors(n.object.up,R)),R.multiplyScalar(le),u.add(R)}}(),O=function(){const R=new C;return function(le,ue){const oe=n.domElement;if(n.object.isPerspectiveCamera){const pe=n.object.position;R.copy(pe).sub(n.target);let fe=R.length();fe*=Math.tan(n.object.fov/2*Math.PI/180),z(2*le*fe/oe.clientHeight,n.object.matrix),$(2*ue*fe/oe.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(z(le*(n.object.right-n.object.left)/n.object.zoom/oe.clientWidth,n.object.matrix),$(ue*(n.object.top-n.object.bottom)/n.object.zoom/oe.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function N(R){n.object.isPerspectiveCamera?c/=R:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*R)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function H(R){n.object.isPerspectiveCamera?c*=R:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/R)),n.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function K(R){d.set(R.clientX,R.clientY)}function Z(R){M.set(R.clientX,R.clientY)}function V(R){m.set(R.clientX,R.clientY)}function U(R){p.set(R.clientX,R.clientY),v.subVectors(p,d).multiplyScalar(n.rotateSpeed);const I=n.domElement;w(2*Math.PI*v.x/I.clientHeight),P(2*Math.PI*v.y/I.clientHeight),d.copy(p),n.update()}function k(R){y.set(R.clientX,R.clientY),_.subVectors(y,M),_.y>0?N(x()):_.y<0&&H(x()),M.copy(y),n.update()}function ne(R){f.set(R.clientX,R.clientY),g.subVectors(f,m).multiplyScalar(n.panSpeed),O(g.x,g.y),m.copy(f),n.update()}function J(R){R.deltaY<0?H(x()):R.deltaY>0&&N(x()),n.update()}function se(R){let I=!1;switch(R.code){case n.keys.UP:O(0,n.keyPanSpeed),I=!0;break;case n.keys.BOTTOM:O(0,-n.keyPanSpeed),I=!0;break;case n.keys.LEFT:O(n.keyPanSpeed,0),I=!0;break;case n.keys.RIGHT:O(-n.keyPanSpeed,0),I=!0;break}I&&(R.preventDefault(),n.update())}function de(){if(S.length===1)d.set(S[0].pageX,S[0].pageY);else{const R=.5*(S[0].pageX+S[1].pageX),I=.5*(S[0].pageY+S[1].pageY);d.set(R,I)}}function we(){if(S.length===1)m.set(S[0].pageX,S[0].pageY);else{const R=.5*(S[0].pageX+S[1].pageX),I=.5*(S[0].pageY+S[1].pageY);m.set(R,I)}}function q(){const R=S[0].pageX-S[1].pageX,I=S[0].pageY-S[1].pageY,le=Math.sqrt(R*R+I*I);M.set(0,le)}function Be(){n.enableZoom&&q(),n.enablePan&&we()}function Se(){n.enableZoom&&q(),n.enableRotate&&de()}function Te(R){if(S.length==1)p.set(R.pageX,R.pageY);else{const le=Me(R),ue=.5*(R.pageX+le.x),oe=.5*(R.pageY+le.y);p.set(ue,oe)}v.subVectors(p,d).multiplyScalar(n.rotateSpeed);const I=n.domElement;w(2*Math.PI*v.x/I.clientHeight),P(2*Math.PI*v.y/I.clientHeight),d.copy(p)}function he(R){if(S.length===1)f.set(R.pageX,R.pageY);else{const I=Me(R),le=.5*(R.pageX+I.x),ue=.5*(R.pageY+I.y);f.set(le,ue)}g.subVectors(f,m).multiplyScalar(n.panSpeed),O(g.x,g.y),m.copy(f)}function Ve(R){const I=Me(R),le=R.pageX-I.x,ue=R.pageY-I.y,oe=Math.sqrt(le*le+ue*ue);y.set(0,oe),_.set(0,Math.pow(y.y/M.y,n.zoomSpeed)),N(_.y),M.copy(y)}function Re(R){n.enableZoom&&Ve(R),n.enablePan&&he(R)}function _e(R){n.enableZoom&&Ve(R),n.enableRotate&&Te(R)}function tt(R){n.enabled!==!1&&(S.length===0&&(n.domElement.setPointerCapture(R.pointerId),n.domElement.addEventListener("pointermove",ut),n.domElement.addEventListener("pointerup",rt)),ee(R),R.pointerType==="touch"?A(R):at(R))}function ut(R){n.enabled!==!1&&(R.pointerType==="touch"?b(R):Ge(R))}function rt(R){te(R),S.length===0&&(n.domElement.releasePointerCapture(R.pointerId),n.domElement.removeEventListener("pointermove",ut),n.domElement.removeEventListener("pointerup",rt)),n.dispatchEvent(Ml),r=s.NONE}function Pt(R){te(R)}function at(R){let I;switch(R.button){case 0:I=n.mouseButtons.LEFT;break;case 1:I=n.mouseButtons.MIDDLE;break;case 2:I=n.mouseButtons.RIGHT;break;default:I=-1}switch(I){case pi.DOLLY:if(n.enableZoom===!1)return;Z(R),r=s.DOLLY;break;case pi.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enablePan===!1)return;V(R),r=s.PAN}else{if(n.enableRotate===!1)return;K(R),r=s.ROTATE}break;case pi.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enableRotate===!1)return;K(R),r=s.ROTATE}else{if(n.enablePan===!1)return;V(R),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(Yr)}function Ge(R){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;U(R);break;case s.DOLLY:if(n.enableZoom===!1)return;k(R);break;case s.PAN:if(n.enablePan===!1)return;ne(R);break}}function Bt(R){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(R.preventDefault(),n.dispatchEvent(Yr),J(R),n.dispatchEvent(Ml))}function zt(R){n.enabled===!1||n.enablePan===!1||se(R)}function A(R){switch(ae(R),S.length){case 1:switch(n.touches.ONE){case mi.ROTATE:if(n.enableRotate===!1)return;de(),r=s.TOUCH_ROTATE;break;case mi.PAN:if(n.enablePan===!1)return;we(),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case mi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Be(),r=s.TOUCH_DOLLY_PAN;break;case mi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Se(),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(Yr)}function b(R){switch(ae(R),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;Te(R),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;he(R),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Re(R),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;_e(R),n.update();break;default:r=s.NONE}}function G(R){n.enabled!==!1&&R.preventDefault()}function ee(R){S.push(R)}function te(R){delete E[R.pointerId];for(let I=0;I<S.length;I++)if(S[I].pointerId==R.pointerId){S.splice(I,1);return}}function ae(R){let I=E[R.pointerId];I===void 0&&(I=new re,E[R.pointerId]=I),I.set(R.pageX,R.pageY)}function Me(R){const I=R.pointerId===S[0].pointerId?S[1]:S[0];return E[I.pointerId]}n.domElement.addEventListener("contextmenu",G),n.domElement.addEventListener("pointerdown",tt),n.domElement.addEventListener("pointercancel",Pt),n.domElement.addEventListener("wheel",Bt,{passive:!1}),this.update()}}class jg extends Xi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Kg(t)}),this.register(function(t){return new iv(t)}),this.register(function(t){return new sv(t)}),this.register(function(t){return new Jg(t)}),this.register(function(t){return new Qg(t)}),this.register(function(t){return new ev(t)}),this.register(function(t){return new tv(t)}),this.register(function(t){return new $g(t)}),this.register(function(t){return new nv(t)}),this.register(function(t){return new Zg(t)}),this.register(function(t){return new qg(t)}),this.register(function(t){return new rv(t)}),this.register(function(t){return new av(t)})}load(e,t,n,s){const r=this;let a;this.resourcePath!==""?a=this.resourcePath:this.path!==""?a=this.path:a=si.extractUrlBase(e),this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new La(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={};if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(si.decodeText(new Uint8Array(e,0,4))===Cc){try{a[Pe.KHR_BINARY_GLTF]=new ov(e)}catch(u){s&&s(u);return}r=JSON.parse(a[Pe.KHR_BINARY_GLTF].content)}else r=JSON.parse(si.decodeText(new Uint8Array(e)));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new yv(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let c=0;c<this.pluginCallbacks.length;c++){const u=this.pluginCallbacks[c](l);o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let c=0;c<r.extensionsUsed.length;++c){const u=r.extensionsUsed[c],h=r.extensionsRequired||[];switch(u){case Pe.KHR_MATERIALS_UNLIT:a[u]=new Yg;break;case Pe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:a[u]=new uv;break;case Pe.KHR_DRACO_MESH_COMPRESSION:a[u]=new lv(r,this.dracoLoader);break;case Pe.KHR_TEXTURE_TRANSFORM:a[u]=new cv;break;case Pe.KHR_MESH_QUANTIZATION:a[u]=new hv;break;default:h.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function Xg(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Pe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:"KHR_materials_pbrSpecularGlossiness",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class qg{constructor(e){this.parser=e,this.name=Pe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const u=new xe(16777215);l.color!==void 0&&u.fromArray(l.color);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Rc(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ag(u),c.distance=h;break;case"spot":c=new Tg(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class Yg{constructor(){this.name=Pe.KHR_MATERIALS_UNLIT}getMaterialType(){return Qn}extendParams(e,t,n){const s=[];e.color=new xe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.fromArray(a),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,ye))}return Promise.all(s)}}class $g{constructor(e){this.parser=e,this.name=Pe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Kg{constructor(e){this.parser=e,this.name=Pe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:li}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new re(o,o)}return Promise.all(r)}}class Zg{constructor(e){this.parser=e,this.name=Pe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:li}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class Jg{constructor(e){this.parser=e,this.name=Pe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:li}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new xe(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];return a.sheenColorFactor!==void 0&&t.sheenColor.fromArray(a.sheenColorFactor),a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,ye)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class Qg{constructor(e){this.parser=e,this.name=Pe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:li}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class ev{constructor(e){this.parser=e,this.name=Pe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:li}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new xe(o[0],o[1],o[2]),Promise.all(r)}}class tv{constructor(e){this.parser=e,this.name=Pe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:li}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class nv{constructor(e){this.parser=e,this.name=Pe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:li}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new xe(o[0],o[1],o[2]),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,ye)),Promise.all(r)}}class iv{constructor(e){this.parser=e,this.name=Pe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class sv{constructor(e){this.parser=e,this.name=Pe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class rv{constructor(e){this.name=Pe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(p){return p.buffer}):a.ready.then(function(){const p=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(p),u,h,d,s.mode,s.filter),p})})}else return null}}class av{constructor(e){this.name=Pe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==Wt.TRIANGLES&&c.mode!==Wt.TRIANGLE_STRIP&&c.mode!==Wt.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,p=[];for(const v of h){const m=new be,f=new C,g=new qt,M=new C(1,1,1),y=new rg(v.geometry,v.material,d);for(let _=0;_<d;_++)l.TRANSLATION&&f.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,_),l.SCALE&&M.fromBufferAttribute(l.SCALE,_),y.setMatrixAt(_,m.compose(f,g,M));for(const _ in l)_!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&v.geometry.setAttribute(_,l[_]);Ze.prototype.copy.call(y,v),y.frustumCulled=!1,this.parser.assignFinalMaterial(y),p.push(y)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}}const Cc="glTF",es=12,Sl={JSON:1313821514,BIN:5130562};class ov{constructor(e){this.name=Pe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,es);if(this.header={magic:si.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Cc)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const n=this.header.length-es,s=new DataView(e,es);let r=0;for(;r<n;){const a=s.getUint32(r,!0);r+=4;const o=s.getUint32(r,!0);if(r+=4,o===Sl.JSON){const l=new Uint8Array(e,es+r,a);this.content=si.decodeText(l)}else if(o===Sl.BIN){const l=es+r;this.body=e.slice(l,l+a)}r+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class lv{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Pe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const u in a){const h=da[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=da[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],p=ms[d.componentType];c[h]=p.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h){s.decodeDracoFile(u,function(d){for(const p in d.attributes){const v=d.attributes[p],m=l[p];m!==void 0&&(v.normalized=m)}h(d)},o,c)})})}}class cv{constructor(){this.name=Pe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return t.texCoord!==void 0&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class ha extends xs{constructor(e){super(),this.isGLTFSpecularGlossinessMaterial=!0;const t=["#ifdef USE_SPECULARMAP","	uniform sampler2D specularMap;","#endif"].join(`
`),n=["#ifdef USE_GLOSSINESSMAP","	uniform sampler2D glossinessMap;","#endif"].join(`
`),s=["vec3 specularFactor = specular;","#ifdef USE_SPECULARMAP","	vec4 texelSpecular = texture2D( specularMap, vUv );","	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture","	specularFactor *= texelSpecular.rgb;","#endif"].join(`
`),r=["float glossinessFactor = glossiness;","#ifdef USE_GLOSSINESSMAP","	vec4 texelGlossiness = texture2D( glossinessMap, vUv );","	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture","	glossinessFactor *= texelGlossiness.a;","#endif"].join(`
`),a=["PhysicalMaterial material;","material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );","vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );","float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );","material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.","material.roughness += geometryRoughness;","material.roughness = min( material.roughness, 1.0 );","material.specularColor = specularFactor;"].join(`
`),o={specular:{value:new xe().setHex(16777215)},glossiness:{value:1},specularMap:{value:null},glossinessMap:{value:null}};this._extraUniforms=o,this.onBeforeCompile=function(l){for(const c in o)l.uniforms[c]=o[c];l.fragmentShader=l.fragmentShader.replace("uniform float roughness;","uniform vec3 specular;").replace("uniform float metalness;","uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>",t).replace("#include <metalnessmap_pars_fragment>",n).replace("#include <roughnessmap_fragment>",s).replace("#include <metalnessmap_fragment>",r).replace("#include <lights_physical_fragment>",a)},Object.defineProperties(this,{specular:{get:function(){return o.specular.value},set:function(l){o.specular.value=l}},specularMap:{get:function(){return o.specularMap.value},set:function(l){o.specularMap.value=l,l?this.defines.USE_SPECULARMAP="":delete this.defines.USE_SPECULARMAP}},glossiness:{get:function(){return o.glossiness.value},set:function(l){o.glossiness.value=l}},glossinessMap:{get:function(){return o.glossinessMap.value},set:function(l){o.glossinessMap.value=l,l?(this.defines.USE_GLOSSINESSMAP="",this.defines.USE_UV=""):(delete this.defines.USE_GLOSSINESSMAP,delete this.defines.USE_UV)}}}),delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this.setValues(e)}copy(e){return super.copy(e),this.specularMap=e.specularMap,this.specular.copy(e.specular),this.glossinessMap=e.glossinessMap,this.glossiness=e.glossiness,delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this}}class uv{constructor(){this.name=Pe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,this.specularGlossinessParams=["color","map","lightMap","lightMapIntensity","aoMap","aoMapIntensity","emissive","emissiveIntensity","emissiveMap","bumpMap","bumpScale","normalMap","normalMapType","displacementMap","displacementScale","displacementBias","specularMap","specular","glossinessMap","glossiness","alphaMap","envMap","envMapIntensity"]}getMaterialType(){return ha}extendParams(e,t,n){const s=t.extensions[this.name];e.color=new xe(1,1,1),e.opacity=1;const r=[];if(Array.isArray(s.diffuseFactor)){const a=s.diffuseFactor;e.color.fromArray(a),e.opacity=a[3]}if(s.diffuseTexture!==void 0&&r.push(n.assignTexture(e,"map",s.diffuseTexture,ye)),e.emissive=new xe(0,0,0),e.glossiness=s.glossinessFactor!==void 0?s.glossinessFactor:1,e.specular=new xe(1,1,1),Array.isArray(s.specularFactor)&&e.specular.fromArray(s.specularFactor),s.specularGlossinessTexture!==void 0){const a=s.specularGlossinessTexture;r.push(n.assignTexture(e,"glossinessMap",a)),r.push(n.assignTexture(e,"specularMap",a,ye))}return Promise.all(r)}createMaterial(e){const t=new ha(e);return t.fog=!0,t.color=e.color,t.map=e.map===void 0?null:e.map,t.lightMap=null,t.lightMapIntensity=1,t.aoMap=e.aoMap===void 0?null:e.aoMap,t.aoMapIntensity=1,t.emissive=e.emissive,t.emissiveIntensity=e.emissiveIntensity===void 0?1:e.emissiveIntensity,t.emissiveMap=e.emissiveMap===void 0?null:e.emissiveMap,t.bumpMap=e.bumpMap===void 0?null:e.bumpMap,t.bumpScale=1,t.normalMap=e.normalMap===void 0?null:e.normalMap,t.normalMapType=gs,e.normalScale&&(t.normalScale=e.normalScale),t.displacementMap=null,t.displacementScale=1,t.displacementBias=0,t.specularMap=e.specularMap===void 0?null:e.specularMap,t.specular=e.specular,t.glossinessMap=e.glossinessMap===void 0?null:e.glossinessMap,t.glossiness=e.glossiness,t.alphaMap=null,t.envMap=e.envMap===void 0?null:e.envMap,t.envMapIntensity=1,t}}class hv{constructor(){this.name=Pe.KHR_MESH_QUANTIZATION}}class Dc extends ys{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=s-t,h=(n-t)/u,d=h*h,p=d*h,v=e*c,m=v-c,f=-2*p+3*d,g=p-d,M=1-f,y=g-d+h;for(let _=0;_!==o;_++){const S=a[m+_+o],E=a[m+_+l]*u,D=a[v+_+o],x=a[v+_]*u;r[_]=M*S+y*E+f*D+g*x}return r}}const dv=new qt;class fv extends Dc{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return dv.fromArray(r).normalize().toArray(r),r}}const Wt={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ms={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},bl={9728:je,9729:Ee,9984:ta,9985:Kl,9986:na,9987:oi},wl={33071:At,33648:tr,10497:Qt},Tl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},da={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},In={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},pv={CUBICSPLINE:void 0,LINEAR:Oi,STEP:us},$r={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function mv(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new xs({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:zn})),i.DefaultMaterial}function ts(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Kn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function gv(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function vv(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _v(i){const e=i.extensions&&i.extensions[Pe.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+El(e.attributes):t=i.indices+":"+El(i.attributes)+":"+i.mode,t}function El(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function fa(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function xv(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}class yv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Xg,this.associations=new Map,this.primitiveCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};const n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,s=navigator.userAgent.indexOf("Firefox")>-1,r=s?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1;typeof createImageBitmap>"u"||n||s&&r<98?this.textureLoader=new Ac(this.options.manager):this.textureLoader=new Cg(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new La(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};ts(r,o,s),Kn(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,u]of a.children.entries())r(u,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this.loadNode(t);break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:throw new Error("Unknown type: "+e)}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Pe.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(si.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0)return Promise.resolve(null);const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Tl[s.type],c=ms[s.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,v=s.normalized===!0;let m,f;if(p&&p!==h){const g=Math.floor(d/p),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count;let y=t.cache.get(M);y||(m=new c(o,g*p,s.count*p/u),y=new eg(m,p/u),t.cache.add(M,y)),f=new Aa(y,l,d%p/u,v)}else o===null?m=new c(s.count*l):m=new c(o,d,s.count*l),f=new pt(m,l,v);if(s.sparse!==void 0){const g=Tl.SCALAR,M=ms[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,_=s.sparse.values.byteOffset||0,S=new M(a[1],y,s.sparse.count*g),E=new c(a[2],_,s.sparse.count*l);o!==null&&(f=new pt(f.array.slice(),f.itemSize,f.normalized));for(let D=0,x=S.length;D<x;D++){const w=S[D];if(f.setX(w,E[D*l]),l>=2&&f.setY(w,E[D*l+1]),l>=3&&f.setZ(w,E[D*l+2]),l>=4&&f.setW(w,E[D*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return f})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"";const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=bl[d.magFilter]||Ee,u.minFilter=bl[d.minFilter]||oi,u.wrapS=wl[d.wrapS]||Qt,u.wrapT=wl[d.wrapT]||Qt,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(h){c=!0;const d=new Blob([h],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(d,p){let v=d;t.isImageBitmapLoader===!0&&(v=function(m){const f=new st(m);f.needsUpdate=!0,d(f)}),t.load(si.resolveURL(h,r.path),v,void 0,p)})}).then(function(h){return c===!0&&o.revokeObjectURL(l),h.userData.mimeType=a.mimeType||xv(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(n.texCoord!==void 0&&n.texCoord!=0&&!(t==="aoMap"&&n.texCoord==1)&&console.warn("THREE.GLTFLoader: Custom UV set "+n.texCoord+" for texture "+t+" not yet supported."),r.extensions[Pe.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Pe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[Pe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.encoding=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new bc,Ot.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Sc,Ot.prototype.copy.call(l,n),l.color.copy(n.color),this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";n.isGLTFSpecularGlossinessMaterial&&(o+="specular-glossiness:"),s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}n.aoMap&&t.attributes.uv2===void 0&&t.attributes.uv!==void 0&&t.setAttribute("uv2",t.attributes.uv),e.material=n}getMaterialType(){return xs}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[Pe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]){const h=s[Pe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];a=h.getMaterialType(),c.push(h.extendParams(o,r,t))}else if(l[Pe.KHR_MATERIALS_UNLIT]){const h=s[Pe.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),c.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new xe(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.fromArray(d),o.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,ye)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Rt);const u=r.alphaMode||$r.OPAQUE;if(u===$r.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===$r.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Qn&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new re(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}return r.occlusionTexture!==void 0&&a!==Qn&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Qn&&(o.emissive=new xe().fromArray(r.emissiveFactor)),r.emissiveTexture!==void 0&&a!==Qn&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,ye)),Promise.all(c).then(function(){let h;return a===ha?h=s[Pe.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(o):h=new a(o),r.name&&(h.name=r.name),Kn(h,r),t.associations.set(h,{materials:e}),r.extensions&&ts(s,h,r),h})}createUniqueName(e){const t=We.sanitizeNodeName(e||"");let n=t;for(let s=1;this.nodeNamesUsed[n];++s)n=t+"_"+s;return this.nodeNamesUsed[n]=!0,n}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[Pe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Al(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],u=_v(c),h=s[u];if(h)a.push(h.promise);else{let d;c.extensions&&c.extensions[Pe.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Al(new Yt,c,t),s[u]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const u=a[l].material===void 0?mv(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let p=0,v=u.length;p<v;p++){const m=u[p],f=a[p];let g;const M=c[p];if(f.mode===Wt.TRIANGLES||f.mode===Wt.TRIANGLE_STRIP||f.mode===Wt.TRIANGLE_FAN||f.mode===void 0)g=r.isSkinnedMesh===!0?new ng(m,M):new Et(m,M),g.isSkinnedMesh===!0&&!g.geometry.attributes.skinWeight.normalized&&g.normalizeSkinWeights(),f.mode===Wt.TRIANGLE_STRIP?g.geometry=Rl(g.geometry,Hu):f.mode===Wt.TRIANGLE_FAN&&(g.geometry=Rl(g.geometry,ec));else if(f.mode===Wt.LINES)g=new ag(m,M);else if(f.mode===Wt.LINE_STRIP)g=new Ca(m,M);else if(f.mode===Wt.LINE_LOOP)g=new og(m,M);else if(f.mode===Wt.POINTS)g=new lg(m,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+f.mode);Object.keys(g.geometry.morphAttributes).length>0&&vv(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),Kn(g,r),f.extensions&&ts(s,g,f),t.assignFinalMaterial(g),h.push(g)}for(let p=0,v=h.length;p<v;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return h[0];const d=new ei;t.associations.set(d,{meshes:e});for(let p=0,v=h.length;p<v;p++)d.add(h[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ft(nc.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Ta(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Kn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n={joints:t.joints};return t.inverseBindMatrices===void 0?Promise.resolve(n):this.getDependency("accessor",t.inverseBindMatrices).then(function(s){return n.inverseBindMatrices=s,n})}loadAnimation(e){const n=this.json.animations[e],s=[],r=[],a=[],o=[],l=[];for(let c=0,u=n.channels.length;c<u;c++){const h=n.channels[c],d=n.samplers[h.sampler],p=h.target,v=p.node,m=n.parameters!==void 0?n.parameters[d.input]:d.input,f=n.parameters!==void 0?n.parameters[d.output]:d.output;s.push(this.getDependency("node",v)),r.push(this.getDependency("accessor",m)),a.push(this.getDependency("accessor",f)),o.push(d),l.push(p)}return Promise.all([Promise.all(s),Promise.all(r),Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2],p=c[3],v=c[4],m=[];for(let g=0,M=u.length;g<M;g++){const y=u[g],_=h[g],S=d[g],E=p[g],D=v[g];if(y===void 0)continue;y.updateMatrix();let x;switch(In[D.path]){case In.weights:x=fs;break;case In.rotation:x=ai;break;case In.position:case In.scale:default:x=ps;break}const w=y.name?y.name:y.uuid,P=E.interpolation!==void 0?pv[E.interpolation]:Oi,z=[];In[D.path]===In.weights?y.traverse(function(O){O.morphTargetInfluences&&z.push(O.name?O.name:O.uuid)}):z.push(w);let $=S.array;if(S.normalized){const O=fa($.constructor),N=new Float32Array($.length);for(let H=0,K=$.length;H<K;H++)N[H]=$[H]*O;$=N}for(let O=0,N=z.length;O<N;O++){const H=new x(z[O]+"."+In[D.path],_.array,$,P);E.interpolation==="CUBICSPLINE"&&(H.createInterpolant=function(Z){const V=this instanceof ai?fv:Dc;return new V(this.times,this.values,this.getValueSize()/3,Z)},H.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),m.push(H)}}const f=n.name?n.name:"animation_"+e;return new gg(f,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(!!o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,n=this.extensions,s=this,r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"";return function(){const o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),Promise.all(o)}().then(function(o){let l;if(r.isBone===!0?l=new Mc:o.length>1?l=new ei:o.length===1?l=o[0]:l=new Ze,l!==o[0])for(let c=0,u=o.length;c<u;c++)l.add(o[c]);if(r.name&&(l.userData.name=r.name,l.name=a),Kn(l,r),r.extensions&&ts(n,l,r),r.matrix!==void 0){const c=new be;c.fromArray(r.matrix),l.applyMatrix4(c)}else r.translation!==void 0&&l.position.fromArray(r.translation),r.rotation!==void 0&&l.quaternion.fromArray(r.rotation),r.scale!==void 0&&l.scale.fromArray(r.scale);return s.associations.has(l)||s.associations.set(l,{}),s.associations.get(l).nodes=e,l})}loadScene(e){const t=this.json,n=this.extensions,s=this.json.scenes[e],r=this,a=new ei;s.name&&(a.name=r.createUniqueName(s.name)),Kn(a,s),s.extensions&&ts(n,a,s);const o=s.nodes||[],l=[];for(let c=0,u=o.length;c<u;c++)l.push(Pc(o[c],a,t,r));return Promise.all(l).then(function(){const c=u=>{const h=new Map;for(const[d,p]of r.associations)(d instanceof Ot||d instanceof st)&&h.set(d,p);return u.traverse(d=>{const p=r.associations.get(d);p!=null&&h.set(d,p)}),h};return r.associations=c(a),a})}}function Pc(i,e,t,n){const s=t.nodes[i];return n.getDependency("node",i).then(function(r){if(s.skin===void 0)return r;let a;return n.getDependency("skin",s.skin).then(function(o){a=o;const l=[];for(let c=0,u=a.joints.length;c<u;c++)l.push(n.getDependency("node",a.joints[c]));return Promise.all(l)}).then(function(o){return r.traverse(function(l){if(!l.isMesh)return;const c=[],u=[];for(let h=0,d=o.length;h<d;h++){const p=o[h];if(p){c.push(p);const v=new be;a.inverseBindMatrices!==void 0&&v.fromArray(a.inverseBindMatrices.array,h*16),u.push(v)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',a.joints[h])}l.bind(new Ra(c,u),l.matrixWorld)}),r})}).then(function(r){e.add(r);const a=[];if(s.children){const o=s.children;for(let l=0,c=o.length;l<c;l++){const u=o[l];a.push(Pc(u,r,t,n))}}return Promise.all(a)})}function Mv(i,e,t){const n=e.attributes,s=new Hi;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),o.normalized){const u=fa(ms[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new C,l=new C;for(let c=0,u=r.length;c<u;c++){const h=r[c];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],p=d.min,v=d.max;if(p!==void 0&&v!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(v[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(v[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(v[2]))),d.normalized){const m=fa(ms[d.componentType]);l.multiplyScalar(m)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new Vi;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Al(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(const a in n){const o=da[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return Kn(i,e),Mv(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?gv(i,e.targets,t):i})}function Rl(i,e){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===ec)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r}/**
 * postprocessing v6.29.1 build Thu Oct 27 2022
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2022 Raoul van Rüschen
 * @license Zlib
 */var Oa="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}";function Xs(i,e,t){return i*(e-t)-e}function qs(i,e,t){return Math.min(Math.max((i+e)/(e-t),0),1)}var Le={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},ls={DEFAULT:0,KEEP_MAX_DEPTH:1,DISCARD_MAX_DEPTH:2},bn={NONE:0,DEPTH:1,CONVOLUTION:2},Oe={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},Ba={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},Sv=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <encodings_fragment>
}`,bv="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",wv=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],Tv=class extends et{constructor(i=new Xe){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new Y(null),texelSize:new Y(new Xe),scale:new Y(1),kernel:new Y(0)},blending:_t,depthWrite:!1,depthTest:!1,fragmentShader:Sv,vertexShader:bv}),this.toneMapped=!1,this.setTexelSize(i.x,i.y),this.kernelSize=Ba.MEDIUM}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.inputBuffer=i}get kernelSequence(){return wv[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(){return this.uniforms.scale.value}setScale(i){this.uniforms.scale.value=i}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(i){this.uniforms.kernel.value=i}setKernel(i){this.kernel=i}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e,i*.5,e*.5)}setSize(i,e){const t=1/i,n=1/e;this.uniforms.texelSize.value.set(t,n,t*.5,n*.5)}},Ev=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <encodings_fragment>
#include <dithering_fragment>
}`,Lc=class extends et{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new Y(null),opacity:new Y(1)},blending:_t,depthWrite:!1,depthTest:!1,fragmentShader:Ev,vertexShader:Oa}),this.toneMapped=!1}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}getOpacity(i){return this.uniforms.opacity.value}setOpacity(i){this.uniforms.opacity.value=i}},Av=`#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
#ifdef DOWNSAMPLE_NORMALS
uniform lowp sampler2D normalBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}int findBestDepth(const in float samples[4]){float c=(samples[0]+samples[1]+samples[2]+samples[3])*0.25;float distances[]=float[4](abs(c-samples[0]),abs(c-samples[1]),abs(c-samples[2]),abs(c-samples[3]));float maxDistance=max(max(distances[0],distances[1]),max(distances[2],distances[3]));int remaining[3];int rejected[3];int i,j,k;for(i=0,j=0,k=0;i<4;++i){if(distances[i]<maxDistance){remaining[j++]=i;}else{rejected[k++]=i;}}for(;j<3;++j){remaining[j]=rejected[--k];}vec3 s=vec3(samples[remaining[0]],samples[remaining[1]],samples[remaining[2]]);c=(s.x+s.y+s.z)/3.0;distances[0]=abs(c-s.x);distances[1]=abs(c-s.y);distances[2]=abs(c-s.z);float minDistance=min(distances[0],min(distances[1],distances[2]));for(i=0;i<3;++i){if(distances[i]==minDistance){break;}}return remaining[i];}void main(){float d[]=float[4](readDepth(vUv0),readDepth(vUv1),readDepth(vUv2),readDepth(vUv3));int index=findBestDepth(d);
#ifdef DOWNSAMPLE_NORMALS
vec3 n[]=vec3[4](texture2D(normalBuffer,vUv0).rgb,texture2D(normalBuffer,vUv1).rgb,texture2D(normalBuffer,vUv2).rgb,texture2D(normalBuffer,vUv3).rgb);
#else
vec3 n[]=vec3[4](vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));
#endif
gl_FragColor=vec4(n[index],d[index]);}`,Rv="uniform vec2 texelSize;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vUv0=uv;vUv1=vec2(uv.x,uv.y+texelSize.y);vUv2=vec2(uv.x+texelSize.x,uv.y);vUv3=uv+texelSize;gl_Position=vec4(position.xy,1.0,1.0);}",Cv=class extends et{constructor(){super({name:"DepthDownsamplingMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new Y(null),normalBuffer:new Y(null),texelSize:new Y(new re)},blending:_t,depthWrite:!1,depthTest:!1,fragmentShader:Av,vertexShader:Rv}),this.toneMapped=!1}set depthBuffer(i){this.uniforms.depthBuffer.value=i}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=Xt){this.depthBuffer=i,this.depthPacking=e}set normalBuffer(i){this.uniforms.normalBuffer.value=i,i!==null?this.defines.DOWNSAMPLE_NORMALS="1":delete this.defines.DOWNSAMPLE_NORMALS,this.needsUpdate=!0}setNormalBuffer(i){this.normalBuffer=i}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e)}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},Dv=`#include <common>
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer0;uniform highp sampler2D depthBuffer1;
#else
uniform mediump sampler2D depthBuffer0;uniform mediump sampler2D depthBuffer1;
#endif
uniform sampler2D inputBuffer;uniform vec2 cameraNearFar;float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNearFar.x,cameraNearFar.y);
#else
return orthographicDepthToViewZ(depth,cameraNearFar.x,cameraNearFar.y);
#endif
}varying vec2 vUv;void main(){vec2 depth;
#if DEPTH_PACKING_0 == 3201
depth.x=unpackRGBAToDepth(texture2D(depthBuffer0,vUv));
#else
depth.x=texture2D(depthBuffer0,vUv).r;
#endif
#if DEPTH_PACKING_1 == 3201
depth.y=unpackRGBAToDepth(texture2D(depthBuffer1,vUv));
#else
depth.y=texture2D(depthBuffer1,vUv).r;
#endif
bool isMaxDepth=(depth.x==1.0);
#ifdef PERSPECTIVE_CAMERA
depth.x=viewZToOrthographicDepth(getViewZ(depth.x),cameraNearFar.x,cameraNearFar.y);depth.y=viewZToOrthographicDepth(getViewZ(depth.y),cameraNearFar.x,cameraNearFar.y);
#endif
#if DEPTH_TEST_STRATEGY == 0
bool keep=depthTest(depth.x,depth.y);
#elif DEPTH_TEST_STRATEGY == 1
bool keep=isMaxDepth||depthTest(depth.x,depth.y);
#else
bool keep=!isMaxDepth&&depthTest(depth.x,depth.y);
#endif
if(keep){gl_FragColor=texture2D(inputBuffer,vUv);}else{discard;}}`,Pv=class extends et{constructor(){super({name:"DepthMaskMaterial",defines:{DEPTH_EPSILON:"0.0001",DEPTH_PACKING_0:"0",DEPTH_PACKING_1:"0",DEPTH_TEST_STRATEGY:ls.KEEP_MAX_DEPTH},uniforms:{inputBuffer:new Y(null),depthBuffer0:new Y(null),depthBuffer1:new Y(null),cameraNearFar:new Y(new re(1,1))},blending:_t,depthWrite:!1,depthTest:!1,fragmentShader:Dv,vertexShader:Oa}),this.toneMapped=!1,this.depthMode=Qr}set depthBuffer0(i){this.uniforms.depthBuffer0.value=i}set depthPacking0(i){this.defines.DEPTH_PACKING_0=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer0(i,e=Xt){this.depthBuffer0=i,this.depthPacking0=e}set depthBuffer1(i){this.uniforms.depthBuffer1.value=i}set depthPacking1(i){this.defines.DEPTH_PACKING_1=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer1(i,e=Xt){this.depthBuffer1=i,this.depthPacking1=e}get maxDepthStrategy(){return Number(this.defines.DEPTH_TEST_STRATEGY)}set maxDepthStrategy(i){this.defines.DEPTH_TEST_STRATEGY=i.toFixed(0),this.needsUpdate=!0}get keepFar(){return this.maxDepthStrategy}set keepFar(i){this.maxDepthStrategy=i?ls.KEEP_MAX_DEPTH:ls.DISCARD_MAX_DEPTH}getMaxDepthStrategy(){return this.maxDepthStrategy}setMaxDepthStrategy(i){this.maxDepthStrategy=i}get epsilon(){return Number(this.defines.DEPTH_EPSILON)}set epsilon(i){this.defines.DEPTH_EPSILON=i.toFixed(16),this.needsUpdate=!0}getEpsilon(){return this.epsilon}setEpsilon(i){this.epsilon=i}get depthMode(){return Number(this.defines.DEPTH_MODE)}set depthMode(i){let e;switch(i){case Gl:e="false";break;case Wl:e="true";break;case Qs:e="abs(d1 - d0) <= DEPTH_EPSILON";break;case va:e="abs(d1 - d0) > DEPTH_EPSILON";break;case Qr:e="d0 > d1";break;case Js:e="d0 >= d1";break;case jl:e="d0 <= d1";break;case Xl:default:e="d0 < d1";break}this.defines.DEPTH_MODE=i.toFixed(0),this.defines["depthTest(d0, d1)"]=e,this.needsUpdate=!0}getDepthMode(){return this.depthMode}setDepthMode(i){this.depthMode=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNearFar.value.set(i.near,i.far),i instanceof ft?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}},Lv=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <encodings_fragment>
}`,Iv="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",Nv=class extends et{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new Y(null),texelSize:new Y(new re)},blending:_t,depthWrite:!1,depthTest:!1,fragmentShader:Lv,vertexShader:Iv}),this.toneMapped=!1}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},Fv=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;
#if THREE_REVISION < 143
#define luminance(v) linearToRelativeLuminance(v)
#endif
#if THREE_REVISION >= 137
vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEADvoid main(){FRAGMENT_MAIN_UVvec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGEgl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <encodings_fragment>
#endif
#include <dithering_fragment>
}`,Uv="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEADvoid main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORTgl_Position=vec4(position.xy,1.0,1.0);}",Ov=class extends et{constructor(i,e,t,n,s=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:ki.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new Y(null),depthBuffer:new Y(null),resolution:new Y(new re),texelSize:new Y(new re),cameraNear:new Y(.3),cameraFar:new Y(1e3),aspect:new Y(1),time:new Y(0)},blending:_t,depthWrite:!1,depthTest:!1,dithering:s}),this.toneMapped=!1,i&&this.setShaderParts(i),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(n)}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){this.uniforms.depthBuffer.value=i}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=Xt){this.depthBuffer=i,this.depthPacking=e}setShaderData(i){this.setShaderParts(i.shaderParts),this.setDefines(i.defines),this.setUniforms(i.uniforms),this.setExtensions(i.extensions)}setShaderParts(i){var e,t,n,s,r;return this.fragmentShader=Fv.replace(Oe.FRAGMENT_HEAD,(e=i.get(Oe.FRAGMENT_HEAD))!=null?e:"").replace(Oe.FRAGMENT_MAIN_UV,(t=i.get(Oe.FRAGMENT_MAIN_UV))!=null?t:"").replace(Oe.FRAGMENT_MAIN_IMAGE,(n=i.get(Oe.FRAGMENT_MAIN_IMAGE))!=null?n:""),this.vertexShader=Uv.replace(Oe.VERTEX_HEAD,(s=i.get(Oe.VERTEX_HEAD))!=null?s:"").replace(Oe.VERTEX_MAIN_SUPPORT,(r=i.get(Oe.VERTEX_MAIN_SUPPORT))!=null?r:""),this.needsUpdate=!0,this}setDefines(i){for(const e of i.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(i){for(const e of i.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(i){this.extensions={};for(const e of i)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(i){this.encodeOutput!==i&&(i?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(i){return this.encodeOutput}setOutputEncodingEnabled(i){this.encodeOutput=i}get time(){return this.uniforms.time.value}set time(i){this.uniforms.time.value=i}setDeltaTime(i){this.uniforms.time.value+=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far,i instanceof ft?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(i,e){const t=this.uniforms;t.resolution.value.set(i,e),t.texelSize.value.set(1/i,1/e),t.aspect.value=i/e}static get Section(){return Oe}},Bv=`#include <common>
#if THREE_REVISION < 143
#define luminance(v) linearToRelativeLuminance(v)
#endif
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);l*=low*high;
#elif defined(THRESHOLD)
l=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=vec4(texel.rgb*l,l);
#else
gl_FragColor=vec4(l);
#endif
}`,zv=class extends et{constructor(i=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:ki.replace(/\D+/g,"")},uniforms:{inputBuffer:new Y(null),threshold:new Y(0),smoothing:new Y(1),range:new Y(null)},blending:_t,depthWrite:!1,depthTest:!1,fragmentShader:Bv,vertexShader:Oa}),this.toneMapped=!1,this.colorOutput=i,this.luminanceRange=e}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get threshold(){return this.uniforms.threshold.value}set threshold(i){this.smoothing>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=i}getThreshold(){return this.threshold}setThreshold(i){this.threshold=i}get smoothing(){return this.uniforms.smoothing.value}set smoothing(i){this.threshold>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=i}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(i){this.smoothing=i}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(i){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(i){i?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(i){return this.colorOutput}setColorOutputEnabled(i){this.colorOutput=i}get useRange(){return this.luminanceRange!==null}set useRange(i){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(i){i!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=i,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(i){this.luminanceRange=i}},kv=`#include <common>
#include <packing>
#ifdef NORMAL_DEPTH
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D normalDepthBuffer;
#else
uniform mediump sampler2D normalDepthBuffer;
#endif
float readDepth(const in vec2 uv){return texture2D(normalDepthBuffer,uv).a;}
#else
uniform lowp sampler2D normalBuffer;
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}
#endif
uniform lowp sampler2D noiseTexture;uniform mat4 inverseProjectionMatrix;uniform mat4 projectionMatrix;uniform vec2 texelSize;uniform vec2 cameraNearFar;uniform float intensity;uniform float minRadiusScale;uniform float fade;uniform float bias;uniform vec2 distanceCutoff;uniform vec2 proximityCutoff;varying vec2 vUv;varying vec2 vUv2;float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNearFar.x,cameraNearFar.y);
#else
return orthographicDepthToViewZ(depth,cameraNearFar.x,cameraNearFar.y);
#endif
}vec3 getViewPosition(const in vec2 screenPosition,const in float depth,const in float viewZ){vec4 clipPosition=vec4(vec3(screenPosition,depth)*2.0-1.0,1.0);float clipW=projectionMatrix[2][3]*viewZ+projectionMatrix[3][3];clipPosition*=clipW;return(inverseProjectionMatrix*clipPosition).xyz;}float getAmbientOcclusion(const in vec3 p,const in vec3 n,const in float depth,const in vec2 uv){float radiusScale=1.0-smoothstep(0.0,distanceCutoff.y,depth);radiusScale=radiusScale*(1.0-minRadiusScale)+minRadiusScale;float radius=RADIUS*radiusScale;float noise=texture2D(noiseTexture,vUv2).r;float baseAngle=noise*PI2;float rings=SPIRAL_TURNS*PI2;float occlusion=0.0;int taps=0;for(int i=0;i<SAMPLES_INT;++i){float alpha=(float(i)+0.5)*INV_SAMPLES_FLOAT;float angle=alpha*rings+baseAngle;vec2 rotation=vec2(cos(angle),sin(angle));vec2 coords=alpha*radius*rotation*texelSize+uv;if(coords.s<0.0||coords.s>1.0||coords.t<0.0||coords.t>1.0){continue;}float sampleDepth=readDepth(coords);float viewZ=getViewZ(sampleDepth);
#ifdef PERSPECTIVE_CAMERA
float linearSampleDepth=viewZToOrthographicDepth(viewZ,cameraNearFar.x,cameraNearFar.y);
#else
float linearSampleDepth=sampleDepth;
#endif
float proximity=abs(depth-linearSampleDepth);if(proximity<proximityCutoff.y){float falloff=1.0-smoothstep(proximityCutoff.x,proximityCutoff.y,proximity);vec3 Q=getViewPosition(coords,sampleDepth,viewZ);vec3 v=Q-p;float vv=dot(v,v);float vn=dot(v,n)-bias;float f=max(RADIUS_SQ-vv,0.0)/RADIUS_SQ;occlusion+=(f*f*f*max(vn/(fade+vv),0.0))*falloff;}++taps;}return occlusion/(4.0*max(float(taps),1.0));}void main(){
#ifdef NORMAL_DEPTH
vec4 normalDepth=texture2D(normalDepthBuffer,vUv);
#else
vec4 normalDepth=vec4(texture2D(normalBuffer,vUv).xyz,readDepth(vUv));
#endif
float ao=0.0;float depth=normalDepth.a;float viewZ=getViewZ(depth);
#ifdef PERSPECTIVE_CAMERA
float linearDepth=viewZToOrthographicDepth(viewZ,cameraNearFar.x,cameraNearFar.y);
#else
float linearDepth=depth;
#endif
if(linearDepth<distanceCutoff.y){vec3 viewPosition=getViewPosition(vUv,depth,viewZ);vec3 viewNormal=unpackRGBToNormal(normalDepth.rgb);ao+=getAmbientOcclusion(viewPosition,viewNormal,linearDepth,vUv);float d=smoothstep(distanceCutoff.x,distanceCutoff.y,linearDepth);ao=mix(ao,0.0,d);
#ifdef LEGACY_INTENSITY
ao=clamp(1.0-pow(1.0-ao,abs(intensity)),0.0,1.0);
#endif
}gl_FragColor.r=ao;}`,Hv="uniform vec2 noiseScale;varying vec2 vUv;varying vec2 vUv2;void main(){vUv=position.xy*0.5+0.5;vUv2=vUv*noiseScale;gl_Position=vec4(position.xy,1.0,1.0);}",Vv=class extends et{constructor(i){super({name:"SSAOMaterial",defines:{SAMPLES_INT:"0",INV_SAMPLES_FLOAT:"0.0",SPIRAL_TURNS:"0.0",RADIUS:"1.0",RADIUS_SQ:"1.0",DISTANCE_SCALING:"1",DEPTH_PACKING:"0"},uniforms:{depthBuffer:new Y(null),normalBuffer:new Y(null),normalDepthBuffer:new Y(null),noiseTexture:new Y(null),inverseProjectionMatrix:new Y(new be),projectionMatrix:new Y(new be),texelSize:new Y(new re),cameraNearFar:new Y(new re),distanceCutoff:new Y(new re),proximityCutoff:new Y(new re),noiseScale:new Y(new re),minRadiusScale:new Y(.33),intensity:new Y(1),fade:new Y(.01),bias:new Y(0)},blending:_t,depthWrite:!1,depthTest:!1,fragmentShader:kv,vertexShader:Hv}),this.toneMapped=!1,this.copyCameraSettings(i),this.resolution=new re,this.r=1}get near(){return this.uniforms.cameraNearFar.value.x}get far(){return this.uniforms.cameraNearFar.value.y}set normalDepthBuffer(i){this.uniforms.normalDepthBuffer.value=i,i!==null?this.defines.NORMAL_DEPTH="1":delete this.defines.NORMAL_DEPTH,this.needsUpdate=!0}setNormalDepthBuffer(i){this.normalDepthBuffer=i}set normalBuffer(i){this.uniforms.normalBuffer.value=i}setNormalBuffer(i){this.uniforms.normalBuffer.value=i}set depthBuffer(i){this.uniforms.depthBuffer.value=i}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=Xt){this.depthBuffer=i,this.depthPacking=e}set noiseTexture(i){this.uniforms.noiseTexture.value=i}setNoiseTexture(i){this.uniforms.noiseTexture.value=i}get samples(){return Number(this.defines.SAMPLES_INT)}set samples(i){this.defines.SAMPLES_INT=i.toFixed(0),this.defines.INV_SAMPLES_FLOAT=(1/i).toFixed(9),this.needsUpdate=!0}getSamples(){return this.samples}setSamples(i){this.samples=i}get rings(){return Number(this.defines.SPIRAL_TURNS)}set rings(i){this.defines.SPIRAL_TURNS=i.toFixed(1),this.needsUpdate=!0}getRings(){return this.rings}setRings(i){this.rings=i}get intensity(){return this.uniforms.intensity.value}set intensity(i){this.uniforms.intensity.value=i,this.defines.LEGACY_INTENSITY===void 0&&(this.defines.LEGACY_INTENSITY="1",this.needsUpdate=!0)}getIntensity(){return this.uniforms.intensity.value}setIntensity(i){this.uniforms.intensity.value=i}get fade(){return this.uniforms.fade.value}set fade(i){this.uniforms.fade.value=i}getFade(){return this.uniforms.fade.value}setFade(i){this.uniforms.fade.value=i}get bias(){return this.uniforms.bias.value}set bias(i){this.uniforms.bias.value=i}getBias(){return this.uniforms.bias.value}setBias(i){this.uniforms.bias.value=i}get minRadiusScale(){return this.uniforms.minRadiusScale.value}set minRadiusScale(i){this.uniforms.minRadiusScale.value=i}getMinRadiusScale(){return this.uniforms.minRadiusScale.value}setMinRadiusScale(i){this.uniforms.minRadiusScale.value=i}updateRadius(){const i=this.r*this.resolution.height;this.defines.RADIUS=i.toFixed(11),this.defines.RADIUS_SQ=(i*i).toFixed(11),this.needsUpdate=!0}get radius(){return this.r}set radius(i){this.r=Math.min(Math.max(i,1e-6),1),this.updateRadius()}getRadius(){return this.radius}setRadius(i){this.radius=i}get distanceScaling(){return!0}set distanceScaling(i){}isDistanceScalingEnabled(){return this.distanceScaling}setDistanceScalingEnabled(i){this.distanceScaling=i}get distanceThreshold(){return this.uniforms.distanceCutoff.value.x}set distanceThreshold(i){this.uniforms.distanceCutoff.value.set(Math.min(Math.max(i,0),1),Math.min(Math.max(i+this.distanceFalloff,0),1))}get worldDistanceThreshold(){return-Xs(this.distanceThreshold,this.near,this.far)}set worldDistanceThreshold(i){this.distanceThreshold=qs(-i,this.near,this.far)}get distanceFalloff(){return this.uniforms.distanceCutoff.value.y-this.distanceThreshold}set distanceFalloff(i){this.uniforms.distanceCutoff.value.y=Math.min(Math.max(this.distanceThreshold+i,0),1)}get worldDistanceFalloff(){return-Xs(this.distanceFalloff,this.near,this.far)}set worldDistanceFalloff(i){this.distanceFalloff=qs(-i,this.near,this.far)}setDistanceCutoff(i,e){this.uniforms.distanceCutoff.value.set(Math.min(Math.max(i,0),1),Math.min(Math.max(i+e,0),1))}get proximityThreshold(){return this.uniforms.proximityCutoff.value.x}set proximityThreshold(i){this.uniforms.proximityCutoff.value.set(Math.min(Math.max(i,0),1),Math.min(Math.max(i+this.proximityFalloff,0),1))}get worldProximityThreshold(){return-Xs(this.proximityThreshold,this.near,this.far)}set worldProximityThreshold(i){this.proximityThreshold=qs(-i,this.near,this.far)}get proximityFalloff(){return this.uniforms.proximityCutoff.value.y-this.proximityThreshold}set proximityFalloff(i){this.uniforms.proximityCutoff.value.y=Math.min(Math.max(this.proximityThreshold+i,0),1)}get worldProximityFalloff(){return-Xs(this.proximityFalloff,this.near,this.far)}set worldProximityFalloff(i){this.proximityFalloff=qs(-i,this.near,this.far)}setProximityCutoff(i,e){this.uniforms.proximityCutoff.value.set(Math.min(Math.max(i,0),1),Math.min(Math.max(i+e,0),1))}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e)}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNearFar.value.set(i.near,i.far),this.uniforms.projectionMatrix.value.copy(i.projectionMatrix),this.uniforms.inverseProjectionMatrix.value.copy(i.projectionMatrix).invert(),i instanceof ft?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(i,e){const t=this.uniforms,n=t.noiseTexture.value;n!==null&&t.noiseScale.value.set(i/n.image.width,e/n.image.height),t.texelSize.value.set(1/i,1/e),this.resolution.set(i,e),this.updateRadius()}},Gv=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <encodings_fragment>
}`,Wv="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",jv=class extends et{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new Y(null),supportBuffer:new Y(null),texelSize:new Y(new re),radius:new Y(.85)},blending:_t,depthWrite:!1,depthTest:!1,fragmentShader:Gv,vertexShader:Wv}),this.toneMapped=!1}set inputBuffer(i){this.uniforms.inputBuffer.value=i}set supportBuffer(i){this.uniforms.supportBuffer.value=i}get radius(){return this.uniforms.radius.value}set radius(i){this.uniforms.radius.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},Xv=new Sa,Nn=null;function qv(){if(Nn===null){const i=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]);Nn=new Yt,Nn.setAttribute!==void 0?(Nn.setAttribute("position",new pt(i,3)),Nn.setAttribute("uv",new pt(e,2))):(Nn.addAttribute("position",new pt(i,3)),Nn.addAttribute("uv",new pt(e,2)))}return Nn}var mt=class{constructor(i="Pass",e=new ca,t=Xv){this.name=i,this.renderer=null,this.scene=e,this.camera=t,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(i){if(this.rtt===i){const e=this.fullscreenMaterial;e!==null&&(e.needsUpdate=!0),this.rtt=!i}}set mainScene(i){}set mainCamera(i){}setRenderer(i){this.renderer=i}isEnabled(){return this.enabled}setEnabled(i){this.enabled=i}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(i){let e=this.screen;e!==null?e.material=i:(e=new Et(qv(),i),e.frustumCulled=!1,this.scene===null&&(this.scene=new ca),this.scene.add(e),this.screen=e)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(i){this.fullscreenMaterial=i}getDepthTexture(){return null}setDepthTexture(i,e=Xt){}render(i,e,t,n,s){throw new Error("Render method not implemented!")}setSize(i,e){}initialize(i,e,t){}dispose(){for(const i of Object.keys(this)){const e=this[i];(e instanceof $e||e instanceof Ot||e instanceof st||e instanceof mt)&&this[i].dispose()}}},Yv=class extends mt{constructor(i,e=!0){super("CopyPass"),this.fullscreenMaterial=new Lc,this.needsSwap=!1,this.renderTarget=i,i===void 0&&(this.renderTarget=new $e(1,1,{minFilter:Ee,magFilter:Ee,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(i){this.autoResize=i}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(i){this.autoResize=i}render(i,e,t,n,s){this.fullscreenMaterial.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){this.autoResize&&this.renderTarget.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTarget.texture.type=t,t!==xt?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":i.outputEncoding===ye&&(this.renderTarget.texture.encoding=ye))}},$v=class extends mt{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(i,e,t,n,s){const r=i.state.buffers.stencil;r.setLocked(!1),r.setTest(!1)}},Cl=new xe,za=class extends mt{constructor(i=!0,e=!0,t=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=i,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(i,e,t){this.color=i,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(i){this.overrideClearColor=i}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(i){this.overrideClearAlpha=i}render(i,e,t,n,s){const r=this.overrideClearColor,a=this.overrideClearAlpha,o=i.getClearAlpha(),l=r!==null,c=a>=0;l?(i.getClearColor(Cl),i.setClearColor(r,c?a:o)):c&&i.setClearAlpha(a),i.setRenderTarget(this.renderToScreen?null:e),i.clear(this.color,this.depth,this.stencil),l?i.setClearColor(Cl,o):c&&i.setClearAlpha(o)}},Fn=-1,Qe=class extends cn{constructor(i,e=Fn,t=Fn,n=1){super(),this.resizable=i,this.baseSize=new re(1,1),this.preferredSize=new re(e,t),this.target=this.preferredSize,this.s=n,this.effectiveSize=new re,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const i=this.baseSize,e=this.preferredSize,t=this.effectiveSize,n=this.scale;e.width!==Fn?t.width=e.width:e.height!==Fn?t.width=Math.round(e.height*(i.width/Math.max(i.height,1))):t.width=Math.round(i.width*n),e.height!==Fn?t.height=e.height:e.width!==Fn?t.height=Math.round(e.width/Math.max(i.width/Math.max(i.height,1),1)):t.height=Math.round(i.height*n)}get width(){return this.effectiveSize.width}set width(i){this.preferredWidth=i}get height(){return this.effectiveSize.height}set height(i){this.preferredHeight=i}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(i){this.s!==i&&(this.s=i,this.preferredSize.setScalar(Fn),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(i){this.scale=i}get baseWidth(){return this.baseSize.width}set baseWidth(i){this.baseSize.width!==i&&(this.baseSize.width=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(i){this.baseWidth=i}get baseHeight(){return this.baseSize.height}set baseHeight(i){this.baseSize.height!==i&&(this.baseSize.height=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(i){this.baseHeight=i}setBaseSize(i,e){(this.baseSize.width!==i||this.baseSize.height!==e)&&(this.baseSize.set(i,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(i){this.preferredSize.width!==i&&(this.preferredSize.width=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(i){this.preferredWidth=i}get preferredHeight(){return this.preferredSize.height}set preferredHeight(i){this.preferredSize.height!==i&&(this.preferredSize.height=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(i){this.preferredHeight=i}setPreferredSize(i,e){(this.preferredSize.width!==i||this.preferredSize.height!==e)&&(this.preferredSize.set(i,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(i){this.s=i.scale,this.baseSize.set(i.baseWidth,i.baseHeight),this.preferredSize.set(i.preferredWidth,i.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return Fn}},Kr=!1,Dl=class{constructor(i=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(i),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case Rt:t=this.materialsFlatShadedDoubleSide;break;case St:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case Rt:t=this.materialsDoubleSide;break;case St:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}setMaterial(i){if(this.disposeMaterials(),this.material=i,i!==null){const e=this.materials=[i.clone(),i.clone(),i.clone()];for(const t of e)t.uniforms=Object.assign({},i.uniforms),t.side=zn;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},i.uniforms),n.side=St,n}),this.materialsDoubleSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},i.uniforms),n.side=Rt,n}),this.materialsFlatShaded=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=St,n}),this.materialsFlatShadedDoubleSide=e.map(t=>{const n=t.clone();return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=Rt,n})}}render(i,e,t){const n=i.shadowMap.enabled;if(i.shadowMap.enabled=!1,Kr){const s=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),i.render(e,t);for(const r of s)r[0].material=r[1];this.meshCount!==s.size&&s.clear()}else{const s=e.overrideMaterial;e.overrideMaterial=this.material,i.render(e,t),e.overrideMaterial=s}i.shadowMap.enabled=n}disposeMaterials(){if(this.material!==null){const i=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const e of i)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return Kr}static set workaroundEnabled(i){Kr=i}},or=class extends mt{constructor(i,e,t=null){super("RenderPass",i,e),this.needsSwap=!1,this.clearPass=new za,this.overrideMaterialManager=t===null?null:new Dl(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get renderToScreen(){return super.renderToScreen}set renderToScreen(i){super.renderToScreen=i,this.clearPass.renderToScreen=i}get overrideMaterial(){const i=this.overrideMaterialManager;return i!==null?i.material:null}set overrideMaterial(i){const e=this.overrideMaterialManager;i!==null?e!==null?e.setMaterial(i):this.overrideMaterialManager=new Dl(i):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(i){this.overrideMaterial=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getSelection(){return this.selection}setSelection(i){this.selection=i}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(i){this.skipShadowMapUpdate=i}getClearPass(){return this.clearPass}render(i,e,t,n,s){const r=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=r.background,u=i.shadowMap.autoUpdate,h=this.renderToScreen?null:e;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(i.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(r.background=null),this.clearPass.enabled&&this.clearPass.render(i,e),i.setRenderTarget(h),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(i,r,a):i.render(r,a),a.layers.mask=l,r.background=c,i.shadowMap.autoUpdate=u}},Ic=class extends mt{constructor(i,e,{renderTarget:t,resolutionScale:n=1,width:s=Qe.AUTO_SIZE,height:r=Qe.AUTO_SIZE,resolutionX:a=s,resolutionY:o=r}={}){super("DepthPass"),this.needsSwap=!1,this.renderPass=new or(i,e,new _c({depthPacking:xa}));const l=this.renderPass;l.skipShadowMapUpdate=!0,l.ignoreBackground=!0;const c=l.getClearPass();c.overrideClearColor=new xe(16777215),c.overrideClearAlpha=1,this.renderTarget=t,this.renderTarget===void 0&&(this.renderTarget=new $e(1,1,{minFilter:je,magFilter:je}),this.renderTarget.texture.name="DepthPass.Target");const u=this.resolution=new Qe(this,a,o,n);u.addEventListener("change",h=>this.setSize(u.baseWidth,u.baseHeight))}set mainScene(i){this.renderPass.mainScene=i}set mainCamera(i){this.renderPass.mainCamera=i}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,s){const r=this.renderToScreen?null:this.renderTarget;this.renderPass.render(i,r)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}},Nc=class extends mt{constructor({normalBuffer:i=null,resolutionScale:e=.5,width:t=Qe.AUTO_SIZE,height:n=Qe.AUTO_SIZE,resolutionX:s=t,resolutionY:r=n}={}){super("DepthDownsamplingPass");const a=new Cv;a.normalBuffer=i,this.fullscreenMaterial=a,this.needsDepthTexture=!0,this.needsSwap=!1,this.renderTarget=new $e(1,1,{minFilter:je,magFilter:je,depthBuffer:!1,type:Ft}),this.renderTarget.texture.name="DepthDownsamplingPass.Target",this.renderTarget.texture.generateMipmaps=!1;const o=this.resolution=new Qe(this,s,r,e);o.addEventListener("change",l=>this.setSize(o.baseWidth,o.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}setDepthTexture(i,e=Xt){this.fullscreenMaterial.depthBuffer=i,this.fullscreenMaterial.depthPacking=e}render(i,e,t,n,s){i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height),this.fullscreenMaterial.setSize(i,e)}initialize(i,e,t){const n=i.getContext();if(!(n.getExtension("EXT_color_buffer_float")||n.getExtension("EXT_color_buffer_half_float")))throw new Error("Rendering to float texture is not supported.")}};function Pl(i,e,t){for(const n of e){const s="$1"+i+n.charAt(0).toUpperCase()+n.slice(1),r=new RegExp("([^\\.])(\\b"+n+"\\b)","g");for(const a of t.entries())a[1]!==null&&t.set(a[0],a[1].replace(r,s))}}function Kv(i,e,t){var n,s,r,a,o;let l=e.getFragmentShader(),c=e.getVertexShader();const u=l!==void 0&&/mainImage/.test(l),h=l!==void 0&&/mainUv/.test(l);if(t.attributes|=e.getAttributes(),l===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(h&&(t.attributes&bn.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!u&&!h)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{const d=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,p=t.shaderParts;let v=(n=p.get(Oe.FRAGMENT_HEAD))!=null?n:"",m=(s=p.get(Oe.FRAGMENT_MAIN_UV))!=null?s:"",f=(r=p.get(Oe.FRAGMENT_MAIN_IMAGE))!=null?r:"",g=(a=p.get(Oe.VERTEX_HEAD))!=null?a:"",M=(o=p.get(Oe.VERTEX_MAIN_SUPPORT))!=null?o:"";const y=new Set,_=new Set;if(h&&(m+=`	${i}MainUv(UV);
`,t.uvTransformation=!0),c!==null&&/mainSupport/.test(c)){const D=/mainSupport *\([\w\s]*?uv\s*?\)/.test(c);M+=`	${i}MainSupport(`,M+=D?`vUv);
`:`);
`;for(const x of c.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const w of x[1].split(/\s*,\s*/))t.varyings.add(w),y.add(w),_.add(w);for(const x of c.matchAll(d))_.add(x[1])}for(const D of l.matchAll(d))_.add(D[1]);for(const D of e.defines.keys())_.add(D.replace(/\([\w\s,]*\)/g,""));for(const D of e.uniforms.keys())_.add(D);_.delete("while"),_.delete("for"),_.delete("if"),e.uniforms.forEach((D,x)=>t.uniforms.set(i+x.charAt(0).toUpperCase()+x.slice(1),D)),e.defines.forEach((D,x)=>t.defines.set(i+x.charAt(0).toUpperCase()+x.slice(1),D));const S=new Map([["fragment",l],["vertex",c]]);Pl(i,_,t.defines),Pl(i,_,S),l=S.get("fragment"),c=S.get("vertex");const E=e.blendMode;if(t.blendModes.set(E.blendFunction,E),u){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(f+=e.inputColorSpace===ye?`color0 = LinearTosRGB(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==null?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);const D=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;f+=`${i}MainImage(color0, UV, `,(t.attributes&bn.DEPTH)!==0&&D.test(l)&&(f+="depth, ",t.readDepth=!0),f+=`color1);
	`;const x=i+"BlendOpacity";t.uniforms.set(x,E.opacity),f+=`color0 = blend${E.blendFunction}(color0, color1, ${x});

	`,v+=`uniform float ${x};

`}if(v+=l+`
`,c!==null&&(g+=c+`
`),p.set(Oe.FRAGMENT_HEAD,v),p.set(Oe.FRAGMENT_MAIN_UV,m),p.set(Oe.FRAGMENT_MAIN_IMAGE,f),p.set(Oe.VERTEX_HEAD,g),p.set(Oe.VERTEX_MAIN_SUPPORT,M),e.extensions!==null)for(const D of e.extensions)t.extensions.add(D)}}var Zv=class extends mt{constructor(i,...e){super("EffectPass"),this.fullscreenMaterial=new Ov(null,null,null,i),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(i){for(const e of this.effects)e.mainScene=i}set mainCamera(i){this.fullscreenMaterial.copyCameraSettings(i);for(const e of this.effects)e.mainCamera=i}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(i){this.fullscreenMaterial.encodeOutput=i}get dithering(){return this.fullscreenMaterial.dithering}set dithering(i){const e=this.fullscreenMaterial;e.dithering=i,e.needsUpdate=!0}setEffects(i){for(const e of this.effects)e.removeEventListener("change",this.listener);this.effects=i.sort((e,t)=>t.attributes-e.attributes);for(const e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){const i=new a_;let e=0;for(const a of this.effects)if(a.blendMode.blendFunction===Le.DST)i.attributes|=a.getAttributes()&bn.DEPTH;else{if((i.attributes&a.getAttributes()&bn.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${a.name})`);Kv("e"+e++,a,i)}let t=i.shaderParts.get(Oe.FRAGMENT_HEAD),n=i.shaderParts.get(Oe.FRAGMENT_MAIN_IMAGE),s=i.shaderParts.get(Oe.FRAGMENT_MAIN_UV);const r=/\bblend\b/g;for(const a of i.blendModes.values())t+=a.getShaderCode().replace(r,`blend${a.blendFunction}`)+`
`;(i.attributes&bn.DEPTH)!==0?(i.readDepth&&(n=`float depth = readDepth(UV);

	`+n),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,i.colorSpace===ye&&(n+=`color0 = sRGBToLinear(color0);
	`),i.uvTransformation?(s=`vec2 transformedUv = vUv;
`+s,i.defines.set("UV","transformedUv")):i.defines.set("UV","vUv"),i.shaderParts.set(Oe.FRAGMENT_HEAD,t),i.shaderParts.set(Oe.FRAGMENT_MAIN_IMAGE,n),i.shaderParts.set(Oe.FRAGMENT_MAIN_UV,s),i.shaderParts.forEach((a,o,l)=>l.set(o,a==null?void 0:a.trim().replace(/^#/,`
#`))),this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(i)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(i,e=Xt){this.fullscreenMaterial.depthBuffer=i,this.fullscreenMaterial.depthPacking=e;for(const t of this.effects)t.setDepthTexture(i,e)}render(i,e,t,n,s){for(const r of this.effects)r.update(i,e,n);if(!this.skipRendering||this.renderToScreen){const r=this.fullscreenMaterial;r.inputBuffer=e.texture,r.time+=n*this.timeScale,i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}}setSize(i,e){this.fullscreenMaterial.setSize(i,e);for(const t of this.effects)t.setSize(i,e)}initialize(i,e,t){this.renderer=i;for(const n of this.effects)n.initialize(i,e,t);this.updateMaterial(),t!==void 0&&t!==xt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const i of this.effects)i.removeEventListener("change",this.listener),i.dispose()}handleEvent(i){switch(i.type){case"change":this.recompile();break}}},Jv=class extends mt{constructor({kernelSize:i=Ba.MEDIUM,resolutionScale:e=.5,width:t=Qe.AUTO_SIZE,height:n=Qe.AUTO_SIZE,resolutionX:s=t,resolutionY:r=n}={}){super("KawaseBlurPass"),this.renderTargetA=new $e(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const a=this.resolution=new Qe(this,s,r,e);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new Tv,this._blurMaterial.kernelSize=i,this.copyMaterial=new Lc}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(i){this._blurMaterial=i}get dithering(){return this.copyMaterial.dithering}set dithering(i){this.copyMaterial.dithering=i}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(i){this.blurMaterial.kernelSize=i}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get scale(){return this.blurMaterial.scale}set scale(i){this.blurMaterial.scale=i}getScale(){return this.blurMaterial.scale}setScale(i){this.blurMaterial.scale=i}getKernelSize(){return this.kernelSize}setKernelSize(i){this.kernelSize=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,s){const r=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,u=c.kernelSequence;let h=e;this.fullscreenMaterial=c;for(let d=0,p=u.length;d<p;++d){const v=(d&1)===0?o:l;c.kernel=u[d],c.inputBuffer=h.texture,i.setRenderTarget(v),i.render(r,a),h=v}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=h.texture,i.setRenderTarget(this.renderToScreen?null:t),i.render(r,a)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e);const n=t.width,s=t.height;this.renderTargetA.setSize(n,s),this.renderTargetB.setSize(n,s),this.blurMaterial.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTargetA.texture.type=t,this.renderTargetB.texture.type=t,t!==xt?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):i.outputEncoding===ye&&(this.renderTargetA.texture.encoding=ye,this.renderTargetB.texture.encoding=ye))}static get AUTO_SIZE(){return Qe.AUTO_SIZE}},Qv=class extends mt{constructor({renderTarget:i,luminanceRange:e,colorOutput:t,resolutionScale:n=1,width:s=Qe.AUTO_SIZE,height:r=Qe.AUTO_SIZE,resolutionX:a=s,resolutionY:o=r}={}){super("LuminancePass"),this.fullscreenMaterial=new zv(t,e),this.needsSwap=!1,this.renderTarget=i,this.renderTarget===void 0&&(this.renderTarget=new $e(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const l=this.resolution=new Qe(this,a,o,n);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(i,e,t,n,s){const r=this.fullscreenMaterial;r.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}initialize(i,e,t){t!==void 0&&t!==xt&&(this.renderTarget.texture.type=t,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},e_=class extends mt{constructor(i,e){super("MaskPass",i,e),this.needsSwap=!1,this.clearPass=new za(!1,!1,!0),this.inverse=!1}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get inverted(){return this.inverse}set inverted(i){this.inverse=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(i){this.inverted=i}render(i,e,t,n,s){const r=i.getContext(),a=i.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,u=this.inverted?0:1,h=1-u;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),a.stencil.setFunc(r.ALWAYS,u,4294967295),a.stencil.setClear(h),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(i,null):(c.render(i,e),c.render(i,t))),this.renderToScreen?(i.setRenderTarget(null),i.render(o,l)):(i.setRenderTarget(e),i.render(o,l),i.setRenderTarget(t),i.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(r.EQUAL,1,4294967295),a.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),a.stencil.setLocked(!0)}},t_=class extends mt{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new $e(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new Nv,this.upsamplingMaterial=new jv,this.resolution=new re}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(i){if(this.levels!==i){const e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let t=0;t<i;++t){const n=e.clone();n.texture.name="Downsampling.Mipmap"+t,this.downsamplingMipmaps.push(n)}this.upsamplingMipmaps.push(e);for(let t=1,n=i-1;t<n;++t){const s=e.clone();s.texture.name="Upsampling.Mipmap"+t,this.upsamplingMipmaps.push(s)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(i){this.upsamplingMaterial.radius=i}render(i,e,t,n,s){const{scene:r,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:u}=this;let h=e;this.fullscreenMaterial=o;for(let d=0,p=c.length;d<p;++d){const v=c[d];o.setSize(h.width,h.height),o.inputBuffer=h.texture,i.setRenderTarget(v),i.render(r,a),h=v}this.fullscreenMaterial=l;for(let d=u.length-1;d>=0;--d){const p=u[d];l.setSize(h.width,h.height),l.inputBuffer=h.texture,l.supportBuffer=c[d].texture,i.setRenderTarget(p),i.render(r,a),h=p}}setSize(i,e){const t=this.resolution;t.set(i,e);let n=t.width,s=t.height;for(let r=0,a=this.downsamplingMipmaps.length;r<a;++r)n=Math.round(n*.5),s=Math.round(s*.5),this.downsamplingMipmaps[r].setSize(n,s),r<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[r].setSize(n,s)}initialize(i,e,t){if(t!==void 0){const n=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const s of n)s.texture.type=t;if(t!==xt)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(i.outputEncoding===ye)for(const s of n)s.texture.encoding=ye}}dispose(){super.dispose();for(const i of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))i.dispose()}},n_=class extends mt{constructor(i,e,{renderTarget:t,resolutionScale:n=1,width:s=Qe.AUTO_SIZE,height:r=Qe.AUTO_SIZE,resolutionX:a=s,resolutionY:o=r}={}){super("NormalPass"),this.needsSwap=!1,this.renderPass=new or(i,e,new ug);const l=this.renderPass;l.ignoreBackground=!0,l.skipShadowMapUpdate=!0;const c=l.getClearPass();c.overrideClearColor=new xe(7829503),c.overrideClearAlpha=1,this.renderTarget=t,this.renderTarget===void 0&&(this.renderTarget=new $e(1,1,{minFilter:je,magFilter:je}),this.renderTarget.texture.name="NormalPass.Target");const u=this.resolution=new Qe(this,a,o,n);u.addEventListener("change",h=>this.setSize(u.baseWidth,u.baseHeight))}set mainScene(i){this.renderPass.mainScene=i}set mainCamera(i){this.renderPass.mainCamera=i}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,s){const r=this.renderToScreen?null:this.renderTarget;this.renderPass.render(i,r,r)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}},Fc=class extends mt{constructor(i,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=i,this.input=e}setInput(i){this.input=i}render(i,e,t,n,s){const r=this.fullscreenMaterial.uniforms;e!==null&&r!==void 0&&r[this.input]!==void 0&&(r[this.input].value=e.texture),i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}initialize(i,e,t){t!==void 0&&t!==xt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},Zr=1/1e3,i_=1e3,s_=class{constructor(){this.previousTime=0,this.currentTime=0,this.delta=0,this.fixedDelta=1e3/60,this.elapsed=0,this.timescale=1,this.fixedDeltaEnabled=!1,this.autoReset=!1}setFixedDeltaEnabled(i){return this.fixedDeltaEnabled=i,this}isAutoResetEnabled(i){return this.autoReset}setAutoResetEnabled(i){return typeof document<"u"&&document.hidden!==void 0&&(i?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this.autoReset=i),this}getDelta(){return this.delta*Zr}getFixedDelta(){return this.fixedDelta*Zr}setFixedDelta(i){return this.fixedDelta=i*i_,this}getElapsed(){return this.elapsed*Zr}getTimescale(){return this.timescale}setTimescale(i){return this.timescale=i,this}update(i){return this.fixedDeltaEnabled?this.delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=i!==void 0?i:performance.now(),this.delta=this.currentTime-this.previousTime),this.delta*=this.timescale,this.elapsed+=this.delta,this}reset(){return this.delta=0,this.elapsed=0,this.currentTime=performance.now(),this}handleEvent(i){document.hidden||(this.currentTime=performance.now())}dispose(){this.setAutoResetEnabled(!1)}},r_=class{constructor(i=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:n=0,frameBufferType:s}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,s,n),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new Yv,this.depthTexture=null,this.passes=[],this.timer=new s_,this.autoRenderToScreen=!0,this.setRenderer(i)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(i){const e=this.inputBuffer,t=this.multisampling;t>0&&i>0?(this.inputBuffer.samples=i,this.outputBuffer.samples=i,this.inputBuffer.dispose(),this.outputBuffer.dispose()):t!==i&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,i),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(i){if(this.renderer=i,i!==null){const e=i.getSize(new re),t=i.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;n===xt&&i.outputEncoding===ye&&(this.inputBuffer.texture.encoding=ye,this.outputBuffer.texture.encoding=ye,this.inputBuffer.dispose(),this.outputBuffer.dispose()),i.autoClear=!1,this.setSize(e.width,e.height);for(const s of this.passes)s.initialize(i,t,n)}}replaceRenderer(i,e=!0){const t=this.renderer,n=t.domElement.parentNode;return this.setRenderer(i),e&&n!==null&&(n.removeChild(t.domElement),n.appendChild(i.domElement)),t}createDepthTexture(){const i=this.depthTexture=new xc;return this.inputBuffer.depthTexture=i,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(i.format=ri,i.type=ti):i.type=On,i}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(const i of this.passes)i.setDepthTexture(null)}}createBuffer(i,e,t,n){const s=this.renderer,r=s===null?new re:s.getDrawingBufferSize(new re),a={minFilter:Ee,magFilter:Ee,stencilBuffer:e,depthBuffer:i,type:t};let o;return n>0?(o=Number(ki.replace(/\D+/g,""))<138?new Vg(r.width,r.height,a):new $e(r.width,r.height,a),o.ignoreDepthForMultisampleCopy=!1,o.samples=n):o=new $e(r.width,r.height,a),t===xt&&s!==null&&s.outputEncoding===ye&&(o.texture.encoding=ye),o.texture.name="EffectComposer.Buffer",o.texture.generateMipmaps=!1,o}setMainScene(i){for(const e of this.passes)e.mainScene=i}setMainCamera(i){for(const e of this.passes)e.mainCamera=i}addPass(i,e){const t=this.passes,n=this.renderer,s=n.getDrawingBufferSize(new re),r=n.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(i.setRenderer(n),i.setSize(s.width,s.height),i.initialize(n,r,a),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),i.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,i):t.push(i),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),i.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const o=this.createDepthTexture();for(i of t)i.setDepthTexture(o)}else i.setDepthTexture(this.depthTexture)}removePass(i){const e=this.passes,t=e.indexOf(i);if(t!==-1&&e.splice(t,1).length>0){if(this.depthTexture!==null){const r=(o,l)=>o||l.needsDepthTexture;e.reduce(r,!1)||(i.getDepthTexture()===this.depthTexture&&i.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(i.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){const i=this.passes;this.deleteDepthTexture(),i.length>0&&(this.autoRenderToScreen&&(i[i.length-1].renderToScreen=!1),this.passes=[])}render(i){const e=this.renderer,t=this.copyPass;let n=this.inputBuffer,s=this.outputBuffer,r=!1,a,o,l;i===void 0&&(i=this.timer.update().getDelta());for(const c of this.passes)c.enabled&&(c.render(e,n,s,i,r),c.needsSwap&&(r&&(t.renderToScreen=c.renderToScreen,a=e.getContext(),o=e.state.buffers.stencil,o.setFunc(a.NOTEQUAL,1,4294967295),t.render(e,n,s,i,r),o.setFunc(a.EQUAL,1,4294967295)),l=n,n=s,s=l),c instanceof e_?r=!0:c instanceof $v&&(r=!1))}setSize(i,e,t){const n=this.renderer,s=n.getSize(new re);(i===void 0||e===void 0)&&(i=s.width,e=s.height),(s.width!==i||s.height!==e)&&n.setSize(i,e,t);const r=n.getDrawingBufferSize(new re);this.inputBuffer.setSize(r.width,r.height),this.outputBuffer.setSize(r.width,r.height);for(const a of this.passes)a.setSize(r.width,r.height)}reset(){const i=this.timer.isAutoResetEnabled();this.dispose(),this.autoRenderToScreen=!0,this.timer.setAutoResetEnabled(i)}dispose(){for(const i of this.passes)i.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose()}},a_=class{constructor(){this.shaderParts=new Map([[Oe.FRAGMENT_HEAD,null],[Oe.FRAGMENT_MAIN_UV,null],[Oe.FRAGMENT_MAIN_IMAGE,null],[Oe.VERTEX_HEAD,null],[Oe.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=bn.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=ln}},Uc=class extends Set{constructor(i,e=10){super(),this.l=e,this.exclusive=!1,i!==void 0&&this.set(i)}get layer(){return this.l}set layer(i){const e=this.l;for(const t of this)t.layers.disable(e),t.layers.enable(i);this.l=i}getLayer(){return this.layer}setLayer(i){this.layer=i}isExclusive(){return this.exclusive}setExclusive(i){this.exclusive=i}clear(){const i=this.layer;for(const e of this)e.layers.disable(i);return super.clear()}set(i){this.clear();for(const e of i)this.add(e);return this}indexOf(i){return this.has(i)?0:-1}add(i){return this.exclusive?i.layers.set(this.layer):i.layers.enable(this.layer),super.add(i)}delete(i){return this.has(i)&&i.layers.disable(this.layer),super.delete(i)}toggle(i){let e;return this.has(i)?(this.delete(i),e=!1):(this.add(i),e=!0),e}setVisible(i){for(const e of this)i?e.layers.enable(0):e.layers.disable(0);return this}},o_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y,opacity);}",l_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,min(y.a,opacity));}",c_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y)*0.5,opacity);}",u_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.rg,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",h_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(step(0.0,y)*(1.0-min(vec4(1.0),(1.0-x)/y)),vec4(1.0),step(1.0,x));return mix(x,z,opacity);}",d_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=step(0.0,x)*mix(min(vec4(1.0),x/max(1.0-y,1e-9)),vec4(1.0),step(1.0,y));return mix(x,z,opacity);}",f_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x,y),opacity);}",p_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,abs(x-y),opacity);}",m_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x/max(y,1e-12),opacity);}",g_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y-2.0*x*y),opacity);}",v_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 a=min(x,1.0),b=min(y,1.0);vec4 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,y));return mix(x,z,opacity);}",__="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,step(1.0,x+y),opacity);}",x_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.r,xHSL.gb));return vec4(mix(x.rgb,z,opacity),y.a);}",y_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-y,opacity);}",M_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y*(1.0-x),opacity);}",S_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x,y),opacity);}",b_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(y+x-1.0,0.0,1.0),opacity);}",w_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x+y,1.0),opacity);}",T_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(2.0*y+x-1.0,0.0,1.0),opacity);}",E_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.rg,yHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",A_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x*y,opacity);}",R_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-abs(1.0-x-y),opacity);}",C_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",D_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(2.0*y*x,1.0-2.0*(1.0-y)*(1.0-x),step(0.5,x));return mix(x,z,opacity);}",P_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 z=mix(mix(y2,x,step(0.5*x,y)),max(vec4(0.0),y2-1.0),step(x,(y2-1.0)));return mix(x,z,opacity);}",L_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(min(x*x/max(1.0-y,1e-12),1.0),y,step(1.0,y));return mix(x,z,opacity);}",I_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.r,yHSL.g,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",N_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y-min(x*y,1.0),opacity);}",F_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 w=step(0.5,y);vec4 z=mix(x-(1.0-y2)*x*(1.0-x),mix(x+(y2-1.0)*(sqrt(x)-x),x+(y2-1.0)*x*((16.0*x-12.0)*x+3.0),w*(1.0-step(0.25,x))),w);return mix(x,z,opacity);}",U_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",O_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x+y-1.0,0.0),opacity);}",B_="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(max(1.0-min((1.0-x)/(2.0*y),1.0),0.0),min(x/(2.0*(1.0-y)),1.0),step(0.5,y));return mix(x,z,opacity);}",z_=new Map([[Le.ADD,o_],[Le.ALPHA,l_],[Le.AVERAGE,c_],[Le.COLOR,u_],[Le.COLOR_BURN,h_],[Le.COLOR_DODGE,d_],[Le.DARKEN,f_],[Le.DIFFERENCE,p_],[Le.DIVIDE,m_],[Le.DST,null],[Le.EXCLUSION,g_],[Le.HARD_LIGHT,v_],[Le.HARD_MIX,__],[Le.HUE,x_],[Le.INVERT,y_],[Le.INVERT_RGB,M_],[Le.LIGHTEN,S_],[Le.LINEAR_BURN,b_],[Le.LINEAR_DODGE,w_],[Le.LINEAR_LIGHT,T_],[Le.LUMINOSITY,E_],[Le.MULTIPLY,A_],[Le.NEGATION,R_],[Le.NORMAL,C_],[Le.OVERLAY,D_],[Le.PIN_LIGHT,P_],[Le.REFLECT,L_],[Le.SATURATION,I_],[Le.SCREEN,N_],[Le.SOFT_LIGHT,F_],[Le.SRC,U_],[Le.SUBTRACT,O_],[Le.VIVID_LIGHT,B_]]),k_=class extends cn{constructor(i,e=1){super(),this._blendFunction=i,this.opacity=new Y(e)}getOpacity(){return this.opacity.value}setOpacity(i){this.opacity.value=i}get blendFunction(){return this._blendFunction}set blendFunction(i){this._blendFunction=i,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(i){this.blendFunction=i}getShaderCode(){return z_.get(this.blendFunction)}},lr=class extends cn{constructor(i,e,{attributes:t=bn.NONE,blendFunction:n=Le.NORMAL,defines:s=new Map,uniforms:r=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=i,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=o,this.defines=s,this.uniforms=r,this.extensions=a,this.blendMode=new k_(n),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=ln,this._outputColorSpace=null}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(i){this._inputColorSpace=i,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(i){this._outputColorSpace=i,this.setChanged()}set mainScene(i){}set mainCamera(i){}getName(){return this.name}setRenderer(i){this.renderer=i}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(i){this.attributes=i,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(i){this.fragmentShader=i,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(i){this.vertexShader=i,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(i,e=Xt){}update(i,e,t){}setSize(i,e){}initialize(i,e,t){}dispose(){for(const i of Object.keys(this)){const e=this[i];(e instanceof $e||e instanceof Ot||e instanceof st||e instanceof mt)&&this[i].dispose()}}},H_=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,V_=class extends lr{constructor({blendFunction:i=Le.SCREEN,luminanceThreshold:e=.9,luminanceSmoothing:t=.025,mipmapBlur:n=!1,intensity:s=1,radius:r=.85,levels:a=8,kernelSize:o=Ba.LARGE,resolutionScale:l=.5,width:c=Qe.AUTO_SIZE,height:u=Qe.AUTO_SIZE,resolutionX:h=c,resolutionY:d=u}={}){super("BloomEffect",H_,{blendFunction:i,uniforms:new Map([["map",new Y(null)],["intensity",new Y(s)]])}),this.renderTarget=new $e(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new Jv({kernelSize:o}),this.luminancePass=new Qv({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=t,this.mipmapBlurPass=new t_,this.mipmapBlurPass.enabled=n,this.mipmapBlurPass.radius=r,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=n?this.mipmapBlurPass.texture:this.renderTarget.texture;const p=this.resolution=new Qe(this,h,d,l);p.addEventListener("change",v=>this.setSize(p.baseWidth,p.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get dithering(){return this.blurPass.dithering}set dithering(i){this.blurPass.dithering=i}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(i){this.blurPass.kernelSize=i}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(i){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(i){this.uniforms.get("intensity").value=i}getIntensity(){return this.intensity}setIntensity(i){this.intensity=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}update(i,e,t){const n=this.renderTarget,s=this.luminancePass;s.enabled?(s.render(i,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,s.renderTarget):this.blurPass.render(i,s.renderTarget,n)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,e):this.blurPass.render(i,e,n)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height),this.blurPass.resolution.copy(t),this.luminancePass.setSize(i,e),this.mipmapBlurPass.setSize(i,e)}initialize(i,e,t){this.blurPass.initialize(i,e,t),this.luminancePass.initialize(i,e,t),this.mipmapBlurPass.initialize(i,e,t),t!==void 0&&(this.renderTarget.texture.type=t,i.outputEncoding===ye&&(this.renderTarget.texture.encoding=ye))}},G_="uniform vec2 angle;uniform float scale;float pattern(const in vec2 uv){vec2 point=scale*vec2(dot(angle.yx,vec2(uv.x,-uv.y)),dot(angle,uv));return(sin(point.x)*sin(point.y))*4.0;}void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec3 color=vec3(inputColor.rgb*10.0-5.0+pattern(uv*resolution));outputColor=vec4(color,inputColor.a);}",W_=class extends lr{constructor({blendFunction:i,angle:e=Math.PI*.5,scale:t=1}={}){super("DotScreenEffect",G_,{blendFunction:i,uniforms:new Map([["angle",new Y(new re)],["scale",new Y(t)]])}),this.angle=e}get angle(){return Math.acos(this.uniforms.get("angle").value.y)}set angle(i){this.uniforms.get("angle").value.set(Math.sin(i),Math.cos(i))}getAngle(){return this.angle}setAngle(i){this.angle=i}get scale(){return this.uniforms.get("scale").value}set scale(i){this.uniforms.get("scale").value=i}};function j_(i,e,t){const n=new Map([[_a,1],[Jl,1],[Ql,2],[vt,4]]);let s;if(n.has(e)||console.error("Invalid noise texture format"),t===xt){s=new Uint8Array(i*n.get(e));for(let r=0,a=s.length;r<a;++r)s[r]=Math.random()*255+.5}else{s=new Float32Array(i*n.get(e));for(let r=0,a=s.length;r<a;++r)s[r]=Math.random()}return s}var X_=class extends ar{constructor(i,e,t=_a,n=xt){super(j_(i*e,t,n),i,e,t,n),this.needsUpdate=!0}};new C;new be;new xe;new C;new C;var q_=class extends V_{constructor(i,e,t){super(t),this.setAttributes(this.getAttributes()|bn.DEPTH),this.camera=e,this.depthPass=new Ic(i,e),this.clearPass=new za(!0,!1,!1),this.clearPass.overrideClearColor=new xe(0),this.depthMaskPass=new Fc(new Pv);const n=this.depthMaskMaterial;n.copyCameraSettings(e),n.depthBuffer1=this.depthPass.texture,n.depthPacking1=xa,n.depthMode=Qs,this.renderTargetMasked=new $e(1,1,{depthBuffer:!1}),this.renderTargetMasked.texture.name="Bloom.Masked",this.selection=new Uc,this.selection.layer=11,this._inverted=!1,this._ignoreBackground=!1}set mainScene(i){this.depthPass.mainScene=i}set mainCamera(i){this.camera=i,this.depthPass.mainCamera=i,this.depthMaskMaterial.copyCameraSettings(i)}getSelection(){return this.selection}get depthMaskMaterial(){return this.depthMaskPass.fullscreenMaterial}get inverted(){return this._inverted}set inverted(i){this._inverted=i,this.depthMaskMaterial.depthMode=i?va:Qs}isInverted(){return this.inverted}setInverted(i){this.inverted=i}get ignoreBackground(){return this._ignoreBackground}set ignoreBackground(i){this._ignoreBackground=i,this.depthMaskMaterial.maxDepthStrategy=i?ls.DISCARD_MAX_DEPTH:ls.KEEP_MAX_DEPTH}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}setDepthTexture(i,e=Xt){this.depthMaskMaterial.depthBuffer0=i,this.depthMaskMaterial.depthPacking0=e}update(i,e,t){const n=this.camera,s=this.selection,r=this.inverted;let a=e;if(this.ignoreBackground||!r||s.size>0){const o=n.layers.mask;n.layers.set(s.layer),this.depthPass.render(i),n.layers.mask=o,a=this.renderTargetMasked,this.clearPass.render(i,a),this.depthMaskPass.render(i,e,a)}super.update(i,a,t)}setSize(i,e){super.setSize(i,e),this.renderTargetMasked.setSize(i,e),this.depthPass.setSize(i,e)}initialize(i,e,t){super.initialize(i,e,t),this.clearPass.initialize(i,e,t),this.depthPass.initialize(i,e,t),this.depthMaskPass.initialize(i,e,t),t!==void 0&&(this.renderTargetMasked.texture.type=t,i.outputEncoding===ye&&(this.renderTargetMasked.texture.encoding=ye))}},Y_=`uniform lowp sampler2D aoBuffer;uniform float luminanceInfluence;uniform float intensity;
#if THREE_REVISION < 143
#define luminance(v) linearToRelativeLuminance(v)
#endif
#if defined(DEPTH_AWARE_UPSAMPLING) && defined(NORMAL_DEPTH)
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D normalDepthBuffer;
#else
uniform mediump sampler2D normalDepthBuffer;
#endif
#endif
#ifdef COLORIZE
uniform vec3 color;
#endif
void mainImage(const in vec4 inputColor,const in vec2 uv,const in float depth,out vec4 outputColor){float aoLinear=texture2D(aoBuffer,uv).r;
#if defined(DEPTH_AWARE_UPSAMPLING) && defined(NORMAL_DEPTH) && __VERSION__ == 300
vec4 normalDepth[4];normalDepth[0]=textureOffset(normalDepthBuffer,uv,ivec2(0,0));normalDepth[1]=textureOffset(normalDepthBuffer,uv,ivec2(0,1));normalDepth[2]=textureOffset(normalDepthBuffer,uv,ivec2(1,0));normalDepth[3]=textureOffset(normalDepthBuffer,uv,ivec2(1,1));float dot01=dot(normalDepth[0].rgb,normalDepth[1].rgb);float dot02=dot(normalDepth[0].rgb,normalDepth[2].rgb);float dot03=dot(normalDepth[0].rgb,normalDepth[3].rgb);float minDot=min(dot01,min(dot02,dot03));float s=step(THRESHOLD,minDot);float smallestDistance=1.0;int index;for(int i=0;i<4;++i){float distance=abs(depth-normalDepth[i].a);if(distance<smallestDistance){smallestDistance=distance;index=i;}}ivec2 offsets[4];offsets[0]=ivec2(0,0);offsets[1]=ivec2(0,1);offsets[2]=ivec2(1,0);offsets[3]=ivec2(1,1);ivec2 coord=ivec2(uv*vec2(textureSize(aoBuffer,0)))+offsets[index];float aoNearest=texelFetch(aoBuffer,coord,0).r;float ao=mix(aoNearest,aoLinear,s);
#else
float ao=aoLinear;
#endif
float l=luminance(inputColor.rgb);ao=mix(ao,0.0,l*luminanceInfluence);ao=clamp(ao*intensity,0.0,1.0);
#ifdef COLORIZE
outputColor=vec4(1.0-ao*(1.0-color),inputColor.a);
#else
outputColor=vec4(vec3(1.0-ao),inputColor.a);
#endif
}`,Ll=64,$_=class extends lr{constructor(i,e,{blendFunction:t=Le.MULTIPLY,samples:n=9,rings:s=7,normalDepthBuffer:r=null,depthAwareUpsampling:a=!0,worldDistanceThreshold:o,worldDistanceFalloff:l,worldProximityThreshold:c,worldProximityFalloff:u,distanceThreshold:h=.97,distanceFalloff:d=.03,rangeThreshold:p=5e-4,rangeFalloff:v=.001,minRadiusScale:m=.1,luminanceInfluence:f=.7,radius:g=.1825,intensity:M=1,bias:y=.025,fade:_=.01,color:S=null,resolutionScale:E=1,width:D=Qe.AUTO_SIZE,height:x=Qe.AUTO_SIZE,resolutionX:w=D,resolutionY:P=x}={}){super("SSAOEffect",Y_,{blendFunction:t,attributes:bn.DEPTH,defines:new Map([["THRESHOLD","0.997"]]),uniforms:new Map([["aoBuffer",new Y(null)],["normalDepthBuffer",new Y(r)],["luminanceInfluence",new Y(f)],["color",new Y(null)],["intensity",new Y(M)],["scale",new Y(0)]])}),this.renderTarget=new $e(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="AO.Target",this.uniforms.get("aoBuffer").value=this.renderTarget.texture;const z=this.resolution=new Qe(this,w,P,E);z.addEventListener("change",N=>this.setSize(z.baseWidth,z.baseHeight)),this.camera=i,this.depthDownsamplingPass=new Nc({normalBuffer:e,resolutionScale:E}),this.depthDownsamplingPass.enabled=r===null,this.ssaoPass=new Fc(new Vv(i));const $=new X_(Ll,Ll,vt);$.wrapS=$.wrapT=Qt;const O=this.ssaoMaterial;O.normalBuffer=e,O.noiseTexture=$,O.minRadiusScale=m,O.samples=n,O.radius=g,O.rings=s,O.fade=_,O.bias=y,O.distanceThreshold=h,O.distanceFalloff=d,O.proximityThreshold=p,O.proximityFalloff=v,o!==void 0&&(O.worldDistanceThreshold=o),l!==void 0&&(O.worldDistanceFalloff=l),c!==void 0&&(O.worldProximityThreshold=c),u!==void 0&&(O.worldProximityFalloff=u),r!==null&&(this.ssaoMaterial.normalDepthBuffer=r,this.defines.set("NORMAL_DEPTH","1")),this.depthAwareUpsampling=a,this.color=S}set mainCamera(i){this.camera=i,this.ssaoMaterial.copyCameraSettings(i)}getResolution(){return this.resolution}get ssaoMaterial(){return this.ssaoPass.fullscreenMaterial}getSSAOMaterial(){return this.ssaoMaterial}get samples(){return this.ssaoMaterial.samples}set samples(i){this.ssaoMaterial.samples=i}get rings(){return this.ssaoMaterial.rings}set rings(i){this.ssaoMaterial.rings=i}get radius(){return this.ssaoMaterial.radius}set radius(i){this.ssaoMaterial.radius=i}get depthAwareUpsampling(){return this.defines.has("DEPTH_AWARE_UPSAMPLING")}set depthAwareUpsampling(i){this.depthAwareUpsampling!==i&&(i?this.defines.set("DEPTH_AWARE_UPSAMPLING","1"):this.defines.delete("DEPTH_AWARE_UPSAMPLING"),this.setChanged())}isDepthAwareUpsamplingEnabled(){return this.depthAwareUpsampling}setDepthAwareUpsamplingEnabled(i){this.depthAwareUpsampling=i}get distanceScaling(){return!0}set distanceScaling(i){}get color(){return this.uniforms.get("color").value}set color(i){const e=this.uniforms,t=this.defines;i!==null?t.has("COLORIZE")?e.get("color").value.set(i):(t.set("COLORIZE","1"),e.get("color").value=new xe(i),this.setChanged()):t.has("COLORIZE")&&(t.delete("COLORIZE"),e.get("color").value=null,this.setChanged())}get luminanceInfluence(){return this.uniforms.get("luminanceInfluence").value}set luminanceInfluence(i){this.uniforms.get("luminanceInfluence").value=i}get intensity(){return this.uniforms.get("intensity").value}set intensity(i){this.uniforms.get("intensity").value=i}getColor(){return this.color}setColor(i){this.color=i}setDistanceCutoff(i,e){this.ssaoMaterial.distanceThreshold=i,this.ssaoMaterial.distanceFalloff=e}setProximityCutoff(i,e){this.ssaoMaterial.proximityThreshold=i,this.ssaoMaterial.proximityFalloff=e}setDepthTexture(i,e=Xt){this.depthDownsamplingPass.setDepthTexture(i,e),this.ssaoMaterial.depthBuffer=i,this.ssaoMaterial.depthPacking=e}update(i,e,t){const n=this.renderTarget;this.depthDownsamplingPass.enabled&&this.depthDownsamplingPass.render(i),this.ssaoPass.render(i,null,n)}setSize(i,e){const t=this.resolution;t.setBaseSize(i,e);const n=t.width,s=t.height;this.ssaoMaterial.copyCameraSettings(this.camera),this.ssaoMaterial.setSize(n,s),this.renderTarget.setSize(n,s),this.depthDownsamplingPass.resolution.scale=t.scale,this.depthDownsamplingPass.setSize(i,e)}initialize(i,e,t){try{let n=this.uniforms.get("normalDepthBuffer").value;n===null&&(this.depthDownsamplingPass.initialize(i,e,t),n=this.depthDownsamplingPass.texture,this.uniforms.get("normalDepthBuffer").value=n,this.ssaoMaterial.normalDepthBuffer=n,this.defines.set("NORMAL_DEPTH","1"))}catch{this.depthDownsamplingPass.enabled=!1}}};function pa(){return pa=Object.assign?Object.assign.bind():function(i){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(i[n]=t[n])}return i},pa.apply(this,arguments)}var K_=`#define GLSLIFY 1
uniform float blur;uniform float blurSharpness;uniform int blurKernel;vec3 denoise(vec3 center,sampler2D tex,vec2 uv,vec2 invTexSize,float blur,float blurSharpness,int blurKernel){vec3 color;float total;vec3 col;float weight;for(int x=-blurKernel;x<=blurKernel;x++){for(int y=-blurKernel;y<=blurKernel;y++){col=textureLod(tex,uv+vec2(x,y)*invTexSize,0.).rgb;weight=1.0-abs(dot(col-center,vec3(0.25)));weight=pow(weight,blurSharpness);color+=col*weight;total+=weight;}}return color/total;}`,Z_=`#define GLSLIFY 1
#define MODE_DEFAULT 0
#define MODE_REFLECTIONS 1
#define MODE_RAW_REFLECTION 2
#define MODE_BLURRED_REFLECTIONS 3
#define MODE_INPUT 4
#define MODE_BLUR_MIX 5
#define FLOAT_EPSILON 0.00001
uniform sampler2D inputTexture;uniform sampler2D reflectionsTexture;uniform float samples;
#include <boxBlur>
void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 reflectionsTexel=texture2D(reflectionsTexture,vUv);ivec2 size=textureSize(reflectionsTexture,0);vec2 invTexSize=1./vec2(size.x,size.y);vec3 reflectionClr=reflectionsTexel.xyz;if(blur>FLOAT_EPSILON){vec3 blurredReflectionsColor=denoise(reflectionsTexel.rgb,reflectionsTexture,vUv,invTexSize,blur,blurSharpness,blurKernel);reflectionClr=mix(reflectionClr,blurredReflectionsColor.rgb,blur);}
#if RENDER_MODE == MODE_DEFAULT
outputColor=vec4(inputColor.rgb+reflectionClr,1.0);
#endif
#if RENDER_MODE == MODE_REFLECTIONS
outputColor=vec4(reflectionClr,1.0);
#endif
#if RENDER_MODE == MODE_RAW_REFLECTION
outputColor=vec4(reflectionsTexel.xyz,1.0);
#endif
#if RENDER_MODE == MODE_BLURRED_REFLECTIONS
outputColor=vec4(blurredReflectionsTexel.xyz,1.0);
#endif
#if RENDER_MODE == MODE_INPUT
outputColor=vec4(inputColor.xyz,1.0);
#endif
#if RENDER_MODE == MODE_BLUR_MIX
outputColor=vec4(vec3(blur),1.0);
#endif
}`,Oc=`#define GLSLIFY 1
vec3 getViewPosition(const float depth){float clipW=_projectionMatrix[2][3]*depth+_projectionMatrix[3][3];vec4 clipPosition=vec4((vec3(vUv,depth)-0.5)*2.0,1.0);clipPosition*=clipW;return(_inverseProjectionMatrix*clipPosition).xyz;}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 screenSpaceToWorldSpace(const vec2 uv,const float depth){vec4 ndc=vec4((uv.x-0.5)*2.0,(uv.y-0.5)*2.0,(depth-0.5)*2.0,1.0);vec4 clip=_inverseProjectionMatrix*ndc;vec4 view=cameraMatrixWorld*(clip/clip.w);return view.xyz;}
#define Scale (vec3(0.8, 0.8, 0.8))
#define K (19.19)
vec3 hash(vec3 a){a=fract(a*Scale);a+=dot(a,a.yxz+K);return fract((a.xxy+a.yxx)*a.zyx);}float fresnel_dielectric_cos(float cosi,float eta){float c=abs(cosi);float g=eta*eta-1.0+c*c;float result;if(g>0.0){g=sqrt(g);float A=(g-c)/(g+c);float B=(c*(g+c)-1.0)/(c*(g-c)+1.0);result=0.5*A*A*(1.0+B*B);}else{result=1.0;}return result;}float fresnel_dielectric(vec3 Incoming,vec3 Normal,float eta){float cosine=dot(Incoming,Normal);return min(1.0,5.0*fresnel_dielectric_cos(cosine,eta));}`,J_=`#define GLSLIFY 1
#define INV_EULER 0.36787944117144233
alpha=velocityDisocclusion<FLOAT_EPSILON ?(alpha+0.0075): 0.0;alpha=clamp(alpha,0.0,1.0);bool needsBlur=!didReproject||velocityDisocclusion>0.5;
#ifdef boxBlur
if(needsBlur)inputColor=boxBlurredColor;
#endif
if(alpha==1.0){outputColor=accumulatedColor;}else{float m=mix(alpha,1.0,blend);if(needsBlur)m=0.0;outputColor=accumulatedColor*m+inputColor*(1.0-m);}`;class Q_ extends et{constructor(){super({type:"MRTMaterial",defines:{USE_UV:"",TEMPORAL_RESOLVE:""},uniforms:{opacity:new Y(1),normalMap:new Y(null),normalScale:new Y(new re(1,1)),uvTransform:new Y(new Ut),roughness:new Y(1),roughnessMap:new Y(null)},vertexShader:`
                #ifdef USE_MRT
                 varying vec2 vHighPrecisionZW;
                #endif
                #define NORMAL
                #if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
                    varying vec3 vViewPosition;
                #endif
                #include <common>
                #include <uv_pars_vertex>
                #include <displacementmap_pars_vertex>
                #include <normal_pars_vertex>
                #include <morphtarget_pars_vertex>
                #include <skinning_pars_vertex>
                #include <logdepthbuf_pars_vertex>
                #include <clipping_planes_pars_vertex>
                void main() {
                    #include <uv_vertex>
                    #include <beginnormal_vertex>
                    #include <morphnormal_vertex>
                    #include <skinbase_vertex>
                    #include <skinnormal_vertex>
                    #include <defaultnormal_vertex>
                    #include <normal_vertex>
                    #include <begin_vertex>
                    #include <morphtarget_vertex>
                    #include <skinning_vertex>
                    #include <displacementmap_vertex>
                    #include <project_vertex>
                    #include <logdepthbuf_vertex>
                    #include <clipping_planes_vertex>
                    #if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
                        vViewPosition = - mvPosition.xyz;
                    #endif
                    #ifdef USE_MRT
                        vHighPrecisionZW = gl_Position.zw;
                    #endif 
                    #ifdef USE_UV
                        vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
                    #endif
                }
            `,fragmentShader:`
                 #define NORMAL
                #if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
                    varying vec3 vViewPosition;
                #endif
                #include <packing>
                #include <uv_pars_fragment>
                #include <normal_pars_fragment>
                #include <bumpmap_pars_fragment>
                #include <normalmap_pars_fragment>
                #include <logdepthbuf_pars_fragment>
                #include <clipping_planes_pars_fragment>
                #include <roughnessmap_pars_fragment>
                
                #ifdef USE_MRT
                layout(location = 0) out vec4 gNormal;
                layout(location = 1) out vec4 gDepth;
                
                varying vec2 vHighPrecisionZW;
                #endif
                uniform float roughness;
                void main() {
                    #include <clipping_planes_fragment>
                    #include <logdepthbuf_fragment>
                    #include <normal_fragment_begin>
                    #include <normal_fragment_maps>

                    float roughnessFactor = roughness;
                    
                    if(roughness > 10.0e9){
                        roughnessFactor = 1.;
                    }else{
                        #ifdef useRoughnessMap
                            vec4 texelRoughness = texture2D( roughnessMap, vUv );
                            // reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
                            roughnessFactor *= texelRoughness.g;
                        #endif
                    }

                    vec3 normalColor = packNormalToRGB( normal );
                    #ifdef USE_MRT
                        float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
                        vec4 depthColor = packDepthToRGBA( fragCoordZ );
                        gNormal = vec4( normalColor, roughnessFactor );
                        gDepth = depthColor;
                    #else
                        gl_FragColor = vec4(normalColor, roughnessFactor);
                    #endif
                }
            `,toneMapped:!1}),this.normalMapType=gs,this.normalScale=new re(1,1),Object.defineProperty(this,"glslVersion",{get(){return"USE_MRT"in this.defines?sa:null},set(e){}})}}var e0=`#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}`,t0=`#define GLSLIFY 1
varying vec2 vUv;uniform sampler2D inputTexture;uniform sampler2D accumulatedTexture;uniform sampler2D normalTexture;uniform sampler2D depthTexture;uniform sampler2D envMap;uniform mat4 _projectionMatrix;uniform mat4 _inverseProjectionMatrix;uniform mat4 cameraMatrixWorld;uniform float cameraNear;uniform float cameraFar;uniform float rayDistance;uniform float intensity;uniform float maxDepthDifference;uniform float roughnessFade;uniform float maxRoughness;uniform float fade;uniform float thickness;uniform float ior;uniform float samples;uniform float jitter;uniform float jitterRoughness;
#define INVALID_RAY_COORDS vec2(-1.0);
#define EARLY_OUT_COLOR vec4(0.0, 0.0, 0.0, 1.0)
#define FLOAT_EPSILON 0.00001
float nearMinusFar;float nearMulFar;float farMinusNear;
#include <packing>
#include <helperFunctions>
vec2 RayMarch(vec3 dir,inout vec3 hitPos,inout float rayHitDepthDifference);vec2 BinarySearch(in vec3 dir,inout vec3 hitPos,inout float rayHitDepthDifference);float fastGetViewZ(const in float depth);vec3 getIBLRadiance(const in vec3 viewDir,const in vec3 normal,const in float roughness);void main(){vec4 depthTexel=textureLod(depthTexture,vUv,0.0);if(dot(depthTexel.rgb,depthTexel.rgb)<FLOAT_EPSILON){gl_FragColor=EARLY_OUT_COLOR;return;}float unpackedDepth=unpackRGBAToDepth(depthTexel);vec4 normalTexel=textureLod(normalTexture,vUv,0.0);float roughness=normalTexel.a;float specular=1.0-roughness;nearMinusFar=cameraNear-cameraFar;nearMulFar=cameraNear*cameraFar;farMinusNear=cameraFar-cameraNear;normalTexel.rgb=unpackRGBToNormal(normalTexel.rgb);float depth=fastGetViewZ(unpackedDepth);vec3 viewPos=getViewPosition(depth);vec3 viewDir=normalize(viewPos);vec3 viewNormal=normalTexel.xyz;vec3 worldPos=screenSpaceToWorldSpace(vUv,unpackedDepth);vec3 jitt=vec3(0.0);if(jitterRoughness!=0.0||jitter!=0.0){vec3 randomJitter=hash(50.0*samples*worldPos)-0.5;float spread=((2.0-specular)+roughness*jitterRoughness);float jitterMix=jitter*0.25+jitterRoughness*roughness;if(jitterMix>1.0)jitterMix=1.0;jitt=mix(vec3(0.0),randomJitter*spread,jitterMix);}viewNormal+=jitt;float fresnelFactor=fresnel_dielectric(viewDir,viewNormal,ior);vec3 iblRadiance=getIBLRadiance(-viewDir,viewNormal,0.)*fresnelFactor;float lastFrameAlpha=textureLod(accumulatedTexture,vUv,0.0).a;if(roughness>maxRoughness||(roughness>1.0-FLOAT_EPSILON&&roughnessFade>1.0-FLOAT_EPSILON)){gl_FragColor=vec4(iblRadiance,lastFrameAlpha);return;}vec3 reflected=reflect(viewDir,viewNormal);vec3 rayDir=reflected*-viewPos.z;vec3 hitPos=viewPos;float rayHitDepthDifference;vec2 coords=RayMarch(rayDir,hitPos,rayHitDepthDifference);if(coords.x==-1.0){gl_FragColor=vec4(iblRadiance,lastFrameAlpha);return;}vec4 SSRTexel=textureLod(inputTexture,coords.xy,0.0);vec4 SSRTexelReflected=textureLod(accumulatedTexture,coords.xy,0.0);vec3 SSR=SSRTexel.rgb+SSRTexelReflected.rgb;float roughnessFactor=mix(specular,1.0,max(0.0,1.0-roughnessFade));vec2 coordsNDC=(coords.xy*2.0-1.0);float screenFade=0.1;float maxDimension=min(1.0,max(abs(coordsNDC.x),abs(coordsNDC.y)));float reflectionIntensity=1.0-(max(0.0,maxDimension-screenFade)/(1.0-screenFade));reflectionIntensity=max(0.,reflectionIntensity);vec3 finalSSR=mix(iblRadiance,SSR,reflectionIntensity)*roughnessFactor;if(fade!=0.0){vec3 hitWorldPos=screenSpaceToWorldSpace(coords,rayHitDepthDifference);float reflectionDistance=distance(hitWorldPos,worldPos)+1.0;float opacity=1.0/(reflectionDistance*fade*0.1);if(opacity>1.0)opacity=1.0;finalSSR*=opacity;}finalSSR*=fresnelFactor*intensity;finalSSR=min(vec3(1.0),finalSSR);float alpha=hitPos.z==1.0 ? 1.0 : SSRTexelReflected.a;alpha=min(lastFrameAlpha,alpha);gl_FragColor=vec4(finalSSR,alpha);}vec2 RayMarch(vec3 dir,inout vec3 hitPos,inout float rayHitDepthDifference){dir=normalize(dir);dir*=rayDistance/float(steps);float depth;vec4 projectedCoord;vec4 lastProjectedCoord;float unpackedDepth;vec4 depthTexel;for(int i=0;i<steps;i++){hitPos+=dir;projectedCoord=_projectionMatrix*vec4(hitPos,1.0);projectedCoord.xy/=projectedCoord.w;projectedCoord.xy=projectedCoord.xy*0.5+0.5;
#ifndef missedRays
if(projectedCoord.x<0.0||projectedCoord.x>1.0||projectedCoord.y<0.0||projectedCoord.y>1.0){return INVALID_RAY_COORDS;}
#endif
depthTexel=textureLod(depthTexture,projectedCoord.xy,0.0);unpackedDepth=unpackRGBAToDepth(depthTexel);depth=fastGetViewZ(unpackedDepth);rayHitDepthDifference=depth-hitPos.z;if(rayHitDepthDifference>=0.0&&rayHitDepthDifference<thickness){
#if refineSteps == 0
if(dot(depthTexel.rgb,depthTexel.rgb)<FLOAT_EPSILON)return INVALID_RAY_COORDS;
#else
return BinarySearch(dir,hitPos,rayHitDepthDifference);
#endif
}
#ifndef missedRays
if(hitPos.z>0.0){return INVALID_RAY_COORDS;}
#endif
lastProjectedCoord=projectedCoord;}hitPos.z=1.0;
#ifndef missedRays
return INVALID_RAY_COORDS;
#endif
rayHitDepthDifference=unpackedDepth;return projectedCoord.xy;}vec2 BinarySearch(in vec3 dir,inout vec3 hitPos,inout float rayHitDepthDifference){float depth;vec4 projectedCoord;vec2 lastMinProjectedCoordXY;float unpackedDepth;vec4 depthTexel;for(int i=0;i<refineSteps;i++){projectedCoord=_projectionMatrix*vec4(hitPos,1.0);projectedCoord.xy/=projectedCoord.w;projectedCoord.xy=projectedCoord.xy*0.5+0.5;depthTexel=textureLod(depthTexture,projectedCoord.xy,0.0);unpackedDepth=unpackRGBAToDepth(depthTexel);depth=fastGetViewZ(unpackedDepth);rayHitDepthDifference=depth-hitPos.z;dir*=0.5;if(rayHitDepthDifference>0.0){hitPos-=dir;}else{hitPos+=dir;}}if(dot(depthTexel.rgb,depthTexel.rgb)<FLOAT_EPSILON)return INVALID_RAY_COORDS;if(abs(rayHitDepthDifference)>maxDepthDifference)return INVALID_RAY_COORDS;projectedCoord=_projectionMatrix*vec4(hitPos,1.0);projectedCoord.xy/=projectedCoord.w;projectedCoord.xy=projectedCoord.xy*0.5+0.5;rayHitDepthDifference=unpackedDepth;return projectedCoord.xy;}float fastGetViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return nearMulFar/(farMinusNear*depth-cameraFar);
#else
return depth*nearMinusFar-cameraNear;
#endif
}
#include <common>
#include <cube_uv_reflection_fragment>
vec3 getIBLRadiance(const in vec3 viewDir,const in vec3 normal,const in float roughness){
#if defined(ENVMAP_TYPE_CUBE_UV)
vec3 reflectVec=reflect(-viewDir,normal);reflectVec=normalize(mix(reflectVec,normal,roughness*roughness));reflectVec=inverseTransformDirection(reflectVec,viewMatrix);vec4 envMapColor=textureCubeUV(envMap,reflectVec,roughness);return envMapColor.rgb*intensity;
#else
return vec3(0.0);
#endif
}`;class n0 extends et{constructor(){super({type:"ReflectionsMaterial",uniforms:{inputTexture:new Y(null),accumulatedTexture:new Y(null),normalTexture:new Y(null),depthTexture:new Y(null),_projectionMatrix:new Y(new be),_inverseProjectionMatrix:new Y(new be),cameraMatrixWorld:new Y(new be),cameraNear:new Y(0),cameraFar:new Y(0),rayDistance:new Y(0),intensity:new Y(0),roughnessFade:new Y(0),fade:new Y(0),thickness:new Y(0),ior:new Y(0),maxDepthDifference:new Y(0),jitter:new Y(0),jitterRoughness:new Y(0),maxRoughness:new Y(0),samples:new Y(0),envMap:new Y(null),envMapPosition:new Y(new C),envMapSize:new Y(new C),viewMatrix:new Y(new be)},defines:{steps:20,refineSteps:5,CUBEUV_TEXEL_WIDTH:0,CUBEUV_TEXEL_HEIGHT:0,CUBEUV_MAX_MIP:0,vWorldPosition:"worldPos"},fragmentShader:t0.replace("#include <helperFunctions>",Oc),vertexShader:e0,toneMapped:!1,depthWrite:!1,depthTest:!1})}}const Bc=i=>{const e=[i],t=[];for(;e.length!==0;){const n=e.shift();n.material&&t.push(n);for(const s of n.children)s.visible&&e.push(s)}return t},i0=i=>{const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}},Il=(i,e,t)=>{i.uniforms.envMap.value=e;const n=i0({envMapCubeUVHeight:t});i.defines.ENVMAP_TYPE_CUBE_UV="",i.defines.CUBEUV_TEXEL_WIDTH=n.texelWidth,i.defines.CUBEUV_TEXEL_HEIGHT=n.texelHeight,i.defines.CUBEUV_MAX_MIP=n.maxMip+".0",i.needsUpdate=!0},s0=()=>{try{const i=document.createElement("canvas");return!!(window.WebGL2RenderingContext&&i.getContext("webgl2"))}catch{return!1}};class r0 extends mt{constructor(e,t={}){super("ReflectionsPass"),this.ssrEffect=void 0,this.cachedMaterials=new WeakMap,this.USE_MRT=!1,this.webgl1DepthPass=null,this.visibleMeshes=[],this.ssrEffect=e,this._scene=e._scene,this._camera=e._camera,this.fullscreenMaterial=new n0,e._camera.isPerspectiveCamera&&(this.fullscreenMaterial.defines.PERSPECTIVE_CAMERA="");const n=t.width||typeof window<"u"?window.innerWidth:2e3,s=t.height||typeof window<"u"?window.innerHeight:1e3;this.renderTarget=new $e(n,s,{minFilter:Ee,magFilter:Ee,type:Ct,depthBuffer:!1}),this.renderPass=new or(this._scene,this._camera),this.USE_MRT=s0(),this.USE_MRT?(this.gBuffersRenderTarget=new rh(n,s,2,{minFilter:Ee,magFilter:Ee}),this.normalTexture=this.gBuffersRenderTarget.texture[0],this.depthTexture=this.gBuffersRenderTarget.texture[1]):(this.webgl1DepthPass=new Ic(this._scene,this._camera),this.webgl1DepthPass.renderTarget.minFilter=Ee,this.webgl1DepthPass.renderTarget.magFilter=Ee,this.webgl1DepthPass.renderTarget.texture.minFilter=Ee,this.webgl1DepthPass.renderTarget.texture.magFilter=Ee,this.webgl1DepthPass.setSize(typeof window<"u"?window.innerWidth:2e3,typeof window<"u"?window.innerHeight:1e3),this.gBuffersRenderTarget=new $e(n,s,{minFilter:Ee,magFilter:Ee}),this.normalTexture=this.gBuffersRenderTarget.texture,this.depthTexture=this.webgl1DepthPass.texture),this.fullscreenMaterial.uniforms.normalTexture.value=this.normalTexture,this.fullscreenMaterial.uniforms.depthTexture.value=this.depthTexture,this.fullscreenMaterial.uniforms.accumulatedTexture.value=this.ssrEffect.temporalResolvePass.accumulatedTexture,this.fullscreenMaterial.uniforms.cameraMatrixWorld.value=this._camera.matrixWorld,this.fullscreenMaterial.uniforms._projectionMatrix.value=this._camera.projectionMatrix,this.fullscreenMaterial.uniforms._inverseProjectionMatrix.value=this._camera.projectionMatrixInverse}setSize(e,t){this.renderTarget.setSize(e*this.ssrEffect.resolutionScale,t*this.ssrEffect.resolutionScale),this.gBuffersRenderTarget.setSize(e*this.ssrEffect.resolutionScale,t*this.ssrEffect.resolutionScale),this.fullscreenMaterial.uniforms.accumulatedTexture.value=this.ssrEffect.temporalResolvePass.accumulatedTexture,this.fullscreenMaterial.needsUpdate=!0}dispose(){this.renderTarget.dispose(),this.gBuffersRenderTarget.dispose(),this.renderPass.dispose(),this.USE_MRT||this.webgl1DepthPass.dispose(),this.fullscreenMaterial.dispose(),this.normalTexture=null,this.depthTexture=null,this.velocityTexture=null}keepMaterialMapUpdated(e,t,n,s){this.ssrEffect[s]?t[n]!==e[n]&&(e[n]=t[n],e.uniforms[n].value=t[n],t[n]?e.defines[s]="":delete e.defines[s],e.needsUpdate=!0):e[n]!==void 0&&(e[n]=void 0,e.uniforms[n].value=void 0,delete e.defines[s],e.needsUpdate=!0)}setMRTMaterialInScene(){this.visibleMeshes=Bc(this._scene);for(const e of this.visibleMeshes)if(e.material){const t=e.material;let[n,s]=this.cachedMaterials.get(e)||[];if(t!==n){s&&s.dispose(),s=new Q_,this.USE_MRT&&(s.defines.USE_MRT=""),s.normalScale=t.normalScale,s.uniforms.normalScale.value=t.normalScale;const r=t.map||t.normalMap||t.roughnessMap||t.metalnessMap;r&&(s.uniforms.uvTransform.value=r.matrix),this.cachedMaterials.set(e,[t,s])}this.keepMaterialMapUpdated(s,t,"normalMap","useNormalMap"),this.keepMaterialMapUpdated(s,t,"roughnessMap","useRoughnessMap"),s.uniforms.roughness.value=this.ssrEffect.selection.size===0||this.ssrEffect.selection.has(e)?t.roughness||0:1e11,e.material=s}}unsetMRTMaterialInScene(){for(const t of this.visibleMeshes){var e;if(((e=t.material)==null?void 0:e.type)==="MRTMaterial"){t.visible=!0;const[n]=this.cachedMaterials.get(t);t.material=n}}}render(e,t){this.setMRTMaterialInScene(),e.setRenderTarget(this.gBuffersRenderTarget),this.renderPass.render(e,this.gBuffersRenderTarget),this.unsetMRTMaterialInScene(),this.USE_MRT||this.webgl1DepthPass.renderPass.render(e,this.webgl1DepthPass.renderTarget),this.fullscreenMaterial.uniforms.inputTexture.value=t.texture,this.fullscreenMaterial.uniforms.samples.value=this.ssrEffect.temporalResolvePass.samples,this.fullscreenMaterial.uniforms.cameraNear.value=this._camera.near,this.fullscreenMaterial.uniforms.cameraFar.value=this._camera.far,this.fullscreenMaterial.uniforms.viewMatrix.value.copy(this._camera.matrixWorldInverse),e.setRenderTarget(this.renderTarget),e.render(this.scene,this.camera)}}const ma={intensity:1,exponent:1,distance:10,fade:0,roughnessFade:1,thickness:10,ior:1.45,maxRoughness:1,maxDepthDifference:10,blend:.9,correction:1,correctionRadius:1,blur:.5,blurKernel:1,blurSharpness:10,jitter:0,jitterRoughness:0,steps:20,refineSteps:5,missedRays:!0,useNormalMap:!0,useRoughnessMap:!0,resolutionScale:1,velocityResolutionScale:1};var a0=`#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}`,o0=`#define GLSLIFY 1
uniform sampler2D inputTexture;uniform sampler2D accumulatedTexture;uniform sampler2D velocityTexture;uniform sampler2D lastVelocityTexture;uniform float blend;uniform float correction;uniform float exponent;uniform float samples;uniform vec2 invTexSize;uniform mat4 curInverseProjectionMatrix;uniform mat4 curCameraMatrixWorld;uniform mat4 prevInverseProjectionMatrix;uniform mat4 prevCameraMatrixWorld;varying vec2 vUv;
#define MAX_NEIGHBOR_DEPTH_DIFFERENCE 0.001
#define FLOAT_EPSILON 0.00001
#define FLOAT_ONE_MINUS_EPSILON 0.99999
vec3 transformexponent;vec3 undoColorTransformExponent;vec3 transformColor(vec3 color){if(exponent==1.0)return color;return pow(abs(color),transformexponent);}vec3 undoColorTransform(vec3 color){if(exponent==1.0)return color;return max(pow(abs(color),undoColorTransformExponent),vec3(0.0));}void main(){if(exponent!=1.0){transformexponent=vec3(1.0/exponent);undoColorTransformExponent=vec3(exponent);}vec4 inputTexel=textureLod(inputTexture,vUv,0.0);vec4 accumulatedTexel;vec3 inputColor=transformColor(inputTexel.rgb);vec3 accumulatedColor;float alpha=inputTexel.a;float velocityDisocclusion;bool didReproject=false;
#ifdef boxBlur
vec3 boxBlurredColor=inputTexel.rgb;
#endif
vec4 velocity=textureLod(velocityTexture,vUv,0.0);bool isMoving=alpha<1.0||dot(velocity.xy,velocity.xy)>0.0;if(isMoving){vec3 minNeighborColor=inputColor;vec3 maxNeighborColor=inputColor;vec3 col;vec2 neighborUv;vec2 reprojectedUv=vUv-velocity.xy;vec4 lastVelocity=textureLod(lastVelocityTexture,reprojectedUv,0.0);float depth=velocity.b;float closestDepth=depth;float lastClosestDepth=lastVelocity.b;float neighborDepth;float lastNeighborDepth;for(int x=-correctionRadius;x<=correctionRadius;x++){for(int y=-correctionRadius;y<=correctionRadius;y++){if(x!=0||y!=0){neighborUv=vUv+vec2(x,y)*invTexSize;vec4 neigborVelocity=textureLod(velocityTexture,neighborUv,0.0);neighborDepth=neigborVelocity.b;col=textureLod(inputTexture,neighborUv,0.0).xyz;int absX=abs(x);int absY=abs(y);
#ifdef dilation
if(absX==1&&absY==1){if(neighborDepth>closestDepth){velocity=neigborVelocity;closestDepth=neighborDepth;}vec4 lastNeighborVelocity=textureLod(velocityTexture,vUv+vec2(x,y)*invTexSize,0.0);lastNeighborDepth=lastNeighborVelocity.b;if(neighborDepth>closestDepth){lastVelocity=lastNeighborVelocity;lastClosestDepth=lastNeighborDepth;}}
#endif
if(abs(depth-neighborDepth)<MAX_NEIGHBOR_DEPTH_DIFFERENCE){
#ifdef boxBlur
if(absX<=2&&absY<=2)boxBlurredColor+=col;
#endif
col=transformColor(col);minNeighborColor=min(col,minNeighborColor);maxNeighborColor=max(col,maxNeighborColor);}}}}float velocityLength=length(lastVelocity.xy-velocity.xy);velocityDisocclusion=(velocityLength-0.000005)*10.0;velocityDisocclusion*=velocityDisocclusion;reprojectedUv=vUv-velocity.xy;
#ifdef boxBlur
float pxRadius=correctionRadius>5 ? 121.0 : pow(float(correctionRadius*2+1),2.0);boxBlurredColor/=pxRadius;boxBlurredColor=transformColor(boxBlurredColor);
#endif
if(reprojectedUv.x>=0.0&&reprojectedUv.x<=1.0&&reprojectedUv.y>=0.0&&reprojectedUv.y<=1.0){accumulatedTexel=textureLod(accumulatedTexture,reprojectedUv,0.0);accumulatedColor=transformColor(accumulatedTexel.rgb);vec3 clampedColor=clamp(accumulatedColor,minNeighborColor,maxNeighborColor);accumulatedColor=mix(accumulatedColor,clampedColor,correction);didReproject=true;}else{
#ifdef boxBlur
accumulatedColor=boxBlurredColor;
#else
accumulatedColor=inputColor;
#endif
}if(velocity.r>FLOAT_ONE_MINUS_EPSILON&&velocity.g>FLOAT_ONE_MINUS_EPSILON){alpha=0.0;velocityDisocclusion=1.0;}}else{accumulatedColor=transformColor(textureLod(accumulatedTexture,vUv,0.0).rgb);}vec3 outputColor=inputColor;
#include <custom_compose_shader>
gl_FragColor=vec4(undoColorTransform(outputColor),alpha);}`;class l0 extends et{constructor(e){const t=o0.replace("#include <custom_compose_shader>",e);super({type:"TemporalResolveMaterial",uniforms:{inputTexture:new Y(null),accumulatedTexture:new Y(null),velocityTexture:new Y(null),lastVelocityTexture:new Y(null),samples:new Y(1),blend:new Y(.5),correction:new Y(1),exponent:new Y(1),invTexSize:new Y(new re)},defines:{correctionRadius:1},vertexShader:a0,fragmentShader:t})}}const c0=`
		#ifdef USE_SKINNING
		#ifdef BONE_TEXTURE
			uniform sampler2D prevBoneTexture;
			mat4 getPrevBoneMatrix( const in float i ) {
				float j = i * 4.0;
				float x = mod( j, float( boneTextureSize ) );
				float y = floor( j / float( boneTextureSize ) );
				float dx = 1.0 / float( boneTextureSize );
				float dy = 1.0 / float( boneTextureSize );
				y = dy * ( y + 0.5 );
				vec4 v1 = texture2D( prevBoneTexture, vec2( dx * ( x + 0.5 ), y ) );
				vec4 v2 = texture2D( prevBoneTexture, vec2( dx * ( x + 1.5 ), y ) );
				vec4 v3 = texture2D( prevBoneTexture, vec2( dx * ( x + 2.5 ), y ) );
				vec4 v4 = texture2D( prevBoneTexture, vec2( dx * ( x + 3.5 ), y ) );
				mat4 bone = mat4( v1, v2, v3, v4 );
				return bone;
			}
		#else
			uniform mat4 prevBoneMatrices[ MAX_BONES ];
			mat4 getPrevBoneMatrix( const in float i ) {
				mat4 bone = prevBoneMatrices[ int(i) ];
				return bone;
			}
		#endif
		#endif
`,u0=`
		vec3 transformed;

		// Get the normal
		${ge.skinbase_vertex}
		${ge.beginnormal_vertex}
		${ge.skinnormal_vertex}
		${ge.defaultnormal_vertex}

		// Get the current vertex position
		transformed = vec3( position );
		${ge.skinning_vertex}
		newPosition = velocityMatrix * vec4( transformed, 1.0 );

		// Get the previous vertex position
		transformed = vec3( position );
		${ge.skinbase_vertex.replace(/mat4 /g,"").replace(/getBoneMatrix/g,"getPrevBoneMatrix")}
		${ge.skinning_vertex.replace(/vec4 /g,"")}
		prevPosition = prevVelocityMatrix * vec4( transformed, 1.0 );

		gl_Position = newPosition;
`;class h0 extends et{constructor(){super({uniforms:{prevVelocityMatrix:{value:new be},velocityMatrix:{value:new be},prevBoneTexture:{value:null},interpolateGeometry:{value:0},intensity:{value:1},boneTexture:{value:null},alphaTest:{value:0},map:{value:null},alphaMap:{value:null},opacity:{value:1}},vertexShader:`
                    #define MAX_BONES 1024
                    
                    ${ge.skinning_pars_vertex}
                    ${c0}
        
                    uniform mat4 velocityMatrix;
                    uniform mat4 prevVelocityMatrix;
                    uniform float interpolateGeometry;
                    varying vec4 prevPosition;
                    varying vec4 newPosition;
					varying vec2 vHighPrecisionZW;
        
                    void main() {
        
                        ${u0}

						vHighPrecisionZW = gl_Position.zw;
        
                    }`,fragmentShader:`
                    uniform float intensity;
                    varying vec4 prevPosition;
                    varying vec4 newPosition;
					varying vec2 vHighPrecisionZW;
        
                    void main() {
						#ifdef FULL_MOVEMENT
						gl_FragColor = vec4( 1., 1., 1. - gl_FragCoord.z, 0. );
						return;
						#endif

                        vec2 pos0 = (prevPosition.xy / prevPosition.w) * 0.5 + 0.5;
                        vec2 pos1 = (newPosition.xy / newPosition.w) * 0.5 + 0.5;
        
                        vec2 vel = pos1 - pos0;

						float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
                        
                        gl_FragColor = vec4( vel, 1. - fragCoordZ, 0. );
        
                    }`}),this.isVelocityMaterial=!0}}const d0=new xe(0),f0=["visible","wireframe","side"];class p0 extends mt{constructor(e,t){var n,s;super("VelocityPass"),this.cachedMaterials=new WeakMap,this.lastCameraTransform={position:new C,quaternion:new qt},this.visibleMeshes=[],this.renderedMeshesThisFrame=0,this.renderedMeshesLastFrame=0,this._scene=e,this._camera=t,this.renderTarget=new $e(((n=window)==null?void 0:n.innerWidth)||1e3,((s=window)==null?void 0:s.innerHeight)||1e3,{type:Ct})}setVelocityMaterialInScene(){this.renderedMeshesThisFrame=0,this.visibleMeshes=Bc(this._scene);for(const n of this.visibleMeshes){var e;const s=n.material;let[r,a]=this.cachedMaterials.get(n)||[];if(s!==r){var t;a=new h0,a.lastMatrixWorld=new be,n.material=a,(t=n.skeleton)!=null&&t.boneTexture&&this.saveBoneTexture(n),this.cachedMaterials.set(n,[s,a])}if(a.uniforms.velocityMatrix.value.multiplyMatrices(this._camera.projectionMatrix,n.modelViewMatrix),n.userData.needsUpdatedReflections||s.map instanceof cg?("FULL_MOVEMENT"in a.defines||(a.needsUpdate=!0),a.defines.FULL_MOVEMENT=""):"FULL_MOVEMENT"in a.defines&&(delete a.defines.FULL_MOVEMENT,a.needsUpdate=!0),n.visible=this.cameraMovedThisFrame||!n.matrixWorld.equals(a.lastMatrixWorld)||n.skeleton||"FULL_MOVEMENT"in a.defines,n.material=a,!!n.visible){this.renderedMeshesThisFrame++;for(const o of f0)a[o]=s[o];(e=n.skeleton)!=null&&e.boneTexture&&(a.defines.USE_SKINNING="",a.defines.BONE_TEXTURE="",a.uniforms.boneTexture.value=n.skeleton.boneTexture)}}}saveBoneTexture(e){let t=e.material.uniforms.prevBoneTexture.value;if(t&&t.image.width===e.skeleton.boneTexture.width)t=e.material.uniforms.prevBoneTexture.value,t.image.data.set(e.skeleton.boneTexture.image.data);else{var n;(n=t)==null||n.dispose();const s=e.skeleton.boneTexture.image.data.slice(),r=e.skeleton.boneTexture.image.width;t=new ar(s,r,r,vt,Ft),e.material.uniforms.prevBoneTexture.value=t,t.needsUpdate=!0}}unsetVelocityMaterialInScene(){for(const t of this.visibleMeshes)if(t.material.isVelocityMaterial){var e;t.visible=!0,t.material.lastMatrixWorld.copy(t.matrixWorld),t.material.uniforms.prevVelocityMatrix.value.multiplyMatrices(this._camera.projectionMatrix,t.modelViewMatrix),(e=t.skeleton)!=null&&e.boneTexture&&this.saveBoneTexture(t),t.material=this.cachedMaterials.get(t)[0]}}setSize(e,t){this.renderTarget.setSize(e,t)}renderVelocity(e){if(e.setRenderTarget(this.renderTarget),this.renderedMeshesThisFrame>0){const{background:t}=this._scene;this._scene.background=d0,e.render(this._scene,this._camera),this._scene.background=t}else e.clearColor()}checkCameraMoved(){const e=this.lastCameraTransform.position.distanceToSquared(this._camera.position),t=8*(1-this.lastCameraTransform.quaternion.dot(this._camera.quaternion));return e>1e-6||t>1e-6?(this.lastCameraTransform.position.copy(this._camera.position),this.lastCameraTransform.quaternion.copy(this._camera.quaternion),!0):!1}render(e){this.cameraMovedThisFrame=this.checkCameraMoved(),this.setVelocityMaterialInScene(),(this.renderedMeshesThisFrame>0||this.renderedMeshesLastFrame>0)&&this.renderVelocity(e),this.unsetVelocityMaterialInScene(),this.renderedMeshesLastFrame=this.renderedMeshesThisFrame}}const Nl=new re;class m0 extends mt{constructor(e,t,n,s={}){super("TemporalResolvePass"),this.velocityPass=null,this.velocityResolutionScale=1,this.samples=1,this.lastCameraTransform={position:new C,quaternion:new qt},this._scene=e,this._camera=t,this.renderTarget=new $e(1,1,{minFilter:Ee,magFilter:Ee,type:Ct,depthBuffer:!1}),this.velocityPass=new p0(e,t),this.fullscreenMaterial=new l0(n),this.fullscreenMaterial.defines.correctionRadius=s.correctionRadius||1,s.dilation&&(this.fullscreenMaterial.defines.dilation=""),s.boxBlur&&(this.fullscreenMaterial.defines.boxBlur=""),this.setupFramebuffers(1,1),this.checkCanUseSharedVelocityTexture()}dispose(){this._scene.userData.velocityTexture===this.velocityPass.renderTarget.texture&&(delete this._scene.userData.velocityTexture,delete this._scene.userData.lastVelocityTexture),this.renderTarget.dispose(),this.accumulatedTexture.dispose(),this.fullscreenMaterial.dispose(),this.velocityPass.dispose()}setSize(e,t){this.renderTarget.setSize(e,t),this.velocityPass.setSize(e*this.velocityResolutionScale,t*this.velocityResolutionScale),this.velocityPass.renderTarget.texture.minFilter=this.velocityResolutionScale===1?je:Ee,this.velocityPass.renderTarget.texture.magFilter=this.velocityResolutionScale===1?je:Ee,this.velocityPass.renderTarget.texture.needsUpdate=!0,this.fullscreenMaterial.uniforms.invTexSize.value.set(1/e,1/t),this.setupFramebuffers(e,t)}setupFramebuffers(e,t){this.accumulatedTexture&&this.accumulatedTexture.dispose(),this.lastVelocityTexture&&this.lastVelocityTexture.dispose(),this.accumulatedTexture=new pl(e,t,vt),this.accumulatedTexture.minFilter=Ee,this.accumulatedTexture.magFilter=Ee,this.accumulatedTexture.type=Ct,this.lastVelocityTexture=new pl(e*this.velocityResolutionScale,t*this.velocityResolutionScale,vt),this.lastVelocityTexture.minFilter=this.velocityResolutionScale===1?je:Ee,this.lastVelocityTexture.magFilter=this.velocityResolutionScale===1?je:Ee,this.lastVelocityTexture.type=Ct,this.fullscreenMaterial.uniforms.accumulatedTexture.value=this.accumulatedTexture,this.fullscreenMaterial.uniforms.lastVelocityTexture.value=this.lastVelocityTexture,this.fullscreenMaterial.needsUpdate=!0}checkCanUseSharedVelocityTexture(){return this._scene.userData.velocityTexture&&this.velocityPass.renderTarget.texture!==this._scene.userData.velocityTexture?this.velocityPass.renderTarget.texture===this.fullscreenMaterial.uniforms.velocityTexture.value&&(this.fullscreenMaterial.uniforms.lastVelocityTexture.value=this._scene.userData.lastVelocityTexture,this.fullscreenMaterial.uniforms.velocityTexture.value=this._scene.userData.velocityTexture,this.fullscreenMaterial.needsUpdate=!0):this.velocityPass.renderTarget.texture!==this.fullscreenMaterial.uniforms.velocityTexture.value&&(this.fullscreenMaterial.uniforms.velocityTexture.value=this.velocityPass.renderTarget.texture,this.fullscreenMaterial.uniforms.lastVelocityTexture.value=this.lastVelocityTexture,this.fullscreenMaterial.needsUpdate=!0,this._scene.userData.velocityTexture||(this._scene.userData.velocityTexture=this.velocityPass.renderTarget.texture,this._scene.userData.lastVelocityTexture=this.lastVelocityTexture)),this.velocityPass.renderTarget.texture!==this.fullscreenMaterial.uniforms.velocityTexture.value}checkNeedsResample(){const e=this.lastCameraTransform.position.distanceToSquared(this._camera.position),t=8*(1-this.lastCameraTransform.quaternion.dot(this._camera.quaternion));(e>1e-6||t>1e-6)&&(this.samples=1,this.lastCameraTransform.position.copy(this._camera.position),this.lastCameraTransform.quaternion.copy(this._camera.quaternion))}render(e){this.samples++,this.checkNeedsResample(),this.fullscreenMaterial.uniforms.samples.value=this.samples,e.setRenderTarget(this.renderTarget),e.render(this.scene,this.camera),e.copyFramebufferToTexture(Nl,this.accumulatedTexture),e.setRenderTarget(this.velocityPass.renderTarget),e.copyFramebufferToTexture(Nl,this.lastVelocityTexture)}}const Fl=function(e,t){let n=1,s=0;for(;e>0;)n/=t,s+=n*(e%t),e=~~(e/t);return s},g0=i=>{const e=[];let t=1;const n=t+i;for(;t<n;t++)e.push([Fl(t,2)-.5,Fl(t,3)-.5]);return e};function Ul(i){return i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}const v0=`
#if defined( USE_ENVMAP ) || defined(  ) || defined ( USE_SHADOWMAP )
    vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );

    #ifdef BOX_PROJECTED_ENV_MAP
        vWorldPosition = worldPosition.xyz;
    #endif
#endif
`,_0=`
#ifdef BOX_PROJECTED_ENV_MAP
    uniform vec3 envMapSize;
    uniform vec3 envMapPosition;
    varying vec3 vWorldPosition;
    
    vec3 parallaxCorrectNormal( vec3 v, vec3 cubeSize, vec3 cubePos ) {
        vec3 nDir = normalize( v );

        vec3 rbmax = ( .5 * cubeSize + cubePos - vWorldPosition ) / nDir;
        vec3 rbmin = ( -.5 * cubeSize + cubePos - vWorldPosition ) / nDir;

        vec3 rbminmax;

        rbminmax.x = ( nDir.x > 0. ) ? rbmax.x : rbmin.x;
        rbminmax.y = ( nDir.y > 0. ) ? rbmax.y : rbmin.y;
        rbminmax.z = ( nDir.z > 0. ) ? rbmax.z : rbmin.z;

        float correction = min( min( rbminmax.x, rbminmax.y ), rbminmax.z );
        vec3 boxIntersection = vWorldPosition + nDir * correction;
        
        return boxIntersection - cubePos;
    }
#endif
`,x0=`
#ifdef BOX_PROJECTED_ENV_MAP
    worldNormal = parallaxCorrectNormal( worldNormal, envMapSize, envMapPosition );
#endif
`,y0=`
#ifdef BOX_PROJECTED_ENV_MAP
    reflectVec = parallaxCorrectNormal( reflectVec, envMapSize, envMapPosition );
#endif
`;function M0(i,e,t){i.defines.BOX_PROJECTED_ENV_MAP="",i.uniforms.envMapPosition={value:e},i.uniforms.envMapSize={value:t};const n=new RegExp(Ul("vec3 worldNormal = inverseTransformDirection ( normal , viewMatrix ) ;").replaceAll(" ","\\s*"),"g"),s=new RegExp(Ul("reflectVec = inverseTransformDirection ( reflectVec , viewMatrix ) ;").replaceAll(" ","\\s*"),"g");i.vertexShader=`varying vec3 vWorldPosition;
`+i.vertexShader.replace("#include <worldpos_vertex>",v0),i.fragmentShader=_0+`
`+i.fragmentShader.replace("#include <envmap_physical_pars_fragment>",ge.envmap_physical_pars_fragment).replace(n,`vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
                ${x0}`).replace(s,`reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
                ${y0}`)}const S0=Z_.replace("#include <helperFunctions>",Oc).replace("#include <boxBlur>",K_),b0=["blur","blurSharpness","blurKernel"],w0=new ba(1);let Ys;class T0 extends lr{constructor(e,t,n=ma){super("SSREffect",S0,{type:"FinalSSRMaterial",uniforms:new Map([["reflectionsTexture",new Y(null)],["blur",new Y(0)],["blurSharpness",new Y(0)],["blurKernel",new Y(0)]]),defines:new Map([["RENDER_MODE","0"]])}),this.haltonSequence=g0(1024),this.haltonIndex=0,this.selection=new Uc,this.lastSize=void 0,this.cubeCamera=new hc(.001,1e3,w0),this.usingBoxProjectedEnvMap=!1,this._scene=e,this._camera=t,n=pa({},ma,n,{boxBlur:!0,dilation:!0}),this.temporalResolvePass=new m0(e,t,J_,n),this.uniforms.get("reflectionsTexture").value=this.temporalResolvePass.renderTarget.texture,this.reflectionsPass=new r0(this,n),this.temporalResolvePass.fullscreenMaterial.uniforms.inputTexture.value=this.reflectionsPass.renderTarget.texture,this.lastSize={width:n.width,height:n.height,resolutionScale:n.resolutionScale,velocityResolutionScale:n.velocityResolutionScale},this.setSize(n.width,n.height),this.makeOptionsReactive(n)}makeOptionsReactive(e){let t=!1;const n=this.reflectionsPass.fullscreenMaterial.uniforms,s=Object.keys(n);for(const r of Object.keys(e))Object.defineProperty(this,r,{get(){return e[r]},set(a){if(!(e[r]===a&&t))switch(e[r]=a,b0.includes(r)||this.setSize(this.lastSize.width,this.lastSize.height,!0),r){case"resolutionScale":this.setSize(this.lastSize.width,this.lastSize.height);break;case"velocityResolutionScale":this.temporalResolvePass.velocityResolutionScale=a,this.setSize(this.lastSize.width,this.lastSize.height,!0);break;case"blur":this.uniforms.get("blur").value=a;break;case"blurSharpness":this.uniforms.get("blurSharpness").value=a;break;case"blurKernel":this.uniforms.get("blurKernel").value=a;break;case"steps":this.reflectionsPass.fullscreenMaterial.defines.steps=parseInt(a),this.reflectionsPass.fullscreenMaterial.needsUpdate=t;break;case"refineSteps":this.reflectionsPass.fullscreenMaterial.defines.refineSteps=parseInt(a),this.reflectionsPass.fullscreenMaterial.needsUpdate=t;break;case"missedRays":a?this.reflectionsPass.fullscreenMaterial.defines.missedRays="":delete this.reflectionsPass.fullscreenMaterial.defines.missedRays,this.reflectionsPass.fullscreenMaterial.needsUpdate=t;break;case"correctionRadius":this.temporalResolvePass.fullscreenMaterial.defines.correctionRadius=Math.round(a),this.temporalResolvePass.fullscreenMaterial.needsUpdate=t;break;case"blend":this.temporalResolvePass.fullscreenMaterial.uniforms.blend.value=a;break;case"correction":this.temporalResolvePass.fullscreenMaterial.uniforms.correction.value=a;break;case"exponent":this.temporalResolvePass.fullscreenMaterial.uniforms.exponent.value=a;break;case"distance":n.rayDistance.value=a;default:s.includes(r)&&(n[r].value=a)}}}),this[r]=e[r];t=!0}setSize(e,t,n=!1){!n&&e===this.lastSize.width&&t===this.lastSize.height&&this.resolutionScale===this.lastSize.resolutionScale&&this.velocityResolutionScale===this.lastSize.velocityResolutionScale||(this.temporalResolvePass.setSize(e,t),this.reflectionsPass.setSize(e,t),this.lastSize={width:e,height:t,resolutionScale:this.resolutionScale,velocityResolutionScale:this.velocityResolutionScale})}generateBoxProjectedEnvMapFallback(e,t=new C,n=new C,s=512){this.cubeCamera.renderTarget.dispose(),this.cubeCamera.renderTarget=new ba(s),this.cubeCamera.position.copy(t),this.cubeCamera.updateMatrixWorld(),this.cubeCamera.update(e,this._scene),Ys||(Ys=new oa(e),Ys.compileCubemapShader());const r=Ys.fromCubemap(this.cubeCamera.renderTarget.texture).texture;r.minFilter=Ee,r.magFilter=Ee;const a=this.reflectionsPass.fullscreenMaterial;return M0(a,t,n),a.fragmentShader=a.fragmentShader.replace("vec3 worldPos","worldPos").replace("varying vec3 vWorldPosition;","vec3 worldPos;"),a.uniforms.envMapPosition.value.copy(t),a.uniforms.envMapSize.value.copy(n),Il(a,r,s),this.usingBoxProjectedEnvMap=!0,r}setIBLRadiance(e,t){this._scene.traverse(n=>{if(n.material){var s;const r=(s=t.properties.get(n.material))==null?void 0:s.uniforms;r&&"disableIBLRadiance"in r&&(r.disableIBLRadiance.value=e)}})}deleteBoxProjectedEnvMapFallback(){const e=this.reflectionsPass.fullscreenMaterial;e.uniforms.envMap.value=null,e.fragmentShader=e.fragmentShader.replace("worldPos = ","vec3 worldPos = "),delete e.defines.BOX_PROJECTED_ENV_MAP,e.needsUpdate=!0,this.usingBoxProjectedEnvMap=!1}dispose(){super.dispose(),this.reflectionsPass.dispose(),this.temporalResolvePass.dispose()}update(e,t){if(!this.usingBoxProjectedEnvMap&&this._scene.environment){const o=this.reflectionsPass.fullscreenMaterial;let l=null;if(this._scene.traverse(c=>{if(!l&&c.material&&!c.material.envMap){const u=e.properties.get(c.material);"envMap"in u&&u.envMap instanceof st&&(l=u.envMap)}}),l){const c=this._scene.environment.image.height;Il(o,l,c)}}this.haltonIndex=(this.haltonIndex+1)%this.haltonSequence.length;const[n,s]=this.haltonSequence[this.haltonIndex],{width:r,height:a}=this.lastSize;this.temporalResolvePass.velocityPass.render(e),this._camera.setViewOffset&&this._camera.setViewOffset(r,a,n,s,r,a),this.reflectionsPass.render(e,t),this.temporalResolvePass.render(e),this._camera.clearViewOffset()}static patchDirectEnvIntensity(e=0){e===0?ge.envmap_physical_pars_fragment=ge.envmap_physical_pars_fragment.replace("vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {","vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) { return vec3(0.0);"):ge.envmap_physical_pars_fragment=ge.envmap_physical_pars_fragment.replace("vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );","vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness ) * "+e.toFixed(5)+";")}}let ns,Xn,$s,Gt;const qn={bloom:null,ssr:null,ssao:null,dotScreen:null},Un={RENDER:null,normal:null,depthDownsamplingPass:null},Ol={bloom:null,ssr:null,ssao:null},Bl={dotScreen:{enabled:!1},ssr:{enabled:!1},bloom:{enabled:!1},ssao:{enabled:!1,distance:{threshold:null,falloff:null},proximity:{threshold:null,falloff:null},upsampling:{enabled:null,threshold:null},distanceScaling:{enabled:null,"min scale":null},"lum influence":null,intensity:null,bias:null,fade:null,"render mode":null,resolution:null,color:0,opacity:null,"blend mode":null}};class E0{constructor(e,t,n){ns=e,Xn=t,$s=n,this.enabled=!1,this.init()}init(){Gt=new r_($s,{multisampling:Math.min(4,$s.capabilities.maxSamples)}),Un.RENDER=new or(ns,Xn),Gt.addPass(Un.RENDER),Gt.setSize(window.innerWidth,window.innerHeight),this.setupSSR(),this.setupBloom(),this.setupSSAO(),this.setupDOTScreen(),this.updateEffectPassses()}setupDOTScreen(){qn.dotScreen=new W_}setupBloom(){const e=new q_(ns,Xn,{luminanceThreshold:.8,luminanceSmoothing:.3,mipmapBlur:!0,intensity:4});e.inverted=!0,qn.bloom=e}setupSSR(){qn.ssr=new T0(ns,Xn);const e=qn.ssr;e.steps=30,e.jitter=.1,Ol.ssr=t=>{const n=ma,s=t.addFolder("SSR");s.close(),s.onChange(p=>{e[p.property]=p.value});const r=s,a=r.addFolder("General");a.add(n,"intensity",0,3,.01),a.add(n,"exponent",.125,8,.125),a.add(n,"distance",.001,10,.1),a.add(n,"fade",0,20,.01),a.add(n,"roughnessFade",0,1,.01),a.add(n,"thickness",0,10,.01),a.add(n,"ior",1,2.33333,.01);const o=r.addFolder("Maximum Values");o.add(n,"maxRoughness",0,1,.01),o.add(n,"maxDepthDifference",0,100,.1);const l=r.addFolder("Temporal Resolve");l.add(n,"blend",0,1,.001),l.add(n,"correction",0,1,1e-4),l.add(n,"correctionRadius",1,4,1);const c=r.addFolder("Blur");c.add(n,"blur",0,1,.01),c.add(n,"blurKernel",0,5,1),c.add(n,"blurSharpness",0,100,1);const u=r.addFolder("Jitter");u.add(n,"jitter",0,4,.01),u.add(n,"jitterRoughness",0,4,.01);const h=r.addFolder("Tracing");h.add(n,"steps",1,256,1),h.add(n,"refineSteps",0,16,1),h.add(n,"missedRays");const d=r.addFolder("Resolution");d.add(n,"resolutionScale",.125,1,.125),d.add(n,"velocityResolutionScale",.125,1,.125)}}setupSSAO(){const e=new n_(ns,Xn),t=new Nc({normalBuffer:e.texture,resolutionScale:.5}),n=$s.capabilities.isWebGL2?t.texture:null,s=new $_(Xn,e.texture,{distanceScaling:!0,depthAwareUpsampling:!1,normalDepthBuffer:n,worldDistanceThreshold:20,worldDistanceFalloff:5,worldProximityThreshold:.4,worldProximityFalloff:.1,radius:.03,intensity:4,resolutionScale:.5,samples:10});Un.normal=e,Un.depthDownsamplingPass=t,qn.ssao=s}disableAllEffects(){Gt.removeAllPasses(),Gt.addPass(Un.RENDER)}updateEffectPassses(){this.effectPass&&(Gt.removeAllPasses(),Gt.addPass(Un.RENDER),this.effectPass.dispose()),this.setupBloom();const e=[];for(const[t,n]of Object.entries(Bl))n.enabled&&(t==="ssao"&&(Gt.addPass(Un.normal),Gt.addPass(Un.depthDownsamplingPass)),qn[t]&&e.push(qn[t]));!e.length||(this.effectPass=new Zv(Xn,...e),Gt.addPass(this.effectPass),console.log("UPDATED",Gt.passes,this.effectPass.effects),this.updateEffectsGui())}addGui(e){this.gui=e.addFolder("POST"),this.updateEffectsGui()}updateEffectsGui(){if(!!this.gui){this.effectsGui&&this.effectsGui.destroy(),this.toggleGui&&this.toggleGui.destroy(),this.toggleGui=this.gui.addFolder("TOGGLE"),this.effectsGui=this.gui.addFolder("EFFECTS");for(const[e,t]of Object.entries(Bl))this.toggleGui.add(t,"enabled").name(e).onChange(()=>{this.updateEffectPassses()});for(const e of Object.values(Ol))e&&e(this.effectsGui)}}render(){Gt.render()}}const A0=""+new URL("mug.4fafdc64.glb",import.meta.url).href,R0=""+new URL("chairs.e576e176.glb",import.meta.url).href,C0={Mug:A0,Chairs:R0};class D0 extends bg{constructor(e){super(e),this.type=Ct}parse(e){const o=function(y,_){switch(y){case 1:console.error("THREE.RGBELoader Read Error: "+(_||""));break;case 2:console.error("THREE.RGBELoader Write Error: "+(_||""));break;case 3:console.error("THREE.RGBELoader Bad File Format: "+(_||""));break;default:case 4:console.error("THREE.RGBELoader: Error: "+(_||""))}return-1},h=`
`,d=function(y,_,S){_=_||1024;let D=y.pos,x=-1,w=0,P="",z=String.fromCharCode.apply(null,new Uint16Array(y.subarray(D,D+128)));for(;0>(x=z.indexOf(h))&&w<_&&D<y.byteLength;)P+=z,w+=z.length,D+=128,z+=String.fromCharCode.apply(null,new Uint16Array(y.subarray(D,D+128)));return-1<x?(S!==!1&&(y.pos+=w+x+1),P+z.slice(0,x)):!1},p=function(y){const _=/^#\?(\S+)/,S=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,E=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,D=/^\s*FORMAT=(\S+)\s*$/,x=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,w={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let P,z;if(y.pos>=y.byteLength||!(P=d(y)))return o(1,"no header found");if(!(z=P.match(_)))return o(3,"bad initial token");for(w.valid|=1,w.programtype=z[1],w.string+=P+`
`;P=d(y),P!==!1;){if(w.string+=P+`
`,P.charAt(0)==="#"){w.comments+=P+`
`;continue}if((z=P.match(S))&&(w.gamma=parseFloat(z[1])),(z=P.match(E))&&(w.exposure=parseFloat(z[1])),(z=P.match(D))&&(w.valid|=2,w.format=z[1]),(z=P.match(x))&&(w.valid|=4,w.height=parseInt(z[1],10),w.width=parseInt(z[2],10)),w.valid&2&&w.valid&4)break}return w.valid&2?w.valid&4?w:o(3,"missing image size specifier"):o(3,"missing format specifier")},v=function(y,_,S){const E=_;if(E<8||E>32767||y[0]!==2||y[1]!==2||y[2]&128)return new Uint8Array(y);if(E!==(y[2]<<8|y[3]))return o(3,"wrong scanline width");const D=new Uint8Array(4*_*S);if(!D.length)return o(4,"unable to allocate buffer space");let x=0,w=0;const P=4*E,z=new Uint8Array(4),$=new Uint8Array(P);let O=S;for(;O>0&&w<y.byteLength;){if(w+4>y.byteLength)return o(1);if(z[0]=y[w++],z[1]=y[w++],z[2]=y[w++],z[3]=y[w++],z[0]!=2||z[1]!=2||(z[2]<<8|z[3])!=E)return o(3,"bad rgbe scanline format");let N=0,H;for(;N<P&&w<y.byteLength;){H=y[w++];const Z=H>128;if(Z&&(H-=128),H===0||N+H>P)return o(3,"bad scanline data");if(Z){const V=y[w++];for(let U=0;U<H;U++)$[N++]=V}else $.set(y.subarray(w,w+H),N),N+=H,w+=H}const K=E;for(let Z=0;Z<K;Z++){let V=0;D[x]=$[Z+V],V+=E,D[x+1]=$[Z+V],V+=E,D[x+2]=$[Z+V],V+=E,D[x+3]=$[Z+V],x+=4}O--}return D},m=function(y,_,S,E){const D=y[_+3],x=Math.pow(2,D-128)/255;S[E+0]=y[_+0]*x,S[E+1]=y[_+1]*x,S[E+2]=y[_+2]*x,S[E+3]=1},f=function(y,_,S,E){const D=y[_+3],x=Math.pow(2,D-128)/255;S[E+0]=js.toHalfFloat(Math.min(y[_+0]*x,65504)),S[E+1]=js.toHalfFloat(Math.min(y[_+1]*x,65504)),S[E+2]=js.toHalfFloat(Math.min(y[_+2]*x,65504)),S[E+3]=js.toHalfFloat(1)},g=new Uint8Array(e);g.pos=0;const M=p(g);if(M!==-1){const y=M.width,_=M.height,S=v(g.subarray(g.pos),y,_);if(S!==-1){let E,D,x;switch(this.type){case Ft:x=S.length/4;const w=new Float32Array(x*4);for(let z=0;z<x;z++)m(S,z*4,w,z*4);E=w,D=Ft;break;case Ct:x=S.length/4;const P=new Uint16Array(x*4);for(let z=0;z<x;z++)f(S,z*4,P,z*4);E=P,D=Ct;break;default:console.error("THREE.RGBELoader: unsupported type: ",this.type);break}return{width:y,height:_,data:E,header:M.string,gamma:M.gamma,exposure:M.exposure,type:D}}}return null}setDataType(e){return this.type=e,this}load(e,t,n,s){function r(a,o){switch(a.type){case Ft:case Ct:a.encoding=ln,a.minFilter=Ee,a.magFilter=Ee,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,o)}return super.load(e,r,n,s)}}class P0 extends Et{constructor(e,t){var f,g;const n=e.isCubeTexture,r=((g=n?(f=e.image[0])==null?void 0:f.width:e.image.width)!=null?g:1024)/4,a=Math.floor(Math.log2(r)),o=Math.pow(2,a),l=3*Math.max(o,16*7),c=4*o,u=[n?"#define ENVMAP_TYPE_CUBE":"",`#define CUBEUV_TEXEL_WIDTH ${1/l}`,`#define CUBEUV_TEXEL_HEIGHT ${1/c}`,`#define CUBEUV_MAX_MIP ${a}.0`],h=`
        varying vec3 vWorldPosition;

        void main() 
        {

            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

        }
        `,d=u.join(`
`)+`
        #define ENVMAP_TYPE_CUBE_UV

        varying vec3 vWorldPosition;

        uniform float radius;
        uniform float height;
        uniform float angle;

        #ifdef ENVMAP_TYPE_CUBE

            uniform samplerCube map;

        #else

            uniform sampler2D map;

        #endif

        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {

            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;

        }

        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {

            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;

        }

        vec3 project() 
        {

            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;

            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;

            } else {

                p = vec3( 0.0, 1.0, 0.0 );

            }

            return p;

        }

        #include <common>
        #include <cube_uv_reflection_fragment>

        void main() 
        {

            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE

                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;

            #else

                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;

            #endif

            gl_FragColor = vec4( outcolor, 1.0 );

            #include <tonemapping_fragment>
            #include <encodings_fragment>

        }
        `,p={map:{value:e},height:{value:(t==null?void 0:t.height)||15},radius:{value:(t==null?void 0:t.radius)||100}},v=new Pa(1,16),m=new et({uniforms:p,fragmentShader:d,vertexShader:h,side:Rt});super(v,m)}set radius(e){this.material.uniforms.radius.value=e}get radius(){return this.material.uniforms.radius.value}set height(e){this.material.uniforms.height.value=e}get height(){return this.material.uniforms.height.value}}let L0=window.location.href,zl=new URL(L0);const I0={model:zl.searchParams.get("model"),scene:zl.searchParams.get("scene")};console.log(I0);let Di;const ci={useHDRI:!0,pixelRatio:1,recordVideo:k0,printCords:()=>{console.log({position:tn.position.toArray(),target:on.target.toArray()})}},zc=new xe(.5,.5,.5),N0=new D0,F0=new jg,kc=new au;document.body.appendChild(kc.domElement);const ui=new ga,U0=document.getElementById("three-canvas"),Bn=new ca,tn=new ft(75,window.innerWidth/window.innerHeight,.1,1e3),nn=new Rc(16777215,1.5);nn.position.set(20,50,-20);nn.castShadow=!0;nn.shadow.bias=-32e-6;const cr=35;nn.shadow.camera.right=cr;nn.shadow.camera.left=-cr;nn.shadow.camera.top=cr;nn.shadow.camera.bottom=-cr;nn.shadow.mapSize.width=4096;nn.shadow.mapSize.height=4096;ui.add(nn.shadow,"bias",-.001,.001);Bn.add(nn);Bn.background=zc;const Dt=new yc({canvas:U0,powerPreference:"high-performance",antialias:!0,stencil:!1});Dt.outputEncoding=ye;Dt.toneMapping=Yl;Dt.shadowMap.enabled=!0;Dt.shadowMap.type=Li;Dt.setPixelRatio(Math.min(window.devicePixelRatio,2));ci.pixelRatio=Dt.getPixelRatio();Dt.setSize(window.innerWidth,window.innerHeight);const ka=new E0(Bn,tn,Dt),on=new Wg(tn,Dt.domElement);on.enableDamping=!0;on.autoRotate=!0;on.autoRotateSpeed=.3;on.target.y=2;ka.addGui(ui);tn.position.set(0,2,-5);window.addEventListener("resize",B0);ui.add(ci,"pixelRatio",.5,window.devicePixelRatio,.01).onChange(i=>[Dt.setPixelRatio(i)]);ui.add(on,"autoRotate");ui.add(ci,"printCords");ci.useHDRI&&Gc(!0);let Hc;function Vc(){Hc=requestAnimationFrame(Vc),kc.update(),on.update(),ka.render()}Vc();async function O0(){const i=await F0.loadAsync(C0.Chairs);Bn.add(i.scene),console.log({gltf:i}),i.scene.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)})}function B0(){tn.aspect=window.innerWidth/window.innerHeight,tn.updateProjectionMatrix(),Dt.setSize(window.innerWidth,window.innerHeight)}ui.add(ci,"useHDRI").onChange(Gc);async function Gc(i=ci.useHDRI){if(!Di){Di=await N0.loadAsync("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/clarens_night_02_2k.hdr"),Di.mapping=er;const e=new P0(Di);e.scale.setScalar(100),Bn.add(e)}Bn.environment=i?Di:null,Bn.background=i?Di:zc}window.onresize=()=>{Dt.setSize(window.innerWidth,window.innerHeight),tn.aspect=window.innerWidth/window.innerHeight,tn.updateProjectionMatrix()};function z0(){const i=new Gg(60,60);i.rotateX(-Math.PI/2);const e=new xs({color:7393161,roughness:0,metalness:0});e.color.setHSL(Math.random(),.3,.3);const t=new Et(i,e);t.receiveShadow=!0,Bn.add(t);const n=new Ac;n.load("https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/metal_plate/metal_plate_rough_1k.jpg",s=>{e.roughnessMap=s,e.needsUpdate=!0,e.roughness=.5,s.wrapS=Qt,s.wrapT=Qt,s.repeat.set(60,60),s.needsUpdate=!0}),n.load("https://dl.polyhaven.org/file/ph-assets/Textures/png/1k/metal_plate/metal_plate_nor_gl_1k.png",s=>{e.normalMap=s,e.needsUpdate=!0,s.repeat.set(60,60),s.wrapS=Qt,s.wrapT=Qt,s.needsUpdate=!0})}z0();O0();ui.add(ci,"recordVideo").onChange();async function k0(){const i={position:new C(-.44003328735054376,1.3392010778194048,1.263521643069449),target:new C(-.6094982042620339,.8426082992686402,1.0956371626851795),position:new C().fromArray([-24.591764909061197,1.381444856913781,25.336984038640235]),target:new C().fromArray([-25.80525068777356,-19.793276941344033,6.150430148375665])},e={position:new C(25.996604717244654,3.6048675275613693,26.036041879854984),target:new C(5.060288045565049,-12.250008258805886,2.7284230374281067),position:new C().fromArray([17.719052528077945,14.959241816968374,19.135464644510254]),target:new C().fromArray([1.523442713608944,-3.070097574993474,1.2755144484845466])};cancelAnimationFrame(Hc),Dt.setSize(1280,720),tn.aspect=1280/720,tn.updateProjectionMatrix();const t=Dt.domElement,{createFFmpeg:n,fetchFile:s}=FFmpeg,r=n({log:!0});await r.load(),r.setProgress(({ratio:h})=>{console.log({ratio:h},h*.5+.5)});const a=30,l=10*a;let c=0;on.autoRotate=!1;for(let h=0;h<l;h++){const d=nc.mapLinear(h,0,l,0,1);tn.position.lerpVectors(i.position,e.position,d),on.target.lerpVectors(i.target,e.target,d),on.update(),ka.render(c);const p=h.toString().padStart(5,"0");r.FS("writeFile",`tmp.${p}.png`,await s(t.toDataURL())),c+=1/a}await r.run("-framerate",String(a),"-pattern_type","glob","-i","*.png","-c:v","libx264","-pix_fmt","yuv420p","-preset","slow","-crf",String(5),"out.mp4");const u=r.FS("readFile","out.mp4");for(let h=0;h<l;h++){const d=h.toString().padStart(5,"0");r.FS("unlink",`tmp.${d}.png`)}H0(new Blob([u.buffer],{type:"video/mp4"}),"out.mp4")}const is=document.createElement("a");function H0(i,e){console.log("Save",e),is.href&&URL.revokeObjectURL(is.href),is.href=URL.createObjectURL(i),is.download=e,is.dispatchEvent(new MouseEvent("click"))}
