package com.springboot.backend.tabla.detalleventaofertas.modelo;

public class DetalleVentaOfertasDto {
    private Long detalleVentaId;
    private Long ofertaId;
    private Integer cantidad_oferta;
    
    public Long getDetalleVentaId() {
        return detalleVentaId;
    }
    public void setDetalleVentaId(Long detalleVentaId) {
        this.detalleVentaId = detalleVentaId;
    }
    public Long getOfertaId() {
        return ofertaId;
    }
    public void setOfertaId(Long ofertaId) {
        this.ofertaId = ofertaId;
    }
    public Integer getCantidad_oferta() {
        return cantidad_oferta;
    }
    public void setCantidad_oferta(Integer cantidad_oferta) {
        this.cantidad_oferta = cantidad_oferta;
    }

    public DetalleVentaOfertasDto(Long detalleVentaId, Long ofertaId, Integer cantidad_oferta) {
        this.detalleVentaId = detalleVentaId;
        this.ofertaId = ofertaId;
        this.cantidad_oferta = cantidad_oferta;
    }   
}