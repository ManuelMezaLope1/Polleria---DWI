package com.springboot.backend.tabla.categoriaingrediente.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.categoriaingrediente.modelo.CategoriaIngrediente;

public interface CategoriaIngredienteRepositorio extends JpaRepository<CategoriaIngrediente, Long>{
    
}
