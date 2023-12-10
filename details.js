const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc1YjgyODNkYWRhMDAwMThhNjlkZjciLCJpYXQiOjE3MDIyMTQ1MzksImV4cCI6MTcwMzQyNDEzOX0.fc-_RheoIlgh0LWP-odFE1wMgKbM5HdUUudSj8WUvjI";

const resourceId = new URLSearchParams(window.location.search).get("resourceId");
console.log(resourceId);
URL = endpoint + resourceId;

fetch(URL, {
  headers: {
    Authorization: token,
  },
})
  .then((resp) => resp.json())
  .then(({ name, description, brand, imageUrl, price }) => {
    document.getElementById("prodImg").setAttribute("src", imageUrl);
    document.getElementById("prodName").innerText = name;
    document.getElementById("prodBrand").innerText = brand;
    document.getElementById("prodDesc").innerText = description;
    document.getElementById("prodPrice").innerText = price + "€";
    document.getElementById("modLink").setAttribute("href", "./backoffice.html" + "?resourceId=" + resourceId);
  });
