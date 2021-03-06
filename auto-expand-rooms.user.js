// ==UserScript==
// @name         Auto-expand Rooms
// @namespace    https://github.com/AMiller42/Userscripts
// @version      1.1
// @description  Automatically expand current rooms in SE Chat sidebar
// @author       Aaron Miller
// @match        https://chat.stackexchange.com/*
// @match        https://chat.stackoverflow.com/*
// ==/UserScript==



(function() {

    // Change this value to change the size of the room list.
    // Do this if it is too big, or not big enough.
    let roomListSize = 150;

    let style = document.createElement("style");

    // Add custom scrollbar for room list
    style.innerHTML =
      `#room-div {
           max-height: ${roomListSize}px;
           overflow: auto;
       }

       #room-div::-webkit-scrollbar {
            width: 6px;
        }

        #room-div::-webkit-scrollbar-track {
            background: transparent;
        }

        #room-div::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }

        #room-div::-webkit-scrollbar-thumb:hover {
            background: #555;
        }`;

    // Prevent rooms from collapsing again
    style.innerHTML += `
        [class^="activity-"] {
            display: block !important;
        }
    `;

    document.head.appendChild(style);


    function expandRooms() {
        let rooms = document.getElementById("my-rooms");

        // Remove the link to expand and collapse the room list
        let more = rooms.parentNode.getElementsByClassName("more");
        if (more.length != 0) {
            Object.values(more).forEach(element => {
                element.remove();
            });
        }

        // Make all of the rooms display
        for (let room of rooms.children) {
            room.style.display = "block";
        }

        rooms.outerHTML = "<div id=\"room-div\">" + rooms.outerHTML + "</div>";

    }

    let loadScreen = document.getElementById("loading");
    let loaded = false;

    // Create an observer to tell when the chat is loaded
    let loading = new MutationObserver((_, observer) => {
        if (loadScreen.style.opacity < 0.001) {
            if (!loaded) {
                loaded = true;
                setTimeout(expandRooms, 250);
                observer.disconnect();
            }
        }
    });

    loading.observe(loadScreen, {attributes: true});
})();
