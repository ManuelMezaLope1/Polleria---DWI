package com.springboot.backend.tabla.detalleventaplatos.controlador;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.detalleventa.modelo.DetalleVenta;
import com.springboot.backend.tabla.detalleventa.repositorio.DetalleVentaRepositorio;
import com.springboot.backend.tabla.detalleventaplatos.modelo.DetalleVentaPlatos;
import com.springboot.backend.tabla.detalleventaplatos.modelo.DetalleVentaPlatosDto;
import com.springboot.backend.tabla.detalleventaplatos.repositorio.DetalleVentaPlatosRepositorio;
import com.springboot.backend.tabla.plato.modelo.Plato;
import com.springboot.backend.tabla.plato.repositorio.PlatoRepositorio;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/public")
public class DetalleVentaPlatosControlador {
    @Autowired
    private DetalleVentaPlatosRepositorio detalleVentaPlatosRepositorio;

    @Autowired
    private DetalleVentaRepositorio detalleVentaRepositorio;

    @Autowired
    private PlatoRepositorio platoRepositorio;

    @GetMapping("/detalle-venta-platos/lote")
    public List<DetalleVentaPlatos> listarTodosLosPlatosDeDetalleVenta() {
        return detalleVentaPlatosRepositorio.findAll();
    }
    

    @PostMapping("/detalle-venta-platos/lote")
    public ResponseEntity<?> guardarLote(@RequestBody List<DetalleVentaPlatosDto> relaciones) {
        List<DetalleVentaPlatos> lista = new ArrayList<>();

        for(DetalleVentaPlatosDto dto: relaciones){
            DetalleVenta detalleVenta=detalleVentaRepositorio.findById(dto.getDetalleVentaId()).orElseThrow(()->new ResourceNotFoundException("Detalle de Venta no encontrado"));

            Plato plato=platoRepositorio.findById(dto.getPlatoId()).orElseThrow(()->new ResourceNotFoundException("Plato no encontrado"));

            DetalleVentaPlatos dvp=new DetalleVentaPlatos();
            dvp.setDetalleVenta(detalleVenta);
            dvp.setPlato(plato);
            dvp.setCantidad_platos(dto.getCantidad_platos());

            lista.add(dvp);
        }        

        if (!lista.isEmpty()) {
            detalleVentaPlatosRepositorio.saveAll(lista);
        }
        
        return ResponseEntity.ok(lista);
    }
    
}
