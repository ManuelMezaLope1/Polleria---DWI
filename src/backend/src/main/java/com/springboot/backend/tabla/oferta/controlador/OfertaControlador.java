package com.springboot.backend.tabla.oferta.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.oferta.modelo.Oferta;
import com.springboot.backend.tabla.oferta.repositorio.OfertaRepositorio;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/public")
public class OfertaControlador {
    @Autowired
    private OfertaRepositorio ofertaRepositorio;

    @GetMapping("/ofertas")
    public List<Oferta> listarTodasLasOfertas() {
        return ofertaRepositorio.findAll();
    }
    
    @PostMapping("/ofertas")
    public Oferta guardarOferta(@RequestBody Oferta oferta) {
        return ofertaRepositorio.save(oferta);
    }
    
    @GetMapping("/ofertas/{id}")
    public ResponseEntity<Oferta> obtenerOfertaPorId(@PathVariable Long id) {
        Oferta oferta=ofertaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la oferta con el id: "+id));
        return ResponseEntity.ok(oferta);
    }
    
    @PutMapping("/ofertas/{id}")
    public ResponseEntity<Oferta> actualizarOferta(@PathVariable Long id, @RequestBody Oferta detallesOferta) {
        Oferta ofertaExistente=ofertaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la oferta con el id: "+id));

        ofertaExistente.setNombre(detallesOferta.getNombre());
        ofertaExistente.setDescripcion(detallesOferta.getDescripcion());
        ofertaExistente.setCantidad(detallesOferta.getCantidad());
        ofertaExistente.setPrecio_actual(detallesOferta.getPrecio_actual());
        ofertaExistente.setPrecio_nuevo(detallesOferta.getPrecio_nuevo());

        Oferta ofertaActualizada=ofertaRepositorio.save(ofertaExistente);
        
        return ResponseEntity.ok(ofertaActualizada);
    }

    @DeleteMapping("/ofertas/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarOferta(@PathVariable Long id){
        Oferta oferta=ofertaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la oferta con el id: "+id));

        ofertaRepositorio.delete(oferta);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
