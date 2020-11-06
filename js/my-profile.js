
// Se crea un array vacio para almacenar los datos 
var dataProfile = [];
// Funcion que recibe como parametros los valores de los inputs y los guarda en un objeto JSON
function addData(name, lastname, age, phone, mail) {
    var profile = {
        dName: name,
        dApellido: lastname,
        dAge: age,
        dPhone: phone,
        dMail: mail
    };
    dataProfile.push(profile);
    storage(dataProfile);
}

var btn = document.getElementById("saveData");

btn.addEventListener("click", saveProfile)


//Funcion que toma el valor de los inputs y se los pasa a la function addData para almacenarlos.
function saveProfile() {
    var dataName = document.querySelector('#name').value;
    var dataApellido = document.querySelector('#apellido').value;
    var dataAge = document.querySelector('#age').value;
    var dataPhone = document.querySelector('#phone').value;
    var dataMail = document.querySelector('#mail').value;

    addData(dataName, dataApellido, dataAge, dataPhone, dataMail);

}
function storage(list) {
    localStorage.setItem("profileList", JSON.stringify(list));
}

var parseLocal = JSON.parse(localStorage.getItem("profileList"));
if (localStorage.length !== 0) {

    for (let i = 0; i < parseLocal.length; i++) {
        data = parseLocal[i];
        var dataName = document.querySelector('#name').value = parseLocal[i].dName
        var dataApellido = document.querySelector('#apellido').value = parseLocal[i].dApellido
        var dataAge = document.querySelector('#age').value = parseLocal[i].dAge
        var dataPhone = document.querySelector('#phone').value = parseLocal[i].dPhone
        var dataMail = document.querySelector('#mail').value = parseLocal[i].dMail

        if (dataName === "") {
            document.querySelector('#name').classList.add("backError");
            $("#name").prop("disabled", false);

        } else {
            document.querySelector('#name').classList.add("backExit");
            $("#name").prop("disabled", true);

        } if (dataApellido === "") {
            document.querySelector('#apellido').classList.add("backError");
            $("#apellido").prop("disabled", false);

        } else {
            document.querySelector('#apellido').classList.add("backExit");
            $("#apellido").prop("disabled", true);

        } if (dataAge === "") {
            document.querySelector('#age').classList.add("backError");
            $("#age").prop("disabled", false);

        } else {
            document.querySelector('#age').classList.add("backExit");
            $("#age").prop("disabled", true);

        } if (dataPhone === "") {
            document.querySelector('#phone').classList.add("backError");
            $("#phone").prop("disabled", false);

        } else {
            document.querySelector('#phone').classList.add("backExit");
            $("#phone").prop("disabled", true);

        } if (dataMail === "") {
            document.querySelector('#mail').classList.add("backError");
            $("#mail").prop("disabled", false);

        } else {
            document.querySelector('#mail').classList.add("backExit");
            $("#mail").prop("disabled", true);
        }

    }

}


document.getElementById("btnReset").addEventListener("click", () => {
    localStorage.clear("profileList");
    $("#name").prop("disabled", false);
    $("#apellido").prop("disabled", false);
    $("#age").prop("disabled", false);
    $("#phone").prop("disabled", false);
    $("#mail").prop("disabled", false);
    document.querySelector('#name').classList.remove("backError");
    document.querySelector('#name').classList.remove("backExit");
    document.querySelector('#apellido').classList.remove("backError");
    document.querySelector('#apellido').classList.remove("backExit");
    document.querySelector('#age').classList.remove("backError");
    document.querySelector('#age').classList.remove("backExit");
    document.querySelector('#phone').classList.remove("backError");
    document.querySelector('#phone').classList.remove("backExit");
    document.querySelector('#mail').classList.remove("backError");
    document.querySelector('#mail').classList.remove("backExit");
})

document.getElementById("editData").addEventListener("click", () => {
    $("#name").prop("disabled", false);
    $("#apellido").prop("disabled", false);
    $("#age").prop("disabled", false);
    $("#phone").prop("disabled", false);
    $("#mail").prop("disabled", false);
    document.querySelector('#name').classList.remove("backError");
    document.querySelector('#name').classList.remove("backExit");
    document.querySelector('#apellido').classList.remove("backError");
    document.querySelector('#apellido').classList.remove("backExit");
    document.querySelector('#age').classList.remove("backError");
    document.querySelector('#age').classList.remove("backExit");
    document.querySelector('#phone').classList.remove("backError");
    document.querySelector('#phone').classList.remove("backExit");
    document.querySelector('#mail').classList.remove("backError");
    document.querySelector('#mail').classList.remove("backExit");
})
// Eventos para el almacenamiento de imagenes. 
document.querySelector("#inputFile").addEventListener("change", function () {
    //Convierto el archivo en dato URL
    const reader = new FileReader();
    // En ese momento, el atributo result contiene  la información como una URL representando la información del archivo como una cadena de caracteres
    reader.addEventListener("load", () => {
        localStorage.setItem("recentImage", reader.result)
    })

    //readAsDataURL es usado para leer el contenido.
    reader.readAsDataURL(this.files[0]);
})
document.addEventListener("DOMContentLoaded", () => {

    var imageUrl = localStorage.getItem("recentImage");
    if (imageUrl || imageUrl != undefined) {
        document.querySelector("#imgPreview").setAttribute("src", imageUrl)
    } else {

        document.getElementById("imgPreview").style.display = "none"
    }
})
document.getElementById("userName").innerHTML = `<input type="text" id="userName" readonly value="${sessionStorage.getItem("isLogged")}" class="form-control ">`

