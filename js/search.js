document.getElementById("icon-search").addEventListener("click", mostrarBuscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultarBuscador);
document.getElementById('textSearch').addEventListener('keyup', filtrarProductos);


/* Buscador de contenido*/

var barsSearch = document.getElementById("ctn-bars-search");
var coverCtnSearch = document.getElementById("cover-ctn-search");
var inputSearch = document.getElementById("textSearch");
var boxSearch = document.getElementById("box-search");

function mostrarBuscador() {
    barsSearch.style.top = "80px";
    coverCtnSearch.style.display = "block";
    inputSearch.focus();
}


/* Funcion para ocultar barra*/

function ocultarBuscador() {
    barsSearch.style.top = "-25px";
    coverCtnSearch.style.display = "none";
    inputSearch.value = "";
}

function filtrarProductos() {
    let htmlContentToAppend = '';
    document.getElementById('info-products').innerHTML = htmlContentToAppend;

    let productosFiltrados = [];
    let searchText = document.getElementById('textSearch').value.toLowerCase();
    let notFound = document.getElementById("no-search");
    for (let i = 0; i < products.length; i++) {
        nombreProducto = products[i].name.toLowerCase();
        descripcionProducto = products[i].description.toLowerCase();
        if (nombreProducto.includes(searchText) || descripcionProducto.includes(searchText)) {
            productosFiltrados.push(products[i])
        }
    }
   
        
    
        
    
    


    for (let i = 0; i < productosFiltrados.length; i++) {
        htmlContentToAppend += `<div class="list-group-item list-group-item-action" >
        <div class="row " id="` + productosFiltrados[i].name + `">
            <div class="col-3">
                <img src="` + productosFiltrados[i].imgSrc + `" alt="` + productosFiltrados[i].description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + productosFiltrados[i].name + `</h4>
                    <small class"text-muted">Costo: ` + productosFiltrados[i].currency + ` ` + productosFiltrados[i].cost + `<br/>Vendidos: ` + productosFiltrados[i].soldCount + ` </small>
                </div>
                <div id= "inform-products"> ` + productosFiltrados[i].description + `</div>
            </div>
        </div>
    </div>
    `
    }
    document.getElementById('info-products').innerHTML = htmlContentToAppend;


}

