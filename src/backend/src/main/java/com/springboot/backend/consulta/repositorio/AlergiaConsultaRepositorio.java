package com.springboot.backend.consulta.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.consulta.dto.AlergiaIngredientesDto;
import com.springboot.backend.consulta.dto.CantidadAlergiasDto;
import com.springboot.backend.tabla.alergia.modelo.Alergia;

public interface AlergiaConsultaRepositorio extends JpaRepository<Alergia, Long> {
    @Query("""
                    SELECT new com.springboot.backend.consulta.dto.CantidadAlergiasDto(
                    COUNT(a)
                    ) FROM Alergia a
            """)
    CantidadAlergiasDto obtenerCantidadAlergias();

    @Query(value = """
                        select a.nombre as alergia, count(i.nombre) as cantidad from ingredientes i
            join alergias a on a.id=i.alergia_id
            where a.nombre not like 'No tiene'
            group by a.nombre
            order by count(i.nombre) desc;
                        """, nativeQuery = true)
    List<AlergiaIngredientesDto> obtenerAlergiaIngredientes();
}
