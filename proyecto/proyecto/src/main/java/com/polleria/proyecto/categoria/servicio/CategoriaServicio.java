package com.polleria.proyecto.categoria.servicio;

import java.util.List;

import com.polleria.proyecto.categoria.entidad.Categoria;

public interface CategoriaServicio {
    public List<Categoria> listarTodasLasCategorias();

    public Categoria guardarCategoria(Categoria categoria);

    public Categoria obtenerCategoriaPorId(Long id);

    public Categoria actualizarCategoria(Categoria categoria);

    public void eliminarCategoria(Long id);
}
