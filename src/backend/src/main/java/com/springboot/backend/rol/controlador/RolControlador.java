package com.springboot.backend.rol.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.rol.modelo.Rol;
import com.springboot.backend.rol.repositorio.RolRepositorio;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class RolControlador {
    @Autowired
    private RolRepositorio repositorio;

    @GetMapping("/roles")
    public List<Rol> listarTodosLosRoles() {
        return repositorio.findAll();
    }
    
    @PostMapping("/roles")
    public Rol guardarRol(@RequestBody Rol rol) {
        return repositorio.save(rol);
    }
    
    @GetMapping("/roles/{id}")
    public ResponseEntity<Rol> obtenerRolPorId(@PathVariable Long id) {
        Rol rol=repositorio.findById(id).orElseThrow(()-> new ResourceNotFoundException("No existe el rol con el id: "+id));

        return ResponseEntity.ok(rol);
    }

    @PutMapping("/roles/{id}")
    public ResponseEntity<Rol> actualizarRol(@PathVariable Long id, @RequestBody Rol detallesRol) {
        Rol rolExistente=repositorio.findById(id).orElseThrow(()-> new ResourceNotFoundException("No existe el rol con el id: "+id));
        
        rolExistente.setNombre(detallesRol.getNombre());;

        Rol rolActualizado=repositorio.save(rolExistente);

        return ResponseEntity.ok(rolActualizado);
    }
    
    @DeleteMapping("/roles/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarRol(@PathVariable Long id){
        Rol rol=repositorio.findById(id).orElseThrow(()-> new ResourceNotFoundException("No existe el rol con el id: "+id));

        repositorio.delete(rol);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
