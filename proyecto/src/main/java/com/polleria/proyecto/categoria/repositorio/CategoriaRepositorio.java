package com.polleria.proyecto.categoria.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polleria.proyecto.categoria.entidad.Categoria;

public interface CategoriaRepositorio extends JpaRepository<Categoria, Long>{

}
