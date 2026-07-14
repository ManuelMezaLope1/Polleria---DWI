package com.springboot.backend.consultaml.dto;

public class PlatoPrecioVentasDto {
    private Long detalleVenta;
    private String nombre;
    private Double precio;
    
    public PlatoPrecioVentasDto(Long detalleVenta, String nombre, Double precio) {
        this.detalleVenta = detalleVenta;
        this.nombre = nombre;
        this.precio = precio;
    }

    public Long getDetalleVenta() {
        return detalleVenta;
    }

    public void setDetalleVenta(Long detalleVenta) {
        this.detalleVenta = detalleVenta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}
