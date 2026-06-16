package com.springboot.backend.tabla.detalleventaofertas.controlador;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.detalleventa.modelo.DetalleVenta;
import com.springboot.backend.tabla.detalleventa.repositorio.DetalleVentaRepositorio;
import com.springboot.backend.tabla.detalleventaofertas.modelo.DetalleVentaOfertas;
import com.springboot.backend.tabla.detalleventaofertas.modelo.DetalleVentaOfertasDto;
import com.springboot.backend.tabla.detalleventaofertas.repositorio.DetalleVentaOfertasRepositorio;
import com.springboot.backend.tabla.oferta.modelo.Oferta;
import com.springboot.backend.tabla.oferta.repositorio.OfertaRepositorio;

@RestController
@RequestMapping("/api/v1/public")
public class DetalleVentaOfertasControlador {
    @Autowired
    private DetalleVentaOfertasRepositorio detalleVentaOfertasRepositorio;

    @Autowired
    private DetalleVentaRepositorio detalleVentaRepositorio;

    @Autowired
    private OfertaRepositorio ofertaRepositorio;

    @PostMapping("/detalle-venta-ofertas/lote")
    public ResponseEntity<?> guardarLote(@RequestBody List<DetalleVentaOfertasDto> relaciones) {
        List<DetalleVentaOfertas> lista = new ArrayList<>();

        for(DetalleVentaOfertasDto dto: relaciones){
            DetalleVenta detalleVenta=detalleVentaRepositorio.findById(dto.getDetalleVentaId()).orElseThrow(()->new ResourceNotFoundException("Detalle de Venta no encontrado"));
            
            Oferta oferta=ofertaRepositorio.findById(dto.getOfertaId()).orElseThrow(()->new ResourceNotFoundException("Oferta no encontrada"));

            DetalleVentaOfertas dvp=new DetalleVentaOfertas();
            dvp.setDetalleVenta(detalleVenta);
            dvp.setOferta(oferta);
            dvp.setCantidad_oferta((dto.getCantidad_oferta()));

            lista.add(dvp);
        }        

        if (!lista.isEmpty()) {
            detalleVentaOfertasRepositorio.saveAll(lista);
        }
        
        return ResponseEntity.ok(lista);
    }
}