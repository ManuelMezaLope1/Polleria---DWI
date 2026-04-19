package com.polleria.proyecto.promocion.controlador;

import com.polleria.proyecto.promocion.entidad.Promocion;
import com.polleria.proyecto.promocion.servicio.PromocionServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/promociones")
public class PromocionControlador {

    @Autowired
    private PromocionServicio servicio;

    @GetMapping
    public String listar(Model model) {
        model.addAttribute("promociones", servicio.listar());
        return "extra/promociones";
    }

    @GetMapping("/nuevo")
    public String nuevo(Model model) {
        model.addAttribute("promocion", new Promocion());
        return "creacion/crear_promocion";
    }

    @PostMapping("/guardar")
    public String guardar(@ModelAttribute Promocion promocion) {
        servicio.guardar(promocion);
        return "redirect:/promociones";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Long id) {
        servicio.eliminar(id);
        return "redirect:/promociones";
    }
}