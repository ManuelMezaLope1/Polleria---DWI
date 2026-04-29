package com.springboot.backend.tabla.metodopago.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.metodopago.modelo.MetodoPago;
import com.springboot.backend.tabla.metodopago.repositorio.MetodoPagoRepositorio;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1")
public class MetodoPagoControlador {
    @Autowired
    private MetodoPagoRepositorio repositorio;

    @GetMapping("/metodopago")
    public List<MetodoPago> listarTodosLosMetodoPagos() {
        return repositorio.findAll();
    }

    @PostMapping("/metodopago")
    public MetodoPago guardarMetodoPago(@RequestBody MetodoPago metodoPago) {
        return repositorio.save(metodoPago);
    }
    
    @GetMapping("/metodopago/{id}")
    public ResponseEntity<MetodoPago> obtenerMetodoPagoPorId(@PathVariable Long id) {
        MetodoPago metodoPago=repositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el método de pago con el id: "+id));
        return ResponseEntity.ok(metodoPago);
    }
    
    @PutMapping("/metodopago/{id}")
    public ResponseEntity<MetodoPago> actualizarMetodoPago(@PathVariable Long id, @RequestBody MetodoPago detallesMetodoPago) {
        MetodoPago metodoPagoExistente=repositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el método de pago con el id: "+id));

        metodoPagoExistente.setNombre(detallesMetodoPago.getNombre());

        MetodoPago metodoPagoActualizado=repositorio.save(metodoPagoExistente);
        
        return ResponseEntity.ok(metodoPagoActualizado);
    }

    @DeleteMapping("/metodopago/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarMetodoPago(@PathVariable Long id){
        MetodoPago metodoPago=repositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el método de pago con el id: "+id));

        repositorio.delete(metodoPago);
        Map<String, Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
