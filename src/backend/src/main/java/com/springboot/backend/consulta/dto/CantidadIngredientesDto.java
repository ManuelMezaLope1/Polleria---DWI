package com.springboot.backend.consulta.dto;

public class CantidadIngredientesDto {
    private Long cantidad;

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public CantidadIngredientesDto(Long cantidad) {
        this.cantidad = cantidad;
    } 
}
