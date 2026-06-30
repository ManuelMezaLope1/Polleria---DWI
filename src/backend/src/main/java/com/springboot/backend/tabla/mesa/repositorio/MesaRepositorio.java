package com.springboot.backend.tabla.mesa.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.mesa.modelo.Mesa;

public interface MesaRepositorio extends JpaRepository<Mesa,Long>{
    
}
