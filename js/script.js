/*
    TESTO DELLA VERIFICA DI TPSIT
    Viene richiesto di modificare i file html e js in modo tale da:

    - visualizzare DINAMICAMENTE gli utenti nell'aside (barra laterale sinistra) 
        # ogni utente è un nuovo LI
        # ogni utente in base al genere dovrà essere raffigurato tramite l'icona corretta
        # sotto l'icona dovrà essere rafficurato il nome con l'iniziale maiuscola del nome e l'iniziale maiuscola del cognome
        # il cognome dovrà essere troncato e seguito da . (come si vede nel file originale)

    - aggiornare automaticamente l'header della sezione nel momento in cui clicco su un utente dell'aside
        # modificare l'icona
        # modificare il nome e cognome
        # aggiornare l'ora a proprio piacimento (PER IL MASSIMO DEL PUNTEGGIO: creare un array parallelo con le ore)
    
    - aggiungere DINAMICAMENTE I MESSAGGI
        #Non importa se si utilizza ut1 per l'utente 0 o ut2, l'importante è la coerenza

    - PER IL 10. Gestite il bottone di invio in basso 
        #se il campo di testo non è vuoto aggiungere il messaggio in coda agli altri del personaggio selezionato

*/


let listUser = document.querySelector("aside > ul");
let header = document.querySelector("section > header");
let section = document.querySelector("section > section");


listUser.innerHTML = "";

for (let i = 1; i < nomeUtenti.length; i++) {
    
    //  CARICAMENTO ASIDE
    let li = document.createElement("li");
    let div = document.createElement("div");
    div.classList.add("material-symbols-outlined", "icone");

    if (genereUt[i] == "m")
        div.textContent = "face";
    else
        div.textContent = "face_3";

    li.appendChild(div);
    li.innerHTML += nomeUtenti[i] + " " + cognomeUtenti[i][0] + ".";
    listUser.appendChild(li);

    li.addEventListener("click", function () {
        //click di un utente

        let face = header.querySelector("div");
        let userName = document.getElementById("divNome");
        let ultimoAccesso = document.getElementById("divUltimoMes");

        if (genereUt[i] == "m")
            face.textContent = "face_3";
        else
            face.textContent = "face";

        userName.textContent = nomeUtenti[i] + " " + cognomeUtenti[i];
        ultimoAccesso.textContent = "oggi alle " + accesso[i];


        /*
           MESSAGGI IN NERO SONO QUELLI INVIATI DALL'UTENTE
           QUELLI IN BIANCO SONO QUELLI RICEVUTI DALL'UTENTE
        */

        //classe ut1 ==> BIANCO - RICEVUTI
        //classe ut2 ==> NERI - INVIATI

        //  creazione messaggi
        let numeroMess = 0, offset = 0;

        //trova messaggio
        do
            offset++;
        while (mittenti[offset] != i && destinatari[offset] != i);

        //trova quanti messaggi stampare
        do
            numeroMess++;
        while (mittenti[offset + numeroMess] <= i && destinatari[offset + numeroMess] <= i);


        section.innerHTML = "";

        for (let j = 0; j < numeroMess; j++) {

            let article = document.createElement("article");
            article.classList.add("mes");

            if (mittenti[j] == 0)
                article.classList.add("ut1");
            else
                article.classList.add("ut2");

            article.innerHTML = messaggi[offset + j];

            section.appendChild(article);
        }

    });

}

let input = document.querySelector("input");
input.addEventListener("change", function () {

    let article = document.createElement("article");

    article.classList.add("mes", "ut2");

    article.innerHTML = this.value;

    section.appendChild(article);
});