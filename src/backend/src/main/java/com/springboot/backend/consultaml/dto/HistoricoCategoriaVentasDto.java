package com.springboot.backend.consultaml.dto;

import java.math.BigDecimal;
import java.sql.Date;

public class HistoricoCategoriaVentasDto {
    private Date fecha;
    private String categoria;
    private BigDecimal cantidad;
    
    public HistoricoCategoriaVentasDto(Date fecha, String categoria, BigDecimal cantidad) {
        this.fecha = fecha;
        this.categoria = categoria;
        this.cantidad = cantidad;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }    
}
