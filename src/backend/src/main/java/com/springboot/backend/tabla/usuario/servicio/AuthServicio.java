package com.springboot.backend.tabla.usuario.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.backend.tabla.rol.modelo.Rol;
import com.springboot.backend.tabla.rol.repositorio.RolRepositorio;
import com.springboot.backend.tabla.usuario.modelo.Usuario;
import com.springboot.backend.tabla.usuario.repositorio.UsuarioRepositorio;

@Service
public class AuthServicio {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private RolRepositorio rolRepositorio;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(Usuario usuario){
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        Rol rolUsuario=rolRepositorio.findByNombre("ROLE_USER");

        usuario.setRoles(List.of(rolUsuario));

        return usuarioRepositorio.save(usuario);
    }
}
