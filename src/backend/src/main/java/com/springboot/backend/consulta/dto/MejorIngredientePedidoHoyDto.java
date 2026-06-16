package com.springboot.backend.consulta.dto;

public class MejorIngredientePedidoHoyDto {
    private String nombre;
    private Long cantidad;
    
    public MejorIngredientePedidoHoyDto(String nombre, Long cantidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
