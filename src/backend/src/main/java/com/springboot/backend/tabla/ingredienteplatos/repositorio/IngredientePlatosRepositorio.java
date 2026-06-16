package com.springboot.backend.tabla.ingredienteplatos.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.ingredienteplatos.modelo.IngredientePlatos;

public interface IngredientePlatosRepositorio extends JpaRepository<IngredientePlatos,Long>{
    boolean existsByPlatoIdAndIngredienteId(Long platoId, Long ingredienteId);
}
