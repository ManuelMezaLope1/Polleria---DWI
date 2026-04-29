package com.springboot.backend.tabla.metodopago.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.metodopago.modelo.MetodoPago;

public interface MetodoPagoRepositorio extends JpaRepository<MetodoPago, Long>{
    
}
