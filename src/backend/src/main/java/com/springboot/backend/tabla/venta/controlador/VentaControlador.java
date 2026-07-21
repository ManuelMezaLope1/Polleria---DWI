package com.springboot.backend.tabla.venta.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.venta.modelo.Venta;
import com.springboot.backend.tabla.venta.repositorio.VentaRepositorio;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
public class VentaControlador {
    @Autowired
    private VentaRepositorio ventaRepositorio;

    @GetMapping("/public/ventas")
    public List<Venta> listarTodasLasVentas() {
        return ventaRepositorio.findAll();
    }
    

    @PostMapping("/private/ventas")
    public Venta guardarVenta(@RequestBody Venta venta) {
        return ventaRepositorio.save(venta);
    }

    @GetMapping("/private/ventas")
    public ResponseEntity<List<Venta>> obtenerVentas(Authentication auth) {
        String username = auth.getName();

        List<Venta> ventas = ventaRepositorio.findByUsuarioUsername(username);

        return ResponseEntity.ok(ventas);
    }

    @PutMapping("/private/ventas-pendientes/{id}")
    public ResponseEntity<Venta> actualizarVentaPendiente(@PathVariable Long id, @RequestBody Venta detalleVenta) {
        Venta ventaExistente=ventaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la venta con el id: "+id));

        ventaExistente.setEstado_venta("Preparando");

        Venta ventaActualizada=ventaRepositorio.save(ventaExistente);
        
        return ResponseEntity.ok(ventaActualizada);
    }

    @PutMapping("/private/ventas-preparadas/{id}")
    public ResponseEntity<Venta> actualizarVentaPreparada(@PathVariable Long id, @RequestBody Venta detalleVenta) {
        Venta ventaExistente=ventaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la venta con el id: "+id));

        ventaExistente.setEstado_venta("Completado");

        Venta ventaActualizada=ventaRepositorio.save(ventaExistente);
        
        return ResponseEntity.ok(ventaActualizada);
    }

    @PutMapping("/private/ventas-metodopago/{id}")
    public ResponseEntity<Venta> actualizarMetodoPago(@PathVariable Long id, @RequestBody Venta detalleVenta) {
        Venta ventaExistente=ventaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la venta con el id: "+id));

        ventaExistente.setMetodopago(detalleVenta.getMetodopago());

        Venta ventaActualizada=ventaRepositorio.save(ventaExistente);
        
        return ResponseEntity.ok(ventaActualizada);
    }
}
