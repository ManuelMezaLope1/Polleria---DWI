package com.springboot.backend.consultaml.dto;

public class UsuariosFrecuentesMlDto {
    private Long id;
    private String username;
    private Long compras;
    private Double totalGastado;
    
    public UsuariosFrecuentesMlDto(Long id, String username, Long compras, Double totalGastado) {
        this.id = id;
        this.username = username;
        this.compras = compras;
        this.totalGastado = totalGastado;
    }

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

    public Long getCompras() {
        return compras;
    }

    public void setCompras(Long compras) {
        this.compras = compras;
    }

    public Double getTotalGastado() {
        return totalGastado;
    }

    public void setTotalGastado(Double totalGastado) {
        this.totalGastado = totalGastado;
    }
}
