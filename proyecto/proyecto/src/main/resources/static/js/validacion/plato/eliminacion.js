document.querySelectorAll('.btnEliminar').forEach(boton => {
    boton.addEventListener('click', () => {

        const id = boton.dataset.id;

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, estoy seguro"
        }).then((result1) => {

            if (result1.isConfirmed) {

                Swal.fire({
                    title: "¿En serio?",
                    text: "¿Realmente está seguro?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Realmente estoy seguro"
                }).then((result2) => {

                    if (result2.isConfirmed) {

                        // 👉 URL de Spring Boot
                        window.location.href = `prueba/plato/eliminar/{id}`;

                    }
                });
            }
        });
    });
});