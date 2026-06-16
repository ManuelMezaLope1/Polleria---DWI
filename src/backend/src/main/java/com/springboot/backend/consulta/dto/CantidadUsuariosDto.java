package com.springboot.backend.consulta.dto;

public class CantidadUsuariosDto {
    private Long cantidad;

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public CantidadUsuariosDto(Long cantidad) {
        this.cantidad = cantidad;
    }   
}
