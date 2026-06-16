package com.springboot.backend.tabla.oferta.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.oferta.modelo.Oferta;

public interface OfertaRepositorio extends JpaRepository<Oferta, Long>{
    
}
