var app = new Vue({
    el: '#app',
    data: {
        toolsAndScript: [
            {
                URL: "app/DuplicateValues.html",
                Type: "Tools",
                Title: "Valori Duplicati",
                LastUpdate: "20/04/2022",
                Description: "Serve per verificare i valori duplicati tra dati di GeCo e Enel."
            },
            {
                URL: "https://umap.geonue.com/en/map/confini-e-dati-statistici-dei-comuni-ditalia_297#14/44.8881/11.0792",
                Type: "Tools",
                Title: "Confini dei comuni",
                LastUpdate: "20/04/2022",
                Description: "Confini e dati statistici dei comuni d'Italia"
            },
            {
                URL: "https://barcode.tec-it.com/it",
                Type: "Tools",
                Title: "Generatore codici a barre",
                LastUpdate: "20/04/2022",
                Description: "Genera gratis codici a barre online"
            },
            {
                URL: "https://levratti.github.io/tools/script/Chiusura_RCMI_GeCo.user.js",
                Type: "Script",
                Title: "Chiusura RCMI GeCo",
                LastUpdate: "20/04/2022",
                Description: "Crea il template per la chiusura della pratica in BO."
            }
        ]
    },
    computed: {

    },
    methods: {

    }
});