package com.springboot.backend.rol.servicio;

import java.util.HashMap;

import com.springboot.backend.rol.modelo.Rol;

public class RolServicio {
    private final HashMap<Long, Rol> roles=new HashMap<>();

    public Rol crearRol(Long id, String nombre, String usuario){
        roles.put(id, new Rol(id,nombre,null));
        return roles.get(id);
    }

    public Rol obtenerRol(Long id){
        return roles.get(id);
    }
}
