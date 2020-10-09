const cart = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const country = "https://raw.githubusercontent.com/millan2993/countries/master/json/countries.json"
fetch(cart)
  .then(response => response.json())
  .then(carrito => {
    let listProduct = document.getElementById("listProduct");
    for (let i = 0; i < carrito.articles.length; i++) {
      let cart = carrito.articles[i];

      listProduct.innerHTML +=
        //Se usa el id del elemento que esta iterando y se le suma uno para que el id no se repita.
        `
                <tr class="content-product mb-3" id="product-${i + 1}">
                <td>
                <img src= "${cart.src}" alt="" class="img-fluid img-thumbnail mt-3 mb-3" style="width: 80px; height: 80px;" id="img-${i + 1}">
                </td>
                <td>
                 <h5 class="d-inline-block name" id="name-${i + 1}" >${cart.name}</h5>
                 </td>
                <td id="price-${i + 1}"> ${cart.currency} $ ${cart.unitCost}</td>
                <td>
                <button class="btn-mount"id="disminuir-${i + 1}"> - </button>
                <input class="count"type='text' id="cantidad-${i + 1}" value="${cart.count}"> 
                <button class="btn-mount" id="aumentar-${i + 1}"> + </button>
                </td>
                <td id="product-${i + 1}-subtotal">
                </td>
                <td><button class= "del-btn" id="delete-${i + 1}"><i class="fas fa-trash" id="trash"></button></i></td>
                </tr>       
          `
    };
    // Bucle que itera nuevamente el json y agrega los EventListener a los botones y a la cantidad. 
    // Se utiliza la letra j por que ya se habia usado la i en el bucle anterior.
    for (let j = 0; j < carrito.articles.length; j++) {
      let cart = carrito.articles[j];

      let disminuirBtn = document.getElementById(`disminuir-${j + 1}`);
      let aumentarBtn = document.getElementById(`aumentar-${j + 1}`);
      let cantidad = document.getElementById(`cantidad-${j + 1}`);
      let subtotal = document.getElementById(`product-${j + 1}-subtotal`);

      let del = document.getElementById(`product-${j + 1}`)
      let trash = document.getElementById(`delete-${j + 1}`);
      trash.addEventListener("click", () => {
        del.innerHTML = "";

      })
      // Se llama a la funcion para que cargue los costos que ya vienen en el json.
      actualizarSubtotal(subtotal, cart.unitCost, cantidad.value, cart.currency);

      // Se le pasan los paramentros que consisten en cantidad (input), costo por unidad, elemento subtotal y la moneda.
      disminuirBtn.addEventListener('click', () => disminuir(cantidad, cart.unitCost, subtotal, cart.currency));
      aumentarBtn.addEventListener('click', () => aumentar(cantidad, cart.unitCost, subtotal, cart.currency));
    }


  })
  .catch(err => console.log(err));
//Se le pasan como parametros: el subtotal a actualizar, el precio unitario, la cantidad y la moneda. Si la moneda llega en dolares, se multiplica el precio unitario por el valor del dolar.
function actualizarSubtotal(subtotalActualizar, precioUnitario, cantidad, moneda) {
  if (moneda == 'USD') {
    subtotalActualizar.innerHTML = "$" + (precioUnitario * 40) * cantidad;
  } else {
    subtotalActualizar.innerHTML = "$" + " " + precioUnitario * cantidad;
    sub = document.getElementById("subtotal");
    total = document.getElementById("total");
    sub.innerHTML = `<td class="subtotal" id="subtotal"> $ ${parseInt(precioUnitario * cantidad)}</td>`
    total.innerHTML = `<td class="price-total" id="total"> $ ${parseInt(precioUnitario * cantidad)}</td>`
  }
}

function aumentar(cantidad, precioUnitario, subtotal, moneda) {
  cantidad.value = parseInt(cantidad.value) + 1; //Se obtiene el valor del input, y se incrementa en 1 el valor que tenga (Se utiliza parseInt para transformar el string en numero).
  //Luego de ejecutarse la funcion aumentar, se llama a la funcion actualizarSubtotal donde muestra el monto actualizado.
  actualizarSubtotal(subtotal, precioUnitario, cantidad.value, moneda);
}

