package com.springboot.backend.tabla.venta.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.tabla.venta.modelo.Venta;
import com.springboot.backend.tabla.venta.repositorio.VentaRepositorio;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/private")
public class VentaControlador {
    @Autowired
    private VentaRepositorio ventaRepositorio;

    @PostMapping("/ventas")
    public Venta guardarVenta(@RequestBody Venta venta) {
        return ventaRepositorio.save(venta);
    }

    @GetMapping("/ventas")
    public ResponseEntity<List<Venta>> obtenerVentas(Authentication auth) {
        String username = auth.getName();

        List<Venta> ventas = ventaRepositorio.findByUsuarioUsername(username);

        return ResponseEntity.ok(ventas);
    }
}
