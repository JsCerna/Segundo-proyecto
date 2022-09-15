function leer(key){
    return JSON.parse(window.localStorage.getItem(key)) || [];
}

function guardar(key, data){
    window.localStorage.setItem(key, JSON.stringify(data));
}

let idPersona = document.querySelector("#id");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let correo = document.querySelector("#correo");
let nacionalidad = document.querySelector("#nacionalidad");
let edad = document.querySelector("#edad");

function addPersona(e){
    let personas = leer("personas");
    if(idPersona.value == 0 || idPersona.value == null){
        if(nombre.value == "" || apellido.value == "" || correo.value == "" || nacionalidad.value == "" || edad.value == "") {
            Swal.fire(
                '¡Alerta!',
                'Tienes que rellenar todos los campos de manera obligatoria.',
                'error'
              )
        } else {
            const persona = {
                id: (personas.length + 1),
                name : nombre.value,
                lastName : apellido.value,
                email : correo.value,
                nationality : nacionalidad.value,
                age : edad.value,
            }
            personas.push(persona);
        }     
    } else {
        let pos = personas.findIndex(persona => persona.id == idPersona.value);
        if (pos >= 0){
            personas[pos].name = nombre.value;
            personas[pos].lastName = apellido.value;
            personas[pos].email = correo.value;
            personas[pos].nationality = nacionalidad.value;
            personas[pos].age = edad.value;
        }
    }
    guardar("personas", personas);
    limpiarForm();
    mostrar();
}

function limpiarForm(){
    idPersona.value = 0;
    nombre.value = '';
    apellido.value = '';
    correo.value = '';
    nacionalidad.value = '';
    edad.value = null;
}

function mostrar(){
    let tbody = document.querySelector("#personajes");
    tbody.innerHTML = "";
    let personas = leer("personas");
    personas.forEach(element => {
        tbody.innerHTML += `<tr>
        <th>${element.id}</th>
        <td>${element.name}</td>
        <td>${element.lastName}</td>
        <td>${element.email}</td>
        <td>${element.nationality}</td>
        <td>${element.age}</td>
        <td>
            <button type="button" id="edit${element.id}" class="btn btn-outline-warning">edit</button>
            <button type="button" id="borrar${element.id}" class="btn btn-outline-danger">borrar</button>
        </td>
        </tr>
        `;
    });
}

function leerUno(id){
    let personas = leer("personas");
    let persona = personas[id - 1];
    idPersona.value = persona.id;
    nombre.value = persona.name;
    apellido.value = persona.lastName;
    correo.value = persona.email;
    nacionalidad.value = persona.nationality;
    edad.value = persona.age;
}

function borrarPersona(id){
    Swal.fire({
        title: '¿Estas seguro(a)?',
        text: "¡Estas a punto de eliminar tu perfil!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar.'
      }).then((result) => {
        if (result.isConfirmed) {
            let personas = leer("personas");
            let filtrado = personas.filter(persona => persona.id != id);
            guardar("personas", filtrado);
            mostrar();
          Swal.fire(
            '¡Borrado!',
            'El perfil a sido eliminado.',
            'success'
          )
        }
      })
}
mostrar();

let btnAdd = document.querySelector("#registrar");
btnAdd.addEventListener("click", (e) => {
    addPersona(e);
});

let editList = document.querySelectorAll(".btn-outline-warning");
editList.forEach(element => {
    element.addEventListener('click', (e) => {
        leerUno(element.id.match(/(\d+)/)[0]);
    })
});

let borrarList = document.querySelectorAll(".btn-outline-danger");
borrarList.forEach(element => {
    element.addEventListener('click', (e) => {
        borrarPersona(element.id.match(/(\d+)/)[0]);
    })
});