package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.CantidadCategoriasDto;
import com.springboot.backend.consulta.dto.CategoriaPlatosDto;
import com.springboot.backend.tabla.categoria.modelo.Categoria;

public interface CategoriaConsultaRepositorio extends JpaRepository<Categoria,Long>{
    @Query("""
            SELECT new com.springboot.backend.consulta.dto.CantidadCategoriasDto(
            COUNT(c)
            ) FROM Categoria c
    """)
    CantidadCategoriasDto obtenerCantidadCategorias();

    @Query("""
            SELECT new com.springboot.backend.consulta.dto.CategoriaPlatosDto(
            c.nombre, count(p)
            ) FROM Categoria c
             JOIN c.plato p
             GROUP BY c.nombre
    """)
    List<CategoriaPlatosDto> obtenerCategoriaPlatos();
}
