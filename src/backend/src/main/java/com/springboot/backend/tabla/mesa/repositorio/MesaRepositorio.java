package com.springboot.backend.tabla.mesa.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.VentasHoyDto;
import com.springboot.backend.tabla.mesa.modelo.CantidadPlatosMesaDto;
import com.springboot.backend.tabla.mesa.modelo.CantidadesVentasMesaDto;
import com.springboot.backend.tabla.mesa.modelo.Mesa;
import com.springboot.backend.tabla.mesa.modelo.MesaCapacidadDto;

public interface MesaRepositorio extends JpaRepository<Mesa, Long> {
        @Query(value = """
                        select id, nombre, capacidad, estado, ubicacion from mesa where capacidad=4;
                            """, nativeQuery = true)
        List<MesaCapacidadDto> obtenerMesaCapacidadCuatro();

        @Query(value = """
                        select id, nombre, capacidad, estado, ubicacion from mesa where capacidad=6;
                            """, nativeQuery = true)
        List<MesaCapacidadDto> obtenerMesaCapacidadSeis();

        @Query(value = """
                        select id, nombre, capacidad, estado, ubicacion from mesa where capacidad=8;
                            """, nativeQuery = true)
        List<MesaCapacidadDto> obtenerMesaCapacidadOcho();

        @Query(value = """
                        select id, nombre, capacidad, estado, ubicacion from mesa where capacidad=10;
                            """, nativeQuery = true)
        List<MesaCapacidadDto> obtenerMesaCapacidadDiez();

        @Query(value = """
                        SELECT COUNT(v.id) AS cantidad_ventas, SUM(dv.total) AS suma FROM venta v
                        JOIN detalle_venta dv ON dv.venta_id=v.id
                        WHERE DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) = CURDATE() AND v.mesa_id NOT LIKE 7;
                        """, nativeQuery = true)
        VentasHoyDto obtenerCantidadTotalVentasMesa();

        @Query(value = """
                        SELECT SUM(dvp.cantidad_platos) AS cantidad_platos FROM venta v
                        JOIN detalle_venta dv ON dv.venta_id=v.id
                        JOIN detalle_venta_platos dvp ON dvp.detalle_venta_id=dv.id
                        WHERE DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) = CURDATE() AND v.mesa_id NOT LIKE 7;
                        """, nativeQuery = true)
        CantidadPlatosMesaDto obtenerCantidadPlatosMesa();

        @Query(value = """
                        SELECT SUM(dvo.cantidad_ofertas) AS cantidad_ofertas FROM venta v
                        JOIN detalle_venta dv ON dv.venta_id=v.id
                        JOIN detalle_venta_ofertas dvo ON dvo.detalle_venta_id=dv.id
                        WHERE DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) = CURDATE() AND v.mesa_id NOT LIKE 7;
                        """, nativeQuery = true)
        CantidadPlatosMesaDto obtenerCantidadOfertasMesa();

        @Query(value = """
                        SELECT m.id, m.nombre, m.capacidad, m.estado, m.ubicacion, COUNT(DISTINCT v.id) AS cantidad_ventas, COALESCE(SUM(dv.total), 0) AS suma,
                        	COALESCE(p.cantidad_platos, 0) AS cantidad_platos, COALESCE(o.cantidad_ofertas, 0) AS cantidad_ofertas FROM mesa m
                        LEFT JOIN venta v ON v.mesa_id = m.id
                        LEFT JOIN detalle_venta dv ON dv.venta_id = v.id
                        LEFT JOIN (
                            SELECT v.mesa_id, SUM(dvp.cantidad_platos) AS cantidad_platos FROM venta v
                            JOIN detalle_venta dv ON dv.venta_id = v.id
                            JOIN detalle_venta_platos dvp ON dvp.detalle_venta_id = dv.id
                            WHERE v.mesa_id <> 7
                            GROUP BY v.mesa_id
                        ) p
                            ON p.mesa_id = m.id
                        LEFT JOIN (
                            SELECT v.mesa_id, SUM(dvo.cantidad_ofertas) AS cantidad_ofertas FROM venta v
                            JOIN detalle_venta dv ON dv.venta_id = v.id
                            JOIN detalle_venta_ofertas dvo ON dvo.detalle_venta_id = dv.id
                            WHERE v.mesa_id <> 7
                            GROUP BY v.mesa_id
                        ) o
                            ON o.mesa_id = m.id
                        WHERE DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) = CURDATE() AND m.id <> 7
                        GROUP BY m.id, m.nombre, m.capacidad, m.estado, m.ubicacion, p.cantidad_platos, o.cantidad_ofertas
                        ORDER BY cantidad_ventas DESC, suma DESC;
                        """, nativeQuery = true)
        List<CantidadesVentasMesaDto> obtenerCantidadesVentasMesas();
}
