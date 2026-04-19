package com.polleria.proyecto.venta.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.polleria.proyecto.venta.servicio.VentaServicio;

@Controller
public class VentaControlador {
    @Autowired
    private VentaServicio servicio;

    @GetMapping({"/", "/inicio"})
    public String listarTodasLasVentas(Model modelo){
        modelo.addAttribute("ventas", servicio.listarTodasLasVentas());
        return "/inicio";
    }
}
