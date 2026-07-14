package com.springboot.backend.consulta.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.backend.consulta.dto.AlergiaIngredientesDto;
import com.springboot.backend.consulta.dto.CantidadAlergiasDto;
import com.springboot.backend.consulta.dto.CantidadCategoriasDto;
import com.springboot.backend.consulta.dto.CantidadEstadoPedidoDto;
import com.springboot.backend.consulta.dto.CantidadIngredientesDto;
import com.springboot.backend.consulta.dto.CantidadMetodoPagoDto;
import com.springboot.backend.consulta.dto.CantidadOfertasDto;
import com.springboot.backend.consulta.dto.CantidadPedidosDto;
import com.springboot.backend.consulta.dto.CantidadPlatosDto;
import com.springboot.backend.consulta.dto.CantidadPlatosPrepararDto;
import com.springboot.backend.consulta.dto.CantidadUsuariosDto;
import com.springboot.backend.consulta.dto.CantidadVentasDto;
import com.springboot.backend.consulta.dto.CantidadZonaDto;
import com.springboot.backend.consulta.dto.CategoriaPlatosDto;
import com.springboot.backend.consulta.dto.DetallesVentasDto;
import com.springboot.backend.consulta.dto.FranjaPedidosDto;
import com.springboot.backend.consulta.dto.IngredientesDto;
import com.springboot.backend.consulta.dto.MejorIngredientePedidoHoyDto;
import com.springboot.backend.consulta.dto.MejorOfertaDto;
import com.springboot.backend.consulta.dto.MejorOfertaPedidoHoyDto;
import com.springboot.backend.consulta.dto.MejorPlatoDto;
import com.springboot.backend.consulta.dto.MejorPlatoPedidoHoyDto;
import com.springboot.backend.consulta.dto.MejorUsuarioDto;
import com.springboot.backend.consulta.dto.MejorZonaDto;
import com.springboot.backend.consulta.dto.OfertaCantidadPlatosDto;
import com.springboot.backend.consulta.dto.OfertaMesaDto;
import com.springboot.backend.consulta.dto.OfertasPorVentasDto;
import com.springboot.backend.consulta.dto.PlatoMesaDto;
import com.springboot.backend.consulta.dto.PlatosPorVentasDto;
import com.springboot.backend.consulta.dto.UsuarioVentasDto;
import com.springboot.backend.consulta.dto.UsuariosMasFrecuentesDto;
import com.springboot.backend.consulta.dto.VentasHoyDto;
import com.springboot.backend.consulta.dto.VentasMesDto;
import com.springboot.backend.consulta.dto.VentasPorZonasDto;
import com.springboot.backend.consulta.dto.VentasSemanaDto;
import com.springboot.backend.consulta.repositorio.AlergiaConsultaRepositorio;
import com.springboot.backend.consulta.repositorio.CategoriaConsultaRepositorio;
import com.springboot.backend.consulta.repositorio.DetalleVentaOfertasConsultaRepositorio;
import com.springboot.backend.consulta.repositorio.DetalleVentaPlatosConsultaRepositorio;
import com.springboot.backend.consulta.repositorio.IngredienteConsultaRepositorio;
import com.springboot.backend.consulta.repositorio.MetodoPagoConsultaRepositorio;
import com.springboot.backend.consulta.repositorio.OfertaConsultaRepositorio;
import com.springboot.backend.consulta.repositorio.PedidoConsultaRepositorio;
import com.springboot.backend.consulta.repositorio.PlatoConsultaRepositorio;
import com.springboot.backend.consulta.repositorio.UsuarioConsultaRepositorio;
import com.springboot.backend.consulta.repositorio.VentaConsultaRepositorio;
import com.springboot.backend.consulta.repositorio.ZonaConsultaRepositorio;
import com.springboot.backend.tabla.pedido.modelo.PedidoDto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1/public")
public class ReporteControlador {
    @Autowired
    private VentaConsultaRepositorio ventaConsultaRepositorio;

    @Autowired
    private UsuarioConsultaRepositorio usuarioConsultaRepositorio;

    @Autowired
    private AlergiaConsultaRepositorio alergiaConsultaRepositorio;

    @Autowired
    private CategoriaConsultaRepositorio categoriaConsultaRepositorio;

    @Autowired
    private IngredienteConsultaRepositorio ingredienteConsultaRepositorio;

    @Autowired
    private OfertaConsultaRepositorio ofertaConsultaRepositorio;

    @Autowired
    private PlatoConsultaRepositorio platoConsultaRepositorio;

    @Autowired
    private ZonaConsultaRepositorio zonaConsultaRepositorio;

    @Autowired
    private DetalleVentaPlatosConsultaRepositorio detalleVentaPlatosConsultaRepositorio;

    @Autowired
    private DetalleVentaOfertasConsultaRepositorio detalleVentaOfertasConsultaRepositorio;

