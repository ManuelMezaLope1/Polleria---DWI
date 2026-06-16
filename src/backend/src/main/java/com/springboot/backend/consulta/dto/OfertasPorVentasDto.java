package com.springboot.backend.consulta.dto;

import java.math.BigDecimal;

public class OfertasPorVentasDto {
    private String nombre;
    private BigDecimal cantidad;

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public BigDecimal getCantidad() {
        return cantidad;
    }
    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }

    public OfertasPorVentasDto(String nombre, BigDecimal cantidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}
