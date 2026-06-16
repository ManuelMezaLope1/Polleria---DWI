package com.springboot.backend.tabla.estadoingrediente.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.estadoingrediente.modelo.EstadoIngrediente;

public interface EstadoIngredienteRepositorio extends JpaRepository<EstadoIngrediente,Long>{
    
}
