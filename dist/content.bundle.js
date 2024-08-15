(()=>{"use strict";var r=function(r){return"#".concat(r.map((function(r){return r.toString(16).padStart(2,"0")})).join(""))},t=function(r){if("string"!=typeof r)return null;var t=RegExp(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).exec(r);return t?t.slice(1,4).map((function(r){return Number(r)})):null};function e(r){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},e(r)}function n(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,n)}return e}function o(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?n(Object(e),!0).forEach((function(t){i(r,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):n(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}function i(r,t,n){return(t=function(r){var t=function(r){if("object"!=e(r)||!r)return r;var t=r[Symbol.toPrimitive];if(void 0!==t){var n=t.call(r,"string");if("object"!=e(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(r)}(r);return"symbol"==e(t)?t:t+""}(t))in r?Object.defineProperty(r,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):r[t]=n,r}function a(r,t){if(r){if("string"==typeof r)return u(r,t);var e={}.toString.call(r).slice(8,-1);return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?u(r,t):void 0}}function u(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=Array(t);e<t;e++)n[e]=r[e];return n}var l=function(e,n,o){var i,u,l=(u=3,function(r){if(Array.isArray(r))return r}(i=n)||function(r,t){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=e){var n,o,i,a,u=[],l=!0,c=!1;try{if(i=(e=e.call(r)).next,0===t){if(Object(e)!==e)return;l=!1}else for(;!(l=(n=i.call(e)).done)&&(u.push(n.value),u.length!==t);l=!0);}catch(r){c=!0,o=r}finally{try{if(!l&&null!=e.return&&(a=e.return(),Object(a)!==a))return}finally{if(c)throw o}}return u}}(i,u)||a(i,u)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=l[0],f=l[1],y=l[2];if(c.size<o){var s=function(e){var n=window.getComputedStyle(e).backgroundColor;if(n&&"rgba(0, 0, 0, 0)"!==n&&"transparent"!==n){var o=t(n);if(o)return r(o)}return null}(e);s&&c.add(s)}if(f.size<o){var m=function(e){var n=window.getComputedStyle(e).color;if(n&&"rgba(0, 0, 0, 0)"!==n&&"transparent"!==n){var o=t(n);if(o)return r(o)}return null}(e);m&&f.add(m)}if(y.size<o){var b=function(r){var t=window.getComputedStyle(r).fontSize;if(t&&"0px"!==t){var e=parseFloat(t),n=Math.round(e),o=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16,e=parseFloat(r)/t;return parseFloat(e.toFixed(3))+"rem"}("".concat(n,"px"));return"".concat(n,"px | ").concat(o)}return null}(e);b&&y.add(b)}},c=function(r){var t,e=new Set,n=new Set,o=new Set,i=100,u=[e,n,o],c=function(r){var t="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!t){if(Array.isArray(r)||(t=a(r))){t&&(r=t);var e=0,n=function(){};return{s:n,n:function(){return e>=r.length?{done:!0}:{done:!1,value:r[e++]}},e:function(r){throw r},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,u=!1;return{s:function(){t=t.call(r)},n:function(){var r=t.next();return i=r.done,r},e:function(r){u=!0,o=r},f:function(){try{i||null==t.return||t.return()}finally{if(u)throw o}}}}(r);try{for(c.s();!(t=c.n()).done;){var f=t.value;if(l(f,u,i),e.size>=i&&n.size>=i&&o.size>=i)break}}catch(r){c.e(r)}finally{c.f()}return{bgColors:Array.from(e),textColors:Array.from(n),fontSizes:Array.from(o)}},f=function(){return r=document.querySelectorAll("img"),t=[],r.forEach((function(r){var e=r.src,n=r.alt.trim(),o=e.substring(e.lastIndexOf("/")+1),i=n.length>0;t.push({src:e,name:o,alt:i?n:"❌"})})),t;var r,t};chrome.runtime.onMessage.addListener((function(r,t,e){if("analyzePage"===r.action){var n=c(document.querySelectorAll("*")),i=f();e(o(o({},n),{},{imageAlt:i}))}if("analyzeElementAndChildren"===r.action){var l=document.querySelector(r.selector);if(l){var y=l.querySelectorAll("*"),s=[l].concat(function(r){if(Array.isArray(r))return u(r)}(d=y)||function(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(d)||a(d)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),m=c(s),b=f();m.elementFound=!0,e(o(o({},m),{},{imageAlt:b}))}else e({elementFound:!1})}var d;if("analyzeElement"===r.action){var p=document.querySelectorAll(r.selector);if(p.length>0){var v=c(p),g=f();v.elementFound=!0,e(o(o({},v),{},{imageAlt:g}))}else e({elementFound:!1})}return!0}))})();