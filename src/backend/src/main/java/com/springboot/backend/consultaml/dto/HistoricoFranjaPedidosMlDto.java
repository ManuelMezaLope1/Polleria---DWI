package com.springboot.backend.consultaml.dto;

import java.sql.Date;

public class HistoricoFranjaPedidosMlDto {
    private Date fecha;
    private String franja;
    private Long cantidad;
    
    public HistoricoFranjaPedidosMlDto(Date fecha, String franja, Long cantidad) {
        this.fecha = fecha;
        this.franja = franja;
        this.cantidad = cantidad;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getFranja() {
        return franja;
    }

    public void setFranja(String franja) {
        this.franja = franja;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }    
}
