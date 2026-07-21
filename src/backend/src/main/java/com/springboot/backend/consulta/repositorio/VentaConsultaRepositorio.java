package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.backend.consulta.dto.CantidadVentasDto;
import com.springboot.backend.consulta.dto.DetallesVentasDto;
import com.springboot.backend.consulta.dto.MejorOfertaPedidoHoyDto;
import com.springboot.backend.consulta.dto.UsuariosMasFrecuentesDto;
import com.springboot.backend.consulta.dto.VentaActualMesaDto;
import com.springboot.backend.consulta.dto.VentasHoyDto;
import com.springboot.backend.consulta.dto.VentasMesDto;
import com.springboot.backend.consulta.dto.VentasSemanaDto;
import com.springboot.backend.tabla.venta.modelo.Venta;

public interface VentaConsultaRepositorio extends JpaRepository<Venta, Long> {
        @Query("""
                                SELECT new com.springboot.backend.consulta.dto.CantidadVentasDto(
                                COUNT(v)
                                ) FROM Venta v
                        """)
        CantidadVentasDto obtenerCantidadVentas();

        @Query(value = """
                        SELECT COUNT(v.id), SUM(dv.total) FROM venta v
                        JOIN detalle_venta dv on dv.venta_id=v.id
                        WHERE DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) = CURDATE();
                        """, nativeQuery = true)
        VentasHoyDto obtenerVentasHoy();

        @Query(value = """
                        SELECT COUNT(v.id), SUM(dv.total) FROM venta v
                        JOIN detalle_venta dv on dv.venta_id=v.id
                        WHERE STR_TO_DATE(fecha, '%d/%m/%Y, %H:%i:%s') >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
                        AND STR_TO_DATE(fecha, '%d/%m/%Y, %H:%i:%s') < DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) + INTERVAL 7 DAY;
                        """, nativeQuery = true)
        VentasSemanaDto obtenerVentasSemana();

        @Query(value = """
                        SELECT COUNT(v.id), SUM(dv.total) FROM venta v
                        JOIN detalle_venta dv on dv.venta_id=v.id
                        WHERE YEAR(STR_TO_DATE(fecha, '%d/%m/%Y, %H:%i:%s')) = YEAR(CURDATE())
                        AND MONTH(STR_TO_DATE(fecha, '%d/%m/%Y, %H:%i:%s')) = MONTH(CURDATE());
                        """, nativeQuery = true)
        VentasMesDto obtenerVentasMes();

        @Query(value = """
                        SELECT v.id, (SELECT DATE_FORMAT(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s'), '%Y-%m-%d %H:%i:%s')) as fecha, v.username, mp.nombre, dv.cantidad, dv.descripcion, dv.total FROM venta v
                        JOIN detalle_venta dv on dv.venta_id=v.id
                        JOIN metodopago mp on mp.id=v.metodopago_id
                        ORDER BY (SELECT DATE_FORMAT(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s'),'%Y-%m-%d %H:%i:%s')) DESC
                        LIMIT 3;
                        """, nativeQuery = true)
        List<DetallesVentasDto> obtenerTop3VentasDesc();

        @Query(value = """
                        SELECT u.username, COUNT(*) AS cantidad FROM venta v
                        JOIN usuarios u ON u.id=v.usuario_id
                        GROUP BY u.username
                        ORDER BY cantidad DESC
                        LIMIT 5;
                        """, nativeQuery = true)
        List<UsuariosMasFrecuentesDto> obtenerUsuariosMasFrecuentes();

        @Query(value = """
                        SELECT p.nombre, SUM(dvp.cantidad_platos) AS cantidad FROM venta v
                        JOIN detalle_venta dv ON dv.venta_id = v.id
                        JOIN detalle_venta_platos dvp ON dvp.detalle_venta_id = dv.id
                        JOIN platos p ON p.id = dvp.plato_id
                        JOIN categorias c ON c.id=p.categoria_id
                        WHERE c.nombre NOT IN ('Cremas', 'Bebidas','Postres')
                        GROUP BY p.nombre
                        ORDER BY SUM(dvp.cantidad_platos) DESC
                        LIMIT 7
                        """, nativeQuery = true)
        List<MejorOfertaPedidoHoyDto> obtenerMayorCantidadPlatosVenta();

        @Query(value = """
                        SELECT v.id, v.mesa_id AS mesa, mp.nombre AS metodopago, m.estado, (SELECT DATE_FORMAT(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s'), '%Y-%m-%d %H:%i:%s')) AS fecha,
                        dv.cantidad, dv.descripcion, dv.total, p.observacion FROM venta v
                        JOIN detalle_venta dv ON dv.venta_id=v.id
                        JOIN metodopago mp ON mp.id=v.metodopago_id
                        JOIN pedidos p ON p.venta_id=v.id
                        JOIN mesa m ON m.id=v.mesa_id
                        WHERE v.mesa_id<>'' AND v.mesa_id=:mesaId AND m.estado IN ('Pendiente','Preparando','Listo')
                        ORDER BY (SELECT DATE_FORMAT(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s'), '%Y-%m-%d %H:%i:%s')) DESC
                        LIMIT 1;
                        """, nativeQuery = true)
        List<VentaActualMesaDto> obtenerVentaActualMesa(@Param("mesaId") Long mesaId);

        @Query(value = """
                        SELECT v.id, v.mesa_id AS mesa, mp.nombre AS metodopago, m.estado, (SELECT DATE_FORMAT(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s'), '%Y-%m-%d %H:%i:%s')) AS fecha,
                        dv.cantidad, dv.descripcion, dv.total, p.observacion FROM venta v
                        JOIN detalle_venta dv ON dv.venta_id=v.id
                        JOIN metodopago mp ON mp.id=v.metodopago_id
                        JOIN pedidos p ON p.venta_id=v.id
                        JOIN mesa m ON m.id=v.mesa_id
                        WHERE v.mesa_id<>'' AND v.mesa_id=:mesaId AND v.estado_venta IN ('Completado')
                        ORDER BY (SELECT DATE_FORMAT(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s'), '%Y-%m-%d %H:%i:%s')) DESC;
                        """, nativeQuery = true)
        List<VentaActualMesaDto> obtenerVentasPorMesaId(@Param("mesaId") Long mesaId);
}
