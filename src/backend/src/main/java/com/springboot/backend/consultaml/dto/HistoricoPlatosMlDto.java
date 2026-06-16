package com.springboot.backend.consultaml.dto;

import java.math.BigDecimal;
import java.sql.Date;

public class HistoricoPlatosMlDto {
    private Date fecha;
    private String nombre;
    private BigDecimal cantidad;
    
    public HistoricoPlatosMlDto(Date fecha, String nombre, BigDecimal cantidad) {
        this.fecha = fecha;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }
}
