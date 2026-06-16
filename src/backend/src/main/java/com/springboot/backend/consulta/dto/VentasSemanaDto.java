package com.springboot.backend.consulta.dto;

public class VentasSemanaDto {
    private Long cantidad;
    private Double suma;

    public Double getSuma() {
        return suma;
    }

    public void setSuma(Double suma) {
        this.suma = suma;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public VentasSemanaDto(Long cantidad, Double suma) {
        this.cantidad = cantidad;
        this.suma=suma;
    }
}
