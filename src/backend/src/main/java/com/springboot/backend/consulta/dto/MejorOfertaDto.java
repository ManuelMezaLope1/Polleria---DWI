package com.springboot.backend.consulta.dto;

import java.math.BigDecimal;

public class MejorOfertaDto {
    private String nombre;
    private String descripcion;
    private Double precio_nuevo;
    private Integer cantidad_productos;
    private BigDecimal cantidad;
    private Double total;
    
    public MejorOfertaDto(String nombre, String descripcion, Double precio_nuevo, Integer cantidad_productos,
            BigDecimal cantidad, Double total) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio_nuevo = precio_nuevo;
        this.cantidad_productos = cantidad_productos;
        this.cantidad = cantidad;
        this.total = total;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio_nuevo() {
        return precio_nuevo;
    }

    public void setPrecio_nuevo(Double precio_nuevo) {
        this.precio_nuevo = precio_nuevo;
    }

    public Integer getCantidad_productos() {
        return cantidad_productos;
    }

    public void setCantidad_productos(Integer cantidad_productos) {
        this.cantidad_productos = cantidad_productos;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}