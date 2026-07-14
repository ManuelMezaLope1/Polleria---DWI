package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.AlergiaIngredientesDto;
import com.springboot.backend.consulta.dto.CantidadPlatosDto;
import com.springboot.backend.consulta.dto.CantidadPlatosPrepararDto;
import com.springboot.backend.consulta.dto.MejorPlatoDto;
import com.springboot.backend.consulta.dto.PlatoMesaDto;
import com.springboot.backend.tabla.plato.modelo.Plato;

public interface PlatoConsultaRepositorio extends JpaRepository<Plato, Long> {
    @Query("""
                    SELECT new com.springboot.backend.consulta.dto.CantidadPlatosDto(
                    COUNT(p)
                    ) FROM Plato p
            """)
    CantidadPlatosDto obtenerCantidadPlatos();

    @Query(value = """
            SELECT p.nombre, c.nombre as categoria, p.precio, p.imagen, SUM(dvp.cantidad_platos), ROUND(SUM(dv.total),2) as cantidad
            FROM detalle_venta_platos dvp
            JOIN detalle_venta dv ON dv.id=dvp.detalle_venta_id
            JOIN platos p ON p.id = dvp.plato_id
            JOIN categorias c ON c.id=p.categoria_id
            WHERE c.nombre NOT IN ('Cremas', 'Bebidas','Guarniciones','Postres')
            GROUP BY p.nombre,c.nombre,p.precio,p.imagen
            ORDER BY sum(dvp.cantidad_platos) DESC
            LIMIT 1;
            """, nativeQuery = true)
    MejorPlatoDto obtenerMejorPlato();

    @Query(value = """
                                            SELECT p.nombre, c.nombre AS categoria, p.descripcion, p.imagen, COALESCE(ing.cantidad_ingredientes,0) AS cantidad_ingredientes,
            	(COALESCE(pen.cantidad_platos_pendientes,0) + COALESCE(pen_of.cantidad_platos_pendientes_ofertas,0)) AS cantidad_platos_pendientes FROM platos p
            JOIN categorias c ON c.id = p.categoria_id
            LEFT JOIN (
            	SELECT plato_id, COUNT(*) AS cantidad_ingredientes FROM ingrediente_platos
            	GROUP BY plato_id
            ) ing ON ing.plato_id = p.id
            LEFT JOIN (
                SELECT dvp.plato_id, p.nombre, SUM(dvp.cantidad_platos) AS cantidad_platos_pendientes FROM detalle_venta_platos dvp
                JOIN detalle_venta dv ON dv.id = dvp.detalle_venta_id
                JOIN venta v ON v.id = dv.venta_id
                JOIN pedidos pe ON pe.venta_id = v.id
                JOIN platos p ON p.id=dvp.plato_id
                WHERE pe.estado_pedido = 'Pendiente'
                GROUP BY dvp.plato_id
            ) pen ON pen.plato_id = p.id
            LEFT JOIN (
                SELECT op.plato_id, p.nombre, SUM(dvo.cantidad_ofertas * op.cantidad_platos) AS cantidad_platos_pendientes_ofertas FROM detalle_venta_ofertas dvo
                JOIN detalle_venta dv ON dv.id = dvo.detalle_venta_id
                JOIN venta v ON v.id = dv.venta_id
                JOIN pedidos pe ON pe.venta_id = v.id
                JOIN oferta_platos op ON op.oferta_id = dvo.oferta_id
                JOIN platos p ON p.id=op.plato_id
                WHERE pe.estado_pedido = 'Pendiente'
                GROUP BY op.plato_id, p.nombre
            ) pen_of ON pen_of.plato_id = p.id
            WHERE c.nombre NOT IN ('Bebidas','Cremas','Postres')
            AND (
                COALESCE(pen.cantidad_platos_pendientes,0) + COALESCE(pen_of.cantidad_platos_pendientes_ofertas,0)
            ) > 0
            ORDER BY cantidad_platos_pendientes DESC;
                                            """, nativeQuery = true)
    List<CantidadPlatosPrepararDto> obtenerCantidadPlatosPreparar();

    @Query(value = """
                            select p.nombre as nombre, c.nombre as categoria, p.descripcion, p.precio, p.imagen from platos p
            join categorias c on c.id=p.categoria_id
            where c.nombre not in ('Bebidas','Cremas')
            order by p.nombre asc;
                            """, nativeQuery = true)
    List<PlatoMesaDto> obtenerPlatosParaMesa();

    @Query(value = """
                        select p.nombre as plato, count(ip.ingrediente_id) as cantidad from ingrediente_platos ip
            join ingredientes i on i.id=ip.ingrediente_id
            join platos p on p.id=ip.plato_id
            join categorias c on c.id=p.categoria_id
            where c.nombre not in ('Bebidas','Cremas','Postres')
            group by p.nombre
            order by count(ip.ingrediente_id) desc
            LIMIT 7;
                        """, nativeQuery = true)
    List<AlergiaIngredientesDto> obtenerCantidadIngredientesPlato();
}
