const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc1YjgyODNkYWRhMDAwMThhNjlkZjciLCJpYXQiOjE3MDIyMTQ1MzksImV4cCI6MTcwMzQyNDEzOX0.fc-_RheoIlgh0LWP-odFE1wMgKbM5HdUUudSj8WUvjI";

fetch(endpoint, {
  headers: {
    Authorization: token,
  },
})
  .then((resp) => resp.json())
  .then((products) => {
    const row = document.getElementById("wrapper");
    console.log(products);

    products.forEach((product) => {
      /*Una volta ottenuti i dati, itero su ogni prodotto con foreach e creo un nuovo elemento HTML 
    per visualizzarlo.Creo un nuovo elemento div con classe col, 
    un nuovo elemento div con classe card, un nuovo elemento h3 per il nome del prodotto, un nuovo elemento img per 
    l’immagine del prodotto, un nuovo elemento p per il marchio del prodotto, un nuovo elemento p per la descrizione del prodotto, 
    un nuovo elemento p per il prezzo del prodotto e un nuovo elemento a per il link discover more. 
    Infine, aggiungo tutti questi elementi alla pagina HTML.*/
      const id = product._id;
      const col = document.createElement("div");
      col.classList.add("col");
      const card = document.createElement("div");
      card.classList.add("card");
      const h3 = document.createElement("h3");
      h3.innerText = product.name;
      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.classList.add("img-fluid");
      const brand = document.createElement("p");
      brand.innerText = "brand: " + product.brand;
      const desc = document.createElement("p");
      desc.classList.add("fs-6");
      desc.innerText = product.description;
      const price = document.createElement("p");
      price.classList.add("fs-5");
      price.innerText = "prezzo: " + product.price + "€";
      const detailsLink = document.createElement("a");
      detailsLink.setAttribute("href", "./details.html" + "?resourceId=" + id);
      detailsLink.innerText = "Maggiori dettagli...";
      row.appendChild(col);
      col.appendChild(card);
      card.appendChild(img);
      card.appendChild(h3);
      card.appendChild(desc);
      card.appendChild(price);
      card.appendChild(detailsLink);
    });
  })
  .catch((error) => console.log(error));
