package com.springboot.backend.tabla.pedido.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.tabla.pedido.modelo.Pedido;
import com.springboot.backend.tabla.pedido.modelo.PedidoDto;

public interface PedidoRepositorio extends JpaRepository<Pedido,Long>{
    @Query(value="""
            SELECT pe.id, pe.venta_id as ventaId, v.mesa_id as mesa, STR_TO_DATE(pe.fecha_creacion, '%d/%m/%Y') AS fecha, 
            TIME(STR_TO_DATE(pe.fecha_creacion, '%d/%m/%Y, %H:%i:%s')) AS hora_inicio, 
            TIME(STR_TO_DATE(pe.fecha_entrega, '%d/%m/%Y, %H:%i:%s')) AS hora_fin, pe.username,
            dv.cantidad, dv.descripcion, pe.observacion, pe.estado_pedido FROM pedidos pe
            JOIN venta v ON v.id=pe.venta_id
            JOIN detalle_venta dv ON dv.venta_id=v.id
            WHERE pe.estado_pedido='Pendiente'
            ORDER BY STR_TO_DATE(pe.fecha_creacion, '%d/%m/%Y, %H:%i:%s') DESC
            LIMIT 7;
            """, nativeQuery=true)
    List<PedidoDto> obtenerPedidosPendientes();

    @Query(value="""
            SELECT pe.id, pe.venta_id as ventaId, v.mesa_id as mesa, STR_TO_DATE(pe.fecha_creacion, '%d/%m/%Y') AS fecha, 
            TIME(STR_TO_DATE(pe.fecha_creacion, '%d/%m/%Y, %H:%i:%s')) AS hora_inicio, 
            TIME(STR_TO_DATE(pe.fecha_entrega, '%d/%m/%Y, %H:%i:%s')) AS hora_fin, pe.username,
            dv.cantidad, dv.descripcion, pe.observacion, pe.estado_pedido FROM pedidos pe
            JOIN venta v ON v.id=pe.venta_id
            JOIN detalle_venta dv ON dv.venta_id=v.id
            WHERE pe.estado_pedido='Preparando'
            ORDER BY STR_TO_DATE(pe.fecha_creacion, '%d/%m/%Y, %H:%i:%s') DESC
            LIMIT 7;
            """, nativeQuery=true)
    List<PedidoDto> obtenerPedidosPreparados();

    @Query(value="""
            SELECT pe.id, pe.venta_id as venta, v.mesa_id as mesa, STR_TO_DATE(pe.fecha_entrega, '%d/%m/%Y') AS fecha, 
            TIME(STR_TO_DATE(pe.fecha_creacion, '%d/%m/%Y, %H:%i:%s')) AS hora_inicio, 
            TIME(STR_TO_DATE(pe.fecha_entrega, '%d/%m/%Y, %H:%i:%s')) AS hora_fin, pe.username,
            dv.cantidad, dv.descripcion, pe.observacion, pe.estado_pedido FROM pedidos pe
            JOIN venta v ON v.id=pe.venta_id
            JOIN detalle_venta dv ON dv.venta_id=v.id
            WHERE pe.estado_pedido='Listo'
            ORDER BY STR_TO_DATE(pe.fecha_entrega, '%d/%m/%Y, %H:%i:%s') DESC;
            """, nativeQuery=true)
    List<PedidoDto> obtenerPedidosListos();
}
