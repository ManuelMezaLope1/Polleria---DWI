package com.springboot.backend.tabla.rol.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.rol.modelo.Rol;
import com.springboot.backend.tabla.rol.repositorio.RolRepositorio;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/public")
public class RolControlador {
    @Autowired
    private RolRepositorio rolRepositorio;

    @GetMapping("/roles")
    public List<Rol> listarTodosLosRoles() {
        return rolRepositorio.findAll();
    }
    
    @PostMapping("/roles")
    public Rol guardarRol(@RequestBody Rol rol) {
        return rolRepositorio.save(rol);
    }
    
    @GetMapping("/roles/{id}")
    public ResponseEntity<Rol> obtenerRolPorId(@PathVariable Long id) {
        Rol rol=rolRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el rol con el id: "+id));
        return ResponseEntity.ok(rol);
    }
    
    @PutMapping("/roles/{id}")
    public ResponseEntity<Rol> actualizarRol(@PathVariable Long id, @RequestBody Rol detallesRol) {
        Rol rolExistente=rolRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el rol con el id: "+id));
  
        rolExistente.setNombre(detallesRol.getNombre());
        
        Rol rolActualizado=rolRepositorio.save(rolExistente);

        return ResponseEntity.ok(rolActualizado);
    }

    @DeleteMapping("/roles/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarRol(@PathVariable Long id){
        Rol rolExistente=rolRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el rol con el id: "+id));

        rolRepositorio.delete(rolExistente);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
