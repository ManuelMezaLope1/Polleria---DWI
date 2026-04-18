package com.polleria.proyecto.venta.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polleria.proyecto.venta.entidad.Venta;

public interface VentaRepositorio extends JpaRepository<Venta, Long>{
    
}
