package com.springboot.backend.consultaml.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.consulta.dto.PlatosPorVentasDto;
import com.springboot.backend.consultaml.dto.CantidadPlatosDto;
import com.springboot.backend.consultaml.dto.HistoricoCategoriaVentasDto;
import com.springboot.backend.consultaml.dto.HistoricoFranjaPedidosMlDto;
import com.springboot.backend.consultaml.dto.HistoricoPlatosMlDto;
import com.springboot.backend.consultaml.dto.HistoricoVentasDtoMl;
import com.springboot.backend.consultaml.dto.PlatoPrecioVentasDto;
import com.springboot.backend.consultaml.dto.UsuariosFrecuentesMlDto;
import com.springboot.backend.consultaml.dto.VentasDiasDto;
import com.springboot.backend.consultaml.repositorio.DetalleVentaPlatosMlRepositorio;
import com.springboot.backend.consultaml.repositorio.PedidoMlRepositorio;
import com.springboot.backend.consultaml.repositorio.VentaRepositorioMlRepositorio;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/public")
public class ReporteMlControlador {
    @Autowired
    private VentaRepositorioMlRepositorio ventaRepositorioMlRepositorio;

    @Autowired
    private DetalleVentaPlatosMlRepositorio detalleVentaPlatosMlRepositorio;

    @Autowired
    private PedidoMlRepositorio pedidoMlRepositorio;

    @GetMapping("/ventas-dia-ml")
    public List<VentasDiasDto> obtenerVentasDia() {
        return ventaRepositorioMlRepositorio.obtenerVentasDia();
    }

    @GetMapping("/platos-ventas-ml")
    public List<PlatosPorVentasDto> obtenerPlatosVentas() {
        return detalleVentaPlatosMlRepositorio.obtenerPlatosPorVentas();
    }

    @GetMapping("/historico-platos-ml")
    public List<HistoricoPlatosMlDto> obtenerHistoricoPlatos() {
        return detalleVentaPlatosMlRepositorio.obtenerHistoricoPlatos();
    }

    @GetMapping("/historico-franja-pedidos-ml")
    public List<HistoricoFranjaPedidosMlDto> obtenerHistoricoFranjaPedidos() {
        return pedidoMlRepositorio.obtenerHistoricoFranjaPedidos();
    }

    @GetMapping("/cantidad-platos-recomendacion-ml")
    public List<CantidadPlatosDto> obtenerCantidadPlatosRecomendaciones() {
        return detalleVentaPlatosMlRepositorio.obtenerCantidadPlatosRecomendacion();
    }

    @GetMapping("/cantidad-ofertas-recomendacion-ml")
    public List<CantidadPlatosDto> obtenerCantidadOfertasRecomendaciones() {
        return detalleVentaPlatosMlRepositorio.obtenerCantidadOfertasRecomendacion();
    }

    @GetMapping("/usuarios-frecuentes-ml")
    public List<UsuariosFrecuentesMlDto> obtenerUsuariosFrecuentes() {
        return detalleVentaPlatosMlRepositorio.obtenerUsuarioFrecuentes();
    }

    @GetMapping("/historico-ventas-ml")
    public List<HistoricoVentasDtoMl> obtenerHistoricoVentas() {
        return ventaRepositorioMlRepositorio.obtenerHistoricoventa();
    }
    
    @GetMapping("/historico-categoria-ventas-ml")
    public List<HistoricoCategoriaVentasDto> obtenerHistoricoCategoriaVentas() {
        return ventaRepositorioMlRepositorio.obtenerHistoricoCategoriaVentas();
    }
 
    @GetMapping("/combinaciones-platos-ml")
    public List<PlatoPrecioVentasDto> obtenerPlatoPrecioVentas() {
        return ventaRepositorioMlRepositorio.obtenerPlatoPrecioVentas();
    }
    
}
