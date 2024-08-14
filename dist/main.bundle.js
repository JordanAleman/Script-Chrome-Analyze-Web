(()=>{"use strict";var e=function(){document.querySelectorAll("#results tbody").forEach((function(e){e.innerHTML=""})),document.getElementById("results").style.display="none",document.getElementById("noResults").style.display="none"};const t=JSON.parse('{"T":{"stone-100":"#FFFFFF","stone-200":"#F5F5F5","stone-300":"#EEEEEE","stone-400":"#DFDFDF","stone-500":"#CCCCCC","stone-600":"#B7B7B7","stone-700":"#929292","stone-800":"#8C8C8C","stone-900":"#828282","stone-1000":"#767676","stone-1100":"#707070","stone-1200":"#545454","stone-1300":"#484848","stone-1400":"#333333","stone-1500":"#242424","stone-1600":"#111111","stone-1700":"#000000","sky-1500":"#40b1E1","sky-2500":"#489CE3","sky-3500":"#007CC1","sky-4500":"#0061B4","sky-5500":"#0058A3","sky-5600":"#004F93","sky-5700":"#003E72","lingonberry-1500":"#FB6579","lingonberry-2500":"#ED5A51","lingonberry-3500":"#E00751","lingonberry-3600":"#CC003D","lingonberry-3700":"#B80029","lingonberry-4500":"#CC0008","sun-1500":"#FFDB00","sun-2500":"#F5B460","sun-3500":"#FFA524","sun-4500":"#EC773E","sun-5500":"#CA5008","sun-6500":"#F26A2F","forest-1500":"#7EC76D","forest-2500":"#5CC27C","forest-3500":"#0A8A00","forest-4500":"#00853E","wood-1000":"#DEBC9C"},"z":{"font-size-20":0.625,"font-size-25":0.6875,"font-size-50":0.75,"font-size-75":0.875,"font-size-100":1,"font-size-200":1.125,"font-size-300":1.25,"font-size-400":1.375,"font-size-500":1.5,"font-size-600":1.75,"font-size-700":2,"font-size-800":2.25,"font-size-900":2.5,"font-size-1000":3,"font-size-1100":3.25,"font-size-1200":3.5,"font-size-1300":4,"font-size-1400":4.5,"font-size-1500":5,"font-size-1600":6}}');function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,a,c,s=[],l=!0,u=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(o=a.call(n)).done)&&(s.push(o.value),s.length!==t);l=!0);}catch(e){u=!0,r=e}finally{try{if(!l&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(u)throw r}}return s}}(e,t)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var r=function(e){var t=document.getElementById("noResults");t.innerText=e,t.style.display="flex",document.getElementById("results").style.display="none",document.getElementById("accordionResults").style.display="none"},a=function(e,o){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3;o.innerHTML="";var a=[],c=[];e.forEach((function(e){var o=Object.entries(t.T).find((function(t){var o=n(t,2);return o[0],o[1].toLowerCase()===e.toLowerCase()}));o?a.push({color:e,name:o[0]}):c.push({color:e})}));var s=function(e,t){var n="<tr>";e.forEach((function(e){var o=e.name?e.name:'<span class="tableSuccessFailedText">❌</span>',r=t?'class="tableSuccess"':"";n+='\n                <td class="color-box" style="background-color: '.concat(e.color,';"></td>\n                <td>').concat(e.color,"</td>\n                <td ").concat(r,">").concat(o,"</td>\n            ")})),n+="</tr>",o.innerHTML+=n},l=function(e,t){var n=[],o=0;e.forEach((function(e){n.push(e),++o===r&&(s(n,t),n=[],o=0)})),n.length>0&&s(n,t)};return l(a,!0),c.length>0&&(o.innerHTML+='<tr><td class="tableSeparator" colspan="'.concat(3*r,'">.·´¯`(&gt;▂&lt;)´¯`·.</td></tr>')),l(c,!1),{matchedCount:a.length,unmatchedCount:c.length,totalCount:e.length}},c=function(e,t,n,o){document.querySelector("#".concat(e," .summary")).innerHTML='\n        <span class="summaryInfo">Nº: '.concat(t,'</span>\n        <span class="summarySkaoa">Skapa: ').concat(n,'</span>  \n        <span class="summaryNoSkapa">No Skapa: ').concat(o,"</span>\n    ")},s=null,l=document.querySelector(".switch input"),u=function(){var e=l.checked;if(s){if(e)!function(){var e=document.getElementById("accordionResults");e.innerHTML="";for(var t=arguments.length,o=new Array(t),r=0;r<t;r++)o[r]=arguments[r];var a=o.map((function(e){var t,o,r=n(e,2);return t=r[0],o=r[1],'\n            <div class="accordion-item">\n                <button class="accordion">'.concat(t,'</button>\n                <div class="panel">\n                    <ul class="panelContent">\n                        ').concat(o.map((function(e){return"<li>".concat(e,"</li>")})).join(""),"\n                    </ul>\n                </div>\n            </div>\n        ")})).join("");e.innerHTML=a,requestAnimationFrame((function(){document.querySelectorAll(".accordion").forEach((function(e){var t=e.nextElementSibling;t.style.maxHeight=t.scrollHeight+"px",e.addEventListener("click",(function(){t.style.maxHeight?t.style.maxHeight=null:t.style.maxHeight=t.scrollHeight+"px"}))}))})),e.style.display="flex"}(["Background Colors",s.bgColors],["Text Colors",s.textColors],["Font Sizes",s.fontSizes]);else{var o=document.getElementById("resultBackgroundColors"),r=document.getElementById("resultTextColors"),u=document.getElementById("resultFontSizes"),i=a(s.bgColors,o),d=a(s.textColors,r),m=function(e,o,r){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5;o.innerHTML="";var c=[],s=[];e.forEach((function(e){var o=n(e.split(" | "),2),r=o[0],a=o[1],l=Object.entries(t.z).find((function(e){var t=n(e,2),o=(t[0],t[1]);return"".concat(o,"rem")===a}));l?c.push({pxValue:r,remValue:a,name:l[0]}):s.push({pxValue:r,remValue:a})}));var l=function(e,t){var n="<tr>";e.forEach((function(e){var o=e.name?'<span class="tableSuccessFailedText">'.concat(e.name,"</span>"):'<span class="tableSuccessFailedText">❌</span>';n+="\n                <td ".concat(t?'class="tableSuccessFont"':'class="tableFailedFont"',">").concat(e.pxValue," | ").concat(e.remValue," | ").concat(o,"</td>\n            ")})),n+="</tr>",o.innerHTML+=n},u=function(e,t){var n=[],o=0;e.forEach((function(e){n.push(e),++o===a&&(l(n,t),n=[],o=0)})),n.length>0&&l(n,t)};return u(c,!0),s.length>0&&(o.innerHTML+='<tr><td class="tableSeparator" colspan="'.concat(a,'">.·´¯`(&gt;▂&lt;)´¯`·.</td></tr>')),u(s,!1),{matchedCount:c.length,unmatchedCount:s.length,totalCount:e.length}}(s.fontSizes,u,"fontSizeHeader");c("backgroundColorSection",i.totalCount,i.matchedCount,i.unmatchedCount),c("textColorSection",d.totalCount,d.matchedCount,d.unmatchedCount),c("fontSizeSection",m.totalCount,m.matchedCount,m.unmatchedCount)}document.querySelector(".switch input").checked?(document.getElementById("accordionResults").style.display="grid",document.getElementById("results").style.display="none"):(document.getElementById("results").style.display="flex",document.getElementById("accordionResults").style.display="none"),document.getElementById("noResults").style.display="none"}};l.addEventListener("change",u);var i=function(t,n){e();var o,a=document.getElementById("selectorType").value;("searchById"===n?t.startsWith("#")||(t="#".concat(t)):"searchElement"===n?t=function(e,t){switch(e.toLowerCase()){case"custom":default:return t;case"id":return"#".concat(t);case"class":return".".concat(t);case"name":return'[name="'.concat(t,'"]');case"tag":return"".concat(t)}}(a,t):"analyzePage"===n&&(t="*"),function(e){try{document.createDocumentFragment().querySelector(e)}catch(e){return!1}return!0}(t))?(o="*"===t?"analyzePage":"searchById"===n?"analyzeElementAndChildren":"analyzeElement",chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{action:o,selector:t},(function(e){if(chrome.runtime.lastError)console.error("Error al recibir respuesta (っ °Д °;)っ:",chrome.runtime.lastError.message);else if(e){var n=e.bgColors,o=e.textColors,a=e.fontSizes;!1===e.elementFound?r('Element "'.concat(t,'" not found!')):(s={bgColors:n,textColors:o,fontSizes:a},u())}}))}))):r('Invalid selector "'.concat(t,'". Please enter a valid selector!'))};document.addEventListener("DOMContentLoaded",(function(){document.getElementById("analyzeButton").addEventListener("click",(function(){i("*","analyzePage")})),document.getElementById("searchByIdButton").addEventListener("click",(function(){e();var t=document.getElementById("idSelector").value.trim();t?i(t,"searchById"):r("Please enter a valid ID!")})),document.getElementById("searchButton").addEventListener("click",(function(){e();var t=document.getElementById("elementSelector").value.trim();t?i(t,"searchElement"):r("Please enter a valid selector!")})),document.getElementById("idSelector").addEventListener("keydown",(function(e){"Enter"===e.key&&(e.preventDefault(),document.getElementById("searchByIdButton").click())})),document.getElementById("elementSelector").addEventListener("keydown",(function(e){"Enter"===e.key&&(e.preventDefault(),document.getElementById("searchButton").click())}))}))})();