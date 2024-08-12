(()=>{"use strict";var r=function(r){return"#".concat(r.map((function(r){return r.toString(16).padStart(2,"0")})).join(""))},e=function(r){if("string"!=typeof r)return null;var e=r.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);return e?e.slice(1,4).map((function(r){return Number(r)})):null},t=function(t){var n=window.getComputedStyle(t).backgroundColor;if(n&&"rgba(0, 0, 0, 0)"!==n&&"transparent"!==n){var o=e(n);if(o)return r(o)}return null},n=function(t){var n=window.getComputedStyle(t).color;if(n&&"rgba(0, 0, 0, 0)"!==n&&"transparent"!==n){var o=e(n);if(o)return r(o)}return null},o=function(r){var e=window.getComputedStyle(r).fontSize;return e&&"0px"!==e?"".concat(e," ").concat(function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16;return(parseFloat(r)/e).toFixed(2)+" rem"}(e)):null};function a(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=Array(e);t<e;t++)n[t]=r[t];return n}var i=function(r){for(var e=new Set,a=new Set,i=new Set,l=100,u=0;u<r.length;u++){var c=r[u];if(e.size<l){var f=t(c);f&&e.add(f)}if(a.size<l){var d=n(c);d&&a.add(d)}if(i.size<l){var s=o(c);s&&i.add(s)}if(e.size>=l&&a.size>=l&&i.size>=l)break}return{bgColors:Array.from(e),textColors:Array.from(a),fontSizes:Array.from(i)}};chrome.runtime.onMessage.addListener((function(r,e,t){if("analyzePage"===r.action&&t(i(document.querySelectorAll("*"))),"analyzeElementAndChildren"===r.action){var n=document.querySelector(r.selector);if(n){var o=n.querySelectorAll("*"),l=[n].concat(function(r){if(Array.isArray(r))return a(r)}(c=o)||function(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(c)||function(r,e){if(r){if("string"==typeof r)return a(r,e);var t={}.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?a(r,e):void 0}}(c)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=i(l);u.elementFound=!0,t(u)}else t({elementFound:!1})}var c;if("analyzeElement"===r.action){var f=document.querySelectorAll(r.selector);if(f.length>0){var d=i(f);d.elementFound=!0,t(d)}else t({elementFound:!1})}return!0}))})();