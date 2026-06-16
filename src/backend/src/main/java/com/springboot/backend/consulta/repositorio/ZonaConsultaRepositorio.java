package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.CantidadZonaDto;
import com.springboot.backend.consulta.dto.MejorZonaDto;
import com.springboot.backend.consulta.dto.VentasPorZonasDto;
import com.springboot.backend.tabla.zona.modelo.Zona;

public interface ZonaConsultaRepositorio extends JpaRepository<Zona, Long> {
        @Query("""
                                SELECT new com.springboot.backend.consulta.dto.CantidadZonaDto(
                                COUNT(z)
                                ) FROM Zona z
                        """)
        CantidadZonaDto obtenerCantidadZonas();

        @Query(value = """
                        SELECT z.nombre, COUNT(*) AS cantidad FROM venta v
                        JOIN zonas z ON z.id=v.zona_id
                        GROUP BY z.nombre
                        ORDER BY cantidad DESC;
                        """, nativeQuery = true)
        List<VentasPorZonasDto> obtenerVentasPorZona();

        @Query(value = """
                                    SELECT z.nombre, z.departamento, z.provincia, COUNT(*) AS cantidad, ROUND(SUM(dv.total),2) ROUND FROM venta v
                            JOIN zonas z ON z.id=v.zona_id
                            JOIN detalle_venta dv ON dv.venta_id=v.id
                            GROUP BY z.nombre, z.departamento, z.provincia
                            ORDER BY cantidad DESC
                            LIMIT 1;
                        """, nativeQuery = true)
        MejorZonaDto obtenerMejorZona();
}
