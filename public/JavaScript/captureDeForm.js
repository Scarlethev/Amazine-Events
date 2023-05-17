let form = document.querySelector("form")
const modal = document.querySelector('#modal')
const cerrar = document.querySelector('.close')
form.addEventListener("submit", (event) => {
  actionForm(event)
  modal.style.display = "block"
})

function modalForm() {
  modal.style.display = "none";
  location.reload()
}
cerrar.addEventListener("click", modalForm);

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none"
  }
})

function actionForm(evento) {
  evento.preventDefault()
  let formDatos = {
    nombre: evento.target[1].value,
    apellido: evento.target[2].value,
    direccionDeEmail: evento.target[3].value,
    telefono: evento.target[4].value,
    mensaje: evento.target[5].value
  }
  console.log(formDatos);
}


function backHome() {
  setState("paginaANavegar", "Home")
  ChangeTemplateLayaout()
}

var body = document.getElementById("body");

const botonDark = document.getElementById("modoOscuro");

botonDark.addEventListener("click", function(){
   body.classList.toggle("darkMode")
   if(botonDark.innerText=="DarkMode"){
    botonDark.innerHTML="LightMode"
   }
   else{
    botonDark.innerHTML="DarkMode"
   }
   })


