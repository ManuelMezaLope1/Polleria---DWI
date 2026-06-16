package com.springboot.backend.consulta.dto;

public class CantidadPlatosDto {
    private Long cantidad;

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public CantidadPlatosDto(Long cantidad) {
        this.cantidad = cantidad;
    }   
}
