package com.springboot.backend.usuario.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.usuario.modelo.Usuario;
import com.springboot.backend.usuario.repositorio.UsuarioRepositorio;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/v1")
public class UsuarioControlador {
    @Autowired
    private UsuarioRepositorio repositorio;

    @GetMapping("/usuarios")
    public List<Usuario> listarTodosLosUsuarios() {
        return repositorio.findAll();
    }
    
    @PostMapping("/usuarios")
    public Usuario guardarUsuario(@RequestBody Usuario usuario) {
        return repositorio.save(usuario);
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        Usuario usuario=repositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el usuario con el id: "+id));
        return ResponseEntity.ok(usuario);
    }
    

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario detallesUsuario) {
        Usuario usuarioExistente=repositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el usuario con el id: "+id));

        usuarioExistente.setNombre(detallesUsuario.getNombre());
        usuarioExistente.setApellido(detallesUsuario.getApellido());
        usuarioExistente.setEmail(detallesUsuario.getEmail());
        usuarioExistente.setPassword(detallesUsuario.getPassword());

        Usuario usuarioActualizado=repositorio.save(usuarioExistente);

        return ResponseEntity.ok(usuarioActualizado);
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarUsuario(@PathVariable Long id){
        Usuario usuario=repositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No exite el usuario con el id: "+id));

        repositorio.delete(usuario);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
