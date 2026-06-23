package com.springboot.backend.tabla.ofertaplatos.controlador;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.oferta.modelo.Oferta;
import com.springboot.backend.tabla.oferta.repositorio.OfertaRepositorio;
import com.springboot.backend.tabla.ofertaplatos.modelo.OfertaPlatos;
import com.springboot.backend.tabla.ofertaplatos.modelo.OfertaPlatosDto;
import com.springboot.backend.tabla.ofertaplatos.repositorio.OfertaPlatosRepositorio;
import com.springboot.backend.tabla.plato.modelo.Plato;
import com.springboot.backend.tabla.plato.repositorio.PlatoRepositorio;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/public")
public class OfertaPlatosControlador {
    @Autowired
    private OfertaPlatosRepositorio ofertaPlatosRepositorio;

    @Autowired
    private OfertaRepositorio ofertaRepositorio;

    @Autowired
    private PlatoRepositorio platoRepositorio;

    @GetMapping("/oferta-platos/lote")
    public List<OfertaPlatos> listartTodasLasOfertasYPlatos() {
        return ofertaPlatosRepositorio.findAll();
    }

    @PostMapping("/oferta-platos/lote")
    public ResponseEntity<?> guardarOfertaPlato(@RequestBody List<OfertaPlatosDto> relaciones) {
        Long ofertaId = relaciones.get(0).getOfertaId();

        ofertaPlatosRepositorio.deleteByOfertaId(ofertaId);

        List<OfertaPlatos> lista = new ArrayList<>();

        for (OfertaPlatosDto dto : relaciones) {
            Oferta oferta = ofertaRepositorio.findById(dto.getOfertaId())
                    .orElseThrow(() -> new ResourceNotFoundException(("Oferta no encontrada")));

            Plato plato = platoRepositorio.findById(dto.getPlatoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Plato no encontrado"));

            OfertaPlatos op = new OfertaPlatos();
            op.setOferta(oferta);
            op.setPlato(plato);
            op.setCantidad_platos(dto.getCantidad_platos());

            lista.add(op);
        }

        if (!lista.isEmpty()) {
            ofertaPlatosRepositorio.saveAll(lista);
        }

        return ResponseEntity.ok(lista);
    }
}
