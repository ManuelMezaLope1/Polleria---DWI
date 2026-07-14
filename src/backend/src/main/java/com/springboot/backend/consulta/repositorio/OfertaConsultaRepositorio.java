package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.CantidadOfertasDto;
import com.springboot.backend.consulta.dto.MejorOfertaDto;
import com.springboot.backend.consulta.dto.OfertaCantidadPlatosDto;
import com.springboot.backend.consulta.dto.OfertaMesaDto;
import com.springboot.backend.tabla.oferta.modelo.Oferta;

public interface OfertaConsultaRepositorio extends JpaRepository<Oferta, Long> {
        @Query("""
                                SELECT new com.springboot.backend.consulta.dto.CantidadOfertasDto(
                                COUNT(o)
                                ) FROM Oferta o
                        """)
        CantidadOfertasDto obtenerCantidadOfertas();

        @Query(value = """
                        SELECT o.nombre, o.descripcion, o.precio_nuevo, o.cantidad AS cantidad_productos, SUM(dvp.cantidad_ofertas), ROUND(SUM(dv.total),2) as cantidad
                        FROM detalle_venta_ofertas dvp
                        JOIN detalle_venta dv ON dv.id=dvp.detalle_venta_id
                        JOIN ofertas o ON o.id = dvp.oferta_id
                        where o.nombre NOT IN ('Sin promoción')
                        GROUP BY o.nombre, o.descripcion, o.precio_nuevo, o.cantidad
                        ORDER BY sum(dvp.cantidad_ofertas) DESC
                        LIMIT 1;
                        """, nativeQuery = true)
        MejorOfertaDto obtenerMejorOferta();

        @Query(value = """
                        select nombre, cantidad, descripcion, precio_nuevo as precio from ofertas
                        where nombre not in ('Sin promoción')
                        order by nombre asc;
                        """, nativeQuery = true)
        List<OfertaMesaDto> obtenerOfertaParaMesa();

        @Query(value = """
                        select nombre, cantidad from ofertas
                        where nombre not like 'Sin promoción'
                        order by cantidad desc;
                        """, nativeQuery = true)
        List<OfertaCantidadPlatosDto> obtenerOfertaCantidadPlatos();
}
