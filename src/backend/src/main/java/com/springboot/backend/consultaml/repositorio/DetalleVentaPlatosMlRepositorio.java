package com.springboot.backend.consultaml.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.PlatosPorVentasDto;
import com.springboot.backend.consultaml.dto.CantidadPlatosDto;
import com.springboot.backend.consultaml.dto.HistoricoPlatosMlDto;
import com.springboot.backend.consultaml.dto.UsuariosFrecuentesMlDto;
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
                        WHERE c.nombre NOT IN ('Cremas', 'Bebidas','Postres')
                        GROUP BY DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')), p.nombre
                        ORDER BY fecha, SUM(dvp.cantidad_platos) DESC
                                    """, nativeQuery = true)
        List<HistoricoPlatosMlDto> obtenerHistoricoPlatos();

        @Query(value = """
                                    SELECT p.nombre, SUM(dvp.cantidad_platos) cantidad
                        FROM detalle_venta_platos dvp
                        JOIN platos p ON p.id=dvp.plato_id
                        JOIN categorias c ON c.id=p.categoria_id
                        WHERE c.nombre NOT LIKE 'Cremas'
                        GROUP BY p.nombre
                        ORDER BY cantidad DESC;
                                    """, nativeQuery = true)
        List<CantidadPlatosDto> obtenerCantidadPlatosRecomendacion();

        @Query(value = """
                                SELECT o.nombre, SUM(dvo.cantidad_ofertas) cantidad FROM detalle_venta_ofertas dvo
                        JOIN ofertas o ON o.id=dvo.oferta_id
                        WHERE o.nombre NOT LIKE 'Sin promoción'
                        GROUP BY o.nombre
                        ORDER BY cantidad DESC;
                                                """, nativeQuery = true)
        List<CantidadPlatosDto> obtenerCantidadOfertasRecomendacion();

        @Query(value = """
                                SELECT u.id, u.username, COUNT(v.id) AS compras, SUM(dv.total) AS totalGastado
                        FROM venta v
                        JOIN usuarios u ON u.id = v.usuario_id
                        JOIN detalle_venta dv ON dv.venta_id = v.id
                        GROUP BY u.id, u.username
                        ORDER BY compras DESC;
                                            """, nativeQuery = true)
        List<UsuariosFrecuentesMlDto> obtenerUsuarioFrecuentes();
}
