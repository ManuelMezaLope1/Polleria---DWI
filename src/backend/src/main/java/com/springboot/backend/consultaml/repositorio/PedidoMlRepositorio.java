package com.springboot.backend.consultaml.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consultaml.dto.HistoricoFranjaPedidosMlDto;
import com.springboot.backend.tabla.pedido.modelo.Pedido;

public interface PedidoMlRepositorio extends JpaRepository<Pedido, Long> {
    @Query(value = """
                        SELECT
                DATE(STR_TO_DATE(fecha_creacion, '%e/%c/%Y, %H:%i:%s')) AS fecha,
                CASE
                    WHEN HOUR(STR_TO_DATE(fecha_creacion, '%e/%c/%Y, %H:%i:%s')) BETWEEN 6 AND 11 THEN 'Mañana'
                    WHEN HOUR(STR_TO_DATE(fecha_creacion, '%e/%c/%Y, %H:%i:%s')) BETWEEN 12 AND 16 THEN 'Almuerzo'
                    WHEN HOUR(STR_TO_DATE(fecha_creacion, '%e/%c/%Y, %H:%i:%s')) BETWEEN 17 AND 23 THEN 'Cena'
                    ELSE 'Madrugada'
                END AS franja,
                COUNT(*) AS cantidad
            FROM pedidos
            GROUP BY
                DATE(STR_TO_DATE(fecha_creacion, '%e/%c/%Y, %H:%i:%s')),
                franja
            ORDER BY fecha;
                        """, nativeQuery = true)
    List<HistoricoFranjaPedidosMlDto> obtenerHistoricoFranjaPedidos();
}
