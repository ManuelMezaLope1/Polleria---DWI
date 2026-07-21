package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.CantidadEstadoPedidoDto;
import com.springboot.backend.consulta.dto.CantidadPedidosDto;
import com.springboot.backend.consulta.dto.FranjaPedidosDto;
import com.springboot.backend.consulta.dto.MejorIngredientePedidoHoyDto;
import com.springboot.backend.consulta.dto.MejorOfertaPedidoHoyDto;
import com.springboot.backend.consulta.dto.MejorPlatoPedidoHoyDto;
import com.springboot.backend.tabla.pedido.modelo.Pedido;
import com.springboot.backend.tabla.pedido.modelo.PedidoDto;

public interface PedidoConsultaRepositorio extends JpaRepository<Pedido, Long> {
        @Query(value = """
                        select count(dvp.cantidad_platos) as cantidad from pedidos pe
                        join venta v on v.id=pe.venta_id
                        join detalle_venta dv on dv.venta_id=v.id
                        join detalle_venta_platos dvp on dvp.detalle_venta_id=dv.id
                        where pe.estado_pedido='Pendiente'
                        group by pe.estado_pedido;
                                    """, nativeQuery = true)
        CantidadPedidosDto obtenerCantidadPlatosPendientes();

        @Query(value = """
                                    select count(dvp.cantidad_platos) as cantidad from pedidos pe
                        join venta v on v.id=pe.venta_id
                        join detalle_venta dv on dv.venta_id=v.id
                        join detalle_venta_platos dvp on dvp.detalle_venta_id=dv.id
                        where pe.estado_pedido='Preparando'
                        group by pe.estado_pedido;
                                    """, nativeQuery = true)
        CantidadPedidosDto obtenerCantidadPlatosPreparados();

        @Query(value = """
                                    select count(dvp.cantidad_platos) as cantidad from pedidos pe
                        join venta v on v.id=pe.venta_id
                        join detalle_venta dv on dv.venta_id=v.id
                        join detalle_venta_platos dvp on dvp.detalle_venta_id=dv.id
                        where pe.estado_pedido='Listo'
                        group by pe.estado_pedido;
                                    """, nativeQuery = true)
        CantidadPedidosDto obtenerCantidadPlatosListos();

        @Query(value = """
                                                select date(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) as fecha, p.nombre as nombre, sum(dvp.cantidad_platos) as cantidad, p.imagen from pedidos pe
                        join venta v on v.id=pe.venta_id
                        join detalle_venta dv on dv.venta_id=v.id
                        join detalle_venta_platos dvp on dvp.detalle_venta_id=dv.id
                        join platos p on p.id=dvp.plato_id
                        join categorias c on c.id=p.categoria_id
                        where c.nombre not in ('Bebidas','Cremas','Postres') and DATE(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) = CURDATE()
                        group by p.nombre, p.imagen, date(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s'))
                        order by date(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) desc
                        limit 1;
                                                """, nativeQuery = true)
        List<MejorPlatoPedidoHoyDto> obtenerMejorPlatoHoy();

        @Query(value = """
                                select o.nombre, sum(dvo.cantidad_ofertas) as cantidad from pedidos pe
                        join venta v on v.id=pe.venta_id
                        join detalle_venta dv on dv.venta_id=v.id
                        join detalle_venta_ofertas dvo on dvo.detalle_venta_id=dv.id
                        join ofertas o on o.id=dvo.oferta_id
                        where date(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) = CURDATE()
                        group by o.nombre, v.fecha
                        order by sum(dvo.cantidad_ofertas) desc
                        LIMIT 1;
                             """, nativeQuery = true)
        List<MejorOfertaPedidoHoyDto> obtenerMejorOfertaHoy();

