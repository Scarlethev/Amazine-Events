
const fechaBase = datos.fechaActual;
const eventos = datos.eventos;
var eventosPasados = []; // array vacios
var eventosFuturos = []; // array vacios
var arrayFiltrado=[] // array vacio
var arrayAFiltrar=[] //
var filtroLimpiado=[];
var arrayCheckbox=[];

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
            arrayFiltrado=(eventosFuturos)
            display(eventosFuturos)
            document.getElementById("navarDinamico").innerHTML = "Upcoming Events";
            arrayAFiltrar=eventosFuturos
            checkboxListener(eventosFuturos)
           
            break;

        case "past":
            arrayFiltrado=(eventosPasados)
            display(eventosPasados)
            document.getElementById("navarDinamico").innerHTML = "Past Events"
            arrayAFiltrar=eventosPasados
            checkboxListener(eventosPasados)
            break;

        default:
            arrayFiltrado=(eventos)
            display(eventos)
            document.getElementById("navarDinamico").innerHTML = "Home"
            arrayAFiltrar=eventos;
            checkboxListener(eventos)
    }
}

function display(array) { // funcion que indica que va de acuerdo al array que se le pase 
    //y se indica en que parte del HTML colocarlo 

    var html = "";

    for (var i = 0; i < array.length; i++) { //temple String el html
        html += ` 
    <div class="card" style="border-width:0px">
    <img src="/Recursos AE/Images/${array[i].image}" class="card-img-top" alt=${array[i].name}>
    <div class="card-body" id="changeLetter">
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

var page = location.search.split("?page=");

console.log(page[1]);

switch (page[1]) {

    case "upcoming": imprimir("upcoming")
        document.getElementById("navarDinamico").innerHTML = "Upcoming Events"
        break;


    case "past": imprimir("past")
        document.getElementById("navarDinamico").innerHTML = "Past Events"
        break;

    default: imprimir("home")
        document.getElementById("navarDinamico").innerHTML = "Home"
}


var botonDerecho = document.getElementById("after");

var botonIzquierdo = document.getElementById("before");


//funcion que dinamiza al botton de next y past

botonIzquierdo.addEventListener("click", function (e) { // recorre y agrega el evento click
    botones() // Llamada de la funcion ;
})

    botonDerecho.addEventListener("click", function (e) { // recorre y agrega el evento click
        botones()  // Llamada de la funcion 
    })

function botones (){ 

    if(page[1]=="upcoming"){
        botonDerecho.href="/Paginas/home.html?page=past"; //Past
        botonIzquierdo.href="./home.html" //home
       
    }

    else if(page[1]== "past"){
        botonDerecho.href="./contactUs.html"; //Contacto
        botonIzquierdo.href="/Paginas/home.html?page=upcoming" //Upcoming
    }

    else{
        botonIzquierdo.href="./stats.html"
        botonDerecho.href="/Paginas/home.html?page=upcoming"
    }
    }


// BOTON DARKMODE

var body = document.getElementById("body");

const botonDark = document.getElementById("modoOscuro");

botonDark.addEventListener("click", function(){
   body.classList.toggle("darkMode")
   input.classList.toggle("darkMode")
   if(botonDark.innerText=="DarkMode"){
    botonDark.innerHTML="LightMode"
   }
   else{
    botonDark.innerHTML="DarkMode"
   }
   })

   

//FILTRADO EN EL BOTON DE SEARCH

var input= document.getElementById("input");

/*input.addEventListener("keyup", function(evento){
    mostrar(evento)
   
}) */

// fUNCION DE ARRIBA REPLICADA EN FUNCION FLECHA 

input.addEventListener("keyup",(evento)=>{(evento)
    var filtroSearch = evento.target.value;
    filtroLimpiado = filtroSearch.trim().toLowerCase();

    filtrosCombinados()

})


// FUNCION DE FILTRADO CHECKBOX

function checkboxListener(){

var checkbox=document.querySelectorAll('input[type=checkbox]'); 


for(var i=0; i<checkbox.length; i++){
    checkbox[i].addEventListener("click", function(){

        arrayCheckbox=[];

    for(var i=0; i<checkbox.length; i++){
        if (checkbox[i].checked){
            arrayCheckbox.push(checkbox[i].value)
        }
       
    }
     //console.log(arrayCheckbox);
    filtrosCombinados()
    
})

}

}


function filtrosCombinados(){
    
    var eventosPorCategoria = [];

    if(filtroLimpiado !== "" && arrayCheckbox.length > 0) {
    arrayCheckbox.map(category => {eventosPorCategoria.push(...arrayAFiltrar.filter(evento => 
    evento.name.toLowerCase().includes(filtroLimpiado) && evento.category === category))
})
        
    }

    else if(filtroLimpiado !== "" && arrayCheckbox.length == 0){
        eventosPorCategoria= arrayAFiltrar.filter(evento => evento.name.toLowerCase().includes(filtroLimpiado))
    }

    else if (filtroLimpiado === "" && arrayCheckbox.length > 0) {

        arrayCheckbox.map(category =>
            eventosPorCategoria.push(...arrayAFiltrar.filter(evento => evento.category === category))
        )

    }

    else {
        eventosPorCategoria = arrayAFiltrar
       
    }

    eventosPorCategoria.length > 0 ? 
    display(eventosPorCategoria) : 
    document.getElementById("todosLosEventos").innerHTML = `<h1 class="ceroResult" >No se encontraron eventos para tu busqueda </h1>`

    }



// En caso de que no tengas los checkbox armados en el HTML 

// La funcion va a recibir el array del Amazine events llamado eventos 










