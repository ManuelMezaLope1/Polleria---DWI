package com.springboot.backend.tabla.mesa.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.backend.tabla.mesa.modelo.Mesa;
import com.springboot.backend.tabla.mesa.modelo.MesaCapacidadDto;

public interface MesaRepositorio extends JpaRepository<Mesa,Long>{
    @Query(value="""
        select id, nombre, capacidad, estado, ubicacion from mesa where capacidad=4;        
            """, nativeQuery=true)
    List<MesaCapacidadDto> obtenerMesaCapacidadCuatro();

    @Query(value="""
        select id, nombre, capacidad, estado, ubicacion from mesa where capacidad=6;        
            """, nativeQuery = true)
    List<MesaCapacidadDto> obtenerMesaCapacidadSeis();

    @Query(value="""
        select id, nombre, capacidad, estado, ubicacion from mesa where capacidad=8;        
            """, nativeQuery = true)
    List<MesaCapacidadDto> obtenerMesaCapacidadOcho();

    @Query(value="""
        select id, nombre, capacidad, estado, ubicacion from mesa where capacidad=10;        
            """, nativeQuery = true)
    List<MesaCapacidadDto> obtenerMesaCapacidadDiez();
}
