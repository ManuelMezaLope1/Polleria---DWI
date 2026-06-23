package com.springboot.backend.tabla.ofertaplatos.modelo;

public class OfertaPlatosDto {
    private Long ofertaId;
    private Long platoId;
    private Integer cantidad_platos;
    
    public OfertaPlatosDto(Long ofertaId, Long platoId, Integer cantidad_platos) {
        this.ofertaId = ofertaId;
        this.platoId = platoId;
        this.cantidad_platos = cantidad_platos;
    }

    public Long getOfertaId() {
        return ofertaId;
    }

    public void setOfertaId(Long ofertaId) {
        this.ofertaId = ofertaId;
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
}
