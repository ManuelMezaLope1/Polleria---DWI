package com.springboot.backend.tabla.usuario.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.tabla.usuario.modelo.Usuario;
import com.springboot.backend.tabla.usuario.repositorio.UsuarioRepositorio;

@RestController
@RequestMapping("/api/v1")
public class UsuarioControlador {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @GetMapping("/usuarios")
    public List<Usuario> listarTodosLosUsuarios() {
        return usuarioRepositorio.findAll();
    }
}
