package com.springboot.backend.tabla.detalleventaofertas.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.detalleventa.modelo.DetalleVenta;
import com.springboot.backend.tabla.oferta.modelo.Oferta;

import jakarta.persistence.*;

@Entity
@Table(name="detalle_venta_ofertas")
public class DetalleVentaOfertas {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="detalle_venta_id")
    @JsonIgnoreProperties({"detalle_venta_ofertas"})
    private DetalleVenta detalleVenta;

    @ManyToOne
    @JoinColumn(name="oferta_id")
    @JsonIgnoreProperties({"detalle_venta_ofertas"})
    private Oferta oferta;

    @Column(name="cantidad_ofertas")
    private Integer cantidad_oferta;

    public DetalleVentaOfertas(){}

    public DetalleVentaOfertas(Long id, DetalleVenta detalleVenta, Oferta oferta, Integer cantidad_oferta) {
        this.id = id;
        this.detalleVenta = detalleVenta;
        this.oferta = oferta;
        this.cantidad_oferta = cantidad_oferta;
    }

    public DetalleVentaOfertas(DetalleVenta detalleVenta, Oferta oferta, Integer cantidad_oferta) {
        this.detalleVenta = detalleVenta;
        this.oferta = oferta;
        this.cantidad_oferta = cantidad_oferta;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DetalleVenta getDetalleVenta() {
        return detalleVenta;
    }

    public void setDetalleVenta(DetalleVenta detalleVenta) {
        this.detalleVenta = detalleVenta;
    }

    public Oferta getOferta() {
        return oferta;
    }

    public void setOferta(Oferta oferta) {
        this.oferta = oferta;
    }

    public Integer getCantidad_oferta() {
        return cantidad_oferta;
    }

    public void setCantidad_oferta(Integer cantidad_oferta) {
        this.cantidad_oferta = cantidad_oferta;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        DetalleVentaOfertas detalleVentaOfertas = (DetalleVentaOfertas) o;
        return Objects.equals(id, detalleVentaOfertas.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
