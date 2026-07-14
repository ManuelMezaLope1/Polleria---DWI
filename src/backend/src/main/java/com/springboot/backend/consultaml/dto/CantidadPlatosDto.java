package com.springboot.backend.consultaml.dto;

import java.math.BigDecimal;

public class CantidadPlatosDto {
    private String nombre;
    private BigDecimal cantidad;
    
    public CantidadPlatosDto(String nombre, BigDecimal cantidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

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
}
