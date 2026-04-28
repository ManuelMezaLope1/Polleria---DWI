package com.springboot.backend.zona.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.zona.modelo.Zona;

public interface ZonaRepositorio extends JpaRepository<Zona, Long>{
  
}