function disminuir(cantidad, precioUnitario, subtotal, moneda) {
  cantidad.value = parseInt(cantidad.value) - 1; //se obtiene el valor del input, y se decrementa en 1 el valor que tenga.
  //Luego de ejecutarse la funcion disminuir, se llama a la funcion actualizarSubtotal donde muestra el monto actualizado.
  actualizarSubtotal(subtotal, precioUnitario, cantidad.value, moneda);
}


envio = document.getElementById("pagos");
// Funcion que muestra la ventana modal del metodo de envio
envio.addEventListener("click", () => {
  $('#modal').modal('show')
})
//Funcion que oculta el modal de envio y muestra el metodo de pago
metodo = document.getElementById("pago");
metodo.addEventListener("click", () => {
  $("#modal").modal("hide")
  $('#metodo').modal('show')

})

opcion1 = document.getElementById("opcion1");
opcion2 = document.getElementById("opcion2");
opcion3 = document.getElementById("opcion3");
//Evento que muestra el pago con tarjetas y oculta las otras opciones
opcion1.addEventListener("click", () => {
  document.getElementById("pagocard").style.display = "block"
  opcion2.style.display = "none"
  opcion3.style.display = "none"
})
//Evento que muestra el pago con transferencia y oculta las otras opciones
opcion2.addEventListener("click", () => {
  document.getElementById("transfer").style.display = "block"
  opcion1.style.display = "none"
  opcion3.style.display = "none"
})
//Evento que muestra el pago con paypal y oculta las otras opciones
opcion3.addEventListener("click", () => {
  document.getElementById("pay").style.display = "block"
  opcion1.style.display = "none"
  opcion2.style.display = "none"
})

let dir = document.getElementById("direccion");
let calle = document.getElementById("calle");
let esq = document.getElementById("esquina");
let puerta = document.getElementById("numero");
let pais = document.getElementById("pais");
let dpto = document.getElementById("dep");
let next = document.getElementById("pago");
let errorDir = document.getElementById("errorDir");
let errorCalle = document.getElementById("errorCalle");
let errorEsq = document.getElementById("errorEsq");
let errorPuerta = document.getElementById("errorPuerta");
let errorPais = document.getElementById("errorPais");
var errorDep = document.getElementById("errorDep");
var lista = document.getElementById("pais");
var listaDep = document.getElementById("dep");

next.addEventListener("click", () => {
  if (dir.value == "" || dir.value == null) {
    dir.classList.add("error");
    errorDir.style.display = "block";
    next.setAttribute("disabled", true);
  } if (calle.value == "" || calle.value == null) {
    calle.classList.add("error")
    errorCalle.style.display = "block"
    next.setAttribute("disabled", true);
  } if (esq.value == "" || esq.value == null) {
    esq.classList.add("error")
    errorEsq.style.display = "block"
    next.setAttribute("disabled", true);
  } if (puerta.value == "" || puerta.value == null) {
    puerta.classList.add("error")
    errorPuerta.style.display = "block"
    next.setAttribute("disabled", true);
  } if (lista.selectedIndex == null || lista.selectedIndex == 0) {
    pais.classList.add("error")
    errorPais.style.display = "block"
    next.setAttribute("disabled", true);
  } if (listaDep.selectedIndex == null || listaDep.selectedIndex == 0) {
    listaDep.classList.add("error")
    errorDep.style.display = "block"
    next.setAttribute("disabled", true);
  }


})


fetch(country)
  .then(response => response.json())
  .then(paises => {
    let listCountry = document.getElementById("pais");
    for (let i = 0; i < paises.countries.length; i++) {
      let pais = paises.countries[i];
      listCountry.innerHTML = `
      <option selected disabled value="">Pais</option>
                <option>${pais.name}</option>
      `
    }
  })
  .catch(err => console.log(err));



