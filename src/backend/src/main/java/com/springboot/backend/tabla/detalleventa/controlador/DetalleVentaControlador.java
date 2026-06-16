package com.springboot.backend.tabla.detalleventa.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.tabla.detalleventa.modelo.DetalleVenta;
import com.springboot.backend.tabla.detalleventa.repositorio.DetalleVentaRepositorio;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/v1/private")
public class DetalleVentaControlador {
    @Autowired
    private DetalleVentaRepositorio detalleVentaRepositorio;

    @GetMapping("/detalles-ventas")
    public List<DetalleVenta> listarTodosLosDetallesVemtas() {
        return detalleVentaRepositorio.findAll();
    }
    

    @PostMapping("/detalles-ventas")
    public DetalleVenta guardarDetalleVenta(@RequestBody DetalleVenta detalleVenta) {
        return detalleVentaRepositorio.save(detalleVenta);
    }
}
