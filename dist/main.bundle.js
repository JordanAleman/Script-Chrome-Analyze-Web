(()=>{"use strict";var e=function(){document.getElementById("resultBackgroundColors").innerHTML="",document.getElementById("resultTextColors").innerHTML="",document.getElementById("resultFontSizes").innerHTML="",document.getElementById("results").style.display="none",document.getElementById("noResults").style.display="none"},t=function(e){var t=document.getElementById("noResults");t.innerText=e,t.style.display="block",document.getElementById("results").style.display="none"},n=function(e,t){var n="<tr>";e.forEach((function(e){n+='\n            <td class="color-box" style="background-color: '.concat(e,';"></td>\n            <td>').concat(e,"</td>\n        ")})),n+="</tr>",t.innerHTML+=n},o=function(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,r=[],c=0;e.forEach((function(e){r.push(e),++c===o&&(n(r,t),r=[],c=0)})),r.length>0&&n(r,t)},r=function(n,r){e();var c=document.getElementById("selectorType").value;if("searchById"===r?n.startsWith("#")||(n="#".concat(n)):"searchElement"===r?n=function(e,t){switch(e.toLowerCase()){case"custom":default:return t;case"id":return"#".concat(t);case"class":return".".concat(t);case"name":return'[name="'.concat(t,'"]');case"tag":return"".concat(t)}}(c,n):"analyzePage"===r&&(n="*"),function(e){try{document.createDocumentFragment().querySelector(e)}catch(e){return!1}return!0}(n)){var l="*"===n?"analyzePage":"searchById"===r?"analyzeElementAndChildren":"analyzeElement";chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{action:l,selector:n},(function(e){if(chrome.runtime.lastError)console.error("Error al recibir respuesta (っ °Д °;)っ:",chrome.runtime.lastError.message);else if(e){var r=e.bgColors,c=e.textColors,l=e.fontSizes;if(!1===e.elementFound)return void t('Element "'.concat(n,'" not found!'));var a=document.getElementById("resultBackgroundColors"),d=document.getElementById("resultTextColors"),s=document.getElementById("resultFontSizes");o(r,a),o(c,d),function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:2,c=e.length,l=Math.min(o,c),a=Math.min(r,Math.ceil(c/l));document.getElementById(n).setAttribute("colspan",l);for(var d=0,s=0;s<a;s++){for(var u="<tr>",i=0;i<l;i++)if(d<c){var m=e[d].split(" ");u+="<td>".concat(m.join(" | "),"</td>"),d++}else u+="<td></td>";u+="</tr>",t.innerHTML+=u}}(l,s,"fontSizeHeader"),document.getElementById("results").style.display="block",document.getElementById("noResults").style.display="none"}}))}))}else t('Invalid selector "'.concat(n,'". Please enter a valid selector!'))};document.addEventListener("DOMContentLoaded",(function(){document.getElementById("analyzeButton").addEventListener("click",(function(){r("*","analyzePage")})),document.getElementById("searchByIdButton").addEventListener("click",(function(){e();var n=document.getElementById("idSelector").value.trim();n?r(n,"searchById"):t("Please enter a valid ID!")})),document.getElementById("searchButton").addEventListener("click",(function(){e();var n=document.getElementById("elementSelector").value.trim();n?r(n,"searchElement"):t("Please enter a valid selector!")})),document.getElementById("idSelector").addEventListener("keydown",(function(e){"Enter"===e.key&&(e.preventDefault(),document.getElementById("searchByIdButton").click())})),document.getElementById("elementSelector").addEventListener("keydown",(function(e){"Enter"===e.key&&(e.preventDefault(),document.getElementById("searchButton").click())}))}))})();