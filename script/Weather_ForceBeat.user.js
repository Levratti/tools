// ==UserScript==
// @name         Weather ForceBeat
// @namespace    https://github.com/Levratti/tools
// @version      0.3
// @description  Previsioni meteo su ForceBeat
// @author       Ruslan Dzyuba(Trorker)
// @match        https://it-forcebeatw.enelint.global/geocallfbi/w/Servlet?*
// @icon         https://www.google.com/s2/favicons?domain=impresalevratti.it
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /* Update
    0.1: Prima versione
    0.2: Aggiunto la posibilita di scegliere città premendo sul meteo. (c'è da fare controlle della città inserita corettamnte e aggiornameno della città dopo inserimento)
    0.3: Aggiunto la ottimizzaione delle richieste API, adesso vengono salvati ed aggiornati ogni ora (c'e' da aggiungere aggiornamento se cambia la cità)
    */

    window.httpGet = function(theUrl) { //https://geocode.xyz/bologna?json=1 serve per avere le cordinate della cità
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    window.getWeather = function() {
        let lat = 44.8872071;
        let lon = 11.0661063;
        let city = "Mirandola"
        if (localStorage.getItem("WeatherCity")) {
            var jsonCity = JSON.parse(localStorage.getItem("WeatherCity"))
            city = jsonCity.city
            lat = jsonCity.lat;
            lon = jsonCity.lon;
            console.log(jsonCity.city);
        }
        const OpenweathermapAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&lang=it&units=metric&exclude=current,minutely,hourly,alerts&appid=5d1cc54da33835860a781b683bac4029";//"https://api.openweathermap.org/data/2.5/forecast?q=BOLOGNA&lang=it&cnt=30&appid=5d1cc54da33835860a781b683bac4029";
        let Weather = JSON.parse(window.httpGet(OpenweathermapAPI));

        let WeatherDay = {
            OpenweathermapDATA: Weather,
            CityDATA: jsonCity,
            timestamp: new Date().getTime(),
        }
        return WeatherDay;
    }

    window.getCityCordinate = function() {
        var city = prompt("Please enter city:", "");
        console.log(city);
        if (city == null || city == "") {
            return 0;
        }
        const cityAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=5d1cc54da33835860a781b683bac4029";
        let jsonCity = JSON.parse(window.httpGet(cityAPI));

        let saveCity = {
            city: jsonCity[0].name,
            lat: jsonCity[0].lat,
            lon: jsonCity[0].lon,
        }
        localStorage.setItem("WeatherCity", JSON.stringify(saveCity));
    }

    setInterval(function(){
        var LoadFB = document.querySelector("div[id^='AFRAME_']");
        var LoadWeather = document.querySelector("#iconMeteo");
        if (LoadFB != null && LoadWeather == null) {

            var Element = document.querySelector("div[id^='AFRAME_'] > div.tvCaption.tableViewDailyPlainCaption > div > div > div.tvCaptionContainerSection.tvCaptionContainerSectionRight.tableViewDailyPlainCaptionContainerSectionRight.right > div.dateSelectorWrapper");

            if (Element != null) {
                var date = Element.childNodes[1].children[0].value;
                var Data = date.split('/');
                let SelectData = new Date(Data[2], Data[1] - 1, Data[0]);
                let CurrentData = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                const diffTime = Math.abs(SelectData - CurrentData);
                const diffDays = /*Math.ceil*/(Math.abs(diffTime) / (1000 * 60 * 60 * 24)).toFixed(0);

                if (diffDays >= 0 && diffDays <= 7 && SelectData >= CurrentData) {


                    let Weather = null;
                    if (localStorage.getItem("WeatherDay")) {
                        let WeatherData = JSON.parse(localStorage.getItem("WeatherDay"));
                        if ( (new Date().getTime() - WeatherData.timestamp) <= 3600000 /*1 hour -> 60*60*1000 */) {                            Weather = WeatherData;
                        } else {
                            Weather = window.getWeather();
                            localStorage.setItem("WeatherDay", JSON.stringify(Weather));
                        }
                    } else {
                        Weather = window.getWeather();
                        localStorage.setItem("WeatherDay", JSON.stringify(Weather));
                    }



                    /**/

                    console.log(Weather.OpenweathermapDATA.daily[diffDays]);

                    var iconMeteo = document.createElement("div");
                    iconMeteo.setAttribute("class", "dateSelectorItem");
                    iconMeteo.setAttribute("style", "font-size: 10px; display: inline-flex;");
                    iconMeteo.setAttribute("id", "iconMeteo");
                    iconMeteo.innerHTML = (Weather.OpenweathermapDATA.daily[diffDays].temp.day).toFixed(0) + ' °C <img onClick="window.getCityCordinate()" src="https://openweathermap.org/img/wn/' + Weather.OpenweathermapDATA.daily[diffDays].weather[0].icon + '@2x.png" tooltip="' + Weather.CityDATA.city + " - " + Weather.OpenweathermapDATA.daily[diffDays].weather[0].description + " (aggiornato al:" + new Date(Weather.timestamp).toTimeString().split(' ')[0] + ')" class="icon" style="filter: contrast(300%); height: 40px; width: 40px; margin-top: -8px; cursor: pointer;">';//style="filter: invert(100%)"

                    Element.prepend(iconMeteo);

                }
            }
        }
    }, 500);

})();
