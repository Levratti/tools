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
                URL: "app/BarCodeGenerator.html",
                Type: "Tools",
                Title: "Generatore codici a barre",
                LastUpdate: "20/04/2022",
                Description: "Genera gratis codici a barre online"
            },
            {
                URL: "script/Chiusura_RCMI_GeCo.user.js",
                Type: "Script",
                Title: "Chiusura RCMI GeCo",
                LastUpdate: "20/04/2022",
                Description: "Crea il template per la chiusura della pratica in BO."
            },
            {
                URL: "script/Select_Date_GeCo.user.js",
                Type: "Script",
                Title: "Select Date GeCo",
                LastUpdate: "20/04/2022",
                Description: "Comodo calendario per scegliere la data di assegnazione."
            },
            {
                URL: "script/Plugin_Argo_GeCo.user.js",
                Type: "Script",
                Title: "Plugin Argo GeCo",
                LastUpdate: "20/04/2022",
                Description: "Plugin per scaricare in automatico il file CP da GeCo."
            },
            {
                URL: "script/Link_CASARS_GeCo.user.js",
                Type: "Script",
                Title: "Link CASARS GeCo",
                LastUpdate: "20/04/2022",
                Description: "Visualizza sè il CASARS è stato spedito."
            },
            {
                URL: "script/Add_Photo_GeCo.user.js",
                Type: "Script",
                Title: "Add Photo GeCo",
                LastUpdate: "20/04/2022",
                Description: "Link per caricare imagini."
            },
            /*{
                URL: "script/Send_GdM_to_SENSI.user.js",
                Type: "Script",
                Title: "Send GdM to SENSI",
                LastUpdate: "26/04/2022",
                Description: "Flaggare come GUASTI, gli contatori spediti alla SENSI."
            }*/
        ]
    },
    computed: {

    },
    methods: {

    }
});
