// ==UserScript==
// @name         Extra Sidebar Links
// @namespace    https://github.com/AMiller42/Userscripts
// @version      1.0
// @description  Adds Meta and Chat links to the SE sidebar
// @author       Aaron Miller
// @exclude      *://chat.*.stackexchange.com/*
// @match        *://*.stackexchange.com/*
// @match        *://stackoverflow.com/*
// @match        *://meta.stackoverflow.com/*
// @grant        none
// ==/UserScript==

(function() {
    var meta;
    var main;
    var chat = "https://chat.stackexchange.com/?tab=site&host=";
    var here = location.href;
    
    if (here.match(/meta.stackoverflow.com/)) { // Links if at MSO
        main = "https://stackoverflow.com/questions";
        chat = "https://chat.stackoverflow.com";
        
    } else if (here.match(/stackoverflow.com/)) { // Links if at SO
        meta = "https://meta.stackoverflow.com/questions";
        chat = "https://chat.stackoverflow.com";
        
    } else if (here.match(/\.meta.stackexchange.com/)) { // Links if at *MSE
        main = here.replace(/.meta./, ".");
        main = main.match(/http.*\.com/)[0] + "/questions";
        chat += main.match(/\/\/.*.com/)[0].slice(2);
        
    } else if (here.match(/meta.stackexchange.com/)) { // Links if at MM
        chat = "https://chat.meta.stackexchange.com";
        
    } else if (here.match(/.*.stackexchange.com/)) { // Links if at *SE
        meta = here.replace(/.stack/, ".meta.stack");
        meta = meta.match(/http.*.com/)[0] + "/questions";
        chat += here.match(/\/\/.*.com/)[0].slice(2);
    }


    var container = document.querySelector("#nav-questions").parentNode.parentNode.parentNode.parentNode;
    var metaList = document.createElement("li");
    var metaLink = document.createElement("a");
    var metaBox = document.createElement("div");
    var metaText = document.createElement("div");

    var chatList = document.createElement("li");
    var chatLink = document.createElement("a");
    var chatBox = document.createElement("div");
    var chatText = document.createElement("div");

    metaLink.className = "p18 nav-links--link";
    metaBox.className = "d-flex ai-center";
    metaText.className = "flex--item truncate";

    chatLink.className = "p18 nav-links--link";
    chatBox.className = "d-flex ai-center";
    chatText.className = "flex--item truncate";

    if (meta) metaText.textContent = "Meta";
    if (main) metaText.textContent = "Main";
    chatText.textContent = "Chat"

    metaBox.appendChild(metaText);
    metaLink.appendChild(metaBox);
    if (meta) metaLink.href = meta;
    if (main) metaLink.href = main;
    metaList.appendChild(metaLink);

    chatBox.appendChild(chatText);
    chatLink.appendChild(chatBox);
    chatLink.href = chat;
    chatList.appendChild(chatLink);

    container.insertBefore(chatList, container.children[1]);
    container.insertBefore(metaList, container.children[1]);
})();
