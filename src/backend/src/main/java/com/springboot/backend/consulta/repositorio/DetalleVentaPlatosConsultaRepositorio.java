package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.PlatosPorVentasDto;
import com.springboot.backend.tabla.detalleventaplatos.modelo.DetalleVentaPlatos;

public interface DetalleVentaPlatosConsultaRepositorio extends JpaRepository<DetalleVentaPlatos,Long>{
    @Query(value="""
            SELECT p.nombre, c.nombre as categoria, SUM(dvp.cantidad_platos) as cantidad
            FROM detalle_venta_platos dvp
            JOIN platos p ON p.id = dvp.plato_id
            JOIN categorias c ON c.id=p.categoria_id
            WHERE c.nombre NOT IN ('Cremas', 'Bebidas','Guarniciones')
            GROUP BY p.nombre,c.nombre
            ORDER BY sum(dvp.cantidad_platos) DESC
            LIMIT 5;
            """, nativeQuery = true)
    List<PlatosPorVentasDto> obtenerPlatosPorVentas();
}
