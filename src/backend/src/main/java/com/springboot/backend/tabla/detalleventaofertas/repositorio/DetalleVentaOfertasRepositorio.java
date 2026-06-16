package com.springboot.backend.tabla.detalleventaofertas.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.detalleventaofertas.modelo.DetalleVentaOfertas;

public interface DetalleVentaOfertasRepositorio extends JpaRepository<DetalleVentaOfertas,Long>{
    
}
