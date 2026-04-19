function cargarPlatos(boton) {
    let categoriaId = boton.getAttribute("data-id");

    fetch("/platos/por-categoria/" + categoriaId)
        .then(response => response.json())
        .then(data => {
            let lista = document.getElementById("listaPlatos");
            lista.innerHTML = "";

            if (data.length === 0) {
                lista.innerHTML = "<li class='list-group-item'>No hay platos</li>";
                return;
            }

            data.forEach(plato => {
                let li = document.createElement("li");
                li.className = "list-group-item";
                li.textContent = plato.nombre;
                lista.appendChild(li);
            });
        });
}
