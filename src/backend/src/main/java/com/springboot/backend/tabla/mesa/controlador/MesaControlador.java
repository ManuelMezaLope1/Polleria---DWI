package com.springboot.backend.tabla.mesa.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.mesa.modelo.Mesa;
import com.springboot.backend.tabla.mesa.repositorio.MesaRepositorio;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/v1/public")
public class MesaControlador {
    @Autowired
    private MesaRepositorio mesaRepositorio;

    @GetMapping("/mesas")
    public List<Mesa> listarTodasLasMesa() {
        return mesaRepositorio.findAll();
    }
    
    @PostMapping("/mesas")
    public Mesa guardarMesa(@RequestBody Mesa mesa) {
        return mesaRepositorio.save(mesa);
    }
    
    @GetMapping("/mesas/{id}")
    public ResponseEntity<Mesa> obtenerMesaPorId(@PathVariable Long id) {
        Mesa mesa=mesaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la mesa con el id: "+id));
        return ResponseEntity.ok(mesa);
    }
    
    @PutMapping("/mesas/{id}")
    public ResponseEntity<Mesa> actualizarMesa(@PathVariable Long id, @RequestBody Mesa detallesMesa) {
        Mesa mesaExistente=mesaRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe la mesa con el id: "+id));
        
        mesaExistente.setNombre(detallesMesa.getNombre());
        mesaExistente.setCapacidad(detallesMesa.getCapacidad());
        mesaExistente.setUbicacion(detallesMesa.getUbicacion());

        Mesa mesaActualizada=mesaRepositorio.save(mesaExistente);

        return ResponseEntity.ok(mesaActualizada);
    }
}
