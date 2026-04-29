package com.springboot.backend.tabla.zona.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.zona.modelo.Zona;
import com.springboot.backend.tabla.zona.repositorio.ZonaRepositorio;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1")
public class ZonaControlador {
    @Autowired
    private ZonaRepositorio zonaRepositorio;

    @GetMapping("/zonas")
    public List<Zona> listarTodasLasZonas() {
        return zonaRepositorio.findAll();
    }
    
    @PostMapping("/zonas")
    public Zona guardarZona(@RequestBody Zona zona) {
        return zonaRepositorio.save(zona);
    }
    
    @GetMapping("/zonas/{id}")
    public ResponseEntity<Zona> obtenerZonaPorId(@PathVariable Long id) {
        Zona zona=zonaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la zona con el id: "+id));
        return ResponseEntity.ok(zona);
    }
    
    @PutMapping("/zonas/{id}")
    public ResponseEntity<Zona> actualizarZona(@PathVariable Long id, @RequestBody Zona detallesZona) {
        Zona zonaExistente=zonaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la zona con el id: "+id));

        zonaExistente.setDepartamento(detallesZona.getDepartamento());
        zonaExistente.setProvincia(detallesZona.getProvincia());
        zonaExistente.setDistrito(detallesZona.getDistrito());
        zonaExistente.setNombre(detallesZona.getNombre());
        
        Zona zonaActualizada=zonaRepositorio.save(zonaExistente);

        return ResponseEntity.ok(zonaActualizada);
    }

    @DeleteMapping("/zonas/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarZona(@PathVariable Long id){
        Zona zona=zonaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la zona con el id: "+id));

        zonaRepositorio.delete(zona);
        Map<String, Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
