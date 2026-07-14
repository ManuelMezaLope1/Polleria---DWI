package com.springboot.backend.consulta.dto;

public class OfertaCantidadPlatosDto {
    private String nombre;
    private Integer cantidad;

    public OfertaCantidadPlatosDto(String nombre, Integer cantidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
}
