package com.springboot.backend.consulta.dto;

public class FranjaPedidosDto {
    private String franja;
    private Long cantidad;
    
    public FranjaPedidosDto(String franja, Long cantidad) {
        this.franja = franja;
        this.cantidad = cantidad;
    }

    public String getFranja() {
        return franja;
    }

    public void setFranja(String franja) {
        this.franja = franja;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
