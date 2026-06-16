package com.springboot.backend.tabla.estadoingrediente.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.tabla.estadoingrediente.modelo.EstadoIngrediente;
import com.springboot.backend.tabla.estadoingrediente.repositorio.EstadoIngredienteRepositorio;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1/public")
public class EstadoIngredienteControlador {
    @Autowired
    private EstadoIngredienteRepositorio estadoIngredienteRepositorio;

    @GetMapping("/estado-ingrediente")
    public List<EstadoIngrediente> listarTodosLosEstadosIngredientes() {
        return estadoIngredienteRepositorio.findAll();
    }
    
}
