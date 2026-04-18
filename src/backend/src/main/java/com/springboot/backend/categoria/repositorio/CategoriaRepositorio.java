package com.springboot.backend.categoria.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.backend.categoria.modelo.Categoria;

@Repository
public interface CategoriaRepositorio extends JpaRepository<Categoria, Long>{
    
}
