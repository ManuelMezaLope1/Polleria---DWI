package com.springboot.backend.tabla.detalleventaplatos.modelo;

public class DetalleVentaPlatosDto {
    private Long detalleVentaId;
    private Long platoId;
    private Integer cantidad_platos;
    
    public Long getDetalleVentaId() {
        return detalleVentaId;
    }
    public void setDetalleVentaId(Long detalleVentaId) {
        this.detalleVentaId = detalleVentaId;
    }
    public Long getPlatoId() {
        return platoId;
    }
    public void setPlatoId(Long platoId) {
        this.platoId = platoId;
    }
    public Integer getCantidad_platos() {
        return cantidad_platos;
    }
    public void setCantidad_platos(Integer cantidad_platos) {
        this.cantidad_platos = cantidad_platos;
    }

    public DetalleVentaPlatosDto(Long detalleVentaId, Long platoId, Integer cantidad_platos) {
        this.detalleVentaId = detalleVentaId;
        this.platoId = platoId;
        this.cantidad_platos = cantidad_platos;
    }
}