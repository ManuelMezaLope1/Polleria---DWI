package com.springboot.backend.tabla.categoriaingrediente.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.categoriaingrediente.modelo.CategoriaIngrediente;
import com.springboot.backend.tabla.categoriaingrediente.repositorio.CategoriaIngredienteRepositorio;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/v1/public")
public class CategoriaIngredienteControlador {
    @Autowired
    private CategoriaIngredienteRepositorio categoriaIngredienteRepositorio;

    @GetMapping("/categoria-ingrediente")
    public List<CategoriaIngrediente> listarTodasLasCategoriasIngredientes() {
        return categoriaIngredienteRepositorio.findAll();
    }

    @PostMapping("/categoria-ingrediente")
    public CategoriaIngrediente registrarCategoriaIngrediente(@RequestBody CategoriaIngrediente categoriaIngrediente) {
        return categoriaIngredienteRepositorio.save(categoriaIngrediente);
    }

    @GetMapping("/categoria-ingrediente/{id}")
    public ResponseEntity<CategoriaIngrediente> obtenerCategoriaIngredientePorId(@PathVariable Long id) {
        CategoriaIngrediente categoriaIngrediente=categoriaIngredienteRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la categoría con el id: "+id));
        return ResponseEntity.ok(categoriaIngrediente);
    }
    
    @PutMapping("/categoria-ingrediente/{id}")
    public ResponseEntity<CategoriaIngrediente> actualizarCategoriaIngrediente(@PathVariable Long id, @RequestBody CategoriaIngrediente detallesCategoriaIngredientes) {
        CategoriaIngrediente categoriaIngredienteExistente=categoriaIngredienteRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la categoría con el id: "+id));

        categoriaIngredienteExistente.setNombre(detallesCategoriaIngredientes.getNombre());

        CategoriaIngrediente categoriaIngredienteActualizada=categoriaIngredienteRepositorio.save(categoriaIngredienteExistente);

        return ResponseEntity.ok(categoriaIngredienteActualizada);
    }
}
