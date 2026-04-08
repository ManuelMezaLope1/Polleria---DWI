package com.polleria.proyecto.prueba.controlador;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PruebaControlador {
    @GetMapping("/prueba")
    public String prueba(){
        return "prueba";
    }

    @GetMapping("/categoria")
    public String pruebaCategoria() {
        return "extra/categoria";
    }

    @GetMapping("/plato")
    public String pruebaPlato() {
        return "extra/plato";
    }
    
    @GetMapping("/nosotros")
    public String mostrarNosotros() {
        return "nosotros";
    }

    @GetMapping("/usuario")
    public String pruebaRol() {
        return "extra/usuario";
    }
}
