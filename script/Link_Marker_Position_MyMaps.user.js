// ==UserScript==
// @name         Link Marker Position MyMaps
// @namespace    https://github.com/Levratti/GeCoScript
// @version      0.2
// @description  Crea link pee visulazzare il marker su Google Maps
// @author       Ruslan Dzyuba(Trorker)
// @match        https://www.google.com/maps/d/u/0/edit?*
// @icon         https://www.gstatic.com/mapspro/images/favicon-001.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    setInterval(update, 100);

    function update() {

        const MarekerPositions = document.querySelector("#infowindow-measurements > li");
        const linkCreate = document.querySelector("#linkCreate");
        if (linkCreate == null) {
            if (MarekerPositions !== null) {
                let coordinates = MarekerPositions.textContent.split(', ');
                let linkMap = 'http://www.google.com/maps/place/' + coordinates[0].replace(",", ".") + ',' + coordinates[1].replace(",", ".");
                MarekerPositions.innerHTML = '<a id="linkCreate" href="' + linkMap + '" target="_blank">' + MarekerPositions.textContent + '</a>';
            }
        }
    }

})();