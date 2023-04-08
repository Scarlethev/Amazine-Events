
const fechaBase = datos.fechaActual;

console.log(fechaBase);

const eventos = datos.eventos;

console.log(eventos);

var eventosPasados = []; // array vacios

var eventosFuturos = []; // array vacios

for (var i = 0; i < eventos.length; i++) { //condicionales para ingresar en los arrays de acuerdo a la fecha

    if (eventos[i].date > fechaBase) {
        eventosFuturos.push(eventos[i])
    } else {
        eventosPasados.push(eventos[i])
    }
}

var buttonNav = document.getElementsByClassName("navlink"); // captura los elementos con class navlist

for (var i = 0; i < buttonNav.length; i++) {
    const element = buttonNav[i];
    element.addEventListener("click", function (e) { // recorre y agrega el evento click
        imprimir(e.target.id);  // Llamada de la funcion 
    })
}

function imprimir(id) { //funcion que de acuerdo a los id de los botones indica el array 
    //a mostrar y el cambio de titulo en el navarDinamico

    switch (id) {

        case "upcoming":
            display(eventosFuturos)
            document.getElementById("navarDinamico").innerHTML = "Upcoming Events";

            break;

        case "past":
            display(eventosPasados)
            document.getElementById("navarDinamico").innerHTML = "Past Events"

            break;

        default:
            display(eventos)
            document.getElementById("navarDinamico").innerHTML = "Home"
    }
}

function display(array) { // funcion que indica que va de acuerdo al array que se le pase 
    //y se indica en que parte del HTML colocarlo 

    var html = "";

    for (var i = 0; i < array.length; i++) { //temple String el html
        html += ` 
    <div class="card" style="border-width:0px">
    <img src="/Recursos AE/Images/${array[i].image}" class="card-img-top" alt=${array[i].name}>
    <div class="card-body">
      <h5 class="card-title">${array[i].name}</h5>
      <p class="card-text">${array[i].description}</p>
      <div class="textInferior">
        <p>Precio $ ${array[i].price}</p>
        <a href=./detalle.html?id=${array[i].id} class="btn btn-outline-danger" id="detalles" >Más Detalle</a>
      </div>
    </div>
  </div>
`
        //En detalle se esta enviando un parametro a la url ./detalle.html?id=${array[i].id}

        //console.log(html);
        
    }

    document.getElementById("todosLosEventos").innerHTML = html;

}

imprimir("home")

//BUSCAMOS EL URL AL QUE QUEREMOS IR// INDICADO EN LA RUTA DEL NAV DEL HTML
//EN ESTE CASO NOSOTROS AGREGAMOS LA RUTA  EN EL HTML, EL PARAMETRO:
//  ""./home.html?page=upcoming" o "page=past"// Verificamos que así se muestre
// en la web con console.log(location.search)

//COLOCANDO LAS RUTAS DESDE DETALLES A LOS FILTRADOS DE HOME

console.log(location.search);

var page=location.search.split("?page=");

console.log(page[1]);

switch(page[1]){

    case "upcoming": imprimir("upcoming")
    document.getElementById("navarDinamico").innerHTML = "Upcoming Events"
    break;


    case "past": imprimir("past")
    document.getElementById("navarDinamico").innerHTML = "Past Events"
    break;

    default: imprimir ("home")
    document.getElementById("navarDinamico").innerHTML = "Home"
}


var botonDerecho = document.getElementById("after");

var botonIzquierdo = document.getElementById("before");


//funcion que dinamiza al botton de next y past

var contador=0;

botonDerecho.addEventListener("click", function(e){
    contador=contador +1;
    console.log(contador)
        imprimir(e.target.id)
   

})


botonIzquierdo.addEventListener("click", function(e){
    contador=contador -1;
    console.log(contador)
        imprimir(e.target.id)
   

})



