(()=>{"use strict";var t=function(){document.querySelectorAll("#results tbody").forEach((function(t){t.innerHTML=""})),document.getElementById("results").style.display="none",document.getElementById("noResults").style.display="none"},e=function(t){var e=document.getElementById("noResults");e.innerText=t,e.style.display="flex",document.getElementById("results").style.display="none",document.getElementById("accordionResults").style.display="none"},n=function(){document.querySelector(".switch input").checked?(document.getElementById("accordionResults").style.display="grid",document.getElementById("results").style.display="none"):(document.getElementById("results").style.display="flex",document.getElementById("accordionResults").style.display="none"),document.getElementById("noResults").style.display="none"};document.addEventListener("DOMContentLoaded",(function(){document.querySelector(".switch input").checked=!0,n()}));var r=function(t,e,n,r){var o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=document.querySelector("#".concat(t," .summary")),c=o?"Skapa: ".concat(n):"✔: ".concat(n),l=o?"No Skapa: ".concat(r):"❌: ".concat(r);a.innerHTML='\n        <span class="summaryInfo">Nº: '.concat(e,'</span>\n        <span class="summarySkapa">').concat(c,'</span>  \n        <span class="summaryNoSkapa">').concat(l,"</span>\n    ")},o=function(t,e,n,r){var o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=document.getElementById(t).querySelector(".summary"),c=o?"With Alt: ".concat(n):"✔: ".concat(matchedCount),l=o?"Without Alt: ".concat(r):"❌: ".concat(unmatchedCount);a.innerHTML='\n        <span class="summaryInfo">Total Images: '.concat(e,'</span>\n        <span class="summarySkapa">').concat(c,'</span>  \n        <span class="summaryNoSkapa">').concat(l,"</span>\n    ")};const a=JSON.parse('{"T":{"stone-100":"#FFFFFF","stone-200":"#F5F5F5","stone-300":"#EEEEEE","stone-400":"#DFDFDF","stone-500":"#CCCCCC","stone-600":"#B7B7B7","stone-700":"#929292","stone-800":"#8C8C8C","stone-900":"#828282","stone-1000":"#767676","stone-1100":"#707070","stone-1200":"#545454","stone-1300":"#484848","stone-1400":"#333333","stone-1500":"#242424","stone-1600":"#111111","stone-1700":"#000000","sky-1500":"#40b1E1","sky-2500":"#489CE3","sky-3500":"#007CC1","sky-4500":"#0061B4","sky-5500":"#0058A3","sky-5600":"#004F93","sky-5700":"#003E72","lingonberry-1500":"#FB6579","lingonberry-2500":"#ED5A51","lingonberry-3500":"#E00751","lingonberry-3600":"#CC003D","lingonberry-3700":"#B80029","lingonberry-4500":"#CC0008","sun-1500":"#FFDB00","sun-2500":"#F5B460","sun-3500":"#FFA524","sun-4500":"#EC773E","sun-5500":"#CA5008","sun-6500":"#F26A2F","forest-1500":"#7EC76D","forest-2500":"#5CC27C","forest-3500":"#0A8A00","forest-4500":"#00853E","wood-1000":"#DEBC9C"},"z":{"font-size-20":0.625,"font-size-25":0.6875,"font-size-50":0.75,"font-size-75":0.875,"font-size-100":1,"font-size-200":1.125,"font-size-300":1.25,"font-size-400":1.375,"font-size-500":1.5,"font-size-600":1.75,"font-size-700":2,"font-size-800":2.25,"font-size-900":2.5,"font-size-1000":3,"font-size-1100":3.25,"font-size-1200":3.5,"font-size-1300":4,"font-size-1400":4.5,"font-size-1500":5,"font-size-1600":6}}');function c(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a,c,l=[],s=!0,i=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=a.call(n)).done)&&(l.push(r.value),l.length!==e);s=!0);}catch(t){i=!0,o=t}finally{try{if(!s&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(i)throw o}}return l}}(t,e)||function(t,e){if(t){if("string"==typeof t)return l(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var s=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3;e.innerHTML="";var r=[],o=[];t.forEach((function(t){var e=Object.entries(a.T).find((function(e){var n=c(e,2);return n[0],n[1].toLowerCase()===t.toLowerCase()}));e?r.push({color:t,name:e[0]}):o.push({color:t})})),r.sort((function(t,e){return t.name.localeCompare(e.name)}));var l=function(t,n){var r="<tr>";t.forEach((function(t){var e=t.name?t.name:'<span class="tableSuccessFailedText">❌</span>',o=n?'class="tableSuccess"':"";r+='\n                <td class="color-box" style="background-color: '.concat(t.color,';"></td>\n                <td>').concat(t.color,"</td>\n                <td ").concat(o,">").concat(e,"</td>\n            ")})),r+="</tr>",e.innerHTML+=r},s=function(t,e){var r=[],o=0;t.forEach((function(t){r.push(t),++o===n&&(l(r,e),r=[],o=0)})),r.length>0&&l(r,e)};return s(r,!0),o.length>0&&(e.innerHTML+='<tr><td class="tableSeparator" colspan="'.concat(3*n,'"></td></tr>')),s(o,!1),{matchedCount:r.length,unmatchedCount:o.length,totalCount:t.length}},i=function(t,e){var n=t.replace(/\s+/g,"");return n.charAt(0).toLowerCase()+n.slice(1)+e};function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a,c,l=[],s=!0,i=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=a.call(n)).done)&&(l.push(r.value),l.length!==e);s=!0);}catch(t){i=!0,o=t}finally{try{if(!s&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(i)throw o}}return l}}(t,e)||function(t,e){if(t){if("string"==typeof t)return d(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function m(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a,c,l=[],s=!0,i=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=a.call(n)).done)&&(l.push(r.value),l.length!==e);s=!0);}catch(t){i=!0,o=t}finally{try{if(!s&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(i)throw o}}return l}}(t,e)||function(t,e){if(t){if("string"==typeof t)return f(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var h=function(){var t=document.getElementById("accordionResults");t.innerHTML="";for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];var c=n.map((function(t){var e=m(t,2),n=e[0],r=e[1],o=[],c=[];r.forEach((function(t){var e;n.includes("Color")?e=function(t){var e,n=t.toLowerCase(),r="❌";return Object.values(a.T).map((function(t){return t.toLowerCase()})).includes(n)?(r=Object.keys(a.T).find((function(t){return a.T[t].toLowerCase()===n})),e="".concat(t," | ").concat(r)):e="".concat(t," | ❌"),{processedItem:e,isMatched:"❌"!==r}}(t):n.includes("Size")?e=function(t){var e,n=u(t.split(" | "),2)[1],r=Object.entries(a.z).find((function(t){var e=u(t,2)[1];return"".concat(e,"rem")===n})),o="❌";return r?e=function(t,e){var n=u(t.split(" | "),2),r=n[0],o=n[1],a=parseFloat(o).toFixed(3),c=r.padStart(2,"0");return"".concat(c," | ").concat(a,"rem | ").concat(e)}(t,o=r[0]):e="".concat(t," | ❌"),{processedItem:e,isMatched:"❌"!==o}}(t):n.includes("Image Alt")&&(e=function(t){var e="❌"!==t.alt;return{processedItem:e?"<strong>Name:</strong> ".concat(t.name," <br><strong>Alt:</strong> ").concat(t.alt):"".concat(t.name," | ").concat(t.alt),isMatched:e}}(t)),e.isMatched?o.push(e.processedItem):c.push(e.processedItem)}));var l=n.includes("Color"),s=n.includes("Image Alt"),d=function(t,e,n){return e?t.sort((function(t,e){var n=t.split(" | ")[1],r=e.split(" | ")[1];return n.localeCompare(r)})):n?t.sort((function(t,e){return t.localeCompare(e)})):t.sort((function(t,e){var n=t.split(" | ")[2],r=e.split(" | ")[2],o=Object.keys(a.z);return o.indexOf(n)-o.indexOf(r)}))}(o,l,s);return function(t,e,n){return'\n            <div id="'.concat(i(t,"Accordion"),'" class="accordion-item">\n                <button class="accordion">').concat(t,'</button>\n                <div class="panel">\n                    <div class="summary summaryAccordion"></div>\n                    <ul class="panelContentMatched">\n                        ').concat(e.map((function(t){return"<li>".concat(t,"</li>")})).join(""),'\n                    </ul>\n                    <ul class="panelContentUnmatched">\n                        ').concat(n.map((function(t){return"<li>".concat(t,"</li>")})).join(""),"\n                    </ul>\n                </div>\n            </div>\n        ")}(n,d,c)})).join("");t.innerHTML=c,requestAnimationFrame((function(){document.querySelectorAll(".accordion").forEach((function(t){var e=t.nextElementSibling;e.style.maxHeight=e.scrollHeight+"px",t.addEventListener("click",(function(){e.style.maxHeight?e.style.maxHeight=null:e.style.maxHeight=e.scrollHeight+"px"}))}))})),n.forEach((function(t){var e=m(t,2),n=e[0],o=e[1],c=0,l=0,s=i(n,"Accordion");o.forEach((function(t){var e=s.includes("Color"),n=s.includes("Size"),r=s.includes("imageAlt"),o=!1;if(e){var i=t.toLowerCase();o=Object.values(a.T).map((function(t){return t.toLowerCase()})).includes(i)}else if(n){var u=m(t.split(" | "),2)[1].toLowerCase();o=Object.values(a.z).some((function(t){return"".concat(t,"rem").toLowerCase()===u}))}else r&&(o="❌"!==t.alt);o?c++:l++})),r(s,o.length,c,l,!1)}))},y=null,v=document.querySelector(".switch input"),g=function(){var t=document.querySelector("#analyzeContent");"none"!=t.style.display&&(t.style.display="none");var e=document.querySelector('.resultsChooseShow input[type="radio"]:checked');if(e){var r=e.parentElement.textContent.trim(),o=v.checked;y&&(o?h(["Background Colors",y.bgColors],["Text Colors",y.textColors],["Font Sizes",y.fontSizes],["Image Alt",y.imageAlt]):b(r,y),n())}};v.addEventListener("change",g),document.querySelectorAll('.resultsChooseShow input[type="radio"]').forEach((function(t){t.addEventListener("change",g)}));var p=function(n,r){t();var o,a=document.getElementById("selectorType").value;("searchById"===r?n.startsWith("#")||(n="#".concat(n)):"searchElement"===r?n=function(t,e){switch(t.toLowerCase()){case"custom":default:return e;case"id":return"#".concat(e);case"class":return".".concat(e);case"name":return'[name="'.concat(e,'"]');case"tag":return"".concat(e)}}(a,n):"analyzePage"===r&&(n="*"),function(t){try{document.createDocumentFragment().querySelector(t)}catch(t){return!1}return!0}(n))?(o="*"===n?"analyzePage":"searchById"===r?"analyzeElementAndChildren":"analyzeElement",chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{action:o,selector:n},(function(t){if(chrome.runtime.lastError)console.error("Error al recibir respuesta (っ °Д °;)っ:",chrome.runtime.lastError.message);else if(t){var r=t.bgColors,o=t.textColors,a=t.fontSizes,c=t.imageAlt,l=t.aArials;!1===t.elementFound?e('Element "'.concat(n,'" not found!')):(y={bgColors:r,textColors:o,fontSizes:a,imageAlt:c,aArials:l},g())}}))}))):e('Invalid selector "'.concat(n,'". Please enter a valid selector!'))},b=function(t,e){var n,l;switch(t){case"bgColor":document.querySelector("#resultsShow").innerHTML='\n        <div id="backgroundColorSection" class="resultsContainer">\n            <div class="containerResult" >\n                <h2>Used Background Colors (HEX)</h2>\n                <div class="summary"></div>\n            </div>\n            <div class="tableContainer">\n                <table id="bgColorsTable">\n                    <thead>\n                        <tr>\n                            <th>Color</th>\n                            <th>HEX</th>\n                            <th>Skapa name</th>\n                        </tr>\n                    </thead>\n                    <tbody id="resultBackgroundColors"></tbody>\n                </table>\n            </div>\n        </div>\n    ',n=document.getElementById("resultBackgroundColors"),l=s(e.bgColors,n),r("backgroundColorSection",l.totalCount,l.matchedCount,l.unmatchedCount);break;case"color":document.querySelector("#resultsShow").innerHTML='\n        <div id="textColorSection" class="resultsContainer">\n            <div class="containerResult">\n                <h2>Used Colors (HEX)</h2>\n                <div class="summary"></div>\n            </div>\n            <div class="tableContainer">\n                <table id="textColorsTable">\n                    <thead>\n                        <tr>\n                            <th>Color</th>\n                            <th>HEX</th>\n                            <th>Skapa name</th>\n                        </tr>\n                    </thead>\n                    <tbody id="resultTextColors"></tbody>\n                </table>\n            </div>\n        </div>\n    ',n=document.getElementById("resultTextColors"),l=s(e.textColors,n),r("textColorSection",l.totalCount,l.matchedCount,l.unmatchedCount);break;case"fontSize":document.querySelector("#resultsShow").innerHTML='\n        <div id="fontSizeSection" class="resultsContainer">\n            <div class="containerResult">\n                <h2>Used Font Sizes</h2>\n                <div class="summary"></div>\n            </div>\n            <div class="tableContainer">\n                <table id="fontSizesTable">\n                    <thead>\n                        <tr>\n                            <th id="fontSizeHeader" colspan="1">\n                                Font Size\n                            </th>\n                        </tr>\n                    </thead>\n                    <tbody id="resultFontSizes"></tbody>\n                </table>\n            </div>\n        </div>\n    ',n=document.getElementById("resultFontSizes"),l=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;e.innerHTML="";var r=[],o=[];t.forEach((function(t){var e=c(t.split(" | "),2),n=e[0],l=e[1],s=Object.entries(a.z).find((function(t){var e=c(t,2),n=(e[0],e[1]);return"".concat(n,"rem")===l}));s?r.push({pxValue:n,remValue:l,name:s[0]}):o.push({pxValue:n,remValue:l})})),r.sort((function(t,e){return t.name.localeCompare(e.name)}));var l=function(t,n){var r="<tr>";t.forEach((function(t){var e=t.name?'<span class="tableSuccessFailedText">'.concat(t.name,"</span>"):'<span class="tableSuccessFailedText">❌</span>';r+="\n                <td ".concat(n?'class="tableSuccessFont"':'class="tableFailedFont"',">").concat(t.pxValue," | ").concat(t.remValue," | ").concat(e,"</td>\n            ")})),r+="</tr>",e.innerHTML+=r},s=function(t,e){var r=[],o=0;t.forEach((function(t){r.push(t),++o===n&&(l(r,e),r=[],o=0)})),r.length>0&&l(r,e)};return s(r,!0),o.length>0&&(e.innerHTML+='<tr><td class="tableSeparator" colspan="'.concat(n,'"></td></tr>')),s(o,!1),{matchedCount:r.length,unmatchedCount:o.length,totalCount:t.length}}(e.fontSizes,n),r("fontSizeSection",l.totalCount,l.matchedCount,l.unmatchedCount);break;case"imageAlt":document.querySelector("#resultsShow").innerHTML='\n        <div id="imageAltSection" class="resultsContainer">\n            <div class="containerResult">\n                <h2>Image Alt Attributes</h2>\n                <div class="summary"></div>\n            </div>\n            <div class="tableContainer">\n                <table id="imageAltTable">\n                    <thead>\n                        <tr>\n                            <th>Src</th>\n                            <th>Name</th>\n                            <th>Alt</th>\n                        </tr>\n                    </thead>\n                    <tbody id="resultImageAlts"></tbody>\n                </table>\n            </div>\n        </div>\n    ',n=document.getElementById("resultImageAlts"),l=function(t,e){var n=t.length,r=0,o=0;e.innerHTML="";var a="";return t.forEach((function(t){var e="❌"===t.alt?'<span class="tableSuccessFailedText">❌</span>':t.alt;a+='\n            <tr>\n                <td><img src="'.concat(t.src,'" alt="').concat(t.alt,'" style="max-width: 100px; height: auto;"></td>\n                <td>').concat(t.name,"</td>\n                <td>").concat(e,"</td>\n            </tr>\n        "),"❌"===t.alt?o++:r++})),e.innerHTML=a,{totalImages:n,imagesWithAlt:r,imagesWithoutAlt:o}}(e.imageAlt,n),o("imageAltSection",l.totalImages,l.imagesWithAlt,l.imagesWithoutAlt);break;case"aArial":document.querySelector("#resultsShow").innerHTML='\n        <div id="aArialSection" class="resultsContainer">\n            <div class="containerResult">\n                <h2>Aria-label in Anchor Tags</h2>\n                <div class="summary"></div>\n            </div>\n            <div class="tableContainer">\n                <table id="aArialTable">\n                    <thead>\n                        <tr>\n                            <th>Href</th>\n                            <th>Aria-label</th>\n                        </tr>\n                    </thead>\n                    <tbody id="resultAArials"></tbody>\n                </table>\n            </div>\n        </div>\n    ',n=document.getElementById("resultAArials"),l=function(t,e){var n=0,r=0,o=0;return t.forEach((function(t){n++;var a=e.insertRow();a.insertCell(0).textContent=t.href,a.insertCell(1).textContent=t.ariaLabel,"❌"!==t.ariaLabel?r++:o++})),{totalAArials:n,withAriaLabel:r,withoutAriaLabel:o}}(e.aArials,n),o("aArialSection",l.totalAArials,l.withAriaLabel,l.withoutAriaLabel);break;default:console.warn("Unknown selection: ".concat(t))}};document.addEventListener("DOMContentLoaded",(function(){document.getElementById("analyzeButton").addEventListener("click",(function(){p("*","analyzePage")})),document.getElementById("searchByIdButton").addEventListener("click",(function(){t();var n=document.getElementById("idSelector").value.trim();n?p(n,"searchById"):e("Please enter a valid ID!")})),document.getElementById("searchButton").addEventListener("click",(function(){t();var n=document.getElementById("elementSelector").value.trim();n?p(n,"searchElement"):e("Please enter a valid selector!")})),document.getElementById("idSelector").addEventListener("keydown",(function(t){"Enter"===t.key&&(t.preventDefault(),document.getElementById("searchByIdButton").click())})),document.getElementById("elementSelector").addEventListener("keydown",(function(t){"Enter"===t.key&&(t.preventDefault(),document.getElementById("searchButton").click())}))}))})();