package com.springboot.backend.tabla.detalleventa.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.detalleventa.modelo.DetalleVenta;

public interface DetalleVentaRepositorio extends JpaRepository<DetalleVenta, Long>{
    
}
