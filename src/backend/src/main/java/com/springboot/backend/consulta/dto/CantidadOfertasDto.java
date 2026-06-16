package com.springboot.backend.consulta.dto;

public class CantidadOfertasDto {
    private Long cantidad;

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public CantidadOfertasDto(Long cantidad) {
        this.cantidad = cantidad;
    } 
}
