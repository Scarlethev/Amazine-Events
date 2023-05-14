let eventos;

async function getData(){

  let datosApi;
  await fetch ("https://amd-amazingevents-api.onrender.com/api/eventos")
  .then (response => response.json())
  .then (json => datosApi=json)

eventos= datosApi.eventos
fechaBase= datosApi.fechaActual;

detalles()


}

getData()

console.log(eventos)

console.log(location.search);

function detalles(){

var id=location.search.split("?id=").filter(Number)

console.log(id);

var selectId= id[0]

const eventoDetalles= [];

for (var i = 0; i < eventos.length; i++) {

    if (eventos[i].id==selectId) {
        eventoDetalles.push(eventos[i])
    }
}

console.log(eventoDetalles[0])

var texto= document.getElementById("detalles");

var asisOesti= eventoDetalles[0].assistance? "Asistencia" : "Estimación"
//Este es un ternario que verifica si el objeto cuando con una propiedad llamada 
//asistencia o estimado, y de acuerdo a ello cambie el titulo- Anexado en el temple

       texto.innerHTML=
       
       `<div class="container-detalles backgroundDetalles" id="detalles" background>
       <img src="${eventoDetalles[0].image}">
       <div class="container-texto">
         <h5 class="card-title">${eventoDetalles[0].name}</h5>
         <p class="card-text">
           <br>
           ${eventoDetalles[0].description}
         </p>
         <p class="separacion"><i class="bi bi-calendar"></i>${eventoDetalles[0].date}</p>
         <p class="separacion"><i class="bi bi-geo-alt"></i>${eventoDetalles[0].place}</p>
         <p class="separacion"><b>Capacity: </b>${eventoDetalles[0].capacity}</p>
         <p class="separacion"<b>${asisOesti} : </b>${eventoDetalles[0].assistance||eventoDetalles[0].estimate}</p>
         <p class="separacion"><i class="bi bi-cash-stack"></i> ${eventoDetalles[0].price}</p>
 
       </div>
     </div>
 
     <br>
 
     <div class="map">
 
       <p> <b>Ubicacion:</b></p>
       <p>Av. Alvear 1690, C1014 CABA </p>
 
       <iframe
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.5876787024977!2d-58.389140085011114!3d-34.58929816424173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccabb330c498b%3A0xa70d19ecb18a0e0c!2sMinisterio%20de%20Cultura%20de%20la%20Naci%C3%B3n!5e0!3m2!1ses!2sar!4v1678653072543!5m2!1ses!2sar"
         width="80%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
         referrerpolicy="no-referrer-when-downgrade"></iframe>
 
     </div>`
}


