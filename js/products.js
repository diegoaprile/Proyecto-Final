//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var getJSONData = function (url) {
    var result = {};
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}

function showCategoriesList(array) {
    let htmlContentToAppend = "";
    priceFilteredProducts = [];
    document.getElementById("info-products").innerHTML = htmlContentToAppend;

    for (let i = 0; i < array.length; i++) {
        let info = array[i];

        htmlContentToAppend += ` 
            <div class="list-group-item list-group-item-action" >
            <div class="row " id="` + info.name + `">
                <div class="col-3">
                    <img src="` + info.imgSrc + `" alt="` + info.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + info.name + `</h4>
                        <small class"text-muted">Costo: ` + info.currency + ` ` + info.cost + `<br/>Vendidos: ` + info.soldCount + ` </small>
                    </div>
                    <div id= "inform-products"> ` + info.description + `</div>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById("info-products").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray);
        }
    });
});

const ORDER_ASC_BY_PRICE = "09";
const ORDER_DESC_BY_PRICE = "90";
const ORDER_BY_SOLD_COUNT = "Cant.";
var currentCategoriesArray = [];
var priceFilteredProducts = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;

}

function showCategoriesListNoParam(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let info = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(info.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(info.productCount) <= maxCount))){

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
            <div class="list-group-item list-group-item-action" >
            <div class="row " id="` + info.name + `">
                <div class="col-3">
                    <img src="` + info.imgSrc + `" alt="` + info.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + info.name + `</h4>
                        <small class"text-muted">Costo: ` + info.currency + ` ` + info.cost + `<br/>Vendidos: ` + info.soldCount + ` </small>
                    </div>
                    <div id= "inform-products"> ` + info.description + `</div>
                </div>
            </div>
        </div>
        </a>
        `
        }

        document.getElementById("info-products").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesListNoParam();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowCategories(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";
        htmlContentToAppend = '';
        minCount = undefined;
        maxCount = undefined;

        showCategoriesListNoParam();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCostMin").value;
        maxCount = document.getElementById("rangeFilterCostMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        for (let i = 0; i < currentCategoriesArray.length; i++) {
            if (currentCategoriesArray[i].cost >= minCount && currentCategoriesArray[i].cost <= maxCount) {
                priceFilteredProducts.push(currentCategoriesArray[i]);
            }
        }

        showCategoriesList(priceFilteredProducts);
    });
});
