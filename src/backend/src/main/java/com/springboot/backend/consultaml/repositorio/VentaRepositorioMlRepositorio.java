package com.springboot.backend.consultaml.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consultaml.dto.HistoricoCategoriaVentasDto;
import com.springboot.backend.consultaml.dto.HistoricoVentasDtoMl;
import com.springboot.backend.consultaml.dto.PlatoPrecioVentasDto;
import com.springboot.backend.consultaml.dto.VentasDiasDto;
import com.springboot.backend.tabla.venta.modelo.Venta;

public interface VentaRepositorioMlRepositorio extends JpaRepository<Venta, Long> {
    @Query(value = """
            SELECT DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) AS fecha, COUNT(v.id) AS cantidad, SUM(dv.total) AS total
            FROM venta v
            JOIN detalle_venta dv ON dv.venta_id = v.id
            GROUP BY DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s'))
            ORDER BY fecha;
            """, nativeQuery = true)
    List<VentasDiasDto> obtenerVentasDia();

    @Query(value = """
                        SELECT
                DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) AS fecha,
                COUNT(v.id) AS cantidad
            FROM venta v
            GROUP BY DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s'))
            ORDER BY fecha;
                        """, nativeQuery = true)
    List<HistoricoVentasDtoMl> obtenerHistoricoventa();

    @Query(value = """
                        SELECT DATE(STR_TO_DATE(v.fecha,'%d/%m/%Y, %H:%i:%s')) fecha, c.nombre categoria, SUM(dvp.cantidad_platos) cantidad FROM venta v
            JOIN detalle_venta dv ON dv.venta_id=v.id
            JOIN detalle_venta_platos dvp ON dv.id=dvp.detalle_venta_id
            JOIN platos p ON p.id=dvp.plato_id
            JOIN categorias c ON c.id=p.categoria_id
            WHERE c.nombre NOT IN ('Bebidas','Cremas','Postres')
            GROUP BY fecha, categoria
            ORDER BY fecha, categoria;
                        """, nativeQuery = true)
    List<HistoricoCategoriaVentasDto> obtenerHistoricoCategoriaVentas();

    @Query(value = """
                        SELECT dv.id AS detalleVenta, p.nombre, p.precio
            FROM detalle_venta dv
            JOIN detalle_venta_platos dvp ON dv.id = dvp.detalle_venta_id
            JOIN platos p ON p.id = dvp.plato_id
            JOIN categorias c ON c.id=p.categoria_id
            WHERE c.nombre NOT LIKE 'Cremas'
            ORDER BY dv.id;
                        """, nativeQuery = true)
    List<PlatoPrecioVentasDto> obtenerPlatoPrecioVentas();
}
