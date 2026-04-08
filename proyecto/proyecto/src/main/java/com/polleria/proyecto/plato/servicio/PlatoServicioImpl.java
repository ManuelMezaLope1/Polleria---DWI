package com.polleria.proyecto.plato.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polleria.proyecto.plato.entidad.Plato;
import com.polleria.proyecto.plato.repositorio.PlatoRepositorio;

@Service
public class PlatoServicioImpl implements PlatoServicio{
    @Autowired
    private PlatoRepositorio repositorio;

    @Override
    public List<Plato> listarTodosLosPlatos(){
        return repositorio.findAll();
    }

    @Override
    public Plato guardarPlato(Plato plato){
        return repositorio.save(plato);
    }

    @Override
    public Plato obtenerPlatoPorId(Long id){
        return repositorio.findById(id).get();
    }

    @Override
    public Plato obtenerPlatoPorCategoria(Long id){
        return repositorio.findById(id).get();
    }

    @Override
    public Plato actualizarPlato(Plato plato){
        return repositorio.save(plato);
    }

    @Override
    public void eliminarPlato(Long id){
        repositorio.deleteById(id);
    }
}
