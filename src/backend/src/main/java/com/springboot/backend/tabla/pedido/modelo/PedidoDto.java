package com.springboot.backend.tabla.pedido.modelo;

import java.sql.Date;
import java.sql.Time;

public class PedidoDto {
    private Long id;
    private Long venta;
    private Long mesa;
    private Date fecha;
    private Time hora_inicio;
    private Time hora_entrega;
    private Integer cantidad;
    private String descripcion;
    private String observacion;
    private String estado_pedido;


    public PedidoDto(Long id, Long venta, Long mesa, Date fecha, Time hora_inicio, Time hora_entrega,
            Integer cantidad, String descripcion, String observacion, String estado_pedido) {
        this.id = id;
        this.venta = venta;
        this.mesa=mesa;
        this.fecha = fecha;
        this.hora_inicio = hora_inicio;
        this.hora_entrega = hora_entrega;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.observacion = observacion;
        this.estado_pedido = estado_pedido;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVenta() {
        return venta;
    }

    public void setVenta(Long venta) {
        this.venta = venta;
    }

    public Long getMesa() {
        return mesa;
    }

    public void setMesa(Long mesa) {
        this.mesa = mesa;
    }
    
    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Time getHora_inicio() {
        return hora_inicio;
    }

    public void setHora_inicio(Time hora_inicio) {
        this.hora_inicio = hora_inicio;
    }

    public Time getHora_entrega() {
        return hora_entrega;
    }

    public void setHora_entrega(Time hora_entrega) {
        this.hora_entrega = hora_entrega;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public String getEstado_pedido() {
        return estado_pedido;
    }

    public void setEstado_pedido(String estado_pedido) {
        this.estado_pedido = estado_pedido;
    }
}
