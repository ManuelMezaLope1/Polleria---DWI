package com.springboot.backend.consulta.dto;

public class CantidadZonaDto {
    private Long cantidad;

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public CantidadZonaDto(Long cantidad) {
        this.cantidad = cantidad;
    } 
}
