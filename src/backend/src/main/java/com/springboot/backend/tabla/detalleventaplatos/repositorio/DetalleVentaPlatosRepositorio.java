package com.springboot.backend.tabla.detalleventaplatos.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.detalleventaplatos.modelo.DetalleVentaPlatos;

public interface DetalleVentaPlatosRepositorio extends JpaRepository<DetalleVentaPlatos,Long>{
    
}
