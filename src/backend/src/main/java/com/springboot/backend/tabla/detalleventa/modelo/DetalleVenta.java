package com.springboot.backend.tabla.detalleventa.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.tabla.venta.modelo.Venta;

import jakarta.persistence.*;

@Entity
@Table(name="detalle_venta")
public class DetalleVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="venta_id")
    @JsonIgnoreProperties({"detalleVenta"})
    private Venta venta;

    @Column(name="descripcion", length = 3000)
    private String descripcion;

    @Column(name="cantidad")
    private String cantidad;

    @Column(name="total")
    private String total;

    public DetalleVenta(){}

    public DetalleVenta(Long id, Venta venta, String descripcion, String cantidad, String total) {
        this.id = id;
        this.venta = venta;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.total = total;
    }

    public DetalleVenta(Venta venta, String descripcion, String cantidad, String total) {
        this.venta = venta;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.total = total;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCantidad() {
        return cantidad;
    }

    public void setCantidad(String cantidad) {
        this.cantidad = cantidad;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    @Override
    public boolean equals(Object o){
        if(this==o) return true;
        if(o==null  || getClass() !=o.getClass()) return false;
        DetalleVenta detalleVenta=(DetalleVenta) o;
        return Objects.equals(id, detalleVenta.id);
    }

    @Override
    public int hashCode(){
        return Objects.hash(id);
    }
}