        @Query(value = """
                                    select i.nombre, count(i.id) as cantidad from pedidos pe
                        join venta v on v.id=pe.venta_id
                        join detalle_venta dv on dv.venta_id=v.id
                        join detalle_venta_platos dvp on dvp.detalle_venta_id=dv.id
                        join platos p on p.id=dvp.plato_id
                        join ingrediente_platos ip on ip.plato_id=p.id
                        join ingredientes i on i.id=ip.ingrediente_id
                        where date(STR_TO_DATE(v.fecha, '%d/%m/%Y, %H:%i:%s')) = CURDATE()
                        group by i.nombre
                        order by count(i.id) desc
                        limit 1;
                                    """, nativeQuery = true)
        List<MejorIngredientePedidoHoyDto> obtenerMejorIngredienteHoy();

        @Query(value = """
                        SELECT pe.id, v.id AS venta, v.mesa_id AS mesa, STR_TO_DATE(pe.fecha_creacion, '%d/%m/%Y') AS fecha,
                        TIME(STR_TO_DATE(pe.fecha_creacion, '%d/%m/%Y, %H:%i:%s')) AS hora_inicio,
                        TIME(STR_TO_DATE(pe.fecha_entrega, '%d/%m/%Y, %H:%i:%s')) AS hora_entrega,
                        dv.cantidad, dv.descripcion, pe.observacion, pe.estado_pedido FROM pedidos pe
                        JOIN venta v ON v.id=pe.venta_id
                        JOIN detalle_venta dv ON dv.venta_id=v.id
                        JOIN mesa m ON m.id=v.mesa_id
                        WHERE pe.estado_pedido='Pendiente' and observacion not in ('Sin observación')
                        ORDER BY STR_TO_DATE(pe.fecha_creacion, '%d/%m/%Y, %H:%i:%s') DESC
                        LIMIT 7;
                        """, nativeQuery = true)
        List<PedidoDto> obtenerPedidosConObservaciones();

        @Query(value = """
                        SELECT estado_pedido, COUNT(id) AS cantidad FROM pedidos
                        GROUP BY estado_pedido
                        """, nativeQuery = true)
        List<CantidadEstadoPedidoDto> obtenerCantidadEstadoPedido();

        @Query(value = """
                                                SELECT
                            CASE
                                WHEN HOUR(STR_TO_DATE(fecha_creacion, '%e/%c/%Y, %H:%i:%s')) BETWEEN 6 AND 11 THEN 'Mañana'
                                WHEN HOUR(STR_TO_DATE(fecha_creacion, '%e/%c/%Y, %H:%i:%s')) BETWEEN 12 AND 16 THEN 'Almuerzo'
                                WHEN HOUR(STR_TO_DATE(fecha_creacion, '%e/%c/%Y, %H:%i:%s')) BETWEEN 17 AND 23 THEN 'Cena'
                                ELSE 'Madrugada'
                            END AS franja,
                            COUNT(*) AS cantidad
                        FROM pedidos
                        GROUP BY franja
                        ORDER BY cantidad DESC;
                                                """, nativeQuery = true)
        List<FranjaPedidosDto> obtenerFranjaPedidos();

        @Query(value = """
                                                SELECT
                            nombre,
                            COUNT(*) AS cantidad
                        FROM (
                            SELECT
                                WEEKDAY(STR_TO_DATE(fecha_creacion, '%e/%c/%Y, %H:%i:%s')) AS num_dia,
                                CASE WEEKDAY(STR_TO_DATE(fecha_creacion, '%e/%c/%Y, %H:%i:%s'))
                                    WHEN 0 THEN 'Lunes'
                                    WHEN 1 THEN 'Martes'
                                    WHEN 2 THEN 'Miércoles'
                                    WHEN 3 THEN 'Jueves'
                                    WHEN 4 THEN 'Viernes'
                                    WHEN 5 THEN 'Sábado'
                                    WHEN 6 THEN 'Domingo'
                                END AS nombre
                            FROM pedidos
                            WHERE YEARWEEK(
                                STR_TO_DATE(fecha_creacion, '%e/%c/%Y, %H:%i:%s'),
                                1
                              ) = YEARWEEK(CURDATE(), 1) - 1
                        ) t
                        GROUP BY num_dia, nombre
                        ORDER BY num_dia;
                                                """, nativeQuery = true)
        List<CantidadEstadoPedidoDto> obtenerCantidadDiaPedidos();
}