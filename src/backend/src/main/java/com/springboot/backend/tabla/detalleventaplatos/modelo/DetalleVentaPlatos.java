package com.springboot.backend.tabla.detalleventaplatos.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.detalleventa.modelo.DetalleVenta;
import com.springboot.backend.tabla.plato.modelo.Plato;

import jakarta.persistence.*;

@Entity
@Table(name="detalle_venta_platos")
public class DetalleVentaPlatos {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="detalle_venta_id")
    @JsonIgnoreProperties({"detalle_venta_platos"})
    private DetalleVenta detalleVenta;

    @ManyToOne
    @JoinColumn(name="plato_id")
    @JsonIgnoreProperties({"detalle_venta_platos"})
    private Plato plato;

    @Column(name="cantidad_platos", nullable = false)
    private Integer cantidad_platos;

    public DetalleVentaPlatos(){}

    public DetalleVentaPlatos(Long id, DetalleVenta detalleVenta, Plato plato, Integer cantidad_platos) {
        this.id = id;
        this.detalleVenta = detalleVenta;
        this.plato = plato;
        this.cantidad_platos = cantidad_platos;
    }

    public DetalleVentaPlatos(DetalleVenta detalleVenta, Plato plato, Integer cantidad_platos) {
        this.detalleVenta = detalleVenta;
        this.plato = plato;
        this.cantidad_platos = cantidad_platos;
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

    public Plato getPlato() {
        return plato;
    }

    public void setPlato(Plato plato) {
        this.plato = plato;
    }

    public Integer getCantidad_platos() {
        return cantidad_platos;
    }

    public void setCantidad_platos(Integer cantidad_platos) {
        this.cantidad_platos = cantidad_platos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        DetalleVentaPlatos detalleVentaPlatos = (DetalleVentaPlatos) o;
        return Objects.equals(id, detalleVentaPlatos.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
