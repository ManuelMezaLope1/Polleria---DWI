package com.springboot.backend.tabla.venta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.venta.modelo.Venta;

public interface VentaRepositorio extends JpaRepository<Venta, Long>{
    List<Venta> findByUsuarioUsername(String username);
}
