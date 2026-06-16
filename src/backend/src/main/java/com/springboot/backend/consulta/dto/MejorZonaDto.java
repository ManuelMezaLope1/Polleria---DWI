package com.springboot.backend.consulta.dto;

public class MejorZonaDto {
    private String nombre;
    private String departamento;
    private String provincia;
    private Long cantidad;
    private Double total;
    
    public MejorZonaDto(String nombre, String departamento, String provincia, Long cantidad, Double total) {
        this.nombre = nombre;
        this.departamento = departamento;
        this.provincia = provincia;
        this.cantidad = cantidad;
        this.total = total;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}
