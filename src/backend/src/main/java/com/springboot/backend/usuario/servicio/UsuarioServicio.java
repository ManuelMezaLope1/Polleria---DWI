package com.springboot.backend.usuario.servicio;

import java.util.HashMap;

import com.springboot.backend.usuario.modelo.Usuario;

public class UsuarioServicio {
    private final HashMap<Long, Usuario> usuarios=new HashMap<>();

    public Usuario crearUsuario(Long id, String nombre, String apellido, String email, String password, String rol){
        usuarios.put(id, new Usuario(id,nombre,apellido,email,password,null));
        return usuarios.get(id);
    }

    public Usuario obtenerUsuario(Long id){
        return usuarios.get(id);
    }
}
