package com.springboot.backend.tabla.ingredienteplatos.controlador;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.ingrediente.modelo.Ingrediente;
import com.springboot.backend.tabla.ingrediente.repositorio.IngredienteRepositorio;
import com.springboot.backend.tabla.ingredienteplatos.modelo.IngredientePlatos;
import com.springboot.backend.tabla.ingredienteplatos.modelo.IngredientePlatosDto;
import com.springboot.backend.tabla.ingredienteplatos.repositorio.IngredientePlatosRepositorio;
import com.springboot.backend.tabla.ingredienteplatos.repositorio.PlatoIngredientesDto;
import com.springboot.backend.tabla.plato.modelo.Plato;
import com.springboot.backend.tabla.plato.repositorio.PlatoRepositorio;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1/public")
public class IngredientePlatosControlador {
    @Autowired
    private IngredientePlatosRepositorio ingredientePlatosRepositorio;

    @Autowired
    private IngredienteRepositorio ingredienteRepositorio;

    @Autowired
    private PlatoRepositorio platoRepositorio;

    @GetMapping("/ingrediente-platos/lote")
    public List<IngredientePlatos> listarTodosLosIngredientesPlatos() {
        return ingredientePlatosRepositorio.findAll();
    }

    @GetMapping("/ingrediente-platos")
    public List<PlatoIngredientesDto> obtenerIngredientesPlato(){
        return ingredientePlatosRepositorio.obtenerIngredientesPlato();
    }

    @PostMapping("/ingrediente-platos/lote")
    public ResponseEntity<?> guardarLote(@RequestBody List<IngredientePlatosDto> relaciones) {
        List<IngredientePlatos> lista=new ArrayList<>();

        int insertados=0;
        int omitidos=0;

        List<String> duplicados=new ArrayList<>();

        for(IngredientePlatosDto dto:relaciones){
            Ingrediente ingrediente=ingredienteRepositorio.findById(dto.getIngredienteId()).orElseThrow(()->new ResourceNotFoundException("Ingrediente no encontrado"));

            Plato plato=platoRepositorio.findById(dto.getPlatoId()).orElseThrow(()->new ResourceNotFoundException("Plato no encontrado"));

            boolean existe=ingredientePlatosRepositorio.existsByPlatoIdAndIngredienteId(plato.getId(),ingrediente.getId());

            if(existe){
                duplicados.add(plato.getNombre()+" - "+ingrediente.getNombre());

                omitidos++;
                continue;
            }

            IngredientePlatos ip=new IngredientePlatos();
            ip.setIngrediente(ingrediente);
            ip.setPlato(plato);

            lista.add(ip);

            insertados++;
        }

        if(!lista.isEmpty()){
            ingredientePlatosRepositorio.saveAll(lista);
        }

        Map<String,Object> respuesta=new HashMap<>();

        respuesta.put("insertados", insertados);
        respuesta.put("omitidos", omitidos);
        respuesta.put("duplicados", duplicados);
        
        return ResponseEntity.ok(respuesta);
    }
    
}
