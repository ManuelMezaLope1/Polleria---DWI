package com.springboot.backend.consultaml.dto;

import java.sql.Date;

public class VentasDiasDto {
    private Date fecha;
    private Long cantidad;
    private Double total;
    
    public VentasDiasDto(Date fecha, Long cantidad, Double total) {
        this.fecha = fecha;
        this.cantidad = cantidad;
        this.total = total;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}