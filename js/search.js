

document.getElementById("icon-search").addEventListener("click", mostrarBuscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultarBuscador);

/* Buscador de contenido*/

var barsSearch = document.getElementById("ctn-bars-search");
var coverCtnSearch = document.getElementById("cover-ctn-search");
var inputSearch = document.getElementById("textSearch");
var boxSearch = document.getElementById ("box-search");

function mostrarBuscador () {
    barsSearch.style.top = "80px";
    coverCtnSearch.style.display = "block";
    inputSearch.focus();
}


/* Funcion para ocultar barra*/

function ocultarBuscador () {
    barsSearch.style.top = "-25px";
    coverCtnSearch.style.display = "none";
    inputSearch.value = "";
     }

/* Funcion filtrado*/

document.getElementById("textSearch").addEventListener("keyup", findMatches);

/* endpoint = listProducts*/
var listCategory = "https://japdevdep.github.io/ecommerce-api/product/all.json";
var promise = fetch(listCategory);
console.log(promise);

fetch(listCategory).then(blob => console.log(blob));
fetch (listCategory)
.then(blob => blob.json())
.then (data => console.log(data));
/* cities = products*/
var products = [];
fetch (listCategory)
.then (blob => blob.json())
.then(data =>products.push(...data));
console.log(products);

function findMatches (productos,products) {
    return products.filter(name => {
        const regex = new RegExp (productos, "gi");
        return name.match (regex);
    })
}
var search = document.querySelector (".search");
var suggestions = document.querySelector (".suggestions");
search.addEventListener ("keyup", displayMatches);
function displayMatches (e) {
    console.log(e);
}
function displayMatches(e) {
    const matchedArray = findMatches(e.target.value, products);
    const html = matchedArray.map(place => {
        return `
        <li>
            <span class="city">${products.name}</span>
        
        </li>
    `;
    });
    console.log(html);
    suggestions.innerHTML = html;
}
