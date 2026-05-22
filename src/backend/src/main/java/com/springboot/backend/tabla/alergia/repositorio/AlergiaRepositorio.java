package com.springboot.backend.tabla.alergia.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.alergia.modelo.Alergia;

public interface AlergiaRepositorio extends JpaRepository<Alergia, Long>{
    
}
