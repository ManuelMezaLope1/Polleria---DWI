package com.springboot.backend.tabla.ingrediente.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.ingrediente.modelo.Ingrediente;
import com.springboot.backend.tabla.ingrediente.repositorio.IngredienteRepositorio;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/public")
public class IngredienteControlador {
    @Autowired
    private IngredienteRepositorio ingredienteRepositorio;

    @GetMapping("/ingredientes")
    public List<Ingrediente> listarTodosLosIngredientes() {
        return ingredienteRepositorio.findAll();
    }
    
    @PostMapping("/ingredientes")
    public Ingrediente guardarIngrediente(@RequestBody Ingrediente ingrediente) {
        return ingredienteRepositorio.save(ingrediente);
    }
    
    @GetMapping("/ingredientes/{id}")
    public ResponseEntity<Ingrediente> obtenerIngredientePorId(@PathVariable Long id) {
        Ingrediente ingrediente=ingredienteRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el ingrediente con el id: "+id));

        return ResponseEntity.ok(ingrediente);
    }
    
    @PutMapping("/ingredientes/{id}")
    public ResponseEntity<Ingrediente> actualizarIngrediente(@PathVariable Long id, @RequestBody Ingrediente detallesIngrediente) {
        Ingrediente ingredienteExistente=ingredienteRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el ingrediente con el id: "+id));

        ingredienteExistente.setNombre(detallesIngrediente.getNombre());
        ingredienteExistente.setPlatos(detallesIngrediente.getPlatos());
        ingredienteExistente.setAlergia(detallesIngrediente.getAlergia());

        Ingrediente ingredienteActualizado=ingredienteRepositorio.save(ingredienteExistente);
        
        return ResponseEntity.ok(ingredienteActualizado);
    }

    @DeleteMapping("/ingredientes/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarIngrediente(@PathVariable Long id){
        Ingrediente ingrediente=ingredienteRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el ingrediente con el id: "+id));

        ingredienteRepositorio.delete(ingrediente);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
