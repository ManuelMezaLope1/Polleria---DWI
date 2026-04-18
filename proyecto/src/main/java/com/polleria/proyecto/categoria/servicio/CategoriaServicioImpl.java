package com.polleria.proyecto.categoria.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.polleria.proyecto.categoria.entidad.Categoria;
import com.polleria.proyecto.categoria.repositorio.CategoriaRepositorio;

@Service
public class CategoriaServicioImpl implements CategoriaServicio{
    @Autowired
    private CategoriaRepositorio repositorio;

    @Override
    public List<Categoria> listarTodasLasCategorias(){
        return repositorio.findAll();
    }

    @Override
    public Categoria guardarCategoria(Categoria categoria){
        return repositorio.save(categoria);
    }

    @Override
    public Categoria obtenerCategoriaPorId(Long id){
        return repositorio.findById(id).get();
    }

    @Override
    public Categoria actualizarCategoria(Categoria categoria){
        return repositorio.save(categoria);
    }

    @Override
    public void eliminarCategoria(Long id){
        repositorio.deleteById(id);
    }
}
