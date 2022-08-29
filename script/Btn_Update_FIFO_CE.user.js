// ==UserScript==
// @name         Aggiornamenti urgenza contatori GeCo
// @namespace    https://github.com/Levratti/GeCoScript
// @version      0.1
// @description  Aggiunta tasto per aggiornare urgenza contatori 2G.
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/dashboard/fifo/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=impresalevratti.it
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // Your code here...
    window.getCookie = function(name) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
    }

    window.sendData = function(servURL, params, method){
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", servURL);
            xhr.onload= (event) => resolve(event.target);

            var form = document.createElement("form");
            form.setAttribute("method", method);
            form.setAttribute("id", "myFormId");
            form.setAttribute("action", servURL);
            for(var key in params) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
                form.appendChild(hiddenField);
            }
            document.body.appendChild(form);


            var formData = new FormData(document.getElementById("myFormId"));
            xhr.send(formData);
        })
    }

    window.update = function(){
        var options = {
            csrfmiddlewaretoken: "<Inject JavaScript>",
            _save: "Salva",
            //_continue: "Salva e continua le modifiche"
        }

        options.csrfmiddlewaretoken = window.getCookie("csrftoken");


        let urlPost = "https://geco.impresalevratti.it/admin/tasks/updateurgenzacontatoritask/add/";

        var result = window.sendData(urlPost, options,'post');


        if (result.status == 200) {
            console.log(result)
        }

    }

    document.querySelector("#content > div:nth-child(5)").innerHTML += '&nbsp;&nbsp;&nbsp;<a href="javascript:update();"> <i class="fa fa-refresh" aria-hidden="true"></i> Update</a>'

})();