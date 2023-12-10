const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc1YjgyODNkYWRhMDAwMThhNjlkZjciLCJpYXQiOjE3MDIyMTQ1MzksImV4cCI6MTcwMzQyNDEzOX0.fc-_RheoIlgh0LWP-odFE1wMgKbM5HdUUudSj8WUvjI";
const resourceId = new URLSearchParams(window.location.search).get("resourceId");
console.log(resourceId);
if (resourceId) {
  method = "PUT"; // utilizzato per aggiornare un risosrsa esistente
  URL = endpoint + resourceId;
} else {
  method = "POST"; //utilizzato per creare una nuova risorsa sul server
  URL = endpoint;
} /*definisco tre variabili: endpoint, token e resourceId. La variabile endpoint contiene l’URL del server a cui viene inviata
 la richiesta HTTP. La variabile token contiene un token di autenticazione che viene utilizzato per accedere ai dati sul server. 
 Infine, la variabile resourceId viene utilizzata per ottenere l’ID del prodotto dalla query string dell’URL.

utilizzo if-else per determinare se la richiesta HTTP deve essere una richiesta di tipo PUT o POST. 
Se l’ID del prodotto è presente nella query string dell’URL, 
il codice imposta il metodo della richiesta HTTP su PUT e l’URL della richiesta HTTP sull’endpoint del server concatenato con 
l’ID del prodotto. In caso contrario, il codice imposta il metodo della richiesta HTTP su POST e l’URL della richiesta HTTP 
sull’endpoint del server.*/

window.addEventListener("DOMContentLoaded", () => {
  // L'evento DOMContentLoaded viene invocato quando il documento è stato completamente caricato.
  const confermaButton = document.getElementById("confirm");
  const recycle = document.getElementById("delete");
  const formDesc = document.getElementById("formTitle");

  if (resourceId) {
    formDesc.innerText = "Modify Product Form";
    confermaButton.innerText = "Modify Product";
    confermaButton.classList.remove("btn-primary");
    confermaButton.classList.add("btn-warning");

    fetch(URL, {
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => resp.json())
      .then(({ name, description, brand, imageUrl, price }) => {
        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("imageUrl").value = imageUrl;
        document.getElementById("price").value = price;
      });
  } else {
    recycle.classList.add("d-none");
  }
});

const recycle =
  document.getElementById("delete"); /*Quando il pulsante viene cliccato, viene visualizzata una finestra di 
dialogo con il messaggio "Sei sicuro di voler eliminare questo articolo?". Se l’utente conferma l’eliminazione, 
il codice effettua una fetch() a un URL, passando un oggetto con un’intestazione Authorization e un metodo DELETE 
come argomenti. Se la richiesta ha successo, il codice estrae i valori delle proprietà name e _id dalla risposta e visualizza 
una finestra di dialogo con il messaggio "Hai eliminato [nome prodotto] con ID n: [ID prodotto]".*/
recycle.addEventListener("click", () => {
  const confirmedErase = confirm("Sei sicuro di voler eliminare questo articolo?");
  if (confirmedErase) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((deletedProduct) => {
        window.alert("Hai eliminato " + deletedProduct.name + " con ID n: " + deletedProduct._id);
      });
  }
});

const handleSubmit = (event) => {
  event.preventDefault();

  const addProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };

  fetch(URL, {
    method,
    body: JSON.stringify(
      addProduct
    ) /* è fondamentale fare la stringhifizzazione dell'oggetto nativo o invieremo "[object Object]"
    // un header in particolare è importantissimo, il Content-Type, per specificare il formato di invio, 
    altrimenti non verrà riconosciuto dal server
    // l'Authorization header serve in caso di API che richiedono autenticazione tramite una API Key*/,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((newProduct) => {
      resourceId;
      window.alert("Hai aggiunto il tuo prodotto!");
    })
    .catch((error) => console.log(error));
};
//Sono riuscito a fare l'esercizio aiutandomi molto con la lezione del giovedi e consultandomi online
//ammetto che senza l'aiuto di queste risorse, non ci sarei mai riuscito a fare quello che ho fatto
