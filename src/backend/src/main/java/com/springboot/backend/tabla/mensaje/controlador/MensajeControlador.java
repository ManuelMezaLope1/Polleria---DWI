package com.springboot.backend.tabla.mensaje.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.tabla.mensaje.modelo.Mensaje;
import com.springboot.backend.tabla.mensaje.repositorio.MensajeRepositorio;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/public")
public class MensajeControlador {
    @Autowired
    private MensajeRepositorio mensajeRepositorio;

    @GetMapping("/mensajes")
    public List<Mensaje> listarTodosLosMensajes() {
        return mensajeRepositorio.findAll();
    }

    @PostMapping("/mensajes")
    public Mensaje guardarMensaje(@RequestBody Mensaje mensaje) {
        return mensajeRepositorio.save(mensaje);
    }
}
