let eventos;

async function getData(){

    let datosApi;
    await fetch ("https://amd-amazingevents-api.onrender.com/api/eventos")
    .then (response => response.json())
    .then (json => datosApi=json)
  
  eventos= datosApi.eventos
  fechaBase= datosApi.fechaActual;

init()
  
  }
  
  getData()

function init(){

    console.log(eventos)
   
//CATEGORIAS FUTURAS 

    let eventosFuturos = eventos.filter(evento => evento.date > fechaBase)
    let categoriasFuturas= eventosFuturos.filter(evento => evento.category)
    
    //map hace una copia del objeto eventos solo con la información de las categorias
    // El parametro "categorias", es como el "i" en el for, es el que recorre y guarda el dato

    let copiaCategoriasFuturas=categoriasFuturas.map(categororias=> categororias.category)
    let categoriasUnicasFuturas= new Set(copiaCategoriasFuturas); //new Set se utiliza para eliminar las categorias repetidas
    let categoryFuturas=[...categoriasUnicasFuturas] // Los "..." se usan para convertir un Set a Array
    console.log(categoryFuturas);


//CATEGORIAS PASADAS

    let eventosPasados = eventos.filter(evento => evento.date < fechaBase)  
    let categoriasPasadas= eventosPasados.filter(evento => evento.category)
    console.log(categoriasPasadas);
    let copiaCategoriasPasadas= categoriasPasadas.map(categororias=> categororias.category)
    let categoriasUnicasPasadas= new Set(copiaCategoriasPasadas); //new Set se utiliza para eliminar las categorias repetidas
    let categoryPasadas=[...categoriasUnicasPasadas]
    console.log(categoryPasadas)


    //eventos mayor y menor % de asistencia

        eventosPasados.map(evento=> {
        evento.porcentajeAsistencia= ((evento.assistance*100) / evento.capacity)})


        console.log(eventosPasados);

        
// CONSTRUIR UN NUEVO OBJETO POR CATEGORIA

//Separo los datos por categoria Futuras
let porCategoriasFuturas = []

categoryFuturas.forEach(categoria=>{//Primero separo cada una de las categorias

//Creo un nuevo objeto con dos propiedades el nombre de la categoria y los datos agrupados de las mismas
   
porCategoriasFuturas.push({ 
       categoria:categoria, //Nombre de la categoria
       data: categoriasFuturas.filter(evento => evento.category === categoria)}) //Datos separados de cada categoria
    })

console.log(porCategoriasFuturas);

//Separo los datos por categoria Pasadas

let porCategoriasPasadas = []

categoryPasadas.forEach(categoria=>{//Primero separo cada una de las categorias
   //Creo un nuevo objeto con dos propiedades el nombre de la categoria y los datos agrupados de las mismas
   
   porCategoriasPasadas.push({ 
       categoria:categoria, //Nombre de la categoria
       data: categoriasPasadas.filter(evento => evento.category === categoria)}) //Datos separados de cada region 
    })

console.log(porCategoriasPasadas);

// AGREGAMOS UN NUEVO ATRIBUTO INGRESOS, CALCULANDO PRECIO * ASISTENCIA o ESTIMACION

let ingresos1=[];

porCategoriasFuturas.map(evento =>{

    ingresos1.push({
        categoria: evento.categoria,
        estimacionDeIngresos: evento.data.map(item => item.estimate * item.price),
        estimacionDeAsistencia: evento.data.map(item => item.estimate),
        capacidad: evento.data.map(item=> item.capacity)
    })
})

console.log(ingresos1)

let ingresos2=[];

porCategoriasPasadas.map(evento =>{
    ingresos2.push({
        categoria: evento.categoria,
        ingresos: evento.data.map(item => item.assistance * item.price),
        asistencia: evento.data.map(item => item.assistance),
        capacidad: evento.data.map(item=> item.capacity)
    })
})

console.log(ingresos2)

//SUMAMOS LOS INGRESOS POR CATEGORIA PASADAS

    ingresos2.forEach(categoria => {
    let totalIngresos=0;
    categoria.ingresos.map(item => totalIngresos +=item)
    categoria.ingresos=totalIngresos;

    let totalAsistencia=0;
    let totalCapacidad=0;

categoria.capacidad.map(item=> totalCapacidad += item)
categoria.capacidad=totalCapacidad

categoria.asistencia.map(item=> totalAsistencia += item)
categoria.asistencia=totalAsistencia

categoria.porcentajeDeAsistencia= (totalAsistencia*100/totalCapacidad).toFixed(2);

})

//SUMAMOS LOS INGRESOS POR  CATEGORIA FUTURAS

ingresos1.forEach(categoria => {
    let totalIngresos=0;
    categoria.estimacionDeIngresos.map(item => totalIngresos +=item)
    categoria.estimacionDeIngresos=totalIngresos;
    
let totalAsistencia=0;
let totalCapacidad=0;

categoria.capacidad.map(item=> totalCapacidad += item)
categoria.capacidad=totalCapacidad

categoria.estimacionDeAsistencia.map(item=> totalAsistencia += item)
categoria.estimacionDeAsistencia=totalAsistencia

categoria.porcentajeDeAsistencia=(totalAsistencia*100/totalCapacidad).toFixed(2);


})

 
console.log(ingresos1);
console.log(ingresos2);


//EVENTO DE MAYOR ASISTENCIA


let asistenciaEventos=[];

eventosPasados.filter(evento=>{asistenciaEventos.push(evento.porcentajeAsistencia)})


  // //Busco el mayor valor y filtro por este el array de eventos
  let mayor = Math.max(...asistenciaEventos)
  let eventoMayorAsistencia = eventos.filter(evento => evento.porcentajeAsistencia === mayor)
        
 // Busco el menor valor y filtro por este el array de eventos pasados
    let menor = Math.min(...asistenciaEventos)
    let eventoMenorAsistencia = eventos.filter(evento => evento.porcentajeAsistencia === menor)

    // Busco el evento con mayor capacidad por ordenamiento descendente
    let mayorCapacidad = eventos.sort((a, b) => { return b.capacity - a.capacity })


 //GENERO DATOS EN TABLA DE EVENTOS CON MAYOR Y MENOR ASISTENCIA Y CAPACIDAD
 var rowMayoresYmenores = document.getElementById("mayoresYmenores")
//  rowMayoresYmenores.innerHTML = ""
 var tdMayorAsistencia = document.createElement("td")
 var tdMenorAsistencia = document.createElement("td")
 var tdMayorCapacidad = document.createElement("td")

 rowMayoresYmenores.append(tdMayorAsistencia)
 tdMayorAsistencia.append(eventoMayorAsistencia[0].name + " %" + eventoMayorAsistencia[0].porcentajeAsistencia.toFixed(2))

 rowMayoresYmenores.append(tdMenorAsistencia)
 tdMenorAsistencia.append(eventoMenorAsistencia[0].name + " %" + eventoMenorAsistencia[0].porcentajeAsistencia.toFixed(2))

 rowMayoresYmenores.append(tdMayorCapacidad)
 tdMayorCapacidad.append(mayorCapacidad[0].name + "(" + mayorCapacidad[0].category + ")")


 //GENERAR LOS DATOS DE CATEGIRIAS DE EVENTOS FUTUROS

 var tablaFuturos = document.getElementById("categoriasFuturas")

 ordenarFuturos = []
 ordenarFuturos.push(...ingresos1.sort((a, b) => {
     return b.estimacionDeIngresos - a.estimacionDeIngresos
 }))

 console.log(ordenarFuturos)

 ordenarFuturos.map(evento => {
     if (evento.estimacionDeIngresos > 0) {
         tablaFuturos.innerHTML +=   
             `
        <tr>
           <td>${evento.categoria}</td>
           <td>$${evento.estimacionDeIngresos}</td>
           <td>${evento.porcentajeDeAsistencia}</td> 
         </tr>
           `
     }
 })


 //GENERAR LOS DATOS DE CATEGIRIAS DE EVENTOS Pasados

 var tablaPasados = document.getElementById("categoriasPasadas")

 let ordenarPasados = []
 ordenarPasados.push(...ingresos2.sort((a, b) => {
     return b.ingresos - a.ingresos
 }))

 console.log(ordenarPasados)

 ordenarPasados.map(evento => {
     if (evento.ingresos > 0) {
         tablaPasados.innerHTML +=
        `
        <td>${evento.categoria}</td>
        <td>$${evento.ingresos}</td>
        <td>${evento.porcentajeDeAsistencia}</td>
    
  `
     }
 })

 var body = document.getElementById("body");

 const botonDark = document.getElementById("modoOscuro");
 
 botonDark.addEventListener("click", function(){
    body.classList.toggle("darkMode")
    td[this.children].classList.toggle("darkMode")
    if(botonDark.innerText=="DarkMode"){
     botonDark.innerHTML="LightMode"
    }
    else{
     botonDark.innerHTML="DarkMode"
    }
    })
 


}


