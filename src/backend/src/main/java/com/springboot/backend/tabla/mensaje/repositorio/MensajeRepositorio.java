package com.springboot.backend.tabla.mensaje.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.mensaje.modelo.Mensaje;

public interface MensajeRepositorio extends JpaRepository<Mensaje, Long>{
    
}
