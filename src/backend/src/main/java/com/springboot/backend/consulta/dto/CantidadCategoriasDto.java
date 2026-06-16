package com.springboot.backend.consulta.dto;

public class CantidadCategoriasDto {
    private Long cantidad;

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public CantidadCategoriasDto(Long cantidad) {
        this.cantidad = cantidad;
    }   
}