    @Autowired
    private MetodoPagoConsultaRepositorio metodoPagoConsultaRepositorio;

    @Autowired
    private PedidoConsultaRepositorio pedidoConsultaRepositorio;

    @GetMapping("/cantidad-ventas")
    public CantidadVentasDto cantidadVentas() {
        return ventaConsultaRepositorio.obtenerCantidadVentas();
    }

    @GetMapping("/cantidad-usuarios")
    public CantidadUsuariosDto cantidadUsuarios() {
        return usuarioConsultaRepositorio.obtenerCantidadUsuariosDto();
    }

    @GetMapping("/cantidad-alergias")
    public CantidadAlergiasDto cantidadAlergias() {
        return alergiaConsultaRepositorio.obtenerCantidadAlergias();
    }

    @GetMapping("/cantidad-categorias")
    public CantidadCategoriasDto cantidadCategorias() {
        return categoriaConsultaRepositorio.obtenerCantidadCategorias();
    }

    @GetMapping("/cantidad-ingredientes")
    public CantidadIngredientesDto cantidadIngredientes() {
        return ingredienteConsultaRepositorio.obtenerCantidadIngredientes();
    }

    @GetMapping("/cantidad-ofertas")
    public CantidadOfertasDto cantidadOfertas() {
        return ofertaConsultaRepositorio.obtenerCantidadOfertas();
    }

    @GetMapping("/cantidad-platos")
    public CantidadPlatosDto cantidadPlatos() {
        return platoConsultaRepositorio.obtenerCantidadPlatos();
    }

    @GetMapping("/cantidad-zonas")
    public CantidadZonaDto cantidadZonas() {
        return zonaConsultaRepositorio.obtenerCantidadZonas();
    }

    @GetMapping("/cantidad-metodopago")
    public List<CantidadMetodoPagoDto> cantidadMetodoPago() {
        return metodoPagoConsultaRepositorio.obtenerCantidadMetodoPago();
    }

    @GetMapping("/ventas-hoy")
    public VentasHoyDto ventasHoy() {
        return ventaConsultaRepositorio.obtenerVentasHoy();
    }
    
    @GetMapping("/ventas-semana")
    public VentasSemanaDto ventasSemana() {
        return ventaConsultaRepositorio.obtenerVentasSemana();
    }

    @GetMapping("/ventas-mes")
    public VentasMesDto ventasMes() {
        return ventaConsultaRepositorio.obtenerVentasMes();
    }
    
    
    
    @GetMapping("/usuario-ventas")
    public List<UsuarioVentasDto> usuarioVentas() {
        return usuarioConsultaRepositorio.obtenerUsuarioVentas();
    }

    @GetMapping("/detalles-ventas-consulta")
    public List<DetallesVentasDto> detalesVentas() {
        return ventaConsultaRepositorio.obtenerTop3VentasDesc();
    }

    @GetMapping("/ventas-zonas")
    public List<VentasPorZonasDto> ventasPorZona() {
        return zonaConsultaRepositorio.obtenerVentasPorZona();
    }

    @GetMapping("/todos-ingredientes")
    public List<IngredientesDto> todosIngredientes() {
        return ingredienteConsultaRepositorio.obtenerTodosLosIngredientes();
    }
    
    @GetMapping("/cantidad-pedidos-pendientes")
    public CantidadPedidosDto cantidadPedidosPendientes() {
        return ingredienteConsultaRepositorio.obtenerCantidadPedidosPendientes();
    }
    
    @GetMapping("/cantidad-pedidos-preparados")
    public CantidadPedidosDto cantidadPedidosPreparados() {
        return ingredienteConsultaRepositorio.obtenerCantidadPedidosPreparados();
    }

    @GetMapping("/cantidad-pedidos-listos")
    public CantidadPedidosDto cantidadPedidosListos() {
        return ingredienteConsultaRepositorio.obtenerCantidadPedidosListos();
    }

    @GetMapping("/cantidad-platos-pendientes")
    public CantidadPedidosDto cantidadPlatosPendiente() {
        return pedidoConsultaRepositorio.obtenerCantidadPlatosPendientes();
    }
    
    @GetMapping("/cantidad-platos-preparados")
    public CantidadPedidosDto cantidadPlatosPreparados() {
        return pedidoConsultaRepositorio.obtenerCantidadPlatosPreparados();
    }
    
    @GetMapping("/cantidad-platos-listos")
    public CantidadPedidosDto cantidadPlatosListos() {
        return pedidoConsultaRepositorio.obtenerCantidadPlatosListos();
    }

    @GetMapping("/mejor-plato-pedido-hoy")
    public List<MejorPlatoPedidoHoyDto> mejorPlatoPedidoHoy() {
        return pedidoConsultaRepositorio.obtenerMejorPlatoHoy();
    }
    
