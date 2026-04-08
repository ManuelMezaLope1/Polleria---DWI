package com.polleria.proyecto.plato.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polleria.proyecto.plato.entidad.Plato;

public interface PlatoRepositorio extends JpaRepository<Plato, Long>{
    
}
