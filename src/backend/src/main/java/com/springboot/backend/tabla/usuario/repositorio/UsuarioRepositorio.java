package com.springboot.backend.tabla.usuario.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.usuario.modelo.Usuario;


public interface UsuarioRepositorio extends JpaRepository<Usuario, Long>{
    Usuario findByUsername(String username);
}
