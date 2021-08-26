// ==UserScript==
// @name         Simple Badges
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replaces new mod/staff badges with diamonds/hexagons, respectively
// @author       Aaron Miller
// @match        *://*.meta.stackexchange.com/*
// @match        *://meta.stackexchange.com/*
// @match        *://*.stackoverflow.com/*
// @icon         https://www.google.com/s2/favicons?domain=stackexchange.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function simplify() {
        let mods = document.getElementsByClassName("s-badge__moderator");
        let staff = document.getElementsByClassName("s-badge__staff");

        Object.values(mods).forEach(diamond => {
            let anchor = document.createElement("a");
            diamond.className = "";
            diamond.title = "Moderator";
            diamond.innerHTML = "";
            anchor.innerHTML = " ♦";
            anchor.style.cursor = "default";
            diamond.appendChild(anchor); // Super cursed, but it works, so...
        });

        Object.values(staff).forEach(hexagon => {
            hexagon.className = "";
            hexagon.style.color = "orange";
            hexagon.style.cursor = "default";
            hexagon.title = "Staff";
            hexagon.innerHTML = " ⬢";
        });
    }
    
    simplify();
    
    let expandComments = document.getElementsByClassName("js-show-link");
    
    Object.values(expandComments).forEach(link => {
        let linkObserver = new MutationObserver(simplify)

        linkObserver.observe(link, {childList: true})
    });
})();
