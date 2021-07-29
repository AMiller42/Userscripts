// ==UserScript==
// @name         Simple Badges
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replaces new mod/staff badges with diamonds/hexagons, respectively
// @author       Aaron Miller
// @match        *://*.meta.stackexchange.com/*
// @match        *://meta.stackexchange.com/*
// @match        *://meta.stackoverflow.com/*
// @icon         https://www.google.com/s2/favicons?domain=stackexchange.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var mods = document.getElementsByClassName("s-badge__moderator");
    var staff = document.getElementsByClassName("s-badge__staff");

    Object.values(mods).forEach(diamond => {
        diamond.className = "";
        diamond.style.color = "#2558C1";
        diamond.title = "Moderator";
        diamond.innerHTML = " ♦";
    });

    Object.values(staff).forEach(hexagon => {
        hexagon.className = "";
        hexagon.style.color = "orange";
        hexagon.title = "Staff";
        hexagon.innerHTML = " ⬢";
    });
})();
