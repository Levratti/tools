var app = new Vue({
    el: '#app',
    data: {
        toolsAndScript: [
            {
                URL: "https://levratti.github.io/tools/app/DuplicateValues.html",
                Type: "Tools",
                Title: "Valori Duplicati",
                LastUpdate: "20/04/2022",
                Description: "Serve per verificare i valori duplicati tra dati di GeCo e Enel."
            },
            {
                URL: "http://127.0.0.1:5500/app/DuplicateValues.html",
                Type: "Tools",
                Title: "Exsample",
                LastUpdate: "20/04/2022",
                Description: "Test 2"
            },
            {
                URL: "",
                Type: "Script",
                Title: "Exsample",
                LastUpdate: "20/04/2022",
                Description: "Test 2"
            }
        ]
    },
    computed: {

    },
    methods: {

    }
});