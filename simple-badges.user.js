// ==UserScript==
// @name         Simple Badges
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replaces new mod/staff badges with diamonds/hexagons, respectively
// @author       Aaron Miller
// @match        *://*.meta.stackexchange.com/*
// @match        *://meta.stackexchange.com/*
// @match        *://*meta.stackoverflow.com/*
// @icon         https://www.google.com/s2/favicons?domain=stackexchange.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var mods = document.getElementsByClassName("s-badge__moderator");
    var staff = document.getElementsByClassName("s-badge__staff");

    Object.values(mods).forEach(diamond => {
        var anchor = document.createElement("a");
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
})();
