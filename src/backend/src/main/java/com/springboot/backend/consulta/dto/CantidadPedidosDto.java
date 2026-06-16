package com.springboot.backend.consulta.dto;

public class CantidadPedidosDto {
    private Long cantidad;

    public CantidadPedidosDto(Long cantidad) {
        this.cantidad = cantidad;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}
