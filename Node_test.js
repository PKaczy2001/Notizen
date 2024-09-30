document.getElementById("Eingabefeld").addEventListener("submit", function(event) {
    event.preventDefault();

    const Notiz = document.getElementById("EingabeText").value;
    const Ueber = document.getElementById("Ueberschrift").value;

    if(Notiz.trim() !== "" && Ueber.trim() !== "") {
        const ListElement = document.createElement("li");
        ListElement.textContent = `${Ueber}: ${Notiz}`;

        const loeschen = document.createElement("button");
        loeschen.textContent = "X";
        loeschen.style.marginLeft = "10px";

        loeschen.addEventListener("click", function(){  
          ListElement.remove();
          speichereNotizen(); 
        }); 

        ListElement.appendChild(loeschen);
        document.getElementById("Liste").appendChild(ListElement);
        
       
        document.getElementById("Ueberschrift").value = "";
        document.getElementById("EingabeText").value = "";
        
        speichereNotizen();
    }
    else {
        alert("Bitte eine Überschrift und Notiz eingeben!");
    }
});

// Function to save all notes to localStorage
function speichereNotizen(){
    const alleNotizen = [];
    const notizenListe = document.querySelectorAll("#Liste li");
    
   
    notizenListe.forEach(function(li){
        alleNotizen.push(li.firstChild.textContent); 
    });
    
    
    localStorage.setItem("notizen", JSON.stringify(alleNotizen));
}


function ladeNotizen(){
    const gespeicherteNotizen = JSON.parse(localStorage.getItem("notizen"));

    if (gespeicherteNotizen) {
        gespeicherteNotizen.forEach(function(notizenText) {
            const ListElement = document.createElement("li");
            ListElement.textContent = notizenText;

            const loeschen = document.createElement("button");
            loeschen.textContent = "X";
            loeschen.style.marginLeft = "10px";

            loeschen.addEventListener("click", function(){  
                ListElement.remove();
                speichereNotizen(); 
            });

            ListElement.appendChild(loeschen);
            document.getElementById("Liste").appendChild(ListElement);
        });
    }
}

// Event listener for "Alles Löschen" button
document.querySelector("#allesLoeschen").addEventListener("click", function() {
    const geloeschteListe = document.getElementById("Liste");
    geloeschteListe.innerHTML = ""; 
    localStorage.removeItem("notizen"); // Clear the notes from localStorage
});


window.onload = function() {
    ladeNotizen();
};
