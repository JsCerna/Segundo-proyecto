const btn_sal = document.querySelector("#saludo");
btn_sal.addEventListener("click", event => saludo());

const btn_reg = document.querySelector("#registrar");
btn_reg.addEventListener("click", event => crear());






function saludo (){
    const inputNombre = document.getElementById("nombre");
    const spanNom = document.getElementById("nom");

    spanNom.innerHTML = inputNombre.value;
}

function crear(){
    const etiquetaP = document.createElement("p");
    const inputNombre = document.getElementById("nombre");
    const valorParaEtiquetaP = document.createTextNode(inputNombre.value);

    etiquetaP.appendChild(valorParaEtiquetaP);

    const divRegistro = document.getElementById("registro");

    divRegistro.appendChild(etiquetaP);
}