package com.springboot.backend.rol.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.backend.rol.modelo.Rol;

@Repository
public interface RolRepositorio extends JpaRepository<Rol, Long>{
    
}
