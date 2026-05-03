package com.springboot.backend.tabla.usuario.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.tabla.usuario.modelo.Usuario;
import com.springboot.backend.tabla.usuario.repositorio.UsuarioRepositorio;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/v1")
public class UsuarioControlador {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @GetMapping("/public/usuarios")
    public List<Usuario> listarTodosLosUsuarios() {
        return usuarioRepositorio.findAll();
    }

    @GetMapping("/private/micuenta")
    public ResponseEntity<Usuario> obtenerPerfil(Authentication auth) {
        String username=auth.getName();

        Usuario usuario=usuarioRepositorio.findByUsername(username);

        return ResponseEntity.ok(usuario);
    }

    @PutMapping("/private/micuenta")
    public ResponseEntity<Usuario> actualizarUsuario(Authentication auth, @RequestBody Usuario detallesUsuario) {
        String username=auth.getName();

        Usuario usuarioExistente=usuarioRepositorio.findByUsername(username);

        usuarioExistente.setNombre(detallesUsuario.getNombre());
        usuarioExistente.setApellido(detallesUsuario.getApellido());
        usuarioExistente.setDireccion(detallesUsuario.getDireccion());
        usuarioExistente.setTelefono(detallesUsuario.getTelefono());
        usuarioExistente.setUsername(detallesUsuario.getUsername());
        usuarioExistente.setZona(detallesUsuario.getZona());

        Usuario usuarioActualizado=usuarioRepositorio.save(usuarioExistente);
        
        return ResponseEntity.ok(usuarioActualizado);
    }
}
