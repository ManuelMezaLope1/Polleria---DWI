package com.springboot.backend.consulta.dto;

public class UsuarioVentasDto {
    private Long id;
    private String username;
    private Long cantidad;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public Long getCantidad() {
        return cantidad;
    }
    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public UsuarioVentasDto(Long id, String username, Long cantidad) {
        this.id = id;
        this.username = username;
        this.cantidad = cantidad;
    }
}
