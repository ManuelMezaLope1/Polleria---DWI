package com.springboot.backend.tabla.plato.controlador;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.plato.modelo.Plato;
import com.springboot.backend.tabla.plato.repositorio.PlatoRepositorio;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public")
public class PlatoControlador {
    @Autowired
    private PlatoRepositorio repositorio;

    @GetMapping("/platos")
    public List<Plato> listarTodosLosPlatos() {
        return repositorio.findAll();
    }

    @PostMapping("/platos")
    public Plato guardarPlato(@RequestPart("plato") Plato plato, @RequestPart("imagen") MultipartFile imagen)
            throws IOException {
        String ruta = "C:/Users/uuuri/OneDrive/Escritorio/Nueva carpeta/Repositori/Polleria---DWI/src/frontend/public/";
        String nombreImagen = UUID.randomUUID().toString()
                + "_"
                + imagen.getOriginalFilename();
        Files.copy(
                imagen.getInputStream(),
                Paths.get(ruta + nombreImagen),
                StandardCopyOption.REPLACE_EXISTING);

        plato.setImagen(nombreImagen);

        return repositorio.save(plato);
    }

    @GetMapping("/platos/{id}")
    public ResponseEntity<Plato> obtenerPlatoPorId(@PathVariable Long id) {
        Plato plato = repositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe el plato con el id: " + id));

        return ResponseEntity.ok(plato);
    }

    @PutMapping("/platos/{id}")
    public ResponseEntity<Plato> actualizarPlato(@PathVariable Long id, @RequestBody Plato detallesPlato) {
        Plato platoExistente = repositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe el plato con el id: " + id));

        platoExistente.setNombre(detallesPlato.getNombre());
        platoExistente.setPrecio(detallesPlato.getPrecio());
        platoExistente.setDescripcion(detallesPlato.getDescripcion());
        platoExistente.setCategoria(detallesPlato.getCategoria());

        Plato platoActualizado = repositorio.save(platoExistente);

        return ResponseEntity.ok(platoActualizado);
    }

    @DeleteMapping("/platos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarPlato(@PathVariable Long id) {
        Plato plato = repositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe el plato con el id: " + id));

        repositorio.delete(plato);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);

        return ResponseEntity.ok(respuesta);
    }
}
