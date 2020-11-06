//Funcion que realiza una escucha y determina si esta el usuario logeado redireccionandolo al index.html
var isLogged = sessionStorage.getItem('isLogged');

document.addEventListener("DOMContentLoaded", () => {
    if (isLogged == null || !isLogged) {
        window.location = "login.html"
    }

});
//Funcion que una vez que se ejecuta la session iniciada se termina, es decir se desloguea
let logOut = document.getElementById("logoutBtn");
logOut.addEventListener("click", () => {
sessionStorage.setItem("isLogged", false)
sessionStorage.clear("isLogged")
window.location = "login.html";
});

