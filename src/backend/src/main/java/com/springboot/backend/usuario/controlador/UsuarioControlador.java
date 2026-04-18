package com.springboot.backend.usuario.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.usuario.repositorio.UsuarioRepositorio;

@RestController
@RequestMapping("/api/v1")
public class UsuarioControlador {
    @Autowired
    private UsuarioRepositorio repositorio;
}
