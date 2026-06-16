package com.springboot.backend.consulta.dto;

import java.math.BigDecimal;

public class PlatosPorVentasDto {
    private String nombre;
    private String categoria;
    private BigDecimal cantidad;
    
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
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
    public PlatosPorVentasDto(String nombre, String categoria, BigDecimal cantidad) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
    }
}
