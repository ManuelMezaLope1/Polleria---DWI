package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.CantidadMetodoPagoDto;
import com.springboot.backend.tabla.metodopago.modelo.MetodoPago;

public interface MetodoPagoConsultaRepositorio extends JpaRepository<MetodoPago,Long>{
    @Query(value="""
            SELECT mp.nombre, COUNT(*) AS cantidad FROM venta v
            JOIN metodopago mp ON mp.id=v.metodopago_id
            GROUP BY mp.nombre
            ORDER BY cantidad DESC;
            """, nativeQuery=true)
    List<CantidadMetodoPagoDto> obtenerCantidadMetodoPago();
}
