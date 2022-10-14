// ==UserScript==
// @name         Send to SENSI
// @namespace    https://github.com/Levratti/tools
// @version      0.2
// @description  Segnare CE inviati alla SENSI come guasti
// @author       Ruslan Dzyuba
// @match        https://geco.impresalevratti.it/admin/backend/contatore*
// @icon         https://www.google.com/s2/favicons?domain=impresalevratti.it
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.importList = function () {

        var saveList = prompt("Please enter CE list:", "");
        if (saveList == null || saveList == "") {
            localStorage.removeItem("listCE");
        } else {


            var options = {'day': '2-digit', 'month': '2-digit', 'year': 'numeric'};
            var date = new Date().toLocaleDateString('it-IT', options);

            const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
            var setData = prompt("Inserire la data di consegnati:", date);
            if (setData == null || setData == "") {
                localStorage.setItem("DataConsegna", date);
            } else {
                if (!regex.test(setData)) {
                    alert("Data inserita (" + setData + ") non è coretta");
                    return
                }
                localStorage.setItem("DataConsegna", setData);
            }


            var res = saveList.split("\r\n");


            document.querySelector("#searchbar").value = res[0];
            /*res.shift();*/

            localStorage.setItem("listCE", JSON.stringify(res));

            document.querySelector("#changelist-search > div > input[type=submit]:nth-child(3)").click();
        }
    }

    const regex = /\/admin\/backend\/contatore\/.*\/change\//g
    if (regex.test(location.pathname)) {
        if (location.hash == "#automatic") {

            var options = {'day': '2-digit', 'month': '2-digit', 'year': 'numeric'};
            var date = new Date().toLocaleDateString('it-IT', options);

            if (localStorage.getItem("DataConsegna")) {
                date = localStorage.getItem("DataConsegna")
            }


            document.querySelector("#id_pallet").innerHTML = '<option value="4284d863-db7e-4721-a4f6-7e91f10ba560">SENSI</option>';
            document.querySelector("#id_guasto").checked = true;
            document.querySelector("#id_data_resa_guasto_0").value = date;
            document.querySelector("#id_data_resa_guasto_1").value = "08:00:00";
            document.querySelector("#contatore_form > div > div.submit-row > input.default").click();
        }
        return
    } else {
        var btnS = document.createElement("li");
        btnS.innerHTML = '<a href="javascript:importList();" class="historylink">Import List</a>';

        var contBtnS = document.querySelector("#content-main > ul");
        contBtnS.insertBefore(btnS, contBtnS.childNodes[0]);


        if (localStorage.getItem("listCE")) {
            var ListCE = JSON.parse(localStorage.getItem("listCE"));

            if (ListCE.length == 0) {
                localStorage.removeItem("listCE");
                localStorage.removeItem("DataConsegna");
                return;
            }

            var check = document.querySelector("#result_list > tbody > tr > th > a").text;
            if (check == ListCE[0]) {

                ListCE.shift();
                localStorage.setItem("listCE", JSON.stringify(ListCE));

                var url = document.querySelector("#result_list > tbody > tr > th > a").href;
                url += "#automatic"
                window.open(url, "_top");
            } else {
                document.querySelector("#searchbar").value = ListCE[0];
                document.querySelector("#changelist-search > div > input[type=submit]:nth-child(3)").click();
            }
        }
    }
})();