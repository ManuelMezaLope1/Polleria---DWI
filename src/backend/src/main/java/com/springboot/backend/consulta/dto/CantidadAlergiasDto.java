package com.springboot.backend.consulta.dto;

public class CantidadAlergiasDto {
    private Long cantidad;

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public CantidadAlergiasDto(Long cantidad) {
        this.cantidad = cantidad;
    }   
}
