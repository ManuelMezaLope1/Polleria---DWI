package com.springboot.backend.consultaml.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
}
