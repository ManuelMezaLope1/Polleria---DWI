package com.springboot.backend.tabla.mesa.modelo;

import java.math.BigDecimal;

public class CantidadPlatosMesaDto {
    private BigDecimal cantidad;

    public CantidadPlatosMesaDto(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }
}
