const url = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const comment = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const related = "https://japdevdep.github.io/ecommerce-api/product/all.json";

fetch(related)
  .then(response => response.json())
  .then(rel => {

    let products = document.getElementById("relatedProducts");
    products.innerHTML = `<div class="card-deck" style="width:20rem;" id="card1">
    <div class="card related" style="width:100px;" height:"100px;">
      <img src="${rel[1].imgSrc}" class="card-img-top mx-auto d-block" style="width:100px;" height:"100px;">
      <div class="card-body">
        <h5 class="card-title">${rel[1].name}</h5>
        <p class="card-text">${rel[1].description}</p>
        <p class="card-text">Costo: ${rel[1].currency} ${rel[1].cost}</p>
      </div>
    </div>
  </div>
  </div>

  <div class="card-deck ml-1" style="width:20rem;" id="card2">
    <div class="card related" style="width:100px;" height:"100px;">
      <img src="${rel[3].imgSrc}" class="card-img-top mx-auto d-block" style="width:100px;" height:"100px;">
      <div class="card-body">
        <h5 class="card-title">${rel[3].name}</h5>
        <p class="card-text">${rel[3].description}</p>
        <p class="card-text">Costo: ${rel[3].currency} ${rel[3].cost}</p>
      </div>
    </div>
  </div>
  </div>
  `
  });

fetch(url)
  .then(response => response.json())
  .then(data => {

    let element = document.getElementById("desc-prod")
    element.innerHTML = `
  <div class="card-header">
   <h2> ${data.name} </h2>
  </div>
  <div class="card-body">
    <p class="card-text">${data.description}</p>
  </div>
  <div class="container">
  <div class="row blog">
      <div class="col-md-12">
          <div id="blogCarousel" class="carousel slide" data-ride="carousel">

              <ol class="carousel-indicators">
                  <li data-target="#blogCarousel" data-slide-to="0" class="active"></li>
                  <li data-target="#blogCarousel" data-slide-to="1"></li>
              </ol>

              <!-- Carousel items -->
              <div class="carousel-inner">

                  <div class="carousel-item active">
                      <div class="row">
                          <div class="col-md-3">
                              <a href="#">
                                  <img src="${data["images"][0]}" alt="Image" style="max-width:100%;">
                              </a>
                          </div>
                          <div class="col-md-3">
                              <a href="#">
                                  <img src="${data["images"][1]}" alt="Image" style="max-width:100%;">
                              </a>
                          </div>
                          <div class="col-md-3">
                              <a href="#">
                                  <img src="${data["images"][2]}" alt="Image" style="max-width:100%;">
                              </a>
                          </div>
                          <div class="col-md-3">
                              <a href="#">
                                  <img src="${data["images"][3]}" alt="Image" style="max-width:100%;">
                              </a>
                          </div>
                      </div>
                      <!--.row-->
                  </div>
                  <!--.item-->

                  <div class="carousel-item">
                      <div class="row">
                          <div class="col-md-3">
                              <a href="#">
                                  <img src="${data["images"][4]}" alt="Image" style="max-width:100%;">
                              </a>
                          </div>
                          <div class="col-md-3">
                              <a href="#">
                                  <img src="${data["images"][0]}" alt="Image" style="max-width:100%;">
                              </a>
                          </div>
                          <div class="col-md-3">
                              <a href="#">
                                  <img src="${data["images"][1]}" alt="Image" style="max-width:100%;">
                              </a>
                          </div>
                          <div class="col-md-3">
                              <a href="#">
                                  <img src="${data["images"][2]}" alt="Image" style="max-width:100%;">
                              </a>
                          </div>
                      </div> 
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
<div class="card-body text-center">
<p class"card-text"> Categoria: ${data.category} <br/> Costo: ${data.currency} ${data.cost} <br/> Vendidos: ${data.soldCount}
<h4 class="productRelated">También te podría interesar:</h4>

</div>
 
`
  })
  .catch(err => console.log(err));

fetch(comment)
  .then(response => response.json())
  .then(comments => {

    let element = document.getElementById("info-comment")
    for (let i = 0; i < comments.length; i++) {
      let com = comments[i];
      let score = '';
      let emptyStars = 5 - com.score;


      for (let i = 1; i <= emptyStars; i++) {
        score += `<p class="rating" id="${i + com.score}"></p><label for="${i + com.score}"></label>`
      }
      for (let i = 1; i <= com.score; i++) {
        score += `<p class="rating"></p><label id="labelcheck"></label>`
      }


      element.innerHTML += `    
            <div class="container border border-success mt-3 rounded bg-light shadow p-3 mb-5 bg-white rounded">
        <div class="row">
          <div class="col-sm-10 col-sm-offset-1" id="logout">
              <div class="comment-tabs">
                          
                      <div class="tab-content">
                          <div class="tab-pane active" id="comments-logout">                
                              <ul class="media-list">
                                <li class="media">
                                  <a class="pull-left" href="#">
                                    <img class="media-object img-circle rounded-circle mt-3" src="img/loginuser.png" alt="profile">
                                  </a>
                                  <div class="media-body ">
                                    <div class="well well-lg">
                                        <h4 class="media-heading text-uppercase reviews ml-2 mt-3"> ${com.user} </h4>
                                        <ul class="media-date text-uppercase reviews list-inline ml-2">
                                          ${com.dateTime}
                                        </ul>
                                        <p class="media-comment ml-2">
                                          ${com.description}
                                        </p>
                                        <a class="btn btn-info btn-circle text-lowercase" href="#" id="reply"><i class="fas fa-comment-dots"></i> Responder</a>
                                        <a class="btn btn-warning btn-circle text-lowercase" data-toggle="collapse" href="#replyOne"><i class="fas fa-comments"></i> 2 comentarios</a>
                                    </div>        
                          </div>              
                        </div>  
                        <h5 class="badge badge-secondary">Calificacion</h5>
                      <div class="rating col-sm-4">
                          ${score}
                      </div>
                                `

    }


  })
  .catch(err => console.log(err))
