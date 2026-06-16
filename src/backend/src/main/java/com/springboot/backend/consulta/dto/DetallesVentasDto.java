package com.springboot.backend.consulta.dto;

public class DetallesVentasDto {
    private Long id;
    private String fecha;
    private String username;
    private String nombre;
    private Integer cantidad;
    private String descripcion;
    private Double total;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getFecha() {
        return fecha;
    }
    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public Integer getCantidad() {
        return cantidad;
    }
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public Double getTotal() {
        return total;
    }
    public void setTotal(Double total) {
        this.total = total;
    }
    public DetallesVentasDto(Long id, String fecha, String username, String nombre, Integer cantidad,
            String descripcion, Double total) {
        this.id = id;
        this.fecha = fecha;
        this.username = username;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.descripcion = descripcion;
        this.total = total;
    }
}
