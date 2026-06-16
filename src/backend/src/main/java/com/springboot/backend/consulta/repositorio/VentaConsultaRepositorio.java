package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.CantidadVentasDto;
import com.springboot.backend.consulta.dto.DetallesVentasDto;
import com.springboot.backend.consulta.dto.UsuariosMasFrecuentesDto;
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
                        SELECT v.id, v.fecha, v.username, mp.nombre, dv.cantidad, dv.descripcion, dv.total FROM venta v
                        JOIN detalle_venta dv on dv.venta_id=v.id
                        JOIN metodopago mp on mp.id=v.metodopago_id
                        ORDER BY v.fecha DESC LIMIT 3;
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
}
