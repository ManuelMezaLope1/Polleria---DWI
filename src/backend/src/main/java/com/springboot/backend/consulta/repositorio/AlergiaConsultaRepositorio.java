package com.springboot.backend.consulta.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.CantidadAlergiasDto;
import com.springboot.backend.tabla.alergia.modelo.Alergia;

public interface AlergiaConsultaRepositorio extends JpaRepository<Alergia,Long>{
    @Query("""
            SELECT new com.springboot.backend.consulta.dto.CantidadAlergiasDto(
            COUNT(a)
            ) FROM Alergia a
    """)
    CantidadAlergiasDto obtenerCantidadAlergias();
}