botonComentario = document.getElementById("btn-comment");
botonOcultar = document.getElementById("btn-nocomments");
boton = document.getElementById("btn-comments");
boton.addEventListener("click", () => {
  document.getElementById("info-comment").style.display = "block";
  boton.style.display = "none";
  botonOcultar.style.display = "inline-block";
  document.getElementById("add-comment").style.display = "none";
});
botonComentario.addEventListener("click", () => {
  document.getElementById("add-comment").style.display = "block";
  document.getElementById("info-comment").style.display = "none";

});
botonOcultar.addEventListener("click", () => {
  botonOcultar.style.display = "none";
  boton.style.display = "inline-block";
  document.getElementById("info-comment").style.display = "none";

})
comentario = document.getElementById("addComment");
user = document.getElementById("nickName");
enviando = document.getElementById("btn-enviando");
error = document.getElementById("texterror");
errorUser = document.getElementById("usererror");
submit = document.getElementById("submitComment");
exit = document.getElementById("commentexit");
check = document.getElementById("check-ok");
var date = new Date();
var fecha = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
var hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
var fechaYHora = fecha + " " + hora;
submit.addEventListener("click", () => {
  if (user.value == "" || user.value == null) {
    user.classList.add("borderojo");
    errorUser.style.display = "block";
  } else if (comentario.value == "" || comentario.value == null) {
    comentario.classList.add("borderojo");
    error.style.display = "block";
  } else {
    submit.setAttribute("disabled", true);
    setTimeout(function () { $('#btn-enviando').fadeOut('fast'); }, 4000);
    setTimeout(function () {
      $('#commentexit').fadeOut('fast');
      exit.style.display = "block";
      submit.removeAttribute("disabled");
    }, 4000);
    enviando.style.display = "block"
    error.style.display = "none";
    errorUser.style.display = "none";
    comentario.classList.remove("borderojo");
    user.classList.remove("borderojo");
    check.style.display = "inline";
    sessionStorage.setItem("nick", user.value);
    sessionStorage.setItem("comment", comentario.value);
    var rating = document.querySelector('input[name="rating"]:checked').value;
    let element = document.getElementById("info-comment")
    score = " ";
    let emptyStars = 5 - rating;
    for (let i = 1; i <= emptyStars; i++) {
      score += `<p class="rating" id="${i + rating}"></p><label for="${i + rating}"></label>`
    } for (let i = 1; i <= rating; i++) {
      score += `<p class="rating"></p><label id="labelcheck"></label>`
    }
    element.innerHTML += `<div class="container border border-success mt-3 rounded bg-light shadow p-3 mb-5 bg-white rounded">
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1" id="logout">
          <div class="comment-tabs">
                      
                  <div class="tab-content">
                      <div class="tab-pane active" id="comments-logout">                
                          <ul class="media-list">
                            <li class="media">
                              <a class="pull-left" href="#">
                                <img class="media-object img-circle rounded-circle mt-3" src="img/loginuser.png" alt="profile">
                              </a>
                              <div class="media-body ">
                                <div class="well well-lg">
                                    <h4 class="media-heading text-uppercase reviews ml-2 mt-3"> ${sessionStorage.getItem("nick")} </h4>
                                    <ul class="media-date text-uppercase reviews list-inline ml-2">
                                      ${fechaYHora}
                                    </ul>
                                    <p class="media-comment ml-2">
                                      ${sessionStorage.getItem("comment")}
                                    </p>
                                    <a class="btn btn-info btn-circle text-lowercase" href="#" id="reply"><i class="fas fa-comment-dots"></i> Responder</a>
                                    <a class="btn btn-warning btn-circle text-lowercase" data-toggle="collapse" href="#replyOne"><i class="fas fa-comments"></i> 2 comentarios</a>
                                </div>        
                      </div>              
                    </div>  
                    <h5 class="badge badge-secondary">Calificacion</h5>
                    <div class="rating col-sm-4">
                    ${score}

                            `


    user.value = "";
    comentario.value = "";


  }


})





