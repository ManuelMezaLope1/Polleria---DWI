package com.springboot.backend.tabla.pedido.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.excepcion.ResourceNotFoundException;
import com.springboot.backend.tabla.pedido.modelo.Pedido;
import com.springboot.backend.tabla.pedido.modelo.PedidoDto;
import com.springboot.backend.tabla.pedido.repositorio.PedidoRepositorio;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;




@RestController
@RequestMapping("/api/v1/public")
public class PedidoControlador {
    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    @GetMapping("/pedidos-pendientes")
    public List<PedidoDto> listarTodosLosPedidosPendientes() {
        return pedidoRepositorio.obtenerPedidosPendientes();
    }

    @GetMapping("/pedidos-preparados")
    public List<PedidoDto> listarTodosLosPedidosPreparados() {
        return pedidoRepositorio.obtenerPedidosPreparados();
    }

    @GetMapping("/pedidos-listos")
    public List<PedidoDto> listarTodosLosPedidosListos() {
        return pedidoRepositorio.obtenerPedidosListos();
    }

    @PostMapping("/pedidos")
    public Pedido guardarPedido(@RequestBody Pedido pedido) {
        return pedidoRepositorio.save(pedido);
    }
    
    @PutMapping("/pedidos-pendientes/{id}")
    public ResponseEntity<Pedido> actualizarPedidoPendiente(@PathVariable Long id, @RequestBody Pedido detallesPedidos) {
        Pedido pedidoExistente=pedidoRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el pedido con el id: "+id));

        pedidoExistente.setFecha_creacion(detallesPedidos.getFecha_creacion());
        pedidoExistente.setEstado_pedido("Preparando");
        pedidoExistente.setUsuario(detallesPedidos.getUsuario());
        pedidoExistente.setUsername(detallesPedidos.getUsername());

        Pedido pedidoActualizado=pedidoRepositorio.save(pedidoExistente);
        
        return ResponseEntity.ok(pedidoActualizado);
    }

    @PutMapping("pedidos-preparados/{id}")
    public ResponseEntity<Pedido> actualizarPedidoPreparado(@PathVariable Long id, @RequestBody Pedido detallesPedidos) {
        Pedido pedidoExistente=pedidoRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el pedido con el id: "+id));
  
        pedidoExistente.setEstado_pedido("Listo");
        pedidoExistente.setFecha_entrega(detallesPedidos.getFecha_entrega());

        Pedido pedidoActualizado=pedidoRepositorio.save(pedidoExistente);
        
        return ResponseEntity.ok(pedidoActualizado);
    }
}
