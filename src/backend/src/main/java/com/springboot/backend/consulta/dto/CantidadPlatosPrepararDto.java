package com.springboot.backend.consulta.dto;

import java.math.BigDecimal;

public class CantidadPlatosPrepararDto {
    private String nombre;
    private String categoria;
    private String descripcion;
    private String imagen;
    private Long cantidad_ingredientes;
    private BigDecimal cantidad_platos_pendientes;
    
    public CantidadPlatosPrepararDto(String nombre, String categoria, String descripcion, String imagen,
            Long cantidad_ingredientes, BigDecimal cantidad_platos_pendientes) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.cantidad_ingredientes = cantidad_ingredientes;
        this.cantidad_platos_pendientes = cantidad_platos_pendientes;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Long getCantidad_ingredientes() {
        return cantidad_ingredientes;
    }

    public void setCantidad_ingredientes(Long cantidad_ingredientes) {
        this.cantidad_ingredientes = cantidad_ingredientes;
    }

    public BigDecimal getCantidad_platos_pendientes() {
        return cantidad_platos_pendientes;
    }

    public void setCantidad_platos_pendientes(BigDecimal cantidad_platos_pendientes) {
        this.cantidad_platos_pendientes = cantidad_platos_pendientes;
    }
}
