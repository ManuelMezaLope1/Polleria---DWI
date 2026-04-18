package com.polleria.proyecto.categoria.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.polleria.proyecto.categoria.entidad.Categoria;
import com.polleria.proyecto.categoria.servicio.CategoriaServicio;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CategoriaControlador {
    @Autowired
    private CategoriaServicio servicio;

    @GetMapping("/carta")
    public String listarTodasLasCategorias(Model modelo) {
        modelo.addAttribute("categorias", servicio.listarTodasLasCategorias());
        return "carta";
    }

    @GetMapping("prueba/categoria")
    public String listarTodasLasCategoriasPrueba(Model modelo) {    
        modelo.addAttribute("categorias", servicio.listarTodasLasCategorias());
        return "extra/categoria";
    }
    
    @GetMapping("prueba/categoria/nuevo")
    public String mostrarFormularioDeRegistrarCategoria(Model modelo) {
        Categoria categoria=new Categoria();
        modelo.addAttribute("categoria", categoria);
        return "creacion/crear_categoria";
    }
    
    @PostMapping("prueba/categoria")
    public String guardarCategoria(@ModelAttribute("categoria") Categoria categoria) {
        servicio.guardarCategoria((categoria));
        return "redirect:/prueba/categoria";
    }
    
    @GetMapping("/prueba/categoria/editar/{id}")
    public String mostrarFormularioDeEditar(@PathVariable Long id, Model modelo) {
        modelo.addAttribute("categoria", servicio.obtenerCategoriaPorId(id));
        return "edicion/editar_categoria";
    }
    
    @PostMapping("/prueba/categoria/{id}")
	public String actualizarCategoria(@PathVariable Long id, @ModelAttribute("categoria") Categoria categoria, Model modelo) {
		Categoria categoriaExistente=servicio.obtenerCategoriaPorId(id);
		categoriaExistente.setId(id);
		categoriaExistente.setNombre(categoria.getNombre());
		categoriaExistente.setDescripcion(categoria.getDescripcion());
		
		servicio.actualizarCategoria(categoriaExistente);
		return "redirect:/prueba/categoria";
	}
    
    @GetMapping("/prueba/categoria/eliminar/{id}")
    public String eliminarCategoria(@PathVariable Long id) {
        servicio.eliminarCategoria(id);
        return "redirect:/prueba/categoria";
    }
    
}
