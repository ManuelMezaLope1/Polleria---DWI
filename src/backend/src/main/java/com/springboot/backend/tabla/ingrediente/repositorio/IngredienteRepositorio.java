package com.springboot.backend.tabla.ingrediente.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.ingrediente.modelo.Ingrediente;

public interface IngredienteRepositorio extends JpaRepository<Ingrediente, Long>{
    
}
