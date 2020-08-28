//Funcion que verifica que los campos esten con contenido y de ser correcto inicia la sesion
let loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', () => {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let errorMessage = document.getElementById('errorMessage');
  let errorPassWord = document.getElementById('errorPassWord');


    if (username == "" && password != "") {
    return errorMessage.innerHTML = 'Error. Por favor ingresa un usuario válido.';
  } else if (password == "" && username != "") {
    return errorPassWord.innerHTML = 'Error. Por favor ingresa una contraseña válida.';
  } else if (password == "" && username== ""){
    return errorPassWord.innerHTML = 'Error. Por favor completa los campos vacíos';
  }else {
    var userName = document.getElementById("username").value
    sessionStorage.setItem('isLogged', userName);
    window.location = "index.html";
  };

});

  
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	password: /^.{4,12}$/, // 4 a 12 digitos.
}
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      if (expresiones.usuario.test(e.target.value)) {
        document.getElementById("grupoUsuario").classList.remove("formulario__grupo-input-error");
        document.getElementById("grupoUsuario").classList.add("formulario__grupo-correcto");
        document.querySelector("#grupoUsuario i").classList.add("fa-check-circle");
        document.querySelector("#grupoUsuario i").classList.remove("fa-times-circle");
        document.querySelector("#grupoUsuario .formulario__input-error").classList.remove("formulario__input-error-activo");
      } else {
        document.getElementById("grupoUsuario").classList.add("formulario__grupo-input-error");
        document.getElementById("grupoUsuario").classList.remove("formulario__grupo-correcto");
        document.querySelector("#grupoUsuario i").classList.add("fa-times-circle");
        document.querySelector("#grupoUsuario i").classList.remove("fa-check-circle");
        document.querySelector("#grupoUsuario .formulario__input-error").classList.add("formulario__input-error-activo");
      }
    break;

    case "password":
      if (expresiones.usuario.test(e.target.value)) {
        document.getElementById("formularioPass").classList.remove("formulario__grupo-input-error");
        document.getElementById("formularioPass").classList.add("formulario__grupo-correcto");
        document.querySelector("#formularioPass i").classList.add("fa-check-circle");
        document.querySelector("#formularioPass i").classList.remove("fa-times-circle");
        document.querySelector("#formularioPass .formulario__input-error").classList.remove("formulario__input-error-activo");
      } else {
        document.getElementById("formularioPass").classList.add("formulario__input-error");
        document.getElementById("formularioPass").classList.remove("formulario__input-error");
        document.querySelector("#formularioPass i").classList.add("fa-times-circle");
        document.querySelector("#formularioPass i").classList.remove("fa-check-circle");
        document.querySelector("#formularioPass .formulario__input-error").classList.add("formulario__input-error-activo");
      }

    break;
 }


}

/*const validarCampos = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById("#grupo__usuario").classList.remove("formulario__grupo-input-error");
    document.getElementById("#grupo__usuario").classList.add("formulario__grupo-correcto");
    document.querySelector("#grupo__usuario i").classList.add("fa-check-circle");
    document.querySelector("#grupo__usuario i").classList.remove("fa-times-circle");
    document.querySelector("#grupo__usuario .formulario__input-error").classList.remove("formulario__input-error-activo");
    
  } else {
    document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-input-error");
    document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
    document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
    document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
  }

}*/

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});


formulario.addEventListener("click", (e) => {
  e.preventDefault();
});


