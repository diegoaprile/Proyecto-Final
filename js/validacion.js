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
  } else {
    sessionStorage.setItem('isLogged', true);
    window.location = "index.html";
  };

});