    @GetMapping("/mejor-oferta-pedido-hoy")
    public List<MejorOfertaPedidoHoyDto> mejorOfertaPedidoHoy() {
        return pedidoConsultaRepositorio.obtenerMejorOfertaHoy();
    }
    
    @GetMapping("/mejor-ingrediente-pedido-hoy")
    public List<MejorIngredientePedidoHoyDto> mejorIngredientePedidoHoy() {
        return pedidoConsultaRepositorio.obtenerMejorIngredienteHoy();
    }

    @GetMapping("/platos-ventas")
    public List<PlatosPorVentasDto> platosPorVentas() {
        return detalleVentaPlatosConsultaRepositorio.obtenerPlatosPorVentas();
    }

    @GetMapping("/ofertas-ventas")
    public List<OfertasPorVentasDto> ofertasPorVentas() {
        return detalleVentaOfertasConsultaRepositorio.obtenerOfertasPorVentas();
    }
    
    @GetMapping("/usuarios-frecuentes")
    public List<UsuariosMasFrecuentesDto> usuariosMasFrecuentes(){
        return ventaConsultaRepositorio.obtenerUsuariosMasFrecuentes();
    }
    
    @GetMapping("/categoria-platos")
    public List<CategoriaPlatosDto> categoriaPlatos() {
        return categoriaConsultaRepositorio.obtenerCategoriaPlatos();
    }
    @GetMapping("/mejor-usuario")
    public MejorUsuarioDto mejorUsuario() {
        return usuarioConsultaRepositorio.obtenerMejorUsuario();
    }
    
    @GetMapping("/mejor-plato")
    public MejorPlatoDto mejorPlato() {
        return platoConsultaRepositorio.obtenerMejorPlato();
    }

    @GetMapping("/mejor-oferta")
    public MejorOfertaDto mejorOferta() {
        return ofertaConsultaRepositorio.obtenerMejorOferta();
    }
    
    @GetMapping("/mejor-zona")
    public MejorZonaDto mejorZona() {
        return zonaConsultaRepositorio.obtenerMejorZona();
    }
    
    @GetMapping("/pedidos-observaciones")
    public List<PedidoDto> pedidosObservaciones() {
        return pedidoConsultaRepositorio.obtenerPedidosConObservaciones();
    }
    
    @GetMapping("/platos-preparar")
    public List<CantidadPlatosPrepararDto> platosPreparar() {
        return platoConsultaRepositorio.obtenerCantidadPlatosPreparar();
    }

    @GetMapping("/cantidad-estado-pedido")
    public List<CantidadEstadoPedidoDto> cantidadEstadoPedido() {
        return pedidoConsultaRepositorio.obtenerCantidadEstadoPedido();
    }
    
    @GetMapping("/franja-pedidos")
    public List<FranjaPedidosDto> franjaPedidos() {
        return pedidoConsultaRepositorio.obtenerFranjaPedidos();
    }
    
    @GetMapping("/dia-pedidos")
    public List<CantidadEstadoPedidoDto> cantidadDiaPedidos() {
        return pedidoConsultaRepositorio.obtenerCantidadDiaPedidos();
    }
    
    @GetMapping("/platos-mesa")
    public List<PlatoMesaDto> platoParaMesa() {
        return platoConsultaRepositorio.obtenerPlatosParaMesa();
    }
    
    @GetMapping("/ofertas-mesa")
    public List<OfertaMesaDto> ofertaParaMesa() {
        return ofertaConsultaRepositorio.obtenerOfertaParaMesa();
    }
    
    @GetMapping("/oferta-cantidad-platos")
    public List<OfertaCantidadPlatosDto> obtenerOfertaCantidadPlatos() {
        return ofertaConsultaRepositorio.obtenerOfertaCantidadPlatos();
    }
    
    @GetMapping("/alergia-ingredientes")
    public List<AlergiaIngredientesDto> obtenerAlergiaIngredientes() {
        return alergiaConsultaRepositorio.obtenerAlergiaIngredientes();
    }
    
    @GetMapping("/categoria-cantidad-ingredientes")
    public List<AlergiaIngredientesDto> obtenerCategoriaCantidadIngredientes() {
        return ingredienteConsultaRepositorio.obtenerCategoriaCantidadIngredientes();
    }
    
    @GetMapping("/plato-cantidad-ingredientes")
    public List<AlergiaIngredientesDto> obtenerCantidadIngredientesPlato() {
        return platoConsultaRepositorio.obtenerCantidadIngredientesPlato();
    }
    
    @GetMapping("/mayor-cantidad-platos-venta")
    public List<MejorOfertaPedidoHoyDto> obtenerMayorCantidadPlatoVenta() {
        return ventaConsultaRepositorio.obtenerMayorCantidadPlatosVenta();
    }
    
}
