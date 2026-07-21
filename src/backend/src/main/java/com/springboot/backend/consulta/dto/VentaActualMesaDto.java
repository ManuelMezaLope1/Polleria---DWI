package com.springboot.backend.consulta.dto;

public class VentaActualMesaDto {
    private Long id;
    private Long mesa;
    private String metodopago;
    private String estado;
    private String fecha;
    private Integer cantidad;
    private String descripcion;
    private Double total;
    private String observacion;
    
    public VentaActualMesaDto(Long id, Long mesa, String metodopago, String estado, String fecha, Integer cantidad,
            String descripcion, Double total, String observacion) {
        this.id = id;
        this.mesa = mesa;
        this.metodopago = metodopago;
        this.estado = estado;
        this.fecha = fecha;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.total = total;
        this.observacion = observacion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMesa() {
        return mesa;
    }

    public void setMesa(Long mesa) {
        this.mesa = mesa;
    }

    public String getMetodopago() {
        return metodopago;
    }

    public void setMetodopago(String metodopago) {
        this.metodopago = metodopago;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
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

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }
}
