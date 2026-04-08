package com.polleria.proyecto.plato.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.polleria.proyecto.plato.entidad.Plato;
import com.polleria.proyecto.plato.servicio.PlatoServicio;

import com.polleria.proyecto.categoria.entidad.Categoria;
import com.polleria.proyecto.categoria.repositorio.CategoriaRepositorio;
import com.polleria.proyecto.categoria.servicio.CategoriaServicio;

@Controller
public class PlatoControlador {
    @Autowired
    private PlatoServicio servicio;

    @Autowired
    private CategoriaServicio servicioCategoria;

    @Autowired
    private CategoriaRepositorio categoriaRepositorio;

    @GetMapping("/carta/platos")
    public String listarTodosLosPlatos(Model modelo){
        modelo.addAttribute("platos", servicio.listarTodosLosPlatos());
        return "/prueba/platos";
    }

    @GetMapping("prueba/plato")
    public String listarTodosLosPlatosPrueba(Model modelo) {
        modelo.addAttribute("platos", servicio.listarTodosLosPlatos());
        return "extra/plato";
    }

    @GetMapping("/prueba/plato/nuevo")
    public String mostrarFormularioDeRegistrarPlato(Model modelo){
        Plato plato=new Plato();
        modelo.addAttribute("plato", plato);
        modelo.addAttribute("categorias", servicioCategoria.listarTodasLasCategorias());
        return "/creacion/crear_plato";
    }

    @PostMapping("/prueba/plato")
    public String guardarPlato(@ModelAttribute("plato") Plato plato){
        servicio.guardarPlato((plato));
        return "redirect:/prueba/plato";
    }

    @GetMapping("/prueba/plato/editar/{id}")
    public String mostrarFormularioDeEditar(@PathVariable Long id, Model modelo){
        modelo.addAttribute("plato", servicio.obtenerPlatoPorId(id));
        return "edicion/editar_plato";
    }

    @PostMapping("/prueba/plato/{id}")
    public String actualizarPlato(@PathVariable Long id, @ModelAttribute("plato") Plato plato, Model modelo) {
        Plato platoExistente=servicio.obtenerPlatoPorId(id);
        platoExistente.setId(id);
        platoExistente.setNombre(plato.getNombre());
        platoExistente.setPrecio(plato.getPrecio());
        platoExistente.setDescripcion(plato.getDescripcion());

        servicio.actualizarPlato(platoExistente);
        return "redirect:/prueba/plato";
    }
    
    @GetMapping("/prueba/plato/eliminar/{id}")
    public String eliminarPlato(@PathVariable Long id) {
        servicio.eliminarPlato(id);
        return "redirect:/prueba/plato";
    }
    

    @GetMapping("/platos/por-categoria/{id}")
    public String obtenerPlatoPorCategoria(Model modelo){
        List<Categoria> categorias = categoriaRepositorio.findAll();
        modelo.addAttribute("categorias", categorias);
        return "redirect:/carta";
    }
}
