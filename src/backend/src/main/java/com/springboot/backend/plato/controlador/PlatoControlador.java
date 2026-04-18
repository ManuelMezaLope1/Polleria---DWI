package com.springboot.backend.plato.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.plato.modelo.Plato;
import com.springboot.backend.plato.repositorio.PlatoRepositorio;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class PlatoControlador {
    @Autowired
    private PlatoRepositorio repositorio;

    @GetMapping("/platos")
    public List<Plato> listarTodosLosPlatos() {
        return repositorio.findAll();
    }
    
    @PostMapping("/platos")
    public Plato guardarPlato(@RequestBody Plato plato) {
        return repositorio.save(plato);
    }
    
    @GetMapping("/platos/{id}")
    public ResponseEntity<Plato> obtenerPlatoPorId(@PathVariable Long id) {
        Plato plato=repositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el plato con el id: "+id));

        return ResponseEntity.ok(plato);
    }
    
    @PutMapping("/platos/{id}")
    public ResponseEntity<Plato> actualizarPlato(@PathVariable Long id, @RequestBody Plato detallesPlato) {
        Plato platoExistente=repositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el plato con el id: "+id));
        
        platoExistente.setNombre(detallesPlato.getNombre());
        platoExistente.setPrecio(detallesPlato.getPrecio());
        platoExistente.setDescripcion(detallesPlato.getDescripcion());
        platoExistente.setCategoria(detallesPlato.getCategoria());

        Plato platoActualizado=repositorio.save(platoExistente);

        return ResponseEntity.ok(platoActualizado);
    }

    @DeleteMapping("/platos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarPlato(@PathVariable Long id){
        Plato plato=repositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el plato con el id: "+id));

        repositorio.delete(plato);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
