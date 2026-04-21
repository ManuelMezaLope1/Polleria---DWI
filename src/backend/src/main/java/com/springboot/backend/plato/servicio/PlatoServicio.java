package com.springboot.backend.plato.servicio;

import java.util.HashMap;

import com.springboot.backend.plato.modelo.Plato;

public class PlatoServicio {
    private final HashMap<Long, Plato> platos=new HashMap<>();

    public Plato crearPlato(Long id, String nombre, String categoria, String descripcion, double precio){
        platos.put(id, new Plato(id,nombre,categoria,descripcion,precio));
        return platos.get(id);
    }

    public Plato obtenerPlato(Long id){
        return platos.get(id);
    }
}
