document.getElementById("formularioRegistroPlato").addEventListener("submit", function (event) {
    const nombre = document.getElementById("nombre").value.trim();
    const precio = document.getElementById("precio").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    const regexnombre = /^[A-Z][a-zA-ZáéíóúÁÉÍÓÚÑñ\s]+$/;

    if (nombre === "") {
        Swal.fire({
            icon: "warning",
            title: "Nombre requerido",
            text: "El nombre del plato es obligatorio",
        });
        event.preventDefault();
        return false;
    } else if (!regexnombre.test(nombre)) {
        Swal.fire({
            icon: "warning",
            title: "Nombre inválido",
            text: "El nombre debe estar en mayúscula y contener solo letras",
        });
        event.preventDefault();
        return false;
    }

    if (precio === "" || precio <= 0) {
        Swal.fire({
            icon: "warning",
            title: "Precio inválido",
            text: "El precio del plato debe ser mayor que cero",
        });
        event.preventDefault();
        return false;
    }

    if (descripcion === "") {
        Swal.fire({
            icon: "warning",
            title: "Descripción requerida",
            text: "La descripción del plato es obligatoria",
        });
        event.preventDefault();
        return false;
    }

    return true;
});