package com.polleria.proyecto.plato.servicio;

import java.util.List;

import com.polleria.proyecto.plato.entidad.Plato;

public interface PlatoServicio {
    public List<Plato> listarTodosLosPlatos();

    public Plato guardarPlato(Plato plato);

    public Plato obtenerPlatoPorId(Long id);

    public Plato obtenerPlatoPorCategoria(Long id);

    public Plato actualizarPlato(Plato plato);

    public void eliminarPlato(Long id);
}
