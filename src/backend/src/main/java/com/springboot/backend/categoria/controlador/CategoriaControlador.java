package com.springboot.backend.categoria.controlador;

import com.springboot.backend.categoria.modelo.Categoria;
import com.springboot.backend.categoria.repositorio.CategoriaRepositorio;
import com.springboot.backend.excepcion.ResourceNotFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class CategoriaControlador {
    @Autowired
    private CategoriaRepositorio repositorio;
    

    @GetMapping("/categorias")
    public List<Categoria> listarTodasLasCategorias() {
        return repositorio.findAll();
    }
    
    @PostMapping("/categorias")
    public Categoria guardarCategoria(@RequestBody Categoria categoria) {
        return repositorio.save(categoria);
    }
    
    @GetMapping("/categorias/{id}")
    public ResponseEntity<Categoria> obtenerCategoriaPorId(@PathVariable Long id) {
        Categoria categoria=repositorio.findById(id).orElseThrow(()-> new ResourceNotFoundException("No existe la categoria con el id: "+id));
        return ResponseEntity.ok(categoria);
    }
    
    @PutMapping("/categorias/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Long id, @RequestBody Categoria detallesCategoria) {
        Categoria categoriaExistente=repositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la categoria con el id: "+id));
        
        categoriaExistente.setNombre(detallesCategoria.getNombre());
        categoriaExistente.setDescripcion(detallesCategoria.getDescripcion());

        Categoria categoriaActualizada=repositorio.save(categoriaExistente);

        return ResponseEntity.ok(categoriaActualizada);
    }

    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarCategoria(@PathVariable Long id){
        Categoria categoria=repositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la categoria con el id: "+id));

        repositorio.delete(categoria);
        Map<String,Boolean> respuesta=new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
