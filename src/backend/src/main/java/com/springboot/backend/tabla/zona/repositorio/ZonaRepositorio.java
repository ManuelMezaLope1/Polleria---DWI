package com.springboot.backend.tabla.zona.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.zona.modelo.Zona;

public interface ZonaRepositorio extends JpaRepository<Zona, Long>{
  
}
