package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.OfertasPorVentasDto;
import com.springboot.backend.tabla.detalleventaofertas.modelo.DetalleVentaOfertas;

public interface DetalleVentaOfertasConsultaRepositorio extends JpaRepository<DetalleVentaOfertas,Long>{
    @Query(value="""
            SELECT o.nombre, sum(dvp.cantidad_ofertas) as Cantidad
            FROM detalle_venta_ofertas dvp
            JOIN ofertas o ON o.id = dvp.oferta_id
            where o.nombre not in ('Sin promoción')
            GROUP BY o.nombre
            ORDER BY sum(dvp.cantidad_ofertas) DESC
            LIMIT 5;
            """, nativeQuery = true)
    List<OfertasPorVentasDto> obtenerOfertasPorVentas();
}
