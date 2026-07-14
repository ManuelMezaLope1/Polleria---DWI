package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.AlergiaIngredientesDto;
import com.springboot.backend.consulta.dto.CantidadIngredientesDto;
import com.springboot.backend.consulta.dto.CantidadPedidosDto;
import com.springboot.backend.consulta.dto.IngredientesDto;
import com.springboot.backend.tabla.ingrediente.modelo.Ingrediente;

public interface IngredienteConsultaRepositorio extends JpaRepository<Ingrediente, Long> {
        @Query("""
                                SELECT new com.springboot.backend.consulta.dto.CantidadIngredientesDto(
                                COUNT(i)
                                ) FROM Ingrediente i
                        """)
        CantidadIngredientesDto obtenerCantidadIngredientes();

        @Query(value = """
                                    select i.nombre, COUNT(ip.plato_id) as cantidad, a.nombre AS alergia, ci.nombre as categoria, ei.nombre as estado, i.imagen
                        from ingrediente_platos ip
                        JOIN ingredientes i ON i.id=ip.ingrediente_id
                        JOIN platos p ON p.id=ip.plato_id
                        JOIN alergias a ON a.id=i.alergia_id
                        JOIN categoria_ingrediente ci ON ci.id=i.categoria_ingrediente_id
                        JOIN estado_ingrediente ei ON ei.id=i.estado_ingrediente_id
                        GROUP BY i.nombre, a.nombre, ci.nombre, ei.nombre, i.imagen
                        ORDER BY i.nombre ASC;
                                    """, nativeQuery = true)
        List<IngredientesDto> obtenerTodosLosIngredientes();

        @Query(value = """
                        SELECT COUNT(*) AS cantidad FROM pedidos WHERE estado_pedido='Pendiente';
                        """, nativeQuery = true)
        CantidadPedidosDto obtenerCantidadPedidosPendientes();

        @Query(value = """
                        SELECT COUNT(*) AS cantidad FROM pedidos WHERE estado_pedido='Preparando';
                        """, nativeQuery = true)
        CantidadPedidosDto obtenerCantidadPedidosPreparados();

        @Query(value = """
                        SELECT COUNT(*) AS cantidad FROM pedidos WHERE estado_pedido='Listo';
                        """, nativeQuery = true)
        CantidadPedidosDto obtenerCantidadPedidosListos();

        @Query(value = """
                                            select ci.nombre as nombre, count(i.nombre) as cantidad from ingredientes i
                        join categoria_ingrediente ci on ci.id=i.categoria_ingrediente_id
                        group by ci.nombre
                        order by count(i.nombre) desc;
                                            """, nativeQuery = true)
        List<AlergiaIngredientesDto> obtenerCategoriaCantidadIngredientes();
}
