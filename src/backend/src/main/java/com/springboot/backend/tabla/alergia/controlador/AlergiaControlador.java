package com.springboot.backend.tabla.alergia.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.alergia.modelo.Alergia;
import com.springboot.backend.tabla.alergia.repositorio.AlergiaRepositorio;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/public")
public class AlergiaControlador {
    @Autowired
    private AlergiaRepositorio alergiaRepositorio;

    @GetMapping("/alergias")
    public List<Alergia> listarTodasLasAlergias() {
        return alergiaRepositorio.findAll();
    }
    
    @PostMapping("/alergias")
    public Alergia guardarAlergia(@RequestBody Alergia alergia) {
        return alergiaRepositorio.save(alergia);
    }
    
    @GetMapping("/alergias/{id}")
    public ResponseEntity<Alergia> obtenerAlergiaPorId(@PathVariable Long id) {
        Alergia alergia=alergiaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la alergia con el id: "+id));
        return ResponseEntity.ok(alergia);
    }
    
    @PutMapping("/alergias/{id}")
    public ResponseEntity<Alergia> actualizarAlergia(@PathVariable Long id, @RequestBody Alergia detallesAlergia) {
        Alergia alergiaExistente=alergiaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la alergia con el id: "+id));

        alergiaExistente.setNombre(detallesAlergia.getNombre());
        alergiaExistente.setIngredientes(detallesAlergia.getIngredientes());

        Alergia alergiaActualizada=alergiaRepositorio.save(alergiaExistente);

        return ResponseEntity.ok(alergiaActualizada);
    }

    @DeleteMapping("/alergias/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarAlergia(@PathVariable Long id){
        Alergia alergia=alergiaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la alergia con el id: "+id));

        alergiaRepositorio.delete(alergia);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
