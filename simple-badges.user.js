// ==UserScript==
// @name         Simple Badges
// @namespace    http://tampermonkey.net/
// @version      1.4.1
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

    // Change "hexagon" to "logo" to change the staff badge
    let changeStaffBadge = hexagon;


    // Hexagon staff badge
    function hexagon(user) {
        user.outerHTML =
`<span title="Staff"
    style="color: orange; cursor: default; padding-left: 4px;">⬢
</span>`
    }

    // Logo staff badge
    function logo(user) {
        user.outerHTML = `
<span title="Staff" style="cursor: default;">
    <span>
        <svg xmlns="http://www.w3.org/2000/svg"
            width="13px"
            height="13px"
            viewbox="0 0 100 100">
            <style>
                .st0{
                    fill:#bcbbbb;
                    height: 100%;
                    width: 100%
                }
                .st1{
                    fill:#f48023;
                    height:100%;
                    width:100%
                }
            </style>
            <path
                class="st0"
                d="M84.4 93.8V70.6h7.7v30.9H22.6V70.6h7.7v23.2z">
            </path>
            <path
                class="st1"
                d="M38.8 68.4l37.8 7.9 1.6-7.6-37.8-7.9-1.6 7.6zm5-18l35 16.3 3.2-7-35-16.4-3.2 7.1zm9.7-17.2l29.7 24.7 4.9-5.9-29.7-24.7-4.9 5.9zm19.2-18.3l-6.2 4.6 23 31 6.2-4.6-23-31zM38 86h38.6v-7.7H38V86z">
            </path>
        </svg>
    </span>
</span>`;
    }

    function simplify() {
        let mods = document.getElementsByClassName("s-badge__moderator");
        let staff = document.getElementsByClassName("s-badge__staff");

        // Swap staff and mod badges if both exist
        Object.values(staff).forEach((user)=>{
            if (/title="Moderator"/.test(user.parentNode.innerHTML)) {
                let temp = Object.values(user.parentNode.children);
                [temp[1], temp[2]] = [temp[2], temp[1]];

                let res ="";
                temp.forEach((element)=>{res += element.outerHTML});

                user.parentNode.innerHTML = res;
            }
        });

        // Replace mod badges
        Object.values(mods).forEach(diamond => {
            diamond.outerHTML =
`<span title="Moderator">
    <a style="cursor: default;"> ♦</a>
</span>`
        });

        // Replace staff badges
        Object.values(staff).forEach(changeStaffBadge);

    }

    simplify();

    // Update badges when comments are expanded
    let expandComments = document.getElementsByClassName("js-show-link");

    Object.values(expandComments).forEach(link => {
        let linkObserver = new MutationObserver(simplify)

        linkObserver.observe(link, {childList: true})
    });
})();
