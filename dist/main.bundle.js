(()=>{"use strict";var e=function(){document.querySelectorAll("#results tbody").forEach((function(e){e.innerHTML=""})),document.getElementById("results").style.display="none",document.getElementById("noResults").style.display="none"},t=function(e){var t=document.getElementById("noResults");t.innerText=e,t.style.display="block",document.getElementById("results").style.display="none",document.getElementById("accordionResults").style.display="none"},n=function(e,t){var n="<tr>";e.forEach((function(e){n+='\n            <td class="color-box" style="background-color: '.concat(e,';"></td>\n            <td>').concat(e,"</td>\n        ")})),n+="</tr>",t.innerHTML+=n},o=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,c=[],l=0;e.forEach((function(e){c.push(e),++l===o&&(n(c,t),c=[],l=0)})),c.length>0&&n(c,t)},c=null,l=document.querySelector(".switch input"),r=function(){var e=l.checked;if(c){if(e)!function(e,t,n){var o=document.getElementById("accordionResults");o.innerHTML="";var c=function(e,t){var n='\n            <div class="accordion-item">\n                <button class="accordion">'.concat(e,'</button>\n                <div class="panel">\n                    <ul class="panelContent">\n                        ').concat(t.map((function(e){return"<li>".concat(e,"</li>")})).join(""),"\n                    </ul>\n                </div>\n            </div>\n        ");o.innerHTML+=n};c("Background Colors",e),c("Text Colors",t),c("Font Sizes",n),requestAnimationFrame((function(){document.querySelectorAll(".accordion").forEach((function(e){var t=e.nextElementSibling;t.style.maxHeight=t.scrollHeight+"px",e.addEventListener("click",(function(){t.style.maxHeight?t.style.maxHeight=null:t.style.maxHeight=t.scrollHeight+"px"}))}))})),o.style.display="block"}(c.bgColors,c.textColors,c.fontSizes);else{var t=document.getElementById("resultBackgroundColors"),n=document.getElementById("resultTextColors"),r=document.getElementById("resultFontSizes");o(c.bgColors,t),o(c.textColors,n),function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5,c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:2,l=e.length,r=Math.min(o,l),a=Math.min(c,Math.ceil(l/r));document.getElementById(n).setAttribute("colspan",r);for(var s=0,d=0;d<a;d++){for(var i="<tr>",u=0;u<r;u++)if(s<l){var m=e[s].split(" ");i+="<td>".concat(m.join(" | "),"</td>"),s++}else i+="<td></td>";i+="</tr>",t.innerHTML+=i}}(c.fontSizes,r,"fontSizeHeader")}document.querySelector(".switch input").checked?(document.getElementById("accordionResults").style.display="block",document.getElementById("results").style.display="none"):(document.getElementById("results").style.display="block",document.getElementById("accordionResults").style.display="none"),document.getElementById("noResults").style.display="none"}};l.addEventListener("change",r);var a=function(n,o){e();var l,a=document.getElementById("selectorType").value;("searchById"===o?n.startsWith("#")||(n="#".concat(n)):"searchElement"===o?n=function(e,t){switch(e.toLowerCase()){case"custom":default:return t;case"id":return"#".concat(t);case"class":return".".concat(t);case"name":return'[name="'.concat(t,'"]');case"tag":return"".concat(t)}}(a,n):"analyzePage"===o&&(n="*"),function(e){try{document.createDocumentFragment().querySelector(e)}catch(e){return!1}return!0}(n))?(l="*"===n?"analyzePage":"searchById"===o?"analyzeElementAndChildren":"analyzeElement",chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{action:l,selector:n},(function(e){if(chrome.runtime.lastError)console.error("Error al recibir respuesta (っ °Д °;)っ:",chrome.runtime.lastError.message);else if(e){var o=e.bgColors,l=e.textColors,a=e.fontSizes;!1===e.elementFound?t('Element "'.concat(n,'" not found!')):(c={bgColors:o,textColors:l,fontSizes:a},r())}}))}))):t('Invalid selector "'.concat(n,'". Please enter a valid selector!'))};document.addEventListener("DOMContentLoaded",(function(){document.getElementById("analyzeButton").addEventListener("click",(function(){a("*","analyzePage")})),document.getElementById("searchByIdButton").addEventListener("click",(function(){e();var n=document.getElementById("idSelector").value.trim();n?a(n,"searchById"):t("Please enter a valid ID!")})),document.getElementById("searchButton").addEventListener("click",(function(){e();var n=document.getElementById("elementSelector").value.trim();n?a(n,"searchElement"):t("Please enter a valid selector!")})),document.getElementById("idSelector").addEventListener("keydown",(function(e){"Enter"===e.key&&(e.preventDefault(),document.getElementById("searchByIdButton").click())})),document.getElementById("elementSelector").addEventListener("keydown",(function(e){"Enter"===e.key&&(e.preventDefault(),document.getElementById("searchButton").click())}))}))})();