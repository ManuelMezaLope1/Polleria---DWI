package com.springboot.backend.plato.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.backend.plato.modelo.Plato;

@Repository
public interface PlatoRepositorio extends JpaRepository<Plato, Long>{
    
}
