package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.CantidadPlatosDto;
import com.springboot.backend.consulta.dto.CantidadPlatosPrepararDto;
import com.springboot.backend.consulta.dto.MejorPlatoDto;
import com.springboot.backend.tabla.plato.modelo.Plato;

public interface PlatoConsultaRepositorio extends JpaRepository<Plato, Long> {
        @Query("""
                                SELECT new com.springboot.backend.consulta.dto.CantidadPlatosDto(
                                COUNT(p)
                                ) FROM Plato p
                        """)
        CantidadPlatosDto obtenerCantidadPlatos();

        @Query(value = """
                        SELECT p.nombre, c.nombre as categoria, p.precio, p.imagen, SUM(dvp.cantidad_platos), ROUND(SUM(dv.total),2) as cantidad
                        FROM detalle_venta_platos dvp
                        JOIN detalle_venta dv ON dv.id=dvp.detalle_venta_id
                        JOIN platos p ON p.id = dvp.plato_id
                        JOIN categorias c ON c.id=p.categoria_id
                        WHERE c.nombre NOT IN ('Cremas', 'Bebidas','Guarniciones','Postres')
                        GROUP BY p.nombre,c.nombre,p.precio,p.imagen
                        ORDER BY sum(dvp.cantidad_platos) DESC
                        LIMIT 1;
                        """, nativeQuery = true)
        MejorPlatoDto obtenerMejorPlato();

        @Query(value = """
                                SELECT p.nombre, c.nombre AS categoria, p.descripcion, p.imagen, COALESCE(ing.cantidad_ingredientes,0) cantidad_ingredientes, COALESCE(pen.cantidad_platos_pendientes,0) cantidad_platos_pendientes FROM platos p
                        JOIN categorias c ON c.id = p.categoria_id
                        LEFT JOIN (
                            SELECT plato_id, COUNT(*) cantidad_ingredientes FROM ingrediente_plato
                            GROUP BY plato_id
                        ) ing ON ing.plato_id = p.id

                        LEFT JOIN (
                            SELECT dvp.plato_id, SUM(dvp.cantidad_platos) cantidad_platos_pendientes FROM detalle_venta_platos dvp
                            JOIN detalle_venta dv ON dv.id = dvp.detalle_venta_id
                            JOIN venta v ON v.id = dv.venta_id
                            JOIN pedidos pe ON pe.venta_id = v.id
                            WHERE pe.estado_pedido = 'Pendiente'
                            GROUP BY dvp.plato_id
                        ) pen ON pen.plato_id = p.id
                        WHERE c.nombre NOT IN ('Bebidas','Cremas','Postres')
                        ORDER BY COALESCE(pen.cantidad_platos_pendientes,0) DESC;
                                """, nativeQuery = true)
        List<CantidadPlatosPrepararDto> obtenerCantidadPlatosPreparar();
}
