package com.springboot.backend.consulta.dto;

public class CantidadVentasDto {
    private Long cantidad;

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public CantidadVentasDto(Long cantidad) {
        this.cantidad = cantidad;
    }
}
