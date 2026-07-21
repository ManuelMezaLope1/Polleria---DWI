package com.springboot.backend.tabla.mesa.modelo;

import java.math.BigDecimal;

public class CantidadesVentasMesaDto {
    private Long id;
    private String nombre;
    private Integer capacidad;
    private String estado;
    private String ubicacion;
    private Long cantidad_ventas;
    private Double suma;
    private BigDecimal cantidad_platos;
    private BigDecimal cantidad_ofertas;
    
    public CantidadesVentasMesaDto(Long id, String nombre, Integer capacidad, String estado, String ubicacion,
            Long cantidad_ventas, Double suma, BigDecimal cantidad_platos, BigDecimal cantidad_ofertas) {
        this.id = id;
        this.nombre = nombre;
        this.capacidad = capacidad;
        this.estado = estado;
        this.ubicacion = ubicacion;
        this.cantidad_ventas = cantidad_ventas;
        this.suma = suma;
        this.cantidad_platos = cantidad_platos;
        this.cantidad_ofertas = cantidad_ofertas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Long getCantidad_ventas() {
        return cantidad_ventas;
    }

    public void setCantidad_ventas(Long cantidad_ventas) {
        this.cantidad_ventas = cantidad_ventas;
    }

    public Double getSuma() {
        return suma;
    }

    public void setSuma(Double suma) {
        this.suma = suma;
    }

    public BigDecimal getCantidad_platos() {
        return cantidad_platos;
    }

    public void setCantidad_platos(BigDecimal cantidad_platos) {
        this.cantidad_platos = cantidad_platos;
    }

    public BigDecimal getCantidad_ofertas() {
        return cantidad_ofertas;
    }

    public void setCantidad_ofertas(BigDecimal cantidad_ofertas) {
        this.cantidad_ofertas = cantidad_ofertas;
    }
}