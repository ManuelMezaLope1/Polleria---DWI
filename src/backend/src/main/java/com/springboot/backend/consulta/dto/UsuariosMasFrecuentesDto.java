package com.springboot.backend.consulta.dto;

public class UsuariosMasFrecuentesDto {
    private String username;
    private Long cantidad;
    
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

    public UsuariosMasFrecuentesDto(String username, Long cantidad) {
        this.username = username;
        this.cantidad = cantidad;
    }
}
