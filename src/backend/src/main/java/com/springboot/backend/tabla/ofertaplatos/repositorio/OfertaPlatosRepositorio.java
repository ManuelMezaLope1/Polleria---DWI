package com.springboot.backend.tabla.ofertaplatos.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.backend.tabla.ofertaplatos.modelo.OfertaPlatos;

import jakarta.transaction.Transactional;

public interface OfertaPlatosRepositorio extends JpaRepository<OfertaPlatos,Long>{
    boolean existsByOfertaIdAndPlatoId(Long ofertaId,Long platoId);

    @Transactional
    void deleteByOfertaId(Long ofertaId);
}
