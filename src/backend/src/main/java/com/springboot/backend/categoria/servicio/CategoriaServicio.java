package com.springboot.backend.categoria.servicio;

import java.util.HashMap;

import com.springboot.backend.categoria.modelo.Categoria;

public class CategoriaServicio {
    private final HashMap<Long, Categoria> categorias=new HashMap<>();

    public Categoria crearCategoria(Long id, String nombre, String descripcion, String plato){
        categorias.put(id, new Categoria(id,nombre,descripcion,null));
        return categorias.get(id);
    }

    public Categoria obtenerCategoria(Long id){
        return categorias.get(id);
    }
}
