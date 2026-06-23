package com.springboot.backend.tabla.ingredienteplatos.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.tabla.ingredienteplatos.modelo.IngredientePlatos;

public interface IngredientePlatosRepositorio extends JpaRepository<IngredientePlatos, Long> {
    boolean existsByPlatoIdAndIngredienteId(Long platoId, Long ingredienteId);

    @Query(value = """
                        select p.nombre as plato, ip.ingrediente_id as id, i.nombre as ingrediente from ingrediente_platos ip
            JOIN ingredientes i ON i.id=ip.ingrediente_id
            JOIN platos p ON p.id=ip.plato_id
            ORDER BY p.nombre;
                        """, nativeQuery = true)
    List<PlatoIngredientesDto> obtenerIngredientesPlato();
}
