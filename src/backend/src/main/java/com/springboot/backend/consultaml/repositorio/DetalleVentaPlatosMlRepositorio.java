package com.springboot.backend.consultaml.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.PlatosPorVentasDto;
import com.springboot.backend.consultaml.dto.HistoricoPlatosMlDto;
import com.springboot.backend.tabla.detalleventaplatos.modelo.DetalleVentaPlatos;

public interface DetalleVentaPlatosMlRepositorio extends JpaRepository<DetalleVentaPlatos, Long> {
    @Query(value = """
            SELECT p.nombre, c.nombre as categoria, SUM(dvp.cantidad_platos) as cantidad
            FROM detalle_venta_platos dvp
            JOIN platos p ON p.id = dvp.plato_id
            JOIN categorias c ON c.id=p.categoria_id
            WHERE c.nombre NOT IN ('Cremas', 'Bebidas','Guarniciones')
            GROUP BY p.nombre,c.nombre
            ORDER BY sum(dvp.cantidad_platos) DESC;
            """, nativeQuery = true)
    List<PlatosPorVentasDto> obtenerPlatosPorVentas();

    @Query(value = """
            SELECT DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) AS fecha, p.nombre, SUM(dvp.cantidad_platos) AS cantidad
            FROM venta v
            JOIN detalle_venta dv ON dv.venta_id = v.id
            JOIN detalle_venta_platos dvp ON dvp.detalle_venta_id = dv.id
            JOIN platos p ON p.id = dvp.plato_id
            JOIN categorias c ON c.id=p.categoria_id
            WHERE c.nombre NOT IN ('Cremas', 'Bebidas','Guarniciones','Postres')
            GROUP BY DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')), p.nombre
            ORDER BY fecha, SUM(dvp.cantidad_platos) DESC
                        """, nativeQuery = true)
    List<HistoricoPlatosMlDto> obtenerHistoricoPlatos();
}
